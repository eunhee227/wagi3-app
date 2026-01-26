from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from .models import User, FriendRequest, Friendship
from .serializers import UserSerializer, FriendRequestSerializer

def get_current_user(request):
    user_id = request.headers.get("X-User-Id")
    if not user_id:
        return None

    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None

def normalize_friend_pair(user1, user2):
    if user1.id < user2.id:
        return user1, user2
    else:
        return user2, user1

@api_view(["GET", "PATCH"])
@parser_classes([MultiPartParser, FormParser])   # ★ 업로드 핵심
def users_me(request):
    current_user = get_current_user(request)
    if not current_user:
        return Response({"error": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "GET":
        serializer = UserSerializer(current_user)
        return Response(serializer.data)

    # PATCH
    data = {}
    if "username" in request.data:
        data["username"] = request.data["username"]
    if "profile_img" in request.FILES:
        data["profile_img"] = request.FILES["profile_img"]

    serializer = UserSerializer(current_user, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def friends_list(request):
    current_user = get_current_user(request)
    if not current_user:
        return Response({"error": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    # 내가 포함된 친구 관계 모두 찾기
    qs = Friendship.objects.filter(user_a=current_user) | Friendship.objects.filter(
        user_b=current_user
    )

    friend_users = []
    for f in qs:
        if f.user_a == current_user:
            friend_users.append(f.user_b)
        else:
            friend_users.append(f.user_a)

    serializer = UserSerializer(friend_users, many=True)
    return Response(serializer.data)

@api_view(["DELETE"])
def friends_delete(request, friend_id):
    current_user = get_current_user(request)
    if not current_user:
        return Response({"error": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        friend_user = User.objects.get(id=friend_id)
    except User.DoesNotExist:
        return Response({"error": "friend_not_found"}, status=status.HTTP_404_NOT_FOUND)

    user_a, user_b = normalize_friend_pair(current_user, friend_user)

    deleted, _ = Friendship.objects.filter(user_a=user_a, user_b=user_b).delete()

    if deleted == 0:
        return Response({"error": "friendship_not_found"}, status=status.HTTP_404_NOT_FOUND)

    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["GET", "POST"])
def friend_requests(request):
    current_user = get_current_user(request)
    if not current_user:
        return Response({"error": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "GET":

        direction = request.GET.get("direction")  # "sent" or "received" or None

        if direction == "sent":
            qs = FriendRequest.objects.filter(request_user=current_user)
        elif direction == "received":
            qs = FriendRequest.objects.filter(requested_user=current_user)
        else:
            # 기본: 내가 보낸 + 받은 전부
            qs = FriendRequest.objects.filter(
                request_user=current_user
            ) | FriendRequest.objects.filter(requested_user=current_user)

        serializer = FriendRequestSerializer(qs.order_by("-created_at"), many=True)
        return Response(serializer.data)
    
    requested_id = request.data.get("requested_user")
    if not requested_id:
        return Response({"error": "requested_user_required"}, status=status.HTTP_400_BAD_REQUEST)

    if int(requested_id) == current_user.id:
        return Response({"error": "cannot_request_self"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        to_user = User.objects.get(id=requested_id)
    except User.DoesNotExist:
        return Response({"error": "user_not_found"}, status=status.HTTP_404_NOT_FOUND)

    # 이미 친구인지 체크
    user_a, user_b = normalize_friend_pair(current_user, to_user)
    if Friendship.objects.filter(user_a=user_a, user_b=user_b).exists():
        return Response({"error": "already_friends"}, status=status.HTTP_400_BAD_REQUEST)

    # 이미 pending 요청 있는지 체크 (방향 상관 없이)
    if FriendRequest.objects.filter(
        request_user=current_user, requested_user=to_user, status="pending"
    ).exists() or FriendRequest.objects.filter(
        request_user=to_user, requested_user=current_user, status="pending"
    ).exists():
        return Response({"error": "request_already_pending"}, status=status.HTTP_400_BAD_REQUEST)

    fr = FriendRequest.objects.create(
        request_user=current_user,
        requested_user=to_user,
        status="pending",
    )

    serializer = FriendRequestSerializer(fr)
    return Response(serializer.data, status=status.HTTP_201_CREATED)




@api_view(["PATCH"])
def friend_request_action(request, request_id):
    current_user = get_current_user(request)
    if not current_user:
        return Response({"error": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        fr = FriendRequest.objects.get(id=request_id)
    except FriendRequest.DoesNotExist:
        return Response({"error": "request_not_found"}, status=status.HTTP_404_NOT_FOUND)

    action = request.data.get("action")

    if action not in ("accept", "decline", "cancel"):
        return Response({"error": "invalid_action"}, status=status.HTTP_400_BAD_REQUEST)

    # 권한 체크
    if action in ("accept", "decline"):
        # 받은 사람이 해야 함
        if fr.requested_user != current_user:
            return Response({"error": "forbidden"}, status=status.HTTP_403_FORBIDDEN)
    elif action == "cancel":
        # 보낸 사람이 해야 함
        if fr.request_user != current_user:
            return Response({"error": "forbidden"}, status=status.HTTP_403_FORBIDDEN)

    # 상태 변경
    if action == "accept":
        fr.status = "accepted"

        # 친구 관계 생성 (이미 있으면 생략)
        user_a, user_b = normalize_friend_pair(fr.request_user, fr.requested_user)
        Friendship.objects.get_or_create(user_a=user_a, user_b=user_b)

    elif action == "decline":
        fr.status = "declined"
    elif action == "cancel":
        fr.status = "cancelled"

    fr.save()

    serializer = FriendRequestSerializer(fr)
    return Response(serializer.data)

@api_view(["GET"])
def users_search(request):
    current_user = get_current_user(request)
    if not current_user:
        return Response({"error": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    q = request.GET.get("q", "").strip()
    if not q:
        return Response([], status=status.HTTP_200_OK)

    qs = User.objects.filter(username__icontains=q).exclude(id=current_user.id)
    serializer = UserSerializer(qs, many=True)
    return Response(serializer.data)

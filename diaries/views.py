from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Diary
from .serializers import (
    DiaryCreateUpdateSerializer,
    DiaryDetailSerializer
)

class DiaryViewSet(viewsets.ViewSet):
    """
    글쓰기(일기) ViewSet
    - POST   /api/diaries
    - GET    /api/diaries/{id}
    - PATCH  /api/diaries/{id}
    - DELETE /api/diaries/{id}
    """

    permission_classes = [IsAuthenticated]

    # [POST] /api/diaries
    def create(self, request):
        serializer = DiaryCreateUpdateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "status": "Bad Request",
                    "code": "DIARY-001",
                    "message": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        diary = serializer.save(user=request.user)

        return Response(
            {
                "status": "CREATED",
                "data": {
                    "diaryId": diary.diary_id
                }
            },
            status=status.HTTP_201_CREATED
        )

    # [GET] /api/diaries/{id}
    def retrieve(self, request, pk=None):
        diary = get_object_or_404(Diary, diary_id=pk)

        serializer = DiaryDetailSerializer(diary)

        return Response(
            {
                "status": "OK",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )

    # [PATCH] /api/diaries/{id}
    def partial_update(self, request, pk=None):
        diary = get_object_or_404(Diary, diary_id=pk)

        # 작성자만 수정 가능
        if diary.user != request.user:
            return Response(
                {
                    "status": "Forbidden",
                    "code": "DIARY-403",
                    "message": "수정 권한이 없습니다."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = DiaryCreateUpdateSerializer(
            diary,
            data=request.data,
            partial=True
        )

        if not serializer.is_valid():
            return Response(
                {
                    "status": "Bad Request",
                    "code": "DIARY-002",
                    "message": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save()

        return Response(
            {
                "status": "OK",
                "data": {
                    "diaryId": diary.diary_id
                }
            },
            status=status.HTTP_200_OK
        )

    # [DELETE] /api/diaries/{id}
    def destroy(self, request, pk=None):
        diary = get_object_or_404(Diary, diary_id=pk)

        # 작성자만 삭제 가능
        if diary.user != request.user:
            return Response(
                {
                    "status": "Forbidden",
                    "code": "DIARY-403",
                    "message": "삭제 권한이 없습니다."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        diary.delete()

        return Response(
            {
                "status": "OK",
                "data": None
            },
            status=status.HTTP_200_OK
        )

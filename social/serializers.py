import os
from rest_framework import serializers
from .models import User, FriendRequest, Friendship

class UserSerializer(serializers.ModelSerializer):
    def validate_profile_img(self, value):
        ext = os.path.splitext(value.name)[1].lower()
        if ext not in [".jpg", ".jpeg", ".png"]:
            raise serializers.ValidationError("jpg/jpeg/png만 업로드 가능")
        return value
    
    class Meta:
        model = User
        fields = ["id", "username", "profile_img"]


class FriendRequestSerializer(serializers.ModelSerializer):
    request_user = UserSerializer(read_only=True)
    requested_user = UserSerializer(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ["id", "request_user", "requested_user", "status", "created_at"]

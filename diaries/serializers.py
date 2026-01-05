from rest_framework import serializers
from .models import Diary

# 1) 역직렬화(요청 JSON/form-data -> 모델 생성/수정)
class DiaryCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ["title", "context", "mode", "lucky_score", "place_id", "image"]

    def validate_lucky_score(self, value):
        if not (1 <= value <= 5):
            raise serializers.ValidationError("럭키비키 지수는 1~5 사이여야 합니다.")
        return value


# 2) 직렬화(모델 -> JSON 응답)
class DiaryDetailSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Diary
        fields = [
            "diary_id",
            "author",
            "title",
            "context",
            "mode",
            "lucky_score",
            "place_id",
            "image",
            "written_at",
        ]

    def get_author(self, obj):
        return {
            "userId": obj.user.id,
            "username": getattr(obj.user, "username", ""),
        }

from rest_framework import serializers
from diaries.models import Diary


class PlaceSummarySerializer(serializers.Serializer):
    place_id = serializers.IntegerField()
    diaries_count = serializers.IntegerField()


class DiaryListSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Diary
        fields = ["diary_id", "title", "author", "written_at", "lucky_score", "mode"]


class DiaryDetailSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Diary
        fields = ["diary_id", "title", "context", "author", "written_at", "image", "mode", "lucky_score", "place_id"]

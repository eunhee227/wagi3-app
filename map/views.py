from django.shortcuts import render

from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from diaries.models import Diary
from .serializers import PlaceSummarySerializer, DiaryListSerializer, DiaryDetailSerializer


class PlacesView(APIView):
    permission_classes = [IsAuthenticated]

    # GET /api/places
    def get(self, request):
        # place_id가 있는 일기들만 모아서 place_id별 개수 집계
        rows = (
            Diary.objects
            .exclude(place_id__isnull=True)
            .values("place_id")
            .annotate(diaries_count=Count("diary_id"))
            .order_by("-diaries_count")
        )
        return Response(PlaceSummarySerializer(rows, many=True).data, status=status.HTTP_200_OK)


class PlaceDiariesView(APIView):
    permission_classes = [IsAuthenticated]

    # GET /api/places/{place_id}/diaries
    def get(self, request, place_id: int):
        diaries = (
            Diary.objects
            .filter(place_id=place_id)
            .select_related("user")
            .order_by("-written_at")
        )
        return Response(DiaryListSerializer(diaries, many=True).data, status=status.HTTP_200_OK)


class DiaryDetailView(APIView):
    permission_classes = [IsAuthenticated]

    # GET /api/diaries/{diary_id}
    def get(self, request, diary_id: int):
        try:
            diary = Diary.objects.select_related("user").get(diary_id=diary_id)
        except Diary.DoesNotExist:
            return Response({"detail": "diary not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response(DiaryDetailSerializer(diary).data, status=status.HTTP_200_OK)

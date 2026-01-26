from django.urls import path
from .views import PlacesView, PlaceDiariesView, DiaryDetailView

urlpatterns = [
    path("places", PlacesView.as_view()),                         # GET /api/places
    path("places/<int:place_id>/diaries", PlaceDiariesView.as_view()),  # GET /api/places/{place_id}/diaries
    path("diaries/<int:diary_id>", DiaryDetailView.as_view()),    # GET /api/diaries/{diary_id}
]

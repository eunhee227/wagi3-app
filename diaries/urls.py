from django.urls import path
from .views import DiaryViewSet

diary_list = DiaryViewSet.as_view({
    "post": "create",
})

diary_detail = DiaryViewSet.as_view({
    "get": "retrieve",
    "patch": "partial_update",
    "delete": "destroy",
})

urlpatterns = [
    path("diaries", diary_list),
    path("diaries/<int:pk>", diary_detail),
]

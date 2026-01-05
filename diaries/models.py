from django.conf import settings
from django.db import models

class Diary(models.Model):
    diary_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="diaries")

    title = models.CharField(max_length=200)
    context = models.TextField()

    written_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to="diary/", null=True, blank=True)

    # 글쓰기 요구사항 (공동/개인 + 럭키비키지수)
    MODE_CHOICES = [
        ("PERSONAL", "PERSONAL"),
        ("GROUP", "GROUP"),
    ]
    mode = models.CharField(max_length=20, choices=MODE_CHOICES, default="PERSONAL")

    lucky_score = models.PositiveSmallIntegerField(default=1)

    # 장소 태그 추후 연결
    # 임시: place 테이블 FK를 추후 연결
    place_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.diary_id} - {self.title}"

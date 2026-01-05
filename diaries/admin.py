from django.contrib import admin
from .models import Diary

@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):
    list_display = ("diary_id", "title", "user", "mode", "lucky_score", "written_at")

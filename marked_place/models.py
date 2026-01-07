from django.db import models

from diaries.models import Diary
from place.models import Place

class MarkedPlace(models.Model):
    mplace_id = models.AutoField(primary_key=True)
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE, related_name="marked_places")
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name="marked_places")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"mplace:{self.mplace_id} diary:{self.diary_id} place:{self.place_id}"

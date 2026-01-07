from django.db import models

class Place(models.Model):
    place_id = models.AutoField(primary_key=True)
    place_name = models.CharField(max_length=255)
    longitude = models.FloatField()
    latitude = models.FloatField()
    address = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.place_id} - {self.place_name}"


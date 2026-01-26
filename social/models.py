from django.db import models


class User(models.Model):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=255)
    profile_img = models.ImageField(upload_to="profiles/", default="profiles/default.png")

    def __str__(self):
        return self.username
    
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=255)


class FriendRequest(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("declined", "Declined"),
        ("cancelled", "Cancelled"),
    ]

    request_user = models.ForeignKey(
        User, related_name="sent_requests", on_delete=models.CASCADE
    )
    requested_user = models.ForeignKey(
        User, related_name="received_requests", on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="pending",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.request_user} -> {self.requested_user} ({self.status})"


class Friendship(models.Model):
    user_a = models.ForeignKey(
        User, related_name="friendships_a", on_delete=models.CASCADE
    )
    user_b = models.ForeignKey(
        User, related_name="friendships_b", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user_a", "user_b")

    def __str__(self):
        return f"{self.user_a} <-> {self.user_b}"

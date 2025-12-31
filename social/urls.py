from django.urls import path
from . import views

urlpatterns = [
    # mypage
    path("users/me", views.users_me, name="users_me"),

    # friends
    path("friends", views.friends_list, name="friends_list"),
    path("friends/<int:friend_id>", views.friends_delete, name="friends_delete"),

    # friend requests
    path("friends/requests", views.friend_requests, name="friend_requests"),
    path(
        "friends/requests/<int:request_id>",
        views.friend_request_action,
        name="friend_request_action",
    ),

    # user search
    path("users", views.users_search, name="users_search"),
]


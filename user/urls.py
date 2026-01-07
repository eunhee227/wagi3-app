from django.urls import path
from .views import SignupView, LoginView, LogoutView, ChangePasswordView, DeleteMeView

urlpatterns = [
    path("user", SignupView.as_view()),                 # POST /api/user
    path("auth/login", LoginView.as_view()),            # POST /api/auth/login
    path("auth/logout", LogoutView.as_view()),          # POST /api/auth/logout
    path("user/me/password", ChangePasswordView.as_view()),  # PATCH /api/user/me/password
    path("user/me", DeleteMeView.as_view()),            # DELETE /api/user/me
]

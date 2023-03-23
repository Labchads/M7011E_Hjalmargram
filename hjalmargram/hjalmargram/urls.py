"""hjalmargram URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth.views import LoginView
from django.contrib.auth import views as auth_views
from django.urls import include, path, re_path
from kapsylgram import views
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

""" from rest_framework_simplejwt.views import (
    TokenRefreshView,
) """

app_name = 'Hjalmargram'

urlpatterns = [
    path('hjalmargram/', include('kapsylgram.urls')),
    path('admin/', admin.site.urls),
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/kapsylgram/', views.mainPage),
    path('api/kapsylgram/login', views.loginuser, name='login'),
    path('api/kapsylgram/logout', views.logout_user),
    path('api/kapsylgram/createacc', views.create_user),
    path('api/kapsylgram/follow/<int:pk>', views.follow_user),
    path('api/kapsylgram/profile/<int:pk>', views.profile),
    path('api/kapsylgram/profilename/<str:username>', views.profile_with_name),
    path('api/kapsylgram/profile/<int:pk>/posts', views.getPosts),
    path('api/kapsylgram/profilename/<str:username>/posts', views.getPostsUsername),
    path('api/kapsylgram/post/<int:pk>', views.getPost),
    path('api/kapsylgram/post/<int:pk>/like', views.like_post),
    path('api/kapsylgram/post/<int:pk>/comments', views.getComments),
    path('api/kapsylgram/post/<int:pk>/makecomment', views.getComments),
    path('api/kapsylgram/user/isauthenticated', views.checkAuthenticatedView),
    path('api/kapsylgram/csrf_token', views.GetCSRFToken.as_view()),
    path('api/kapsylgram/makepost', views.createPost),
    path('api/kapsylgram/admin', views.admin_page),
    path('api/kapsylgram/deleteuser', views.delete_user),
    path('api/kapsylgram/change-password/', views.changePassword, name='change-password'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

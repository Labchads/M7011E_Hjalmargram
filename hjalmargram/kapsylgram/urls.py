from django.urls import path
from django.contrib.auth.views import LoginView

from . import views


app_name = 'Hjalmargram'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('authenticated', views.checkAuthenticatedView),
]
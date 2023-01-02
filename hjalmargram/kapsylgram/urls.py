from django.urls import path

from . import views

app_name = 'Hjalmargram'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('csrf_cookie', views.getCSRFToken),
]
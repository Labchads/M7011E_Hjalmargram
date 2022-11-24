import datetime
from django.db import models
from django.utils import timezone
# Create your models here.

class User(models.Model):
    ID = models.AutoField(primary_key=True)
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    displayname = models.CharField(max_length=200)
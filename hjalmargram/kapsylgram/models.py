import datetime
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.

class Notification(models.Model):
    content = models.CharField(max_length=50) #we will include who sent it in the content probably
    isRead = models.SmallIntegerField()

class Message(models.Model):
    msg = models.CharField(max_length=200)
    isRead = models.SmallIntegerField()
    msgDate = models.DateTimeField('date sent')

class User(models.Model):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30, unique=True)
    displayname = models.CharField(max_length=30)
    email = models.CharField(max_length=50, unique=True)
    pfp = models.ImageField(blank=True, upload_to='profile_pictures')
    notifications = models.ManyToManyField(Notification, blank=True)

    def __str__(self):
        return self.username

class Followers(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    another_user = models.ManyToManyField(User, related_name='another_user')

    def __str__(self):
        return self.user.displayname

class Blocked(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    blocking = models.ManyToManyField(User, related_name='blocking')

    def __str__(self):
        return self.user.displayname

class Like(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)

class Comment(models.Model):
    sender = models.ForeignKey(User, on_delete = models.CASCADE, verbose_name='the user who left the comment')
    text = models.CharField(max_length=200)
    commentWhen = models.DateTimeField('date published')

    
class Post(models.Model):
    postedBy = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    postedWhen = models.DateTimeField('date published')
    picture = models.ImageField(upload_to='post_images')
    comments = models.ManyToManyField(Comment)
    likes = models.ManyToManyField(User, blank = True, related_name="likes")

class Report(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    reason = models.CharField(max_length=200)
import datetime
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, AbstractUser, BaseUserManager, PermissionsMixin
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
# Create your models here.

class Notification(models.Model):
    content = models.CharField(max_length=50) #we will include who sent it in the content probably
    isRead = models.SmallIntegerField()

class Message(models.Model):
    msg = models.CharField(max_length=200)
    isRead = models.SmallIntegerField()
    msgDate = models.DateTimeField('date sent')

class UserProfileManager(BaseUserManager):
    """helps django work with our custom user model"""
    def create_user(self,email,username, displayname, password = None, pfp = None):
        if not email:
            raise ValueError('User must have email')
        if not username:
            raise ValueError('User must have username')
        if not displayname:
            raise ValueError('User must have a display-name')
        email = self.normalize_email(email)
        print("time to make user")
        user = self.model(email=email, username=username, displayname = displayname, pfp = pfp)
        user.set_password(password)
        print("dags att spara")
        user.save(using=self._db)
        return user

    def create_superuser(self,email,username,password):
        """creates and saves a new superuser with given details"""
        user = self.create_user(email, username, "SuperAdminOfJustice", password)
        user.is_superuser = True
        user.is_admin = True
        user.save(using=self._db) 

class UserProfile(AbstractUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
#    password = models.CharField(max_length=30, unique=True)
    displayname = models.CharField(max_length=30)
    email = models.EmailField(('email address'), unique=True)
    pfp = models.ImageField(blank=True, upload_to='profile_pictures')
    notifications = models.ManyToManyField(Notification, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    """ is_superuser = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False) """

    objects = UserProfileManager()

    USERNAME_FIELD = 'username'  # specify the unique field
    REQUIRED_FIELDS = ['email', 'displayname']  # specify

    def __str__(self):
        return self.username

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message="{}?token={}".format(reverse('password_reset:reset-password-request'),reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Hjalmargram"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@hjalmargram.local",
        # to:
        [reset_password_token.user.email]
    )

class Followers(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    another_user = models.ManyToManyField(UserProfile, related_name='another_user')

    def __str__(self):
        return self.user.displayname

class Blocked(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    blocking = models.ManyToManyField(UserProfile, related_name='blocking')

    def __str__(self):
        return self.user.displayname

class Like(models.Model):
    user = models.ForeignKey(UserProfile, on_delete = models.CASCADE)

class Comment(models.Model):
    sender = models.ForeignKey(UserProfile, on_delete = models.CASCADE, verbose_name='the user who left the comment')
    text = models.CharField(max_length=200)
    commentWhen = models.DateTimeField(auto_now_add=True)

    
class Post(models.Model):
    postedBy = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    postedWhen = models.DateTimeField(auto_now_add=True)
    picture = models.ImageField(upload_to='post_images')
    comments = models.ManyToManyField(Comment, blank=True)
    likes = models.ManyToManyField(UserProfile, blank = True, related_name='likes')

class Report(models.Model):
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    reason = models.CharField(max_length=200)
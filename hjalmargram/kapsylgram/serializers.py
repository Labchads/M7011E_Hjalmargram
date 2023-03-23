from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
#from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile 
        fields = ('pk', 'username', 'displayname', 'email', 'pfp', 'is_admin', 'is_superuser', 'is_staff', 'notifications')
    

class CommentSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    class Meta:
        model = Comment 
        fields = ('pk', 'sender', 'text', 'commentWhen')

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    postedBy = UserSerializer(read_only=True)
    class Meta:
        model = Post 
        fields = ('pk', 'postedBy', 'content', 'postedWhen', 'picture', 'comments', 'likes')

class FollowerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    another_user = UserSerializer(read_only = True, many=True)
    class Meta:
        model = Followers
        fields = ('pk', 'user', 'another_user')

class ChangePasswordSerializer(serializers.Serializer):
    model=UserProfile
    """
    Serializer for password change endpoint.
    """
    old_password=serializers.CharField(required=True)
    new_password=serializers.CharField(required=True)


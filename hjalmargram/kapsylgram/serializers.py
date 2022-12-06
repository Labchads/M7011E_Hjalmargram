from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ('pk', 'username', 'password', 'displayname', 'email', 'pfp', 'notifications')
    
class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post 
        fields = ('pk', 'postedBy', 'content', 'postedWhen', 'posttype', 'comments', 'likes')

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment 
        fields = ('pk', 'sender', 'text', 'commentWhen')

class FollowerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Followers
        fields = ('pk', 'user', 'another_user')
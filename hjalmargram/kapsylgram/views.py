from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.utils import timezone
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
# Create your views here.

from rest_framework import viewsets
from rest_framework import generics
#from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.utils import jwt_encode_handler, jwt_payload_handler
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import *
from .models import *

class IndexView(generic.ListView):
    template_name = 'kapsylgram/index.html'
    greeting = "välkommen till hjalmargram"
    def get_queryset(self):
        return HttpResponse(self.greeting)

@api_view(['GET', 'POST'])
def mainPage(request):
    data = request.data
    if request.method == 'POST':
        posts = Post.objects.filter(postedWhen__lte=timezone.now()).order_by('-postedWhen')[data['last_post']:data['last_post'] + 5]
        serializer = PostSerializer(posts, context={'request': request}, many=True)
        return Response(serializer.data)
    else:    
        posts = Post.objects.filter(postedWhen__lte=timezone.now()).order_by('-postedWhen')[:5]
        serializer = PostSerializer(posts, context={'request': request}, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_page(request):
    users = UserProfile.objects.all()
    serializer = UserSerializer(users, context={'request': request}, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def delete_user(request):
    data = request.data
    if data['userID']:
        userid = data['userID']
        user = UserProfile.objects.get(pk = userid)
        user.delete()
        return JsonResponse({'success': 'User deleted'}, status=200)
    else:
        return JsonResponse({'failure': 'Invalid user'}, status=401)

@api_view(['GET'])
def profile(request, pk):
    user = UserProfile.objects.filter(pk = pk)
    serializer = UserSerializer(user, context = {'request': request}, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def changePassword(request):
    data = request.data
    user = UserProfile.objects.get(username = data['username'])
    if not user.check_password(data['old_password']):
        return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
    user.set_password(data['new_password'])
    user.save()
    response = {
        'status': 'success',
        'code': status.HTTP_200_OK,
        'message': 'Password updated successfully',
        'data': []
    }
    return Response(response)

class ChangePasswordView(generics.UpdateAPIView):
    """
    An end point for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = UserProfile
    permission_classes = ([IsAuthenticated])

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
            'status': 'success',
            'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_admin'] = user.is_admin
        token['is_staff'] = user.is_staff
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def profile_with_name(request, username):
    user = UserProfile.objects.filter(username = username)
    serializer = UserSerializer(user, context = {'request': request}, many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def like_post(request, pk):
    data = request.data
    username = data['username']
    user = UserProfile.objects.get(username = username)
    if user is not None:
        post = Post.objects.get(pk = pk)
        user_ = Post.objects.get(pk = pk).likes.filter(username = username)
        if user_.__len__() > 0:
            post.likes.remove(user)
            
        else:
            post.likes.add(user)
            
        post.save()
        return JsonResponse({'success' : 'Post liked/unliked'})
    else:
        return JsonResponse({'failure' : 'Could not find user'})

@api_view(['GET'])
def getFollowers(request, pk):
    user = UserProfile.objects.filter(pk = pk)
    followers = Followers.objects.filters(another_user = user)
    serializer = FollowerSerializer(followers, context = {'request': request}, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getFollowing(request, pk):
    user = UserProfile.objects.filter(pk = pk)
    following = Followers.objects.filters(user = user)
    serializer = FollowerSerializer(following, context = {'request': request}, many = True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request, pk):
    try:
        other_user = UserProfile.objects.filter(pk = pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    session_user = request.data['username']
    get_user = UserProfile.objects.filter(username=session_user)
    check_follower = Followers.objects.filter(user=get_user.pk)
    if other_user.username != session_user:
        if check_follower.another_user.filter(name=other_user).exists():
            add_usr = Followers.objects.filter(user=get_user)
            add_usr.another_user.remove(other_user)
            return JsonResponse({'success': 'You no longer follow this user'})
            
        else:
            add_usr = Followers.objects.get(user=get_user)
            add_usr.another_user.add(other_user)
            return JsonResponse({'success': 'You now follow this user'})
    else:
        return JsonResponse({'failure': "That's you, dummy"})
            

@api_view(['POST'])
def loginuser(request):
    #data = request.data
    username = request.data['username']
    password = request.data['password']
    print(username)
    print(password)
    try:
        user = UserProfile.objects.get(username=username)
    except UserProfile.DoesNotExist:
        return JsonResponse({'failure': 'Invalid username'}, status=401)
    #if user.check_password(password):
    login(request, user)
    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)
    return JsonResponse({'token': token}, status=200)

def logout_user(request):
    try:
        logout(request)
        return Response({'success': 'User logged out'})
    except:
        return Response({'failure': 'Something went wrong'})
        
@api_view(['POST'])
def create_user(request):
    data = request.data
    email = UserProfileManager.normalize_email(data['email'])
    username = data['username']
    displayname = data['displayname']
    password = data['password']
    pfp = data['pfp']
    try:
        user = UserProfile(email=email, username=username, displayname = displayname, pfp = pfp)
        user.set_password(password)
        user.save()
        following = Followers(user = user)
        following.save()
        return JsonResponse({'success': 'User was successfully created'}, status=200)
    except:
        return JsonResponse({'failure': 'Something went wrong'}, status=401)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def makeComment(request, pk):
    post = Post.objects.filter(pk = pk)
    commentBy = UserProfile.objects.filter(username = request.data['sender'])
    comment_text = request.data['text']
    try:
        comment = Comment(
            sender = commentBy,
            text = comment_text
        )
        comment.save()
        post.comments.add(comment)
        return JsonResponse({'success': 'You have commented'})
    except:
        return JsonResponse({'failure': 'You did not comment :,('})

@api_view(['GET'])
def getComments(request, pk):
    if request.method == 'GET':
        post = Post.objects.filter(pk = pk)
        comments = post.comments
        serializer = CommentSerializer(comments, context = {'request': request}, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPost(request):
    data = request.data
    postedBymodel = UserProfile.objects.get(pk = data['postedBy'])
    postedBy = UserSerializer(postedBymodel, context = {'request': request})
    data['postedBy'] = postedBy
    try:
        newpost = Post(
            postedBy = postedBymodel,
            content = data['content'],
            picture = data['picture'],
#            likes = postedBymodel,
        )
        newpost.save()
        return Response({'success': 'Post was successfully created'})
    except:
        return Response({'error': 'Something went wrong'})

@api_view(['GET'])
def getPost(request, pk):
    post = Post.objects.filter(pk = pk)
    serializer = PostSerializer(post, context = {'request': request}, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPostsUsername(request, username):
    user = UserProfile.objects.get(username = username)
    posts = Post.objects.filter(postedBy = user).order_by('-postedWhen')
    if posts is not None:
        serializer = PostSerializer(posts, context = {'request': request}, many=True)
        return Response(serializer.data)
    else:
        return Response({'noPosts': 'no posts here sorry'})

@api_view(['GET'])
def getPosts(request, pk):
    user = UserProfile.objects.get(pk = pk)
    posts = Post.objects.filter(postedBy = user).order_by('-postedWhen')
    if posts is not None:
        serializer = PostSerializer(posts, context = {'request': request}, many=True)
        return Response(serializer.data)
    else:
        return Response({'noPosts': 'no posts here sorry'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        return Response({ 'success': 'CSRF cookie set' })

@method_decorator(csrf_protect, name='dispatch')
def checkAuthenticatedView(request):
    isAuthenticated = UserProfile.is_authenticated
    if isAuthenticated:
        return Response({'isAuthenticated': 'success'})
    else:
        return Response({'isAuthenticated': 'failure'})
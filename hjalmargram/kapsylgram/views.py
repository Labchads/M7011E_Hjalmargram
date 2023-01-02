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
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, permissions

from .serializers import *
from .models import *

class IndexView(generic.ListView):
    template_name = 'kapsylgram/index.html'
    greeting = "välkommen till hjalmargram"
    def get_queryset(self):
        return HttpResponse(self.greeting)

@api_view(['GET', 'POST'])
def mainPage(request):
    if request.method == 'POST':
        print(request)
        u = User(username = request.username, password = request.password, displayname= request.displayname, email = request.email)
    else:
        print(request.session)
        posts = User.objects.all()
        serializer = UserSerializer(posts, context={'request': request}, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
def profile(request, pk):
    if request.method == 'GET':
        try:
            user_obj = User.objects.get(pk = pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        posts = Post.objects.get(postedBy=user_obj)
        session_user = User.objects.get(name=request.session['user'])
        session_following = Followers.objects.get_or_create(user=session_user)
        following = Followers.objects.get_or_create(user=session_user)
        check_user_followers = Followers.objects.filter(another_user=user_obj)

        is_followed = False
        if session_following.another_user.filter(pk=pk).exists() or following.another_user.filter(pk=pk).exists():
            is_followed=True
        else:
            is_followed=False
        param = {'user_obj': user_obj,'followers':check_user_followers, 'following': following,'is_followed':is_followed}
        serializer = UserSerializer(user_obj, context={'request': request}, many=True)
        serializer2 = PostSerializer(posts, context={'request': request}, many=True)

        return Response(serializer.user_obj, serializer2.posts)
    elif request.method == 'POST':
        return Response(True)

@api_view(['POST'])
def follow_user(request, pk):
    try:
        other_user = User.objects.get(id = pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    session_user = request.user
    get_user = User.objects.get(name=session_user)
    check_follower = Followers.objects.get(user=get_user.id)
    is_followed = False
    if other_user.username != session_user:
        if check_follower.another_user.filter(name=other_user).exists():
            add_usr = Followers.objects.get(user=get_user)
            add_usr.another_user.remove(other_user)
            is_followed = False
            return Response(is_followed)
            
        else:
            add_usr = Followers.objects.get(user=get_user)
            add_usr.another_user.add(other_user)
            is_followed = True
            return Response(is_followed)
    else:
        return Response(is_followed)
            

@method_decorator(csrf_protect, name='dispatch')
def login_user(request):
    data = request.data
    username = data['username']
    password = data['password']
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({'success': 'User authenticated', 'username': username})
    else:
        return Response({'failure': 'Authentication failed'})

    """ if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        name = serializer.get('username')
        password = serializer.get('password')

        check_user = User.objects.filter(name=name, pwd=password)
        if check_user:
            request.session['user'] = check_user.first().name
            return Response()
        else:
            return Response()
    return Response(request)
 """

def logout_user(request):
    try:
        logout(request)
        return Response({'success': 'User logget out'})
    except:
        return Response({'failure': 'Something went wrong'})
        
@api_view(['POST'])
def create_user(request):
    """ if request.method == 'POST':
        if User.objects.filter(username = username, password = password, email = email).exists():
            return Response("that user exists bro")
        else:
            newuser = User.objects.create(username = username, password = password, displayname = displayname, email = email)
            newuser.save()
            serializer = UserSerializer(newuser)
            return Response(serializer.data) """
    """ newuser = User.objects.create(username = request.username, password = request.password, displayname = request.displayname, email = request.email, pfp = request.pfp)
    newuser.save() """
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': 'User was successfully created'})
    return Response({'failure': serializer.errors})
    

@api_view(['GET'])
def getComments(request, pk):
    if request.method == 'GET':
        post = Post.objects.get(pk = pk)
        comments = post.comments
        serializer = CommentSerializer(comments, context = {'request': request}, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def getPost(request, pk):
    post = Post.objects.get(pk = pk)
    serializer = PostSerializer(post, context = {'request': request}, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPosts(request, pk):
    user = User.objects.get(pk = pk)
    posts = Post.objects.get(postedBy = user)
    serializer = PostSerializer(posts, context = {'request': request}, many=True)
    return Response(serializer.data)

@method_decorator(ensure_csrf_cookie, name='dispatch')
def getCSRFToken(request):
    return Response({'success': 'CSRF cookie set'})

@method_decorator(csrf_protect, name='dispatch')
def checkAuthenticatedView(request):
    isAuthenticated = User.is_authenticated
    if isAuthenticated:
        return Response({'isAuthenticated': 'success'})
    else:
        return Response({'isAuthenticated': 'failure'})
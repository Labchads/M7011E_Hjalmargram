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
#from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.utils import jwt_encode_handler, jwt_payload_handler
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status, permissions

from .serializers import *
from .models import *

class IndexView(generic.ListView):
    template_name = 'kapsylgram/index.html'
    greeting = "välkommen till hjalmargram"
    def get_queryset(self):
        return HttpResponse(self.greeting)

""" class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer """

@api_view(['GET', 'POST'])
def mainPage(request):
    posts = Post.objects.filter(postedWhen__lte=timezone.now()).order_by('-postedWhen')[:5]
    serializer = PostSerializer(posts, context={'request': request}, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def profile(request, pk):
    user = UserProfile.objects.filter(pk = pk)
    serializer = UserSerializer(user, context = {'request': request}, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def profile_with_name(request, username):
    user = UserProfile.objects.filter(username = username)
    serializer = UserSerializer(user, context = {'request': request}, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def follow_user(request, pk):
    try:
        other_user = UserProfile.objects.filter(id = pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    session_user = request.user
    get_user = UserProfile.objects.filter(name=session_user)
    check_follower = Followers.objects.filter(user=get_user.id)
    is_followed = False
    if other_user.username != session_user:
        if check_follower.another_user.filter(name=other_user).exists():
            add_usr = Followers.objects.filter(user=get_user)
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
            

@api_view(['POST'])
def loginuser(request):
    #data = request.data
    username = request.data['username']
    password = request.data['password']
    print(username)
    print(password)
    """ user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return JsonResponse({'token': token}, status=200)
    else:
        return JsonResponse({'failure': 'Invalid password'}, status=401) """
    try:
        user = UserProfile.objects.get(username=username)
    except UserProfile.DoesNotExist:
        return JsonResponse({'failure': 'Invalid username'}, status=401)
    #if user.check_password(password):
    login(request, user)
    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)
    return JsonResponse({'token': token}, status=200)
    """ else:
        return JsonResponse({'failure': 'Invalid password'}, status=401) """

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
        post = Post.objects.filter(pk = pk)
        comments = post.comments
        serializer = CommentSerializer(comments, context = {'request': request}, many=True)
        return Response(serializer.data)

@api_view(['POST'])
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
        )
        newpost.save()
        return Response({'success': 'Post was successfully created'})
    except:
        return Response({'error': 'Something went wrong'})

    """ serializer = PostSerializer(data = data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': 'Post was successfully created'})
    return Response({'failure': serializer.errors}) """

@api_view(['GET'])
def getPost(request, pk):
    post = Post.objects.filter(pk = pk)
    serializer = PostSerializer(post, context = {'request': request}, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPosts(request, pk):
    user = UserProfile.objects.get(pk = pk)
    posts = Post.objects.filter(postedBy = user)
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
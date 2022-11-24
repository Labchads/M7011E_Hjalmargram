from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.http import Http404
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.utils import timezone
# Create your views here.

from .models import User

class IndexView(generic.ListView):
    template_name = 'kapsylgram/index.html'
    greeting = "välkommen till hjalmargram"
    def get_queryset(self):
        return HttpResponse(self.greeting)
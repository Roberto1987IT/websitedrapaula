from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
def home(request):
    return JsonResponse(
        {
            'title': 'Welcome to Home Page API',
            'belong_to': 'Boris Isac'
        }
    )
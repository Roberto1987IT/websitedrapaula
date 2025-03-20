from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from .serializer import ProductSerializer
from rest_framework.permissions import AllowAny

from .models import Product

# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
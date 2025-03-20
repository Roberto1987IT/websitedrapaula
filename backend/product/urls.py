from django.urls import path
from .views import ProductViewSet

app_name = 'product'

urlpatterns = [
    path('product/', ProductViewSet.as_view({'get': 'list'}), name='index'),
]
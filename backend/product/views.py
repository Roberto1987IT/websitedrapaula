from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from .serializer import ProductSerializer
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
import stripe
from django.conf import settings
from .models import Subscription


from .models import Product

# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    

def payment_success(request): 
    if 'success' in request.GET: 
        return HttpResponse('Payment succeeded!') 
    return HttpResponse('Unexpected error occurred.')

def payment_cancel(request): 
    if 'canceled' in request.GET: 
        return HttpResponse('Payment was canceled.') 
    return HttpResponse('Unexpected error occurred.')

def create_subscription(request):

    # Assume customer and plan IDs are obtained from the request

    subscription = stripe.Subscription.create(customer=request.user, items=[{'plan': plan_id}], )

    # Save the subscription details in your database

    Subscription.objects.create( user=request.user, stripe_subscription_id=subscription.id, active=True )

    return HttpResponse('Subscription successful') 


def create_checkout_session(request):
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{'price_data': {
                'currency': 'usd',
                'product_data': {'name': 'T-shirt', },
                'unit_amount': 2000,
            },
                'quantity': 1,
            }],
            mode='payment',
            success_url=request.build_absolute_uri('/') + '?success=true',
            cancel_url=request.build_absolute_uri('/') + '?canceled=true',
        )
        return JsonResponse({'id': checkout_session.id})
    except Exception as e:
        return JsonResponse({'error': str(e)})
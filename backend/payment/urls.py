# payment/urls.py
from django.urls import path, include
from .views import payment_test, process, payment_canceled, payment_completed, stripe_webhook

app_name = 'payment'

urlpatterns = [
    path('payment/', payment_test , name='payment'),  
    path('payment/process/', process , name='process'),  
    path('payment/payment_completed/', payment_completed , name='payment_completed'),  
    path('payment/payment_canceled/', payment_canceled , name='payment_canceled'),
    path('payment/stripe/webhook/', stripe_webhook, name='stripe-webhook'),
]
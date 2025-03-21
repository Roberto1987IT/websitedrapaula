from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.urls import reverse
from product.models import Product
import stripe
from django.conf import settings
# Create your views here.

stripe.api_key = settings.STRIPE_SECRET_KEY

def payment_test(request):
    products = Product.objects.all()
    context = {
        'products': products,
        "payment_text": 'Payment test page. Created by: <a href="https://www.linkedin.com/in/abhishek-kumar-7b2b3b1a4/">Boris</a>',
    }
    
    for product in products:
        print(product.id, product.name, product.price, product.description, product.count, 'Avaliable:' ,product.is_active)
        if not product.name in request.session:
            request.session[product.name] = {
                'product_id': product.id,
                'product_name': product.name,
                'product_price': product.price,
                'product_description': product.description,
                'product_count': product.count,
                'product_is_active': product.is_active,
            }

    #return JsonResponse(dict(request.session))
    return redirect('payment:process')


def process(request):
    products = Product.objects.all()

    for product in products:
        if request.session.get(product.name):
            print(request.session.get(product.name))
    
    success_url = request.build_absolute_uri(
                        reverse('payment:payment_completed')
    )
    
    cancel_url = request.build_absolute_uri(
        reverse('payment:payment_canceled')
    )

    session_data = {
        'payment_method_types': ['card'],
        'client_reference_id': '1',
        'line_items': [
                {
                    'price_data': {
                        'currency': 'eur',  # валюта
                        'product_data': {
                            'name': 'Sample Product',  # название товара
                        },
                        'unit_amount': 2000,  # сумма в центах (20.00 USD)
                    },
                    'quantity': 1,  # количество товара
                },
            ],
        'mode': 'payment',
        'success_url': success_url,
        'cancel_url': cancel_url,
    }

    session = stripe.checkout.Session.create(**session_data)
    return redirect(session.url, code=303)
#    return HttpResponse('Payment processing page. Created by: <a href="https://www.linkedin.com/in/abhishek-kumar-7b2b3b1a4/">Boris</a>')

def payment_completed(request):
    return HttpResponse('Payment completed page. Created by: <a href="https://www.linkedin.com/in/abhishek-kumar-7b2b3b1a4/">Boris</a>')

def payment_canceled(request):
    return HttpResponse('Payment canceled page. Created by: <a href="https://www.linkedin.com/in/abhishek-kumar-7b2b3b1a4/">Boris</a>')

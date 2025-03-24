from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.urls import reverse
#from product.models import Product
import stripe
from django.conf import settings
from django.core.mail import send_mail

# Create your views here.

print('\t\t:::', settings.STRIPE_SECRET_KEY)

stripe.api_key = settings.STRIPE_SECRET_KEY



def payment_test(request):
    #products = Product.objects.all()
    context = {
        #'products': products,
        "payment_text": 'Payment test page. Created by: <a href="https://www.linkedin.com/in/abhishek-kumar-7b2b3b1a4/">Boris</a>',
    }
    
    '''for product in products:
        print(product.id, product.name, product.price, product.description, product.count, 'Avaliable:' ,product.is_active)
        if not product.name in request.session:
            request.session[product.name] = {
                'product_id': product.id,
                'product_name': product.name,
                'product_price': product.price,
                'product_description': product.description,
                'product_count': product.count,
                'product_is_active': product.is_active,
            }'''

    #return JsonResponse(dict(request.session))
    return redirect('payment:process')


def process(request):

    '''products = Product.objects.all()
    items_to_pay = []
    total = 0

    for product in products:
        if request.session.get(product.name):
            items_to_pay.append({
                'price_data': {
                    'currency': 'eur',
                    'product_data': {
                        'name': product.name,
                    },
                    'unit_amount': int(product.price * 100),
                },
                'quantity': product.count,
            })
            total += product.price * product.count
    
    session_data = {
        'payment_method_types': ['card'],
        'client_reference_id': 'user_id',
        'customer_email':customer.email,
        'line_items': items_to_pay,
        'mode': 'payment',
        'success_url': success_url,
        'cancel_url': cancel_url,
    }
'''

    customer = stripe.Customer.create(email="borisisac@gmail.com")

    success_url = request.build_absolute_uri(
                        reverse('payment:payment_completed')
    )
    
    cancel_url = request.build_absolute_uri(
        reverse('payment:payment_canceled')
    )

    #teste real payment
    session_data = {
        'payment_method_types': ['card'],
        'client_reference_id': '1',
        'customer': customer.id,
        'line_items': [
            {
                'price_data': {
                    'currency': 'eur',
                    'product_data': {
                        'name': "product test payment",
                    },
                    'unit_amount': 50,  # price in cents
                },
                'quantity': 1,
            },
        ],
        'mode': 'payment',
        'payment_intent_data': {
            'setup_future_usage': 'off_session'  # Разрешает использование сохраненной карты
        },
        'success_url': success_url,
        'cancel_url': cancel_url,
    }


    
    session = stripe.checkout.Session.create(**session_data)
    
    new_invoice = stripe.Invoice.create(
        customer=f'{customer.id}',
        collection_method="send_invoice",
        days_until_due=30,
    )
    '''
    for item in products:  
        item_to_pay = stripe.InvoiceItem.create(
            customer=f'{customer.id}',
            invoice = new_invoice.id,
            description=item.name,
            unit_amount=int(item.price*100),
            currency='eur',
            quantity=item.count,
        )

    '''
    if new_invoice.status == "draft":
        stripe.Invoice.finalize_invoice(new_invoice.id)  
    print('------Invoice is finalized: ', new_invoice.status )  


    return redirect(session.url, code=303)

def payment_completed(request):
    return HttpResponse('Payment completed page. Created by: <a href="https://www.linkedin.com/in/abhishek-kumar-7b2b3b1a4/">Boris</a>')

def payment_canceled(request):
    return HttpResponse('Payment canceled page. Created by: <a href="https://www.linkedin.com/in/abhishek-kumar-7b2b3b1a4/">Boris</a>')

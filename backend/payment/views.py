from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.urls import reverse
#from product.models import Product
import stripe
from django.conf import settings
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
import json



stripe.api_key = settings.STRIPE_LIVE_SECRET_KEY


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.headers.get("Stripe-Signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_ENDPOINT_SECRET
        )
    except ValueError:
        return JsonResponse({"error": "Invalid payload"}, status=400)
    except stripe.error.SignatureVerificationError:
        return JsonResponse({"error": "Invalid signature"}, status=400)

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        customer_email = session.get("customer_email")
        payment_intent_id = session.get("payment_intent")

        if payment_intent_id:
            # Получаем список всех Charge, связанных с PaymentIntent
            charges = stripe.Charge.list(payment_intent=payment_intent_id).get("data", [])
            print('4-------', charges[0])
            if charges:
                receipt_url = charges[0].get("receipt_url") 
                if customer_email and receipt_url:
                    subject = "Your Receipt from Our Site"
                    message = (f"Thanks for using our site. You can get your receipt clicking on link: \n {receipt_url}")
                    send_mail(
                        subject,
                        message,
                        settings.EMAIL_HOST_USER,
                        [customer_email])

    return JsonResponse({"status": "success"}, status=200)

def payment_test(request):
    #products = Product.objects.all()
    context = {
        #'products': products,
        "payment_text": 'Payment test page. Created by: <a href="https://www.linkedin.com/in/abhishek-kumar-7b2b3b1a4/">Boris</a>',
    }
    '''
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
'''
    #return JsonResponse(dict(request.session))
    return redirect('payment:process')


def process(request):
    #products = Product.objects.all()
    items_to_pay = []

    success_url = request.build_absolute_uri(reverse('payment:payment_completed'))
    cancel_url = request.build_absolute_uri(reverse('payment:payment_canceled'))

    customer = stripe.Customer.create(
        email="borisisac@gmail.com",
        name="Boris Isac",
    )

    '''
    
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


    
    '''

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

    '''
    session_data = {
        'payment_method_types': ['card'],
        'customer_email': customer.email,
        'line_items': items_to_pay,
        'mode': 'payment',
        'success_url': success_url,
        'cancel_url': cancel_url,
    }
'''
    session = stripe.checkout.Session.create(**session_data)

    new_invoice = stripe.Invoice.create(
        customer=customer.id,
        collection_method='send_invoice',
        days_until_due=30,
        description='Invoice for payment',
    )

    '''for product in products:
        price = stripe.Price.create(
            unit_amount=int(product.price * 100),
            currency='eur',
            product_data={
                'name': product.name,
            }
        )
        if request.session.get(product.name):
            new_item = stripe.InvoiceItem.create(
                customer=customer.id,
                price=price,
                quantity=product.count,
                invoice=new_invoice.id,
            )'''

    
    stripe.Invoice.finalize_invoice(new_invoice.id)

    return redirect(session.url, code=303)



def payment_completed(request):
    return HttpResponse(f'Payment completed successfully!')

def payment_canceled(request):
    return HttpResponse('Payment canceled page. Created by:Boris')

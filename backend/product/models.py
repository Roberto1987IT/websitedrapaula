from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()
    count = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
class Subscription(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    stripe_subscription_id = models.CharField(max_length=100) 
    active = models.BooleanField(default=True) 
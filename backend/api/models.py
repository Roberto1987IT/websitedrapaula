# api/models.py
from django.db import models
from django.conf import settings

class Document(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='documents'
    )
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=[('artigo', 'Artigo'), ('tese', 'Tese')])
    date = models.DateField()
    description = models.TextField()
    file = models.FileField(upload_to='documents/')

    class Meta:
        verbose_name = "Document"
        verbose_name_plural = "Documents"

    def __str__(self):
        return self.title
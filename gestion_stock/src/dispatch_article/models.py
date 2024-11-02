from django.db import models
from article.models import Article

from dispatch.models import Dispatch

# Create your models here.

class Dispatch_article(models.Model):
    dispatch=models.ForeignKey(Dispatch,  on_delete=models.SET_NULL, null=True)
    article=models.ForeignKey(Article, on_delete=models.SET_NULL, null=True)
    quantite=models.IntegerField()
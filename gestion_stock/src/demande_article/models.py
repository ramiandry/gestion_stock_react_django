from django.db import models
from article.models import Article

from demande.models import Demande

# Create your models here.

class Demande_article(models.Model):
    demande=models.ForeignKey(Demande, on_delete=models.SET_NULL, null=True)
    article = models.ForeignKey(Article, on_delete=models.SET_NULL, null=True)
    quantite=models.IntegerField()
    
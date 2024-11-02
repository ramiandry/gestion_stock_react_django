from django.db import models

from agence.models import Agence
from article.models import Article
from membres.models import Departement, Membres

# Create your models here.

class Dispatch(models.Model):
    date=models.DateField(auto_now=False, auto_now_add=False, null=True)
    agence=models.ForeignKey(Agence,  on_delete=models.SET_NULL, null=True)
    departement=models.ForeignKey(Departement, on_delete=models.SET_NULL, null=True)
    membre=models.ForeignKey(Membres, on_delete=models.SET_NULL, null=True)
    
    
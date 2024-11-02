from django.db import models
from agence.models import Agence
from membres.models import Departement, Membres

# Create your models here.

class Demande(models.Model):
    date_depot=models.DateField(auto_now=False, auto_now_add=False)
    remarque=models.TextField(null=True)
    departement=models.ForeignKey(Departement, on_delete=models.SET_NULL, null=True)
    agence=models.ForeignKey(Agence, on_delete=models.SET_NULL, null=True, blank=True)
    membre=models.ForeignKey(Membres, on_delete=models.SET_NULL, null=True, blank=True)

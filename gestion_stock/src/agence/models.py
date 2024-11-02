from django.db import models

# Create your models here.

class Agence(models.Model):
    nom_agence=models.CharField(max_length=50, unique=True)
    email=models.EmailField(max_length=254)
    tel=models.CharField(max_length=11)
    adresse=models.CharField(max_length=50)
    


    
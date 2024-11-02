from django.db import models

# Create your models here.

class Fournisseur(models.Model):
    nom=models.CharField(max_length=50)
    email=models.EmailField(max_length=254)
    tel=models.CharField(max_length=50)
    adresse=models.CharField(max_length=100)
    
class Fourniture(models.Model):
    type=models.CharField(max_length=150)
    
    
class Article(models.Model):
    fournisseur=models.ForeignKey(Fournisseur, on_delete=models.SET_NULL, null=True)
    fourniture=models.ForeignKey(Fourniture, on_delete=models.SET_NULL, null=True)
    nom=models.CharField( max_length=50)
    quantite=models.IntegerField()

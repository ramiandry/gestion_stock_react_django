from django.db import models

# Create your models here.


class Departement(models.Model):
    nom_departement = models.CharField(max_length=50)


class Admin(models.Model):
    type = models.CharField(max_length=50)


class Membres(models.Model):
    departement = models.ForeignKey(Departement, on_delete=models.SET_NULL, null=True)
    admin = models.ForeignKey(Admin, on_delete=models.SET_NULL, null=True)
    username = models.CharField(max_length=120, unique=True)
    email = models.EmailField()
    tel = models.CharField(max_length=15)
    mot_de_passe = models.CharField(max_length=20)
    avatar = models.ImageField(upload_to="products/", blank=True, null=True)

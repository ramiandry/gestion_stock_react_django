from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Admin, Departement, Membres
class MembreSerializer(serializers.ModelSerializer):
    class Meta:
       model = Membres
       fields = '__all__'

class DepartementSerializer(serializers.ModelSerializer):
    class Meta:
       model = Departement
       fields = '__all__'
       
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
       model = Admin
       fields = '__all__'
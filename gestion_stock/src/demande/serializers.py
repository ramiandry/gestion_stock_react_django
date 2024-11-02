from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Demande

class DemandeSerializer(serializers.ModelSerializer):
    class Meta:
       model = Demande
       fields = '__all__'





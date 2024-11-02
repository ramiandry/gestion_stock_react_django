from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Demande_article
class DemandeArticleSerializer(serializers.ModelSerializer):
    class Meta:
       model = Demande_article
       fields = '__all__'



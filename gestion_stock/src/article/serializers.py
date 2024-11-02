from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Article, Fournisseur, Fourniture
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
       model = Article
       fields = '__all__'

class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
       model = Fournisseur
       fields = '__all__'

class FournitureSerializer(serializers.ModelSerializer):
    class Meta:
       model = Fourniture
       fields = '__all__'

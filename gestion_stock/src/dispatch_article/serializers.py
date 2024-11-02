from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Dispatch_article
class Dispatch_articleSerializer(serializers.ModelSerializer):
    class Meta:
       model = Dispatch_article
       fields = '__all__'



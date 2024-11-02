from django.shortcuts import render

from agence.models import Agence
from agence.serializers import AgenceSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

#Afficher toutes les listes agences
@api_view(['GET'])
def afficherTout(request):
    agence=Agence.objects.all()
    serializer=AgenceSerializer(agence,many=True)
    return Response(serializer.data)


#Création d'une agence
@api_view(['POST'])
def inserer(request):
    data=request.data
    agence=Agence.objects.create(nom_agence=data["nom_agence"], email=data['email'], adresse=data['adresse'], tel=data['tel'])
    serializer=AgenceSerializer(agence,many=False)
    return Response(serializer.data)

#Modification de l'agence
@api_view(['PUT'])
def modifier(request,id):
     data=request.data
     agence=Agence.objects.get(pk=id)
     agence.nom_agence=data['nom_agence']
     agence.email=data['email']
     agence.tel=data['tel']
     agence.adresse=data['adresse']
     agence.save()
     serializer=AgenceSerializer(agence,many=False)
     return Response(serializer.data)
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from agence.models import Agence
from demande.models import Demande
from demande.serializers import DemandeSerializer
from membres.models import Departement, Membres

# Create your views here.

#Afficher d'une demande
@api_view(['GET'])
def afficherTout(request):
    demande=Demande.objects.all()
    serializer=DemandeSerializer(demande,many=True)
    return Response(serializer.data)


#Création d'une demande
@api_view(['POST'])
def inserer(request):
    data=request.data
    agence=Agence.objects.get(pk=data['agence'])
    departement = Departement.objects.get(pk=data['departement'])
    membre = Membres.objects.get(pk=data['membre'])
    demande=Demande.objects.create(date_depot=data["date"], remarque=data['remarque'], agence=agence, departement=departement, membre=membre)
    serializer=DemandeSerializer(demande,many=False)
    return Response(serializer.data)

#Modification d'une demande
@api_view(['PUT'])
def modifier(request,id):
     data=request.data
     agence=Agence.objects.get(pk=data['agence'])
     departement = Departement.objects.get(pk=data['departement'])
     membre = Membres.objects.get(pk=data['membre'])
     demande=Demande.objects.get(pk=id)
     demande.date_depot=data['date']
     demande.remarque=data['remarque']
     demande.agence=agence
     demande.membre=membre
     demande.departement=departement
     demande.save()
     serializer=DemandeSerializer(demande,many=False)
     return Response(serializer.data)
 
 
@api_view(['DELETE'])
def supprimer(request, id):
    demande=Demande.objects.get(pk=id)
    demande.delete()
    serializer=DemandeSerializer(demande,many=False)
    return Response(serializer.data)
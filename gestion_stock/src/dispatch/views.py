from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from membres.models import Departement, Membres
from agence.models import Agence

from .models import Dispatch
from .serializers import DispatchSerializer

# Create your views here.


@api_view(['GET'])
def afficherTout(request):
    dispatch = Dispatch.objects.all()
    serializer = DispatchSerializer(dispatch, many=True)
    return Response(serializer.data)


# Création d'une agence
@api_view(['POST'])
def inserer(request):
    data = request.data
    departement = Departement.objects.get(pk=data['departement'])
    membre = Membres.objects.get(pk=data['membre'])
    agence = Agence.objects.get(pk=data['agence'])
    dispatch = Dispatch.objects.create(
        date=data["date"], departement=departement, agence=agence, membre=membre)
    serializer = DispatchSerializer(dispatch, many=False)
    return Response(serializer.data)

# Modification d' une agence


@api_view(['PUT'])
def modifier(request, id):
    data = request.data
    departement = departement.objects.get(pk=data['departement'])
    agence = Agence.objects.get(pk=data['agence'])
    membre = Membres.objects.get(pk=data['membre'])
    dispatch = Dispatch.objects.get(pk=id)
    dispatch.date = data['date']
    dispatch.departement = departement
    dispatch.agence = agence
    dispatch.membre=membre
    dispatch.save()
    serializer = DispatchSerializer(dispatch, many=False)
    return Response(serializer.data)

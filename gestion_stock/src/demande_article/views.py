from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from article.models import Article
from demande.models import Demande

from demande_article.models import Demande_article
from demande_article.serializers import DemandeArticleSerializer

# Create your views here.

@api_view(['GET'])
def afficherTout(request):
    demande_article=Demande_article.objects.all()
    serializer=DemandeArticleSerializer(demande_article,many=True)
    return Response(serializer.data)


#Création d'une demande
@api_view(['POST'])
def inserer(request):
    data=request.data
    article=Article.objects.get(pk=data['article'])
    demande = Demande.objects.get(pk=data['demande'])
    demande_article=Demande_article.objects.create(quantite=data["quantite"], article=article, demande=demande)
    serializer=DemandeArticleSerializer(demande_article,many=False)
    return Response(serializer.data)

#Modification d' une demande
@api_view(['PUT'])
def modifier(request,id):
     data=request.data
     article=Article.objects.get(pk=data['article'])
     demande = Demande.objects.get(pk=data['demande'])
     demande_article=Demande_article.objects.get(pk=id)
     demande_article.quantite=data['quantite']
     demande_article.article=article
     demande_article.demande=demande
     demande_article.save()
     article.quantite=article.quantite-data["quantite"]
     article.save()
     serializer=DemandeArticleSerializer(demande_article,many=False)
     return Response(serializer.data)
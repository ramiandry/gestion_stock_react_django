from django.shortcuts import render
from .models import Article, Fournisseur, Fourniture
from .serializers import ArticleSerializer, FournisseurSerializer, FournitureSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

#GESTION ARTICLE
@api_view(['GET'])
def toutAfficher(request):
    article=Article.objects.all()
    serializer=ArticleSerializer(article,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def ajouter(request):
    data=request.data
    fournisseur=Fournisseur.objects.get(pk=data["fournisseur"])
    fourniture=Fourniture.objects.get(pk=data["fourniture"])
    article=Article.objects.create(nom=data["nom"], quantite=data['quantite'], fournisseur=fournisseur, fourniture=fourniture)
    serializer=ArticleSerializer(article,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def editer(request,id):
     data=request.data
     article=Article.objects.get(pk=id)
     fournisseur=Fournisseur.objects.get(pk=data['fournisseur'])
     fourniture=Fourniture.objects.get(pk=data['fourniture'])
     article.nom=data['nom']
     article.quantite=data['quantite']
     article.fournisseur=fournisseur
     article.fourniture=fourniture
     article.save()
     serializer=ArticleSerializer(article,many=False)
     return Response(serializer.data)

#GESTION FOURNISSEUR
@api_view(['GET'])
def afficherTout(request):
    fournisseur=Fournisseur.objects.all()
    serializer=FournisseurSerializer(fournisseur,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def inserer(request):
    data=request.data
    fournisseur=Fournisseur.objects.create(nom=data["nom"], email=data['email'], adresse=data['adresse'], tel=data['tel'])
    serializer=FournisseurSerializer(fournisseur,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def modifier(request,id):
     data=request.data
     fournisseur=Fournisseur.objects.get(pk=id)
     fournisseur.nom=data['nom']
     fournisseur.email=data['email']
     fournisseur.tel=data['tel']
     fournisseur.adresse=data['adresse']
     fournisseur.save()
     serializer=FournisseurSerializer(fournisseur,many=False)
     return Response(serializer.data)
 
#Affichage de fourniture
@api_view(['GET'])
def afficherToutFourniture(request):
    fourniture=Fourniture.objects.all()
    serializer=FournitureSerializer(fourniture,many=True)
    return Response(serializer.data)
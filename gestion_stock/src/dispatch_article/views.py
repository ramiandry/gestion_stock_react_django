from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from article.models import Article
from dispatch.models import Dispatch

from .models import Dispatch_article
from .serializers import Dispatch_articleSerializer

# Create your views here.


@api_view(['GET'])
def afficherTout(request):
    dispatch = Dispatch_article.objects.all()
    serializer = Dispatch_articleSerializer(dispatch, many=True)
    return Response(serializer.data)


# Création d'une dispatch // int() pour convertir en entier
@api_view(['POST'])
def inserer(request):
    data = request.data
    article = Article.objects.get(pk=data['article'])
    dispatch = Dispatch.objects.get(pk=data['dispatch'])
    dispatch_article = Dispatch_article.objects.create(
        quantite=data["quantite"], article=article, dispatch=dispatch)
    serializer = Dispatch_articleSerializer(dispatch_article, many=False)
    dispatch_article.save()
    article.quantite = article.quantite-int(data["quantite"])
    article.save()
    return Response(serializer.data)

# Modification d' une dispatch


@api_view(['PUT'])
def modifier(request, id):
    data = request.data
    article = Article.objects.get(pk=data['article'])
    dispatch = Dispatch.objects.get(pk=data['dispatch'])
    dispatch_article = Dispatch_article.objects.get(pk=id)
    dispatch_article.quantite = data['quantite']
    dispatch_article.article = article
    dispatch_article.dispatch = dispatch
    serializer = Dispatch_articleSerializer(dispatch_article, many=False)
    return Response(serializer.data)

from django.urls import path
from . import views



urlpatterns = [
    path('fourniture/all', views.afficherToutFourniture),
    path('fournisseur/all', views.afficherTout),
    path('fournisseur/add', views.inserer),
    path('fournisseur/edit/<int:id>', views.modifier),
    path('article/all', views.toutAfficher),
    path('article/add', views.ajouter),
    path('article/edit/<int:id>', views.editer),
]

#path("delete/<int:id>", views.deleteBlog)
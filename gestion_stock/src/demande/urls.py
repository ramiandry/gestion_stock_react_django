from django.urls import path
from . import views



urlpatterns = [
    path('all', views.afficherTout),
    path('add', views.inserer),
    path('edit/<int:id>', views.modifier),
    path('delete/<int:id>', views.supprimer),
    
]

#path("delete/<int:id>", views.deleteBlog)
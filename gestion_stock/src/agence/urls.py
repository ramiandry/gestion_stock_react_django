from django.urls import path
from . import views



urlpatterns = [
    path('all', views.afficherTout),
    path('add', views.inserer),
    path('edit/<int:id>', views.modifier),
    #path('findOneByPk/<int:id>', views.findOneByPk),
    #path('add/<int:fk>', views.create),
    
]

#path("delete/<int:id>", views.deleteBlog)
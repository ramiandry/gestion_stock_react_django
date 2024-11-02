from django.urls import path
from . import views



urlpatterns = [
    path('departement/all', views.afficherToutDepartement),
    path('admins/all', views.afficherToutAdmin),
    path('membres/findAll/', views.findAll),
    path('membres/findOne/', views.findOne),
    path('membres/findOneByPk/<int:id>', views.findOneByPk),
    path('membres/add', views.create),
    path('membres/update/<int:id>', views.update),
    
]

#path("delete/<int:id>", views.deleteBlog)
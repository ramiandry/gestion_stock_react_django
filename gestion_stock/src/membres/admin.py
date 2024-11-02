from django.contrib import admin
from .models import Admin, Departement, Membres

# Register your models here.
admin.site.register(Membres)
admin.site.register(Departement)
admin.site.register(Admin)
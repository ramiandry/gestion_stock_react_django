from django.contrib import admin

from demande.models import Demande
from demande_article.models import Demande_article

# Register your models here.

admin.site.register(Demande)
admin.site.register(Demande_article)
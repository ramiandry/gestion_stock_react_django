from django.contrib import admin

from article.models import Article, Fourniture

# Register your models here.

admin.site.register(Fourniture)
admin.site.register(Article)
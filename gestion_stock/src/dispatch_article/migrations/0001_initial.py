# Generated by Django 4.1.7 on 2023-08-06 16:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('article', '0002_fourniture_article_fourniture'),
        ('dispatch', '0002_remove_dispatch_article_remove_dispatch_quantite_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dispatch_article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite', models.IntegerField()),
                ('article', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='article.article')),
                ('dispatch', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='dispatch.dispatch')),
            ],
        ),
    ]
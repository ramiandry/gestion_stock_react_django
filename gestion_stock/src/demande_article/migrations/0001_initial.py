# Generated by Django 4.1.7 on 2023-08-02 07:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('article', '0002_fourniture_article_fourniture'),
        ('demande', '0003_remove_demande_article'),
    ]

    operations = [
        migrations.CreateModel(
            name='Demande_article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite', models.IntegerField()),
                ('article', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='article.article')),
                ('demande', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='demande.demande')),
            ],
        ),
    ]

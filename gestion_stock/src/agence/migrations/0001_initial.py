# Generated by Django 4.1.7 on 2023-07-25 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Agence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom_agence', models.CharField(max_length=50, unique=True)),
                ('email', models.EmailField(max_length=254)),
                ('tel', models.CharField(max_length=11)),
                ('adresse', models.CharField(max_length=50)),
            ],
        ),
    ]

# Generated by Django 4.1.7 on 2023-08-05 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('membres', '0003_remove_membres_service_delete_service'),
    ]

    operations = [
        migrations.AlterField(
            model_name='membres',
            name='tel',
            field=models.CharField(max_length=15),
        ),
    ]

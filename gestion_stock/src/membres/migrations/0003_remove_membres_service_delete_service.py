# Generated by Django 4.1.7 on 2023-08-05 14:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('membres', '0002_admin_departement_service_membres_tel_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='membres',
            name='service',
        ),
        migrations.DeleteModel(
            name='Service',
        ),
    ]

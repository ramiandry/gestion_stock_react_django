# Generated by Django 4.1.7 on 2023-08-02 07:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('membres', '0002_admin_departement_service_membres_tel_and_more'),
        ('demande', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='demande',
            name='departement',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='membres.departement'),
        ),
    ]

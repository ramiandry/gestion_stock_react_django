# Generated by Django 4.1.7 on 2023-08-05 16:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('membres', '0004_alter_membres_tel'),
        ('demande', '0004_demande_remarque'),
    ]

    operations = [
        migrations.AddField(
            model_name='demande',
            name='membre',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='membres.membres'),
        ),
    ]
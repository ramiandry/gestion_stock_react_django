# Generated by Django 4.1.7 on 2023-07-25 09:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('agence', '0001_initial'),
        ('article', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Demande',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_depot', models.DateField()),
                ('agence', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='agence.agence')),
                ('article', models.ManyToManyField(to='article.article')),
            ],
        ),
    ]

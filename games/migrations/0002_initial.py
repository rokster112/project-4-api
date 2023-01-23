# Generated by Django 4.1.5 on 2023-01-23 14:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='games', to=settings.AUTH_USER_MODEL),
        ),
    ]

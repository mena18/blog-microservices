# Generated by Django 3.1.3 on 2022-05-09 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='email',
            field=models.EmailField(default='email@gmail.com', max_length=254),
            preserve_default=False,
        ),
    ]

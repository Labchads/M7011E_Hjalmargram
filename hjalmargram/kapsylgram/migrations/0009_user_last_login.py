# Generated by Django 4.1.3 on 2023-01-03 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kapsylgram', '0008_alter_post_picture_alter_user_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
    ]

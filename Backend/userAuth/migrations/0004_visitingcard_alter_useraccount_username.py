# Generated by Django 4.2.7 on 2024-03-12 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAuth', '0003_alter_useraccount_managers'),
    ]

    operations = [
        migrations.CreateModel(
            name='VisitingCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('logo', models.ImageField(blank=True, null=True, upload_to='visiting_cards/')),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=20, null=True)),
                ('website', models.URLField(blank=True, null=True)),
                ('profession', models.CharField(blank=True, max_length=255, null=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('extracted_text', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='username',
            field=models.CharField(max_length=150, unique=True),
        ),
    ]
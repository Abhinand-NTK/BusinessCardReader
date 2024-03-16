from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class UserAccountManager(BaseUserManager):
    """
    Manager for the creating the user and the superuser
    """
    def create_user(self, email, fullname, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, fullname=fullname, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, fullname, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, fullname, password, **extra_fields)


class UserAccount(AbstractUser):
    """
    Table for storing the UserAcconutDetails
    """
    fullname = models.CharField(max_length=150)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fullname']

    objects = UserAccountManager()

    def __str__(self):
        return self.email

class VisitingCard(models.Model):
    """
    Table for Storing the extracted informations
    """
    logo = models.ImageField(upload_to='visiting_cards/', blank=True, null=True)
    name = models.CharField(max_length=255,null=True,blank=True)
    email = models.EmailField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    website = models.CharField(max_length = 225,blank=True, null=True)
    profession = models.CharField(max_length=255, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    extracted_text = models.TextField(blank=True, null=True)

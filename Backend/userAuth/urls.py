from django.urls import path,include
from .import views
from rest_framework import routers


userAuth  = routers.DefaultRouter()
userAuth.register(r'register-user', views.UserAccountCreateView, basename='register-user')
userAuth.register(r'fileupload', views.FileUpload, basename='fileupload')


urlpatterns = [
    path('', include(userAuth.urls)),
]
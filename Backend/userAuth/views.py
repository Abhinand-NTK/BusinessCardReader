from .serializers import UserAccountSerializer,VisitingCardSerilizer
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import UserAccount,VisitingCard
from rest_framework.response import Response
from rest_framework import status
from django.core.files.base import ContentFile
from PIL import Image
import pytesseract
import cv2
import io
import numpy as np 
import re


class UserAccountCreateView(ModelViewSet):
    """
    View hadling the useraccount creation
    """
    serializer_class = UserAccountSerializer
    queryset = UserAccount.objects.all()

class FileUpload(ModelViewSet):
    """
    View that handling the extraction of the data and the edit,delete
    used pytessarat for extract the data form the given card
    """
    serializer_class = VisitingCardSerilizer
    queryset = VisitingCard.objects.all()


    def create(self, request, *args, **kwargs):
        file = request.data.get('file', None)
        if file is None:
            return Response({'error': 'No file provided'}, status=400)

        extracted_data = self.process_image(file)

        
        return Response({'message': 'Visiting card saved successfully'}, status=status.HTTP_201_CREATED)

    def process_image(self, file):
        image = Image.open(file)

        gray_image = image.convert("L")

        extracted_text = pytesseract.image_to_string(gray_image, lang='eng')

        gray_array = np.array(gray_image)

        _, thresh = cv2.threshold(gray_array, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        max_contour = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(max_contour)
        logo = gray_array[y:y+h, x:x+w] 

        logo_io = io.BytesIO()
        Image.fromarray(logo).save(logo_io, format='JPEG')
        logo_io.seek(0)
        name_match = re.search(r'^([A-Za-z\s]+)', extracted_text)
        email_match = re.search(r'[\w\.-]+@[\w\.-]+', extracted_text)
        phone_match = re.search(r'\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b', extracted_text)
        website_match = re.search(r'\b(?:https?://)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2})?)\b', extracted_text)
        profession_match = re.search(r'Profession:\s*(\w+\s?\w*)', extracted_text)
        address_match = re.search(r'^\s*(\d+\s+[A-Za-z\s]+\n[A-Za-z\s,]+\n[A-Z]{2}\s+\d{5})', extracted_text)
        name = name_match.group().strip() if name_match else None
        email = email_match.group() if email_match else None
        phone_number = phone_match.group().strip() if phone_match else None
        website = website_match.group(1).strip() if website_match else None
        profession = profession_match.group(1) if profession_match else None
        address = address_match.group(1).strip() if address_match else None

        visiting_card = VisitingCard.objects.create(
            logo=ContentFile(logo_io.read(), name='logo.jpg'),
            name=name,
            email=email,
            phone_number=phone_number,
            website=website,
            profession=profession,
            address=address,
            extracted_text=extracted_text
        )

        return visiting_card

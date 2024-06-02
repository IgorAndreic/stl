from rest_framework import serializers
from .models import Font, Text3DModel

class FontSerializer(serializers.ModelSerializer):
    class Meta:
        model = Font
        fields = '__all__'
        
class Text3DModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text3DModel
        fields = '__all__'
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Font, Text3DModel
from .serializers import FontSerializer, Text3DModelSerializer
from .utils import create_text_image, image_to_3d, save_stl

class FontViewSet(viewsets.ModelViewSet):
    queryset = Font.objects.all()
    serializer_class = FontSerializer

class Text3DModelViewSet(viewsets.ModelViewSet):
    queryset = Text3DModel.objects.all()
    serializer_class = Text3DModelSerializer

    @action(detail=True, methods=['post'], url_path='generatestl')
    def generate_stl(self, request, pk=None):
        text3dmodel = self.get_object()
        font_path = text3dmodel.font.file.path
        image = create_text_image(text3dmodel.text, font_path=font_path, font_size=text3dmodel.font_size)
        text_mesh = image_to_3d(image)
        filename = f'{text3dmodel.text}.stl'
        filepath = f'media/stlfiles/{filename}'
        save_stl(text_mesh, filepath)
        text3dmodel.stl_file = filepath
        text3dmodel.save()
        return Response({'filename': filepath}, status=status.HTTP_200_OK)
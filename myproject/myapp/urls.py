from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import Text3DModelViewSet, FontViewSet

router = DefaultRouter()
router.register(r'fonts', FontViewSet)
router.register(r'text3dmodels', Text3DModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
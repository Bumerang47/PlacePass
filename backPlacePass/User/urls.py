"""PlacePass URL Configuration

"""
from rest_framework.routers import DefaultRouter

from .views import UserViewSet

router = DefaultRouter()
router.register('user', UserViewSet, base_name='user')

urlpatterns = router.urls

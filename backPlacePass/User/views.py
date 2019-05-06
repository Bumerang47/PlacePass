from django.db import transaction

from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_social_auth.views import SocialJWTPairUserAuthView

from PlacePass.utils import IsAuthenticatedOrCreate
from .models import User
from .serializers import UserSerializer, UserInfoSerializer, UserJWTPairSerializer, TokenObtainPairSerializer


class SocialJWTPairUserAuthView(SocialJWTPairUserAuthView):
    serializer_class = UserJWTPairSerializer


class TokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class UserViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticatedOrCreate,)

    def create(self, request):
        if request.auth is not None:
            return Response(status=status.HTTP_403_FORBIDDEN)

        user = request.data
        serializer = self.get_serializer(data=user)
        serializer.is_valid(raise_exception=True)
        with transaction.atomic():
            self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        validate_data = serializer.validated_data
        instance = serializer.save()
        instance.set_password(validate_data['password'])
        instance.save()

    @action(detail=False, methods=['get'], url_name='current_user', url_path='me')
    def current_user(self, request):
        return Response(UserInfoSerializer(request.user).data)

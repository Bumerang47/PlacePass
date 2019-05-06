
from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_social_auth.serializers import UserJWTPairSerializer

from .models import User


class UserInfoSerializer(serializers.Serializer):
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    email = serializers.CharField(read_only=True)


class UserJWTPairSerializer(UserJWTPairSerializer):
    member = UserInfoSerializer(source='*')


class TokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        user_serializer = UserInfoSerializer(self.user)
        data['member'] = user_serializer.data
        return data


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    tokens = serializers.SerializerMethodField()

    class Meta(object):
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', 'confirm_password', 'full_name', 'tokens')
        extra_kwargs = {
            'password': {'write_only': True},
            'last_name': {'write_only': True},
        }

    @staticmethod
    def get_tokens(obj):

        refresh = RefreshToken.for_user(obj)

        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
        return data

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        errors = dict()
        if password != confirm_password:
            errors['confirm_password'] = ['Passwords do not match']

        if errors:
            raise serializers.ValidationError(errors)
        data.pop('confirm_password')
        return super().validate(data)

    def to_internal_value(self, data):
        for key in list(data.keys()):
            if data[key] is None:
                data.pop(key)
        return super().to_internal_value(data)

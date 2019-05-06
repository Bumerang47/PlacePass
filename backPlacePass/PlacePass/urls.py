
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from User.views import TokenObtainPairView, SocialJWTPairUserAuthView


urlpatterns = [
    url(r'^api/', include('User.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^auth/token/obtain/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^auth/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
    url(r'^auth/social/jwt-pair-user/$', SocialJWTPairUserAuthView.as_view(), name='login_social_jwt_pair_user'),
    url(r'^auth/', include('rest_social_auth.urls_jwt_pair')),
]

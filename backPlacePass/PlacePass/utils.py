from rest_framework import permissions


class IsAuthenticatedOrCreate(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        # if request.method == 'POST':
        #     return True
        if view.action == 'create':
            return True
        return super(IsAuthenticatedOrCreate, self).has_permission(request, view)

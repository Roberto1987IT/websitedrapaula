from rest_framework import permissions

class IsSuperuser(permissions.BasePermission):
    """
    Custom Allow access
    Allows access only to superusers.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)
    
class IsNotAuthenticated(permissions.BasePermission):
    """
    Allows access only to unauthenticated users.
    """
    def has_permission(self, request, view):
        return bool(not request.user.is_authenticated)
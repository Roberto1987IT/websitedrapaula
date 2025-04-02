# settings.py

AUTH_USER_MODEL = 'users.CustomUser'

INSTALLED_APPS += [
    'rest_framework',
    'rest_framework.authtoken',
    'users',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
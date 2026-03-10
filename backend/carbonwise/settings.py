"""
CarbonWise Django Backend Settings
"""

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# ── SECURITY ─────────────────────────────────────
# IMPORTANT: Change this before deployment!
SECRET_KEY = 'django-carbonwise-hackathon-secret-key-change-in-production'

DEBUG = True  # Set to False in production

ALLOWED_HOSTS = ['*']  # Restrict in production

# ── APPS ─────────────────────────────────────────
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'carbonwise.urls'

TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [],
    'APP_DIRS': True,
    'OPTIONS': {
        'context_processors': [
            'django.template.context_processors.debug',
            'django.template.context_processors.request',
            'django.contrib.auth.context_processors.auth',
            'django.contrib.messages.context_processors.messages',
        ],
    },
}]

WSGI_APPLICATION = 'carbonwise.wsgi.application'

# ── DATABASE ─────────────────────────────────────
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ── STATIC FILES ─────────────────────────────────
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# ── CORS ─────────────────────────────────────────
CORS_ALLOW_ALL_ORIGINS = True  # Restrict in production:
# CORS_ALLOWED_ORIGINS = ['http://localhost:5173', 'https://your-domain.com']

# ── REST FRAMEWORK ────────────────────────────────
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.AllowAny'],
}

# ── AI API CONFIGURATION ─────────────────────────
# Using Groq (FREE — sign up at console.groq.com)
GROQ_API_KEY = os.environ.get('GROQ_API_KEY', 'npm run dev')
GROQ_MODEL   = 'llama-3.3-70b-versatile'

# Alternative free options (uncomment to use):
# TOGETHER_API_KEY = os.environ.get('TOGETHER_API_KEY', '')
# TOGETHER_MODEL = 'meta-llama/Llama-3-8b-chat-hf'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

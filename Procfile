web: python manage.py runserver 0.0.0.0:$PORT --noreload
web: python manage.py migrate && gunicorn locallibrary.wsgi

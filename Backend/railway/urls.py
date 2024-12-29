from django.urls import path
from . import views

urlpatterns = [
    path('register-user/', views.registerUser, name='register-user'),
    path('check-status/', views.check_status, name='check_status'),
    path('login/', views.login, name='login-user'),
    path('trains/', views.trainList, name='train-listing'),
    path('book-tickets/', views.book_tickets, name='book-tickets'),
    path('get-tickets/', views.get_tickets, name='get-tickets')
]

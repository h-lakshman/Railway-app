from django.contrib import admin
from .models import User, Train, Ticket

admin.site.register(User)
admin.site.register(Train)
admin.site.register(Ticket)

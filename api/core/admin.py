from django.contrib import admin

from core.models import ExampleModel
from core.models import GuestBookEntry

# Register your models here.
admin.site.register(ExampleModel)
admin.site.register(GuestBookEntry)
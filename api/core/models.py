import uuid
from django.db import models


class ExampleModel(models.Model):
    slug = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    test = models.CharField(max_length=60, null=True, blank=True)

# Creating the guest book entry model
class GuestBookEntry(models.Model):
    slug = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    username = models.CharField(max_length=50)
    message = models.TextField()
    created_at = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.username
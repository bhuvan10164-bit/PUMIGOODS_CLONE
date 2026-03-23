from django.db import models
from django.utils.text import slugify

class Product(models.Model):
    name        = models.CharField(max_length=255)
    slug        = models.SlugField(max_length=255, unique=True, blank=True)
    category    = models.CharField(max_length=100)
    price       = models.FloatField()
    currency    = models.CharField(max_length=10, default="USD")
    images      = models.JSONField(default=dict)
    description = models.JSONField(default=dict)
    features    = models.JSONField(default=list)
    quantity    = models.JSONField(default=dict)
    actions     = models.JSONField(default=dict)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

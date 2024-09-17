from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    desc = models.TextField(max_length=10000)
    image = models.ImageField(upload_to='images/',blank=True,null=True)
    date = models.DateField(auto_now_add=True)


    def __str__(self):
        return self.title

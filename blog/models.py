from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.
class Post(models.Model):
  title  = models.CharField(max_length=50)
  content = models.TextField(max_length=500)
  created = models.DateTimeField(default= timezone.now)
  author = models.ForeignKey(User,on_delete=models.CASCADE)
  # tags
  category = models.ForeignKey('Category',null=True,on_delete=models.SET_NULL)

  def __str__(self):
    return self.title

  class Meta:
        verbose_name = 'post'
        verbose_name_plural = 'posts'  

class Category(models.Model) :
  name = models.CharField(max_length=50 ) 

  def __str__(self):
    return self.name

  class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'
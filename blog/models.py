from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from taggit.managers import TaggableManager
# Create your models here.
class Post(models.Model):
  title  = models.CharField(max_length=50)
  content = models.TextField(max_length=500)
  created = models.DateTimeField(default= timezone.now)
  author = models.ForeignKey(User,on_delete=models.CASCADE)
  image = models.ImageField(upload_to='blog/',blank=True,null=True)
  # tags
  category = models.ForeignKey('Category',null=True,on_delete=models.SET_NULL)

  tags = TaggableManager(blank=True)

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
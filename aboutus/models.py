from django.db import models

# Create your models here.


class AboutUs(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    # image = models.ImageField(upload_to='about_us/')

    class Meta:
      verbose_name = 'about_us'
      verbose_name_plural = 'about_us'

    def __str__(self):
      return self.title 


class Why_Choose_Us(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()

    class Meta:
      verbose_name = 'why_choose_us'
      verbose_name_plural = 'why_choose_us'

    def __str__(self):
      return self.title


class Chef(models.Model):
    name = models.CharField(max_length=50)
    subtitle = models.CharField(max_length=50)
    bio = models.TextField()
    image = models.ImageField(upload_to='chef/')

    class Meta:
      verbose_name = 'chef'
      verbose_name_plural = 'chef' 

    def __str__(self):
      return self.name 

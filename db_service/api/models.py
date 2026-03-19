from django.db import models
from django.utils.text import slugify


class Employee(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    department = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class MealCategory(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Meal Categories"

    def __str__(self):
        return self.name


class Meal(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.ForeignKey(MealCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='meals')
    people = models.IntegerField(default=1)
    price = models.FloatField(default=0)
    preparation_time = models.IntegerField(default=0, help_text="In minutes")
    image = models.CharField(max_length=500, blank=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Chef(models.Model):
    name = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    image = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return self.name


class Reservation(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    number_of_persons = models.IntegerField(default=1)
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return f"{self.name} - {self.date} {self.time}"


class Appointment(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.date_time}"


class BlogCategory(models.Model):
    category_name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Blog Categories"

    def __str__(self):
        return self.category_name


class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=255)
    image = models.CharField(max_length=500, blank=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts')
    tags = models.CharField(max_length=500, blank=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.CharField(max_length=255)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f"{self.user} on {self.post.title}"

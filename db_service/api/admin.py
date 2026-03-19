from django.contrib import admin
from .models import (
    Employee, MealCategory, Meal, Chef, Reservation,
    Appointment, BlogCategory, Post, Comment
)

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'department')
    search_fields = ('name', 'email')

@admin.register(MealCategory)
class MealCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Chef)
class ChefAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'subtitle')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'date', 'time', 'number_of_persons')

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'date_time')

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category_name')

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'created')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', 'created')

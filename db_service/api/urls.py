from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'employees', views.EmployeeViewSet)
router.register(r'meal-categories', views.MealCategoryViewSet)
router.register(r'meals', views.MealViewSet)
router.register(r'chefs', views.ChefViewSet)
router.register(r'reservations', views.ReservationViewSet)
router.register(r'appointments', views.AppointmentViewSet)
router.register(r'blog-categories', views.BlogCategoryViewSet)
router.register(r'posts', views.PostViewSet)
router.register(r'comments', views.CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

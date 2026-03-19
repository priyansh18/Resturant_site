from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime

from .models import (
    Employee, MealCategory, Meal, Chef, Reservation,
    Appointment, BlogCategory, Post, Comment
)
from .serializers import (
    EmployeeSerializer, MealCategorySerializer, MealSerializer,
    ChefSerializer, ReservationSerializer, AppointmentSerializer,
    BlogCategorySerializer, PostSerializer, CommentSerializer
)


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class MealCategoryViewSet(viewsets.ModelViewSet):
    queryset = MealCategory.objects.all()
    serializer_class = MealCategorySerializer


class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

    @action(detail=False, url_path='by-slug/(?P<slug>[^/.]+)')
    def by_slug(self, request, slug=None):
        try:
            meal = Meal.objects.get(slug=slug)
            return Response(MealSerializer(meal).data)
        except Meal.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)

    @action(detail=False, url_path='by-category/(?P<category_id>[0-9]+)')
    def by_category(self, request, category_id=None):
        meals = Meal.objects.filter(category_id=category_id)
        return Response(MealSerializer(meals, many=True).data)


class ChefViewSet(viewsets.ModelViewSet):
    queryset = Chef.objects.all()
    serializer_class = ChefSerializer


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    @action(detail=False, url_path='upcoming')
    def upcoming(self, request):
        reservations = Reservation.objects.filter(date__gte=timezone.now().date())
        return Response(ReservationSerializer(reservations, many=True).data)


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    @action(detail=False, url_path='upcoming')
    def upcoming(self, request):
        start = request.query_params.get('start')
        end = request.query_params.get('end')
        if start and end:
            appointments = Appointment.objects.filter(
                date_time__gte=datetime.fromisoformat(start),
                date_time__lte=datetime.fromisoformat(end)
            )
        else:
            appointments = Appointment.objects.filter(date_time__gte=timezone.now())
        return Response(AppointmentSerializer(appointments, many=True).data)

    @action(detail=False, url_path='check-slot', methods=['post'])
    def check_slot(self, request):
        dt = request.data.get('date_time')
        exists = Appointment.objects.filter(date_time=dt).exists()
        return Response({'exists': exists})


class BlogCategoryViewSet(viewsets.ModelViewSet):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=False, url_path='search')
    def search(self, request):
        q = request.query_params.get('q', '')
        posts = Post.objects.filter(title__icontains=q)
        return Response(PostSerializer(posts, many=True).data)

    @action(detail=False, url_path='by-tag/(?P<tag>[^/.]+)')
    def by_tag(self, request, tag=None):
        posts = Post.objects.filter(tags__icontains=tag)
        return Response(PostSerializer(posts, many=True).data)

    @action(detail=False, url_path='by-category/(?P<category_id>[0-9]+)')
    def by_category(self, request, category_id=None):
        posts = Post.objects.filter(category_id=category_id)
        return Response(PostSerializer(posts, many=True).data)

    @action(detail=False, url_path='latest')
    def latest(self, request):
        post = Post.objects.first()
        if post:
            return Response(PostSerializer(post).data)
        return Response(None)

    @action(detail=True, methods=['get', 'post'], url_path='comments')
    def comments(self, request, pk=None):
        if request.method == 'GET':
            comments = Comment.objects.filter(post_id=pk)
            return Response(CommentSerializer(comments, many=True).data)
        else:
            data = request.data.copy()
            data['post'] = pk
            serializer = CommentSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=201)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

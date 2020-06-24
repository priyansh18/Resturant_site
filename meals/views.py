from django.shortcuts import render
from .models import Meals
# Create your views here.
def meal_list(request):
  meal_list=Meals.objects.all()
  context={'meal_list':meal_list}
  return render(request,'meals/list.html',context)

def meal_detail(request,slug):
  meal_detail=Meals.objects.get(slug=slug)
  context={'meal_detail':meal_detail}
  return render(request,'meals/detail.html',context)
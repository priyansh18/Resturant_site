from django.shortcuts import render
from .models import Chef, Why_Choose_Us, AboutUs
# Create your views here.


def aboutUs(request):
    aboutus = AboutUs.objects.last()
    why_choose_us = Why_Choose_Us.objects.all()
    chef = Chef.objects.all()

    context = {
        'aboutus': aboutus,
        'why_choose_us': why_choose_us,
        'all_chef': chef,
    }
    return render(request, 'aboutus/about.html', context)

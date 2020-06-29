from .forms import ContactForm
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render,redirect
from django.core.mail import send_mail,BadHeaderError
# Create your views here.


def send_email(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
          name=form.cleaned_data['name']
          from_email = form.cleaned_data['from_email']
          message = form.cleaned_data['message']

        try:
          send_mail(name,from_email,message,['spriy88@gmail.com'])

        except BadHeaderError:
          return HttpResponse('Invalid Header')  

        return redirect('contact:send_success') 

    else:
        form = ContactForm()

    context = {
        'form': form
    }

    return render(request, 'contact/contact.html', context)


def send_success(request):
    return HttpResponse('Thanks for your Response')

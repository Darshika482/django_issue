from django.shortcuts import render


# Home page view
def index(request):
    return render(request, "dashboard/index.html")


# Event page view
def event(request):
    return render(request, "dashboard/event.html")


# Gallery page view
def gallery(request):
    return render(request, "dashboard/gallery.html")

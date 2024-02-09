from django.urls import path
from . import views

urlpatterns = [
    path("home/", views.index, name="home"),  # Homepage
    path("home/", views.index, name="homee"),  # Homepage
    path("event/", views.event, name="event"),  # Event page
    path("gallery/", views.gallery, name="gallery"),  # Gallery page
]

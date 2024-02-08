from django.urls import path
from . import views
from .views import submit_contact_form
from .views import book_table

urlpatterns = [
    path("", views.index, name="home"),  # Homepage
    path("about/", views.about, name="about"),  # About page
    path("booking/", views.booking, name="booking"),  # Booking page
    path("contact/", views.contact, name="contact"),  # Contact page
    path("f&q/", views.F_and_Q, name="f&q"),  # FAQ page
    path("menu/", views.menu, name="menu"),  # Menu page
    path(
        "submit-contact-form/", submit_contact_form, name="submit_contact_form"
    ),  # contactus form
    path("book_table/", book_table, name="book_table"),  # bookingform
]

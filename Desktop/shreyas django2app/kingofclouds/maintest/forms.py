from django import forms
from .models import Contact
from .models import Booking


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ["name", "phone", "email", "message"]


class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = [
            "name",
            "email",
            "phone_number",
            "num_persons",
            "reservation_date",
            "reservation_time",
        ]

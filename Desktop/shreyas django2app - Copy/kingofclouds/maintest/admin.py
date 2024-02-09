from django.contrib import admin
from .models import Contact
from .models import Booking


class ContactAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "email", "message")


class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "s_no",
        "name",
        "email",
        "booking_date",
        "num_persons",
        "reservation_date",
        "reservation_time",
        "price",
        "upi_id",
    )


admin.site.register(Contact, ContactAdmin)
admin.site.register(Booking, BookingAdmin)

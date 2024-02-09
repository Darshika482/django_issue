from django.db import models


class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name


class Booking(models.Model):
    s_no = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    booking_date = models.DateTimeField(auto_now_add=True)
    num_persons = models.PositiveIntegerField()
    reservation_date = models.DateField()
    reservation_time = models.TimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    upi_id = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.s_no} - {self.name}"

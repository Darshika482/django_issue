from django.shortcuts import render, redirect

# model added
from .forms import ContactForm

# for showing error or confirmation messages
from django.contrib import messages


def index(request):
    # Render the homepage template
    return render(request, "maintest/index.html")


def about(request):
    # Render the about page template
    return render(request, "maintest/about.html")


def booking(request):
    # Render the booking page template
    return render(request, "maintest/booking.html")


def contact(request):
    # Render the contact page template
    return render(request, "maintest/contact.html")


def F_and_Q(request):
    # Render the FAQ page template
    return render(request, "maintest/f&q.html")


def menu(request):
    # Render the menu page template
    return render(request, "maintest/menu.html")


# homepage contact us form


from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactForm


def submit_contact_form(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Your message has been submitted successfully.")
            return redirect("home")  # Redirect to the homepage or any other page
    else:
        form = ContactForm()
    return render(
        request, "maintest/index.html", {"form": form}
    )  # Show the form initially


from .forms import BookingForm


def book_table(request):
    if request.method == "POST":
        form = BookingForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Your booking has been submitted successfully.")
            return redirect("home")
        else:
            print(form.errors)  # Add this line for debugging
    else:
        form = BookingForm()
    return render(request, "maintest/index.html", {"form": form})

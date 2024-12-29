from pyexpat import model
from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=10)
    password = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.first_name + self.last_name


class Train(models.Model):
    train_name = models.CharField(max_length=255)
    train_number = models.CharField(max_length=7)
    from_station = models.CharField(max_length=255)
    to_station = models.CharField(max_length=255)
    departure_time = models.CharField(max_length=255)
    arrival_time = models.CharField(max_length=255)
    available_seats = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.train_name


class Ticket(models.Model):
    pnr_number = models.AutoField(primary_key=True)
    people_count = models.IntegerField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    date = models.CharField(max_length=255)

    # class PNR(models.Model):
    #     ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)

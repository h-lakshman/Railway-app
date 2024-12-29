from os import access
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.forms.models import model_to_dict
from django.http import HttpRequest
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from .models import Ticket, Train, User


@api_view(['GET'])
def index(request):
    if request.version == 'v1':
        return Response(data="you are in version 1")
    return Response(data="version outdated")


@api_view(["POST", "GET"])
def registerUser(request):
    if request.method == "POST":
        if User.objects.filter(email=request.data['email']).exists():
            return Response({"exists": True})

        else:
            if request.data['password'] != request.data['cpassword']:
                return Response({"isPassword": False})

            else:
                user = User(
                    first_name=request.data['first_name'],
                    last_name=request.data['last_name'],
                    email=request.data['email'],
                    phone_number=request.data['phone_number'],
                    password=request.data['password'],
                )
                user.save()
                return Response({"isRegistered": True})

    elif request.method == "GET":
        return Response()


@api_view()
def check_status(request: HttpRequest):
    try:
        token = AccessToken(request.headers['token'])
        user_id = token.payload['user_id']

        if not token:
            return Response({"message": "Token not provided"}, status=400)
        pnr_number = int(request.GET.get('pnr'))
        ticket_db = Ticket.objects.get(pnr_number=pnr_number)
        ticket = {
            "pnr_number": pnr_number,
            "status": "CONFIRMED",
            "train_number": ticket_db.train.train_number,
            "from_station": ticket_db.train.from_station,
            "to_station": ticket_db.train.to_station,
            "date": ticket_db.date,
            "passenger_name": f'{ticket_db.user.first_name} {ticket_db.user.last_name}'
        }
        return Response({"ticket": ticket})

    except Exception as e:
        return Response({"message": "There is some Error in the server,Please contact us through mail",
                         "error": str(e)})


@api_view(["POST", "GET"])
def login(request):
    if request.method == "POST":
        if not User.objects.filter(email=request.data['email']).exists():
            return Response({"invalid_credentials": True})

        else:
            user = User.objects.get(email=request.data['email'])
            if user.password != request.data['password']:
                return Response({"invalid_credentials": True})

            access_token = RefreshToken.for_user(user).access_token
            access_token.payload['user_id'] = str(user.id)

            return Response({"isLoggedIn": True, "token": str(access_token)})

    elif request.method == "GET":
        return Response()


@api_view()
def trainList(request):

    from_station_param = request.GET.get('from')
    from_station = from_station_param.split('-')[1]
    to_station_param = request.GET.get('to')
    to_station = to_station_param.split('-')[1]

    trains = Train.objects.all()
    trains = trains.filter(available_seats__gte=1)
    available_trains = trains.filter(
        from_station=from_station, to_station=to_station)
    if not available_trains.exists():
        trains_today = trains.filter(from_station=from_station)
        if (trains_today.exists()):
            data = list(map(model_to_dict, trains_today.all()))
            return Response({"desired_trains": False, "available_trains": data})
        else:
            return Response({"desired_trains": False})
    data = list(map(model_to_dict, available_trains.all()))
    return Response({"available_trains": data, "desired_trains": True})


@api_view(['POST'])
def book_tickets(request: HttpRequest):
    try:
        train = Train.objects.get(
            train_number=request.data['train_number'])
        token = AccessToken(request.headers['token'])
        user_id = User.objects.filter(id=token.payload['user_id']).first()
        ticket = Ticket(
            people_count=request.data['people_count'],
            train=train,
            date=request.data['date'],
            user=user_id,
        )
        train.available_seats = str(
            int(train.available_seats) - int(request.data['people_count']))
        train.save()
        ticket.save()
        return Response({"Booking_confirmed": True})
    except Exception as e:
        print(str(e))
        return Response({"message": "There is some Error in the server,Please contact us through mail",
                         "Booking_confirmed": True,
                         "error": str(e)})


def spread_ticket(ticket):
    return {
        "pnr_number": ticket.pnr_number,
        "train_name": ticket.train.train_name,
        "train_number": ticket.train.train_number,
        "people_count": ticket.people_count,
        "passenger_name": f'{ticket.user.first_name}  {ticket.user.last_name}'

    }


@api_view(['GET'])
def get_tickets(request: HttpRequest):
    try:
        token = AccessToken(request.headers['token'])
        print(token)
        if not token:
            return Response({"message": "Token not provided"}, status=400)
        user = User.objects.filter(id=token.payload['user_id']).first()
        tickets = Ticket.objects.filter(user=user).all()
        ticket_list = list(map(spread_ticket, tickets))
        return Response({"ticket_list": ticket_list})
    except Exception as e:
        return Response({"message": "There is some Error in the server,Please contact us through mail",
                         "error": str(e)})


class StudentDoesNotExist(Exception):
    def __init__(self, message="Student doesnt exist"):
        self.message = message
        super().__init__(self.message)

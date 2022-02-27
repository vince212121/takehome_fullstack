from email import message
from pyexpat import model
from tkinter import N
import graphene
from graphene.types.generic import GenericScalar
from graphene_django import DjangoObjectType

from graphene import relay

from core.models import ExampleModel
from core.models import GuestBookEntry

class ExampleType(DjangoObjectType):
    class Meta:
        model = ExampleModel

# Guest type for booking entry model
class GuestType(DjangoObjectType):
    class Meta:
        model = GuestBookEntry
        interfaces = (relay.Node,)
        fields = "__all__"

class GuestConnection(relay.Connection):    
    class Meta:
        node = GuestType

class Query(graphene.ObjectType):
    examples = graphene.List(ExampleType)
    message = graphene.String(args={'text': graphene.String()})
    # all_guests = graphene.List(GuestType)
    # all_guests = relay.ConnectionField(GuestConnection)
    guests = relay.ConnectionField(GuestConnection)
    guest_by_slug = graphene.Field(GuestType, slug=graphene.String(required=True))

    def resolve_examples(self, info):
        return ExampleModel.objects.all()

    def resolve_message(self, info, text):
        return f"The passed in text was: {text}"

    # Queries for all guests and a specific guest from the slug
    # def resolve_all_guests(self, info):
    #     try:
    #         # p = Paginator(GuestBookEntry.objects.all(), 3)
    #         # return p
    #         return GuestBookEntry.objects.all()
    #     except GuestBookEntry.DoesNotExist:
    #         return None

    def resolve_guests(root, info, **kwargs):
        try:
            return GuestBookEntry.objects.all()
        except GuestBookEntry.DoesNotExist:
            return None

    def resolve_guest_by_slug(self, info, slug):
        try:
            return GuestBookEntry.objects.get(slug=slug)
        except GuestBookEntry.DoesNotExist:
            return None


class PlaceholderMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        num1 = graphene.Int()
        num2 = graphene.Int()

    # what the mutation returns
    output = graphene.Int()
    message = graphene.String()

    def mutate(self, info, num1, num2):
        result = num1 + num2
        return PlaceholderMutation(output=result, message="Added given numbers together")

# used to store the username and message
class GuestInput(graphene.InputObjectType):
    username = graphene.String()
    message = graphene.String()

class CreateGuest(graphene.Mutation):
    
    # input
    class Arguments:
        guest_data = GuestInput(required=True)
    
    # output
    guest = graphene.Field(GuestType)
    message = graphene.String()

    # creating a new guest booking and saving to database
    def mutate(root, info, guest_data=None):
        guest = GuestBookEntry(
            username=guest_data.username,
            message=guest_data.message
        )
        guest.save()
        return CreateGuest(guest=guest, message=f"{guest.username} was added to the guest booking")

class DeleteGuest(graphene.Mutation):

    # input
    class Arguments:
        slug = graphene.String()
    
    # output
    message = graphene.String()

    # finds the database and deletes it
    def mutate(root, info, slug):
        try:
            guest = GuestBookEntry.objects.get(slug=slug)
            username = guest.username
            guest.delete()
            return DeleteGuest(message=f"Deleted guest booking for {username}")
        except GuestBookEntry.DoesNotExist:
            return DeleteGuest(message="Guest was not found in database")
class Mutation(graphene.ObjectType):
    placeholder_mutation = PlaceholderMutation.Field()
    create_guest = CreateGuest.Field()
    delete_guest = DeleteGuest.Field()
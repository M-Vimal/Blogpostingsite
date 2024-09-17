from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post
from django.core.validators import validate_email
from django.core.exceptions import ValidationError



class userregisterserializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','email','password','id']
    
    def validate_email(self, value):
        # Validate email format
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Invalid email format.")
        # Check if email already exists
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self,data):
        user=User.objects.create_user(
            username = data['username'],
            email=data['email'],
            password=data['password']   
        )
        return user
        
class userloginserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','id']
    


class postserializer(serializers.ModelSerializer):
    image = serializers.ImageField(required = False,allow_null = True)
    class Meta:
        model = Post
        fields = ['id','title','author','desc','date','image']
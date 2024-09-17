from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import userregisterserializer,postserializer,userloginserializer
from .models import Post

# Create your views here.
class HomeView(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        posts = Post.objects.all()
        print(posts)
        serializer = postserializer(posts,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class SingleblogApiView(APIView):
    permission_classes = [AllowAny]
    def get(self,request,pk):
        blog = Post.objects.get(id=pk)
        serializer = postserializer(blog)
        return Response(serializer.data,status=status.HTTP_200_OK)


class LoginApiView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username,password=password)
        try:
            if user:
                refreshtoken = RefreshToken.for_user(user)
                accesstoken = str(refreshtoken.access_token)
                response = {
                    'user':userloginserializer(user).data,
                    'refresh':str(refreshtoken),
                    'access':accesstoken
                }
                return Response(response,status=status.HTTP_200_OK)
        
            else:
                return Response({"message":"invalid username or password"},status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(str(e))
            return Response(e)
class LogoutApiView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        refresh = request.data.get('refresh')
        try:
            if refresh:
                token = RefreshToken(refresh)
                token.blacklist()
                return Response({'message':"successfully logout"},status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Refresh token not provided'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({"error":str(e)})
class RegisterApiView(APIView):
    permission_classes= [AllowAny]
    def post(self,request):
        try:
            user = userregisterserializer(data=request.data)
            if user.is_valid():
                user.save()  # Save the user if data is valid
                print(user)
                refreshtoken = RefreshToken.for_user(user.instance)
                accesstoken = str(refreshtoken.access_token)
                response = {
                    'user':userregisterserializer(user.instance).data,
                    'refresh':str(refreshtoken),
                    'access':accesstoken
                }
                return Response(response, status=status.HTTP_201_CREATED)
            else:
                # Return validation errors with a 400 status code
                print(user.errors)
                return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            # Handle any other exceptions and return a 500 status code
            print(f"Error occurred: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MypostApiView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = postserializer
    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author = user)

    

class UpdateDeleteApiView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = postserializer
    queryset = Post.objects.all()
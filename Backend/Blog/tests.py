from django.test import TestCase
from rest_framework.test import APIRequestFactory

class TestMehods(TestCase):
    def test_mypost(self):
        t1 = APIRequestFactory()
        request = t1.get('/myposts/')
        print("from",request)
        self.assertEqual(request.path, '/myposts/')  # Optional assertion

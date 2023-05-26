from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request

@app_views.route('/validate/<email>', methods=["POST"], strict_slashes=False)
def validate(email):
    """Validate email"""
    import requests

    url = "https://mailcheck.p.rapidapi.com/"

    querystring = {"domain":email}

    headers = {
        "X-RapidAPI-Key": "6f999abc05msha0292f7decce763p1bcbe4jsn9fbbb20e0536",
        "X-RapidAPI-Host": "mailcheck.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    print(response.json())
    
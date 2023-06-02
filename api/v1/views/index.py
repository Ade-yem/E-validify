from models import storage
from models.email import Email
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flask_login import login_required, current_user
from os import environ


def validate(email):
    """Validate email"""
    url = "https://mailcheck.p.rapidapi.com/"
    querystring = {"domain": email}
    headers = {
        "X-RapidAPI-Key": environ.get('API_KEY'),
        "X-RapidAPI-Host": environ.get('API_HOST')
    }
    try:
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        abort(500, description=str(e))


@app_views.route('/validate_guest', methods=["POST"], strict_slashes=False)
def validate_guest():
    """validate guest email input"""
    if not request.is_json:
        abort(400, description="Not a JSON")
    email = request.get_json.get('email')
    if not email:
        abort(400, description="Email not provided")
    return jsonify(validate(email))


def create_email():
    """Add email entered by user to the database"""
    if not current_user:
        return jsonify({'message': 'User not logged in'}), 401
    email_address = request.get_json().get('email')
    if not email_address:
        abort(400, description="Email not provided")
    email = Email(email=email_address, user_id=current_user.id)
    email.save()
    return jsonify({'message': 'Email created successfully'})


@app_views.route('/validate', methods=["POST"], strict_slashes=False)
@login_required
def validate_user_email():
    """validate email inputted by user"""
    if not request.is_json:
        abort(400, description="Not a JSON")
    email_address = request.json.get('email')
    if not email_address:
        abort(400, description="Email not provided")
    email = Email(email=email_address, details=validate(email_address), user_id=current_user.id)
    email.save()
    return jsonify({validate(email_address)})

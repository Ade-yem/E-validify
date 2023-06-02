from flask import Flask, request, jsonify, make_response
from api.v1.views import app_auth
from models import storage
from models.user import User
from models import storage
from hashlib import md5
from flask_login import login_user, logout_user, login_required, current_user, LoginManager


@login_required
def create_session():
 login_user(user)


@app_auth.route('/signup', methods=['POST'], strict_slashes=False)
def sign_up():
    """Creates a user"""
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    print(data)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if username is None or password is None:
        abort(400)
    users = storage.all(User).values()
    # Check if the username already exists
    if any(user.username == username for user in users):
        return jsonify({'message': 'Username already exists'}), 400
    if any(user.email == email for user in users):
        return jsonify({'message': 'Email already exists'}), 400
    # Create a new user
    instance = User(**data)
    instance.is_authenticated = True
    instance.save()
    return make_response(jsonify({'message': f'User {username} created successfully',
                                   'username': username, 'id': instance.id}), 201)


@app_auth.route('/signin', methods=['POST'], strict_slashes=False)
def sign_in():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    # remember = True if data.get('remember') else False
    users = storage.all(User).values()
    for user in users:
        if user.email == email and user.password == md5(password.encode()).hexdigest():
            login_user(user)
            return jsonify({'message': 'Sign in successful', "username": user.username, 'id': user.id}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

@app_auth.route('/signout', methods=['POST'], strict_slashes=False)
@login_required
def logout():
    """log out user"""
    logout_user()
    return jsonify({'message': 'Logged out successfully'})

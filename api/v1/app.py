""" Flask Application """
from os import environ
from flask import Flask, make_response, jsonify, render_template
from flask_login import LoginManager
from flask_cors import CORS
from flasgger import Swagger
from flasgger.utils import swag_from
from api.v1.views import app_views
from api.v1.views import app_auth

import secrets

secret_key = secrets.token_hex(32)

app = Flask(__name__)
app.secret_key = secret_key
login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    return storage.get(User, user_id)
    
login_manager.init_app(app)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)
app.register_blueprint(app_auth)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)


app.config['SWAGGER'] = {
    'title': 'E-validify Restful API',
    'uiversion': 3
}

Swagger(app)


if __name__ == "__main__":
    """ Main Function """
    host = environ.get('VALIDIFY_API_HOST')
    port = environ.get('VALIDIFY_API_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    app.run(host=host, port=port, threaded=True, debug=True)

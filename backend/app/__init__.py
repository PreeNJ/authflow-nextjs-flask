from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db, jwt
from .routes.auth import auth_bp
from .routes.user import user_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(
        app,
        resources={r"/*": {"origins": "http://localhost:3000"}}
    )

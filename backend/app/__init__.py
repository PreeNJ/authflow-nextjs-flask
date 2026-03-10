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

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(user_bp, url_prefix="/user")

    with app.app_context():
        db.create_all()

    return app
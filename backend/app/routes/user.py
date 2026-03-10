from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User
user_bp = Blueprint("user", __name__)
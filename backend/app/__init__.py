from flask import Flask
from flask_cors import CORS
from app.routes.pets import pets_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(pets_bp)
    return app
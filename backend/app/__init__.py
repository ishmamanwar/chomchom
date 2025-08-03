import os
from flask import Flask, send_from_directory
from flask_cors import CORS

from app.routes.pets import pets_bp
from app.routes.feeding import feeding_bp
from app.routes.medications import medications_bp
from app.routes.vet import vet_bp
from app.routes.upload import upload_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register all blueprints
    app.register_blueprint(pets_bp)
    app.register_blueprint(feeding_bp)
    app.register_blueprint(medications_bp)
    app.register_blueprint(vet_bp)
    app.register_blueprint(upload_bp)

    return app
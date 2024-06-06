from flask import Blueprint, request, jsonify, current_app
from .models import User
from . import db
import os
import uuid
from .utils import verify_user_image

bp = Blueprint('routes', __name__)

@bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.form
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        image = request.files.get('image')

        current_app.logger.info(f"Received data: {data}")
        current_app.logger.info(f"Received files: {request.files}")

        if not email:
            return jsonify({'message': 'Email is required'}), 400

        if User.query.filter_by(username=username).first() is not None:
            return jsonify({'message': 'Username already exists'}), 400

        if User.query.filter_by(email=email).first() is not None:
            return jsonify({'message': 'Email already exists'}), 400

        if not image:
            return jsonify({'message': 'Image is required'}), 400

        # Ensure the upload directory exists
        upload_dir = os.path.join('backend/static/uploads')
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)

        image_path = os.path.join(upload_dir, f"{uuid.uuid4()}.jpg")
        image.save(image_path)

        user = User(username=username, email=email, password_hash=password, image_path=image_path)
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'Signup successful', 'username': username}), 201
    except Exception as e:
        current_app.logger.error(f"Error during signup: {e}")
        return jsonify({'message': 'Internal Server Error during signup', 'error': str(e)}), 500

@bp.route('/verify/<username>', methods=['POST'])
def verify(username):
    try:
        user = User.query.filter_by(username=username).first_or_404()

        if 'image' not in request.files:
            return jsonify({'message': 'No image provided'}), 400

        image = request.files['image']
        verify_image_path = os.path.join('backend/static/uploads', f"verify_{uuid.uuid4()}.jpg")
        image.save(verify_image_path)

        if verify_user_image(user.image_path, verify_image_path):
            return jsonify({'message': f'Welcome, {username}!'}), 200
        else:
            return jsonify({'message': 'Sorry, verification unsuccessful!'}), 401
    except Exception as e:
        current_app.logger.error(f"Error during verification: {e}")
        return jsonify({'message': 'Internal Server Error during verification', 'error': str(e)}), 500

@bp.route('/dashboard/<username>', methods=['GET'])
def dashboard(username):
    try:
        user = User.query.filter_by(username=username).first_or_404()
        return jsonify({'username': user.username, 'email': user.email})
    except Exception as e:
        current_app.logger.error(f"Error during fetching dashboard: {e}")
        return jsonify({'message': 'Internal Server Error during fetching dashboard', 'error': str(e)}), 500

@bp.route('/api/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify([{
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'photo': user.image_path,
            'status': 'allowed' if verify_user_image(user.image_path, user.image_path) else 'pending'
        } for user in users])
    except Exception as e:
        current_app.logger.error(f"Error during fetching users: {e}")
        return jsonify({'message': 'Internal Server Error during fetching users', 'error': str(e)}), 500

@bp.route('/api/users/<int:user_id>/allow', methods=['POST'])
def allow_user(user_id):
    try:
        user = User.query.get_or_404(user_id)
        user.status = 'allowed'
        db.session.commit()
        return jsonify({'message': f'User {user.username} allowed'}), 200
    except Exception as e:
        current_app.logger.error(f"Error during allowing user: {e}")
        return jsonify({'message': 'Internal Server Error during allowing user', 'error': str(e)}), 500

@bp.route('/api/users/<int:user_id>/deny', methods=['POST'])
def deny_user(user_id):
    try:
        user = User.query.get_or_404(user_id)
        user.status = 'denied'
        db.session.commit()
        return jsonify({'message': f'User {user.username} denied'}), 200
    except Exception as e:
        current_app.logger.error(f"Error during denying user: {e}")
        return jsonify({'message': 'Internal Server Error during denying user', 'error': str(e)}), 500
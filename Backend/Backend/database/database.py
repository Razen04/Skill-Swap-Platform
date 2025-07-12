from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# User model example
class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(100))
    profile_photo_url = db.Column(db.String(255))
    skills_offered = db.Column(db.Text)  # store as comma-separated string
    skills_wanted = db.Column(db.Text)
    availability = db.Column(db.String(50))
    role = db.Column(db.String(50), default='user')  # e.g., 'user', 'admin'
    is_banned = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.name}>'
    

# in models.py or wherever your model is defined
class SwapRequest(db.Model):
    __tablename__ = 'swap_requests'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    skill_offered = db.Column(db.String(100), nullable=False)
    skill_requested = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text)
    status = db.Column(db.String(20), default='pending')  # pending, accepted, rejected
    feedback = db.Column(db.Text)  # optional
    rating = db.Column(db.Integer)  # optional: out of 5
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
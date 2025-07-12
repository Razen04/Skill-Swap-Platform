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
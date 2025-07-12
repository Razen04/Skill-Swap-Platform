from flask import Flask, request, jsonify, session
from flask_cors import CORS
import bcrypt

from database.database import db, User  


app = Flask(__name__)
  # Enable CORS with credentials support

app.secret_key = 'your_secret_key'  # Set a secret key for session management

# DB config and init
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = True  # even on localhost with modern browsers

CORS(app, supports_credentials=True)
db.init_app(app)

# Create tables once
with app.app_context():
    db.create_all()

# Register endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.form
    try:
        hashed_pw = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

        skills_offered = data.get('skills_offered', '')
        if isinstance(skills_offered, list):
            skills_offered = ','.join(skills_offered)

        skills_wanted = data.get('skills_wanted', '')
        if isinstance(skills_wanted, list):
            skills_wanted = ','.join(skills_wanted)

        print(skills_offered, skills_wanted)
        user = User(
            name=data['name'],
            email=data['email'],
            password_hash=hashed_pw.decode('utf-8'),
            availability=data.get('availability'),
            location=data.get('location'),
            skills_offered=skills_offered,
            skills_wanted=skills_wanted,
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({'status': 'ok', 'message': 'User registered successfully'})
    except Exception as e:
        print("❌ Registration error:", e)
        return jsonify({'status': 'fail', 'message': 'Something went wrong'}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.form
    try:
        user = User.query.filter_by(email=data['email']).first()
        if user and bcrypt.checkpw(data['password'].encode('utf-8'), user.password_hash.encode('utf-8')):
            session['user_id'] = user.user_id 
            return jsonify({'status': 'ok', 'message': 'Login successful', 'userId': user.user_id})
        else:
            return jsonify({'status': 'fail', 'message': 'Invalid credentials'}), 401
    except Exception as e:
        print("❌ Login error:", e)
        return jsonify({'status': 'fail', 'message': 'Something went wrong'}), 500

# Users endpoint
@app.route('/users', methods=['GET'])
def get_users():
    try:
        if 'user_id' not in session:
            return jsonify({'status': 'fail', 'message': 'Unauthorized'}), 401
        users = User.query.all()
        try:
            my_id = int(session['user_id'])
        except Exception:
            my_id = session['user_id']

        user_list = []
        for user in users:
            if user.user_id == my_id or user.is_banned:
                continue
            skills_offered = [s.strip() for s in user.skills_offered.split(',')] if getattr(user, 'skills_offered', None) else []
            skills_wanted = [s.strip() for s in user.skills_wanted.split(',')] if getattr(user, 'skills_wanted', None) else []
            print(f"User {user.user_id} skills offered: {skills_offered}, skills wanted: {skills_wanted}")
            user_list.append({
                'user_id': user.user_id,
                'name': user.name,
                'email': user.email,
                'location': user.location,
                'availability': user.availability,
                'skills_offered': skills_offered,
                'skills_wanted': skills_wanted,
                'profile_photo_url': user.profile_photo_url,
                'is_public': user.is_public,
                'is_banned': user.is_banned,
            })

        return jsonify({'status': 'ok', 'users': user_list})

    except Exception as e:
        print("❌ Fetch users error:", e)
        return jsonify({'status': 'fail', 'message': 'Something went wrong'}), 500


#update profile endpoint
@app.route('/update-profile', methods=['POST'])
def update_profile():
    try:
        # Check if the user is logged in
        if 'user_id' not in session:
            return jsonify({'status': 'fail', 'message': 'Unauthorized'}), 401

        user = User.query.get(session['user_id'])

        # Get new data from form
        data = request.form

        # Optional updates
        user.name = data.get('name', user.name)
        user.location = data.get('location', user.location)
        user.availability = data.get('availability', user.availability)
        user.profile_photo_url = data.get('profile_photo_url', user.profile_photo_url)
        # Update skills fields if present
        if 'skills_offered' in data:
            user.skills_offered = data['skills_offered']
        if 'skills_wanted' in data:
            user.skills_wanted = data['skills_wanted']

        # Public/private switch
        if 'is_public' in data:
            user.is_public = data['is_public'].lower() == 'true'

        db.session.commit()

        return jsonify({'status': 'ok', 'message': 'Profile updated successfully'})

    except Exception as e:
        print("❌ Profile update error:", e)
        return jsonify({'status': 'fail', 'message': 'Something went wrong'}), 500
    

# logout endpoint
@app.route('/logout', methods=['POST'])
def logout():
    try:
        session.clear()
        return jsonify({'status': 'ok', 'message': 'Logged out', 'redirect': '/login'})
    except Exception as e:
        print("❌ Logout error:", e)
        return jsonify({'status': 'fail', 'message': 'Something went wrong'}), 500
    
@app.route('/profile', methods=['GET'])
def view_profile():
    try:
        if 'user_id' not in session:
            return jsonify({'status': 'fail', 'message': 'Unauthorized'}), 401

        user = User.query.get(session['user_id'])
        if not user:
            return jsonify({'status': 'fail', 'message': 'User not found'}), 404

        user_data = {
            'name': user.name,
            'email': user.email,
            'location': user.location,
            'availability': user.availability,
            'profile_photo_url': user.profile_photo_url,
            'skills_offered': user.skills_offered,
            'skills_wanted': user.skills_wanted,
        }

        return jsonify({'status': 'ok', 'profile': user_data})

    except Exception as e:
        print("❌ View profile error:", e)
        return jsonify({'status': 'fail', 'message': 'Something went wrong'}), 500
    
if __name__ == '__main__':
    app.run(port=5000, debug=True)
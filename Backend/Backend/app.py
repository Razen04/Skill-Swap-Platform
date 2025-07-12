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

        user = User(
            name=data['name'],
            email=data['email'],
            password_hash=hashed_pw.decode('utf-8'),
            availability=data.get('availability'),
            location=data.get('location'),
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

        my_id = session['user_id']
        print("My ID:", my_id)

        user_list = [{
            'user_id': user.user_id,
            'name': user.name,
            'email': user.email,
            'location': user.location,
            'availability': user.availability,
            'profile_photo_url': user.profile_photo_url,
            'is_public': user.is_public,
            'is_banned': user.is_banned,
        } for user in users if user.user_id != my_id and not user.is_banned]

        print("User list:", user_list)

        return jsonify({'status': 'ok', 'users': user_list})

    except Exception as e:
        print("❌ Fetch users error:", e)
        return jsonify({'status': 'fail', 'message': 'Something went wrong'}), 500

    
if __name__ == '__main__':
    app.run(port=5000, debug=True)
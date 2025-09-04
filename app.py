import os
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix

# Configure logging for debugging
logging.basicConfig(level=logging.DEBUG)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Detect database URL or fallback to writable SQLite in /tmp
database_url = os.environ.get("DATABASE_URL")
if not database_url:
    database_url = "sqlite:////tmp/dyslexify.db"  # ✅ writable path on Vercel

# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# File upload settings (memory only on Vercel)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Initialize the app with extensions
db.init_app(app)

with app.app_context():
    import models  # noqa: F401
    import routes  # noqa: F401
    
    # Create all database tables (only works for SQLite fallback)
    try:
        db.create_all()
    except Exception as e:
        logging.error(f"Database initialization failed: {e}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config

# ایجاد شیء دیتابیس
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)

    # واردات تأخیری برای جلوگیری از واردات دایره‌ای
    with app.app_context():
        from .routes import main_bp
        app.register_blueprint(main_bp)

    return app

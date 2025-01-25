from . import db  # وارد کردن db از __init__.py
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = 'users'  # تصحیح نام جدول به users

    id = db.Column(db.Integer, primary_key=True)
    national_id = db.Column(db.String(10), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    phone_number = db.Column(db.String(15), nullable=True)
    address = db.Column(db.Text, nullable=True)
    car_type = db.Column(db.String(50), nullable=True)
    car_model = db.Column(db.String(50), nullable=True)
    car_number = db.Column(db.String(20), nullable=True)


    def set_password(self, password):
        """هش کردن رمز عبور هنگام ذخیره"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """مقایسه رمز عبور وارد شده با هش ذخیره‌شده"""
        return check_password_hash(self.password_hash, password)


# مدل مدیران با اطلاعات پیش‌فرض
class Manager(UserMixin, db.Model):
    __tablename__ = 'managers'
    
    id = db.Column(db.Integer, primary_key=True)
    national_id = db.Column(db.String(10), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    position = db.Column(db.String(50), nullable=False)  # سمت مدیر

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


@db.event.listens_for(Manager.__table__, 'after_create')
def insert_default_managers(target, connection, **kwargs):
    from sqlalchemy.orm import sessionmaker

    Session = sessionmaker(bind=connection)
    session = Session()

    default_managers = [
        {'national_id': '1234567890', 'first_name': 'محسن', 'last_name': 'پیرزاد', 'password': '12345', 'position': 'رییس هیئت مدیره'},
        {'national_id': '0987654321', 'first_name': 'حامد', 'last_name': 'جوانزاد', 'password': '54321', 'position': 'مدیر عامل'}
    ]

    for manager in default_managers:
        new_manager = Manager(
            national_id=manager['national_id'],
            first_name=manager['first_name'],
            last_name=manager['last_name'],
            position=manager['position']
        )
        new_manager.set_password(manager['password'])  # هش کردن رمز عبور
        session.add(new_manager)

    session.commit()



from . import db  # اطمینان از وارد کردن db از app/__init__.py

class SignupRequest(db.Model):
    __tablename__ = 'signup_requests'  # نام جدول در پایگاه داده

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    national_id = db.Column(db.String(10), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    address = db.Column(db.Text, nullable=False)
    car_type = db.Column(db.String(50), nullable=False)
    car_model = db.Column(db.String(50), nullable=False)
    car_number = db.Column(db.String(20), nullable=False)
    photo_path = db.Column(db.String(100), nullable=False)
    green_card_path = db.Column(db.String(100), nullable=False)
    signature_path = db.Column(db.String(100), nullable=False)
    approved_by_manager1 = db.Column(db.Boolean, default=False)
    approved_by_manager2 = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<SignupRequest {self.first_name} {self.last_name} {self.national_id}>"

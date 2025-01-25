from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from .models import User  # مدل کاربر را وارد می‌کنیم
from . import db  # اطمینان از وارد کردن db از app/__init__.py
from .models import User, Manager
from .models import User, Manager, SignupRequest 
import os
from werkzeug.utils import secure_filename



main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def home():
    return render_template('splash.html')


@main_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # بررسی مدیران
        manager = Manager.query.filter_by(national_id=username).first()
        if manager and manager.check_password(password):
            session['user_id'] = manager.id
            return redirect(url_for('main.manager_dashboard'))

        # بررسی کاربران عادی
        user = User.query.filter_by(national_id=username).first()
        if user and user.check_password(password):
            session['user_id'] = user.id
            return redirect(url_for('main.dashboard'))

        return "نام کاربری یا رمز عبور اشتباه است", 403

    return render_template('login.html')

@main_bp.route('/admin_dashboard')
def admin_dashboard():
    if 'user_id' not in session:
        return redirect(url_for('main.login'))

    manager = Manager.query.get(session['user_id'])
    if not manager:
        return redirect(url_for('main.login'))

    # دریافت درخواست‌های معلق
    pending_requests = SignupRequest.query.filter_by(
        approved_by_manager1=False,
        approved_by_manager2=False
    ).all()

    pending_requests_count = len(pending_requests)  # محاسبه تعداد درخواست‌های معلق

    return render_template('admin_dashboard.html', pending_requests=pending_requests, pending_requests_count=pending_requests_count)

@main_bp.route('/approve_request/<int:request_id>/<int:manager_id>', methods=['POST'])
def approve_request(request_id, manager_id):
    signup_request = SignupRequest.query.get(request_id)

    if manager_id == 1:
        signup_request.approved_by_manager1 = True
    elif manager_id == 2:
        signup_request.approved_by_manager2 = True

    if signup_request.approved_by_manager1 and signup_request.approved_by_manager2:
        # افزودن کاربر به دیتابیس کاربران نهایی
        new_user = User(
            first_name=signup_request.first_name,
            last_name=signup_request.last_name,
            national_id=signup_request.national_id,
            password_hash=signup_request.password,
            phone_number=signup_request.phone_number,
            address=signup_request.address,
            car_type=signup_request.car_type,
            car_model=signup_request.car_model,
            car_number=signup_request.car_number,
            photo_path=signup_request.photo_path
        )
        db.session.add(new_user)
        db.session.delete(signup_request)
        flash('کاربر با موفقیت تایید شد و به سیستم اضافه شد.', 'success')

    db.session.commit()
    return redirect(url_for('main.admin_dashboard'))

@main_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        first_name = request.form['first-name']
        last_name = request.form['last-name']
        national_id = request.form['national-id']
        password = request.form['password']
        phone_number = request.form['phone-number']
        address = request.form['address']
        car_type = request.form['car-type']
        car_model = request.form['car-model']
        car_number = request.form['car-number']

        # ذخیره فایل‌های آپلود شده
        user_folder = os.path.join('static/users_data', national_id)
        os.makedirs(user_folder, exist_ok=True)

        user_photo = request.files['user-photo']
        green_card = request.files['green-card']

        user_photo_filename = secure_filename(f"user.{user_photo.filename.split('.')[-1]}")
        green_card_filename = secure_filename(f"green_card.{green_card.filename.split('.')[-1]}")

        user_photo.save(os.path.join(user_folder, user_photo_filename))
        green_card.save(os.path.join(user_folder, green_card_filename))

        # ثبت درخواست عضویت
        new_request = SignupRequest(
            first_name=first_name,
            last_name=last_name,
            national_id=national_id,
            password=password,
            phone_number=phone_number,
            address=address,
            car_type=car_type,
            car_model=car_model,
            car_number=car_number,
            photo_path=f'{user_folder}/{user_photo_filename}',
            green_card_path=f'{user_folder}/{green_card_filename}',
            signature_path=f'{user_folder}/signature.png',
            approved_by_manager1=False,
            approved_by_manager2=False
        )

        db.session.add(new_request)
        db.session.commit()

        return render_template('signup_success.html', national_id=national_id)

    return render_template('signup.html')

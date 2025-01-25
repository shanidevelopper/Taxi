from app import create_app
from app.models import db, Manager
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    # ایجاد جداول پایگاه داده
    db.create_all()

    # اضافه کردن رییس هیئت مدیره به صورت پیش‌فرض
    president = Manager.query.filter_by(national_id="1234567890").first()
    if not president:
        president = Manager(
            national_id="1234567890",
            first_name="محسن",
            last_name="پیرزاد",
            position="رییس هیئت مدیره"
        )
        president.set_password("12345")  # هش کردن رمز عبور
        db.session.add(president)

    # اضافه کردن مدیر عامل به صورت پیش‌فرض
    ceo = Manager.query.filter_by(national_id="0987654321").first()
    if not ceo:
        ceo = Manager(
            national_id="0987654321",
            first_name="امید",
            last_name="جوانزاد",
            position="مدیر عامل"
        )
        ceo.set_password("54321")  # هش کردن رمز عبور
        db.session.add(ceo)

    db.session.commit()
    print("مدیران پیش‌فرض اضافه شدند.")

# اجرای اپلیکیشن
if __name__ == '__main__':
    app.run(debug=True)


/* Fonts */
@font-face {
    font-family: 'BHoma';
    src: url('/static/fonts/BHoma.ttf') format('truetype');
}

@font-face {
    font-family: 'BYekan';
    src: url('/static/fonts/BYekan.ttf') format('truetype');
}


/* تنظیمات کلی */
body {
    margin: 0;
    padding: 0;
    font-family: 'BYekan', Tahoma, Arial, sans-serif;
    background: linear-gradient(to bottom, #c0c0c0, #d4af37); /* گرادینت نقره‌ای به طلایی */
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    direction: rtl;
    overflow-x: hidden;
}

/* هدر شیشه‌ای */
.header {
    background: rgba(255, 255, 255, 0.3); /* پس‌زمینه نیمه‌شفاف */
    backdrop-filter: blur(10px); /* افکت شیشه‌ای */
    padding: 10px 20px;
    border-radius: 15px; /* لبه‌های گرد */
    z-index: 100;
    width: 100%;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;    
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
}

/* آیکون‌های هدر */
.icon-profile {
    width: 30px;
    height: 30px;
    margin-right: 35px; /* فاصله مناسب از سمت راست */
    cursor: pointer;
}

.header img {
    width: 40px;
    height: 40px;
    cursor: pointer;
}

/* تیتر اصلی */
.main-title {
    margin-top: 100px; /* فاصله از هدر */
    font-family: 'BHoma', Tahoma, Arial, sans-serif;
    font-size: 1.8rem;
    color: #333; /* رنگ تیره */
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* سایه ملایم */
}

/* منوی اصلی */
.menu-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* سه ستون */
    gap: 15px;
    padding: 15px;
    width: calc(100% - 30px);
    max-width: 600px;
    text-align: center;
    margin-top: 20px;
    direction: rtl;
}

/* آیتم‌های منو */
.menu-item {
    background: rgba(255, 255, 255, 0.3); /* پس‌زمینه نیمه‌شفاف */
    backdrop-filter: blur(10px); /* افکت شیشه‌ای */
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    margin: 0 auto;
}

.menu-item:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.menu-item img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
}

.menu-item span {
    font-size: 1rem;
    color: #333;
    font-family: 'BYekan', Tahoma, Arial, sans-serif;
}

/* استایل فوتر */
.footer {
    position: fixed;
    bottom: 10px; /* کمی فاصله از پایین */
    width: 100%;
    text-align: center;
    overflow: hidden; /* جلوگیری از نمایش متن اضافی */
    background: rgba(255, 255, 255, 0.3); /* پس‌زمینه نیمه‌شفاف */
    backdrop-filter: blur(10px); /* افکت شیشه‌ای */
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* سایه بالا */
    padding: 10px 0;
    border-radius: 15px; /* لبه‌های گرد */
    z-index: 10;
}

/* استایل متن متحرک */
.marquee {
    position: relative;
    width: 100%;
    overflow: hidden; /* پنهان کردن متن اضافی */
    white-space: nowrap; /* جلوگیری از شکستن متن */
    direction: ltr; /* متن از چپ به راست حرکت کند */
}


.marquee-text {
    display: inline-block;
    padding-left: 100%;
    animation: marquee 30s linear infinite; /* حرکت مداوم */
}


.marquee-content {
    display: inline-block;
    padding-right: 100%; /* فاصله اولیه از سمت راست */
    animation: marquee 30s linear infinite; /* انیمیشن حرکت */
    font-family: 'BYekan', Tahoma, Arial, sans-serif;
    font-size: 1rem;
    color: #333; /* رنگ متن */
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); /* سایه متن */
}

/* تعریف انیمیشن متن */
@keyframes marquee {
    from {
        transform: translateX(-100%); /* شروع از بیرون سمت راست */
    }
    to {
        transform: translateX(100%); /* حرکت به بیرون سمت چپ */
    }
}

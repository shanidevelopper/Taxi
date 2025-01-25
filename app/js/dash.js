// هنگامی که DOM بارگذاری شد
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard loaded!");

    // دریافت شماره شهربانی از قالب Flask
    const carNumber = document.getElementById("car-number-data").dataset.number;

    // بررسی و تجزیه شماره شهربانی
    if (carNumber.length === 5) {
        const threeDigits = carNumber.slice(0, 3); // سه رقم اول
        const twoDigits = carNumber.slice(3); // دو رقم آخر

        // جایگذاری در پلاک
        document.getElementById("three-digits").textContent = threeDigits;
        document.getElementById("two-digits").textContent = twoDigits;

        console.log(`Car number processed: ${threeDigits} ت ${twoDigits}`);
    } else {
        console.error("Invalid car number format!");
    }
});

// کنترل باز و بسته شدن سایدبار
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// لاگ‌اوت
function logout() {
    window.location.href = '/logout';
}

// ارتباط با ادمین
function contactAdmin() {
    alert('در حال اتصال به ادمین...');
}

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// باز کردن منو
function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active'); // فعال کردن لایه شفاف
}

// بستن منو
function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active'); // غیرفعال کردن لایه شفاف
}

// اضافه کردن رویداد برای بستن منو با کلید Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
    }
});

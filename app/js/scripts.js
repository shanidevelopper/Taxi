document.addEventListener("DOMContentLoaded", function () {
    // نمایش/مخفی‌سازی پسورد
    function togglePassword(fieldId) {
        const field = document.getElementById(fieldId);
        field.type = field.type === "password" ? "text" : "password";
    }
    window.togglePassword = togglePassword;

    // پیش‌نمایش آپلود فایل
    function previewImage(input, previewId) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const preview = document.getElementById(previewId);
                preview.src = e.target.result;
                preview.classList.remove("hidden");
            };
            reader.readAsDataURL(file);
        }
    }
    window.previewImage = previewImage;

    // مدیریت باکس امضا
    const signatureButton = document.getElementById("signature-button");
    const signatureModal = document.getElementById("signature-modal");
    const signaturePad = document.getElementById("signature-pad");
    const ctx = signaturePad.getContext("2d");
    let drawing = false;

    signatureButton.addEventListener("click", () => {
        signatureModal.classList.remove("hidden");
    });

    signaturePad.addEventListener("mousedown", () => (drawing = true));
    signaturePad.addEventListener("mouseup", () => (drawing = false));
    signaturePad.addEventListener("mousemove", (e) => {
        if (!drawing) return;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";

        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    document.getElementById("clear-signature").addEventListener("click", () => {
        ctx.clearRect(0, 0, signaturePad.width, signaturePad.height);
    });

    document.getElementById("save-signature").addEventListener("click", () => {
        const dataURL = signaturePad.toDataURL();
        const preview = document.getElementById("signature-preview");
        preview.src = dataURL;
        preview.classList.remove("hidden");
        signatureModal.classList.add("hidden");
    });
});

var canvas = document.getElementById('signature-canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.9;  // 90% از پنجره مرورگر
canvas.height = window.innerHeight * 0.8; // 80% از پنجره مرورگر

var painting = false;

function startPosition(e) {
    painting = true;
    draw(e);
}

function finishedPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

// اضافه کردن پشتیبانی لمسی
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startPosition(touch);
}, false);

canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    draw(touch);
}, false);

canvas.addEventListener('touchend', finishedPosition, false);

document.addEventListener('DOMContentLoaded', function () {
    // عناصر DOM
    const openSignaturePad = document.getElementById('open-signature-pad');
    const signatureModal = document.getElementById('signature-modal');
    const signatureCanvas = document.getElementById('signature-canvas');
    const signaturePreview = document.getElementById('signature-preview');
    const saveSignatureButton = document.getElementById('save-signature');
    const clearSignatureButton = document.getElementById('clear-signature');
    const closeModalButton = document.getElementById('close-modal');
    const ctx = signatureCanvas.getContext('2d');
    let painting = false;

    // تنظیم اندازه Canvas با پس‌زمینه شفاف
    function setupCanvas() {
        signatureCanvas.width = signatureCanvas.offsetWidth;
        signatureCanvas.height = 200; // ارتفاع دلخواه
        ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height); // پاک کردن هر چیزی روی کانواس
    }

    // باز کردن پنجره امضا
    openSignaturePad.addEventListener('click', function () {
        signatureModal.style.display = 'block';
        setupCanvas();
    });

    // بستن پنجره امضا
    closeModalButton.addEventListener('click', function () {
        signatureModal.style.display = 'none';
    });

    // شروع رسم
    function startPosition(e) {
        painting = true;
        draw(e);
    }

    // اتمام رسم
    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }

    // رسم خطوط
    function draw(e) {
        if (!painting) return;
        const rect = signatureCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black'; // خطوط امضا
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // رویدادهای ماوس
    signatureCanvas.addEventListener('mousedown', (e) => {
        startPosition(e);
    });

    signatureCanvas.addEventListener('mousemove', (e) => {
        draw(e);
    });

    signatureCanvas.addEventListener('mouseup', finishedPosition);
    signatureCanvas.addEventListener('mouseout', finishedPosition);

    // رویدادهای لمسی
    signatureCanvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startPosition(e.touches[0]);
    });

    signatureCanvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    });

    signatureCanvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        finishedPosition();
    });

    // پاک کردن کانواس
    clearSignatureButton.addEventListener('click', function () {
        ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
        setupCanvas(); // تنظیم مجدد
    });

    // ذخیره امضا
    saveSignatureButton.addEventListener('click', function () {
        // حذف نواحی خالی (Trim) و ذخیره خطوط فقط
        const imageData = ctx.getImageData(0, 0, signatureCanvas.width, signatureCanvas.height);
        const data = imageData.data;

        let top = signatureCanvas.height, bottom = 0, left = signatureCanvas.width, right = 0;

        for (let y = 0; y < signatureCanvas.height; y++) {
            for (let x = 0; x < signatureCanvas.width; x++) {
                const alpha = data[(y * signatureCanvas.width + x) * 4 + 3]; // مقدار شفافیت
                if (alpha > 0) {
                    if (x < left) left = x;
                    if (x > right) right = x;
                    if (y < top) top = y;
                    if (y > bottom) bottom = y;
                }
            }
        }

        const trimmedWidth = right - left + 1;
        const trimmedHeight = bottom - top + 1;

        const trimmedCanvas = document.createElement('canvas');
        trimmedCanvas.width = trimmedWidth;
        trimmedCanvas.height = trimmedHeight;

        const trimmedCtx = trimmedCanvas.getContext('2d');
        trimmedCtx.drawImage(
            signatureCanvas,
            left, top, trimmedWidth, trimmedHeight, // ناحیه اصلی
            0, 0, trimmedWidth, trimmedHeight      // ناحیه ذخیره‌سازی
        );

        const signatureDataURL = trimmedCanvas.toDataURL('image/png');
        signaturePreview.src = signatureDataURL;
        signaturePreview.style.display = 'block';
        signatureModal.style.display = 'none';

        // ارسال امضا به سرور
        const nationalId = document.querySelector('input[name="national-id"]').value;
        fetch('/save_signature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                national_id: nationalId,
                signature: signatureDataURL
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    document.getElementById('signature-status').textContent = 'امضا با موفقیت ذخیره شد.';
                } else {
                    document.getElementById('signature-status').textContent = 'خطا در ذخیره امضا.';
                }
            })
            .catch(() => {
                document.getElementById('signature-status').textContent = 'خطا در ارتباط با سرور.';
            });
    });
});

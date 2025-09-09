const qrInput = document.getElementById('qr-input');
const sizeSelect = document.getElementById('size-select');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const qrBody = document.querySelector('.qr-body');

let qr; // Store QRious instance

generateBtn.addEventListener('click', (e) => {
    if (!qrInput.value) {
        alert("Please enter text or URL to generate QR code.");
        return;
    }
    e.preventDefault();
    generateQRCode();
});

function isEmpty(value) {
    if(qrInput.value === "") {
        return true;
    }
}
function generateQRCode() {
    qrBody.innerHTML = ""; // Clear previous QR code

    const canvas = document.createElement('canvas');
    qrBody.appendChild(canvas);

    qr = new QRious({
        element: canvas,
        value: qrInput.value,
        size: Number(sizeSelect.value),
        background: "#ffffff",
        foreground: "#000000"
    });
}
downloadBtn.addEventListener('click', () => {
    if (isEmpty(qrInput.value)) {
        alert("Please generate a QR code first.");
        return;
    }
    const canvas = qrBody.querySelector('canvas');
    if (!canvas) {
        alert("Please generate a QR code first.");
        return;
    }
    const imgData = canvas.toDataURL("image/png");
    const a = document.createElement('a');
    a.href = imgData;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
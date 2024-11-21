// Navigation between pages
function navigateTo(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    // Show the requested page
    document.getElementById(pageId).style.display = 'block';
}

// QR Code Generator
let qrcode = new QRCode(document.querySelector(".qrcode"));
qrcode.makeCode("Why did you scan me?");

function generateQr() {
    const input = document.querySelector("#qr-generator-page input");
    if (input.value.trim() === "") {
        alert("Input Field Cannot be blank!");
    } else {
        qrcode.makeCode(input.value);
    }
}

// QR Code Scanner
function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {
    const scannedUrlButton = document.getElementById('scanned-url-button');

    // Handle QR code scanning from camera
    function onScanSuccess(decodeText) {
        scannedUrlButton.style.display = 'inline-block';
        scannedUrlButton.textContent = decodeText; // Set button text
        scannedUrlButton.dataset.url = decodeText; // Store URL
    }

    let htmlscanner = new Html5QrcodeScanner("my-qr-reader", { fps: 10, qrbox: 250 });
    htmlscanner.render(onScanSuccess);
});

// Function to open the scanned URL in a new tab
function openScannedUrl() {
    const url = document.getElementById('scanned-url-button').dataset.url;
    window.open(url, "_blank");
}

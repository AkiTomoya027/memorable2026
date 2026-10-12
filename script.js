// ==========================================
// 1. PENGATURAN NOMOR WHATSAPP KAMU
// Ganti nomor di bawah ini (gunakan format 62...)
// ==========================================
const NOMOR_WHATSAPP = "628xxxxxxxxxx"; 


// ==========================================
// 2. KATA-KATA ROMANTIS (DEWASA & HANGAT)
// ==========================================
const pesanRomantis = [
    "Ada banyak hal di dunia ini yang berubah, tapi rasa nyaman setiap kali ada di dekat kamu selalu sama.",
    "Kamu bukan cuma sekadar pasangan, tapi juga tempat aku pulang, cerita, dan jadi diri sendiri tanpa ragu.",
    "Terima kasih sudah memilih untuk berjuang dan tumbuh bareng aku. Semoga mawar putih ini bisa mewakili betapa tulusnya aku menyayangi kamu. 🤍"
];


// ==========================================
// 3. EFEK KETIK (MENGGUNAKAN SETTIMEOUT)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    createDustParticles();
    startTypewriter();

    const form = document.getElementById("replyForm");
    form.addEventListener("submit", sendToWhatsApp);
});

function startTypewriter() {
    const container = document.getElementById("typewriterText");
    container.innerHTML = "";

    let pIndex = 0;
    let charIndex = 0;
    let currentP = null;

    function typeChar() {
        // Jika semua paragraf selesai diketik
        if (pIndex >= pesanRomantis.length) return;

        // Buat elemen <p> baru jika di awal paragraf
        if (charIndex === 0) {
            currentP = document.createElement("p");
            container.appendChild(currentP);
        }

        const textSekarang = pesanRomantis[pIndex];

        // Ketik karakter satu per satu
        if (charIndex < textSekarang.length) {
            currentP.textContent += textSekarang[charIndex];
            charIndex++;
            setTimeout(typeChar, 30); // Jeda antar karakter (30ms)
        } else {
            // Lanjut ke paragraf berikutnya setelah jeda
            pIndex++;
            charIndex = 0;
            setTimeout(typeChar, 400); // Jeda antar paragraf (400ms)
        }
    }

    typeChar();
}


// ==========================================
// 4. LOGIKA PENGIRIMAN KE WHATSAPP
// ==========================================
function sendToWhatsApp(e) {
    e.preventDefault();

    const inputPesan = document.getElementById("replyMessage").value.trim();

    if (!inputPesan) return;

    const pesanAwal = "Halo! Aku udah baca pesan kamu di web... 🤍\n\n*Ini balasanku:* \n";
    const fullText = pesanAwal + `"${inputPesan}"`;
    const encodedText = encodeURIComponent(fullText);

    const waUrl = `https://wa.me/6285111522707?text=${encodedText}`;
    window.open(waUrl, "_blank");
}


// ==========================================
// 5. ANIMASI DEBU/PARTIKEL CAHAYA MELAYANG
// ==========================================
function createDustParticles() {
    const dustContainer = document.getElementById("dustContainer");
    if (!dustContainer) return;
    
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("dust-particle");

        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        dustContainer.appendChild(particle);
    }
}
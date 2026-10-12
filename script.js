// ==========================================
// 1. PENGATURAN NOMOR WHATSAPP KAMU
// ==========================================
const NOMOR_WHATSAPP = "6285111522707"; 


// ==========================================
// 2. KATA-KATA ROMANTIS (MANIS & DEWASA)
// ==========================================
const pesanRomantis = [
    "Jujur, dari sekian banyak hal yang terjadi di hidup aku, bisa ketemu dan jalan sama kamu adalah salah satu takdir paling indah.",
    "Setiap kali hariku kerasa berat atau capek, cuma dengan dengar cerita atau lihat senyum kamu, semuanya mendadak kerasa jauh lebih ringan.",
    "Mawar putih ini sederhana, tapi rasa tulus dan sayang aku ke kamu seluas itu. Terima kasih ya sudah senantiasa ada dan bikin hariku selalu lebih hangat. I love you! 🤍"
];


// ==========================================
// 3. INISIALISASI & EFEK KETIK (SETTIMEOUT)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    createDustParticles();
    startTypewriter();

    // Pemutar Musik
    const musicBtn = document.getElementById("musicBtn");
    const bgMusic = document.getElementById("bgMusic");
    const vinyl = document.getElementById("vinylRecord");
    const musicStatus = document.getElementById("musicStatus");

    musicBtn.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            vinyl.classList.add("playing");
            musicStatus.textContent = "Memutar... 🎵";
        } else {
            bgMusic.pause();
            vinyl.classList.remove("playing");
            musicStatus.textContent = "Dipause ⏸️";
        }
    });

    // Form WhatsApp
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
        if (pIndex >= pesanRomantis.length) return;

        if (charIndex === 0) {
            currentP = document.createElement("p");
            container.appendChild(currentP);
        }

        const textSekarang = pesanRomantis[pIndex];

        if (charIndex < textSekarang.length) {
            currentP.textContent += textSekarang[charIndex];
            charIndex++;
            setTimeout(typeChar, 30); // Kecepatan ketik
        } else {
            pIndex++;
            charIndex = 0;
            setTimeout(typeChar, 400); // Jeda antar paragraf
        }
    }

    typeChar();
}


// ==========================================
// 4. LOGIKA PENGIRIMAN WHATSAPP
// ==========================================
function sendToWhatsApp(e) {
    e.preventDefault();

    const inputPesan = document.getElementById("replyMessage").value.trim();
    if (!inputPesan) return;

    const pesanAwal = "Halo! Aku udah buka dan baca pesan di web... 🤍\n\n*Ini balasanku:* \n";
    const fullText = pesanAwal + `"${inputPesan}"`;
    const encodedText = encodeURIComponent(fullText);

    // Format URL WhatsApp yang benar (tanpa tanda '+', pakai '?text=')
    const waUrl = `https://wa.me/${NOMOR_WHATSAPP}?text=${encodedText}`;

    window.open(waUrl, "_blank");
}


// ==========================================
// 5. ANIMASI DEBU / PARTIKEL CAHAYA
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


// ==========================================
// 6. LIGHTBOX MODAL FOTO
// ==========================================
function openModal(element) {
    const modal = document.getElementById("photoModal");
    const imgFull = document.getElementById("imgFull");
    const captionFull = document.getElementById("captionFull");

    const img = element.querySelector("img");
    const caption = element.querySelector(".polaroid-caption");

    modal.style.display = "flex";
    imgFull.src = img.src;
    captionFull.textContent = caption.textContent;
}

function closeModal() {
    document.getElementById("photoModal").style.display = "none";
}
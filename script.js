// --- 1. FLOATING HEART CANVAS BACKGROUND ---
const canvas = document.getElementById('heart-canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

class Heart {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 14 + 8;
        this.speed = Math.random() * 1.5 + 0.8;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = ['#ff65a3', '#ffb6c1', '#c084fc', '#f43f5e'][Math.floor(Math.random() * 4)];
    }
    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y * 0.02) * 0.5;
        if (this.y < -20) this.reset();
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const d = this.size;
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - d / 2, this.y - d / 2, this.x - d, this.y + d / 3, this.x, this.y + d);
        ctx.bezierCurveTo(this.x + d, this.y + d / 3, this.x + d / 2, this.y - d / 2, this.x, this.y);
        ctx.fill();
        ctx.restore();
    }
}

const hearts = Array.from({ length: 35 }, () => new Heart());

function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(h => {
        h.update();
        h.draw();
    });
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

// --- 2. GIFT OPENING LOGIC ---
function openGift() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    
    triggerConfetti();

    // Otomatis putar musik saat hadiah dibuka
    const audio = document.getElementById('my-audio');
    if (audio) {
        audio.play().catch(e => console.log("Autoplay ditolak oleh browser:", e));
        document.getElementById('music-text').innerText = 'Pause Music 🎵';
        document.getElementById('music-icon').classList.add('animate-spin');
    }

    welcomeScreen.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainContent.classList.remove('invisible');
        mainContent.classList.add('opacity-100');
    }, 700);
}

// --- 3. TAB SWITCHING LOGIC ---
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.className = "nav-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all text-gray-300 hover:text-white hover:bg-white/10";
    });

    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.add('active');

    const activeBtn = document.getElementById(`btn-${tabId}`);
    if (activeBtn) activeBtn.className = "nav-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all bg-brand-pink text-white shadow-md shadow-brand-pink/30";
}

// --- 4. RUNAWAY "FORGIVE ME" BUTTON ---
function runAwayButton() {
    const noBtn = document.getElementById('no-btn');
    const container = document.getElementById('button-container');
    
    const containerRect = container.getBoundingClientRect();
    const x = Math.random() * (containerRect.width - 120) - (containerRect.width / 2 - 60);
    const y = Math.random() * 100 - 50;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

function acceptApology() {
    triggerConfetti();
    document.getElementById('forgive-success').classList.remove('hidden');
}

// --- 5. FLOWER REVEAL ---
function revealFlowerMessage(num) {
    const msgBox = document.getElementById(`flower-msg-${num}`);
    msgBox.classList.toggle('hidden');
    triggerConfetti();
}

// --- 6. CONFETTI HELPER ---
function triggerConfetti() {
    confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff65a3', '#ffb6c1', '#8b5cf6', '#ffffff']
    });
}

// --- 7. AUDIO PLAYER TOGGLE (MP3/AUDIO FILE) ---
function toggleMusic() {
    const audio = document.getElementById('my-audio');
    const musicText = document.getElementById('music-text');
    const musicIcon = document.getElementById('music-icon');

    if (audio.paused) {
        audio.play();
        musicText.innerText = 'Pause Music 🎵';
        musicIcon.classList.add('animate-spin');
    } else {
        audio.pause();
        musicText.innerText = 'Play Music 🎵';
        musicIcon.classList.remove('animate-spin');
    }
}
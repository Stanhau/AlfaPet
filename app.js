const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const result = document.getElementById('result');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#82E0AA', '#F1948A', '#85C1E9'];

const activities = {
    'A': 'Apple picking', 'B': 'Baking cookies', 'C': 'Cycling', 'D': 'Dancing',
    'E': 'Exploring a museum', 'F': 'Flying a kite', 'G': 'Gardening', 'H': 'Hiking',
    'I': 'Ice skating', 'J': 'Juggling', 'K': 'Kayaking', 'L': 'Learning a language',
    'M': 'Meditating', 'N': 'Nature walking', 'O': 'Origami', 'P': 'Painting',
    'Q': 'Quilting', 'R': 'Reading a book', 'S': 'Swimming', 'T': 'Trying a new recipe',
    'U': 'Upcycling old items', 'V': 'Volunteering', 'W': 'Writing a story',
    'X': 'Xylophone playing', 'Y': 'Yoga', 'Z': 'Ziplining'
};

let isSpinning = false;

function drawWheel() {
    const ctx = wheel.getContext('2d');
    const radius = wheel.width / 2;
    const anglePerLetter = (2 * Math.PI) / alphabet.length;

    ctx.clearRect(0, 0, wheel.width, wheel.height);

    for (let i = 0; i < alphabet.length; i++) {
        const angle = i * anglePerLetter - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, angle, angle + anglePerLetter);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angle + anglePerLetter / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(alphabet[i], radius - 30, 0);
        ctx.restore();
    }
}

function rotateWheel(angle) {
    wheel.style.transform = `rotate(${angle}deg)`;
}

function spin() {
    if (isSpinning) return;
    isSpinning = true;
    result.textContent = '';
    const spinAngle = Math.floor(Math.random() * 360) + 1440;
    const duration = 5000;
    const start = performance.now();

    function animate(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentAngle = spinAngle * easeProgress;
        rotateWheel(currentAngle);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            const finalAngle = spinAngle % 360;
            const selectedIndex = Math.floor(
                (360 - (finalAngle % 360) + 360 / (2 * alphabet.length)) % 360 / 
                (360 / alphabet.length)
            ) % alphabet.length;
            const selectedLetter = alphabet[selectedIndex];
            result.textContent = `Activity: ${activities[selectedLetter]}`;
        }
    }

    requestAnimationFrame(animate);
}

drawWheel();
spinBtn.addEventListener('click', spin);

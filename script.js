// Licznik odwiedzin
let visits = localStorage.getItem('visitCount');
if (!visits) visits = 0;
visits++;
localStorage.setItem('visitCount', visits);
document.getElementById('visit-count').textContent = visits;

// Kopiowanie Discorda
document.getElementById('discord-btn').addEventListener('click', () => {
    navigator.clipboard.writeText('_d4presja_').then(() => {
        alert('Skopiowano: _d4presja_');
    }).catch(() => {
        alert('Nie udało się skopiować');
    });
});

// Player controls
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const progressBar = document.querySelector('.progress');

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playBtn.textContent = '▶️';
    }
});

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progressPercent + '%';
});

// Visualizer
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 128;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) * 1.5;
    let x = 0;
    for(let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
}

audio.onplay = () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    draw();
};
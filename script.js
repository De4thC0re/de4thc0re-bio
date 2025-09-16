// Licznik odwiedzin
let visits = localStorage.getItem('visitCount');
if (!visits) visits = 0;
visits++;
localStorage.setItem('visitCount', visits);
document.getElementById('visit-count').textContent = visits;

// Kopiowanie Discorda do schowka
document.getElementById('discord-btn').addEventListener('click', () => {
    navigator.clipboard.writeText('_d4presja_').then(() => {
        alert('Skopiowano: _d4presja_');
    }).catch(() => {
        alert('Nie udało się skopiować');
    });
});

// Visualizer audio
const audio = document.getElementById('audio');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

// Ustawienia canvas
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Tworzenie audio context i analyser
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 64;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Funkcja rysująca visualizer
function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        ctx.fillStyle = '#00ff00'; // zielony kolor słupków
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
}

// Uruchamianie visualizera po odtworzeniu audio
audio.onplay = () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    draw();
};
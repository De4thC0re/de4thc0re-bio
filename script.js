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
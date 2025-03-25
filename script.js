let player;
let isLooping = false;

// Cargar el reproductor de YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '250',
        width: '100%',
        videoId: 'LbEetr1UpxE', // ID del video inicial
        playerVars: { 'playsinline': 1 }, // Reproducción en pantalla completa
        events: {
            'onStateChange': onPlayerStateChange // Evento para repetir la canción
        }
    });

    fetchVideoTitle('LbEetr1UpxE'); // Obtener el título de la canción inicial
}

// Eventos de los botones
document.getElementById("play").addEventListener("click", () => { // Reproducir la canción
    if (player) player.playVideo();
});

document.getElementById("pause").addEventListener("click", () => { // Pausar la canción
    if (player) player.pauseVideo();
});

document.getElementById("loop").addEventListener("click", function() { // Repetir la canción
    isLooping = !isLooping;
    this.style.background = isLooping ? "#00ff00" : "#0ff";
});

 // Reproducir canciones
document.querySelectorAll(".song-btn").forEach(button => {
    button.addEventListener("click", function() {
        const videoId = this.getAttribute("data-video"); // Obtener el ID del video
        player.loadVideoById(videoId); // Cargar el video
        fetchVideoTitle(videoId); // Obtener el título
        player.playVideo(); // Reproducir el video
    });
});

// Función para cambiar el título de la canción
function onPlayerStateChange(event) {
    if (isLooping && event.data === YT.PlayerState.ENDED) { // Repetir la canción
        player.playVideo();
    }
}

// Función para obtener el título de la canción
function fetchVideoTitle(videoId) {
    fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`) // API para obtener el título
        .then(response => response.json())
        .then(data => {
            document.getElementById("song-title").innerText = data.title || "Canción Desconocida"; // Mostrar el título
        })
        .catch(() => {
            document.getElementById("song-title").innerText = "No se pudo obtener el título"; // Mostrar error
        });
}

 // Path: script.js (Parte 2)
// Reproducir canciones con tiempo de inicio
function playSong(songId, startTime = 0) {
    const videoContainer = document.getElementById('video-container');
    const videoFrame = document.createElement('iframe');

    videoFrame.setAttribute('width', '100%');
    videoFrame.setAttribute('height', '100%');
    videoFrame.setAttribute('src', `https://www.youtube.com/embed/${songId}?autoplay=1&mute=0&start=${startTime}`);
    videoFrame.setAttribute('frameborder', '0');
    videoFrame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    videoFrame.setAttribute('allowfullscreen', 'true');

    // Limpiar cualquier video anterior
    videoContainer.innerHTML = '';
    videoContainer.appendChild(videoFrame);
}

// Modificar evento para leer el tiempo de inicio si existe
document.querySelectorAll('.song-btn').forEach(button => {
    button.addEventListener('click', () => {
        const songId = button.getAttribute('data-video');
        const startTime = button.getAttribute('data-start') || 0;
        playSong(songId, startTime);
    });
});
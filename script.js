let player;
let isLooping = false;

function onYouTubeIframeAPIReady() { // Función que se ejecuta cuando la API de YouTube está lista
    player = new YT.Player('player', { // Crea un nuevo objeto de jugador de YouTube
        height: '250', // Altura del reproductor
        width: '100%', // Ancho del reproductor
        videoId: 'LbEetr1UpxE', // ID del video a reproducir
        playerVars: { 'playsinline': 1 }, // Parámetros del reproductor
        events: { // Eventos que se pueden escuchar
            'onStateChange': onPlayerStateChange // Cambio de estado del reproductor
        }
    });

    fetchVideoTitle('LbEetr1UpxE'); // Obtiene el título del video
}

document.getElementById("play").addEventListener("click", function() { // Agrega un evento de clic al botón de play
    if (player) player.playVideo(); // Reproduce el video
});

document.getElementById("pause").addEventListener("click", function() { // Agrega un evento de clic al botón de pause
    if (player) player.pauseVideo(); // Pausa el video
});

document.getElementById("loop").addEventListener("click", function() { // Agrega un evento de clic al botón de loop
    isLooping = !isLooping; // Cambia el estado de loop
    this.style.background = isLooping ? "#00ff00" : "#0ff"; // Cambia el color del botón
});

document.querySelectorAll(".song-btn").forEach(button => { // Agrega un evento de clic a cada botón de canción
    button.addEventListener("click", function() { // Obtiene el ID del video
        let videoId = this.getAttribute("data-video"); // Carga el video en el reproductor
        player.loadVideoById(videoId); // Reproduce el video
        fetchVideoTitle(videoId); // Obtiene el título del video
        player.playVideo(); // Reproduce el video
    });
});

function onPlayerStateChange(event) { // Función que se ejecuta cuando cambia el estado del reproductor
    if (isLooping && event.data === YT.PlayerState.ENDED) { // Si el video ha terminado y loop está activado
        player.playVideo(); // Reproduce el video
    }
}

function fetchVideoTitle(videoId) {  // Función que obtiene el título del video
    fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`)   // Hace una petición a la API de YouTube
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(data => { // Obtiene el título del video
            document.getElementById("song-title").innerText = data.title || "Canción Desconocida"; // Si no hay título, se muestra "Canción Desconocida"
        })
        .catch(() => { // Si hay un error
            document.getElementById("song-title").innerText = "No se pudo obtener el título"; // Muestra un mensaje de error
        });
}

// --- CONFIGURACIÓN DE MOMENTOS (REPRODUCTOR) ---
const momentos = [
    {
        titulo: "El inicio de todo ✨",
        desc: "Ese primer mensaje que cambió mi mundo por completo. No sabía que ese 'hola' se convertiría en mi lugar favorito.",
        img: "img/WhatsApp Image 2025-10-24 at 8.24.49 PM.jpeg",
        audio: "music/Tu poeta Alex Campos.mp3" 
    },
    {
        titulo: "Aventuras en Heartopia 🎮",
        desc: "Amo cada segundo que pasamos juntos, construyendo nuestro mundo virtual mientras fortalecemos el real.",
        img: "img/image3.png",
        audio: "music/Bella Evangeline.mp3"
    },
    {
        titulo: "Días de Piscina ☀️",
        desc: "No hay nada mejor que un día de sol y agua contigo. Esos momentos de risas y tranquilidad son mis favoritos.",
        img: "img/piscina.jpeg",
        audio: "music/Que suerte tenerte Fonseca.mp3"
    },
    {
        titulo: "Nuestras Citas ❤️",
        desc: "Cada salida a tu lado es una nueva historia que guardo en mi corazón. Gracias por hacerme tan feliz.",
        img: "img/cita.jpg",
        audio: "music/Promesa.mp3"
    },
    {
        titulo: "Pequeños Detalles 🌹",
        desc: "Son las risas tontas y los momentos inesperados los que hacen que me enamore de ti cada día más.",
        img: "img/detalles.jpg",
        audio: "music/Te amo y mas Libro de la vida.mp3"
    },
    {
        titulo: "Tu Graduación 🎓",
        desc: "Verte alcanzar tus metas es mi mayor orgullo. Ese día brillabas más que todas estas estrellas juntas.",
        img: "img/image.png",
        audio: "music/Por el resto de mi vida Cepeda.mp3"
    },
    {
        titulo: "Nuestro futuro 💍",
        desc: "Espero que podamos llegar a este momento y caminar juntos por siempre. Te amo.",
        img: "img/boda.png",
        audio: "music/En honor a ti Indiomar.mp3"
    }
];

let index = 0;
let typingInterval; 
const container = document.getElementById('stars-container');
const audioPlayer = document.getElementById('player-audio');
const playBtn = document.getElementById('main-play-btn');

// --- 1. FUNCIÓN PARA CAMBIAR ENTRE PÁGINAS ---
function toggleSections() {
    const constelacion = document.getElementById('constelacion');
    const reproductor = document.getElementById('reproductor');

    if (constelacion.classList.contains('active')) {
        constelacion.classList.replace('active', 'hidden');
        reproductor.classList.replace('hidden', 'active');
    } else {
        reproductor.classList.replace('active', 'hidden');
        constelacion.classList.replace('hidden', 'active');
        audioPlayer.pause(); 
        playBtn.innerText = "▶";
    }
}

// --- 2. GENERAR UNIVERSO ---
function generarUniverso() {
    momentos.forEach((m, i) => {
        let star = document.createElement('div');
        star.className = 'star-moment';
        
        const pos = [
            {t: 15, l: 20}, {t: 40, l: 15}, {t: 65, l: 25}, 
            {t: 85, l: 50}, {t: 15, l: 80}, {t: 45, l: 75}, {t: 75, l: 85}
        ];
        
        star.style.top = pos[i].t + 'vh';
        star.style.left = pos[i].l + 'vw';
        
        star.style.width = '6px'; 
        star.style.height = '6px';
        star.style.setProperty('--duration', (Math.random() * 2 + 2) + 's');

        star.onclick = () => {
            index = i;
            updatePlayer();
            toggleSections();
        };
        
        container.appendChild(star);
    });

    // --- ESTRELLAS PEQUEÑAS QUE BRILLAN ---
    for (let i = 0; i < 200; i++) {
        let decor = document.createElement('div');
        decor.className = 'star-decor';
        
        // Tamaños variados para profundidad
        let size = (Math.random() * 1.8 + 0.8) + 'px'; 
        decor.style.width = size;
        decor.style.height = size;
        
        decor.style.top = Math.random() * 100 + 'vh';
        decor.style.left = Math.random() * 100 + 'vw';
        
        // TIEMPOS ALEATORIOS PARA EL BRILLO
        // Esto hace que cada estrella parpadee en su propio tiempo
        const duracion = (Math.random() * 3 + 2) + 's'; // Duración entre 2s y 5s
        const retraso = (Math.random() * 5) + 's';      // Retraso de hasta 5s para que no empiecen todas a la vez
        
        decor.style.setProperty('--duration', duracion);
        decor.style.animationDelay = retraso;
        
        container.appendChild(decor);
    }
}

// --- 3. LÓGICA DEL REPRODUCTOR ---
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.innerText = "⏸";
    } else {
        audioPlayer.pause();
        playBtn.innerText = "▶";
    }
}

function nextMoment() {
    index = (index + 1) % momentos.length;
    updatePlayer();
}

function prevMoment() {
    index = (index - 1 + momentos.length) % momentos.length;
    updatePlayer();
}

function updatePlayer() {
    const title = document.getElementById('track-title');
    const desc = document.getElementById('track-desc');
    const img = document.querySelector('.album-art img');

    clearInterval(typingInterval);
    img.style.opacity = 0;
    img.style.transform = "scale(0.95)";
    
    setTimeout(() => {
        title.innerText = momentos[index].titulo;
        img.src = momentos[index].img;
        
        audioPlayer.src = momentos[index].audio;
        audioPlayer.play().then(() => {
            playBtn.innerText = "⏸";
        }).catch(err => {
            console.log("Autoplay bloqueado");
            playBtn.innerText = "▶";
        });

        desc.innerText = "";
        let i = 0;
        let texto = momentos[index].desc;
        
        typingInterval = setInterval(() => {
            if (i < texto.length) {
                desc.innerText += texto.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 40); 
        
        img.style.opacity = 1;
        img.style.transform = "scale(1)";
    }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    generarUniverso();
});
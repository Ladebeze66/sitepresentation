document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("matrix-effect");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = "rgba(10, 20, 40, 0.05)"; // Fond bleu nuit
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff00"; // Vert Matrix
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96); // Caractères aléatoires
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0; // Réinitialise la colonne
            }

            drops[i]++;
        }
    }

    const interval = setInterval(drawMatrix, 50);

    // Terminer l'animation après 5 secondes
    setTimeout(() => {
        clearInterval(interval);
        document.getElementById("intro-animation").style.display = "none";
        document.querySelector(".site-container").style.display = "block"; // Affiche le site
    }, 100); // 5 secondes d'animation
});

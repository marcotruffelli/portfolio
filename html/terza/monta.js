document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-track img');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let slideIndex = 0;
    let slideInterval;

    // Funzione per mostrare la slide corrente
    function showSlide(index, instant = false) {
        if (instant) {
            // Transizione istantanea (senza animazione)
            carouselTrack.style.transition = "none";
        } else {
            // Transizione fluida per altre immagini
            carouselTrack.style.transition = "transform 0.5s ease";
        }
        
        carouselTrack.style.transform = `translateX(${-index * 100}%)`;
    }

    // Funzione per passare alla slide precedente
    function prevSlide() {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1; // Torna all'ultima immagine
            showSlide(slideIndex, true); // Passaggio senza animazione
            setTimeout(() => {
                showSlide(slideIndex); // Mostra con animazione
            }, 20); // Attendere poco per evitare un "flash"
        } else {
            showSlide(slideIndex);
        }
        resetTimer(); // Reset del timer al cambio di slide
    }

    // Funzione per passare alla slide successiva
    function nextSlide() {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0; // Torna alla prima immagine
            showSlide(slideIndex, true); // Passaggio senza animazione
            setTimeout(() => {
                showSlide(slideIndex); // Mostra con animazione
            }, 20); // Attendere poco per evitare un "flash"
        } else {
            showSlide(slideIndex);
        }
        resetTimer(); // Reset del timer al cambio di slide
    }

    // Funzione per resettare il timer dell'autoplay
    function resetTimer() {
        clearInterval(slideInterval); // Ferma il timer esistente
        slideInterval = setInterval(() => {
            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0; // Torna alla prima immagine
            }
            showSlide(slideIndex);
        }, 5000); // 5 secondi
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Inizia la transizione automatica delle slide al caricamento della pagina
    resetTimer();

    // Dissolvenza per i link
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            // Verifica se il link è esterno (apre in una nuova finestra)
            const isExternalLink = this.getAttribute('target') === '_blank';
            // Se il link è esterno, non eseguire la transizione
            if (isExternalLink)
                return;
            event.preventDefault();
            const targetUrl = this.getAttribute('href');
            // Aggiungi la classe per la dissolvenza solo se il link non è esterno
            document.body.classList.add('fade-out');
            // Dopo un breve ritardo, carica la nuova pagina solo se il link non è esterno
            setTimeout(function() {
                window.location.href = targetUrl;
            }, 150); // 150 millisecondi di transizione
        });
    });
});

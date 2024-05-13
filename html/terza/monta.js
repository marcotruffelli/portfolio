document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-track img');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let slideIndex = 0;
    function showSlide(index) {
        carouselTrack.style.transform = `translateX(${-index * 100}%)`;
    }
    function prevSlide() {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        showSlide(slideIndex);
    }
    function nextSlide() {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        showSlide(slideIndex);
    }
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    // Automatic slide transition every 3 seconds
    setInterval(() => {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        showSlide(slideIndex);
    }, 5000);/*5 secondi*/
    // Show the initial slide
    showSlide(slideIndex);

    //dissolvenza
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
            }, 150); // 150 millisecondi transizione
        });
    });
});
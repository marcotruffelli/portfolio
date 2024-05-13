document.addEventListener('DOMContentLoaded', function() {
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
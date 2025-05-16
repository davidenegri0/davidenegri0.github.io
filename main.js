const images = [
    { src: 'Foto1.jpg', alt: 'Personal photo 1' },
    { src: 'Foto2.jpg', alt: 'Personal photo 2' },
    { src: 'Foto3.jpg', alt: 'Personal photo 3' }
];
let current = 0;
window.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementById('carouselImage');
    document.getElementById('prevBtn').onclick = () => {
        current = (current - 1 + images.length) % images.length;
        img.src = images[current].src;
        img.alt = images[current].alt;
    };
    document.getElementById('nextBtn').onclick = () => {
        current = (current + 1) % images.length;
        img.src = images[current].src;
        img.alt = images[current].alt;
    };

    // Fullscreen overlay logic
    const overlay = document.getElementById('carouselOverlay');
    const fullscreenImg = document.getElementById('fullscreenImage');
    img.addEventListener('click', () => {
        fullscreenImg.src = images[current].src;
        fullscreenImg.alt = images[current].alt;
        overlay.classList.add('active');
    });
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            fullscreenImg.src = '';
        }
    });
    // ESC key closes overlay
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            fullscreenImg.src = '';
        }
    });
});

// ============================================
// Hero Section - Carousel Functionality
// ============================================

export function initHero() {
    const slides = document.querySelectorAll('.hero-slide');
    const slideContents = document.querySelectorAll('.hero-slide-content');
    const indicators = document.querySelectorAll('.hero-indicator');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and contents
        slides.forEach(slide => slide.classList.remove('active'));
        slideContents.forEach(content => content.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide
        slides[index].classList.add('active');
        slideContents[index].classList.add('active');
        indicators[index].classList.add('active');

        currentSlide = index;
    }

    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    // Auto play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });

    // Start auto play
    startAutoPlay();

    // Pause on hover
    const heroSection = document.querySelector('.hero-section');
    heroSection.addEventListener('mouseenter', stopAutoPlay);
    heroSection.addEventListener('mouseleave', startAutoPlay);
}

// ============================================
// Testimonials Section - Dynamic Testimonial Cards
// ============================================

const testimonials = [
    {
        id: 1,
        name: "Priya Sharma",
        location: "Chennai",
        rating: 5,
        text: "Best quality papads I've ever tasted! The traditional flavor reminds me of my grandmother's homemade papads. Highly recommended!",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    {
        id: 2,
        name: "Rajesh Kumar",
        location: "Mumbai",
        rating: 5,
        text: "Excellent service and authentic taste. I order in bulk for my restaurant and the quality is always consistent. Great for business!",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
        id: 3,
        name: "Anjali Patel",
        location: "Bangalore",
        rating: 5,
        text: "The masala papad variety is outstanding! Perfect crispiness and the spice level is just right. Will definitely order again.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150",
    },
];

function createStarRating(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += `<svg class="star-icon filled" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>`;
    }
    return stars;
}

function createTestimonialCard(testimonial, index) {
    return `
        <div class="testimonial-card animate-on-scroll" style="animation-delay: ${index * 0.15}s">
            <!-- Quote Icon -->
            <div class="testimonial-quote-icon" style="animation-delay: ${0.3 + index * 0.1}s">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b90404" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
            </div>

            <!-- Rating -->
            <div class="testimonial-rating">
                ${createStarRating(testimonial.rating)}
            </div>

            <!-- Testimonial Text -->
            <p class="testimonial-text">${testimonial.text}</p>

            <!-- Customer Info -->
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar" loading="lazy">
                <div>
                    <h4 class="testimonial-author-name">${testimonial.name}</h4>
                    <p class="testimonial-author-location">${testimonial.location}</p>
                </div>
            </div>
        </div>
    `;
}

export function initTestimonials() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');

    if (testimonialsGrid) {
        const testimonialsHTML = testimonials.map((testimonial, index) => createTestimonialCard(testimonial, index)).join('');
        testimonialsGrid.innerHTML = testimonialsHTML;
    }
}

// Script for adding 3D skill card effects

document.addEventListener('DOMContentLoaded', function() {
    // Function to create 3D effect on skill cards
    function initializeSkillCards3D() {
        const skillCards = document.querySelectorAll('.skills-category:first-child .skill-card, .skills-category-soft .skill-card');
        
        if (skillCards.length === 0) return;
        
        skillCards.forEach((card, index) => {
            // Add staggered animation for initial appearance
            card.style.opacity = "0";
            card.style.transform = "translateY(20px) translateZ(0)";
            
            // Setup intersection observer to trigger animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Staggered delay for each card
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0) translateZ(0)";
                        }, 100 * index);
                        observer.unobserve(card);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(card);
            
            // Add 3D tilt effect on mouse movement
            card.addEventListener('mousemove', handleCardTilt);
            card.addEventListener('mouseleave', resetCardTilt);
            
            // Add random proficiency value if not set
            const proficiency = Math.floor(Math.random() * 30) + 70; // Random between 70-99%
            card.setAttribute('data-proficiency', proficiency);
            
            // Reflect proficiency in the pseudo-element width
            card.style.setProperty('--proficiency', `${proficiency}%`);
        });
    }
    
    // Function to handle 3D tilt effect
    function handleCardTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        
        // Calculate cursor position relative to the card
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        // Calculate rotation based on cursor position
        const rotateY = ((x / cardWidth) - 0.5) * 10; // Max ±5 degrees
        const rotateX = ((y / cardHeight) - 0.5) * -10; // Max ±5 degrees
        
        // Apply the transformation
        card.style.transform = `translateY(-5px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        
        // Highlight effect - adjust shadow based on cursor position
        const shadowX = (x / cardWidth) * 20 - 10;
        const shadowY = (y / cardHeight) * 20 - 10;
        card.style.boxShadow = `
            ${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.3),
            0 3px 10px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.08) inset,
            0 0 20px rgba(0, 230, 118, 0.1) inset
        `;
        
        // Move icon slightly based on cursor for enhanced 3D effect
        const icon = card.querySelector('.skill-icon');
        if (icon) {
            const moveX = ((x / cardWidth) - 0.5) * 10; // Max ±5px
            const moveY = ((y / cardHeight) - 0.5) * 10; // Max ±5px
            icon.style.transform = `translateZ(30px) translate(${moveX}px, ${moveY}px)`;
        }
    }
    
    // Function to reset card to default state
    function resetCardTilt() {
        this.style.transform = 'translateZ(0)';
        this.style.boxShadow = `
            0 10px 30px rgba(0, 0, 0, 0.2),
            0 1px 3px rgba(0, 0, 0, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset
        `;
        
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'translateZ(20px)';
        }
    }
    
    // Initialize the 3D skill cards
    initializeSkillCards3D();
});
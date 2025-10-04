// Enhanced carousel fix script with dice rolling for skills
document.addEventListener('DOMContentLoaded', function() {
    // Create the custom cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor-indicator';
    document.body.appendChild(cursor);
    
    // Inner arrow element for cursor
    const cursorArrow = document.createElement('div');
    cursorArrow.className = 'cursor-arrow';
    cursor.appendChild(cursorArrow);
    
    // Fix for Project section
    const projectsContent = document.querySelector('.projects-content');
    if (projectsContent) {
        projectsContent.style.animation = 'none';
        fixCarousel(projectsContent, 'project-train-container');
    }
    
    // Fix for Certifications section
    const certsContent = document.querySelector('.certifications-content');
    if (certsContent) {
        certsContent.style.animation = 'none';
        fixCarousel(certsContent, 'cert-train-container');
    }
    
    // Fix for Achievements section
    const achievementsContent = document.querySelector('.achievements-content');
    if (achievementsContent) {
        achievementsContent.style.animation = 'none';
        fixCarousel(achievementsContent, 'achievement-train-container');
    }
    
    // Add scroll-to-roll effect for skills sections
    addScrollToRollEffect('.skills-category:first-child .skills-grid', 'tech');
    addScrollToRollEffect('.skills-category-soft .skills-grid', 'soft');
    
    // Add custom cursor to skills sections
    const techSkillsGrid = document.querySelector('.skills-category:first-child .skills-grid');
    const softSkillsGrid = document.querySelector('.skills-category-soft .skills-grid');
    
    if (techSkillsGrid) {
        addCustomCursor(techSkillsGrid);
    }
    
    if (softSkillsGrid) {
        addCustomCursor(softSkillsGrid);
    }
    
    function fixCarousel(contentElement, containerClass) {
        // Variables for scrolling
        let scrollPosition = 0;
        const cursor = document.querySelector('.custom-cursor-indicator');
        const cursorArrow = cursor.querySelector('.cursor-arrow');
        
        // Show custom cursor on hover
        contentElement.addEventListener('mousemove', function(e) {
            const rect = contentElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            
            // Update cursor position
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.display = 'flex';
            
            // Change arrow direction based on position
            if (e.clientX < centerX) {
                cursorArrow.innerHTML = '→'; // Right arrow
            } else {
                cursorArrow.innerHTML = '←'; // Left arrow
            }
        });
        
        // Hide cursor when leaving the carousel
        contentElement.addEventListener('mouseleave', function() {
            cursor.style.display = 'none';
        });
        
        // On hover behavior
        contentElement.addEventListener('mouseenter', function(e) {
            // Get the center point
            const rect = contentElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            
            // Auto-move on hover
            if (e.clientX < centerX) {
                // Hovering on left side - move content right
                scrollPosition += 900;
            } else {
                // Hovering on right side - move content left
                scrollPosition -= 900;
            }
            
            contentElement.style.transition = 'transform 0.3s ease';
            contentElement.style.transform = `translateX(${scrollPosition}px)`;
        });
        
        // Handle single click for movements
        contentElement.addEventListener('click', function(event) {
            const clickPosition = event.clientX;
            const midPoint = window.innerWidth / 2;
            
            // Movement of 900px on click
            if (clickPosition < midPoint) {
                // Move right (items shift right)
                scrollPosition += 900;
            } else {
                // Move left (items shift left)
                scrollPosition -= 900;
            }
            
            // Apply the position with a smooth transition
            contentElement.style.transition = 'transform 0.2s ease';
            contentElement.style.transform = `translateX(${scrollPosition}px)`;
        });
    }
    
    // Function to add scroll-to-roll effect for skill dice
    function addScrollToRollEffect(selector, type) {
        const container = document.querySelector(selector);
        if (!container) return;
        
        // Track scroll position to detect direction
        let lastScrollY = window.scrollY;
        
        // Create a special observer for dice rolling on scroll
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Check if user is scrolling past this section
                    window.addEventListener('scroll', handleDiceScroll);
                    
                    // Make sure we only attach the listener once
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Function to handle dice rolling on scroll
        function handleDiceScroll() {
            // Only roll dice when section is in view
            const rect = container.getBoundingClientRect();
            const isVisible = 
                rect.top < window.innerHeight &&
                rect.bottom > 0;
                
            if (isVisible) {
                // Calculate scroll direction and speed
                const scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
                const scrollSpeed = Math.abs(window.scrollY - lastScrollY);
                
                // Only roll if scrolling speed is significant
                if (scrollSpeed > 5) {
                    // Roll dice with intensity based on scroll speed
                    rollDiceOnScroll(container, scrollDirection, Math.min(scrollSpeed / 10, 3));
                }
                
                // Update last scroll position
                lastScrollY = window.scrollY;
            }
        }
        
        // Observe the container
        scrollObserver.observe(container);
    }
    
    // Function to roll dice based on scroll
    function rollDiceOnScroll(container, direction, intensity) {
        const cards = container.querySelectorAll('.skill-card');
        
        // Roll a random selection of cards based on intensity
        const cardsToRoll = Math.floor(cards.length * (intensity / 5) + 1);
        const selectedCards = [];
        
        // Select random cards to roll
        while (selectedCards.length < cardsToRoll && selectedCards.length < cards.length) {
            const randomIndex = Math.floor(Math.random() * cards.length);
            const card = cards[randomIndex];
            
            if (!selectedCards.includes(card)) {
                selectedCards.push(card);
                
                // Trigger a dice roll animation
                setTimeout(() => {
                    // Create and dispatch a mouseenter event
                    const rollEvent = new MouseEvent('mouseenter', {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    });
                    
                    // Trigger the event
                    card.dispatchEvent(rollEvent);
                }, Math.random() * 300); // Stagger timing
            }
        }
    }
    
    // Function to add custom cursor behavior to any container
    function addCustomCursor(container) {
        const cursor = document.querySelector('.custom-cursor-indicator');
        const cursorArrow = cursor.querySelector('.cursor-arrow');
        
        // Show custom cursor on hover
        container.addEventListener('mousemove', function(e) {
            // Update cursor position
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.display = 'flex';
            
            // For skills, just show a rotation cursor
            cursorArrow.innerHTML = '↻';
        });
        
        // Hide cursor when leaving the container
        container.addEventListener('mouseleave', function() {
            cursor.style.display = 'none';
        });
    }
});
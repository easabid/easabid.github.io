/**
 * Skills Dice 3D Effect
 * Creates a rolling dice effect for skill cards on scroll
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add instruction for mobile users
    const skillsSection = document.querySelector('.skills-content');
    if (skillsSection) {
        const mobileInstruction = document.createElement('div');
        mobileInstruction.className = 'shake-instruction';
        mobileInstruction.textContent = '💡 Tip: Shake your device to roll the skill dice!';
        skillsSection.appendChild(mobileInstruction);
    }
    // Initialize dice effect for skills
    initializeSkillsDiceEffect();
    
    // Function to create the dice rolling effect
    function initializeSkillsDiceEffect() {
        // Get all skill cards
        const techSkillsContainer = document.querySelector('.skills-category:first-child .skills-grid');
        const softSkillsContainer = document.querySelector('.skills-category-soft .skills-grid');
        
        if (!techSkillsContainer || !softSkillsContainer) return;
        
        // Add perspective to the containers
        techSkillsContainer.style.perspective = '1000px';
        softSkillsContainer.style.perspective = '1000px';
        
        // Apply 3D dice effect to Technical Skills
        createDiceEffect(techSkillsContainer, 'tech');
        
        // Apply 3D dice effect to Soft Skills
        createDiceEffect(softSkillsContainer, 'soft');
    }
    
    // Function to create dice effect for a container
    function createDiceEffect(container, type) {
        const skillCards = container.querySelectorAll('.skill-card');
        const containerRect = container.getBoundingClientRect();
        
        // Set up the dice container
        container.style.transformStyle = 'preserve-3d';
        
        // Configure each skill card as a dice face
        skillCards.forEach((card, index) => {
            // Remove any existing transforms to start fresh
            card.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.transformStyle = 'preserve-3d';
            card.style.backfaceVisibility = 'hidden';
            card.style.position = 'relative';
            
            // Set initial state - slightly random rotation
            const initialRotateX = Math.random() * 20 - 10;
            const initialRotateY = Math.random() * 20 - 10;
            card.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) translateZ(0)`;
            
            // Add data attributes for tracking dice state
            card.dataset.currentRotation = 0;
            card.dataset.diceIndex = index;
            card.dataset.diceType = type;
            
            // Add event listeners for dice rotation
            card.addEventListener('mouseenter', handleDiceHover);
        });
        
        // Set up scroll-based dice rotation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When the container comes into view, trigger a roll animation
                    rollAllDice(container);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(container);
    }
    
    // Handle hovering over a dice (skill card)
    function handleDiceHover(e) {
        const card = e.currentTarget;
        const index = parseInt(card.dataset.diceIndex);
        const diceType = card.dataset.diceType;
        
        // Add rolling class for CSS animations
        card.classList.add('rolling');
        
        // Generate random rotation values to simulate dice rolling
        const rotateX = Math.random() * 360;
        const rotateY = Math.random() * 360;
        
        // Apply dice rotation animation
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        card.dataset.currentRotation = (parseInt(card.dataset.currentRotation) + 1) % 6;
        
        // Add shadow effects to enhance 3D appearance
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
        
        // Play dice rolling sound
        playDiceSound();
        
        // Return to stable position after animation
        setTimeout(() => {
            // Calculate a clean rotation for the final position (multiple of 90 degrees)
            const finalRotateX = Math.floor(rotateX / 90) * 90;
            const finalRotateY = Math.floor(rotateY / 90) * 90;
            
            card.style.transform = `rotateX(${finalRotateX}deg) rotateY(${finalRotateY}deg) translateZ(0)`;
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            card.classList.remove('rolling');
        }, 800);
    }
    
    // Function to play dice rolling sound
    function playDiceSound() {
        // Create a dice rolling sound effect
        const sound = new Audio();
        sound.volume = 0.3; // Set a reasonable volume
        
        // Use different sounds randomly
        const soundNumber = Math.floor(Math.random() * 3) + 1;
        
        // If browser supports audio, try to play it
        try {
            sound.src = `data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAAA8DWZs7JAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxBcDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=`;
            sound.play().catch(e => console.log("Audio play prevented by browser policy"));
        } catch(e) {
            // Silently fail if audio can't be played
            console.log("Audio not supported");
        }
    }
    
    // Function to roll all dice in a container
    function rollAllDice(container) {
        const skillCards = container.querySelectorAll('.skill-card');
        
        skillCards.forEach((card, index) => {
            // Add staggered delay for natural looking dice roll
            setTimeout(() => {
                // Simulate a dice roll by triggering mouseenter event
                const rollEvent = new MouseEvent('mouseenter', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                card.dispatchEvent(rollEvent);
            }, index * 150); // Staggered timing
        });
    }
    
    // Add button to manually trigger dice roll
    const skillsSections = document.querySelectorAll('.skills-content');
    skillsSections.forEach(section => {
        const rollButton = document.createElement('button');
        rollButton.className = 'dice-roll-button';
        rollButton.innerHTML = '<i class="fas fa-dice"></i> Roll Skills';
        rollButton.style.cssText = `
            background: linear-gradient(135deg, var(--primary-color), var(--accent-cyan));
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 30px;
            cursor: pointer;
            font-weight: 600;
            margin: 20px auto;
            display: block;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 230, 118, 0.3);
        `;
        
        // Add hover effect
        rollButton.addEventListener('mouseover', () => {
            rollButton.style.transform = 'scale(1.05)';
            rollButton.style.boxShadow = '0 8px 20px rgba(0, 230, 118, 0.4)';
        });
        
        rollButton.addEventListener('mouseout', () => {
            rollButton.style.transform = 'scale(1)';
            rollButton.style.boxShadow = '0 5px 15px rgba(0, 230, 118, 0.3)';
        });
        
        // Add click event to roll all dice
        rollButton.addEventListener('click', () => {
            // Add visual feedback to button
            rollButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                rollButton.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    rollButton.style.transform = 'scale(1)';
                }, 150);
            }, 150);
            
            const containers = section.querySelectorAll('.skills-grid');
            containers.forEach(container => {
                rollAllDice(container);
            });
        });
        
        // Add button at the bottom of the skills section
        section.appendChild(rollButton);
    });
    
    // Add "shake to roll" functionality for mobile devices
    let lastShakeTime = 0;
    window.addEventListener('devicemotion', function(event) {
        const currentTime = new Date().getTime();
        
        // Throttle shake detection to prevent multiple triggers
        if (currentTime - lastShakeTime < 1000) return;
        
        const acceleration = event.accelerationIncludingGravity;
        
        // Check if it's a shake gesture
        if (acceleration && 
            (Math.abs(acceleration.x) > 15 || 
             Math.abs(acceleration.y) > 15 || 
             Math.abs(acceleration.z) > 15)) {
            
            lastShakeTime = currentTime;
            
            // Roll all dice when device is shaken
            const containers = document.querySelectorAll('.skills-grid');
            containers.forEach(container => {
                rollAllDice(container);
            });
        }
    });
});
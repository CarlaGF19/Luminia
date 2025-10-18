// Lumina: Apus de la Energía - Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the game UI
    initializeParticleSystem();
    initializeCardInteractions();
    initializeProgressBar();
    initializeAuroraEffects();
});

// Particle System Enhancement
function initializeParticleSystem() {
    const particleContainer = document.querySelector('.floating-particles');
    
    // Create additional dynamic particles
    for (let i = 0; i < 12; i++) {
        createFloatingParticle(particleContainer, i);
    }
    
    // Create energy orbs around cards
    const cards = document.querySelectorAll('.guardian-card');
    cards.forEach((card, index) => {
        createCardEnergyOrbs(card, index);
    });
}

function createFloatingParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'dynamic-particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(139, 92, 246, 0.3));
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        animation: particle-float ${Math.random() * 8 + 6}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
    `;
    container.appendChild(particle);
}

function createCardEnergyOrbs(card, cardIndex) {
    const colors = [
        'rgba(250, 204, 21, 0.6)', // Inti - Solar
        'rgba(59, 130, 246, 0.6)',  // Wayra - Wind
        'rgba(16, 185, 129, 0.6)',  // Tierra - Earth
        'rgba(139, 92, 246, 0.6)'   // Kallpuna - Collective
    ];
    
    for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.className = 'energy-orb';
        orb.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${colors[cardIndex]};
            border-radius: 50%;
            filter: blur(1px);
            animation: orbit-${cardIndex} ${4 + i}s linear infinite;
            animation-delay: ${i * 0.8}s;
            pointer-events: none;
            z-index: 1;
        `;
        card.appendChild(orb);
    }
    
    // Add orbit animations dynamically
    addOrbitalAnimations(cardIndex);
}

function addOrbitalAnimations(cardIndex) {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes orbit-${cardIndex} {
            0% { 
                transform: rotate(0deg) translateX(150px) rotate(0deg);
                opacity: 0.3;
            }
            50% { 
                opacity: 1;
            }
            100% { 
                transform: rotate(360deg) translateX(150px) rotate(-360deg);
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(style);
}

// Card Interactions
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.guardian-card');
    
    cards.forEach((card, index) => {
        const cardData = {
            inti: { sound: 'solar-activation', energy: 'Solar Power Activated!' },
            wayra: { sound: 'wind-activation', energy: 'Wind Energy Unleashed!' },
            tierra: { sound: 'earth-activation', energy: 'Earth Energy Restored!' },
            kallpuna: { sound: 'collective-activation', energy: 'Collective Energy United!' }
        };
        
        const guardianType = card.dataset.guardian;
        const activateBtn = card.querySelector('.activate-btn');
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            createHoverParticles(card);
            enhanceCardGlow(card, guardianType);
        });
        
        card.addEventListener('mouseleave', () => {
            removeHoverParticles(card);
            normalizeCardGlow(card);
        });
        
        // Activation effects
        activateBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            activateGuardian(card, guardianType, cardData[guardianType]);
        });
        
        // Card selection
        card.addEventListener('click', () => {
            selectCard(card, index);
        });
    });
}

function createHoverParticles(card) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'hover-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: hover-particle-rise 2s ease-out forwards;
            pointer-events: none;
            z-index: 3;
        `;
        card.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
    
    // Add hover particle animation
    if (!document.querySelector('#hover-particle-style')) {
        const style = document.createElement('style');
        style.id = 'hover-particle-style';
        style.textContent = `
            @keyframes hover-particle-rise {
                0% { 
                    transform: translateY(0px) scale(0);
                    opacity: 0;
                }
                20% { 
                    opacity: 1;
                    transform: scale(1);
                }
                100% { 
                    transform: translateY(-50px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function removeHoverParticles(card) {
    const hoverParticles = card.querySelectorAll('.hover-particle');
    hoverParticles.forEach(particle => {
        particle.style.animation = 'hover-particle-fade 0.5s ease-out forwards';
    });
}

function enhanceCardGlow(card, guardianType) {
    const glow = card.querySelector('.card-glow');
    glow.style.opacity = '0.6';
    glow.style.transform = 'scale(1.2)';
    
    // Add pulsing effect
    card.style.animation = 'card-pulse 2s ease-in-out infinite';
    
    if (!document.querySelector('#card-pulse-style')) {
        const style = document.createElement('style');
        style.id = 'card-pulse-style';
        style.textContent = `
            @keyframes card-pulse {
                0%, 100% { transform: translateY(-15px) scale(1.05); }
                50% { transform: translateY(-20px) scale(1.08); }
            }
        `;
        document.head.appendChild(style);
    }
}

function normalizeCardGlow(card) {
    const glow = card.querySelector('.card-glow');
    glow.style.opacity = '0.3';
    glow.style.transform = 'scale(1)';
    card.style.animation = '';
}

function activateGuardian(card, guardianType, data) {
    // Visual activation effect
    card.classList.add('activating');
    
    // Create activation burst
    createActivationBurst(card);
    
    // Update progress bar
    updateProgressBar();
    
    // Show activation message
    showActivationMessage(data.energy);
    
    // Remove activation class after animation
    setTimeout(() => {
        card.classList.remove('activating');
    }, 1500);
    
    // Add activation styles if not present
    if (!document.querySelector('#activation-style')) {
        const style = document.createElement('style');
        style.id = 'activation-style';
        style.textContent = `
            .guardian-card.activating {
                animation: activation-pulse 1.5s ease-out;
                z-index: 10;
            }
            
            @keyframes activation-pulse {
                0% { transform: translateY(-15px) scale(1.05); }
                30% { transform: translateY(-25px) scale(1.15); }
                60% { transform: translateY(-20px) scale(1.1); }
                100% { transform: translateY(-15px) scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
}

function createActivationBurst(card) {
    for (let i = 0; i < 12; i++) {
        const burst = document.createElement('div');
        burst.className = 'activation-burst';
        burst.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: burst-${i} 1.5s ease-out forwards;
            pointer-events: none;
            z-index: 5;
        `;
        card.appendChild(burst);
        
        // Create unique burst animation for each particle
        const angle = (360 / 12) * i;
        const distance = 100 + Math.random() * 50;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes burst-${i} {
                0% { 
                    transform: translate(-50%, -50%) rotate(${angle}deg) translateX(0px) scale(0);
                    opacity: 1;
                }
                70% { 
                    opacity: 1;
                    transform: translate(-50%, -50%) rotate(${angle}deg) translateX(${distance}px) scale(1);
                }
                100% { 
                    transform: translate(-50%, -50%) rotate(${angle}deg) translateX(${distance * 1.5}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove burst particle after animation
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 1500);
    }
}

function selectCard(card, index) {
    // Remove previous selections
    document.querySelectorAll('.guardian-card').forEach(c => c.classList.remove('selected'));
    
    // Add selection to current card
    card.classList.add('selected');
    
    // Add selection styles if not present
    if (!document.querySelector('#selection-style')) {
        const style = document.createElement('style');
        style.id = 'selection-style';
        style.textContent = `
            .guardian-card.selected {
                border: 3px solid rgba(255, 255, 255, 0.8);
                box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
            }
        `;
        document.head.appendChild(style);
    }
}

// Progress Bar Enhancement
function initializeProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    // Animate progress bar on load
    setTimeout(() => {
        progressFill.style.width = '67%';
    }, 1000);
}

function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    let currentProgress = parseInt(progressPercentage.textContent);
    let newProgress = Math.min(currentProgress + Math.floor(Math.random() * 15) + 5, 100);
    
    // Animate progress increase
    let animationProgress = currentProgress;
    const increment = (newProgress - currentProgress) / 30;
    
    const progressAnimation = setInterval(() => {
        animationProgress += increment;
        if (animationProgress >= newProgress) {
            animationProgress = newProgress;
            clearInterval(progressAnimation);
        }
        
        progressFill.style.width = animationProgress + '%';
        progressPercentage.textContent = Math.floor(animationProgress) + '%';
    }, 50);
}

// Aurora Effects Enhancement
function initializeAuroraEffects() {
    const aurora = document.querySelector('.aurora');
    
    // Add dynamic color shifting
    setInterval(() => {
        const colors = [
            'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.3) 25%, rgba(59, 130, 246, 0.4) 50%, rgba(16, 185, 129, 0.3) 75%, transparent 100%)',
            'linear-gradient(90deg, transparent 0%, rgba(244, 114, 182, 0.3) 25%, rgba(139, 92, 246, 0.4) 50%, rgba(59, 130, 246, 0.3) 75%, transparent 100%)',
            'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.3) 25%, rgba(244, 114, 182, 0.4) 50%, rgba(139, 92, 246, 0.3) 75%, transparent 100%)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        aurora.style.background = randomColor;
    }, 8000);
}

// Activation Message System
function showActivationMessage(message) {
    // Remove existing message
    const existingMessage = document.querySelector('.activation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = 'activation-message';
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(20px);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        padding: 20px 40px;
        color: white;
        font-family: 'Orbitron', sans-serif;
        font-weight: 600;
        font-size: 1.2rem;
        text-align: center;
        z-index: 1000;
        animation: message-appear 3s ease-out forwards;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(messageElement);
    
    // Add message animation
    if (!document.querySelector('#message-style')) {
        const style = document.createElement('style');
        style.id = 'message-style';
        style.textContent = `
            @keyframes message-appear {
                0% { 
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                20% { 
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.1);
                }
                30% { 
                    transform: translate(-50%, -50%) scale(1);
                }
                80% { 
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% { 
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove message after animation
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }, 3000);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    const cards = document.querySelectorAll('.guardian-card');
    const currentSelected = document.querySelector('.guardian-card.selected');
    
    if (e.key >= '1' && e.key <= '4') {
        const cardIndex = parseInt(e.key) - 1;
        if (cards[cardIndex]) {
            selectCard(cards[cardIndex], cardIndex);
        }
    }
    
    if (e.key === 'Enter' && currentSelected) {
        const activateBtn = currentSelected.querySelector('.activate-btn');
        activateBtn.click();
    }
});

// Performance optimization: Reduce particles on lower-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--particle-count', '4');
} else {
    document.documentElement.style.setProperty('--particle-count', '8');
}
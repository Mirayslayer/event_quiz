// Countdown Timer
function startCountdown() {
    // Set launch date to October 1, 2025
    const launchDate = new Date('2025-10-01T00:00:00');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<h2>🎉 WE\'RE LIVE! 🎉</h2>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Email notification
function setupEmailNotification() {
    const emailInput = document.getElementById('emailInput');
    const notifyBtn = document.getElementById('notifyBtn');
    
    notifyBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address!', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address!', 'error');
            return;
        }
        
        // Simulate successful signup
        notifyBtn.textContent = 'Added!';
        notifyBtn.style.background = 'linear-gradient(135deg, #00FFFF, #FF00FF)';
        emailInput.value = '';
        
        showNotification('🎉 Thanks! We\'ll notify you when we launch!', 'success');
        
        setTimeout(() => {
            notifyBtn.textContent = 'Get Notified';
            notifyBtn.style.background = 'linear-gradient(135deg, #FF1493, #00FFFF)';
        }, 3000);
    });
    
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            notifyBtn.click();
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        text-align: center;
        backdrop-filter: blur(10px);
        ${type === 'success' ? 
            'background: linear-gradient(135deg, #00FFFF, #FF00FF); border: 2px solid rgba(0, 255, 255, 0.5);' : 
            'background: linear-gradient(135deg, #FF1493, #FF00FF); border: 2px solid rgba(255, 20, 147, 0.5);'
        }
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}


// Smooth scroll for better experience
function setupSmoothInteractions() {
    // Add smooth hover effects to all interactive elements
    const interactiveElements = document.querySelectorAll('button, .feature-item, .countdown-item, .social-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
}


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    setupEmailNotification();
    setupSmoothInteractions();
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
`;
document.head.appendChild(style);
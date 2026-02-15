// Configuration
const WEBHOOK_URL = 'https://theistical-maryellen-polishedly.ngrok-free.dev/webhook/9e885b4e-1c64-42f7-928f-0a3ec3eb8d2c';
const REDIRECT_URL = 'https://www.youtube.com/watch?v=4MIODTZkq_Y&list=RDMM8xrh4H_wmw0&index=11';

// Get query string parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Show loading state
function showLoading() {
    document.querySelector('.loading').classList.add('active');
    document.querySelector('.error').classList.remove('active');
}

// Show error state + message
function showError(message) {
    document.querySelector('.loading').classList.remove('active');
    document.querySelector('.error').classList.add('active');
    
    if (message) {
        document.getElementById('errorMessage').textContent = message;
    }
}

// Send webhook with token
async function sendWebhook(token) {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                action: 'use'
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('Webhook error:', error);
        // Still return true to allow redirect even if webhook fails
        return true;
    }
}

// Main function to handle redirect
async function handleRedirect() {
    showLoading();
    
    // Get token from query parameters
    const token = getQueryParam('token');
    
    if (!token) {
        showError('Missing token parameter. Please use a valid link.');
        return;
    }
    
    // Send webhook
    const webhookSent = await sendWebhook(token);
    
    if(!webhookSent) {
        showError('Failed to redirect. Please try again later.');
        return;
    }else {
        setTimeout(() => {
            window.location.href = REDIRECT_URL;
        }, 1000);
    }
}

// Run automatically when page loads
window.addEventListener('load', handleRedirect);
// ============================================
// EVENTOS ESPECIALES
// ============================================

window.activeEvent = null;
window.eventEndTime = null;

function startEventTimer() {
    const savedEvent = localStorage.getItem('activeEvent');
    const savedEventTime = localStorage.getItem('eventEndTime');
    
    if (savedEvent && savedEventTime && Date.now() < parseInt(savedEventTime)) {
        window.activeEvent = savedEvent;
        window.eventEndTime = parseInt(savedEventTime);
        showEventBanner();
    } else {
        scheduleRandomEvent();
    }
}

function scheduleRandomEvent() {
    const timeUntilEvent = Math.random() * 600000 + 300000; // 5-15 minutos
    
    setTimeout(() => {
        activateRandomEvent();
        scheduleRandomEvent();
    }, timeUntilEvent);
}

function activateRandomEvent() {
    const events = ['doubleClick', 'rainClicks', 'discount'];
    const eventNames = {
        doubleClick: '✨ ¡EVENTO: DOBLE CLIC! ✨ (x2 por 5 min)',
        rainClicks: '🌧️ ¡EVENTO: LLUVIA DE CLICS! 🌧️ (+5 CPS por 5 min)',
        discount: '🏷️ ¡EVENTO: DESCUENTO! 🏷️ (50% off en tienda por 5 min)'
    };
    
    window.activeEvent = events[Math.floor(Math.random() * events.length)];
    window.eventEndTime = Date.now() + 300000; // 5 minutos
    
    localStorage.setItem('activeEvent', window.activeEvent);
    localStorage.setItem('eventEndTime', window.eventEndTime);
    
    showEventBanner();
    window.showNotification(eventNames[window.activeEvent]);
}

function checkEvent() {
    if (window.activeEvent && window.eventEndTime && Date.now() > window.eventEndTime) {
        window.activeEvent = null;
        window.eventEndTime = null;
        localStorage.removeItem('activeEvent');
        localStorage.removeItem('eventEndTime');
        hideEventBanner();
        window.showNotification('⏰ El evento especial ha terminado');
    }
}

function showEventBanner() {
    const banner = document.getElementById('eventBanner');
    const eventText = document.getElementById('eventText');
    if (banner && eventText) {
        const eventNames = {
            doubleClick: '✨ ¡DOBLE CLIC ACTIVADO! ✨ x2 en cada clic',
            rainClicks: '🌧️ ¡LLUVIA DE CLICS! 🌧️ +5 CPS automáticos',
            discount: '🏷️ ¡DESCUENTO ACTIVADO! 🏷️ 50% OFF en tienda'
        };
        eventText.textContent = eventNames[window.activeEvent] || '✨ ¡EVENTO ACTIVO! ✨';
        banner.style.display = 'block';
    }
}

function hideEventBanner() {
    const banner = document.getElementById('eventBanner');
    if (banner) {
        banner.style.display = 'none';
    }
}

window.getEventDiscount = function() {
    return window.activeEvent === 'discount' ? 0.5 : 1;
};

// Inicializar eventos
document.addEventListener('DOMContentLoaded', () => {
    startEventTimer();
    setInterval(checkEvent, 1000);
});
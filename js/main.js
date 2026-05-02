// ============================================
// VARIABLES GLOBALES
// ============================================
window.gameState = {
    clickCount: 0,
    totalClicks: 0,
    clickMultiplier: 1,
    autoClickers: 0,
    cps: 0,
    highScore: 0,
    totalPurchases: 0,
    playTime: 0
};

window.itemCounts = {
    autoClicker: 0,
    multiplier: 1
};

window.shopPrices = {
    autoClicker: 50,
    clickMultiplier: 100,
    timeBoost: 200,
    capsule: 500,
    superCapsule: 1000
};

window.clickHistory = [];
window.boostActive = false;
window.boostEndTime = null;

// Elementos del DOM
const elements = {};

// ============================================
// SISTEMA DE NOTIFICACIONES MEJORADO (SIN DUPLICADOS)
// ============================================

let notificationQueue = [];
let isShowingNotification = false;

window.showNotification = function(message, type = 'success') {
    // Limitar longitud del mensaje
    if (message.length > 60) {
        message = message.substring(0, 57) + '...';
    }
    
    // Evitar notificaciones vacías
    if (!message || message.trim() === '') return;
    
    // Agregar a la cola
    notificationQueue.push({ message, type });
    
    // Procesar la cola si no hay una notificación activa
    if (!isShowingNotification) {
        processNotificationQueue();
    }
};

function processNotificationQueue() {
    if (notificationQueue.length === 0) {
        isShowingNotification = false;
        return;
    }
    
    isShowingNotification = true;
    const { message, type } = notificationQueue.shift();
    
    const notificationArea = document.getElementById('notificationArea');
    if (!notificationArea) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'all 0.3s ease';
    
    notificationArea.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Eliminar después de 2.5 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            notification.remove();
            processNotificationQueue();
        }, 300);
    }, 2500);
}

// Limpiar notificaciones antiguas periódicamente
setInterval(() => {
    const notifications = document.querySelectorAll('.notification');
    if (notifications.length > 5) {
        notifications.forEach((notif, index) => {
            if (index < notifications.length - 3) {
                notif.remove();
            }
        });
    }
}, 10000);

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    updateTime();
    setupEventListeners();
    updateUI();
    
    setInterval(updateTime, 1000);
    setInterval(autoClick, 1000);
    setInterval(updateCPS, 100);
    setInterval(updatePlayTime, 1000);
});

function initElements() {
    elements.clickCount = document.getElementById('clickCount');
    elements.cps = document.getElementById('cps');
    elements.gameStatus = document.getElementById('gameStatus');
    elements.clickButton = document.getElementById('clickButton');
    elements.currentTime = document.getElementById('currentTime');
    elements.progressBar = document.getElementById('progressBar');
    elements.nextAchievementName = document.getElementById('nextAchievementName');
    elements.autoClickerCount = document.getElementById('autoClickerCount');
    elements.multiplierCount = document.getElementById('multiplierCount');
    elements.multiplierDisplay = document.getElementById('multiplierDisplay');
    elements.totalClicks = document.getElementById('totalClicks');
    elements.highScore = document.getElementById('highScore');
    elements.playTime = document.getElementById('playTime');
    elements.notificationArea = document.getElementById('notificationArea');
    
    console.log('Elementos inicializados:', Object.keys(elements));
}

function setupEventListeners() {
    if (elements.clickButton) {
        // Remover event listeners antiguos para evitar duplicados
        const newButton = elements.clickButton.cloneNode(true);
        elements.clickButton.parentNode.replaceChild(newButton, elements.clickButton);
        elements.clickButton = newButton;
        elements.clickButton.addEventListener('click', handleClick);
        console.log('Evento de click configurado');
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !e.repeat) {
            e.preventDefault();
            simulateClick();
        }
    });
    
    // Animar estado del juego al pasar mouse
    if (elements.clickButton) {
        elements.clickButton.addEventListener('mouseenter', () => {
            if (elements.gameStatus) elements.gameStatus.textContent = '¡CLIQUEA!';
        });
        
        elements.clickButton.addEventListener('mouseleave', () => {
            if (elements.gameStatus) elements.gameStatus.textContent = 'CLICK!';
        });
    }
}

// ============================================
// FUNCIÓN PRINCIPAL DE CLIC
// ============================================
function handleClick(event) {
    console.log("Click detectado!"); // Debug
    
    let clicksGained = window.gameState.clickMultiplier;
    
    // Bonus de prestigio
    if (window.prestigeData) {
        clicksGained = Math.floor(clicksGained * window.prestigeData.bonus);
    }
    
    // Bonus de evento
    if (window.activeEvent === 'doubleClick') {
        clicksGained *= 2;
    }
    
    window.gameState.clickCount += clicksGained;
    window.gameState.totalClicks += clicksGained;
    
    window.clickHistory.push(Date.now());
    
    if (window.gameState.clickCount > window.gameState.highScore) {
        window.gameState.highScore = window.gameState.clickCount;
    }
    
    // Efecto visual del +1
    const clientX = event ? (event.clientX || window.innerWidth / 2) : window.innerWidth / 2;
    const clientY = event ? (event.clientY || window.innerHeight / 2) : window.innerHeight / 2;
    createClickEffect({ clientX, clientY }, clicksGained);
    
    animateButton();
    updateProgressBar();
    updateUI();
    
    // Actualizar misiones
    if (window.updateMissionProgress) {
        window.updateMissionProgress('clicks', clicksGained);
    }
    
    // Verificar logros
    if (window.checkAchievements) {
        window.checkAchievements();
    }
    
    window.saveGame();
}

function simulateClick() {
    handleClick({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
}

function createClickEffect(event, clicks) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = `+${clicks}`;
    effect.style.left = (event.clientX - 30) + 'px';
    effect.style.top = (event.clientY - 30) + 'px';
    document.body.appendChild(effect);
    
    setTimeout(() => {
        if (effect && effect.remove) effect.remove();
    }, 1000);
}

function animateButton() {
    if (!elements.clickButton) return;
    
    elements.clickButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        if (elements.clickButton) elements.clickButton.style.transform = 'scale(1)';
    }, 100);
    
    if (elements.gameStatus) {
        elements.gameStatus.textContent = '¡CLICK!';
        setTimeout(() => {
            if (elements.gameStatus) elements.gameStatus.textContent = 'CLICK!';
        }, 200);
    }
}

// ============================================
// ACTUALIZAR UI (CORREGIDO)
// ============================================
function updateUI() {
    // Actualizar contador principal de clics
    if (elements.clickCount) {
        elements.clickCount.textContent = formatNumber(Math.floor(window.gameState.clickCount));
    }
    
    // Actualizar total de clics
    if (elements.totalClicks) {
        elements.totalClicks.textContent = formatNumber(window.gameState.totalClicks);
    }
    
    // Actualizar high score
    if (elements.highScore) {
        elements.highScore.textContent = formatNumber(window.gameState.highScore);
    }
    
    // Actualizar auto clickers
    if (elements.autoClickerCount) {
        elements.autoClickerCount.textContent = window.gameState.autoClickers;
    }
    
    // Actualizar multiplicador
    if (elements.multiplierCount) {
        elements.multiplierCount.textContent = window.gameState.clickMultiplier + 'x';
    }
    
    if (elements.multiplierDisplay) {
        elements.multiplierDisplay.textContent = 'x' + window.gameState.clickMultiplier;
    }
    
    // Actualizar precios de tienda (si hay función)
    if (window.updateShopPrices) {
        window.updateShopPrices();
    }
    
    // Actualizar niveles
    const autoClickerLevel = document.getElementById('autoClickerLevel');
    if (autoClickerLevel) {
        autoClickerLevel.textContent = `Nivel ${window.itemCounts.autoClicker}`;
    }
    
    const multiplierLevel = document.getElementById('multiplierLevel');
    if (multiplierLevel) {
        multiplierLevel.textContent = `x${window.gameState.clickMultiplier}`;
    }
    
    // Actualizar UI de prestigio
    if (window.updatePrestigeUI) {
        window.updatePrestigeUI();
    }
    
    console.log("UI actualizada - Clics:", Math.floor(window.gameState.clickCount)); // Debug
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function updateProgressBar() {
    const nextMilestone = findNextMilestone();
    if (nextMilestone && elements.progressBar) {
        const progress = (window.gameState.totalClicks / nextMilestone) * 100;
        elements.progressBar.style.width = Math.min(progress, 100) + '%';
        
        if (elements.nextAchievementName) {
            elements.nextAchievementName.textContent = `${nextMilestone} clics - ${getAchievementName(nextMilestone)}`;
        }
    }
}

function findNextMilestone() {
    const milestones = [1, 10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2500, 5000, 10000];
    return milestones.find(m => m > window.gameState.totalClicks);
}

function getAchievementName(clicks) {
    const names = {
        1: '¡Primer Paso!',
        10: 'Aprendiz de Clics',
        50: 'Dedo Ágil',
        100: 'Centenario',
        200: 'Doble Centuria',
        300: 'Tricentenario',
        400: 'Cuadrigentésimo',
        500: 'Quinientos',
        600: 'Sescentenario',
        700: 'Septingentésimo',
        800: 'Octingentésimo',
        900: 'Noningentésimo',
        1000: '¡LEYENDA!',
        2500: 'Dos Mil Quinientos',
        5000: 'Cinco Mil',
        10000: 'Diez Mil'
    };
    return names[clicks] || 'Logro';
}

// ============================================
// AUTO CLICKER Y CPS
// ============================================
function autoClick() {
    let clicksToAdd = window.gameState.autoClickers;
    
    if (window.activeEvent === 'rainClicks') {
        clicksToAdd += 5;
    }
    
    if (window.boostActive) {
        clicksToAdd *= 3;
    }
    
    if (window.prestigeData) {
        clicksToAdd = Math.floor(clicksToAdd * window.prestigeData.bonus);
    }
    
    if (clicksToAdd > 0) {
        window.gameState.clickCount += clicksToAdd;
        window.gameState.totalClicks += clicksToAdd;
        
        for (let i = 0; i < clicksToAdd; i++) {
            window.clickHistory.push(Date.now());
        }
        
        updateUI();
        window.saveGame();
    }
}

function updateCPS() {
    const now = Date.now();
    window.clickHistory = window.clickHistory.filter(time => now - time < 1000);
    window.gameState.cps = window.clickHistory.length;
    
    if (elements.cps) {
        if (window.boostActive) {
            elements.cps.innerHTML = `${window.gameState.cps * 3} <span style="color: gold; font-size: 0.8rem;">(BOOST)</span>`;
        } else {
            elements.cps.textContent = window.gameState.cps;
        }
    }
}

// ============================================
// TIEMPO
// ============================================
function updateTime() {
    const now = new Date();
    if (elements.currentTime) {
        elements.currentTime.textContent = now.toLocaleTimeString();
    }
}

function updatePlayTime() {
    window.gameState.playTime++;
    const hours = Math.floor(window.gameState.playTime / 3600);
    const minutes = Math.floor((window.gameState.playTime % 3600) / 60);
    if (elements.playTime) {
        elements.playTime.textContent = `${hours}h ${minutes}m`;
    }
}

// ============================================
// GUARDADO Y CARGA
// ============================================
window.saveGame = function() {
    const saveData = {
        gameState: window.gameState,
        shopPrices: window.shopPrices,
        itemCounts: window.itemCounts,
        prestigeData: window.prestigeData,
        dailyMissions: window.dailyMissions,
        version: '4.0',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('clickGameSave', JSON.stringify(saveData));
    window.showNotification('💾 ¡Juego guardado!');
};

window.loadGame = function() {
    const savedData = localStorage.getItem('clickGameSave');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            window.gameState = data.gameState;
            window.shopPrices = data.shopPrices;
            if (data.itemCounts) window.itemCounts = data.itemCounts;
            if (data.prestigeData) window.prestigeData = data.prestigeData;
            if (data.dailyMissions) window.dailyMissions = data.dailyMissions;
            
            updateUI();
            if (window.renderMissions) window.renderMissions();
            if (window.updatePrestigeUI) window.updatePrestigeUI();
            
            window.showNotification('📂 ¡Juego cargado!');
        } catch (error) {
            console.error('Error al cargar:', error);
            window.showNotification('❌ Error al cargar partida', 'error');
        }
    } else {
        window.showNotification('🆕 No hay partida guardada', 'info');
    }
};

window.resetGame = function() {
    if (confirm('¿Seguro que quieres reiniciar? Todo tu progreso se perderá.')) {
        window.gameState = {
            clickCount: 0,
            totalClicks: 0,
            clickMultiplier: 1,
            autoClickers: 0,
            cps: 0,
            highScore: 0,
            totalPurchases: 0,
            playTime: 0
        };
        
        window.shopPrices = {
            autoClicker: 50,
            clickMultiplier: 100,
            timeBoost: 200,
            capsule: 500,
            superCapsule: 1000
        };
        
        window.itemCounts = { autoClicker: 0, multiplier: 1 };
        window.prestigeData = { level: 0, points: 0, bonus: 1 };
        
        updateUI();
        if (window.updatePrestigeUI) window.updatePrestigeUI();
        if (window.generateDailyMissions) window.generateDailyMissions();
        
        window.showNotification('🔄 Juego reiniciado');
        window.saveGame();
    }
};

// Exponer funciones globales
window.handleClick = handleClick;
window.updateUI = updateUI;
window.formatNumber = formatNumber;

console.log('✅ main.js cargado correctamente');
// ============================================
// VARIABLES GLOBALES
// ============================================
let gameState = {
    clickCount: 0,
    totalClicks: 0,
    clickMultiplier: 1,
    autoClickers: 0,
    cps: 0,
    highScore: 0,
    totalPurchases: 0,
    playTime: 0
};

let shopPrices = {
    autoClicker: 50,
    clickMultiplier: 100,
    timeBoost: 200,
    capsule: 500,
    superCapsule: 1000
};

let itemCounts = {
    autoClicker: 0,
    multiplier: 1
};

// Sistema de prestigio
let prestigeData = {
    level: 0,
    points: 0,
    bonus: 1
};

// Eventos especiales
let activeEvent = null;
let eventEndTime = null;

// Misiones diarias
let dailyMissions = [];
let lastMissionReset = null;

// Historial de clics
let clickHistory = [];
let boostActive = false;
let boostEndTime = null;

// Elementos del DOM
const elements = {};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    initElements();
    updateTime();
    generateDailyMissions();
    startEventTimer();
    setupEventListeners();
    
    setInterval(updateTime, 1000);
    setInterval(autoClick, 1000);
    setInterval(updateCPS, 100);
    setInterval(updatePlayTime, 1000);
    setInterval(checkEvent, 1000);
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
    elements.prestigeLevel = document.getElementById('prestigeLevel');
    elements.prestigePoints = document.getElementById('prestigePoints');
    elements.prestigeBonus = document.getElementById('prestigeBonus');
}

function setupEventListeners() {
    elements.clickButton.addEventListener('click', handleClick);
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !e.repeat) {
            e.preventDefault();
            simulateClick();
        }
    });
}

// ============================================
// FUNCIONES PRINCIPALES
// ============================================
function handleClick(event) {
    let clicksGained = gameState.clickMultiplier;
    
    // Aplicar bonus de prestigio
    clicksGained = Math.floor(clicksGained * prestigeData.bonus);
    
    // Aplicar bonus de evento
    if (activeEvent === 'doubleClick') {
        clicksGained *= 2;
    }
    
    gameState.clickCount += clicksGained;
    gameState.totalClicks += clicksGained;
    
    clickHistory.push(Date.now());
    
    if (gameState.clickCount > gameState.highScore) {
        gameState.highScore = gameState.clickCount;
    }
    
    createClickEffect(event, clicksGained);
    animateButton();
    updateProgressBar();
    updateUI();
    saveGame();
}

function simulateClick() {
    const fakeEvent = {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
    };
    handleClick(fakeEvent);
}

function createClickEffect(event, clicks) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = `+${clicks}`;
    effect.style.left = (event.clientX - 30) + 'px';
    effect.style.top = (event.clientY - 30) + 'px';
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 1000);
}

function animateButton() {
    elements.clickButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        elements.clickButton.style.transform = 'scale(1)';
    }, 100);
    
    elements.gameStatus.textContent = '¡CLICK!';
    setTimeout(() => {
        elements.gameStatus.textContent = 'CLICK!';
    }, 200);
}

// ============================================
// SISTEMA DE PRESTIGIO
// ============================================
function prestige() {
    const requiredClicks = 10000;
    
    if (gameState.totalClicks >= requiredClicks) {
        if (confirm(`¿PRESTIGIAR?\n\nPerderás:\n- ${Math.floor(gameState.clickCount)} clics actuales\n- ${gameState.autoClickers} Auto Clickers\n- Multiplicador x${gameState.clickMultiplier}\n\nGanarás:\n- +1 Nivel de Prestigio\n- +1 Punto de Leyenda\n- Bonus permanente x${(prestigeData.bonus + 0.1).toFixed(1)}\n\n¿Continuar?`)) {
            
            // Calcular puntos ganados
            const pointsGained = 1;
            prestigeData.points += pointsGained;
            prestigeData.level++;
            prestigeData.bonus = 1 + (prestigeData.points * 0.1);
            
            // Reiniciar juego
            gameState.clickCount = 0;
            gameState.clickMultiplier = 1;
            gameState.autoClickers = 0;
            itemCounts.autoClicker = 0;
            itemCounts.multiplier = 1;
            
            // Resetear precios de tienda
            shopPrices = {
                autoClicker: 50,
                clickMultiplier: 100,
                timeBoost: 200,
                capsule: 500,
                superCapsule: 1000
            };
            
            updateUI();
            updatePrestigeUI();
            showNotification(`🌟 ¡PRESTIGIO! Nivel ${prestigeData.level} | Bonus x${prestigeData.bonus.toFixed(1)}`);
            saveGame();
        }
    } else {
        showNotification(`❌ Necesitas 10,000 clics totales para prestigiar (tienes ${gameState.totalClicks})`, 'error');
    }
}

function updatePrestigeUI() {
    if (elements.prestigeLevel) elements.prestigeLevel.textContent = prestigeData.level;
    if (elements.prestigePoints) elements.prestigePoints.textContent = prestigeData.points;
    if (elements.prestigeBonus) elements.prestigeBonus.textContent = `x${prestigeData.bonus.toFixed(1)}`;
}

// ============================================
// MINIJUEGOS
// ============================================
function toggleMinigames() {
    const grid = document.getElementById('minigamesGrid');
    const toggle = document.getElementById('minigameToggle');
    if (grid && toggle) {
        grid.classList.toggle('show');
        toggle.classList.toggle('rotated');
    }
}

function playRoulette() {
    const cost = 100;
    if (gameState.clickCount >= cost) {
        gameState.clickCount -= cost;
        
        const number = Math.floor(Math.random() * 37);
        let prize = 0;
        let message = '';
        
        if (number === 0) {
            prize = cost * 35;
            message = `🎡 ¡RULETA! Cayó ${number} - ¡JACKPOT! +${prize} clics`;
        } else if (number % 2 === 0) {
            prize = cost * 2;
            message = `🎡 ¡RULETA! Cayó ${number} (par) - Ganaste ${prize} clics`;
        } else {
            prize = Math.floor(cost / 2);
            message = `🎡 ¡RULETA! Cayó ${number} (impar) - Perdiste, recuperas ${prize} clics`;
        }
        
        gameState.clickCount += prize;
        showNotification(message);
        updateUI();
        saveGame();
    } else {
        showNotification(`❌ Necesitas ${cost} clics para jugar`, 'error');
    }
}

function playSlotMachine() {
    const cost = 50;
    if (gameState.clickCount >= cost) {
        gameState.clickCount -= cost;
        
        const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '💎', '7️⃣'];
        const reels = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        let prize = 0;
        let message = '';
        
        if (reels[0] === reels[1] && reels[1] === reels[2]) {
            const multiplier = reels[0] === '7️⃣' ? 50 : (reels[0] === '💎' ? 25 : 10);
            prize = cost * multiplier;
            message = `🎰 ¡TRAGAMONEDAS! ${reels.join(' ')} - ¡JACKPOT! +${prize} clics`;
        } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
            prize = cost * 2;
            message = `🎰 ¡TRAGAMONEDAS! ${reels.join(' ')} - Ganaste ${prize} clics`;
        } else {
            prize = 0;
            message = `🎰 ¡TRAGAMONEDAS! ${reels.join(' ')} - Perdiste`;
        }
        
        gameState.clickCount += prize;
        showNotification(message, prize === 0 ? 'error' : 'success');
        updateUI();
        saveGame();
    } else {
        showNotification(`❌ Necesitas ${cost} clics para jugar`, 'error');
    }
}

function playNumberGuess() {
    const cost = 25;
    if (gameState.clickCount >= cost) {
        gameState.clickCount -= cost;
        
        const secretNumber = Math.floor(Math.random() * 10) + 1;
        const guess = prompt("Adivina el número (1-10):", "5");
        
        if (guess && !isNaN(guess)) {
            const guessNum = parseInt(guess);
            if (guessNum === secretNumber) {
                const prize = cost * 5;
                gameState.clickCount += prize;
                showNotification(`🔢 ¡ACERTASTE! Era ${secretNumber} +${prize} clics`);
            } else {
                showNotification(`🔢 ¡Fallaste! Era ${secretNumber}, era ${guessNum}`, 'error');
            }
        } else {
            gameState.clickCount += cost;
            showNotification(`🔢 Juego cancelado, clics devueltos`);
        }
        
        updateUI();
        saveGame();
    } else {
        showNotification(`❌ Necesitas ${cost} clics para jugar`, 'error');
    }
}

// ============================================
// MISIONES DIARIAS
// ============================================
function toggleMissions() {
    const grid = document.getElementById('missionsGrid');
    const toggle = document.getElementById('missionToggle');
    if (grid && toggle) {
        grid.classList.toggle('show');
        toggle.classList.toggle('rotated');
    }
}

function generateDailyMissions() {
    const missionsList = [
        { name: "Click Master", requirement: 100, reward: 500, current: 0, type: 'clicks' },
        { name: "Auto Clicker Fan", requirement: 5, reward: 1000, current: 0, type: 'autoClicks' },
        { name: "Big Spender", requirement: 500, reward: 750, current: 0, type: 'spend' },
        { name: "CPS Warrior", requirement: 10, reward: 1500, current: 0, type: 'cps' },
        { name: "Combo Breaker", requirement: 50, reward: 800, current: 0, type: 'clicks' },
        { name: "Lucky Player", requirement: 3, reward: 1200, current: 0, type: 'minigames' }
    ];
    
    // Tomar 3 misiones aleatorias
    dailyMissions = [];
    const shuffled = [...missionsList];
    for (let i = 0; i < 3 && shuffled.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * shuffled.length);
        dailyMissions.push({...shuffled[randomIndex], current: 0});
        shuffled.splice(randomIndex, 1);
    }
    
    renderMissions();
}

function renderMissions() {
    const grid = document.getElementById('missionsGrid');
    if (!grid) return;
    
    grid.innerHTML = dailyMissions.map(mission => `
        <div class="mission-card">
            <div class="mission-name">${mission.name}</div>
            <div class="mission-progress">${mission.current}/${mission.requirement}</div>
            <div class="mission-reward">💰 ${mission.reward}</div>
            <div class="progress-bar" style="margin-top: 5px;">
                <div class="progress-fill" style="width: ${(mission.current / mission.requirement) * 100}%; height: 4px;"></div>
            </div>
        </div>
    `).join('');
}

function updateMissionProgress(type, amount) {
    dailyMissions.forEach(mission => {
        if (mission.type === type && mission.current < mission.requirement) {
            mission.current = Math.min(mission.current + amount, mission.requirement);
            if (mission.current >= mission.requirement) {
                gameState.clickCount += mission.reward;
                showNotification(`📋 ¡Misión completada: ${mission.name}! +${mission.reward} clics`);
                saveGame();
            }
        }
    });
    renderMissions();
}

// ============================================
// EVENTOS ESPECIALES
// ============================================
function startEventTimer() {
    // Verificar si hay evento activo al cargar
    const savedEvent = localStorage.getItem('activeEvent');
    const savedEventTime = localStorage.getItem('eventEndTime');
    
    if (savedEvent && savedEventTime && Date.now() < parseInt(savedEventTime)) {
        activeEvent = savedEvent;
        eventEndTime = parseInt(savedEventTime);
        showEventBanner();
    } else {
        scheduleRandomEvent();
    }
}

function scheduleRandomEvent() {
    const eventDuration = 300000; // 5 minutos
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
    
    activeEvent = events[Math.floor(Math.random() * events.length)];
    eventEndTime = Date.now() + 300000; // 5 minutos
    
    localStorage.setItem('activeEvent', activeEvent);
    localStorage.setItem('eventEndTime', eventEndTime);
    
    showEventBanner();
    showNotification(eventNames[activeEvent]);
}

function checkEvent() {
    if (activeEvent && eventEndTime && Date.now() > eventEndTime) {
        activeEvent = null;
        eventEndTime = null;
        localStorage.removeItem('activeEvent');
        localStorage.removeItem('eventEndTime');
        hideEventBanner();
        showNotification('⏰ El evento especial ha terminado');
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
        eventText.textContent = eventNames[activeEvent] || '✨ ¡EVENTO ACTIVO! ✨';
        banner.style.display = 'block';
    }
}

function hideEventBanner() {
    const banner = document.getElementById('eventBanner');
    if (banner) {
        banner.style.display = 'none';
    }
}

function getEventDiscount() {
    return activeEvent === 'discount' ? 0.5 : 1;
}

// ============================================
// AUTO CLICKER Y CPS
// ============================================
function autoClick() {
    let clicksToAdd = gameState.autoClickers;
    
    if (activeEvent === 'rainClicks') {
        clicksToAdd += 5;
    }
    
    if (boostActive) {
        clicksToAdd *= 3;
    }
    
    if (clicksToAdd > 0) {
        clicksToAdd = Math.floor(clicksToAdd * prestigeData.bonus);
        gameState.clickCount += clicksToAdd;
        gameState.totalClicks += clicksToAdd;
        
        for (let i = 0; i < clicksToAdd; i++) {
            clickHistory.push(Date.now());
        }
        
        updateUI();
    }
}

function updateCPS() {
    const now = Date.now();
    clickHistory = clickHistory.filter(time => now - time < 1000);
    gameState.cps = clickHistory.length;
    
    if (boostActive) {
        elements.cps.innerHTML = `${gameState.cps * 3} <span style="color: gold;">(BOOST)</span>`;
    } else {
        elements.cps.textContent = gameState.cps;
    }
}

// ============================================
// TIENDA Y COMPRAS
// ============================================
function toggleShop() {
    const items = document.getElementById('shopItems');
    const toggle = document.getElementById('shopToggle');
    if (items && toggle) {
        items.classList.toggle('show');
        toggle.classList.toggle('rotated');
    }
}

function purchaseItem(itemType) {
    let price = shopPrices[itemType];
    const discount = getEventDiscount();
    price = Math.floor(price * discount);
    
    if (gameState.clickCount >= price) {
        gameState.clickCount -= price;
        gameState.totalPurchases++;
        
        switch(itemType) {
            case 'autoClicker':
                gameState.autoClickers++;
                itemCounts.autoClicker++;
                shopPrices.autoClicker = Math.floor(shopPrices.autoClicker * 1.5);
                showNotification('🤖 ¡Auto Clicker comprado!');
                updateMissionProgress('autoClicks', 1);
                break;
                
            case 'clickMultiplier':
                gameState.clickMultiplier *= 2;
                itemCounts.multiplier = gameState.clickMultiplier;
                shopPrices.clickMultiplier = Math.floor(shopPrices.clickMultiplier * 2);
                showNotification('⚡ ¡Multiplicador mejorado!');
                break;
                
            case 'timeBoost':
                activateTimeBoost();
                shopPrices.timeBoost = Math.floor(shopPrices.timeBoost * 1.3);
                showNotification('⏱️ ¡Time Boost activado!');
                break;
                
            case 'capsule':
                openCapsule('normal');
                shopPrices.capsule = Math.floor(shopPrices.capsule * 1.2);
                break;
                
            case 'superCapsule':
                openCapsule('super');
                shopPrices.superCapsule = Math.floor(shopPrices.superCapsule * 1.5);
                break;
        }
        
        updateMissionProgress('spend', price);
        updateUI();
        saveGame();
    } else {
        showNotification(`❌ Necesitas ${price} clics`, 'error');
    }
}

function activateTimeBoost() {
    boostActive = true;
    boostEndTime = Date.now() + 10000;
    
    elements.gameStatus.textContent = '⚡ TIME BOOST ⚡';
    
    setTimeout(() => {
        boostActive = false;
        elements.gameStatus.textContent = 'CLICK!';
        showNotification('⏰ Time Boost finalizado');
    }, 10000);
}

function openCapsule(type) {
    let reward;
    
    if (type === 'super') {
        reward = Math.floor(Math.random() * 500) + 500;
        elements.gameStatus.textContent = '🌟 ¡SUPER CÁPSULA! 🌟';
    } else {
        reward = Math.floor(Math.random() * 100) + 50;
        elements.gameStatus.textContent = '💊 ¡CÁPSULA ABIERTA! 💊';
    }
    
    gameState.clickCount += reward;
    showNotification(`✨ ¡Ganaste ${reward} clics! ✨`);
    
    setTimeout(() => {
        elements.gameStatus.textContent = 'CLICK!';
    }, 2000);
    
    createConfetti();
}

function createConfetti() {
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.borderRadius = '50%';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `fall ${Math.random() * 2 + 2}s linear`;
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// ============================================
// ACTUALIZAR UI
// ============================================
function updateUI() {
    elements.clickCount.textContent = formatNumber(Math.floor(gameState.clickCount));
    elements.totalClicks.textContent = formatNumber(gameState.totalClicks);
    elements.highScore.textContent = formatNumber(gameState.highScore);
    elements.autoClickerCount.textContent = gameState.autoClickers;
    elements.multiplierCount.textContent = gameState.clickMultiplier + 'x';
    elements.multiplierDisplay.textContent = 'x' + gameState.clickMultiplier;
    
    // Actualizar precios con descuento de evento
    const discount = getEventDiscount();
    document.getElementById('autoClickerPrice').textContent = Math.floor(shopPrices.autoClicker * discount);
    document.getElementById('clickMultiplierPrice').textContent = Math.floor(shopPrices.clickMultiplier * discount);
    document.getElementById('timeBoostPrice').textContent = Math.floor(shopPrices.timeBoost * discount);
    document.getElementById('capsulePrice').textContent = Math.floor(shopPrices.capsule * discount);
    document.getElementById('superCapsulePrice').textContent = Math.floor(shopPrices.superCapsule * discount);
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function updateProgressBar() {
    const nextMilestone = findNextMilestone();
    if (nextMilestone) {
        const progress = (gameState.totalClicks / nextMilestone) * 100;
        elements.progressBar.style.width = Math.min(progress, 100) + '%';
        elements.nextAchievementName.textContent = `${nextMilestone} clics - ${getAchievementName(nextMilestone)}`;
    }
}

function findNextMilestone() {
    const milestones = [1, 10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    return milestones.find(m => m > gameState.totalClicks);
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
        1000: '¡LEYENDA!'
    };
    return names[clicks] || 'Logro';
}

// ============================================
// TIEMPO Y UTILIDADES
// ============================================
function updateTime() {
    const now = new Date();
    elements.currentTime.textContent = now.toLocaleTimeString();
}

function updatePlayTime() {
    gameState.playTime++;
    const hours = Math.floor(gameState.playTime / 3600);
    const minutes = Math.floor((gameState.playTime % 3600) / 60);
    elements.playTime.textContent = `${hours}h ${minutes}m`;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    elements.notificationArea.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ============================================
// SISTEMA DE GUARDADO
// ============================================
function saveGame() {
    const saveData = {
        gameState,
        shopPrices,
        itemCounts,
        prestigeData,
        dailyMissions,
        version: '4.0',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('clickGameSave', JSON.stringify(saveData));
}

function loadGame() {
    const savedData = localStorage.getItem('clickGameSave');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            gameState = data.gameState;
            shopPrices = data.shopPrices;
            if (data.itemCounts) itemCounts = data.itemCounts;
            if (data.prestigeData) prestigeData = data.prestigeData;
            if (data.dailyMissions) dailyMissions = data.dailyMissions;
            
            updateUI();
            updatePrestigeUI();
            renderMissions();
            showNotification('📂 ¡Juego cargado!');
        } catch (error) {
            console.error('Error al cargar:', error);
        }
    }
}

function resetGame() {
    if (confirm('¿Seguro que quieres reiniciar? Todo tu progreso se perderá.')) {
        gameState = {
            clickCount: 0,
            totalClicks: 0,
            clickMultiplier: 1,
            autoClickers: 0,
            cps: 0,
            highScore: 0,
            totalPurchases: 0,
            playTime: 0
        };
        
        shopPrices = {
            autoClicker: 50,
            clickMultiplier: 100,
            timeBoost: 200,
            capsule: 500,
            superCapsule: 1000
        };
        
        itemCounts = { autoClicker: 0, multiplier: 1 };
        prestigeData = { level: 0, points: 0, bonus: 1 };
        
        updateUI();
        updatePrestigeUI();
        showNotification('🔄 Juego reiniciado');
        saveGame();
    }
}

// Añadir estilos de confeti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh);
        }
    }
`;
document.head.appendChild(style);
// ============================================
// CONFIGURACIÓN DE LOGROS
// ============================================
const ACHIEVEMENTS = {
    // Logros por clics (1-1000)
    CLICK_1: {
        id: 'CLICK_1',
        name: '¡Primer Paso!',
        description: 'Haz tu primer clic',
        icon: '👣',
        requirement: 1,
        reward: 10,
        rarity: 'common'
    },
    CLICK_10: {
        id: 'CLICK_10',
        name: 'Aprendiz de Clics',
        description: 'Alcanza 10 clics totales',
        icon: '👆',
        requirement: 10,
        reward: 20,
        rarity: 'common'
    },
    CLICK_50: {
        id: 'CLICK_50',
        name: 'Dedo Ágil',
        description: 'Alcanza 50 clics totales',
        icon: '🖱️',
        requirement: 50,
        reward: 30,
        rarity: 'common'
    },
    CLICK_100: {
        id: 'CLICK_100',
        name: 'Centenario',
        description: 'Alcanza 100 clics totales',
        icon: '💯',
        requirement: 100,
        reward: 50,
        rarity: 'uncommon'
    },
    CLICK_200: {
        id: 'CLICK_200',
        name: 'Doble Centuria',
        description: 'Alcanza 200 clics totales',
        icon: '2️⃣0️⃣0️⃣',
        requirement: 200,
        reward: 75,
        rarity: 'uncommon'
    },
    CLICK_300: {
        id: 'CLICK_300',
        name: 'Tricentenario',
        description: 'Alcanza 300 clics totales',
        icon: '3️⃣0️⃣0️⃣',
        requirement: 300,
        reward: 100,
        rarity: 'uncommon'
    },
    CLICK_400: {
        id: 'CLICK_400',
        name: 'Cuadrigentésimo',
        description: 'Alcanza 400 clics totales',
        icon: '4️⃣0️⃣0️⃣',
        requirement: 400,
        reward: 125,
        rarity: 'uncommon'
    },
    CLICK_500: {
        id: 'CLICK_500',
        name: 'Quinientos',
        description: 'Alcanza 500 clics totales',
        icon: '5️⃣0️⃣0️⃣',
        requirement: 500,
        reward: 150,
        rarity: 'rare'
    },
    CLICK_600: {
        id: 'CLICK_600',
        name: 'Sescentenario',
        description: 'Alcanza 600 clics totales',
        icon: '6️⃣0️⃣0️⃣',
        requirement: 600,
        reward: 175,
        rarity: 'rare'
    },
    CLICK_700: {
        id: 'CLICK_700',
        name: 'Septingentésimo',
        description: 'Alcanza 700 clics totales',
        icon: '7️⃣0️⃣0️⃣',
        requirement: 700,
        reward: 200,
        rarity: 'rare'
    },
    CLICK_800: {
        id: 'CLICK_800',
        name: 'Octingentésimo',
        description: 'Alcanza 800 clics totales',
        icon: '8️⃣0️⃣0️⃣',
        requirement: 800,
        reward: 225,
        rarity: 'rare'
    },
    CLICK_900: {
        id: 'CLICK_900',
        name: 'Noningentésimo',
        description: 'Alcanza 900 clics totales',
        icon: '9️⃣0️⃣0️⃣',
        requirement: 900,
        reward: 250,
        rarity: 'epic'
    },
    CLICK_1000: {
        id: 'CLICK_1000',
        name: '¡LEYENDA!',
        description: 'Alcanza 1000 clics totales',
        icon: '👑',
        requirement: 1000,
        reward: 500,
        rarity: 'legendary'
    },

    // Logros por CPS
    CPS_5: {
        id: 'CPS_5',
        name: 'Rápidos y Furiosos',
        description: 'Alcanza 5 CPS',
        icon: '⚡',
        requirement: 5,
        reward: 100,
        rarity: 'rare'
    },
    CPS_10: {
        id: 'CPS_10',
        name: 'Velocidad Relámpago',
        description: 'Alcanza 10 CPS',
        icon: '⚡⚡',
        requirement: 10,
        reward: 250,
        rarity: 'epic'
    },
    CPS_20: {
        id: 'CPS_20',
        name: 'Dios del Clic',
        description: 'Alcanza 20 CPS',
        icon: '⚡⚡⚡',
        requirement: 20,
        reward: 500,
        rarity: 'legendary'
    },

    // Logros por compras
    SHOP_1: {
        id: 'SHOP_1',
        name: 'Primera Compra',
        description: 'Compra tu primer item',
        icon: '🛒',
        requirement: 1,
        reward: 50,
        rarity: 'common'
    },
    SHOP_5: {
        id: 'SHOP_5',
        name: 'Adicto a las Compras',
        description: 'Compra 5 items',
        icon: '🛍️',
        requirement: 5,
        reward: 150,
        rarity: 'uncommon'
    },
    SHOP_10: {
        id: 'SHOP_10',
        name: 'Magnate',
        description: 'Compra 10 items',
        icon: '💼',
        requirement: 10,
        reward: 300,
        rarity: 'rare'
    },

    // Logros por Auto Clickers
    AUTO_1: {
        id: 'AUTO_1',
        name: 'Primer Auto Clicker',
        description: 'Compra tu primer Auto Clicker',
        icon: '🤖',
        requirement: 1,
        reward: 100,
        rarity: 'common'
    },
    AUTO_5: {
        id: 'AUTO_5',
        name: 'Ejército de Robots',
        description: 'Ten 5 Auto Clickers',
        icon: '🤖🤖',
        requirement: 5,
        reward: 250,
        rarity: 'rare'
    },
    AUTO_10: {
        id: 'AUTO_10',
        name: 'Revolución de las Máquinas',
        description: 'Ten 10 Auto Clickers',
        icon: '🤖🤖🤖',
        requirement: 10,
        reward: 500,
        rarity: 'epic'
    },

    // Logros por multiplicador
    MULTI_2: {
        id: 'MULTI_2',
        name: 'Doble Poder',
        description: 'Multiplicador x2',
        icon: '2️⃣',
        requirement: 2,
        reward: 100,
        rarity: 'common'
    },
    MULTI_4: {
        id: 'MULTI_4',
        name: 'Cuádruple',
        description: 'Multiplicador x4',
        icon: '4️⃣',
        requirement: 4,
        reward: 200,
        rarity: 'uncommon'
    },
    MULTI_8: {
        id: 'MULTI_8',
        name: 'Octuple Poder',
        description: 'Multiplicador x8',
        icon: '8️⃣',
        requirement: 8,
        reward: 400,
        rarity: 'rare'
    },
    MULTI_16: {
        id: 'MULTI_16',
        name: 'Poder Ilimitado',
        description: 'Multiplicador x16',
        icon: '🔟6️⃣',
        requirement: 16,
        reward: 800,
        rarity: 'legendary'
    },

    // Logros de tiempo
    TIME_1H: {
        id: 'TIME_1H',
        name: 'Maratoniano',
        description: 'Juega por 1 hora',
        icon: '⏰',
        requirement: 3600,
        reward: 300,
        rarity: 'epic'
    },
    TIME_24H: {
        id: 'TIME_24H',
        name: 'Adicto',
        description: 'Juega por 24 horas',
        icon: '💊',
        requirement: 86400,
        reward: 1000,
        rarity: 'legendary'
    },

    // Logros secretos
    SECRET_1: {
        id: 'SECRET_1',
        name: '¿Eres un Robot?',
        description: 'Alcanza 100 CPS',
        icon: '🤖',
        requirement: 100,
        reward: 1000,
        rarity: 'mythic',
        secret: true
    },
    SECRET_2: {
        id: 'SECRET_2',
        name: 'Dios del Dinero',
        description: 'Acumula 1,000,000 de clics',
        icon: '💰💰',
        requirement: 1000000,
        reward: 5000,
        rarity: 'mythic',
        secret: true
    }
};

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
    playTime: 0,
    unlockedAchievements: []
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

let clickHistory = [];
let boostActive = false;
let boostEndTime = null;

// Elementos del DOM
const elements = {
    clickCount: document.getElementById('clickCount'),
    cps: document.getElementById('cps'),
    gameStatus: document.getElementById('gameStatus'),
    clickButton: document.getElementById('clickButton'),
    currentTime: document.getElementById('currentTime'),
    progressBar: document.getElementById('progressBar'),
    nextAchievementName: document.getElementById('nextAchievementName'),
    achievementCounter: document.getElementById('achievementCounter'),
    achievementsGrid: document.getElementById('achievementsGrid'),
    autoClickerCount: document.getElementById('autoClickerCount'),
    multiplierCount: document.getElementById('multiplierCount'),
    multiplierDisplay: document.getElementById('multiplierDisplay'),
    totalClicks: document.getElementById('totalClicks'),
    highScore: document.getElementById('highScore'),
    playTime: document.getElementById('playTime'),
    notificationArea: document.getElementById('notificationArea'),
    autoClickerLevel: document.getElementById('autoClickerLevel'),
    multiplierLevel: document.getElementById('multiplierLevel'),
    autoClickerPrice: document.getElementById('autoClickerPrice'),
    clickMultiplierPrice: document.getElementById('clickMultiplierPrice'),
    timeBoostPrice: document.getElementById('timeBoostPrice'),
    capsulePrice: document.getElementById('capsulePrice'),
    superCapsulePrice: document.getElementById('superCapsulePrice')
};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    updateTime();
    renderAchievements();
    setupEventListeners();
    
    // Iniciar loops
    setInterval(updateTime, 1000);
    setInterval(autoClick, 1000);
    setInterval(updateCPS, 100);
    setInterval(updatePlayTime, 1000);
    setInterval(checkAchievements, 100);
    
    // Verificar logros iniciales
    setTimeout(() => {
        checkAchievements();
    }, 500);
});

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    elements.clickButton.addEventListener('click', handleClick);
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !e.repeat) {
            e.preventDefault();
            simulateClick();
        }
    });
    
    elements.clickButton.addEventListener('mouseenter', () => {
        elements.gameStatus.textContent = '¡CLIQUEA!';
    });
    
    elements.clickButton.addEventListener('mouseleave', () => {
        elements.gameStatus.textContent = 'CLICK!';
    });
}

// ============================================
// FUNCIONES PRINCIPALES
// ============================================
function handleClick(event) {
    const clicksGained = gameState.clickMultiplier;
    gameState.clickCount += clicksGained;
    gameState.totalClicks += clicksGained;
    
    clickHistory.push(Date.now());
    
    if (gameState.clickCount > gameState.highScore) {
        gameState.highScore = gameState.clickCount;
    }
    
    createClickEffect(event, clicksGained);
    animateButton();
    updateProgressBar();
    checkAchievements();
    updateUI();
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
    elements.clickButton.style.transform = 'scale(0.9)';
    setTimeout(() => {
        elements.clickButton.style.transform = 'scale(1)';
    }, 100);
    
    elements.gameStatus.textContent = '¡CLICK!';
    setTimeout(() => {
        elements.gameStatus.textContent = 'CLICK!';
    }, 200);
}

// ============================================
// SISTEMA DE LOGROS
// ============================================
function renderAchievements() {
    if (!elements.achievementsGrid) return;
    
    elements.achievementsGrid.innerHTML = '';
    
    Object.values(ACHIEVEMENTS).forEach(ach => {
        const isUnlocked = gameState.unlockedAchievements.includes(ach.id);
        const rarityColor = getRarityColor(ach.rarity);
        
        const item = document.createElement('div');
        item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        item.style.borderColor = rarityColor;
        
        if (ach.secret && !isUnlocked) {
            item.innerHTML = `
                <div class="achievement-icon" style="background: ${rarityColor}20">
                    ❓
                </div>
                <div class="achievement-details">
                    <div class="achievement-secret">???</div>
                    <div class="achievement-requirement">Secreto</div>
                </div>
            `;
        } else {
            item.innerHTML = `
                <div class="achievement-icon" style="background: ${rarityColor}20">
                    ${ach.icon}
                </div>
                <div class="achievement-details">
                    <div class="achievement-name">${ach.name}</div>
                    <div class="achievement-desc">${ach.description}</div>
                    ${isUnlocked ? 
                        `<div class="achievement-reward">+${ach.reward} clics</div>` : 
                        `<div class="achievement-requirement">Requisito: ${formatNumber(ach.requirement)}</div>`
                    }
                </div>
            `;
        }
        
        elements.achievementsGrid.appendChild(item);
    });
    
    updateAchievementCounter();
}

function getRarityColor(rarity) {
    const colors = {
        common: '#808080',
        uncommon: '#00ff00',
        rare: '#0000ff',
        epic: '#800080',
        legendary: '#ffd700',
        mythic: '#ff00ff'
    };
    return colors[rarity] || '#ffffff';
}

function checkAchievements() {
    let newUnlocks = [];
    
    Object.values(ACHIEVEMENTS).forEach(ach => {
        if (gameState.unlockedAchievements.includes(ach.id)) return;
        
        let unlocked = false;
        
        if (ach.id.startsWith('CLICK_')) {
            unlocked = gameState.totalClicks >= ach.requirement;
        } else if (ach.id.startsWith('CPS_')) {
            unlocked = gameState.cps >= ach.requirement;
        } else if (ach.id.startsWith('SHOP_')) {
            unlocked = gameState.totalPurchases >= ach.requirement;
        } else if (ach.id.startsWith('AUTO_')) {
            unlocked = gameState.autoClickers >= ach.requirement;
        } else if (ach.id.startsWith('MULTI_')) {
            unlocked = gameState.clickMultiplier >= ach.requirement;
        } else if (ach.id.startsWith('TIME_')) {
            unlocked = gameState.playTime >= ach.requirement;
        } else if (ach.id.startsWith('SECRET_')) {
            unlocked = checkSecretAchievement(ach.id);
        }
        
        if (unlocked) {
            gameState.unlockedAchievements.push(ach.id);
            gameState.clickCount += ach.reward;
            newUnlocks.push(ach);
        }
    });
    
    if (newUnlocks.length > 0) {
        renderAchievements();
        newUnlocks.forEach(ach => showAchievementPopup(ach));
        updateUI();
        saveGame();
    }
}

function checkSecretAchievement(id) {
    switch(id) {
        case 'SECRET_1':
            return gameState.cps >= 100;
        case 'SECRET_2':
            return gameState.totalClicks >= 1000000;
        default:
            return false;
    }
}

function showAchievementPopup(achievement) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.style.borderColor = getRarityColor(achievement.rarity);
    popup.innerHTML = `
        <div class="popup-icon" style="background: ${getRarityColor(achievement.rarity)}20">
            ${achievement.icon}
        </div>
        <div class="popup-info">
            <div class="popup-name">${achievement.name}</div>
            <div class="popup-desc">${achievement.description}</div>
            <div class="popup-reward">+${achievement.reward} clics</div>
        </div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 5000);
}

function updateAchievementCounter() {
    if (elements.achievementCounter) {
        elements.achievementCounter.textContent = 
            `${gameState.unlockedAchievements.length}/${Object.keys(ACHIEVEMENTS).length}`;
    }
}

function updateProgressBar() {
    const nextMilestone = findNextAchievementMilestone();
    if (nextMilestone) {
        const progress = (gameState.totalClicks / nextMilestone.requirement) * 100;
        elements.progressBar.style.width = Math.min(progress, 100) + '%';
        
        if (elements.nextAchievementName) {
            elements.nextAchievementName.textContent = 
                `${nextMilestone.name} (${formatNumber(nextMilestone.requirement)} clics)`;
        }
    }
}

function findNextAchievementMilestone() {
    const clickAchievements = Object.values(ACHIEVEMENTS)
        .filter(ach => ach.id.startsWith('CLICK_'))
        .sort((a, b) => a.requirement - b.requirement);
    
    return clickAchievements.find(ach => 
        !gameState.unlockedAchievements.includes(ach.id)
    );
}

// ============================================
// SISTEMA DE COMPRAS
// ============================================
function purchaseItem(itemType) {
    const price = shopPrices[itemType];
    
    if (gameState.clickCount >= price) {
        gameState.clickCount -= price;
        gameState.totalPurchases++;
        
        switch(itemType) {
            case 'autoClicker':
                gameState.autoClickers++;
                itemCounts.autoClicker++;
                shopPrices.autoClicker = Math.floor(shopPrices.autoClicker * 1.5);
                showNotification('🤖 ¡Auto Clicker comprado!');
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
        
        checkAchievements();
        updateUI();
        saveGame();
    } else {
        showNotification('❌ ¡No tienes suficientes clics!', 'error');
    }
}

function activateTimeBoost() {
    boostActive = true;
    boostEndTime = Date.now() + 10000;
    
    elements.gameStatus.textContent = '⚡ TIME BOOST ⚡';
    elements.gameStatus.style.color = '#ffd700';
    
    setTimeout(() => {
        boostActive = false;
        elements.gameStatus.textContent = 'CLICK!';
        elements.gameStatus.style.color = '';
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
        confetti.style.width = '10px';
        confetti.style.height = '10px';
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
// AUTO CLICKER Y CPS
// ============================================
function autoClick() {
    if (gameState.autoClickers > 0) {
        let clicksToAdd = gameState.autoClickers;
        
        if (boostActive) {
            clicksToAdd *= 3;
        }
        
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
        elements.cps.innerHTML = `${gameState.cps * 3} <span style="color: gold; font-size: 0.8rem;">(BOOST)</span>`;
    } else {
        elements.cps.textContent = gameState.cps;
    }
}

// ============================================
// TIEMPO DE JUEGO
// ============================================
function updatePlayTime() {
    gameState.playTime++;
    updatePlayTimeDisplay();
}

function updatePlayTimeDisplay() {
    const hours = Math.floor(gameState.playTime / 3600);
    const minutes = Math.floor((gameState.playTime % 3600) / 60);
    elements.playTime.textContent = `${hours}h ${minutes}m`;
}

function updateTime() {
    const now = new Date();
    elements.currentTime.textContent = now.toLocaleTimeString();
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
    
    // Actualizar niveles
    if (elements.autoClickerLevel) {
        elements.autoClickerLevel.textContent = `Nivel ${itemCounts.autoClicker}`;
    }
    if (elements.multiplierLevel) {
        elements.multiplierLevel.textContent = `x${gameState.clickMultiplier}`;
    }
    
    // Actualizar precios
    elements.autoClickerPrice.textContent = shopPrices.autoClicker;
    elements.clickMultiplierPrice.textContent = shopPrices.clickMultiplier;
    elements.timeBoostPrice.textContent = shopPrices.timeBoost;
    elements.capsulePrice.textContent = shopPrices.capsule;
    elements.superCapsulePrice.textContent = shopPrices.superCapsule;
    
    updateProgressBar();
    updateAchievementCounter();
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ============================================
// NOTIFICACIONES
// ============================================
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
        version: '3.0',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('clickGameSave', JSON.stringify(saveData));
    showNotification('💾 ¡Juego guardado!');
}

function loadGame() {
    const savedData = localStorage.getItem('clickGameSave');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            gameState = data.gameState;
            Object.assign(shopPrices, data.shopPrices);
            
            if (data.itemCounts) {
                itemCounts = data.itemCounts;
            }
            
            renderAchievements();
            updateUI();
            showNotification('📂 ¡Juego cargado!');
        } catch (error) {
            console.error('Error al cargar:', error);
            resetGame();
        }
    } else {
        showNotification('🆕 ¡Nueva partida!');
    }
}

function resetGame() {
    if (confirm('¿Seguro que quieres reiniciar el juego? Todo tu progreso se perderá.')) {
        gameState = {
            clickCount: 0,
            totalClicks: 0,
            clickMultiplier: 1,
            autoClickers: 0,
            cps: 0,
            highScore: 0,
            totalPurchases: 0,
            playTime: 0,
            unlockedAchievements: []
        };
        
        shopPrices = {
            autoClicker: 50,
            clickMultiplier: 100,
            timeBoost: 200,
            capsule: 500,
            superCapsule: 1000
        };
        
        itemCounts = {
            autoClicker: 0,
            multiplier: 1
        };
        
        clickHistory = [];
        boostActive = false;
        
        renderAchievements();
        updateUI();
        showNotification('🔄 Juego reiniciado');
        
        localStorage.removeItem('clickGameSave');
    }
}

// ============================================
// FUNCIONES DE INTERFAZ
// ============================================
function toggleAchievements() {
    const grid = document.getElementById('achievementsGrid');
    const toggleIcon = document.querySelector('.achievements-section .toggle-icon');
    
    if (grid && toggleIcon) {
        grid.classList.toggle('show');
        toggleIcon.classList.toggle('rotated');
    }
}

function toggleShop() {
    const items = document.getElementById('shopItems');
    const toggleIcon = document.querySelector('.shop-section .toggle-icon');
    
    if (items && toggleIcon) {
        items.classList.toggle('show');
        toggleIcon.classList.toggle('rotated');
    }
}

// Añadir estilos de animación para confeti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh);
        }
    }
`;
document.head.appendChild(style);
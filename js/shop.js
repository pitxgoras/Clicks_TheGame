// ============================================
// TIENDA Y COMPRAS
// ============================================

window.toggleShop = function() {
    const items = document.getElementById('shopItems');
    const toggle = document.getElementById('shopToggle');
    if (items && toggle) {
        items.classList.toggle('show');
        toggle.classList.toggle('rotated');
    }
};

window.purchaseItem = function(itemType) {
    let price = window.shopPrices[itemType];
    const discount = window.getEventDiscount ? window.getEventDiscount() : 1;
    price = Math.floor(price * discount);
    
    if (window.gameState.clickCount >= price) {
        window.gameState.clickCount -= price;
        window.gameState.totalPurchases++;
        
        switch(itemType) {
            case 'autoClicker':
                window.gameState.autoClickers++;
                window.itemCounts.autoClicker++;
                window.shopPrices.autoClicker = Math.floor(window.shopPrices.autoClicker * 1.5);
                window.showNotification('🤖 ¡Auto Clicker comprado!');
                if (window.updateMissionProgress) window.updateMissionProgress('autoClicks', 1);
                break;
                
            case 'clickMultiplier':
                window.gameState.clickMultiplier *= 2;
                window.itemCounts.multiplier = window.gameState.clickMultiplier;
                window.shopPrices.clickMultiplier = Math.floor(window.shopPrices.clickMultiplier * 2);
                window.showNotification('⚡ ¡Multiplicador mejorado!');
                break;
                
            case 'timeBoost':
                activateTimeBoost();
                window.shopPrices.timeBoost = Math.floor(window.shopPrices.timeBoost * 1.3);
                window.showNotification('⏱️ ¡Time Boost activado!');
                break;
                
            case 'capsule':
                openCapsule('normal');
                window.shopPrices.capsule = Math.floor(window.shopPrices.capsule * 1.2);
                break;
                
            case 'superCapsule':
                openCapsule('super');
                window.shopPrices.superCapsule = Math.floor(window.shopPrices.superCapsule * 1.5);
                break;
        }
        
        if (window.updateMissionProgress) window.updateMissionProgress('spend', price);
        window.updateUI();
        window.saveGame();
    } else {
        window.showNotification(`❌ Necesitas ${price} clics`, 'error');
    }
};

function activateTimeBoost() {
    window.boostActive = true;
    window.boostEndTime = Date.now() + 10000;
    
    const gameStatus = document.getElementById('gameStatus');
    if (gameStatus) gameStatus.textContent = '⚡ TIME BOOST ⚡';
    
    setTimeout(() => {
        window.boostActive = false;
        const gameStatusElem = document.getElementById('gameStatus');
        if (gameStatusElem) gameStatusElem.textContent = 'CLICK!';
        window.showNotification('⏰ Time Boost finalizado');
    }, 10000);
}

function openCapsule(type) {
    let reward;
    
    if (type === 'super') {
        reward = Math.floor(Math.random() * 500) + 500;
        const gameStatus = document.getElementById('gameStatus');
        if (gameStatus) gameStatus.textContent = '🌟 ¡SUPER CÁPSULA! 🌟';
    } else {
        reward = Math.floor(Math.random() * 100) + 50;
        const gameStatus = document.getElementById('gameStatus');
        if (gameStatus) gameStatus.textContent = '💊 ¡CÁPSULA ABIERTA! 💊';
    }
    
    window.gameState.clickCount += reward;
    window.showNotification(`✨ ¡Ganaste ${reward} clics! ✨`);
    
    setTimeout(() => {
        const gameStatus = document.getElementById('gameStatus');
        if (gameStatus) gameStatus.textContent = 'CLICK!';
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

window.updateShopPrices = function() {
    const discount = window.getEventDiscount ? window.getEventDiscount() : 1;
    
    const autoClickerPrice = document.getElementById('autoClickerPrice');
    const clickMultiplierPrice = document.getElementById('clickMultiplierPrice');
    const timeBoostPrice = document.getElementById('timeBoostPrice');
    const capsulePrice = document.getElementById('capsulePrice');
    const superCapsulePrice = document.getElementById('superCapsulePrice');
    const autoClickerLevel = document.getElementById('autoClickerLevel');
    const multiplierLevel = document.getElementById('multiplierLevel');
    
    if (autoClickerPrice) autoClickerPrice.textContent = Math.floor(window.shopPrices.autoClicker * discount);
    if (clickMultiplierPrice) clickMultiplierPrice.textContent = Math.floor(window.shopPrices.clickMultiplier * discount);
    if (timeBoostPrice) timeBoostPrice.textContent = Math.floor(window.shopPrices.timeBoost * discount);
    if (capsulePrice) capsulePrice.textContent = Math.floor(window.shopPrices.capsule * discount);
    if (superCapsulePrice) superCapsulePrice.textContent = Math.floor(window.shopPrices.superCapsule * discount);
    if (autoClickerLevel) autoClickerLevel.textContent = `Nivel ${window.itemCounts.autoClicker}`;
    if (multiplierLevel) multiplierLevel.textContent = `x${window.gameState.clickMultiplier}`;
};
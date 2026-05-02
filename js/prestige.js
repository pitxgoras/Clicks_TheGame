// ============================================
// SISTEMA DE PRESTIGIO
// ============================================

window.prestigeData = {
    level: 0,
    points: 0,
    bonus: 1
};

window.prestige = function() {
    const requiredClicks = 10000;
    
    if (window.gameState.totalClicks >= requiredClicks) {
        if (confirm(`¿PRESTIGIAR?\n\nPerderás:\n- ${Math.floor(window.gameState.clickCount)} clics actuales\n- ${window.gameState.autoClickers} Auto Clickers\n- Multiplicador x${window.gameState.clickMultiplier}\n\nGanarás:\n- +1 Nivel de Prestigio\n- +1 Punto de Leyenda\n- Bonus permanente x${(window.prestigeData.bonus + 0.1).toFixed(1)}\n\n¿Continuar?`)) {
            
            const pointsGained = 1;
            window.prestigeData.points += pointsGained;
            window.prestigeData.level++;
            window.prestigeData.bonus = 1 + (window.prestigeData.points * 0.1);
            
            window.gameState.clickCount = 0;
            window.gameState.clickMultiplier = 1;
            window.gameState.autoClickers = 0;
            window.itemCounts.autoClicker = 0;
            window.itemCounts.multiplier = 1;
            
            window.shopPrices = {
                autoClicker: 50,
                clickMultiplier: 100,
                timeBoost: 200,
                capsule: 500,
                superCapsule: 1000
            };
            
            window.updateUI();
            window.updatePrestigeUI();
            window.showNotification(`🌟 ¡PRESTIGIO! Nivel ${window.prestigeData.level} | Bonus x${window.prestigeData.bonus.toFixed(1)}`);
            window.saveGame();
        }
    } else {
        window.showNotification(`❌ Necesitas 10,000 clics totales para prestigiar (tienes ${window.gameState.totalClicks})`, 'error');
    }
};

window.updatePrestigeUI = function() {
    const prestigeLevel = document.getElementById('prestigeLevel');
    const prestigePoints = document.getElementById('prestigePoints');
    const prestigeBonus = document.getElementById('prestigeBonus');
    
    if (prestigeLevel) prestigeLevel.textContent = window.prestigeData.level;
    if (prestigePoints) prestigePoints.textContent = window.prestigeData.points;
    if (prestigeBonus) prestigeBonus.textContent = `x${window.prestigeData.bonus.toFixed(1)}`;
};
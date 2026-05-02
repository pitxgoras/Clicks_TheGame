// ============================================
// MINIJUEGOS - VERSIÓN COMPLETA
// ============================================

window.minigameCount = 0;
window.rouletteJackpotStreak = 0;
window.slotJackpotCount = 0;
window.guessWinStreak = 0;

// Alternar visibilidad del panel de minijuegos
window.toggleMinigames = function() {
    const grid = document.getElementById('minigamesGrid');
    const toggle = document.getElementById('minigameToggle');
    if (grid && toggle) {
        grid.classList.toggle('show');
        toggle.classList.toggle('rotated');
    }
};

// ========================================
// RULETA
// ========================================
window.playRoulette = function() {
    const cost = 100;
    if (window.gameState.clickCount >= cost) {
        window.gameState.clickCount -= cost;
        window.minigameCount = (window.minigameCount || 0) + 1;
        
        const number = Math.floor(Math.random() * 37);
        let prize = 0;
        let message = '';
        let isJackpot = false;
        
        // Números rojos y negros para la ruleta
        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        
        let color = '';
        if (number === 0) {
            color = 'verde';
        } else if (redNumbers.includes(number)) {
            color = 'rojo';
        } else {
            color = 'negro';
        }
        
        if (number === 0) {
            prize = cost * 35;
            message = `🎡 ¡RULETA! Cayó ${number} (${color}) - ¡JACKPOT! +${prize} clics`;
            isJackpot = true;
            window.rouletteJackpotStreak = (window.rouletteJackpotStreak || 0) + 1;
        } else if (number % 2 === 0) {
            prize = cost * 2;
            message = `🎡 ¡RULETA! Cayó ${number} (${color}, par) - Ganaste ${prize} clics`;
            window.rouletteJackpotStreak = 0;
        } else {
            prize = Math.floor(cost / 2);
            message = `🎡 ¡RULETA! Cayó ${number} (${color}, impar) - Perdiste, recuperas ${prize} clics`;
            window.rouletteJackpotStreak = 0;
        }
        
        window.gameState.clickCount += prize;
        window.showNotification(message);
        window.updateUI();
        
        // Actualizar misiones
        if (window.updateMissionProgress) {
            window.updateMissionProgress('minigames', 1);
        }
        
        // Verificar logros
        if (window.checkAchievements) {
            window.checkAchievements();
        }
        
        window.saveGame();
        
        // Efecto especial para jackpot
        if (isJackpot) {
            createBigConfetti();
            window.showNotification(`🎉 ¡JACKPOT EN LA RULETA! x35 de premio 🎉`);
        }
    } else {
        window.showNotification(`❌ Necesitas ${cost} clics para jugar a la ruleta`, 'error');
    }
};

// ========================================
// TRAGAMONEDAS
// ========================================
window.playSlotMachine = function() {
    const cost = 50;
    if (window.gameState.clickCount >= cost) {
        window.gameState.clickCount -= cost;
        window.minigameCount = (window.minigameCount || 0) + 1;
        
        const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '💎', '7️⃣'];
        const symbolNames = {
            '🍒': 'Cerezas',
            '🍋': 'Limones',
            '🍊': 'Naranjas',
            '🍉': 'Sandías',
            '⭐': 'Estrellas',
            '💎': 'Diamantes',
            '7️⃣': 'Sietes'
        };
        
        const reels = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        let prize = 0;
        let message = '';
        let isJackpot = false;
        
        if (reels[0] === reels[1] && reels[1] === reels[2]) {
            // Tres iguales - JACKPOT
            const multiplier = reels[0] === '7️⃣' ? 50 : (reels[0] === '💎' ? 25 : 10);
            prize = cost * multiplier;
            message = `🎰 ¡TRAGAMONEDAS! ${reels.join(' ')} (${symbolNames[reels[0]]} x3) - ¡JACKPOT! +${prize} clics`;
            isJackpot = true;
            window.slotJackpotCount = (window.slotJackpotCount || 0) + 1;
        } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
            // Dos iguales
            prize = cost * 2;
            message = `🎰 ¡TRAGAMONEDAS! ${reels.join(' ')} - Par ganador +${prize} clics`;
        } else {
            // Todos diferentes
            prize = 0;
            message = `🎰 ¡TRAGAMONEDAS! ${reels.join(' ')} - Perdiste`;
        }
        
        window.gameState.clickCount += prize;
        window.showNotification(message, prize === 0 ? 'error' : 'success');
        window.updateUI();
        
        // Actualizar misiones
        if (window.updateMissionProgress) {
            window.updateMissionProgress('minigames', 1);
        }
        
        // Verificar logros
        if (window.checkAchievements) {
            window.checkAchievements();
        }
        
        window.saveGame();
        
        if (isJackpot) {
            createBigConfetti();
            window.showNotification(`🎰 ¡JACKPOT EN TRAGAMONEDAS! x${prize/cost} de premio 🎰`);
        }
    } else {
        window.showNotification(`❌ Necesitas ${cost} clics para jugar a las tragamonedas`, 'error');
    }
};

// ========================================
// ADIVINA EL NÚMERO
// ========================================
window.playNumberGuess = function() {
    const cost = 25;
    if (window.gameState.clickCount >= cost) {
        window.gameState.clickCount -= cost;
        window.minigameCount = (window.minigameCount || 0) + 1;
        
        const secretNumber = Math.floor(Math.random() * 10) + 1;
        const guess = prompt("🔢 Adivina el número (1-10):\n\n¡Si aciertas, multiplicas x5 tus clics!", "5");
        
        if (guess && !isNaN(guess) && guess >= 1 && guess <= 10) {
            const guessNum = parseInt(guess);
            if (guessNum === secretNumber) {
                const prize = cost * 5;
                window.gameState.clickCount += prize;
                window.guessWinStreak = (window.guessWinStreak || 0) + 1;
                window.showNotification(`🔢 ¡ACERTASTE! Era ${secretNumber} - Ganaste ${prize} clics! 🎉`);
                
                // Racha de aciertos
                if (window.guessWinStreak >= 3) {
                    window.showNotification(`🔥 ¡RACHA DE ${window.guessWinStreak} ACIERTOS! 🔥`);
                }
            } else {
                const prize = Math.floor(cost / 2);
                window.gameState.clickCount += prize;
                window.guessWinStreak = 0;
                window.showNotification(`🔢 ¡Fallaste! Era ${secretNumber}, dijiste ${guessNum} - Recuperas ${prize} clics`, 'error');
            }
        } else {
            window.gameState.clickCount += cost;
            window.showNotification(`🔢 Juego cancelado, clics devueltos`);
            window.guessWinStreak = 0;
        }
        
        window.updateUI();
        
        // Actualizar misiones
        if (window.updateMissionProgress) {
            window.updateMissionProgress('minigames', 1);
        }
        
        // Verificar logros
        if (window.checkAchievements) {
            window.checkAchievements();
        }
        
        window.saveGame();
    } else {
        window.showNotification(`❌ Necesitas ${cost} clics para jugar a adivinar`, 'error');
    }
};

// ========================================
// EFECTO CONFETI PARA JACKPOTS
// ========================================
function createBigConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffd700'];
    
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        confetti.style.top = '-20px';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        confetti.style.pointerEvents = 'none';
        confetti.style.boxShadow = '0 0 5px currentColor';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// ========================================
// ESTADÍSTICAS DE MINIJUEGOS
// ========================================
window.getMinigameStats = function() {
    return {
        totalPlayed: window.minigameCount || 0,
        rouletteJackpots: window.rouletteJackpotStreak || 0,
        slotJackpots: window.slotJackpotCount || 0,
        guessStreak: window.guessWinStreak || 0
    };
};

console.log('🎰 Minijuegos cargados correctamente');
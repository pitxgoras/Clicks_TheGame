// achievements.js
const ACHIEVEMENTS = {
    // Logros por clics (1-1000)
    CLICK_1: {
        id: 'CLICK_1',
        name: '¡Primer Paso!',
        description: 'Haz tu primer clic',
        icon: '👣',
        requirement: 1,
        reward: 10,
        rarity: 'common',
        color: '#808080'
    },
    CLICK_10: {
        id: 'CLICK_10',
        name: 'Aprendiz de Clics',
        description: 'Alcanza 10 clics totales',
        icon: '👆',
        requirement: 10,
        reward: 20,
        rarity: 'common',
        color: '#808080'
    },
    CLICK_50: {
        id: 'CLICK_50',
        name: 'Dedo Ágil',
        description: 'Alcanza 50 clics totales',
        icon: '🖱️',
        requirement: 50,
        reward: 30,
        rarity: 'common',
        color: '#808080'
    },
    CLICK_100: {
        id: 'CLICK_100',
        name: 'Centenario',
        description: 'Alcanza 100 clics totales',
        icon: '💯',
        requirement: 100,
        reward: 50,
        rarity: 'uncommon',
        color: '#00ff00'
    },
    CLICK_200: {
        id: 'CLICK_200',
        name: 'Doble Centuria',
        description: 'Alcanza 200 clics totales',
        icon: '200',
        requirement: 200,
        reward: 75,
        rarity: 'uncommon',
        color: '#00ff00'
    },
    CLICK_300: {
        id: 'CLICK_300',
        name: 'Tricentenario',
        description: 'Alcanza 300 clics totales',
        icon: '300',
        requirement: 300,
        reward: 100,
        rarity: 'uncommon',
        color: '#00ff00'
    },
    CLICK_400: {
        id: 'CLICK_400',
        name: 'Cuadrigentésimo',
        description: 'Alcanza 400 clics totales',
        icon: '400',
        requirement: 400,
        reward: 125,
        rarity: 'uncommon',
        color: '#00ff00'
    },
    CLICK_500: {
        id: 'CLICK_500',
        name: 'Quinientos',
        description: 'Alcanza 500 clics totales',
        icon: '500',
        requirement: 500,
        reward: 150,
        rarity: 'rare',
        color: '#0000ff'
    },
    CLICK_600: {
        id: 'CLICK_600',
        name: 'Sescentenario',
        description: 'Alcanza 600 clics totales',
        icon: '600',
        requirement: 600,
        reward: 175,
        rarity: 'rare',
        color: '#0000ff'
    },
    CLICK_700: {
        id: 'CLICK_700',
        name: 'Septingentésimo',
        description: 'Alcanza 700 clics totales',
        icon: '700',
        requirement: 700,
        reward: 200,
        rarity: 'rare',
        color: '#0000ff'
    },
    CLICK_800: {
        id: 'CLICK_800',
        name: 'Octingentésimo',
        description: 'Alcanza 800 clics totales',
        icon: '800',
        requirement: 800,
        reward: 225,
        rarity: 'rare',
        color: '#0000ff'
    },
    CLICK_900: {
        id: 'CLICK_900',
        name: 'Noningentésimo',
        description: 'Alcanza 900 clics totales',
        icon: '900',
        requirement: 900,
        reward: 250,
        rarity: 'epic',
        color: '#800080'
    },
    CLICK_1000: {
        id: 'CLICK_1000',
        name: '¡LEYENDA!',
        description: 'Alcanza 1000 clics totales',
        icon: '👑',
        requirement: 1000,
        reward: 500,
        rarity: 'legendary',
        color: '#ffd700'
    },

    // Logros especiales por CPS
    CPS_5: {
        id: 'CPS_5',
        name: 'Rápidos y Furiosos',
        description: 'Alcanza 5 CPS',
        icon: '⚡',
        requirement: 5,
        reward: 100,
        rarity: 'rare',
        color: '#0000ff'
    },
    CPS_10: {
        id: 'CPS_10',
        name: 'Velocidad Relámpago',
        description: 'Alcanza 10 CPS',
        icon: '⚡⚡',
        requirement: 10,
        reward: 250,
        rarity: 'epic',
        color: '#800080'
    },
    CPS_20: {
        id: 'CPS_20',
        name: 'Dios del Clic',
        description: 'Alcanza 20 CPS',
        icon: '⚡⚡⚡',
        requirement: 20,
        reward: 500,
        rarity: 'legendary',
        color: '#ffd700'
    },

    // Logros por compras
    SHOP_1: {
        id: 'SHOP_1',
        name: 'Primera Compra',
        description: 'Compra tu primer item',
        icon: '🛒',
        requirement: 1,
        reward: 50,
        rarity: 'common',
        color: '#808080'
    },
    SHOP_5: {
        id: 'SHOP_5',
        name: 'Adicto a las Compras',
        description: 'Compra 5 items',
        icon: '🛍️',
        requirement: 5,
        reward: 150,
        rarity: 'uncommon',
        color: '#00ff00'
    },
    SHOP_10: {
        id: 'SHOP_10',
        name: 'Magnate',
        description: 'Compra 10 items',
        icon: '💼',
        requirement: 10,
        reward: 300,
        rarity: 'rare',
        color: '#0000ff'
    },

    // Logros por Auto Clickers
    AUTO_1: {
        id: 'AUTO_1',
        name: 'Primer Auto Clicker',
        description: 'Compra tu primer Auto Clicker',
        icon: '🤖',
        requirement: 1,
        reward: 100,
        rarity: 'common',
        color: '#808080'
    },
    AUTO_5: {
        id: 'AUTO_5',
        name: 'Ejército de Robots',
        description: 'Ten 5 Auto Clickers',
        icon: '🤖🤖',
        requirement: 5,
        reward: 250,
        rarity: 'rare',
        color: '#0000ff'
    },
    AUTO_10: {
        id: 'AUTO_10',
        name: 'Revolución de las Máquinas',
        description: 'Ten 10 Auto Clickers',
        icon: '🤖🤖🤖',
        requirement: 10,
        reward: 500,
        rarity: 'epic',
        color: '#800080'
    },

    // Logros por multiplicador
    MULTI_2: {
        id: 'MULTI_2',
        name: 'Doble Poder',
        description: 'Multiplicador x2',
        icon: '2️⃣',
        requirement: 2,
        reward: 100,
        rarity: 'common',
        color: '#808080'
    },
    MULTI_4: {
        id: 'MULTI_4',
        name: 'Cuádruple',
        description: 'Multiplicador x4',
        icon: '4️⃣',
        requirement: 4,
        reward: 200,
        rarity: 'uncommon',
        color: '#00ff00'
    },
    MULTI_8: {
        id: 'MULTI_8',
        name: 'Octuple Poder',
        description: 'Multiplicador x8',
        icon: '8️⃣',
        requirement: 8,
        reward: 400,
        rarity: 'rare',
        color: '#0000ff'
    },
    MULTI_16: {
        id: 'MULTI_16',
        name: 'Poder Ilimitado',
        description: 'Multiplicador x16',
        icon: '🔟',
        requirement: 16,
        reward: 800,
        rarity: 'legendary',
        color: '#ffd700'
    },

    // Logros especiales por tiempo
    TIME_1H: {
        id: 'TIME_1H',
        name: 'Maratoniano',
        description: 'Juega por 1 hora',
        icon: '⏰',
        requirement: 3600,
        reward: 300,
        rarity: 'epic',
        color: '#800080'
    },
    TIME_24H: {
        id: 'TIME_24H',
        name: 'Adicto',
        description: 'Juega por 24 horas totales',
        icon: '💊',
        requirement: 86400,
        reward: 1000,
        rarity: 'legendary',
        color: '#ffd700'
    },

    // Logros secretos
    SECRET_1: {
        id: 'SECRET_1',
        name: '¿Eres un Robot?',
        description: 'Alcanza 100 CPS (con auto clickers)',
        icon: '🤖',
        requirement: 100,
        reward: 1000,
        rarity: 'mythic',
        color: '#ff00ff',
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
        color: '#ff00ff',
        secret: true
    }
};

// Sistema de rarezas
const RARITY_COLORS = {
    common: '#808080',
    uncommon: '#00ff00',
    rare: '#0000ff',
    epic: '#800080',
    legendary: '#ffd700',
    mythic: '#ff00ff'
};

// Panel de logros
class AchievementSystem {
    constructor(game) {
        this.game = game;
        this.unlocked = new Set();
        this.loadAchievements();
        this.createAchievementPanel();
    }

    loadAchievements() {
        const saved = localStorage.getItem('achievements_unlocked');
        if (saved) {
            this.unlocked = new Set(JSON.parse(saved));
        }
    }

    saveAchievements() {
        localStorage.setItem('achievements_unlocked', 
            JSON.stringify([...this.unlocked]));
    }

    createAchievementPanel() {
        const panel = document.createElement('div');
        panel.className = 'achievement-panel';
        panel.innerHTML = `
            <div class="achievement-header" onclick="toggleAchievements()">
                <span>🏆 LOGROS</span>
                <span class="achievement-counter">
                    ${this.unlocked.size}/${Object.keys(ACHIEVEMENTS).length}
                </span>
            </div>
            <div class="achievement-grid" id="achievementGrid"></div>
        `;
        document.body.appendChild(panel);
    }

    checkAchievements(totalClicks, cps, purchases, autoClickers, multiplier, playTime) {
        let newUnlocks = [];

        for (let [id, ach] of Object.entries(ACHIEVEMENTS)) {
            if (this.unlocked.has(id)) continue;

            let requirement = ach.requirement;
            let unlocked = false;

            // Verificar según tipo de logro
            if (id.startsWith('CLICK_')) {
                unlocked = totalClicks >= requirement;
            } else if (id.startsWith('CPS_')) {
                unlocked = cps >= requirement;
            } else if (id.startsWith('SHOP_')) {
                unlocked = purchases >= requirement;
            } else if (id.startsWith('AUTO_')) {
                unlocked = autoClickers >= requirement;
            } else if (id.startsWith('MULTI_')) {
                unlocked = multiplier >= requirement;
            } else if (id.startsWith('TIME_')) {
                unlocked = playTime >= requirement;
            } else if (id.startsWith('SECRET_')) {
                unlocked = this.checkSecretAchievement(id, totalClicks, cps);
            }

            if (unlocked) {
                this.unlocked.add(id);
                newUnlocks.push(ach);
                this.game.clickCount += ach.reward;
            }
        }

        if (newUnlocks.length > 0) {
            this.saveAchievements();
            this.showAchievementPopup(newUnlocks);
            this.updateCounter();
        }

        return newUnlocks;
    }

    checkSecretAchievement(id, totalClicks, cps) {
        switch(id) {
            case 'SECRET_1':
                return cps >= 100;
            case 'SECRET_2':
                return totalClicks >= 1000000;
            default:
                return false;
        }
    }

    showAchievementPopup(achievements) {
        achievements.forEach(ach => {
            const popup = document.createElement('div');
            popup.className = 'achievement-popup';
            popup.style.borderColor = RARITY_COLORS[ach.rarity];
            popup.innerHTML = `
                <div class="achievement-icon" style="background: ${RARITY_COLORS[ach.rarity]}">
                    ${ach.icon}
                </div>
                <div class="achievement-info">
                    <div class="achievement-name">${ach.name}</div>
                    <div class="achievement-desc">${ach.description}</div>
                    <div class="achievement-reward">+${ach.reward} clics</div>
                </div>
            `;
            document.body.appendChild(popup);

            setTimeout(() => {
                popup.remove();
            }, 5000);
        });
    }

    updateCounter() {
        const counter = document.querySelector('.achievement-counter');
        if (counter) {
            counter.textContent = `${this.unlocked.size}/${Object.keys(ACHIEVEMENTS).length}`;
        }
    }
}

// Función para toggle del panel
function toggleAchievements() {
    const grid = document.getElementById('achievementGrid');
    grid.classList.toggle('show');
    
    if (grid.classList.contains('show')) {
        renderAchievementGrid();
    }
}

// Renderizar grid de logros
function renderAchievementGrid() {
    const grid = document.getElementById('achievementGrid');
    grid.innerHTML = '';

    Object.values(ACHIEVEMENTS).forEach(ach => {
        const isUnlocked = achievementSystem.unlocked.has(ach.id);
        const item = document.createElement('div');
        item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        item.style.borderColor = RARITY_COLORS[ach.rarity];
        
        if (ach.secret && !isUnlocked) {
            item.innerHTML = `
                <div class="achievement-secret">???</div>
                <div class="achievement-secret-text">Secreto</div>
            `;
        } else {
            item.innerHTML = `
                <div class="achievement-icon-small" style="background: ${RARITY_COLORS[ach.rarity]}">
                    ${ach.icon}
                </div>
                <div class="achievement-details">
                    <div class="achievement-title">${ach.name}</div>
                    <div class="achievement-description">${ach.description}</div>
                    ${isUnlocked ? 
                        `<div class="achievement-reward-small">+${ach.reward}</div>` : 
                        `<div class="achievement-requirement">Requisito: ${ach.requirement}</div>`
                    }
                </div>
            `;
        }
        
        grid.appendChild(item);
    });
}
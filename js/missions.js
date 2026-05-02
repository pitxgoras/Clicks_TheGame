// ============================================
// MISIONES DIARIAS - VERSIÓN COMPLETA Y MEJORADA
// ============================================

window.dailyMissions = [];
window.missionCompleteCount = 0;
window.lastMissionReset = null;
window.missionStreak = 0;

// Alternar visibilidad del panel de misiones
window.toggleMissions = function() {
    const grid = document.getElementById('missionsGrid');
    const toggle = document.getElementById('missionToggle');
    if (grid && toggle) {
        grid.classList.toggle('show');
        toggle.classList.toggle('rotated');
    }
};

// ========================================
// GENERAR MISIONES DIARIAS
// ========================================
window.generateDailyMissions = function() {
    const missionsList = [
        { 
            name: "🏆 Click Master", 
            description: "Haz clics para dominar el juego",
            requirement: 100, 
            reward: 500, 
            current: 0, 
            type: 'clicks', 
            icon: '🖱️',
            color: '#ff6b6b',
            difficulty: 'normal'
        },
        { 
            name: "🤖 Auto Clicker Fan", 
            description: "Compra Auto Clickers para automatizar",
            requirement: 5, 
            reward: 1000, 
            current: 0, 
            type: 'autoClicks', 
            icon: '🤖',
            color: '#4ecdc4',
            difficulty: 'normal'
        },
        { 
            name: "💰 Big Spender", 
            description: "Gasta clics en la tienda",
            requirement: 500, 
            reward: 750, 
            current: 0, 
            type: 'spend', 
            icon: '💸',
            color: '#ffe66d',
            difficulty: 'normal'
        },
        { 
            name: "⚡ CPS Warrior", 
            description: "Alcanza un alto CPS",
            requirement: 10, 
            reward: 1500, 
            current: 0, 
            type: 'cps', 
            icon: '⚡',
            color: '#00fff9',
            difficulty: 'hard'
        },
        { 
            name: "🎲 Lucky Player", 
            description: "Juega minijuegos y prueba tu suerte",
            requirement: 3, 
            reward: 1200, 
            current: 0, 
            type: 'minigames', 
            icon: '🎲',
            color: '#ffd700',
            difficulty: 'normal'
        },
        { 
            name: "💎 Click Precision", 
            description: "Acumula clics con precisión",
            requirement: 250, 
            reward: 800, 
            current: 0, 
            type: 'clicks', 
            icon: '🎯',
            color: '#ff6b6b',
            difficulty: 'easy'
        },
        { 
            name: "🌟 Prestige Legend", 
            description: "Realiza prestigios para ganar poder",
            requirement: 1, 
            reward: 2000, 
            current: 0, 
            type: 'prestige', 
            icon: '🌟',
            color: '#800080',
            difficulty: 'hard'
        },
        { 
            name: "📦 Capsule Hunter", 
            description: "Abre cápsulas misteriosas",
            requirement: 5, 
            reward: 800, 
            current: 0, 
            type: 'capsules', 
            icon: '💊',
            color: '#ff69b4',
            difficulty: 'normal'
        },
        { 
            name: "🕒 Time Player", 
            description: "Mantente jugando para ganar recompensas",
            requirement: 3600, 
            reward: 1000, 
            current: 0, 
            type: 'time', 
            icon: '⏰',
            color: '#4ecdc4',
            difficulty: 'hard'
        },
        { 
            name: "🔥 Combo Breaker", 
            description: "Mantén una racha de clics",
            requirement: 50, 
            reward: 600, 
            current: 0, 
            type: 'combo', 
            icon: '🔥',
            color: '#ff8c00',
            difficulty: 'easy'
        },
        { 
            name: "💎 Diamond Collector", 
            description: "Ahorra muchos clics sin gastar",
            requirement: 10000, 
            reward: 3000, 
            current: 0, 
            type: 'save', 
            icon: '💎',
            color: '#00bfff',
            difficulty: 'hard'
        },
        { 
            name: "🎯 Perfect Aim", 
            description: "Completa misiones sin fallar",
            requirement: 5, 
            reward: 2500, 
            current: 0, 
            type: 'streak', 
            icon: '🎯',
            color: '#32cd32',
            difficulty: 'hard'
        }
    ];
    
    // Verificar si es nuevo día (reset diario)
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('lastMissionReset');
    
    if (lastReset !== today) {
        localStorage.setItem('lastMissionReset', today);
        window.missionCompleteCount = 0;
        
        // Mantener racha si completó todas ayer
        const yesterdayAllCompleted = localStorage.getItem('yesterdayAllCompleted') === 'true';
        if (yesterdayAllCompleted) {
            window.missionStreak = (window.missionStreak || 0) + 1;
        } else {
            window.missionStreak = 0;
        }
        localStorage.setItem('missionStreak', window.missionStreak);
    } else {
        window.missionStreak = parseInt(localStorage.getItem('missionStreak') || '0');
    }
    
    // Seleccionar 3 misiones aleatorias con balance de dificultad
    const easyMissions = missionsList.filter(m => m.difficulty === 'easy');
    const normalMissions = missionsList.filter(m => m.difficulty === 'normal');
    const hardMissions = missionsList.filter(m => m.difficulty === 'hard');
    
    const selectedMissions = [];
    
    // Siempre incluir al menos una fácil y una normal
    if (easyMissions.length > 0) {
        const randomEasy = easyMissions[Math.floor(Math.random() * easyMissions.length)];
        selectedMissions.push({...randomEasy, current: 0, completed: false});
    }
    
    if (normalMissions.length > 0) {
        const remainingNormals = normalMissions.filter(m => !selectedMissions.some(s => s.name === m.name));
        if (remainingNormals.length > 0) {
            const randomNormal = remainingNormals[Math.floor(Math.random() * remainingNormals.length)];
            selectedMissions.push({...randomNormal, current: 0, completed: false});
        }
    }
    
    // La tercera puede ser de cualquier dificultad
    const allRemaining = missionsList.filter(m => !selectedMissions.some(s => s.name === m.name));
    if (allRemaining.length > 0) {
        const randomThird = allRemaining[Math.floor(Math.random() * allRemaining.length)];
        selectedMissions.push({...randomThird, current: 0, completed: false});
    }
    
    window.dailyMissions = selectedMissions;
    window.renderMissions();
    window.saveMissionsToStorage();
};

// ========================================
// GUARDAR MISIONES EN LOCALSTORAGE
// ========================================
window.saveMissionsToStorage = function() {
    const missionsData = {
        dailyMissions: window.dailyMissions,
        missionCompleteCount: window.missionCompleteCount,
        missionStreak: window.missionStreak,
        lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('missionsData', JSON.stringify(missionsData));
};

// ========================================
// CARGAR MISIONES GUARDADAS
// ========================================
window.loadMissionsFromStorage = function() {
    const saved = localStorage.getItem('missionsData');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            const today = new Date().toDateString();
            const savedDate = new Date(data.lastUpdated).toDateString();
            
            if (savedDate === today) {
                window.dailyMissions = data.dailyMissions;
                window.missionCompleteCount = data.missionCompleteCount || 0;
                window.missionStreak = data.missionStreak || 0;
            } else {
                window.generateDailyMissions();
            }
        } catch (e) {
            console.error('Error loading missions:', e);
            window.generateDailyMissions();
        }
    } else {
        window.generateDailyMissions();
    }
    window.renderMissions();
};

// ========================================
// RENDERIZAR MISIONES EN EL PANEL
// ========================================
window.renderMissions = function() {
    const grid = document.getElementById('missionsGrid');
    if (!grid) return;
    
    if (!window.dailyMissions || window.dailyMissions.length === 0) {
        grid.innerHTML = '<div class="mission-card">🔄 Cargando misiones...</div>';
        window.generateDailyMissions();
        return;
    }
    
    // Mostrar racha actual
    const streakHtml = window.missionStreak > 0 ? `
        <div class="mission-streak-banner">
            🔥 ¡Racha de ${window.missionStreak} días completando todas las misiones! 🔥
        </div>
    ` : '';
    
    const completedCount = window.dailyMissions.filter(m => m.completed).length;
    const totalRewards = window.dailyMissions.reduce((sum, m) => sum + (m.completed ? m.reward : 0), 0);
    
    grid.innerHTML = `
        <div class="missions-header-info">
            <div class="missions-stats">
                <span>📊 Progreso: ${completedCount}/${window.dailyMissions.length}</span>
                <span>💰 Recompensas: ${totalRewards.toLocaleString()}</span>
            </div>
            ${streakHtml}
        </div>
        ${window.dailyMissions.map(mission => {
            const progressPercent = ((mission.current || 0) / mission.requirement) * 100;
            const isComplete = mission.current >= mission.requirement;
            const remaining = Math.max(0, mission.requirement - (mission.current || 0));
            const difficultyIcon = mission.difficulty === 'easy' ? '🟢' : (mission.difficulty === 'hard' ? '🔴' : '🟡');
            
            return `
                <div class="mission-card ${isComplete ? 'completed' : ''}" style="border-left: 4px solid ${mission.color || '#4ecdc4'}">
                    <div class="mission-header">
                        <div class="mission-name">
                            ${mission.icon || '📋'} ${mission.name}
                        </div>
                        <div class="mission-difficulty" title="Dificultad">
                            ${difficultyIcon}
                        </div>
                    </div>
                    <div class="mission-description">
                        ${mission.description}
                    </div>
                    <div class="mission-progress">
                        ${(mission.current || 0).toLocaleString()} / ${mission.requirement.toLocaleString()}
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(progressPercent, 100)}%; background: linear-gradient(90deg, ${mission.color}, ${mission.color}cc);"></div>
                        </div>
                        <div class="progress-text">${Math.floor(progressPercent)}%</div>
                    </div>
                    <div class="mission-footer">
                        <div class="mission-reward">
                            🎁 ${mission.reward.toLocaleString()} clics
                        </div>
                        ${!isComplete ? 
                            `<div class="mission-remaining">📊 Faltan: ${remaining.toLocaleString()}</div>` : 
                            `<div class="mission-completed">✓ COMPLETADA ✓</div>`
                        }
                    </div>
                </div>
            `;
        }).join('')}
    `;
};

// ========================================
// ACTUALIZAR PROGRESO DE MISIONES
// ========================================
window.updateMissionProgress = function(type, amount) {
    if (!window.dailyMissions || window.dailyMissions.length === 0) {
        window.loadMissionsFromStorage();
        return;
    }
    
    let anyCompleted = false;
    let newlyCompleted = [];
    
    window.dailyMissions.forEach(mission => {
        if (mission.type === type && !mission.completed && (mission.current || 0) < mission.requirement) {
            const newValue = Math.min((mission.current || 0) + amount, mission.requirement);
            mission.current = newValue;
            
            if (newValue >= mission.requirement && !mission.completed) {
                mission.completed = true;
                mission.completedAt = new Date().toISOString();
                window.missionCompleteCount = (window.missionCompleteCount || 0) + 1;
                newlyCompleted.push(mission);
                
                // Dar recompensa
                window.gameState.clickCount += mission.reward;
                anyCompleted = true;
            }
        }
    });
    
    // Mostrar notificaciones de misiones completadas
    if (newlyCompleted.length > 0) {
        newlyCompleted.forEach(mission => {
            if (window.showNotification) {
                window.showNotification(`📋 ¡${mission.name} completada! +${mission.reward.toLocaleString()} clics 🎉`);
            }
        });
        
        // Verificar si completó todas las misiones del día
        const allCompleted = window.dailyMissions.every(m => m.completed);
        if (allCompleted) {
            const bonusReward = 500 + (window.missionStreak * 100);
            window.gameState.clickCount += bonusReward;
            localStorage.setItem('yesterdayAllCompleted', 'true');
            
            if (window.showNotification) {
                window.showNotification(`🏆 ¡MISIONES COMPLETAS! +${bonusReward.toLocaleString()} clics extra 🏆`);
            }
            
            // Verificar logro de completista
            if (window.checkAchievements) {
                window.checkAchievements();
            }
        } else {
            localStorage.setItem('yesterdayAllCompleted', 'false');
        }
    }
    
    if (anyCompleted) {
        window.updateUI();
        window.saveGame();
        window.saveMissionsToStorage();
        window.renderMissions();
        
        // Verificar logros
        if (window.checkAchievements) {
            window.checkAchievements();
        }
    }
    
    window.renderMissions();
};

// ========================================
// RESET DIARIO DE MISIONES
// ========================================
function checkDailyReset() {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('lastMissionReset');
    
    if (lastReset !== today) {
        window.generateDailyMissions();
        window.renderMissions();
        if (window.showNotification) {
            window.showNotification('📋 ¡Nuevas misiones diarias disponibles! 🌟');
        }
    }
}

// ========================================
// OBTENER ESTADÍSTICAS DE MISIONES
// ========================================
window.getMissionStats = function() {
    const completedMissions = window.dailyMissions?.filter(m => m.completed).length || 0;
    return {
        totalMissions: window.dailyMissions?.length || 0,
        completedMissions: completedMissions,
        totalRewards: window.dailyMissions?.reduce((sum, m) => sum + (m.completed ? m.reward : 0), 0) || 0,
        streak: window.missionStreak || 0,
        completionRate: window.dailyMissions?.length ? Math.floor((completedMissions / window.dailyMissions.length) * 100) : 0
    };
};

// ========================================
// INICIALIZACIÓN
// ========================================
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            window.loadMissionsFromStorage();
        }, 100);
        
        // Verificar reset diario cada hora
        setInterval(checkDailyReset, 3600000);
    });
}

console.log('📋 Sistema de misiones diarias v2.0 cargado correctamente');
(() => {
  const canvas = document.querySelector('[data-arena]');
  if (!canvas) return;

  const context = canvas.getContext('2d');
  const scoreboard = document.querySelector('[data-scoreboard]');
  const pauseButton = document.querySelector('[data-action="pause"]');
  const resetButton = document.querySelector('[data-action="reset"]');
  const statusLabel = document.querySelector('[data-round-status]');
  const timerLabel = document.querySelector('[data-round-timer]');
  const roundLabel = document.querySelector('[data-round-label]');
  const message = document.querySelector('[data-arena-message]');
  const bettingOptions = document.querySelector('[data-betting-options]');
  const bettingRecordLabel = document.querySelector('[data-betting-record]');
  const slotButtons = [...document.querySelectorAll('[data-player-slot]')];
  const slotWraps = slotButtons.map((button) => button.closest('.player-slot-wrap'));
  const picker = document.querySelector('.fighter-picker');
  const teamControls = document.querySelector('.team-controls');
  const teamToggle = document.querySelector('[data-team-toggle]');
  const teamHint = document.querySelector('[data-team-hint]');
  const teamSelects = [...document.querySelectorAll('[data-team-select]')];
  const modifierSelects = slotButtons.map((button, index) => {
    const select = document.createElement('select');
    select.className = 'modifier-select';
    select.dataset.modifierSelect = '';
    select.setAttribute('aria-label', `Player ${index + 1} modifier`);
    select.innerHTML = '<option value="normal">Normal</option><option value="giant">Giant</option><option value="deadly">Deadly</option><option value="fast">Fast</option><option value="slow">Slow</option><option value="pacifist">Pacifist</option>';
    button.closest('.player-slot-wrap').append(select);
    return select;
  });
  const particleToggle = document.querySelector('[data-particle-toggle]');
  const particleStatus = document.querySelector('[data-particle-status]');
  const choiceButtons = [...document.querySelectorAll('[data-fighter-choice]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fighterTypes = {
    bulk: { name: 'Bulk', colour: '#98d936', radius: 36, speed: 238 },
    tide: { name: 'Tide', colour: '#3199d3', radius: 25, speed: 250 },
    fuse: { name: 'Fuse', colour: '#f85e00', radius: 28, speed: 240 },
    tron: { name: 'Tron', colour: '#d6a72c', radius: 27, speed: 245 },
    orbiter: { name: 'Orbiter', colour: '#49686a', satellite: '#88ccf1', radius: 29, speed: 242 },
    hydra: { name: 'Hydra', colour: '#c1dff0', radius: 30, speed: 240 },
    tank: { name: 'Tank', colour: '#596b3f', bullet: '#dce9a7', radius: 34, speed: 215, health: 200 },
    rail: { name: 'Rail', colour: '#9a5de1', laser: '#ef8cff', radius: 27, speed: 175 },
    sweep: { name: 'Sweep', colour: '#d34fb4', laser: '#ff9ee9', radius: 28, speed: 240 },
    pulsar: { name: 'Pulsar', colour: '#28b8a5', pulse: '#8cf4df', radius: 30, speed: 235 },
    ghost: { name: 'Ghost', colour: '#d9e5ed', radius: 27, speed: 520 },
    vendetta: { name: 'Vendetta', colour: '#b9324b', radius: 29, speed: 220 },
    mine: { name: 'Mine', colour: '#263c4a', mine: '#f3c64d', radius: 26, speed: 320 },
    punchbag: { name: 'Punchbag', colour: '#8b9698', radius: 42, speed: 225, health: 1000000 },
  };
  const pulsarConfig = { damage: 2, rangeRatio: 0.4, cooldownFull: 6, cooldownCritical: 2, expansionDuration: 0.55 };
  const hydraSplitTimes = [10, 8, 6.5, 5.5, 4.5, 3.5, 3];
  const minimumFighterSpeed = 180;
  const speedRecoveryPerSecond = 90;
  const mineConfig = { cooldown: 4, throwSpeed: 420, minDistance: 100, maxDistanceRatio: 0.55, radius: 12, maxCount: 20 };
  const orbiterConfig = {
    layers: [
      { capacity: 16, radius: 52 },
      { capacity: 32, radius: 84 },
      { capacity: 64, radius: 116 },
    ],
    baseSpinSpeed: 2.4,
    spinGain: 0.18,
  };
  const orbiterMaxSatellites = orbiterConfig.layers.reduce((total, layer) => total + layer.capacity, 0);
  const teams = {
    red: { name: 'Red', colour: '#e34b4b' },
    blue: { name: 'Blue', colour: '#3199d3' },
    yellow: { name: 'Yellow', colour: '#d6a72c' },
    green: { name: 'Green', colour: '#4caf65' },
  };
  const modifiers = {
    normal: { name: 'Normal', health: 1, size: 1, speed: 1, damage: 1, ability: 1 },
    giant: { name: 'Giant', health: 5, size: 2, speed: 1, damage: 1, ability: 1 },
    deadly: { name: 'Deadly', health: 1, size: 1, speed: 1, damage: 2, ability: 2 },
    fast: { name: 'Fast', health: 1, size: 1, speed: 3, damage: 1, ability: 1 },
    slow: { name: 'Slow', health: 1, size: 1, speed: 1 / 3, damage: 1, ability: 1 },
    pacifist: { name: 'Pacifist', health: 1, size: 1, speed: 1, damage: 0, ability: 1 },
  };
  const playerAccents = ['#f7fbfd', '#edd9a3', '#f85e00', '#c1dff0', '#98d936', '#6f9fb8', '#ffb36b', '#7ac7a4'];
  const starts = [
    { x: 0.15, y: 0.18, angle: 0.68 },
    { x: 0.85, y: 0.82, angle: 3.86 },
    { x: 0.5, y: 0.12, angle: 2.05 },
    { x: 0.5, y: 0.88, angle: 5.18 },
    { x: 0.12, y: 0.5, angle: 0.18 },
    { x: 0.88, y: 0.5, angle: 3.32 },
    { x: 0.25, y: 0.7, angle: 5.58 },
    { x: 0.75, y: 0.3, angle: 2.7 },
  ];
  const progressionKey = 'wallchargeProgressV1';
  const starterFighters = ['bulk', 'tide', 'fuse', 'tron'];

  let selections = ['bulk', 'tide', null, null, null, null, null, null];
  let playerTeams = ['red', 'blue', 'yellow', 'green', 'red', 'blue', 'yellow', 'green'];
  let playerModifiers = Array(8).fill('normal');
  let teamMode = false;
  let selectedPlayer = 0;
  let size = 0;
  let scale = 1;
  let fighters = [];
  let projectiles = [];
  let mines = [];
  let pulses = [];
  let sparks = [];
  let running = false;
  let roundStarted = false;
  let roundOver = false;
  let selectedBet = null;
  let betResolved = false;
  let currentBetResult = null;
  let bettingRecord = loadBettingRecord();
  let progression = loadProgression();
  let cheatBuffer = '';
  let previousTime = performance.now();
  let elapsedTime = 0;
  let collisionLocks = new Set();
  let railCollisionLocks = new Set();
  let trailExposure = new Map();
  let ghostExposure = new Map();
  let laserExposure = new Map();
  let orbitContacts = new Set();
  let entitySerial = 0;
  let particlesEnabled = true;

  function loadProgression() {
    try {
      const saved = JSON.parse(localStorage.getItem(progressionKey) || '{}');
      const unlockedFighters = Array.isArray(saved.unlockedFighters)
        ? saved.unlockedFighters.filter((typeId) => fighterTypes[typeId])
        : [];
      return {
        completedFights: Math.max(0, Math.floor(Number(saved.completedFights) || 0)),
        unlockedFighters: [...new Set([...starterFighters, ...unlockedFighters])],
        teamMode: Boolean(saved.teamMode),
        modifiers: Boolean(saved.allAccess),
        allAccess: Boolean(saved.allAccess),
      };
    } catch (error) {
      return { completedFights: 0, unlockedFighters: [...starterFighters], teamMode: false, modifiers: false, allAccess: false };
    }
  }

  function saveProgression() {
    try {
      localStorage.setItem(progressionKey, JSON.stringify(progression));
    } catch (error) {
      // Progress remains available for this session if storage is blocked.
    }
  }

  function unlockFighter(typeId, unlocked) {
    if (progression.unlockedFighters.includes(typeId)) return;
    progression.unlockedFighters.push(typeId);
    unlocked.push(fighterTypes[typeId].name);
  }

  function allowedPlayerCount() {
    if (progression.allAccess || progression.completedFights >= 10) return 8;
    if (progression.completedFights >= 5) return 6;
    if (progression.completedFights >= 1) return 4;
    return 2;
  }

  function renderUnlockState() {
    const playerLimit = allowedPlayerCount();
    teamControls.hidden = !progression.teamMode;
    if (!progression.teamMode && teamMode) teamMode = false;
    modifierSelects.forEach((select) => {
      select.hidden = !progression.modifiers;
    });
    slotWraps.forEach((wrap, index) => {
      wrap.hidden = index >= playerLimit;
    });
    if (selectedPlayer >= playerLimit) selectedPlayer = playerLimit - 1;
    choiceButtons.forEach((button) => {
      const unlocked = progression.unlockedFighters.includes(button.dataset.fighterChoice);
      button.disabled = !unlocked;
      button.classList.toggle('is-gated', !unlocked);
      button.setAttribute('aria-label', unlocked ? fighterTypes[button.dataset.fighterChoice].name : 'Locked fighter');
    });
    renderSlots();
  }

  function recordCompletedFight(survivingSides) {
    progression.completedFights += 1;
    const unlocked = [];
    const activeSelections = selections.filter(Boolean);
    const participantCounts = activeSelections.reduce((counts, typeId) => {
      counts[typeId] = (counts[typeId] || 0) + 1;
      return counts;
    }, {});

    if (progression.completedFights >= 1) {
      unlockFighter('orbiter', unlocked);
    }
    if (progression.completedFights === 1) unlocked.push('4-player fights');
    if (activeSelections.length >= 4) unlockFighter('hydra', unlocked);
    if (Object.values(participantCounts).some((count) => count >= 2) && !progression.teamMode) {
      progression.teamMode = true;
      unlocked.push('Team mode');
    }
    if (progression.completedFights >= 5) unlockFighter('tank', unlocked);
    if (progression.completedFights === 5) unlocked.push('6-player fights');
    if (currentBetResult === 'won') {
      unlockFighter('rail', unlocked);
      unlockFighter('sweep', unlocked);
    }
    if (progression.completedFights >= 10) unlockFighter('pulsar', unlocked);
    if (progression.completedFights === 10) unlocked.push('8-player fights');
    if (!survivingSides.length) unlockFighter('vendetta', unlocked);
    if (currentBetResult === 'won' && selectedBet !== null && selections[selectedBet] === 'fuse') unlockFighter('mine', unlocked);
    if (elapsedTime >= 180) unlockFighter('punchbag', unlocked);

    saveProgression();
    renderUnlockState();
    return unlocked;
  }

  function unlockFromCheat(code) {
    const unlocked = [];
    if (code === 'IDCLIP') unlockFighter('ghost', unlocked);
    if (code === 'IDKFA') {
      Object.keys(fighterTypes).forEach((typeId) => unlockFighter(typeId, unlocked));
      if (!progression.teamMode) unlocked.push('Team mode');
      if (!progression.allAccess) {
        unlocked.push('Modifiers');
        unlocked.push('8-player fights');
      }
      progression.teamMode = true;
      progression.modifiers = true;
      progression.allAccess = true;
    }
    if (!unlocked.length) return;
    saveProgression();
    renderUnlockState();
    statusLabel.textContent = `Secret unlocked: ${unlocked.join(', ')}`;
  }

  function loadBettingRecord() {
    const cookie = document.cookie.split('; ').find((entry) => entry.startsWith('wallchargeBettingRecord='));
    if (!cookie) return { wins: 0, losses: 0 };
    try {
      const value = JSON.parse(decodeURIComponent(cookie.split('=').slice(1).join('=')));
      return {
        wins: Math.max(0, Math.floor(Number(value.wins) || 0)),
        losses: Math.max(0, Math.floor(Number(value.losses) || 0)),
      };
    } catch (error) {
      return { wins: 0, losses: 0 };
    }
  }

  function saveBettingRecord() {
    const value = encodeURIComponent(JSON.stringify(bettingRecord));
    document.cookie = `wallchargeBettingRecord=${value}; Max-Age=31536000; Path=/; SameSite=Lax`;
  }

  function renderBetting() {
    const total = bettingRecord.wins + bettingRecord.losses;
    const percentage = total ? Math.round((bettingRecord.wins / total) * 100) : 0;
    const result = currentBetResult ? `${currentBetResult === 'won' ? 'Bet won' : 'Bet lost'} · ` : '';
    bettingRecordLabel.textContent = `${result}Your record: ${bettingRecord.wins}W · ${bettingRecord.losses}L${total ? ` · ${percentage}%` : ''}`;
    bettingOptions.replaceChildren();
    selections.forEach((typeId, playerIndex) => {
      if (!typeId) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `bet-option${selectedBet === playerIndex ? ' is-selected' : ''}`;
      button.dataset.betPlayer = playerIndex;
      button.disabled = roundStarted || roundOver;
      button.setAttribute('aria-pressed', selectedBet === playerIndex ? 'true' : 'false');
      const team = teamMode ? ` · ${teams[playerTeams[playerIndex]].name}` : '';
      button.textContent = `P${playerIndex + 1} · ${fighterTypes[typeId].name} · ${modifiers[playerModifiers[playerIndex]].name}${team}`;
      button.addEventListener('click', () => {
        selectedBet = playerIndex;
        currentBetResult = null;
        statusLabel.textContent = `Bet placed on P${playerIndex + 1}`;
        renderBetting();
      });
      bettingOptions.append(button);
    });
  }

  function resolveBet(survivingSides) {
    if (betResolved || selectedBet === null || survivingSides.length !== 1) return;
    betResolved = true;
    const won = teamMode
      ? playerTeams[selectedBet] === survivingSides[0]
      : selectedBet === survivingSides[0];
    bettingRecord[won ? 'wins' : 'losses'] += 1;
    currentBetResult = won ? 'won' : 'lost';
    saveBettingRecord();
    renderBetting();
  }

  function makeFighter(typeId, playerIndex) {
    const type = fighterTypes[typeId];
    const start = starts[playerIndex];
    const modifierId = playerModifiers[playerIndex];
    const modifier = modifiers[modifierId];
    const radius = type.radius * modifier.size;
    const baseHealth = type.health || 100;
    const baseDamage = typeId === 'bulk' ? radius / 10 : ['tron', 'orbiter', 'tank', 'rail', 'sweep', 'pulsar', 'vendetta', 'mine'].includes(typeId) ? 0 : 1;
    return {
      id: `p${playerIndex + 1}-${entitySerial += 1}`,
      playerIndex,
      typeId,
      x: size * start.x,
      y: size * start.y,
      vx: Math.cos(start.angle) * type.speed * modifier.speed,
      vy: Math.sin(start.angle) * type.speed * modifier.speed,
      radius,
      health: baseHealth * modifier.health,
      maxHealth: baseHealth * modifier.health,
      damage: baseDamage * modifier.damage,
      maxDamage: modifier.damage,
      modifierId,
      damageMultiplier: modifier.damage,
      abilityMultiplier: modifier.ability,
      speedMultiplier: modifier.speed,
      pacifist: modifierId === 'pacifist',
      wallBounces: 0,
      fireTimer: typeId === 'fuse' ? 6 : typeId === 'tank' ? 0.25 : null,
      mineTimer: typeId === 'mine' ? 1.5 : null,
      shotDamage: modifier.damage,
      trailLength: typeId === 'tron' ? 70 : 0,
      trailPoints: typeId === 'tron' ? [{ x: size * start.x, y: size * start.y }] : [],
      orbitCount: 0,
      orbitAngle: start.angle,
      orbitSpeed: orbiterConfig.baseSpinSpeed,
      splitGeneration: 0,
      splitTimer: typeId === 'hydra' ? hydraSplitTimes[0] : null,
      trackProgress: typeId === 'rail' ? playerIndex / starts.length : null,
      trackDirection: playerIndex % 2 ? -1 : 1,
      trackSide: 0,
      laserAngle: typeId === 'sweep' ? start.angle : null,
      pulseTimer: typeId === 'pulsar' ? pulsarConfig.cooldownFull : null,
      pulseDamage: typeId === 'pulsar' ? pulsarConfig.damage * modifier.damage : null,
      pulseHits: 0,
      vendettaTargetPlayer: null,
      vendettaStoredDamage: 0,
      flash: 0,
      alive: true,
    };
  }

  function resetRound() {
    entitySerial = 0;
    fighters = selections
      .map((typeId, playerIndex) => typeId ? makeFighter(typeId, playerIndex) : null)
      .filter(Boolean);
    sparks = [];
    projectiles = [];
    mines = [];
    pulses = [];
    collisionLocks = new Set();
    railCollisionLocks = new Set();
    trailExposure = new Map();
    ghostExposure = new Map();
    laserExposure = new Map();
    orbitContacts = new Set();
    fighters.filter((fighter) => fighter.typeId === 'rail').forEach((fighter) => updateRailPosition(fighter, 0));
    roundStarted = false;
    roundOver = false;
    selectedBet = null;
    betResolved = false;
    currentBetResult = null;
    elapsedTime = 0;
    running = false;
    previousTime = performance.now();
    message.hidden = true;
    pauseButton.textContent = 'Start';
    statusLabel.textContent = 'Pick a winner or start';
    renderTimer();
    renderScoreboard();
    renderBetting();
    draw();
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    const nextSize = Math.round(bounds.width);
    if (!nextSize) return;
    const ratio = size ? nextSize / size : 1;
    size = nextSize;
    scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * scale);
    canvas.height = Math.round(size * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    fighters.forEach((fighter) => {
      fighter.x *= ratio;
      fighter.y *= ratio;
      fighter.trailLength *= ratio;
      fighter.trailPoints.forEach((point) => {
        point.x *= ratio;
        point.y *= ratio;
      });
    });
    fighters.filter((fighter) => fighter.typeId === 'rail').forEach((fighter) => updateRailPosition(fighter, 0));
    projectiles.forEach((projectile) => {
      projectile.x *= ratio;
      projectile.y *= ratio;
    });
    mines.forEach((mine) => {
      mine.x *= ratio;
      mine.y *= ratio;
      mine.travelRemaining *= ratio;
    });
    pulses.forEach((pulse) => {
      pulse.x *= ratio;
      pulse.y *= ratio;
      pulse.radius *= ratio;
      pulse.startRadius *= ratio;
      pulse.maxRadius *= ratio;
    });
    draw();
  }

  function renderSlots() {
    picker.classList.toggle('teams-enabled', teamMode);
    teamToggle.setAttribute('aria-pressed', String(teamMode));
    teamToggle.querySelector('strong').textContent = teamMode ? 'Teams on' : 'Teams off';
    teamHint.textContent = teamMode ? 'Allies share a colour and cannot hurt each other' : 'Every player for themselves';
    roundLabel.textContent = teamMode ? 'Last team standing' : 'Last fighter standing';
    slotButtons.forEach((button, index) => {
      const typeId = selections[index];
      button.classList.toggle('is-selected', selectedPlayer === index);
      button.classList.toggle('is-empty', !typeId);
      button.setAttribute('aria-pressed', String(selectedPlayer === index));
      button.querySelector('strong').textContent = typeId ? fighterTypes[typeId].name : 'Add fighter';
      button.querySelector('.player-slot-swatch').style.background = typeId ? fighterTypes[typeId].colour : 'transparent';
      const select = teamSelects[index];
      select.value = playerTeams[index];
      select.disabled = !teamMode || !typeId;
      select.style.borderColor = teams[playerTeams[index]].colour;
      select.style.color = teams[playerTeams[index]].colour;
      const modifierSelect = modifierSelects[index];
      modifierSelect.value = playerModifiers[index];
      modifierSelect.disabled = !typeId;
    });
  }

  function playersAreAllies(firstPlayer, secondPlayer) {
    return firstPlayer === secondPlayer || (teamMode && playerTeams[firstPlayer] === playerTeams[secondPlayer]);
  }

  function renderScoreboard() {
    scoreboard.innerHTML = fighters.map((fighter) => {
      const type = fighterTypes[fighter.typeId];
      const hudId = `player-${fighter.playerIndex}`;
      return `<div class="fighter-status" data-status="${hudId}">
        <div class="fighter-heading">
          <span class="fighter-name"><i class="fighter-dot" style="background:${type.colour};color:${type.colour}"></i>P${fighter.playerIndex + 1} · ${type.name} · ${modifiers[fighter.modifierId].name}${teamMode ? ` · ${teams[playerTeams[fighter.playerIndex]].name}` : ''}</span>
          <strong data-health-label="${hudId}">${formatHealth(fighter.health)}</strong>
        </div>
        <div class="health-track" role="progressbar" aria-label="P${fighter.playerIndex + 1} ${type.name} health" aria-valuemin="0" aria-valuemax="${fighter.maxHealth}" aria-valuenow="${Math.max(0, Math.round(fighter.health))}">
          <span class="health-fill" style="width:100%;background:${type.colour}" data-health="${hudId}"></span>
        </div>
        <span class="damage-readout"><span data-damage="${hudId}">${damageLabel(fighter)}</span> · <span data-trait="${hudId}">${traitLabel(fighter)}</span></span>
      </div>`;
    }).join('');
  }

  function traitLabel(fighter) {
    const type = fighterTypes[fighter.typeId];
    if (fighter.typeId === 'bulk') {
      const growth = Math.round(((fighter.radius / type.radius) - 1) * 100);
      const mass = Math.pow(fighter.radius / type.radius, 2);
      return growth ? `+${growth}% size · ${mass.toFixed(1)}× weight` : 'heavyweight';
    }
    if (fighter.typeId === 'tide') {
      const speedGain = Math.round((Math.pow(1 + (0.03 * fighter.abilityMultiplier), fighter.wallBounces) - 1) * 100);
      const rechargeRate = fighter.pacifist ? 0 : 0.25 * fighter.maxDamage * fighter.abilityMultiplier;
      return `${speedGain ? `+${speedGain}% speed` : 'normal speed'} · +${formatDamage(rechargeRate)} damage/sec`;
    }
    if (fighter.typeId === 'fuse') return `${fuseCooldown(fighter.health).toFixed(1)}s cooldown · next ${fighter.shotDamage}`;
    if (fighter.typeId === 'tron') return `${Math.round(fighter.trailLength)}px trail`;
    if (fighter.typeId === 'orbiter') {
      const satellites = `${fighter.orbitCount} ${fighter.orbitCount === 1 ? 'satellite' : 'satellites'}`;
      let remaining = fighter.orbitCount;
      const activeLayers = orbiterConfig.layers.reduce((count, layer) => {
        if (remaining <= 0) return count;
        remaining -= Math.min(remaining, layer.capacity);
        return count + 1;
      }, 0);
      const layerLabel = `${activeLayers} ${activeLayers === 1 ? 'ring' : 'rings'}`;
      return fighter.orbitCount >= orbiterMaxSatellites
        ? `${satellites} · ${layerLabel} · ${(fighter.orbitSpeed / orbiterConfig.baseSpinSpeed).toFixed(1)}× spin`
        : `${satellites} · ${layerLabel}`;
    }
    if (fighter.typeId === 'hydra') return `${fighter.splitTimer.toFixed(1)}s split timer`;
    if (fighter.typeId === 'tank') return `${Math.max(0, fighter.fireTimer).toFixed(1)}s until next shot`;
    if (fighter.typeId === 'rail') return fighter.trackDirection > 0 ? 'clockwise wall track' : 'counterclockwise wall track';
    if (fighter.typeId === 'sweep') return 'constantly rotating beam';
    if (fighter.typeId === 'pulsar') return `${Math.max(0, fighter.pulseTimer).toFixed(1)}s until next pulse · ${Math.round(pulsarConfig.rangeRatio * 100)}% range`;
    if (fighter.typeId === 'ghost') return 'phases through walls · tracking nearest';
    if (fighter.typeId === 'vendetta') return fighter.vendettaTargetPlayer === null
      ? 'calm · waiting to be hit'
      : `hunting P${fighter.vendettaTargetPlayer + 1} · ${formatDamage(fighter.vendettaStoredDamage)} stored`;
    if (fighter.typeId === 'mine') {
      const activeMines = mines.filter((mine) => mine.ownerId === fighter.id && !mine.hit).length;
      return `${Math.max(0, fighter.mineTimer).toFixed(1)}s until throw · ${activeMines} active`;
    }
    return '1,000,000 starting health';
  }

  function damageLabel(fighter) {
    if (fighter.pacifist) return '0 damage · animations active';
    if (fighter.typeId === 'tron') return `${formatDamage(fighter.damageMultiplier)} on entry + ${formatDamage(fighter.damageMultiplier)}/sec · 0 impact`;
    if (fighter.typeId === 'orbiter') return `${formatDamage(fighter.damageMultiplier)} satellite damage · 0 impact`;
    if (fighter.typeId === 'tank') return `${formatDamage(fighter.damageMultiplier)} bullet damage · 0 impact`;
    if (fighter.typeId === 'rail') return `${formatDamage(0.5 * fighter.damageMultiplier)} entry + ${formatDamage(0.5 * fighter.damageMultiplier)} per 0.1s · 0 impact`;
    if (fighter.typeId === 'sweep') return `${formatDamage(0.5 * fighter.damageMultiplier)} entry + ${formatDamage(0.5 * fighter.damageMultiplier)} per 0.1s · 0 impact`;
    if (fighter.typeId === 'pulsar') return `${fighter.pulseDamage} pulse damage · 0 impact`;
    if (fighter.typeId === 'ghost') return `${formatDamage(fighter.damage)} impact + escalating haunt damage`;
    if (fighter.typeId === 'vendetta') return fighter.pacifist ? '0 damage · animations active' : `0 normal · ${formatDamage(fighter.vendettaStoredDamage * 3 * fighter.damageMultiplier)} revenge damage`;
    if (fighter.typeId === 'mine') return `count-up mine damage · ${mineConfig.maxCount} max · 0 impact`;
    if (fighter.typeId === 'punchbag') return '1 damage';
    if (fighter.typeId === 'hydra') return `${formatDamage(fighter.damage)} attack per body`;
    if (fighter.typeId === 'tide') return `${formatDamage(fighter.damage)} / ${formatDamage(fighter.maxDamage)} stored damage`;
    const kind = fighter.typeId === 'bulk' ? 'size damage' : fighter.typeId === 'tide' ? 'stored damage' : 'impact damage';
    return `${formatDamage(fighter.damage)} ${kind}`;
  }

  function updateHud() {
    selections.forEach((typeId, playerIndex) => {
      if (!typeId) return;
      const group = fighters.filter((fighter) => fighter.playerIndex === playerIndex);
      if (!group.length) return;
      const living = group.filter((fighter) => fighter.alive);
      const representative = living[0] || group[0];
      const value = living.reduce((total, fighter) => total + Math.max(0, fighter.health), 0);
      const maxHealth = group.reduce((total, fighter) => total + fighter.maxHealth, 0);
      const hudId = `player-${playerIndex}`;
      const status = document.querySelector(`[data-status="${hudId}"]`);
      if (!status) return;
      const bar = status.querySelector(`[data-health="${hudId}"]`);
      bar.style.width = `${maxHealth ? (value / maxHealth) * 100 : 0}%`;
      bar.parentElement.setAttribute('aria-valuemax', String(Math.round(maxHealth)));
      bar.parentElement.setAttribute('aria-valuenow', String(Math.round(value)));
      status.querySelector(`[data-health-label="${hudId}"]`).textContent = formatHealth(value);
      if (typeId === 'hydra') {
        const highestDamage = Math.max(...living.map((fighter) => fighter.damage), 0);
        const splittingBodies = living.filter((fighter) => fighter.health >= 1);
        const nextSplit = Math.min(...splittingBodies.map((fighter) => fighter.splitTimer));
        status.querySelector(`[data-damage="${hudId}"]`).textContent = `${formatDamage(highestDamage)} max attack per body`;
        status.querySelector(`[data-trait="${hudId}"]`).textContent = `${living.length} ${living.length === 1 ? 'body' : 'bodies'} · ${Number.isFinite(nextSplit) ? `${Math.max(0, nextSplit).toFixed(1)}s next split` : 'too weak to split'}`;
      } else {
        status.querySelector(`[data-damage="${hudId}"]`).textContent = damageLabel(representative);
        status.querySelector(`[data-trait="${hudId}"]`).textContent = traitLabel(representative);
      }
      status.classList.toggle('is-out', !living.length);
    });
  }

  function formatDamage(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  function formatHealth(value) {
    const safeValue = Math.max(0, value);
    return (Number.isInteger(safeValue) ? safeValue : Number(safeValue.toFixed(1))).toLocaleString('en-GB');
  }

  function renderTimer() {
    const totalTenths = Math.floor(elapsedTime * 10);
    const hours = Math.floor(totalTenths / 36000);
    const minutes = Math.floor((totalTenths % 36000) / 600);
    const seconds = Math.floor((totalTenths % 600) / 10);
    const tenths = totalTenths % 10;
    timerLabel.textContent = `${hours ? `${String(hours).padStart(2, '0')}:` : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
  }

  function fuseCooldown(health) {
    const clampedHealth = Math.min(100, Math.max(1, health));
    return 2 + (4 * (clampedHealth - 1)) / 99;
  }

  function adjustAbilityTimer(fighter) {
    if (fighter.typeId === 'fuse') fighter.fireTimer = Math.min(fighter.fireTimer, fuseCooldown(fighter.health));
    if (fighter.typeId === 'pulsar') fighter.pulseTimer = Math.min(fighter.pulseTimer, pulsarCooldown(fighter.health));
  }

  function applyDamage(target, amount, sourcePlayerIndex) {
    if (amount <= 0) return false;
    target.health -= amount;
    adjustAbilityTimer(target);
    if (target.typeId === 'vendetta') {
      const newlyArmed = target.vendettaTargetPlayer === null;
      if (newlyArmed) target.vendettaTargetPlayer = sourcePlayerIndex;
      target.vendettaStoredDamage += amount;
      if (newlyArmed) {
        const sources = fighters.filter((fighter) => fighter.alive && fighter.playerIndex === sourcePlayerIndex);
        const source = sources.reduce((nearest, candidate) => {
          if (!nearest) return candidate;
          const nearestDistance = Math.hypot(nearest.x - target.x, nearest.y - target.y);
          const candidateDistance = Math.hypot(candidate.x - target.x, candidate.y - target.y);
          return candidateDistance < nearestDistance ? candidate : nearest;
        }, null);
        let awayX = source ? target.x - source.x : -target.vx;
        let awayY = source ? target.y - source.y : -target.vy;
        let awayDistance = Math.hypot(awayX, awayY);
        if (awayDistance < 0.001) {
          awayX = -target.vx || 1;
          awayY = -target.vy;
          awayDistance = Math.max(0.001, Math.hypot(awayX, awayY));
        }
        const pushSpeed = 520 * target.speedMultiplier;
        target.vx = (awayX / awayDistance) * pushSpeed;
        target.vy = (awayY / awayDistance) * pushSpeed;
        target.flash = 0.4;
      }
    }
    return true;
  }

  function pulsarCooldown(health) {
    const clampedHealth = Math.min(100, Math.max(1, health));
    const range = pulsarConfig.cooldownFull - pulsarConfig.cooldownCritical;
    return pulsarConfig.cooldownCritical + (range * (clampedHealth - 1)) / 99;
  }

  function spawnPulse(fighter) {
    const startRadius = fighter.radius + 6;
    pulses.push({
      ownerId: fighter.id,
      ownerPlayerIndex: fighter.playerIndex,
      playerIndex: fighter.playerIndex,
      x: fighter.x,
      y: fighter.y,
      radius: startRadius,
      startRadius,
      maxRadius: size * pulsarConfig.rangeRatio,
      damage: fighter.pulseDamage,
      damageAwarded: false,
      hitFighters: new Set(),
      expired: false,
    });
    fighter.pulseTimer = pulsarCooldown(fighter.health);
    fighter.flash = 0.3;
    makeSparks(fighter.x, fighter.y, fighterTypes.pulsar.pulse, 12, 1.2);
  }

  function hydraSplitTime(generation) {
    return hydraSplitTimes[Math.min(generation, hydraSplitTimes.length - 1)];
  }

  function splitHydra(parent) {
    if (parent.health < 1) return;
    const childRadius = Math.max(8, parent.radius / Math.SQRT2);
    const speed = Math.hypot(parent.vx, parent.vy);
    const heading = Math.atan2(parent.vy, parent.vx);
    const perpendicular = heading + Math.PI / 2;
    const childGeneration = parent.splitGeneration + 1;
    const children = [-1, 1].map((direction) => {
      const angle = heading + direction * 0.18;
      const health = parent.health * 0.5;
      return {
        ...parent,
        id: `p${parent.playerIndex + 1}-${entitySerial += 1}`,
        x: Math.min(size - childRadius, Math.max(childRadius, parent.x + Math.cos(perpendicular) * childRadius * direction)),
        y: Math.min(size - childRadius, Math.max(childRadius, parent.y + Math.sin(perpendicular) * childRadius * direction)),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: childRadius,
        health,
        maxHealth: parent.maxHealth * 0.5,
        damage: parent.pacifist ? 0 : parent.damage * (1 + (0.5 * parent.abilityMultiplier)),
        splitGeneration: childGeneration,
        splitTimer: hydraSplitTime(childGeneration),
        flash: 0.3,
        alive: true,
      };
    });
    parent.alive = false;
    fighters = fighters.filter((fighter) => fighter !== parent);
    fighters.push(...children);
    makeSparks(parent.x, parent.y, fighterTypes.hydra.colour, 18, 1.5);
    statusLabel.textContent = `P${parent.playerIndex + 1} splits`;
    updateHud();
  }

  function spawnProjectile(fighter) {
    const targets = fighters.filter((target) => target.alive && !playersAreAllies(target.playerIndex, fighter.playerIndex));
    if (!targets.length) return;
    const target = targets.reduce((nearest, candidate) => {
      const nearestDistance = Math.hypot(nearest.x - fighter.x, nearest.y - fighter.y);
      const candidateDistance = Math.hypot(candidate.x - fighter.x, candidate.y - fighter.y);
      return candidateDistance < nearestDistance ? candidate : nearest;
    });
    const angle = Math.atan2(target.y - fighter.y, target.x - fighter.x) + ((Math.random() * 0.12) - 0.06);
    const radius = 11;
    const offset = fighter.radius + radius + 3;
    projectiles.push({
      ownerId: fighter.id,
      ownerPlayerIndex: fighter.playerIndex,
      playerIndex: fighter.playerIndex,
      x: fighter.x + Math.cos(angle) * offset,
      y: fighter.y + Math.sin(angle) * offset,
      vx: Math.cos(angle) * 330,
      vy: Math.sin(angle) * 330,
      radius,
      damage: fighter.shotDamage,
      hit: false,
      vanishOnWall: false,
      colour: fighterTypes.fuse.colour,
    });
    if (!fighter.pacifist) fighter.shotDamage += fighter.abilityMultiplier;
    fighter.fireTimer = fuseCooldown(fighter.health);
    fighter.flash = 0.24;
    updateHud();
  }

  function spawnTankBullet(fighter) {
    const targets = fighters.filter((target) => target.alive && !playersAreAllies(target.playerIndex, fighter.playerIndex));
    if (!targets.length) return;
    const target = targets.reduce((nearest, candidate) => {
      const nearestDistance = Math.hypot(nearest.x - fighter.x, nearest.y - fighter.y);
      const candidateDistance = Math.hypot(candidate.x - fighter.x, candidate.y - fighter.y);
      return candidateDistance < nearestDistance ? candidate : nearest;
    });
    const angle = Math.atan2(target.y - fighter.y, target.x - fighter.x);
    const radius = 6;
    const offset = fighter.radius + radius + 3;
    projectiles.push({
      ownerId: fighter.id,
      ownerPlayerIndex: fighter.playerIndex,
      playerIndex: fighter.playerIndex,
      x: fighter.x + Math.cos(angle) * offset,
      y: fighter.y + Math.sin(angle) * offset,
      vx: Math.cos(angle) * 440,
      vy: Math.sin(angle) * 440,
      radius,
      damage: fighter.pacifist ? 0 : fighter.damageMultiplier,
      hit: false,
      vanishOnWall: true,
      colour: fighterTypes.tank.bullet,
    });
    fighter.fireTimer = 0.25;
    fighter.flash = 0.16;
  }

  function throwMine(fighter) {
    const angle = Math.random() * Math.PI * 2;
    const radius = mineConfig.radius;
    const offset = fighter.radius + radius + 3;
    const maxDistance = Math.max(mineConfig.minDistance, size * mineConfig.maxDistanceRatio);
    mines.push({
      ownerId: fighter.id,
      ownerPlayerIndex: fighter.playerIndex,
      x: fighter.x + Math.cos(angle) * offset,
      y: fighter.y + Math.sin(angle) * offset,
      vx: Math.cos(angle) * mineConfig.throwSpeed,
      vy: Math.sin(angle) * mineConfig.throwSpeed,
      radius,
      travelRemaining: mineConfig.minDistance + (Math.random() * (maxDistance - mineConfig.minDistance)),
      armed: false,
      armedTime: 0,
      damageMultiplier: fighter.damageMultiplier,
      pacifist: fighter.pacifist,
      contacts: new Set(),
      hit: false,
    });
    fighter.mineTimer = mineConfig.cooldown;
    fighter.flash = 0.18;
  }

  function makeSparks(x, y, colour, count, force = 1) {
    if (!particlesEnabled) return;
    const permittedCount = Math.min(count, Math.max(0, 180 - sparks.length));
    for (let index = 0; index < permittedCount; index += 1) {
      const angle = (Math.PI * 2 * index) / count + Math.random() * 0.4;
      const speed = (55 + Math.random() * 95) * force;
      sparks.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0.5, colour });
    }
  }

  function enforcePerformanceBudget() {
    const activeObjects = fighters.filter((fighter) => fighter.alive).length + projectiles.length + mines.length
      + fighters.reduce((total, fighter) => total + (fighter.alive && fighter.typeId === 'orbiter' ? fighter.orbitCount : 0), 0);
    if (!particlesEnabled || activeObjects <= 48) return;
    particlesEnabled = false;
    sparks = [];
    particleToggle.checked = false;
    particleStatus.textContent = 'Particle effects (disabled for performance)';
  }

  function wallCollisions(fighter) {
    let bounced = false;
    let wallNormalX = 0;
    let wallNormalY = 0;
    let hitX = fighter.x;
    let hitY = fighter.y;

    if (fighter.x - fighter.radius <= 0 && fighter.vx < 0) {
      fighter.x = fighter.radius;
      fighter.vx *= -1;
      hitX = 0;
      wallNormalX = 1;
      bounced = true;
    } else if (fighter.x + fighter.radius >= size && fighter.vx > 0) {
      fighter.x = size - fighter.radius;
      fighter.vx *= -1;
      hitX = size;
      wallNormalX = -1;
      bounced = true;
    }
    if (fighter.y - fighter.radius <= 0 && fighter.vy < 0) {
      fighter.y = fighter.radius;
      fighter.vy *= -1;
      hitY = 0;
      wallNormalY = 1;
      bounced = true;
    } else if (fighter.y + fighter.radius >= size && fighter.vy > 0) {
      fighter.y = size - fighter.radius;
      fighter.vy *= -1;
      hitY = size;
      wallNormalY = -1;
      bounced = true;
    }

    if (!bounced) return;
    const drift = (Math.random() * 0.1) - 0.05;
    const speed = Math.hypot(fighter.vx, fighter.vy);
    const angle = Math.atan2(fighter.vy, fighter.vx) + drift;
    fighter.vx = Math.cos(angle) * speed;
    fighter.vy = Math.sin(angle) * speed;
    if (wallNormalX) fighter.vx = wallNormalX * Math.abs(fighter.vx);
    if (wallNormalY) fighter.vy = wallNormalY * Math.abs(fighter.vy);

    fighter.wallBounces += 1;
    if (fighter.typeId === 'bulk') {
      fighter.radius += 0.9 * fighter.abilityMultiplier;
      fighter.damage = fighter.pacifist ? 0 : (fighter.radius / 10) * fighter.damageMultiplier;
    } else if (fighter.typeId === 'tide') {
      fighter.maxDamage += fighter.pacifist ? 0 : fighter.abilityMultiplier;
      fighter.vx *= 1 + (0.03 * fighter.abilityMultiplier);
      fighter.vy *= 1 + (0.03 * fighter.abilityMultiplier);
    } else if (fighter.typeId === 'tron') {
      fighter.trailLength += 45 * fighter.abilityMultiplier;
    } else if (fighter.typeId === 'orbiter') {
      const openSlots = Math.max(0, orbiterMaxSatellites - fighter.orbitCount);
      const addedSatellites = Math.min(openSlots, fighter.abilityMultiplier);
      const excessGrowth = fighter.abilityMultiplier - addedSatellites;
      fighter.orbitCount += addedSatellites;
      fighter.orbitSpeed += excessGrowth * orbiterConfig.spinGain;
    }
    fighter.flash = 0.18;
    makeSparks(hitX, hitY, '#edd9a3', 5);
    updateHud();
  }

  function vendettaCanStrike(fighter, target) {
    if (fighter.typeId !== 'vendetta' || fighter.vendettaTargetPlayer !== target.playerIndex || fighter.vendettaStoredDamage <= 0) return false;
    const speed = Math.hypot(fighter.vx, fighter.vy);
    const targetDistance = Math.hypot(target.x - fighter.x, target.y - fighter.y);
    if (speed < 0.001 || targetDistance < 0.001) return false;
    const facingDot = ((fighter.vx / speed) * ((target.x - fighter.x) / targetDistance))
      + ((fighter.vy / speed) * ((target.y - fighter.y) / targetDistance));
    return facingDot >= Math.cos(Math.PI / 8);
  }

  function fighterCollision(a, b) {
    if (!a.alive || !b.alive) return;
    const key = [a.id, b.id].sort().join(':');
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const distance = Math.hypot(dx, dy);
    const minimum = a.radius + b.radius;
    if (distance >= minimum) {
      collisionLocks.delete(key);
      railCollisionLocks.delete(key);
      return;
    }

    const aRevenge = vendettaCanStrike(a, b);
    const bRevenge = vendettaCanStrike(b, a);

    const phasedCollision = a.typeId === 'ghost' || b.typeId === 'ghost';
    if (!phasedCollision && !railCollisionLocks.has(key)) {
      [a, b].filter((fighter) => fighter.typeId === 'rail').forEach((fighter) => {
        fighter.trackDirection *= -1;
        fighter.vx *= -1;
        fighter.vy *= -1;
      });
      railCollisionLocks.add(key);
    }

    if (!phasedCollision) {
      const nx = distance ? dx / distance : 1;
      const ny = distance ? dy / distance : 0;
      const aInverseMass = 1 / (a.radius * a.radius);
      const bInverseMass = 1 / (b.radius * b.radius);
      const inverseMassTotal = aInverseMass + bInverseMass;
      const overlap = minimum - distance;
      const aCorrection = overlap * (aInverseMass / inverseMassTotal);
      const bCorrection = overlap * (bInverseMass / inverseMassTotal);
      a.x -= nx * aCorrection;
      a.y -= ny * aCorrection;
      b.x += nx * bCorrection;
      b.y += ny * bCorrection;

      const relativeVelocity = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (relativeVelocity < 0) {
        const impulse = (-2 * relativeVelocity) / inverseMassTotal;
        a.vx -= impulse * aInverseMass * nx;
        a.vy -= impulse * aInverseMass * ny;
        b.vx += impulse * bInverseMass * nx;
        b.vy += impulse * bInverseMass * ny;
      }
    }

    if (playersAreAllies(a.playerIndex, b.playerIndex) || (collisionLocks.has(key) && !aRevenge && !bRevenge)) return;
    const aDamage = a.damage;
    const bDamage = b.damage;
    const damageToA = bRevenge ? b.vendettaStoredDamage * 3 * b.damageMultiplier : aRevenge ? 0 : bDamage;
    const damageToB = aRevenge ? a.vendettaStoredDamage * 3 * a.damageMultiplier : bRevenge ? 0 : aDamage;
    applyDamage(a, damageToA, b.playerIndex);
    applyDamage(b, damageToB, a.playerIndex);
    if (a.typeId === 'tide' && damageToB > 0) a.damage = a.pacifist ? 0 : a.damageMultiplier;
    if (b.typeId === 'tide' && damageToA > 0) b.damage = b.pacifist ? 0 : b.damageMultiplier;
    if (aRevenge) {
      a.vendettaTargetPlayer = null;
      a.vendettaStoredDamage = 0;
    }
    if (bRevenge) {
      b.vendettaTargetPlayer = null;
      b.vendettaStoredDamage = 0;
    }
    a.flash = Math.max(a.flash, 0.24);
    b.flash = Math.max(b.flash, 0.24);
    collisionLocks.add(key);
    makeSparks((a.x + b.x) / 2, (a.y + b.y) / 2, '#edd9a3', 14, 1.5);
    statusLabel.textContent = aRevenge || bRevenge
      ? `${aRevenge ? `P${a.playerIndex + 1}` : `P${b.playerIndex + 1}`} gets revenge · ${formatDamage(aRevenge ? damageToB : damageToA)}`
      : `P${a.playerIndex + 1} ↔ P${b.playerIndex + 1}`;
    eliminateFighters();
    updateHud();
    checkWinner();
  }

  function eliminateFighters() {
    fighters.forEach((fighter) => {
      if (fighter.alive && fighter.health <= 0) {
        fighter.alive = false;
        makeSparks(fighter.x, fighter.y, fighterTypes[fighter.typeId].colour, 24, 2);
      }
    });
  }

  function pointToSegmentDistance(point, start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lengthSquared = (dx * dx) + (dy * dy);
    if (!lengthSquared) return Math.hypot(point.x - start.x, point.y - start.y);
    const projection = Math.max(0, Math.min(1, (((point.x - start.x) * dx) + ((point.y - start.y) * dy)) / lengthSquared));
    return Math.hypot(point.x - (start.x + projection * dx), point.y - (start.y + projection * dy));
  }

  function updateRailPosition(fighter, delta) {
    const sideLength = Math.max(1, size - (fighter.radius * 2));
    const perimeter = sideLength * 4;
    const trackSpeed = fighterTypes.rail.speed * fighter.speedMultiplier;
    fighter.trackProgress = (fighter.trackProgress + ((fighter.trackDirection * trackSpeed * delta) / perimeter) + 1) % 1;
    const distance = fighter.trackProgress * perimeter;
    const side = Math.min(3, Math.floor(distance / sideLength));
    const along = distance - (side * sideLength);
    fighter.trackSide = side;
    if (side === 0) {
      fighter.x = fighter.radius + along;
      fighter.y = fighter.radius;
      fighter.vx = fighter.trackDirection * trackSpeed;
      fighter.vy = 0;
    } else if (side === 1) {
      fighter.x = size - fighter.radius;
      fighter.y = fighter.radius + along;
      fighter.vx = 0;
      fighter.vy = fighter.trackDirection * trackSpeed;
    } else if (side === 2) {
      fighter.x = size - fighter.radius - along;
      fighter.y = size - fighter.radius;
      fighter.vx = -fighter.trackDirection * trackSpeed;
      fighter.vy = 0;
    } else {
      fighter.x = fighter.radius;
      fighter.y = size - fighter.radius - along;
      fighter.vx = 0;
      fighter.vy = -fighter.trackDirection * trackSpeed;
    }
  }

  function railBeam(fighter) {
    const start = { x: fighter.x, y: fighter.y };
    if (fighter.trackSide === 0) return { start, end: { x: fighter.x, y: size } };
    if (fighter.trackSide === 1) return { start, end: { x: 0, y: fighter.y } };
    if (fighter.trackSide === 2) return { start, end: { x: fighter.x, y: 0 } };
    return { start, end: { x: size, y: fighter.y } };
  }

  function sweepBeam(fighter) {
    const start = { x: fighter.x, y: fighter.y };
    const dx = Math.cos(fighter.laserAngle);
    const dy = Math.sin(fighter.laserAngle);
    const distances = [];
    if (dx > 0) distances.push((size - fighter.x) / dx);
    if (dx < 0) distances.push(-fighter.x / dx);
    if (dy > 0) distances.push((size - fighter.y) / dy);
    if (dy < 0) distances.push(-fighter.y / dy);
    const distance = Math.min(...distances.filter((value) => value >= 0));
    return { start, end: { x: fighter.x + (dx * distance), y: fighter.y + (dy * distance) } };
  }

  function updateLasers(delta) {
    const laserFighters = fighters.filter((fighter) => fighter.alive && ['rail', 'sweep'].includes(fighter.typeId));
    if (!laserFighters.length) return;
    let landedHit = false;
    laserFighters.forEach((source) => {
      if (source.typeId === 'sweep') source.laserAngle = (source.laserAngle + (delta * 1.75)) % (Math.PI * 2);
      const beam = source.typeId === 'rail' ? railBeam(source) : sweepBeam(source);
      fighters.filter((target) => target.alive && !playersAreAllies(target.playerIndex, source.playerIndex)).forEach((target) => {
        const key = `${source.id}:${target.id}`;
        const touching = pointToSegmentDistance(target, beam.start, beam.end) <= target.radius + 3;
        if (!touching) {
          laserExposure.delete(key);
          return;
        }
        const isEntry = !laserExposure.has(key);
        const exposure = (laserExposure.get(key) || 0) + delta;
        const ticks = Math.floor((exposure + 0.000001) / 0.1);
        laserExposure.set(key, exposure - (ticks * 0.1));
        const tickDamage = source.pacifist ? 0 : 0.5 * source.damageMultiplier;
        const damage = (isEntry ? tickDamage : 0) + (ticks * tickDamage);
        if (!damage) return;
        applyDamage(target, damage, source.playerIndex);
        target.flash = 0.12;
        landedHit = true;
        statusLabel.textContent = `P${source.playerIndex + 1}'s laser ${isEntry ? 'catches' : 'hits'} P${target.playerIndex + 1} · ${formatDamage(damage)}`;
      });
    });
    if (!landedHit) return;
    eliminateFighters();
    updateHud();
    checkWinner();
  }

  function updatePulses(delta) {
    if (!pulses.length) return;
    let landedHit = false;
    pulses.forEach((pulse) => {
      pulse.radius += ((pulse.maxRadius - pulse.startRadius) / pulsarConfig.expansionDuration) * delta;
      fighters.filter((target) => target.alive && !playersAreAllies(target.playerIndex, pulse.ownerPlayerIndex)).forEach((target) => {
        if (pulse.hitFighters.has(target.id)) return;
        const distance = Math.hypot(target.x - pulse.x, target.y - pulse.y);
        if (Math.abs(distance - pulse.radius) > target.radius + 4) return;
        pulse.hitFighters.add(target.id);
        const dealtDamage = pulse.damage;
        applyDamage(target, dealtDamage, pulse.ownerPlayerIndex);
        let increasedDamage = null;
        if (!pulse.damageAwarded) {
          pulse.damageAwarded = true;
          const owner = fighters.find((fighter) => fighter.id === pulse.ownerId);
          if (owner && !owner.pacifist) {
            owner.pulseDamage += owner.abilityMultiplier;
            owner.pulseHits += 1;
            increasedDamage = owner.pulseDamage;
          }
        }
        target.flash = 0.25;
        landedHit = true;
        makeSparks(target.x, target.y, fighterTypes.pulsar.pulse, 8);
        statusLabel.textContent = `P${pulse.playerIndex + 1}'s pulse hits P${target.playerIndex + 1} · ${dealtDamage}${increasedDamage ? ` · next pulse grows to ${increasedDamage}` : ''}`;
      });
      if (pulse.radius >= pulse.maxRadius) pulse.expired = true;
    });
    pulses = pulses.filter((pulse) => !pulse.expired);
    if (!landedHit) return;
    eliminateFighters();
    updateHud();
    checkWinner();
  }

  function updateTronTrails(delta) {
    const trons = fighters.filter((fighter) => fighter.alive && fighter.typeId === 'tron');
    if (!trons.length) return;
    let landedHit = false;
    trons.forEach((tron) => {
      const lastPoint = tron.trailPoints[tron.trailPoints.length - 1];
      if (!lastPoint || Math.hypot(tron.x - lastPoint.x, tron.y - lastPoint.y) >= 3) {
        tron.trailPoints.push({ x: tron.x, y: tron.y });
      }
      let length = 0;
      for (let index = tron.trailPoints.length - 1; index > 0; index -= 1) {
        length += Math.hypot(
          tron.trailPoints[index].x - tron.trailPoints[index - 1].x,
          tron.trailPoints[index].y - tron.trailPoints[index - 1].y,
        );
        if (length > tron.trailLength) {
          tron.trailPoints.splice(0, index);
          break;
        }
      }

      fighters.filter((target) => target.alive && !playersAreAllies(target.playerIndex, tron.playerIndex)).forEach((target) => {
        const key = `${tron.id}:${target.id}`;
        let touching = false;
        for (let index = 1; index < tron.trailPoints.length; index += 1) {
          const start = tron.trailPoints[index - 1];
          const end = tron.trailPoints[index];
          if (target.typeId !== 'ghost' && Math.hypot(end.x - tron.x, end.y - tron.y) < tron.radius + target.radius + 8) continue;
          if (pointToSegmentDistance(target, start, end) <= target.radius + 4) {
            touching = true;
            break;
          }
        }
        if (touching) {
          const isEntry = !trailExposure.has(key);
          const exposure = (trailExposure.get(key) || 0) + delta;
          const sustainedTicks = Math.floor(exposure);
          const tickDamage = tron.pacifist ? 0 : tron.damageMultiplier;
          const damage = (isEntry ? tickDamage : 0) + (sustainedTicks * tickDamage);
          trailExposure.set(key, exposure - sustainedTicks);
          if (!damage) return;
          applyDamage(target, damage, tron.playerIndex);
          target.flash = 0.24;
          landedHit = true;
          makeSparks(target.x, target.y, fighterTypes.tron.colour, 8);
          const event = isEntry ? 'hit' : 'remains in';
          statusLabel.textContent = `P${target.playerIndex + 1} ${event} P${tron.playerIndex + 1}'s trail · ${damage}`;
        } else {
          trailExposure.delete(key);
        }
      });
    });
    if (!landedHit) return;
    eliminateFighters();
    updateHud();
    checkWinner();
  }

  function updateProjectiles(delta) {
    if (!projectiles.length) return;
    let landedHit = false;
    projectiles.forEach((projectile) => {
      projectile.x += projectile.vx * delta;
      projectile.y += projectile.vy * delta;
      const hitWall = projectile.x - projectile.radius <= 0 || projectile.x + projectile.radius >= size
        || projectile.y - projectile.radius <= 0 || projectile.y + projectile.radius >= size;
      if (hitWall && projectile.vanishOnWall) {
        projectile.hit = true;
        return;
      }
      if (projectile.x - projectile.radius <= 0 || projectile.x + projectile.radius >= size) {
        projectile.vx *= -1;
        projectile.x = Math.min(size - projectile.radius, Math.max(projectile.radius, projectile.x));
      }
      if (projectile.y - projectile.radius <= 0 || projectile.y + projectile.radius >= size) {
        projectile.vy *= -1;
        projectile.y = Math.min(size - projectile.radius, Math.max(projectile.radius, projectile.y));
      }
      const target = fighters.find((fighter) => fighter.alive && !playersAreAllies(fighter.playerIndex, projectile.ownerPlayerIndex)
        && Math.hypot(fighter.x - projectile.x, fighter.y - projectile.y) <= fighter.radius + projectile.radius);
      if (!target) return;
      applyDamage(target, projectile.damage, projectile.ownerPlayerIndex);
      target.flash = 0.3;
      projectile.hit = true;
      landedHit = true;
      makeSparks(projectile.x, projectile.y, projectile.colour, 18, 1.8);
      statusLabel.textContent = `P${projectile.playerIndex + 1} blasts P${target.playerIndex + 1} · ${projectile.damage}`;
    });
    projectiles = projectiles.filter((projectile) => !projectile.hit);
    if (!landedHit) return;
    eliminateFighters();
    updateHud();
    checkWinner();
  }

  function updateMines(delta) {
    if (!mines.length) return;
    let landedHit = false;
    mines.forEach((mine) => {
      if (mine.armed) {
        mine.armedTime += delta;
        const target = fighters.find((fighter) => fighter.alive && !playersAreAllies(fighter.playerIndex, mine.ownerPlayerIndex)
          && Math.hypot(fighter.x - mine.x, fighter.y - mine.y) <= fighter.radius + mine.radius);
        if (!target) return;
        const count = Math.min(mineConfig.maxCount, Math.floor(mine.armedTime));
        const damage = mine.pacifist ? 0 : count * mine.damageMultiplier;
        applyDamage(target, damage, mine.ownerPlayerIndex);
        target.flash = 0.35;
        mine.hit = true;
        landedHit = true;
        makeSparks(mine.x, mine.y, fighterTypes.mine.mine, 24, 2.2);
        statusLabel.textContent = `P${mine.ownerPlayerIndex + 1}'s mine hits P${target.playerIndex + 1} · ${formatDamage(damage)}`;
        return;
      }

      const travelThisFrame = Math.hypot(mine.vx, mine.vy) * delta;
      mine.x += mine.vx * delta;
      mine.y += mine.vy * delta;
      mine.travelRemaining -= travelThisFrame;
      if (mine.x - mine.radius <= 0 || mine.x + mine.radius >= size) {
        mine.vx *= -1;
        mine.x = Math.min(size - mine.radius, Math.max(mine.radius, mine.x));
      }
      if (mine.y - mine.radius <= 0 || mine.y + mine.radius >= size) {
        mine.vy *= -1;
        mine.y = Math.min(size - mine.radius, Math.max(mine.radius, mine.y));
      }
      fighters.filter((fighter) => fighter.alive && fighter.id !== mine.ownerId).forEach((fighter) => {
        const dx = fighter.x - mine.x;
        const dy = fighter.y - mine.y;
        const distance = Math.hypot(dx, dy);
        const touching = distance <= fighter.radius + mine.radius;
        if (!touching) {
          mine.contacts.delete(fighter.id);
          return;
        }
        if (mine.contacts.has(fighter.id)) return;
        const nx = distance > 0.001 ? dx / distance : 1;
        const ny = distance > 0.001 ? dy / distance : 0;
        const approach = mine.vx * nx + mine.vy * ny;
        if (approach > 0) {
          mine.vx -= 2 * approach * nx;
          mine.vy -= 2 * approach * ny;
        }
        mine.x = fighter.x - nx * (fighter.radius + mine.radius + 1);
        mine.y = fighter.y - ny * (fighter.radius + mine.radius + 1);
        mine.contacts.add(fighter.id);
      });
      if (mine.travelRemaining <= 0) {
        mine.armed = true;
        mine.vx = 0;
        mine.vy = 0;
      }
    });
    mines = mines.filter((mine) => !mine.hit);
    if (!landedHit) return;
    eliminateFighters();
    updateHud();
    checkWinner();
  }

  function orbiterPositions(fighter) {
    if (!fighter.orbitCount) return [];
    let remaining = fighter.orbitCount;
    let globalIndex = 0;
    return orbiterConfig.layers.flatMap((layer, layerIndex) => {
      const layerCount = Math.min(remaining, layer.capacity);
      remaining -= layerCount;
      const phaseOffset = layerIndex * 0.22;
      return Array.from({ length: layerCount }, (_, index) => {
        const satelliteIndex = globalIndex;
        globalIndex += 1;
        const angle = fighter.orbitAngle + phaseOffset + (index * Math.PI * 2) / layerCount;
        return {
          x: fighter.x + Math.cos(angle) * layer.radius,
          y: fighter.y + Math.sin(angle) * layer.radius,
          radius: 10,
          index: satelliteIndex,
        };
      });
    });
  }

  function updateOrbiters(delta) {
    const orbiters = fighters.filter((fighter) => fighter.alive && fighter.typeId === 'orbiter');
    if (!orbiters.length) return;
    let landedHit = false;
    orbiters.forEach((orbiter) => {
      orbiter.orbitAngle += delta * orbiter.orbitSpeed;
      const satellites = orbiterPositions(orbiter);
      fighters.filter((target) => target.alive && !playersAreAllies(target.playerIndex, orbiter.playerIndex)).forEach((target) => {
        satellites.forEach((satellite) => {
          const key = `${orbiter.id}:${satellite.index}:${target.id}`;
          const touching = Math.hypot(target.x - satellite.x, target.y - satellite.y) <= target.radius + satellite.radius;
          if (touching && !orbitContacts.has(key)) {
            applyDamage(target, orbiter.pacifist ? 0 : orbiter.damageMultiplier, orbiter.playerIndex);
            target.flash = 0.24;
            landedHit = true;
            orbitContacts.add(key);
            makeSparks(satellite.x, satellite.y, fighterTypes.orbiter.satellite, 8);
            statusLabel.textContent = `P${orbiter.playerIndex + 1}'s satellite hits P${target.playerIndex + 1}`;
          } else if (!touching) {
            orbitContacts.delete(key);
          }
        });
      });
    });
    if (!landedHit) return;
    eliminateFighters();
    updateHud();
    checkWinner();
  }

  function checkWinner() {
    if (roundOver) return;
    const alive = fighters.filter((fighter) => fighter.alive);
    const survivingSides = [...new Set(alive.map((fighter) => teamMode ? playerTeams[fighter.playerIndex] : fighter.playerIndex))];
    if (survivingSides.length > 1) return;
    running = false;
    roundOver = true;
    resolveBet(survivingSides);
    const unlocked = recordCompletedFight(survivingSides);
    pauseButton.textContent = 'Play again';
    const result = !survivingSides.length
      ? 'Draw'
      : teamMode
        ? `${teams[survivingSides[0]].name} team wins`
        : `P${survivingSides[0] + 1} wins`;
    statusLabel.textContent = result;
    message.textContent = unlocked.length ? `${result} · Unlocked: ${unlocked.join(', ')}` : result;
    message.hidden = false;
  }

  function updateGhost(fighter, delta) {
    const targets = fighters.filter((target) => target.alive && !playersAreAllies(target.playerIndex, fighter.playerIndex));
    if (!targets.length) return;
    const target = targets.reduce((nearest, candidate) => {
      const nearestDistance = Math.hypot(nearest.x - fighter.x, nearest.y - fighter.y);
      const candidateDistance = Math.hypot(candidate.x - fighter.x, candidate.y - fighter.y);
      return candidateDistance < nearestDistance ? candidate : nearest;
    });
    const dx = target.x - fighter.x;
    const dy = target.y - fighter.y;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const desiredSpeed = Math.min(780, Math.max(520, distance * 1.35)) * fighter.speedMultiplier;
    const steering = 1 - Math.exp(-1.4 * delta);
    fighter.vx += (((dx / distance) * desiredSpeed) - fighter.vx) * steering;
    fighter.vy += (((dy / distance) * desiredSpeed) - fighter.vy) * steering;
  }

  function updateVendetta(fighter, delta) {
    if (fighter.vendettaTargetPlayer === null) return;
    const targets = fighters.filter((target) => target.alive && target.playerIndex === fighter.vendettaTargetPlayer);
    if (!targets.length) {
      fighter.vendettaTargetPlayer = null;
      fighter.vendettaStoredDamage = 0;
      return;
    }
    const target = targets.reduce((nearest, candidate) => {
      const nearestDistance = Math.hypot(nearest.x - fighter.x, nearest.y - fighter.y);
      const candidateDistance = Math.hypot(candidate.x - fighter.x, candidate.y - fighter.y);
      return candidateDistance < nearestDistance ? candidate : nearest;
    });
    const dx = target.x - fighter.x;
    const dy = target.y - fighter.y;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const pursuitSpeed = 255 * fighter.speedMultiplier;
    const steering = 1 - Math.exp(-2.7 * delta);
    fighter.vx += (((dx / distance) * pursuitSpeed) - fighter.vx) * steering;
    fighter.vy += (((dy / distance) * pursuitSpeed) - fighter.vy) * steering;
  }

  function recoverMinimumSpeed(fighter, delta) {
    const modifierScale = Math.min(1, fighter.speedMultiplier);
    const targetSpeed = minimumFighterSpeed * modifierScale;
    const currentSpeed = Math.hypot(fighter.vx, fighter.vy);
    if (currentSpeed >= targetSpeed) return;
    const nextSpeed = Math.min(targetSpeed, currentSpeed + (speedRecoveryPerSecond * modifierScale * delta));
    const fallbackAngle = starts[fighter.playerIndex].angle;
    const directionX = currentSpeed > 0.001 ? fighter.vx / currentSpeed : Math.cos(fallbackAngle);
    const directionY = currentSpeed > 0.001 ? fighter.vy / currentSpeed : Math.sin(fallbackAngle);
    fighter.vx = directionX * nextSpeed;
    fighter.vy = directionY * nextSpeed;
  }

  function updateGhostContacts(delta) {
    const ghosts = fighters.filter((fighter) => fighter.alive && fighter.typeId === 'ghost');
    if (!ghosts.length) return;
    let landedHit = false;
    ghosts.forEach((ghost) => {
      fighters.filter((target) => target.alive && !playersAreAllies(target.playerIndex, ghost.playerIndex)).forEach((target) => {
        const key = `${ghost.id}:${target.id}`;
        const touching = Math.hypot(target.x - ghost.x, target.y - ghost.y) < target.radius + ghost.radius;
        if (!touching) {
          ghostExposure.delete(key);
          return;
        }
        const exposure = ghostExposure.get(key) || { elapsed: 0, ticks: 0 };
        exposure.elapsed += delta;
        const totalTicks = Math.floor((exposure.elapsed + 0.000001) / 0.1);
        const previousTicks = exposure.ticks;
        let damage = 0;
        for (let tick = previousTicks + 1; tick <= totalTicks; tick += 1) {
          const rate = Math.max(1, Math.ceil((tick * 0.1) - 0.000001));
          damage += 0.1 * rate * ghost.damageMultiplier;
        }
        exposure.ticks = totalTicks;
        ghostExposure.set(key, exposure);
        if (totalTicks === previousTicks) return;
        applyDamage(target, damage, ghost.playerIndex);
        target.flash = 0.12;
        landedHit = true;
        const currentRate = (Math.floor(exposure.elapsed) + 1) * ghost.damageMultiplier;
        statusLabel.textContent = `P${ghost.playerIndex + 1} haunts P${target.playerIndex + 1} · ${formatDamage(damage)} · ${formatDamage(currentRate)}/sec`;
      });
    });
    if (!landedHit) return;
    eliminateFighters();
    updateHud();
    checkWinner();
  }

  function update(delta) {
    elapsedTime += delta;
    renderTimer();
    enforcePerformanceBudget();
    if (Math.floor(elapsedTime * 4) !== Math.floor((elapsedTime - delta) * 4)
      && fighters.some((fighter) => fighter.alive && ['hydra', 'tide', 'tank', 'pulsar', 'mine'].includes(fighter.typeId))) updateHud();
    const alive = fighters.filter((fighter) => fighter.alive);
    alive.forEach((fighter) => {
      if (fighter.typeId === 'rail') {
        updateRailPosition(fighter, delta);
      } else {
        if (fighter.typeId === 'ghost') updateGhost(fighter, delta);
        if (fighter.typeId === 'vendetta') updateVendetta(fighter, delta);
        recoverMinimumSpeed(fighter, delta);
        fighter.x += fighter.vx * delta;
        fighter.y += fighter.vy * delta;
      }
      fighter.flash = Math.max(0, fighter.flash - delta);
      if (fighter.typeId === 'tide' && !fighter.pacifist) {
        const rechargeRate = 0.25 * fighter.maxDamage * fighter.abilityMultiplier;
        fighter.damage = Math.min(fighter.maxDamage, fighter.damage + (rechargeRate * delta));
      }
      if (!['rail', 'ghost'].includes(fighter.typeId)) wallCollisions(fighter);
      if (fighter.typeId === 'fuse') {
        fighter.fireTimer -= delta;
        if (fighter.fireTimer <= 0) spawnProjectile(fighter);
      }
      if (fighter.typeId === 'tank') {
        fighter.fireTimer -= delta;
        if (fighter.fireTimer <= 0) spawnTankBullet(fighter);
      }
      if (fighter.typeId === 'mine') {
        fighter.mineTimer -= delta;
        if (fighter.mineTimer <= 0) throwMine(fighter);
      }
      if (fighter.typeId === 'pulsar') {
        fighter.pulseTimer -= delta;
        if (fighter.pulseTimer <= 0) spawnPulse(fighter);
      }
      if (fighter.typeId === 'hydra') {
        if (fighter.health >= 1) {
          fighter.splitTimer -= delta;
          if (fighter.splitTimer <= 0) splitHydra(fighter);
        }
      }
    });
    for (let aIndex = 0; aIndex < alive.length; aIndex += 1) {
      for (let bIndex = aIndex + 1; bIndex < alive.length; bIndex += 1) {
        fighterCollision(alive[aIndex], alive[bIndex]);
      }
    }
    alive.filter((fighter) => fighter.typeId === 'rail').forEach((fighter) => updateRailPosition(fighter, 0));
    updateGhostContacts(delta);
    updateTronTrails(delta);
    updateOrbiters(delta);
    updateLasers(delta);
    updatePulses(delta);
    updateProjectiles(delta);
    updateMines(delta);
    sparks.forEach((spark) => {
      spark.x += spark.vx * delta;
      spark.y += spark.vy * delta;
      spark.vx *= 0.97;
      spark.vy *= 0.97;
      spark.life -= delta;
    });
    sparks = sparks.filter((spark) => spark.life > 0);
  }

  function drawFighter(fighter) {
    if (!fighter.alive) return;
    const type = fighterTypes[fighter.typeId];
    context.save();
    if (fighter.typeId === 'ghost') context.globalAlpha = 0.68;
    context.shadowColor = type.colour;
    context.shadowBlur = fighter.flash ? 30 : fighter.typeId === 'vendetta' && fighter.vendettaTargetPlayer !== null ? 24 : 12;
    context.beginPath();
    context.arc(fighter.x, fighter.y, fighter.radius + (fighter.flash ? 3 : 0), 0, Math.PI * 2);
    context.fillStyle = type.colour;
    context.fill();
    context.shadowBlur = 0;
    context.lineWidth = teamMode ? 7 : 4;
    context.strokeStyle = teamMode ? teams[playerTeams[fighter.playerIndex]].colour : playerAccents[fighter.playerIndex];
    context.stroke();
    context.lineWidth = 2;
    context.strokeStyle = '#0e4749';
    context.stroke();
    context.fillStyle = '#0e4749';
    context.font = `900 ${Math.max(13, fighter.radius * 0.48)}px ui-sans-serif, system-ui`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(`P${fighter.playerIndex + 1}`, fighter.x, fighter.y + 1);
    context.restore();
  }

  function drawProjectile(projectile) {
    context.save();
    context.shadowColor = projectile.colour;
    context.shadowBlur = 15;
    context.beginPath();
    context.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
    context.fillStyle = '#edd9a3';
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = projectile.colour;
    context.stroke();
    context.shadowBlur = 0;
    context.fillStyle = '#0e4749';
    context.font = '900 11px ui-sans-serif, system-ui';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(String(projectile.damage), projectile.x, projectile.y + 0.5);
    context.restore();
  }

  function drawMine(mine) {
    context.save();
    context.shadowColor = fighterTypes.mine.mine;
    context.shadowBlur = mine.armed ? 12 + Math.min(18, mine.armedTime * 2) : 6;
    context.beginPath();
    context.arc(mine.x, mine.y, mine.radius, 0, Math.PI * 2);
    context.fillStyle = mine.armed ? fighterTypes.mine.mine : '#7f919b';
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = '#0e4749';
    context.stroke();
    context.shadowBlur = 0;
    context.fillStyle = '#0e4749';
    context.font = '900 11px ui-sans-serif, system-ui';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(mine.armed ? String(Math.min(mineConfig.maxCount, Math.floor(mine.armedTime))) : '•', mine.x, mine.y + 0.5);
    context.restore();
  }

  function drawTrail(fighter) {
    if (!fighter.alive || fighter.typeId !== 'tron' || fighter.trailPoints.length < 2) return;
    context.save();
    context.beginPath();
    context.moveTo(fighter.trailPoints[0].x, fighter.trailPoints[0].y);
    fighter.trailPoints.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    context.lineWidth = 7;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = fighterTypes.tron.colour;
    context.shadowColor = '#edd9a3';
    context.shadowBlur = 12;
    context.stroke();
    context.restore();
  }

  function drawLaser(fighter) {
    if (!fighter.alive || !['rail', 'sweep'].includes(fighter.typeId)) return;
    const beam = fighter.typeId === 'rail' ? railBeam(fighter) : sweepBeam(fighter);
    const laserColour = fighterTypes[fighter.typeId].laser;
    context.save();
    context.beginPath();
    context.moveTo(beam.start.x, beam.start.y);
    context.lineTo(beam.end.x, beam.end.y);
    context.lineWidth = 4;
    context.strokeStyle = laserColour;
    context.shadowColor = laserColour;
    context.shadowBlur = 14;
    context.globalAlpha = 0.78 + (Math.sin(elapsedTime * 22) * 0.12);
    context.stroke();
    context.restore();
  }

  function drawPulse(pulse) {
    context.save();
    context.beginPath();
    context.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
    context.lineWidth = 6;
    context.strokeStyle = fighterTypes.pulsar.pulse;
    context.shadowColor = fighterTypes.pulsar.pulse;
    context.shadowBlur = 16;
    context.globalAlpha = Math.max(0.15, 1 - (pulse.radius / pulse.maxRadius));
    context.stroke();
    context.restore();
  }

  function drawSatellites(fighter) {
    if (!fighter.alive || fighter.typeId !== 'orbiter') return;
    orbiterPositions(fighter).forEach((satellite) => {
      context.save();
      context.shadowColor = fighterTypes.orbiter.satellite;
      context.shadowBlur = 10;
      context.beginPath();
      context.arc(satellite.x, satellite.y, satellite.radius, 0, Math.PI * 2);
      context.fillStyle = fighterTypes.orbiter.satellite;
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#0e4749';
      context.stroke();
      context.restore();
    });
  }

  function draw() {
    context.clearRect(0, 0, size, size);
    sparks.forEach((spark) => {
      context.globalAlpha = Math.min(1, spark.life * 3);
      context.fillStyle = spark.colour;
      context.fillRect(spark.x - 3, spark.y - 3, 6, 6);
    });
    context.globalAlpha = 1;
    pulses.forEach(drawPulse);
    fighters.forEach(drawLaser);
    fighters.forEach(drawTrail);
    fighters.forEach(drawSatellites);
    projectiles.forEach(drawProjectile);
    mines.forEach(drawMine);
    fighters.forEach(drawFighter);
  }

  function frame(time) {
    const delta = Math.min((time - previousTime) / 1000, 0.025);
    previousTime = time;
    if (running) update(delta);
    draw();
    requestAnimationFrame(frame);
  }

  slotButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      selectedPlayer = index;
      renderSlots();
    });
  });

  teamToggle.addEventListener('click', () => {
    teamMode = !teamMode;
    renderSlots();
    resetRound();
  });

  teamSelects.forEach((select, index) => {
    select.addEventListener('change', () => {
      playerTeams[index] = select.value;
      renderSlots();
      resetRound();
    });
  });

  modifierSelects.forEach((select, index) => {
    select.addEventListener('change', () => {
      playerModifiers[index] = select.value;
      resetRound();
    });
  });

  particleToggle.addEventListener('change', () => {
    particlesEnabled = particleToggle.checked;
    if (!particlesEnabled) sparks = [];
    particleStatus.textContent = 'Particle effects';
  });

  choiceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const typeId = button.dataset.fighterChoice;
      if (!typeId || !progression.unlockedFighters.includes(typeId)) return;
      selections[selectedPlayer] = typeId;
      renderSlots();
      resetRound();
    });
  });

  document.querySelectorAll('[data-remove-player]').forEach((button) => {
    button.addEventListener('click', () => {
      const playerIndex = Number(button.dataset.removePlayer);
      selections[playerIndex] = null;
      selectedPlayer = Math.max(0, playerIndex - 1);
      renderSlots();
      resetRound();
    });
  });

  pauseButton.addEventListener('click', () => {
    if (roundOver) {
      resetRound();
      return;
    }
    if (!roundStarted) {
      roundStarted = true;
      running = true;
      pauseButton.textContent = 'Pause';
      statusLabel.textContent = 'Fight!';
      message.hidden = true;
      previousTime = performance.now();
      renderBetting();
      return;
    }
    running = !running;
    pauseButton.textContent = running ? 'Pause' : 'Resume';
    statusLabel.textContent = running ? 'Fight!' : 'Paused';
    message.textContent = 'Paused';
    message.hidden = running;
    previousTime = performance.now();
    renderBetting();
  });

  resetButton.addEventListener('click', resetRound);
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1 || !/[a-z]/i.test(event.key)) return;
    cheatBuffer = `${cheatBuffer}${event.key.toUpperCase()}`.slice(-6);
    if (cheatBuffer.endsWith('IDCLIP')) unlockFromCheat('IDCLIP');
    if (cheatBuffer.endsWith('IDKFA')) unlockFromCheat('IDKFA');
  });
  new ResizeObserver(resize).observe(canvas);
  renderUnlockState();
  resize();
  resetRound();
  requestAnimationFrame(frame);
})();

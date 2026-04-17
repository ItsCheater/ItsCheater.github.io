
// PARTICLES
(() => {
    const wrap = document.getElementById('particles-wrap');
    if (wrap) {
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            const s = Math.random() * 5 + 2;
            p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-duration:${Math.random() * 15 + 12}s;animation-delay:${Math.random() * 8}s`;
            wrap.appendChild(p);
        }
    }
})();

// INTERSECTION OBSERVER
const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => { e.target.classList.add('visible') }, e.target.dataset.delay || 0);
            observer.unobserve(e.target);
        }
    });
}, { threshold: .08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
    const siblings = el.parentElement.querySelectorAll('.reveal');
    const idx = Array.from(siblings).indexOf(el);
    el.dataset.delay = idx * 80;
    observer.observe(el);
});

// HAMBURGER MENU
const hbtn = document.getElementById('hamburger-btn');
const mnav = document.getElementById('mobile-nav');
let mopen = false;

if (hbtn && mnav) {
    hbtn.addEventListener('click', () => {
        mopen = !mopen;
        mnav.style.display = mopen ? 'flex' : 'none';
        hbtn.innerHTML = mopen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        mnav.style.display = 'none';
        mopen = false;
        hbtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }));
}

// BACK TO TOP
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
});

// MODIFIER FILTER
document.querySelectorAll('.mod-filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.mod-filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const f = this.dataset.filter;
        document.querySelectorAll('.mod-card').forEach(c => {
            c.style.display = (f === 'all' || c.dataset.category === f) ? '' : 'none';
        });
    });
});

// CONFIGURATION TAB SWITCHING
document.querySelectorAll('.config-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Update active tab
        document.querySelectorAll('.config-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Hide all config blocks
        document.querySelectorAll('.config-file-block').forEach(block => {
            block.classList.remove('active');
        });
        
        // Show selected config
        const configId = this.dataset.config;
        const targetBlock = document.getElementById(`config-${configId}`);
        if (targetBlock) {
            targetBlock.classList.add('active');
        }
    });
});

// CONFIG COPY BUTTONS
document.querySelectorAll('.config-copy').forEach(btn => {
    btn.addEventListener('click', function() {
        const configType = this.dataset.config;
        // In a real implementation, you would have the full config content
        // For now, we'll just show a success message
        const origText = this.innerHTML;
        this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        this.style.background = 'rgba(34,197,94,0.2)';
        this.style.borderColor = 'rgba(34,197,94,0.4)';
        this.style.color = '#22c55e';
        
        setTimeout(() => {
            this.innerHTML = origText;
            this.style.background = '';
            this.style.borderColor = '';
            this.style.color = '';
        }, 2000);
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = `✓ Copied ${configType}.yml configuration!`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    });
});

// SEARCH FUNCTIONALITY
const si = document.getElementById('search-input');
if (si) {
    si.addEventListener('input', function () {
        const q = this.value.toLowerCase().trim();
        const items = document.querySelectorAll('.searchable-item');
        if (!q) {
            items.forEach(i => i.classList.remove('search-hidden'));
            return;
        }
        items.forEach(i => {
            const t = i.innerText.toLowerCase();
            i.classList.toggle('search-hidden', !t.includes(q));
        });
    });
}

// COPY BUTTONS (config)
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const target = document.getElementById(this.dataset.target);
        if (!target) return;
        const text = target.innerText;
        navigator.clipboard.writeText(text).then(() => {
            const orig = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            this.classList.add('copied');
            setTimeout(() => {
                this.innerHTML = orig;
                this.classList.remove('copied');
            }, 2000);
        });
    });
});

// ========== CONFIG VIEWER WITH PROPER GUIDE ==========

// Store all config file contents (raw)
const configContents = {
'config.yml': `# ═══════════════════════════════════════════════════════════════════
#                    MACE ROULETTE - MAIN CONFIG
# ═══════════════════════════════════════════════════════════════════

# LICENSE SETTINGS
# Open a ticket on Discord to get your license key
license: "YOUR-LICENSE-KEY-HERE"

# Database Configuration
# Supports MySQL/MariaDB for cross-server statistics
database:
  enabled: false  # Set to true to enable database storage
  host: "localhost"
  port: 3306
  database: ""
  username: "root"
  password: ""
  use-ssl: false
  connection-pool:
    max-pool-size: 10         # Maximum database connections
    min-idle: 5               # Minimum idle connections
    connection-timeout: 30000 # Milliseconds before timeout
    idle-timeout: 600000      # Milliseconds before idle connection timeout
    max-lifetime: 1800000     # Milliseconds before connection refresh

# Statistics Settings
stats:
  enabled: true               # Master switch for statistics
  save-interval: 180          # Seconds between automatic saves (3 minutes)
  save-on-quit: true          # Save player stats immediately on quit
  leaderboard-update: 60      # Seconds between leaderboard refreshes
  cache-leaderboards: true    # Store leaderboards in memory
  cache-size: 500             # Maximum players in memory cache

# Showdown Settings
showdown:
  enabled: true
  duration: 40                 # Ticks (20 ticks = 1 second) - 40 = 2 seconds
  title: "&lꜱʜᴏᴡᴅᴏᴡɴ"          # Fancy font title
  subtitle: "&l2 ᴀʟɪᴠᴇ"         # Fancy font subtitle
  color-change-speed: 2        # Ticks between color changes

# Void Settings
void:
  enabled: true                # Enable void death detection
  level: -120                  # Y-coordinate where players die

# Game Settings
game:
  min-players: 2               # Minimum players to start
  max-players: 100             # Maximum players per game
  mace-countdown: 10s          # Minimum seconds for mace holders, usage: 10s,60s,1m,60m.

# Queue Settings
queue:
  auto-start-delay: 10          # Seconds delay before auto-starting
  next-game-delay: 15          # Seconds before next game starts

# ═══════════════════════════════════════════════════════════════════
#                    MULTI-WORLD CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Server Type Configuration
# server: Normal behavior - plugin works everywhere
# worlds: Plugin only works in specific world
server-type: server

# Worlds Mode Configuration (only used when server-type: worlds)
worlds-mode:
  # The world where the game should run
  world: "world_name"

  # Override teleportation: If true, prevents plugins from teleporting players out of game world on death
  override-teleportation: false

  # Where players are sent when they leave ( will be sat automatically from the plugin )
  leave-location:
    world: "lobby"
    x: 0
    y: 100
    z: 0
    yaw: 0
    pitch: 0`,
'arena.yml': `# ═══════════════════════════════════════════════════════════════════
#                       ARENA CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Arena Center Location
# Format: world,x,y,z,yaw,pitch
center: ""

# Arena Facing Direction (where players look when spawned)
facing: ""

# Modifiers Configuration
modifiers:
  enabled: true
  list:
    # Map Modifiers - Changes arena floor
    - ["Icy Land", "&f&lIcy Land"]
    - ["Glass Map", "&f&lGlass Map"]
    - ["Slime Map", "&f&lSlime Map"]
    - ["Donut Map", "&f&lDonut Map"]
    - ["Transparent Arena", "&f&lTransparent Arena"]

    # Gameplay Modifiers - Changes mechanics
    - ["Low Gravity", "&f&lLow Gravity"]
    - ["Knockback Boost", "&f&lKnockback Boost"]
    - ["Darkness", "&f&lDarkness"]
    - ["Thunderstorm", "&f&lThunderstorm"]
    - ["Speed Frenzy", "&f&lSpeed Frenzy"]
    - ["Jump Boost", "&f&lJump Boost"]
    - ["Explosive Hits", "&f&lExplosive Hits"]
    - ["Size Growth", "&f&lSize Growth"]
    - ["Random Sizes", "&f&lRandom Sizes"]
    - ["Wind Charge Storm", "&f&lWind Charge Storm"]
    - ["Elytra Launch", "&f&lElytra Launch"]
    - ["Player Stacks", "&f&lPlayer Stacks"]
    - ["TNT Rain", "&f&lTNT Rain"]

    # Mace Modifiers - Changes mace holder effects
    - ["Tiny Mace", "&f&lTiny Mace"]
    - ["Big Mace", "&f&lBig Mace"]
    - ["Mace or Die", "&f&lMace or Die"]
    - ["Double Mace", "&f&lDouble Mace"]
    - ["Triple Mace", "&f&lTriple Mace"]
    - ["Shockwave Mace", "&f&lShockwave Mace"]
    - ["Mace Drop", "&f&lMace Drop"]
    - ["Windburst Mace", "&f&lWindburst Mace"]`,
    'language.yml': `# ═══════════════════════════════════════════════════════════════════
#                    LANGUAGE CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Global prefix
prefix: "&6[&eᴍᴀᴄᴇ ʀᴏᴜʟᴇᴛᴛᴇ&6]"

# Admin Command Messages
admin:
  config-reloaded: "{prefix} &aᴄᴏɴꜰɪɢᴜʀᴀᴛɪᴏɴ ʀᴇʟᴏᴀᴅᴇᴅ!"
  build-mode-enabled: "&aʙᴜɪʟᴅ ᴍᴏᴅᴇ: &eᴇɴᴀʙʟᴇᴅ"
  build-mode-disabled: "&cʙᴜɪʟᴅ ᴍᴏᴅᴇ: &eᴅɪꜱᴀʙʟᴇᴅ"

# Error Messages
errors:
  no-permission: "&cʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ ᴛᴏ ᴜꜱᴇ ᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ!"
  player-only: "&cᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜꜱᴇᴅ ʙʏ ᴘʟᴀʏᴇʀꜱ!"
  arena-not-set: "&cᴀʀᴇɴᴀ ɴᴏᴛ ꜱᴇᴛ! ᴀᴅᴍɪɴ ᴍᴜꜱᴛ ꜱᴇᴛ ᴀʀᴇɴᴀ ᴄᴇɴᴛᴇʀ ꜰɪʀꜱᴛ."

# Game Messages
game:
  # Start messages
  starting: "{prefix} &eɢᴀᴍᴇ ꜱᴛᴀʀᴛɪɴɢ ɪɴ {seconds} ꜱᴇᴄᴏɴᴅꜱ! &7({players} ᴘʟᴀʏᴇʀꜱ)"
  not-enough-players: "{prefix} &cɴᴏᴛ ᴇɴᴏᴜɢʜ ᴘʟᴀʏᴇʀꜱ ᴛᴏ ꜱᴛᴀʀᴛ! ɴᴇᴇᴅ ᴀᴛ ʟᴇᴀꜱᴛ {min}"
  mace-hit-required: "&cʏᴏᴜ ᴍᴜꜱᴛ ᴜꜱᴇ ᴛʜᴇ ᴍᴀᴄᴇ ᴛᴏ ʜɪᴛ!"
  mace-hit-success: "&aʏᴏᴜ ʜɪᴛ ᴡɪᴛʜ ᴛʜᴇ ᴍᴀᴄᴇ! ʏᴏᴜ ꜱᴜʀᴠɪᴠᴇ!"
  mace-failed: "&cʏᴏᴜ ꜰᴀɪʟᴇᴅ ᴛᴏ ꜱᴜᴄᴄᴇᴇᴅ ɪɴ 10 ꜱᴇᴄᴏɴᴅꜱ!"
  mace-killed-someone: "&aʏᴏᴜ ᴋɪʟʟᴇᴅ ꜱᴏᴍᴇᴏɴᴇ! ʏᴏᴜ ᴡɪʟʟ ꜱᴜʀᴠɪᴠᴇ!"
  too-many-players: "{prefix} &cᴛᴏᴏ ᴍᴀɴʏ ᴘʟᴀʏᴇʀꜱ! &7ᴏɴʟʏ ᴛʜᴇ ꜰɪʀꜱᴛ {max} ᴡᴇʀᴇ ᴀᴅᴅᴇᴅ ᴛᴏ ᴛʜᴇ ɢᴀᴍᴇ."
  mace-pickup: "&6&l⚔ &e{player} &6&lᴘɪᴄᴋᴇᴅ ᴜᴘ ᴀ ᴍᴀᴄᴇ! ⚔"
  burst-mace-kill: "&aᴛɪᴍᴇʀ ᴡᴀꜱ ʀᴇꜱᴇᴛ!"

  # Mace countdown messages (action bar)
  mace-hit-countdown: "&c⚔ {seconds}s &eleft to HIT someone!"
  mace-kill-countdown: "&c⚔ {seconds}s &eleft to KILL someone!"
  
  # Mace messages
  maces-selected: "&c&l⚔ ᴍᴀᴄᴇꜱ ꜱᴇʟᴇᴄᴛᴇᴅ! &e{count} ᴘʟᴀʏᴇʀꜱ ʜᴀᴠᴇ ᴍᴀᴄᴇꜱ!"

  # Round start message
  fight-title: "&a&lFIGHT!"      # &a = green, can be changed to any color
  fight-subtitle: ""             # Empty by default, can add subtitle if desired

  # Arena messages
  arena-shrink: "&eᴀʀᴇɴᴀ ꜱʜʀᴜɴᴋ ʙʏ: &c{amount} &eʙʟᴏᴄᴋꜱ"
 
  # Win messages
  winner: "&6⚔ {player} ᴡɪɴꜱ ᴛʜᴇ ɢᴀᴍᴇ! ⚔"
  draw: "&c⚔ ɢᴀᴍᴇ ᴇɴᴅᴇᴅ ɪɴ ᴀ ᴅʀᴀᴡ! ⚔"
  reset-by-admin: "&c&lɢᴀᴍᴇ ʀᴇꜱᴇᴛ ʙʏ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴛᴏʀ"

  # Round messages
  round-announce:
    line1: "&7-------------------------------"
    line2: "&6&lᴍᴀᴄᴇ ʀᴏᴜʟᴇᴛᴛᴇ"
    line3: "&eᴍᴏᴅɪꜰɪᴇʀꜱ: &f{modifier}"
    line4: "&bʀᴏᴜɴᴅ: &f{round}"
    line5: "&7-------------------------------"

# Level System Messages
level:
  progress-gained: "&7⚔ &a+1 Progress &7(&f{progress}/20&7)"

  level-up-player:
    - "&7━━━━━━━━━━━━━━━━━━━━━━"
    - "&6&lʟᴇᴠᴇʟ ᴜᴘ! &e{old} &7→ &a{new}"
    - "&7━━━━━━━━━━━━━━━━━━━━━━"

  tier-upgrade-player:
    - "&7════════════════════════"
    - "&6&lᴛɪᴇʀ ᴜᴘɢʀᴀᴅᴇ! &e{old} &7→ &6&l{new}"
    - "&7════════════════════════"

  level-up-broadcast:
    - "&7━━━━━━━━━━━━━━━━━━━━━━"
    - "&6&lʟᴇᴠᴇʟ ᴜᴘ!"
    - "&e{player} &7ʜᴀꜱ ʟᴇᴠᴇʟᴇᴅ ᴜᴘ ꜰʀᴏᴍ &f{old} &7ᴛᴏ &f{new}"
    - "&7━━━━━━━━━━━━━━━━━━━━━━"

# Queue Messages
queue:
  joined: "&aʏᴏᴜ ᴊᴏɪɴᴇᴅ ᴛʜᴇ ǫᴜᴇᴜᴇ!"
  left: "&eʏᴏᴜ ʟᴇꜰᴛ ᴛʜᴇ ǫᴜᴇᴜᴇ!"
  action-bar: "&aʏᴏᴜ ᴀʀᴇ ᴄᴜʀʀᴇɴᴛʟʏ ɪɴ ǫᴜᴇᴜᴇ"

# Spectator Messages
spectator:
  entered: "&d&lꜱᴘᴇᴄᴛᴀᴛᴏʀ ᴍᴏᴅᴇ"
  enter-subtitle: "&7ᴇɴᴛᴇʀ ᴘʀᴏᴛᴇᴄᴛɪᴏɴ ᴀʀᴇᴀ ᴛᴏ ʀᴇᴛᴜʀɴ"
  
  returned: "&a&lʙᴀᴄᴋ ᴛᴏ ʟᴏʙʙʏ"
  return-subtitle: "&7ʏᴏᴜ ᴀʀᴇ ɴᴏ ʟᴏɴɢᴇʀ ꜱᴘᴇᴄᴛᴀᴛɪɴɢ"
  
  border-exceeded: "&c&lᴡᴏʀʟᴅʙᴏʀᴅᴇʀ ᴇxᴄᴇᴇᴅᴇᴅ!"
  border-teleport: "&eᴛᴇʟᴇᴘᴏʀᴛɪɴɢ ʙᴀᴄᴋ ᴛᴏ ꜱᴘᴀᴡɴ"
  
  cannot-spectate-ingame: "&cʏᴏᴜ ᴄᴀɴ'ᴛ ꜱᴘᴇᴄᴛᴀᴛᴇ ᴡʜɪʟᴇ ɪɴ ɢᴀᴍᴇ!"

# Coin Messages
coins:
  icon: "✪"

# Cosmetics Messages
cosmetics:
  purchase-success: "&aᴘᴜʀᴄʜᴀꜱᴇᴅ {cos} ꜰᴏʀ {price} {icon}"
  not-enough-coins: "&cɴᴏᴛ ᴇɴᴏᴜɢʜ ᴄᴏɪɴꜱ! ɴᴇᴇᴅ {price} {icon}"
  not-enough-level: "&cʏᴏᴜ ɴᴇᴇᴅ {level} ᴛᴏ ᴘᴜʀᴄʜᴀꜱᴇ ᴛʜɪꜱ!"
  select-success: "&a{cos} ꜱᴇʟᴇᴄᴛᴇᴅ"
  remove-success: "&7ᴄᴏꜱᴍᴇᴛɪᴄ ʀᴇᴍᴏᴠᴇᴅ"

# Training Messages
training:
  entered: "&a&lᴛʀᴀɪɴɪɴɢ ᴀʀᴇɴᴀ"
  enter-subtitle: "&7ᴡᴀʟᴋ ᴛᴏ ꜱᴘᴀᴡɴ ᴛᴏ ʟᴇᴀᴠᴇ"
  left: "&e&lʟᴇꜰᴛ ᴛʀᴀɪɴɪɴɢ"
  left-subtitle: "&7ʏᴏᴜ ᴀʀᴇ ʙᴀᴄᴋ ɪɴ ʟᴏʙʙʏ"`,
    'others.yml': `# ═══════════════════════════════════════════════════════════════════
#                    MISCELLANEOUS CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Chat Rewards
# Players earn coins for saying GL at game start and GG at game end
chat-rewards:
  enabled: true
  coins-per-message: 5
  window-seconds: 10               # Time window to say GL/GG after game start/end
  formatted-message: "&e&l{message} &a+{coins} {icon}"
  messages:
    gl:                            # Messages that trigger GL reward
      - "gl"
      - "GL"
      - "good luck"
      - "goodluck"
    gg:                            # Messages that trigger GG reward
      - "gg"
      - "GG"
      - "good game"
      - "goodgame"

# World Border Protection
# Spectators outside worldborder are teleported back
worldborder:
  enabled: true
  check-interval: 40                # Ticks between border checks (20 ticks = 1 second)`,
    'scoreboard.yml': `# ═══════════════════════════════════════════════════════════════════
#                     SCOREBOARD CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Scoreboard Settings
scoreboard:
  enabled: true  # Set to false to completely disable the scoreboard

# Title
title: "&6&lᴍᴀᴄᴇ ʀᴏᴜʟᴇᴛᴛᴇ"

# Game Scoreboard Lines
# Shown when player is in an active game
game:
  lines:
    - "&7ɪɢɴ: &f{player-name}"
    - "&7ʟᴇᴠᴇʟ: &f{level}"
    - "&7ᴘʀᴏɢʀᴇꜱꜱ: {progress-bar}"
    - ""
    - "&aꜱᴛᴀᴛᴜꜱ: &cɪɴ ɢᴀᴍᴇ"
    - "{countdown-line}"
    - "&cᴀʟɪᴠᴇ: &f{alive}"
    - "&bʀᴏᴜɴᴅ: &f{round}"
    - ""
    - "&eᴘɪxᴇʟ-ᴍᴄ.ɴᴇᴛ"

# Lobby Scoreboard Lines
# Shown when player is in lobby/waiting
lobby:
  lines:
    - "&7ɪɢɴ: &f{player-name}"
    - "&7ʟᴇᴠᴇʟ: &f{level}"
    - "&7ᴘʀᴏɢʀᴇꜱꜱ: {progress-bar}"
    - ""
    - "&aꜱᴛᴀᴛᴜꜱ: &eᴡᴀɪᴛɪɴɢ"
    - "&dɪɴ ǫᴜᴇᴜᴇ: &f{queue-size}"
    - "&9ᴏɴʟɪɴᴇ: &f{online}"
    - "&6ᴘʟᴀʏɪɴɢ: &f{playing}"
    - ""
    - "&eᴘɪxᴇʟ-ᴍᴄ.ɴᴇᴛ"

# If empty, countdown will not appear
countdown-line: "&eɴᴇxᴛ ʀᴏᴜɴᴅ: &f{seconds}ꜱ"

# ═══════════════════════════════════════════════════════════════════
# Available placeholders:
# {player-name}  - Player's name
# {level}        - Player's level (Bronze I, Silver II, etc. with colors)
# {progress-bar} - Progress bar [|||||░░░░░░░░░░░░░░░]
# {progress}     - Current progress number (0-20)
# {queue-size}   - Number of players in queue
# {online}       - Total online players
# {playing}      - Players currently in game/alive
# {alive}        - Players still alive in game
# {round}        - Current round number
# {seconds}      - Countdown seconds
# And also you can use any place holder from placeholderAPI
# ═══════════════════════════════════════════════════════════════════`,
'levels.yml': `# ═══════════════════════════════════════════════════════════════════
#                     LEVEL SYSTEM CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Level Tiers Configuration
# Format: [identifier, display_name]
# identifier: Internal name used in code (PLEASE DO NOT CHANGE)
# display_name: What players see in chat/menus (includes color codes)

list:
  # Tier 0: Bronze (Levels I-X)
  - ["Bronze", "&6&lBronze"]

  # Tier 1: Silver (Levels I-X)
  - ["Silver", "&7&lSilver"]

  # Tier 2: Gold (Levels I-X)
  - ["Gold", "&6&lGold"]

  # Tier 3: Platinum (Levels I-X)
  - ["Platinum", "&b&lPlatinum"]

  # Tier 4: Diamond (Levels I-X)
  - ["Diamond", "&b&lDiamond"]

  # Tier 5: Master (Levels I-X)
  - ["Master", "&d&lMaster"]

  # Tier 6: Elite (Levels I-X)
  - ["Elite", "&e&lElite"]

  # Tier 7: Legend (Levels I-X)
  - ["Legend", "&e&lLegend"]

  # Tier 8: CHAMPION (No level numbers)
  - ["Champion", "&c&lCHAMPION"]

# Level Number Format
# Roman numerals are default, but you can change the format
# Available placeholders:
#   {number} - the level number (1-10)
#   {roman} - the level number in Roman numerals (I, II, III, IV, V, VI, VII, VIII, IX, X)
level-number-format: "{roman}"

# Progress Bar Settings
progress-bar:
  filled-character: "|"
  empty-character: "|"
  filled-color: "&a"
  empty-color: "&7"
  left-bracket: "&8["
  right-bracket: "&8]"`,
    'spawn.yml': `# ═══════════════════════════════════════════════════════════════════
#                       SPAWN CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Main Spawn Location
# Format: world,x,y,z,yaw,pitch
spawn:
  location: ""

# Spectator Head Location
# Where players click to enter spectator mode
spectator:
  head-location: ""

# Protection Area (Safe Zone - No PVP, No Damage)
protection:
  pos1: ""
  pos2: ""`,
    'training.yml': `# ═══════════════════════════════════════════════════════════════════
#                     TRAINING ARENA CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

training:
  enabled: true
  
  # Player Training Area
  # Where players go to practice
  area:
    pos1: ""
    pos2: ""
  
  # Golem Spawn Area
  # Where iron golems will spawn for training
  entity:
    pos1: ""
    pos2: ""
  
  # Golem Settings
  golem:
    # Number of golems to maintain
    # If specific-block is true, this is automatically set to the number of matching blocks
    count: 30
    health: 4.0                    # Health points (4.0 = 2 hearts)
    respawn-delay: 20              # Ticks between respawns (20 = 1 second)
    wind-charge-cooldown: 20       # Ticks between uses (20 = 1 second)

    # If true, golems will only spawn on the blocks listed below
    # The count will automatically be set to the number of matching blocks in the entity area
    specific-block: false

    # List of blocks where golems can spawn (only used if specific-block: true)
    # Format: Material names (case insensitive)
    block-list:
      - "REDSTONE_BLOCK"
      - "BEDROCK"
      - "DIAMOND_BLOCK"
      - "EMERALD_BLOCK"
      - "GOLD_BLOCK"`,
    'Items/cosmetics.yml': `# ═══════════════════════════════════════════════════════════════════
#                     COSMETICS ITEM CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Cosmetics Item Settings
# This item opens the cosmetics shop GUI
cosmetics-item:
  material: "CHEST"                       # Base material
  item_model: "minecraft:chest"           # Change to "maceroulette:cosmetics" for custom model (EXAMPLE)
  slot: 4
  action: "COSMETICS_MENU_OPEN"           # What happens when clicked
  name: "&dᴄᴏꜱᴍᴇᴛɪᴄꜱ"
  lore:
    - "&7ʀɪɢʜᴛ ᴄʟɪᴄᴋ ᴛᴏ ᴏᴘᴇɴ"`,
    'Items/profile.yml': `# ═══════════════════════════════════════════════════════════════════
#                       PROFILE ITEM CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Profile Item Settings
# This item opens the player stats and leaderboards GUI
profile-item:
  material: "NETHER_STAR"                 # Base material
  item_model: "minecraft:nether_star"     # Change to "maceroulette:profile" for custom model (EXAMPLE)
  slot: 0
  action: "PROFILE_MENU_OPEN"             # What happens when clicked
  name: "&dᴘʀᴏꜰɪʟᴇ"
  lore:
    - "&7ʀɪɢʜᴛ ᴄʟɪᴄᴋ ᴛᴏ ᴠɪᴇᴡ ʏᴏᴜʀ ꜱᴛᴀᴛꜱ"
    - "&7ᴀɴᴅ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅꜱ"`,
    'Items/queue.yml': `# ═══════════════════════════════════════════════════════════════════
#                       QUEUE ITEM CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Queue Item Settings
# This item toggles joining/leaving the game queue

# Slot position for queue item (same for both states)
slot: 8

# Item configuration when player is NOT in queue
not-in-queue:
  material: "STICK"                       # Base material
  item_model: "minecraft:stick"           # Change to "maceroulette:queue_out" for custom model (EXAMPLE)
  action: "QUEUE_TOGGLE"                  # What happens when clicked
  name: "&cǫᴜᴇᴜᴇ"
  lore:
    - "&7ʀɪɢʜᴛ ᴄʟɪᴄᴋ ᴛᴏ ᴊᴏɪɴ ǫᴜᴇᴜᴇ"
    - "&7ꜱᴛᴀᴛᴜꜱ: &cɴᴏᴛ ɪɴ ǫᴜᴇᴜᴇ"

# Item configuration when player IS in queue
in-queue:
  material: "BREEZE_ROD"                   # Base material
  item_model: "minecraft:breeze_rod"       # Change to "maceroulette:queue_in" for custom model (EXAMPLE)
  action: "QUEUE_TOGGLE"                   # What happens when clicked
  name: "&aǫᴜᴇᴜᴇ"
  lore:
    - "&7ʀɪɢʜᴛ ᴄʟɪᴄᴋ ᴛᴏ ʟᴇᴀᴠᴇ ǫᴜᴇᴜᴇ"
    - "&7ꜱᴛᴀᴛᴜꜱ: &aɪɴ ǫᴜᴇᴜᴇ"`,
    'Items/training.yml': `# ═══════════════════════════════════════════════════════════════════
#                     TRAINING ITEMS CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Training Items Settings
# Items given to players when they enter training mode

# Training Mace Configuration
mace:
  material: "MACE"                         # Base material
  item_model: "minecraft:mace"             # Change to "maceroulette:training_mace" for custom model (EXAMPLE)
  slot: 0
  action: "TRAINING_MACE"
  unbreakable: true
  name: "&6ᴛʀᴀɪɴɪɴɢ ᴍᴀᴄᴇ"
  lore:
    - "&7ᴘʀᴀᴄᴛɪᴄᴇ ʏᴏᴜʀ ꜱᴋɪʟʟꜱ"
    - "&7ᴜꜱᴇ ᴛʜɪꜱ ᴛᴏ ᴘʀᴀᴄᴛɪᴄᴇ ʜɪᴛᴛɪɴɢ ɢᴏʟᴇᴍꜱ"

# Training Wind Charge Configuration
wind-charge:
  material: "WIND_CHARGE"                   # Base material
  item_model: "minecraft:wind_charge"       # Change to "maceroulette:training_wind" for custom model (EXAMPLE)
  slot: 1
  action: "TRAINING_WIND_CHARGE"
  amount: 1
  name: "&bᴛʀᴀɪɴɪɴɢ ᴡɪɴᴅ ᴄʜᴀʀɢᴇ"
  lore:
    - "&7ʀɪɢʜᴛ-ᴄʟɪᴄᴋ ᴀ ʙʟᴏᴄᴋ ᴛᴏ ʟᴀᴜɴᴄʜ ʏᴏᴜʀꜱᴇʟꜰ"
    - "&7ɪɴꜰɪɴɪᴛᴇ ᴜꜱᴇꜱ (1ꜱ ᴄᴏᴏʟᴅᴏᴡɴ)"`,
    'menus/cosmeticsMenus/helmets.yml': `# ═══════════════════════════════════════════════════════════════════
#                     HELMETS MENU CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Menu Type: DECORATIVE or FILL or EMPTY
# DECORATIVE - Uses the exact design from code (borders fixed)
# FILL - Fills all empty slots with your chosen fill item
# EMPTY - No border/fill items at all, only your defined items
menu-type: "DECORATIVE"
title: "&dʜᴇʟᴍᴇᴛꜱ"

# Only used when menu-type: FILL
fill-item:
  material: "GRAY_STAINED_GLASS_PANE"
  item_model: "minecraft:gray_stained_glass_pane"
  name: " "

# Only used when menu-type: DECORATIVE
# You can change these items but NOT their slots
decorative:
  border-item:
    material: "BLACK_STAINED_GLASS_PANE"
    item_model: "minecraft:black_stained_glass_pane"
    name: " "

  top-decoration:
    material: "PURPLE_STAINED_GLASS_PANE"
    item_model: "minecraft:purple_stained_glass_pane"
    name: "&dʜᴇʟᴍᴇᴛ ꜱʜᴏᴘ"

# ===== GUI MESSAGES =====
# These messages appear on the items
gui-messages:
  owned: "&aᴏᴡɴᴇᴅ"
  price: "&6ᴘʀɪᴄᴇ: &f{price} {icon}"
  level-required: "&7ʀᴇǫᴜɪʀᴇᴅ: &f{level}"
  currently-selected: "&aᴄᴜʀʀᴇɴᴛʟʏ ꜱᴇʟᴇᴄᴛᴇᴅ"
  click-select: "&eʟᴇꜰᴛ ᴄʟɪᴄᴋ ᴛᴏ ꜱᴇʟᴇᴄᴛ"
  click-purchase: "&eʟᴇꜰᴛ ᴄʟɪᴄᴋ ᴛᴏ ᴘᴜʀᴄʜᴀꜱᴇ"
  click-remove: "&eᴄʟɪᴄᴋ ᴛᴏ ʀᴇᴍᴏᴠᴇ"

# ===== CUSTOMIZABLE ITEMS =====
# Shows player's current coins
coins-display:
  slot: 10
  material: "SUNFLOWER"
  item_model: "minecraft:sunflower"
  name: "&6ʏᴏᴜʀ ᴄᴏɪɴꜱ"
  lore:
    - "&7➥ &f{coins} {icon}"
  action: "NONE"

# Remove helmet button (sets to none)
remove-item:
  slot: 16
  material: "BARRIER"
  item_model: "minecraft:barrier"
  name: "&c⬤ ɴᴏɴᴇ"
  lore:
    - ""
    - "&7ᴄʟɪᴄᴋ ᴛᴏ ʀᴇᴍᴏᴠᴇ ʜᴇʟᴍᴇᴛ"
    - ""
  action: "REMOVE_HELMET"

# ===== HELMET COSMETICS =====
# All 16 leather helmet colors
helmets:
  white:
    slot: 19
    material: "LEATHER_HELMET"
    color: "WHITE"
    name: "&f&lᴡʜɪᴛᴇ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_white"
    
  light_gray:
    slot: 20
    material: "LEATHER_HELMET"
    color: "SILVER"
    name: "&7&lʟɪɢʜᴛ ɢʀᴀʏ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_light_gray"
    
  gray:
    slot: 21
    material: "LEATHER_HELMET"
    color: "GRAY"
    name: "&8&lɢʀᴀʏ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_gray"
    
  black:
    slot: 22
    material: "LEATHER_HELMET"
    color: "BLACK"
    name: "&0&lʙʟᴀᴄᴋ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_black"
    
  brown:
    slot: 23
    material: "LEATHER_HELMET"
    color: "BROWN"
    name: "&6&lʙʀᴏᴡɴ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_brown"
    
  red:
    slot: 24
    material: "LEATHER_HELMET"
    color: "RED"
    name: "&c&lʀᴇᴅ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_red"
    
  orange:
    slot: 25
    material: "LEATHER_HELMET"
    color: "ORANGE"
    name: "&6&lᴏʀᴀɴɢᴇ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_orange"
    
  yellow:
    slot: 28
    material: "LEATHER_HELMET"
    color: "YELLOW"
    name: "&e&lʏᴇʟʟᴏᴡ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_yellow"
    
  lime:
    slot: 29
    material: "LEATHER_HELMET"
    color: "LIME"
    name: "&a&lʟɪᴍᴇ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_lime"
    
  green:
    slot: 30
    material: "LEATHER_HELMET"
    color: "GREEN"
    name: "&2&lɢʀᴇᴇɴ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_green"
    
  cyan:
    slot: 31
    material: "LEATHER_HELMET"
    color: "CYAN"
    name: "&3&lᴄʏᴀɴ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_cyan"
    
  light_blue:
    slot: 32
    material: "LEATHER_HELMET"
    color: "LIGHT_BLUE"
    name: "&b&lʟɪɢʜᴛ ʙʟᴜᴇ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_light_blue"
    
  blue:
    slot: 33
    material: "LEATHER_HELMET"
    color: "BLUE"
    name: "&9&lʙʟᴜᴇ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_blue"
    
  purple:
    slot: 34
    material: "LEATHER_HELMET"
    color: "PURPLE"
    name: "&5&lᴘᴜʀᴘʟᴇ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_purple"
    
  magenta:
    slot: 37
    material: "LEATHER_HELMET"
    color: "MAGENTA"
    name: "&d&lᴍᴀɢᴇɴᴛᴀ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_magenta"
    
  pink:
    slot: 38
    material: "LEATHER_HELMET"
    color: "PINK"
    name: "&d&lᴘɪɴᴋ ʜᴇʟᴍᴇᴛ"
    price: 500
    permission: "helmet_pink"

# Back button (returns to cosmetics menu)
back-item:
  slot: 45
  material: "ARROW"
  item_model: "minecraft:arrow"
  name: "&eʙᴀᴄᴋ"
  lore:
    - "&7ʀᴇᴛᴜʀɴ ᴛᴏ ᴄᴏꜱᴍᴇᴛɪᴄꜱ ᴍᴇɴᴜ"
  action: "OPEN_COSMETICS"

# Close button
close-item:
  slot: 53
  material: "BARRIER"
  item_model: "minecraft:barrier"
  name: "&cᴄʟᴏꜱᴇ"
  action: "CLOSE_MENU"`,
    'menus/cosmeticsMenus/poses.yml': `# ═══════════════════════════════════════════════════════════════════
#                     VICTORY POSES MENU CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Menu Type: DECORATIVE or FILL or EMPTY
# DECORATIVE - Uses the exact design from code (borders fixed)
# FILL - Fills all empty slots with your chosen fill item
# EMPTY - No border/fill items at all, only your defined items
menu-type: "DECORATIVE"
title: "&dᴠɪᴄᴛᴏʀʏ ᴘᴏꜱᴇꜱ"

# Only used when menu-type: FILL
fill-item:
  material: "GRAY_STAINED_GLASS_PANE"
  item_model: "minecraft:gray_stained_glass_pane"
  name: " "

# Only used when menu-type: DECORATIVE
# You can change these items but NOT their slots
decorative:
  border-item:
    material: "BLACK_STAINED_GLASS_PANE"
    item_model: "minecraft:black_stained_glass_pane"
    name: " "

  top-decoration:
    material: "PURPLE_STAINED_GLASS_PANE"
    item_model: "minecraft:purple_stained_glass_pane"
    name: "&dᴠɪᴄᴛᴏʀʏ ᴘᴏꜱᴇꜱ ꜱʜᴏᴘ"

# ===== GUI MESSAGES =====
# These messages appear on the items
gui-messages:
  owned: "&aᴏᴡɴᴇᴅ"
  price: "&6ᴘʀɪᴄᴇ: &f{price} {icon}"
  currently-selected: "&aᴄᴜʀʀᴇɴᴛʟʏ ꜱᴇʟᴇᴄᴛᴇᴅ"
  click-select: "&eʟᴇꜰᴛ ᴄʟɪᴄᴋ ᴛᴏ ꜱᴇʟᴇᴄᴛ"
  click-purchase: "&eʟᴇꜰᴛ ᴄʟɪᴄᴋ ᴛᴏ ᴘᴜʀᴄʜᴀꜱᴇ"
  click-remove: "&eᴄʟɪᴄᴋ ᴛᴏ ʀᴇᴍᴏᴠᴇ"

# ===== CUSTOMIZABLE ITEMS =====
# These are the actual functional items - you can change ANYTHING

# Shows player's current coins
coins-display:
  slot: 10
  material: "SUNFLOWER"
  item_model: "minecraft:sunflower"
  name: "&6ʏᴏᴜʀ ᴄᴏɪɴꜱ"
  lore:
    - "&7➥ &f{coins} {icon}"
  action: "NONE"

# Remove pose button (sets to default/none)
remove-item:
  slot: 16
  material: "BARRIER"
  item_model: "minecraft:barrier"
  name: "&c⬤ ɴᴏɴᴇ"
  lore:
    - ""
    - "&7ᴄʟɪᴄᴋ ᴛᴏ ʀᴇᴍᴏᴠᴇ ᴘᴏꜱᴇ"
    - ""
  action: "REMOVE_POSE"

# ===== VICTORY POSES =====
# Each pose is a purchasable cosmetic
poses:
  throne_room:
    slot: 19
    material: "GOLD_BLOCK"
    item_model: "minecraft:gold_block"
    name: "&6ᴛʜʀᴏɴᴇ ʀᴏᴏᴍ"
    price: 1000
    permission: "throne_room"
    
  divine_intervention:
    slot: 20
    material: "PLAYER_HEAD"
    item_model: "minecraft:player_head"
    name: "&dᴅɪᴠɪɴᴇ ɪɴᴛᴇʀᴠᴇɴᴛɪᴏɴ"
    price: 1000
    permission: "divine_intervention"
    
  black_hole:
    slot: 21
    material: "NETHER_STAR"
    item_model: "minecraft:nether_star"
    name: "&5ʙʟᴀᴄᴋ ʜᴏʟᴇ"
    price: 2500
    permission: "black_hole"

# Back button (returns to cosmetics menu)
back-item:
  slot: 45
  material: "ARROW"
  item_model: "minecraft:arrow"
  name: "&eʙᴀᴄᴋ"
  lore:
    - "&7ʀᴇᴛᴜʀɴ ᴛᴏ ᴄᴏꜱᴍᴇᴛɪᴄꜱ ᴍᴇɴᴜ"
  action: "OPEN_COSMETICS"

# Close button
close-item:
  slot: 53
  material: "BARRIER"
  item_model: "minecraft:barrier"
  name: "&cᴄʟᴏꜱᴇ"
  action: "CLOSE_MENU"`,
    'menus/main/cosmetics.yml': `# ═══════════════════════════════════════════════════════════════════
#                     COSMETICS MENU CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Menu Type: DECORATIVE or FILL or EMPTY
# DECORATIVE - Uses the exact design from code (borders fixed)
# FILL - Fills all empty slots with your chosen fill item
# EMPTY - No border/fill items at all, only your defined items
menu-type: "DECORATIVE"
title: "&dᴄᴏꜱᴍᴇᴛɪᴄꜱ ꜱʜᴏᴘ"

# Only used when menu-type: FILL
fill-item:
  material: "GRAY_STAINED_GLASS_PANE"
  item_model: "minecraft:gray_stained_glass_pane"
  name: " "

# Only used when menu-type: DECORATIVE
# You can change these items but NOT their slots
decorative:
  border-item:
    material: "BLACK_STAINED_GLASS_PANE"
    item_model: "minecraft:black_stained_glass_pane"
    name: " "

  top-decoration:
    material: "PURPLE_STAINED_GLASS_PANE"
    item_model: "minecraft:purple_stained_glass_pane"
    name: "&dᴄᴏꜱᴍᴇᴛɪᴄꜱ ꜱʜᴏᴘ"

# ===== CUSTOMIZABLE ITEMS =====
# These are the actual functional items - you can change ANYTHING

coins-item:
  slot: 10
  material: "SUNFLOWER"
  item_model: "minecraft:sunflower"
  name: "&6ᴄᴏɪɴꜱ"
  lore:
    - "&7➥ &f{coins} {icon}"
  action: "NONE"

helmets-item:
  slot: 13
  material: "LEATHER_HELMET"
  item_model: "minecraft:leather_helmet"
  name: "&bʜᴇʟᴍᴇᴛꜱ"
  lore:
    - ""
    - "&7➥ &7ᴄʟɪᴄᴋ ᴛᴏ ᴏᴘᴇɴ"
    - ""
    - "&7ᴄᴏʟᴏʀᴇᴅ ʟᴇᴀᴛʜᴇʀ ʜᴇʟᴍᴇᴛꜱ"
  action: "OPEN_HELMETS_MENU"

elytra-item:
  slot: 21
  material: "ELYTRA"
  item_model: "minecraft:elytra"
  name: "&bᴇʟʏᴛʀᴀꜱ"
  lore:
    - ""
    - "&7➥ &7ᴄᴏᴍɪɴɢ ꜱᴏᴏɴ..."
    - ""
    - "&7ᴇʟʏᴛʀᴀ ᴄᴏꜱᴍᴇᴛɪᴄꜱ"
  action: "NONE"

player-head-item:
  slot: 22
  material: "PLAYER_HEAD"
  item_model: "minecraft:player_head"
  name: "&aᴄᴜʀʀᴇɴᴛʟʏ ᴇǫᴜɪᴘᴘᴇᴅ"
  lore:
    - "&7ᴘᴏꜱᴇ: &f{selected-pose}"
    - "&7ʜᴇʟᴍᴇᴛ: &f{selected-helmet}"
  action: "NONE"

effects-item:
  slot: 23
  material: "TOTEM_OF_UNDYING"
  item_model: "minecraft:totem_of_undying"
  name: "&6ᴇꜰꜰᴇᴄᴛꜱ"
  lore:
    - ""
    - "&7➥ &7ᴄᴏᴍɪɴɢ ꜱᴏᴏɴ..."
    - ""
    - "&7ᴘʟᴀʏᴇʀ ᴇꜰꜰᴇᴄᴛꜱ"
  action: "NONE"

poses-item:
  slot: 30
  material: "ARMOR_STAND"
  item_model: "minecraft:armor_stand"
  name: "&dᴠɪᴄᴛᴏʀʏ ᴘᴏꜱᴇꜱ"
  lore:
    - ""
    - "&7➥ &7ᴄʟɪᴄᴋ ᴛᴏ ᴏᴘᴇɴ"
    - ""
    - "&7ᴘᴜʀᴄʜᴀꜱᴇ ᴀɴᴅ ꜱᴇʟᴇᴄᴛ ᴡɪɴ ᴀɴɪᴍᴀᴛɪᴏɴꜱ"
  action: "OPEN_POSES_MENU"

kill-effects-item:
  slot: 31
  material: "FIREWORK_ROCKET"
  item_model: "minecraft:firework_rocket"
  name: "&cᴋɪʟʟ ᴇꜰꜰᴇᴄᴛꜱ"
  lore:
    - ""
    - "&7➥ &7ᴄᴏᴍɪɴɢ ꜱᴏᴏɴ..."
    - ""
    - "&7ᴋɪʟʟ ᴇꜰꜰᴇᴄᴛ ᴄᴏꜱᴍᴇᴛɪᴄꜱ"
  action: "NONE"

trails-item:
  slot: 32
  material: "FEATHER"
  item_model: "minecraft:feather"
  name: "&fᴛʀᴀɪʟꜱ"
  lore:
    - ""
    - "&7➥ &7ᴄᴏᴍɪɴɢ ꜱᴏᴏɴ..."
    - ""
    - "&7ᴘʟᴀʏᴇʀ ᴛʀᴀɪʟ ᴇꜰꜰᴇᴄᴛꜱ"
  action: "NONE"

close-item:
  slot: 53
  material: "BARRIER"
  item_model: "minecraft:barrier"
  name: "&cᴄʟᴏꜱᴇ"
  action: "CLOSE_MENU"`,
    'menus/main/profile.yml': `# ═══════════════════════════════════════════════════════════════════
#                       PROFILE MENU CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Menu Type: DECORATIVE or FILL or EMPTY
# DECORATIVE - Uses the exact design from code (borders fixed)
# FILL - Fills all empty slots with your chosen fill item
# EMPTY - No border/fill items at all, only your defined items
menu-type: "DECORATIVE"
title: "&dᴘʀᴏꜰɪʟᴇ ꜱᴛᴀᴛꜱ"

# Only used when menu-type: FILL
fill-item:
  material: "GRAY_STAINED_GLASS_PANE"
  item_model: "minecraft:gray_stained_glass_pane"
  name: " "

# Only used when menu-type: DECORATIVE
# You can change these items but NOT their slots
decorative:
  border-item:
    material: "BLACK_STAINED_GLASS_PANE"
    item_model: "minecraft:black_stained_glass_pane"
    name: " "

  top-decoration:
    material: "PURPLE_STAINED_GLASS_PANE"
    item_model: "minecraft:purple_stained_glass_pane"
    name: "&dᴍᴀᴄᴇ ʀᴏᴜʟᴇᴛᴛᴇ ꜱᴛᴀᴛꜱ"

# ===== CUSTOMIZABLE ITEMS =====
# These are the actual functional items - you can change ANYTHING
# Slot, material, name, lore, action - everything is configurable

kills-item:
  slot: 13
  material: "DIAMOND_SWORD"
  item_model: "minecraft:diamond_sword"
  name: "&cᴋɪʟʟꜱ"
  lore:
    - "&7➥ &f{kills}"
    - ""
    - "&7ᴛᴏᴛᴀʟ ᴘʟᴀʏᴇʀꜱ ᴋɪʟʟᴇᴅ"
  action: "NONE"

deaths-item:
  slot: 21
  material: "SKELETON_SKULL"
  item_model: "minecraft:skeleton_skull"
  name: "&cᴅᴇᴀᴛʜꜱ"
  lore:
    - "&7➥ &f{deaths}"
    - ""
    - "&7ᴛᴏᴛᴀʟ ᴛɪᴍᴇꜱ ᴅɪᴇᴅ"
  action: "NONE"

player-head-item:
  slot: 22
  material: "PLAYER_HEAD"
  item_model: "minecraft:player_head"
  name: "&a{player-name}"
  lore:
    - "&7ʏᴏᴜʀ ꜱᴛᴀᴛɪꜱᴛɪᴄꜱ"
  action: "NONE"

wins-item:
  slot: 23
  material: "GOLDEN_APPLE"
  item_model: "minecraft:golden_apple"
  name: "&6ᴡɪɴꜱ"
  lore:
    - "&7➥ &f{wins}"
    - ""
    - "&7ɢᴀᴍᴇꜱ ᴡᴏɴ"
  action: "NONE"

winrate-item:
  slot: 30
  material: "NETHER_STAR"
  item_model: "minecraft:nether_star"
  name: "&dᴡɪɴ ʀᴀᴛᴇ"
  lore:
    - "&7➥ &f{winrate}%"
    - ""
    - "&7ᴡɪɴ ɴɪɴɢ ᴘᴇʀᴄᴇɴᴛᴀɢᴇ"
  action: "NONE"

games-item:
  slot: 31
  material: "COMPASS"
  item_model: "minecraft:compass"
  name: "&bɢᴀᴍᴇꜱ"
  lore:
    - "&7➥ &f{games_played}"
    - ""
    - "&7ᴛᴏᴛᴀʟ ɢᴀᴍᴇꜱ ᴘʟᴀʏᴇᴅ"
  action: "NONE"

kdr-item:
  slot: 32
  material: "EMERALD"
  item_model: "minecraft:emerald"
  name: "&aᴋᴅʀ"
  lore:
    - "&7➥ &f{kdr}"
    - ""
    - "&7ᴋɪʟʟ/ᴅᴇᴀᴛʜ ʀᴀᴛɪᴏ"
  action: "NONE"

leaderboards-item:
  slot: 49
  material: "BOOK"
  item_model: "minecraft:book"
  name: "&6ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅꜱ"
  lore:
    - "&7ᴛᴏᴘ ᴘʟᴀʏᴇʀꜱ ʙʏ ꜱᴛᴀᴛꜱ"
    - "&7ᴄʟɪᴄᴋ ᴛᴏ ᴠɪᴇᴡ"
  action: "OPEN_LEADERBOARDS"

close-item:
  slot: 53
  material: "BARRIER"
  item_model: "minecraft:barrier"
  name: "&cᴄʟᴏꜱᴇ"
  action: "CLOSE_MENU"`,
    'menus/profileMenus/leaderboard.yml': `# ═══════════════════════════════════════════════════════════════════
#                    LEADERBOARD MENU CONFIGURATION
# ═══════════════════════════════════════════════════════════════════

# Menu Type: DECORATIVE or FILL or EMPTY
# DECORATIVE - Uses the exact design from code (borders fixed)
# FILL - Fills all empty slots with your chosen fill item
# EMPTY - No border/fill items at all, only your defined items
menu-type: "DECORATIVE"
title: "&dʟᴇᴀᴅᴇʀʙᴏᴀʀᴅꜱ"

# Only used when menu-type: FILL
fill-item:
  material: "GRAY_STAINED_GLASS_PANE"
  item_model: "minecraft:gray_stained_glass_pane"
  name: " "

# Only used when menu-type: DECORATIVE
# You can change these items but NOT their slots
decorative:
  border-item:
    material: "BLACK_STAINED_GLASS_PANE"
    item_model: "minecraft:black_stained_glass_pane"
    name: " "

  top-decoration:
    material: "PURPLE_STAINED_GLASS_PANE"
    item_model: "minecraft:purple_stained_glass_pane"
    name: "&dᴛᴏᴘ ᴘʟᴀʏᴇʀꜱ"

# ===== CUSTOMIZABLE ITEMS =====
# These are the actual functional items - you can change ANYTHING
# Slot, material, name, lore, action - everything is configurable
# Use {1} through {10} placeholders for leaderboard positions

# Top Kills Leaderboard
# Shows players with most kills (1-10)
kills-item:
  slot: 10
  material: "DIAMOND_SWORD"
  item_model: "minecraft:diamond_sword"
  name: "&cᴛᴏᴘ ᴋɪʟʟꜱ"
  lore:
    - ""
    - "{1}"
    - "{2}"
    - "{3}"
    - "{4}"
    - "{5}"
    - "{6}"
    - "{7}"
    - "{8}"
    - "{9}"
    - "{10}"
    - ""
  action: "NONE"

# Top Wins Leaderboard
# Shows players with most wins (1-10)
wins-item:
  slot: 13
  material: "GOLDEN_APPLE"
  item_model: "minecraft:golden_apple"
  name: "&6ᴛᴏᴘ ᴡɪɴꜱ"
  lore:
    - ""
    - "{1}"
    - "{2}"
    - "{3}"
    - "{4}"
    - "{5}"
    - "{6}"
    - "{7}"
    - "{8}"
    - "{9}"
    - "{10}"
    - ""
  action: "NONE"

# Top Games Played Leaderboard
# Shows players with most games played (1-10)
games-item:
  slot: 16
  material: "COMPASS"
  item_model: "minecraft:compass"
  name: "&bᴛᴏᴘ ɢᴀᴍᴇꜱ"
  lore:
    - ""
    - "{1}"
    - "{2}"
    - "{3}"
    - "{4}"
    - "{5}"
    - "{6}"
    - "{7}"
    - "{8}"
    - "{9}"
    - "{10}"
    - ""
  action: "NONE"

# Top Deaths Leaderboard
# Shows players with most deaths (1-10)
deaths-item:
  slot: 28
  material: "SKELETON_SKULL"
  item_model: "minecraft:skeleton_skull"
  name: "&cᴛᴏᴘ ᴅᴇᴀᴛʜꜱ"
  lore:
    - ""
    - "{1}"
    - "{2}"
    - "{3}"
    - "{4}"
    - "{5}"
    - "{6}"
    - "{7}"
    - "{8}"
    - "{9}"
    - "{10}"
    - ""
  action: "NONE"

# Top Coins Leaderboard
# Shows players with most coins (1-10)
coins-item:
  slot: 31
  material: "SUNFLOWER"
  item_model: "minecraft:sunflower"
  name: "&6ᴛᴏᴘ ᴄᴏɪɴꜱ"
  lore:
    - ""
    - "{1}"
    - "{2}"
    - "{3}"
    - "{4}"
    - "{5}"
    - "{6}"
    - "{7}"
    - "{8}"
    - "{9}"
    - "{10}"
    - ""
  action: "NONE"

# Top Level Leaderboard
# Shows players with highest level (Champion, Legend X, etc.) (1-10)
level-item:
  slot: 34
  material: "NETHER_STAR"
  item_model: "minecraft:nether_star"
  name: "&dᴛᴏᴘ ʟᴇᴠᴇʟ"
  lore:
    - ""
    - "{1}"
    - "{2}"
    - "{3}"
    - "{4}"
    - "{5}"
    - "{6}"
    - "{7}"
    - "{8}"
    - "{9}"
    - "{10}"
    - ""
  action: "NONE"

# Back Button
# Returns to profile menu
back-item:
  slot: 49
  material: "ARROW"
  item_model: "minecraft:arrow"
  name: "&eʙᴀᴄᴋ"
  lore:
    - "&7ʀᴇᴛᴜʀɴ ᴛᴏ ᴘʀᴏꜰɪʟᴇ"
  action: "OPEN_PROFILE"

# Close Button
# Closes the menu
close-item:
  slot: 53
  material: "BARRIER"
  item_model: "minecraft:barrier"
  name: "&cᴄʟᴏꜱᴇ"
  action: "CLOSE_MENU"`,
    'plugin.yml': `name: MaceRoulette
version: 1.0.2
main: me.cheater.maceroulette.Main
api-version: '1.21'
author: cheater
description: Automatic minigame with spinning maces

load: POSTWORLD

commands:
  maceroulette:
    description: Setup and manage Mace Roulette
    aliases: [mr]
    usage: |
      /maceroulette Setup  - Setup the plugin.
      /maceroulette reload - Reload configuration.

permissions:
  maceroulette.admin:
    description: Setup and manage Mace Roulette
    default: op

  maceroulette.join:
    description: Allows using /mr join
    default: true

  maceroulette.leave:
    description: Allows using /mr leave
    default: true`
};

// Detailed explanations for each configuration section
const configGuides = {
    'config.yml': [
    {
        section: 'License Settings',
        description: 'License verification for Mace Roulette plugin',
        settings: [
            { key: 'license', value: 'YOUR-LICENSE-KEY-HERE', description: 'Your purchased license key. Open a ticket on Discord to get your key.' }
        ]
    },
    {
        section: 'Database Configuration',
            description: 'Set up MySQL/MariaDB for cross-server statistics. If disabled, plugin uses SQLite locally.',
            settings: [
                { key: 'database.enabled', value: 'false', description: 'Set to true to enable MySQL database storage' },
                { key: 'database.host', value: 'localhost', description: 'Your database server address' },
                { key: 'database.port', value: '3306', description: 'MySQL default port (usually 3306)' },
                { key: 'database.database', value: '""', description: 'Name of your database (e.g., mace_roulette)' },
                { key: 'database.username', value: 'root', description: 'Database login username' },
                { key: 'database.password', value: '""', description: 'Database login password' },
                { key: 'database.use-ssl', value: 'false', description: 'Enable SSL for secure database connection' }
            ]
        },
        {
            section: 'Connection Pool Settings',
            description: 'Optimize database performance with connection pooling',
            settings: [
                { key: 'database.connection-pool.max-pool-size', value: '10', description: 'Maximum concurrent database connections' },
                { key: 'database.connection-pool.min-idle', value: '5', description: 'Minimum idle connections kept alive' },
                { key: 'database.connection-pool.connection-timeout', value: '30000', description: 'Max time (ms) to wait for connection' },
                { key: 'database.connection-pool.idle-timeout', value: '600000', description: 'Time (ms) before idle connection closes' },
                { key: 'database.connection-pool.max-lifetime', value: '1800000', description: 'Max connection lifetime before refresh' }
            ]
        },
        {
            section: 'Statistics Settings',
            description: 'Control how player stats are tracked and displayed',
            settings: [
                { key: 'stats.enabled', value: 'true', description: 'Master switch for statistics tracking' },
                { key: 'stats.save-interval', value: '180', description: 'Seconds between automatic stat saves (3 minutes)' },
                { key: 'stats.save-on-quit', value: 'true', description: 'Save stats immediately when player leaves' },
                { key: 'stats.leaderboard-update', value: '60', description: 'Seconds between leaderboard refreshes' },
                { key: 'stats.cache-leaderboards', value: 'true', description: 'Store leaderboards in memory for faster access' },
                { key: 'stats.cache-size', value: '500', description: 'Maximum players stored in memory cache' }
            ]
        },
        {
            section: 'Showdown Settings',
            description: 'Configure the final showdown phase when 2 players remain',
            settings: [
                { key: 'showdown.enabled', value: 'true', description: 'Enable/disable showdown feature' },
                { key: 'showdown.duration', value: '40', description: 'Duration in ticks (20 ticks = 1 second, 40 = 2 seconds)' },
                { key: 'showdown.title', value: '&lꜱʜᴏᴡᴅᴏᴡɴ', description: 'Title displayed during showdown (supports color codes)' },
                { key: 'showdown.subtitle', value: '&l2 ᴀʟɪᴠᴇ', description: 'Subtitle displayed during showdown' },
                { key: 'showdown.color-change-speed', value: '2', description: 'Ticks between color changes (faster = more flashy)' }
            ]
        },
        {
            section: 'Void Settings',
            description: 'Configure void death detection',
            settings: [
                { key: 'void.enabled', value: 'true', description: 'Enable/disable void death detection' },
                { key: 'void.level', value: '-120', description: 'Y-coordinate where players die in the void' }
            ]
        },
        {
            section: 'Game Settings',
            description: 'Core game configuration',
            settings: [
                { key: 'game.min-players', value: '2', description: 'Minimum players required to start a game' },
                { key: 'game.max-players', value: '100', description: 'Maximum players allowed in a single game' },
                { key: 'game.mace-countdown', value: '10s', description: 'Time mace holders have to act (format: 10s, 60s, 1m, 60m)' }
            ]
        },
        {
            section: 'Queue Settings',
            description: 'Control game queue behavior',
            settings: [
                { key: 'queue.auto-start-delay', value: '10', description: 'Seconds delay before auto-starting when queue is full' },
                { key: 'queue.next-game-delay', value: '15', description: 'Seconds between game end and next game start' }
            ]
        },
        {
            section: 'Multi-World Configuration',
            description: 'Configure plugin behavior across multiple worlds',
            settings: [
                { key: 'server-type', value: 'server', description: 'server = global, worlds = specific world only' },
                { key: 'worlds-mode.world', value: 'world_name', description: 'World where the game runs (when server-type: worlds)' },
                { key: 'worlds-mode.override-teleportation', value: 'false', description: 'Prevent plugins from teleporting players out' },
                { key: 'worlds-mode.leave-location.world', value: 'lobby', description: 'World name for leave location' },
                { key: 'worlds-mode.leave-location.x', value: '0', description: 'X coordinate for leave location' },
                { key: 'worlds-mode.leave-location.y', value: '100', description: 'Y coordinate for leave location' },
                { key: 'worlds-mode.leave-location.z', value: '0', description: 'Z coordinate for leave location' }
            ]
        }
    ],
'levels.yml': [
    {
        section: 'Level Tiers Configuration',
        description: 'Configure all rank tiers and their display names',
        settings: [
            { key: 'list[0]', value: '["Bronze", "&6&lBronze"]', description: 'Bronze tier - Levels I-X' },
            { key: 'list[1]', value: '["Silver", "&7&lSilver"]', description: 'Silver tier - Levels I-X' },
            { key: 'list[2]', value: '["Gold", "&6&lGold"]', description: 'Gold tier - Levels I-X' },
            { key: 'list[3]', value: '["Platinum", "&b&lPlatinum"]', description: 'Platinum tier - Levels I-X' },
            { key: 'list[4]', value: '["Diamond", "&b&lDiamond"]', description: 'Diamond tier - Levels I-X' },
            { key: 'list[5]', value: '["Master", "&d&lMaster"]', description: 'Master tier - Levels I-X' },
            { key: 'list[6]', value: '["Elite", "&e&lElite"]', description: 'Elite tier - Levels I-X' },
            { key: 'list[7]', value: '["Legend", "&e&lLegend"]', description: 'Legend tier - Levels I-X' },
            { key: 'list[8]', value: '["Champion", "&c&lCHAMPION"]', description: 'Champion tier - No level numbers' }
        ]
    },
    {
        section: 'Level Number Format',
        description: 'Control how level numbers are displayed',
        settings: [
            { key: 'level-number-format', value: '{roman}', description: 'Use {roman} for Roman numerals (I, II, III) or {number} for regular numbers (1, 2, 3)' }
        ]
    },
    {
        section: 'Progress Bar Settings',
        description: 'Customize the appearance of the XP progress bar',
        settings: [
            { key: 'progress-bar.filled-character', value: '|', description: 'Character for filled progress (only ONE character allowed)' },
            { key: 'progress-bar.empty-character', value: '|', description: 'Character for empty progress (only ONE character allowed)' },
            { key: 'progress-bar.filled-color', value: '&a', description: 'Color code for filled progress (green)' },
            { key: 'progress-bar.empty-color', value: '&7', description: 'Color code for empty progress (gray)' },
            { key: 'progress-bar.left-bracket', value: '&8[', description: 'Left bracket character/color' },
            { key: 'progress-bar.right-bracket', value: '&8]', description: 'Right bracket character/color' }
        ]
    }
],
'arena.yml': [
    {
        section: 'Arena Location',
        description: 'Set the center of your arena',
        settings: [
            { key: 'center', value: '""', description: 'Format: world,x,y,z,yaw,pitch (e.g., world,0,100,0,0,0)' },
            { key: 'facing', value: '""', description: 'Direction players face when spawned (N, S, E, W)' }
        ]
    },
    {
        section: 'Modifiers Configuration',
        description: 'Enable/disable and select which modifiers appear in games. Each modifier uses format: ["identifier", "&f&lDisplay Name"]',
        settings: [
            { key: 'modifiers.enabled', value: 'true', description: 'Master switch for all modifiers' }
        ]
    },
    {
        section: 'Map Modifiers (NEW FORMAT)',
        description: 'Modifiers that change the arena floor - Now using [identifier, display_name] format',
        settings: [
            { key: 'list[0]', value: '["Icy Land", "&f&lIcy Land"]', description: 'Floor becomes ice - super slippery gameplay' },
            { key: 'list[1]', value: '["Glass Map", "&f&lGlass Map"]', description: 'Floor becomes transparent glass - disorienting' },
            { key: 'list[2]', value: '["Slime Map", "&f&lSlime Map"]', description: 'Floor becomes slime blocks - bouncy chaos' },
            { key: 'list[3]', value: '["Donut Map", "&f&lDonut Map"]', description: 'Creates a void hole in the center' },
            { key: 'list[4]', value: '["Transparent Arena", "&f&lTransparent Arena"]', description: 'Floor becomes invisible barriers' }
        ]
    },
    {
        section: 'Gameplay Modifiers (NEW FORMAT)',
        description: 'Modifiers that change game mechanics - Now using [identifier, display_name] format',
        settings: [
            { key: 'list[5]', value: '["Low Gravity", "&f&lLow Gravity"]', description: 'Players float - higher jumps, slower falls' },
            { key: 'list[6]', value: '["Knockback Boost", "&f&lKnockback Boost"]', description: 'All players get knockback sticks' },
            { key: 'list[7]', value: '["Darkness", "&f&lDarkness"]', description: 'Blindness + warden effects - limited visibility' },
            { key: 'list[8]', value: '["Thunderstorm", "&f&lThunderstorm"]', description: 'Constant lightning strikes - dodge or die' },
            { key: 'list[9]', value: '["Speed Frenzy", "&f&lSpeed Frenzy"]', description: 'All players get Speed III - ultra fast' },
            { key: 'list[10]', value: '["Jump Boost", "&f&lJump Boost"]', description: 'All players get Jump Boost III - massive jumps' },
            { key: 'list[11]', value: '["Explosive Hits", "&f&lExplosive Hits"]', description: 'Hits create explosions - area damage' },
            { key: 'list[12]', value: '["Size Growth", "&f&lSize Growth"]', description: 'Players grow when moving - bigger target' },
            { key: 'list[13]', value: '["Random Sizes", "&f&lRandom Sizes"]', description: 'Random player sizes - tiny to giant' },
            { key: 'list[14]', value: '["Wind Charge Storm", "&f&lWind Charge Storm"]', description: 'Wind charges fall from sky - airborne chaos' },
            { key: 'list[15]', value: '["Elytra Launch", "&f&lElytra Launch"]', description: 'Players get elytra + levitation - aerial combat' },
            { key: 'list[16]', value: '["Player Stacks", "&f&lPlayer Stacks"]', description: 'Players can stack on each other' },
            { key: 'list[17]', value: '["TNT Rain", "&f&lTNT Rain"]', description: 'TNT falls from sky - explosive hazards' }
        ]
    },
    {
        section: 'Mace Modifiers (NEW FORMAT)',
        description: 'Modifiers that affect mace holders - Now using [identifier, display_name] format',
        settings: [
            { key: 'list[18]', value: '["Tiny Mace", "&f&lTiny Mace"]', description: 'Mace holders become tiny (0.5x size)' },
            { key: 'list[19]', value: '["Big Mace", "&f&lBig Mace"]', description: 'Mace holders become huge (2.5x size)' },
            { key: 'list[20]', value: '["Mace or Die", "&f&lMace or Die"]', description: 'Mace holders must KILL, not just hit' },
            { key: 'list[21]', value: '["Double Mace", "&f&lDouble Mace"]', description: '2 maces per round - double the fun' },
            { key: 'list[22]', value: '["Triple Mace", "&f&lTriple Mace"]', description: '3 maces per round - pure chaos' },
            { key: 'list[23]', value: '["Shockwave Mace", "&f&lShockwave Mace"]', description: 'Mace kills create shockwaves' },
            { key: 'list[24]', value: '["Mace Drop", "&f&lMace Drop"]', description: 'Mace drops from barrel in center' },
            { key: 'list[25]', value: '["Windburst Mace", "&f&lWindburst Mace"]', description: 'Mace has Wind Burst III enchantment' }
        ]
    }
],
    'language.yml': [
        {
            section: 'Global Settings',
            description: 'General plugin messages',
            settings: [
                { key: 'prefix', value: '&6[&eᴍᴀᴄᴇ ʀᴏᴜʟᴇᴛᴛᴇ&6]', description: 'Global message prefix for all plugin messages' }
            ]
        },
        {
            section: 'Admin Messages',
            description: 'Messages shown to admins',
            settings: [
                { key: 'admin.config-reloaded', value: '{prefix} &aᴄᴏɴꜰɪɢᴜʀᴀᴛɪᴏɴ ʀᴇʟᴏᴀᴅᴇᴅ!', description: 'When config is reloaded' },
                { key: 'admin.build-mode-enabled', value: '&aʙᴜɪʟᴅ ᴍᴏᴅᴇ: &eᴇɴᴀʙʟᴇᴅ', description: 'When build mode is enabled' },
                { key: 'admin.build-mode-disabled', value: '&cʙᴜɪʟᴅ ᴍᴏᴅᴇ: &eᴅɪꜱᴀʙʟᴇᴅ', description: 'When build mode is disabled' }
            ]
        },
        {
            section: 'Error Messages',
            description: 'Error messages shown to players',
            settings: [
                { key: 'errors.no-permission', value: '&cʏᴏᴜ ᴅᴏɴ\'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ ᴛᴏ ᴜꜱᴇ ᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ!', description: 'No permission error' },
                { key: 'errors.player-only', value: '&cᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜꜱᴇᴅ ʙʏ ᴘʟᴀʏᴇʀꜱ!', description: 'Console cannot use command' },
                { key: 'errors.arena-not-set', value: '&cᴀʀᴇɴᴀ ɴᴏᴛ ꜱᴇᴛ! ᴀᴅᴍɪɴ ᴍᴜꜱᴛ ꜱᴇᴛ ᴀʀᴇɴᴀ ᴄᴇɴᴛᴇʀ ꜰɪʀꜱᴛ.', description: 'Arena not configured' }
            ]
        },
        {
            section: 'Game Messages',
            description: 'In-game messages during matches',
            settings: [
                { key: 'game.starting', value: '{prefix} &eɢᴀᴍᴇ ꜱᴛᴀʀᴛɪɴɢ ɪɴ {seconds} ꜱᴇᴄᴏɴᴅꜱ! &7({players} ᴘʟᴀʏᴇʀꜱ)', description: 'Countdown to game start' },
                { key: 'game.not-enough-players', value: '{prefix} &cɴᴏᴛ ᴇɴᴏᴜɢʜ ᴘʟᴀʏᴇʀꜱ ᴛᴏ ꜱᴛᴀʀᴛ! ɴᴇᴇᴅ ᴀᴛ ʟᴇᴀꜱᴛ {min}', description: 'Not enough players to start' },
                { key: 'game.mace-hit-required', value: '&cʏᴏᴜ ᴍᴜꜱᴛ ᴜꜱᴇ ᴛʜᴇ ᴍᴀᴄᴇ ᴛᴏ ʜɪᴛ!', description: 'Player used wrong weapon' },
                { key: 'game.mace-hit-success', value: '&aʏᴏᴜ ʜɪᴛ ᴡɪᴛʜ ᴛʜᴇ ᴍᴀᴄᴇ! ʏᴏᴜ ꜱᴜʀᴠɪᴠᴇ!', description: 'Successful mace hit' },
                { key: 'game.mace-failed', value: '&cʏᴏᴜ ꜰᴀɪʟᴇᴅ ᴛᴏ ꜱᴜᴄᴄᴇᴇᴅ ɪɴ 10 ꜱᴇᴄᴏɴᴅꜱ!', description: 'Failed to hit with mace in time' },
                { key: 'game.mace-killed-someone', value: '&aʏᴏᴜ ᴋɪʟʟᴇᴅ ꜱᴏᴍᴇᴏɴᴇ! ʏᴏᴜ ᴡɪʟʟ ꜱᴜʀᴠɪᴠᴇ!', description: 'Killed another player' },
                { key: 'game.mace-pickup', value: '&6&l⚔ &e{player} &6&lᴘɪᴄᴋᴇᴅ ᴜᴘ ᴀ ᴍᴀᴄᴇ! ⚔', description: 'Player picked up a mace' },
                { key: 'game.maces-selected', value: '&c&l⚔ ᴍᴀᴄᴇꜱ ꜱᴇʟᴇᴄᴛᴇᴅ! &e{count} ᴘʟᴀʏᴇʀꜱ ʜᴀᴠᴇ ᴍᴀᴄᴇꜱ!', description: 'Mace holders announced' },
                { key: 'game.arena-shrink', value: '&eᴀʀᴇɴᴀ ꜱʜʀᴜɴᴋ ʙʏ: &c{amount} &eʙʟᴏᴄᴋꜱ', description: 'Arena shrinking notification' },
                { key: 'game.winner', value: '&6⚔ {player} ᴡɪɴꜱ ᴛʜᴇ ɢᴀᴍᴇ! ⚔', description: 'Winner announcement' },
                { key: 'game.draw', value: '&c⚔ ɢᴀᴍᴇ ᴇɴᴅᴇᴅ ɪɴ ᴀ ᴅʀᴀᴡ! ⚔', description: 'Game ended in draw' },
                { key: 'game.reset-by-admin', value: '&c&lɢᴀᴍᴇ ʀᴇꜱᴇᴛ ʙʏ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴛᴏʀ', description: 'Admin reset the game' }
            ]
        },
        {
            section: 'Level System Messages',
            description: 'Messages related to player leveling',
            settings: [
                { key: 'level.progress-gained', value: '&7⚔ &a+1 Progress &7(&f{progress}/20&7)', description: 'Progress point gained' },
                { key: 'level.level-up-player', value: ['&7━━━━━━━━━━━━━━━━━━━━━━', '&6&lʟᴇᴠᴇʟ ᴜᴘ! &e{old} &7→ &a{new}', '&7━━━━━━━━━━━━━━━━━━━━━━'], description: 'Level up message to player' },
                { key: 'level.tier-upgrade-player', value: ['&7════════════════════════', '&6&lᴛɪᴇʀ ᴜᴘɢʀᴀᴅᴇ! &e{old} &7→ &6&l{new}', '&7════════════════════════'], description: 'Tier upgrade message' },
                { key: 'level.level-up-broadcast', value: ['&7━━━━━━━━━━━━━━━━━━━━━━', '&6&lʟᴇᴠᴇʟ ᴜᴘ!', '&e{player} &7ʜᴀꜱ ʟᴇᴠᴇʟᴇᴅ ᴜᴘ ꜰʀᴏᴍ &f{old} &7ᴛᴏ &f{new}', '&7━━━━━━━━━━━━━━━━━━━━━━'], description: 'Level up broadcast to server' }
            ]
        },
        {
            section: 'Queue Messages',
            description: 'Messages for game queue',
            settings: [
                { key: 'queue.joined', value: '&aʏᴏᴜ ᴊᴏɪɴᴇᴅ ᴛʜᴇ ǫᴜᴇᴜᴇ!', description: 'Player joined queue' },
                { key: 'queue.left', value: '&eʏᴏᴜ ʟᴇꜰᴛ ᴛʜᴇ ǫᴜᴇᴜᴇ!', description: 'Player left queue' },
                { key: 'queue.action-bar', value: '&aʏᴏᴜ ᴀʀᴇ ᴄᴜʀʀᴇɴᴛʟʏ ɪɴ ǫᴜᴇᴜᴇ', description: 'Action bar reminder for queued players' }
            ]
        },
        {
            section: 'Spectator Messages',
            description: 'Messages for spectator mode',
            settings: [
                { key: 'spectator.entered', value: '&d&lꜱᴘᴇᴄᴛᴀᴛᴏʀ ᴍᴏᴅᴇ', description: 'Entered spectator mode' },
                { key: 'spectator.enter-subtitle', value: '&7ᴇɴᴛᴇʀ ᴘʀᴏᴛᴇᴄᴛɪᴏɴ ᴀʀᴇᴀ ᴛᴏ ʀᴇᴛᴜʀɴ', description: 'How to leave spectator' },
                { key: 'spectator.returned', value: '&a&lʙᴀᴄᴋ ᴛᴏ ʟᴏʙʙʏ', description: 'Returned from spectator' },
                { key: 'spectator.return-subtitle', value: '&7ʏᴏᴜ ᴀʀᴇ ɴᴏ ʟᴏɴɢᴇʀ ꜱᴘᴇᴄᴛᴀᴛɪɴɢ', description: 'No longer spectating' },
                { key: 'spectator.border-exceeded', value: '&c&lᴡᴏʀʟᴅʙᴏʀᴅᴇʀ ᴇxᴄᴇᴇᴅᴇᴅ!', description: 'Left world border' },
                { key: 'spectator.border-teleport', value: '&eᴛᴇʟᴇᴘᴏʀᴛɪɴɢ ʙᴀᴄᴋ ᴛᴏ ꜱᴘᴀᴡɴ', description: 'Teleported back to spawn' },
                { key: 'spectator.cannot-spectate-ingame', value: '&cʏᴏᴜ ᴄᴀɴ\'ᴛ ꜱᴘᴇᴄᴛᴀᴛᴇ ᴡʜɪʟᴇ ɪɴ ɢᴀᴍᴇ!', description: 'Cannot spectate while alive' }
            ]
        },
        {
            section: 'Cosmetics Messages',
            description: 'Messages for cosmetics shop',
            settings: [
                { key: 'cosmetics.purchase-success', value: '&aᴘᴜʀᴄʜᴀꜱᴇᴅ {cos} ꜰᴏʀ {price} {icon}', description: 'Successful purchase' },
                { key: 'cosmetics.not-enough-coins', value: '&cɴᴏᴛ ᴇɴᴏᴜɢʜ ᴄᴏɪɴꜱ! ɴᴇᴇᴅ {price} {icon}', description: 'Not enough coins' },
                { key: 'cosmetics.not-enough-level', value: '&cʏᴏᴜ ɴᴇᴇᴅ {level} ᴛᴏ ᴘᴜʀᴄʜᴀꜱᴇ ᴛʜɪꜱ!', description: 'Level too low' },
                { key: 'cosmetics.select-success', value: '&a{cos} ꜱᴇʟᴇᴄᴛᴇᴅ', description: 'Cosmetic selected' },
                { key: 'cosmetics.remove-success', value: '&7ᴄᴏꜱᴍᴇᴛɪᴄ ʀᴇᴍᴏᴠᴇᴅ', description: 'Cosmetic removed' }
            ]
        },
        {
            section: 'Training Messages',
            description: 'Messages for training mode',
            settings: [
                { key: 'training.entered', value: '&a&lᴛʀᴀɪɴɪɴɢ ᴀʀᴇɴᴀ', description: 'Entered training' },
                { key: 'training.enter-subtitle', value: '&7ᴡᴀʟᴋ ᴛᴏ ꜱᴘᴀᴡɴ ᴛᴏ ʟᴇᴀᴠᴇ', description: 'How to leave training' },
                { key: 'training.left', value: '&e&lʟᴇꜰᴛ ᴛʀᴀɪɴɪɴɢ', description: 'Left training' },
                { key: 'training.left-subtitle', value: '&7ʏᴏᴜ ᴀʀᴇ ʙᴀᴄᴋ ɪɴ ʟᴏʙʙʏ', description: 'Back in lobby' }
            ]
        }
    ],
    'others.yml': [
        {
            section: 'Chat Rewards',
            description: 'Reward players for saying GL (Good Luck) at game start and GG (Good Game) at game end',
            settings: [
                { key: 'chat-rewards.enabled', value: 'true', description: 'Enable/disable chat rewards' },
                { key: 'chat-rewards.coins-per-message', value: '5', description: 'Coins earned per valid message' },
                { key: 'chat-rewards.window-seconds', value: '10', description: 'Time window to say GL/GG after game events' },
                { key: 'chat-rewards.formatted-message', value: '&e&l{message} &a+{coins} {icon}', description: 'Message shown when reward is given' }
            ]
        },
        {
            section: 'World Border Protection',
            description: 'Teleport spectators back when they leave the world border',
            settings: [
                { key: 'worldborder.enabled', value: 'true', description: 'Enable/disable border protection' },
                { key: 'worldborder.check-interval', value: '40', description: 'Ticks between border checks (20 ticks = 1 second)' }
            ]
        }
    ],
    'scoreboard.yml': [
        {
            section: 'General Settings',
            description: 'Master scoreboard configuration',
            settings: [
                { key: 'scoreboard.enabled', value: 'true', description: 'Set to false to completely disable the scoreboard' },
                { key: 'title', value: '&6&lᴍᴀᴄᴇ ʀᴏᴜʟᴇᴛᴛᴇ', description: 'Scoreboard title' }
            ]
        },
        {
            section: 'Game Scoreboard',
            description: 'Scoreboard shown when player is in an active game',
            settings: [
                { key: 'game.lines[0]', value: '&7ɪɢɴ: &f{player-name}', description: 'Player name display' },
                { key: 'game.lines[1]', value: '&7ʟᴇᴠᴇʟ: &f{level}', description: 'Player level' },
                { key: 'game.lines[2]', value: '&7ᴘʀᴏɢʀᴇꜱꜱ: {progress-bar}', description: 'XP progress bar' },
                { key: 'game.lines[4]', value: '&aꜱᴛᴀᴛᴜꜱ: &cɪɴ ɢᴀᴍᴇ', description: 'Game status' },
                { key: 'game.lines[5]', value: '{countdown-line}', description: 'Round countdown' },
                { key: 'game.lines[6]', value: '&cᴀʟɪᴠᴇ: &f{alive}', description: 'Players still alive' },
                { key: 'game.lines[7]', value: '&bʀᴏᴜɴᴅ: &f{round}', description: 'Current round number' },
                { key: 'game.lines[9]', value: '&eᴘɪxᴇʟ-ᴍᴄ.ɴᴇᴛ', description: 'Server IP' }
            ]
        },
        {
            section: 'Lobby Scoreboard',
            description: 'Scoreboard shown when player is in lobby/waiting',
            settings: [
                { key: 'lobby.lines[0]', value: '&7ɪɢɴ: &f{player-name}', description: 'Player name display' },
                { key: 'lobby.lines[1]', value: '&7ʟᴇᴠᴇʟ: &f{level}', description: 'Player level' },
                { key: 'lobby.lines[2]', value: '&7ᴘʀᴏɢʀᴇꜱꜱ: {progress-bar}', description: 'XP progress bar' },
                { key: 'lobby.lines[4]', value: '&aꜱᴛᴀᴛᴜꜱ: &eᴡᴀɪᴛɪɴɢ', description: 'Lobby status' },
                { key: 'lobby.lines[5]', value: '&dɪɴ ǫᴜᴇᴜᴇ: &f{queue-size}', description: 'Players in queue' },
                { key: 'lobby.lines[6]', value: '&9ᴏɴʟɪɴᴇ: &f{online}', description: 'Total online players' },
                { key: 'lobby.lines[7]', value: '&6ᴘʟᴀʏɪɴɢ: &f{playing}', description: 'Players in game' },
                { key: 'lobby.lines[9]', value: '&eᴘɪxᴇʟ-ᴍᴄ.ɴᴇᴛ', description: 'Server IP' }
            ]
        },
        {
            section: 'Available Placeholders',
            description: 'All placeholders you can use in scoreboard lines',
            settings: [
                { key: '{player-name}', value: 'Player\'s name', description: 'Shows current player name' },
                { key: '{level}', value: 'Player\'s level (Bronze I, Silver II, etc. with colors)', description: 'Formatted level with color' },
                { key: '{progress-bar}', value: 'Progress bar [|||||░░░░░░░░░░░░░░░]', description: 'Visual XP progress' },
                { key: '{progress}', value: 'Current progress number (0-20)', description: 'Raw progress value' },
                { key: '{queue-size}', value: 'Number of players in queue', description: 'Queue size' },
                { key: '{online}', value: 'Total online players', description: 'Server online count' },
                { key: '{playing}', value: 'Players currently in game/alive', description: 'In-game players' },
                { key: '{alive}', value: 'Players still alive in game', description: 'Alive count' },
                { key: '{round}', value: 'Current round number', description: 'Round counter' },
                { key: '{seconds}', value: 'Countdown seconds', description: 'Time until next round' }
            ]
        }
    ],
    'spawn.yml': [
        {
            section: 'Spawn Locations',
            description: 'Configure all important locations',
            settings: [
                { key: 'spawn.location', value: '""', description: 'Main spawn location (format: world,x,y,z,yaw,pitch)' },
                { key: 'spectator.head-location', value: '""', description: 'Location where players click to enter spectator mode' }
            ]
        },
        {
            section: 'Protection Area',
            description: 'Safe zone where players cannot take damage or PVP',
            settings: [
                { key: 'protection.pos1', value: '""', description: 'First corner of protection region (format: world,x,y,z)' },
                { key: 'protection.pos2', value: '""', description: 'Second corner of protection region (format: world,x,y,z)' }
            ]
        }
    ],
    'training.yml': [
        {
            section: 'Training Arena',
            description: 'Configure practice area settings',
            settings: [
                { key: 'training.enabled', value: 'true', description: 'Enable/disable training mode' },
                { key: 'training.area.pos1', value: '""', description: 'First corner of player training area' },
                { key: 'training.area.pos2', value: '""', description: 'Second corner of player training area' },
                { key: 'training.entity.pos1', value: '""', description: 'First corner of golem spawn area' },
                { key: 'training.entity.pos2', value: '""', description: 'Second corner of golem spawn area' }
            ]
        },
        {
            section: 'Golem Settings',
            description: 'Configure training golems',
            settings: [
                { key: 'training.golem.count', value: '30', description: 'Number of golems to maintain' },
                { key: 'training.golem.health', value: '4.0', description: 'Health points (4.0 = 2 hearts)' },
                { key: 'training.golem.respawn-delay', value: '20', description: 'Ticks between respawns (20 = 1 second)' },
                { key: 'training.golem.wind-charge-cooldown', value: '20', description: 'Ticks between wind charge uses' },
                { key: 'training.golem.specific-block', value: 'false', description: 'If true, golems only spawn on listed blocks' }
            ]
        }
    ],
    'Items/cosmetics.yml': [
        {
            section: 'Cosmetics Menu Item',
            description: 'Item that opens the cosmetics shop',
            settings: [
                { key: 'cosmetics-item.material', value: 'CHEST', description: 'Material of the item' },
                { key: 'cosmetics-item.item_model', value: 'minecraft:chest', description: 'Custom model data (for resource packs)' },
                { key: 'cosmetics-item.slot', value: '4', description: 'Inventory slot (0-8 for hotbar)' },
                { key: 'cosmetics-item.action', value: 'COSMETICS_MENU_OPEN', description: 'Action when clicked' },
                { key: 'cosmetics-item.name', value: '&dᴄᴏꜱᴍᴇᴛɪᴄꜱ', description: 'Display name of the item' },
                { key: 'cosmetics-item.lore[0]', value: '&7ʀɪɢʜᴛ ᴄʟɪᴄᴋ ᴛᴏ ᴏᴘᴇɴ', description: 'Item lore/description' }
            ]
        }
    ],
    'Items/profile.yml': [
        {
            section: 'Profile Menu Item',
            description: 'Item that opens player stats and leaderboards',
            settings: [
                { key: 'profile-item.material', value: 'NETHER_STAR', description: 'Material of the item' },
                { key: 'profile-item.item_model', value: 'minecraft:nether_star', description: 'Custom model data' },
                { key: 'profile-item.slot', value: '0', description: 'Inventory slot' },
                { key: 'profile-item.action', value: 'PROFILE_MENU_OPEN', description: 'Action when clicked' },
                { key: 'profile-item.name', value: '&dᴘʀᴏꜰɪʟᴇ', description: 'Display name' },
                { key: 'profile-item.lore[0]', value: '&7ʀɪɢʜᴛ ᴄʟɪᴄᴋ ᴛᴏ ᴠɪᴇᴡ ʏᴏᴜʀ ꜱᴛᴀᴛꜱ', description: 'First lore line' },
                { key: 'profile-item.lore[1]', value: '&7ᴀɴᴅ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅꜱ', description: 'Second lore line' }
            ]
        }
    ],
    'Items/queue.yml': [
        {
            section: 'Queue Item - Not In Queue',
            description: 'Item shown when player is not in queue',
            settings: [
                { key: 'slot', value: '8', description: 'Inventory slot for queue item' },
                { key: 'not-in-queue.material', value: 'STICK', description: 'Material when not in queue' },
                { key: 'not-in-queue.item_model', value: 'minecraft:stick', description: 'Custom model' },
                { key: 'not-in-queue.action', value: 'QUEUE_TOGGLE', description: 'Action when clicked' },
                { key: 'not-in-queue.name', value: '&cǫᴜᴇᴜᴇ', description: 'Display name when not in queue' }
            ]
        },
        {
            section: 'Queue Item - In Queue',
            description: 'Item shown when player is in queue',
            settings: [
                { key: 'in-queue.material', value: 'BREEZE_ROD', description: 'Material when in queue' },
                { key: 'in-queue.item_model', value: 'minecraft:breeze_rod', description: 'Custom model when in queue' },
                { key: 'in-queue.action', value: 'QUEUE_TOGGLE', description: 'Action when clicked' },
                { key: 'in-queue.name', value: '&aǫᴜᴇᴜᴇ', description: 'Display name when in queue' }
            ]
        }
    ],
    'Items/training.yml': [
        {
            section: 'Training Mace',
            description: 'Mace given to players in training mode',
            settings: [
                { key: 'mace.material', value: 'MACE', description: 'Material of training mace' },
                { key: 'mace.item_model', value: 'minecraft:mace', description: 'Custom model data' },
                { key: 'mace.slot', value: '0', description: 'Inventory slot' },
                { key: 'mace.unbreakable', value: 'true', description: 'Mace never breaks' },
                { key: 'mace.name', value: '&6ᴛʀᴀɪɴɪɴɢ ᴍᴀᴄᴇ', description: 'Display name' }
            ]
        },
        {
            section: 'Training Wind Charge',
            description: 'Wind charge given to players in training mode',
            settings: [
                { key: 'wind-charge.material', value: 'WIND_CHARGE', description: 'Material' },
                { key: 'wind-charge.item_model', value: 'minecraft:wind_charge', description: 'Custom model' },
                { key: 'wind-charge.slot', value: '1', description: 'Inventory slot' },
                { key: 'wind-charge.amount', value: '1', description: 'Stack size' },
                { key: 'wind-charge.name', value: '&bᴛʀᴀɪɴɪɴɢ ᴡɪɴᴅ ᴄʜᴀʀɢᴇ', description: 'Display name' }
            ]
        }
    ],
    'menus/cosmeticsMenus/helmets.yml': [
        {
            section: 'Menu Settings',
            description: 'Configure the helmet shop menu appearance',
            settings: [
                { key: 'menu-type', value: 'DECORATIVE', description: 'DECORATIVE (fixed design), FILL (fill empty slots), or EMPTY (no borders)' },
                { key: 'title', value: '&dʜᴇʟᴍᴇᴛꜱ', description: 'Menu title with color codes' }
            ]
        },
        {
            section: 'GUI Messages',
            description: 'Text displayed on cosmetic items',
            settings: [
                { key: 'gui-messages.owned', value: '&aᴏᴡɴᴇᴅ', description: 'Shown when player owns the item' },
                { key: 'gui-messages.price', value: '&6ᴘʀɪᴄᴇ: &f{price} {icon}', description: 'Price display format' },
                { key: 'gui-messages.currently-selected', value: '&aᴄᴜʀʀᴇɴᴛʟʏ ꜱᴇʟᴇᴄᴛᴇᴅ', description: 'Shown when item is equipped' }
            ]
        },
        {
            section: 'Helmet Cosmetics',
            description: 'All 16 leather helmet colors available for purchase',
            settings: [
                { key: 'helmets.white', value: 'slot: 19, price: 500', description: 'White helmet in slot 19 for 500 coins' },
                { key: 'helmets.black', value: 'slot: 22, price: 500', description: 'Black helmet in slot 22 for 500 coins' },
                { key: 'helmets.red', value: 'slot: 24, price: 500', description: 'Red helmet in slot 24 for 500 coins' },
                { key: 'helmets.blue', value: 'slot: 33, price: 500', description: 'Blue helmet in slot 33 for 500 coins' }
            ]
        }
    ],
    'menus/cosmeticsMenus/poses.yml': [
        {
            section: 'Menu Settings',
            description: 'Configure the victory poses shop menu',
            settings: [
                { key: 'menu-type', value: 'DECORATIVE', description: 'Menu layout type' },
                { key: 'title', value: '&dᴠɪᴄᴛᴏʀʏ ᴘᴏꜱᴇꜱ', description: 'Menu title' }
            ]
        },
        {
            section: 'Victory Poses',
            description: 'Purchasable win animations',
            settings: [
                { key: 'poses.throne_room', value: 'price: 1000', description: 'Throne room victory pose - 1000 coins' },
                { key: 'poses.divine_intervention', value: 'price: 1000', description: 'Divine intervention pose - 1000 coins' },
                { key: 'poses.black_hole', value: 'price: 2500', description: 'Black hole pose - 2500 coins' }
            ]
        }
    ],
    'menus/main/cosmetics.yml': [
        {
            section: 'Main Cosmetics Menu',
            description: 'Main hub for all cosmetic categories',
            settings: [
                { key: 'menu-type', value: 'DECORATIVE', description: 'Menu layout type' },
                { key: 'title', value: '&dᴄᴏꜱᴍᴇᴛɪᴄꜱ ꜱʜᴏᴘ', description: 'Menu title' }
            ]
        },
        {
            section: 'Navigation Items',
            description: 'Buttons to access different cosmetic categories',
            settings: [
                { key: 'helmets-item.slot', value: '13', description: 'Slot for helmets category button' },
                { key: 'poses-item.slot', value: '30', description: 'Slot for victory poses button' },
                { key: 'player-head-item.slot', value: '22', description: 'Shows currently equipped cosmetics' }
            ]
        }
    ],
    'menus/main/profile.yml': [
        {
            section: 'Profile Menu',
            description: 'Displays player statistics',
            settings: [
                { key: 'menu-type', value: 'DECORATIVE', description: 'Menu layout type' },
                { key: 'title', value: '&dᴘʀᴏꜰɪʟᴇ ꜱᴛᴀᴛꜱ', description: 'Menu title' }
            ]
        },
        {
            section: 'Statistics Display',
            description: 'Items showing player stats',
            settings: [
                { key: 'kills-item.slot', value: '13', description: 'Slot for kills display' },
                { key: 'deaths-item.slot', value: '21', description: 'Slot for deaths display' },
                { key: 'wins-item.slot', value: '23', description: 'Slot for wins display' },
                { key: 'winrate-item.slot', value: '30', description: 'Slot for win rate display' },
                { key: 'kdr-item.slot', value: '32', description: 'Slot for K/D ratio display' }
            ]
        },
        {
            section: 'Available Placeholders',
            description: 'Placeholders you can use in lore',
            settings: [
                { key: '{player-name}', value: 'Player name', description: 'Shows current player name' },
                { key: '{kills}', value: 'Kill count', description: 'Total kills' },
                { key: '{deaths}', value: 'Death count', description: 'Total deaths' },
                { key: '{wins}', value: 'Win count', description: 'Total wins' },
                { key: '{winrate}%', value: 'Win percentage', description: 'Win rate as percentage' },
                { key: '{kdr}', value: 'K/D ratio', description: 'Kill/death ratio' }
            ]
        }
    ],
    'menus/profileMenus/leaderboard.yml': [
        {
            section: 'Leaderboard Menu',
            description: 'Shows top players by different stats',
            settings: [
                { key: 'menu-type', value: 'DECORATIVE', description: 'Menu layout type' },
                { key: 'title', value: '&dʟᴇᴀᴅᴇʀʙᴏᴀʀᴅꜱ', description: 'Menu title' }
            ]
        },
        {
            section: 'Leaderboard Categories',
            description: 'Different leaderboard displays',
            settings: [
                { key: 'kills-item.slot', value: '10', description: 'Top kills leaderboard position' },
                { key: 'wins-item.slot', value: '13', description: 'Top wins leaderboard position' },
                { key: 'games-item.slot', value: '16', description: 'Top games played leaderboard' },
                { key: 'coins-item.slot', value: '31', description: 'Top coins leaderboard' },
                { key: 'level-item.slot', value: '34', description: 'Top level leaderboard' }
            ]
        },
        {
            section: 'Leaderboard Placeholders',
            description: 'Placeholders for leaderboard positions',
            settings: [
                { key: '{1} through {10}', value: 'Rank 1-10', description: 'Shows player name and value for each rank' }
            ]
        }
    ]
};


// Initialize config viewer with improved guide
document.addEventListener('DOMContentLoaded', () => {
    const configTabs = document.querySelectorAll('.config-tab');
    const configContent = document.getElementById('config-content');
    const currentFilename = document.getElementById('current-filename');
    const copyBtn = document.getElementById('copy-config-btn');
    const toggleExplainBtn = document.getElementById('toggle-explain-btn');
    let currentConfig = 'config.yml';
    let showingExplain = false; // Start with guide view by default

    function generateGuideHTML(filename) {
        const guide = configGuides[filename];
        if (!guide) return '<div class="config-guide-error">No guide available for this configuration file.</div>';
        
        let html = '<div class="config-guide">';
        
        guide.forEach(section => {
            html += `
                <div class="guide-section">
                    <div class="guide-section-header">
                        <i class="fa-solid fa-circle-info"></i>
                        <h3>${section.section}</h3>
                    </div>
                    <div class="guide-section-desc">${section.description}</div>
                    <div class="guide-settings">
            `;
            
            section.settings.forEach(setting => {
                html += `
                    <div class="guide-setting">
                        <div class="guide-setting-key">${setting.key}</div>
                        <div class="guide-setting-value">${setting.value}</div>
                        <div class="guide-setting-desc">${setting.description}</div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }

    function loadConfig(filename) {
        currentConfig = filename;
        currentFilename.textContent = filename;
        
        if (showingExplain) {
            configContent.innerHTML = generateGuideHTML(filename);
            toggleExplainBtn.innerHTML = '<i class="fa-solid fa-code"></i> Raw'; // Show "Raw" because clicking will show raw
        } else {
            const raw = configContents[filename];
            configContent.innerHTML = `<pre><code>${raw.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
            toggleExplainBtn.innerHTML = '<i class="fa-solid fa-book-open"></i> Guide'; // Show "Guide" because clicking will show guide
        }
        
        // Update active tab
        configTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.config === filename);
        });
    }

    // Tab click
    configTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            loadConfig(tab.dataset.config);
        });
    });

    // Toggle explain
    toggleExplainBtn.addEventListener('click', () => {
        showingExplain = !showingExplain;
        if (showingExplain) {
            configContent.innerHTML = generateGuideHTML(currentConfig);
            toggleExplainBtn.innerHTML = '<i class="fa-solid fa-code"></i> Raw'; // Now on Guide, button shows Raw
        } else {
            const raw = configContents[currentConfig];
            configContent.innerHTML = `<pre><code>${raw.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
            toggleExplainBtn.innerHTML = '<i class="fa-solid fa-book-open"></i> Guide'; // Now on Raw, button shows Guide
        }
    });

    // Copy button
    copyBtn.addEventListener('click', () => {
        const raw = configContents[currentConfig];
        navigator.clipboard.writeText(raw).then(() => {
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.innerHTML = original;
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });

    // Load default config.yml with guide view
    loadConfig('config.yml');

    // Make config cards clickable to switch
    document.querySelectorAll('.config-card').forEach(card => {
        card.addEventListener('click', () => {
            const configName = card.dataset.config;
            if (configName) {
                loadConfig(configName);
                // Scroll to viewer
                document.querySelector('.config-viewer').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Command category filtering
document.querySelectorAll('.cmd-category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active button
        document.querySelectorAll('.cmd-category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show/hide command groups
        document.querySelectorAll('.cmd-group').forEach(group => {
            if (group.dataset.category === category) {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
            }
        });
    });
});

// Quick reference toggle
const quickRefToggle = document.querySelector('.quick-ref-toggle');
if (quickRefToggle) {
    quickRefToggle.addEventListener('click', function() {
        const table = document.querySelector('.quick-ref-table');
        table.classList.toggle('collapsed');
        this.textContent = table.classList.contains('collapsed') ? 'Expand Table' : 'Toggle Table';
    });
}

// CREDITS COPY FUNCTION (make it globally available)
window.copyContact = function (text, el) {
    navigator.clipboard.writeText(text).then(() => {
        const orig = el.innerHTML;
        el.innerHTML = '<i class="fas fa-check"></i>';
        el.style.background = 'rgba(34,197,94,0.2)';
        el.style.borderColor = 'rgba(34,197,94,0.4)';
        el.style.color = '#22c55e';
        const n = document.createElement('div');
        n.className = 'copy-notification';
        n.textContent = `✓ Copied "${text}"`;
        document.body.appendChild(n);
        setTimeout(() => {
            el.innerHTML = orig;
            el.style.background = '';
            el.style.borderColor = '';
            el.style.color = '';
            n.remove();
        }, 2000);
    });
}

// SMOOTH NAV SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const targetId = a.getAttribute('href');
        if (targetId === '#') return;
        const t = document.querySelector(targetId);
        if (t) {
            e.preventDefault();
            t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
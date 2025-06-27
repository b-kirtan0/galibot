const galiOptions = {
  us: ["asshole", "dickhead", "motherfucker", "pussy", "cunt"],
  india: ["madarchod", "bhenchod", "chutiya", "gaandu", "lauda"],
  nepal: ["kukur", "muji", "jatha", "masala", "rando"]
};

// --- In-memory user database ---
let users = [];
let isLoginMode = true;
let currentUser = null;
let currentUserRegion = null;
let currentUserGali = null;
let currentUserFullName = null;

const regionSelect = document.getElementById('region-select');
const galiSelect = document.getElementById('gali-select');
const usernameInput = document.getElementById('username');
const tagInput = document.getElementById('tag');
const passwordInput = document.getElementById('password');

window.onload = function() {
  document.getElementById('codeword-screen').style.display = 'flex';
  document.getElementById('chat-screen').style.display = 'none';
};

function verifyCodeword() {
  const code = document.getElementById('codeword-input').value;
  if (code.toLowerCase() === 'galiunlock') {
    document.getElementById('codeword-screen').style.display = 'none';
    document.getElementById('chat-screen').style.display = 'flex';
    document.getElementById('screen-title').style.display = 'none';
    // Set default user for chat
    currentUserFullName = 'You';
    currentUserGali = 'friend';
    setupChat();
  } else {
    alert('Wrong codeword. Try again.');
  }
}

// Add Enter key support for codeword input
const codewordInput = document.getElementById('codeword-input');
if (codewordInput) {
  codewordInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') verifyCodeword();
  });
}

function setupChat() {
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const chatMessages = document.getElementById('chat-messages');

  chatInput.disabled = false;
  sendBtn.disabled = false;
  chatInput.value = '';
  chatInput.focus();

  // Clear previous chat messages when entering chat
  chatMessages.innerHTML = '<div style="margin-bottom:12px;"><span style="color:#21d015; font-weight:bold;">GaliBot</span>: Welcome to the chat!</div>';

  sendBtn.onclick = function() {
    sendMessage();
  };
  chatInput.onkeydown = function(e) {
    if (e.key === 'Enter') sendMessage();
  };

  function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    appendMessage(currentUserFullName || 'You', msg, '#03a9f4');
    chatInput.value = '';
    setTimeout(() => {
      botReply(msg);
    }, 500);
  }

  function botReply(userMsg) {
    // Pick a random gali from all regions for every reply
    const allGalis = [].concat(galiOptions.us, galiOptions.india, galiOptions.nepal);
    let gali = allGalis[Math.floor(Math.random() * allGalis.length)];
    let reply = '';
    // Math
    if (/^\d+[\s\+\-\*\/]+\d+/.test(userMsg)) {
      try {
        reply = `Are you so dumb you can't do math, ${gali}? It's ${eval(userMsg)}.`;
      } catch {
        reply = `Even your math is as bad as your face, ${gali}.`;
      }
    } else if (/time|date/i.test(userMsg)) {
      const now = new Date();
      reply = `It's ${now.toLocaleString()} you ${gali}.`;
    } else if (/weather/i.test(userMsg)) {
      reply = `Look outside, ${gali}. Or use Google, I'm not your weather app.`;
    } else if (/who|what|why|how|when|where|fact|tell/i.test(userMsg)) {
      // Factual/witty
      const facts = [
        `Did you know? Honey never spoils, unlike your attitude, ${gali}.`,
        `The moon has moonquakes. You probably have brainquakes, ${gali}.`,
        `Octopuses have three hearts. You have none, ${gali}.`,
        `Bananas are berries, but strawberries aren't. Confusing, like you, ${gali}.`,
        `A group of flamingos is called a 'flamboyance'. You're just annoying, ${gali}.`
      ];
      reply = facts[Math.floor(Math.random() * facts.length)];
    } else if (/hi|hello|hey/i.test(userMsg)) {
      reply = `Oh, it's you again, ${gali}. What do you want?`;
    } else {
      // Fallback witty
      const witty = [
        `Try harder, ${gali}.`,
        `Is that all you've got, ${gali}?`,
        `You type like a ${gali}.`,
        `Ask something interesting, ${gali}.`,
        `I'm not your therapist, ${gali}.`,
        `You want a medal for that, ${gali}?`,
        `Go touch grass, ${gali}.`,
        `You need help, ${gali}.`,
        `Boring! Next, ${gali}.`,
        `You make less sense than a ${gali}.`
      ];
      reply = witty[Math.floor(Math.random() * witty.length)];
    }
    appendMessage('GaliBot', reply, '#21d015');
  }
}

function appendMessage(sender, msg, color) {
  const chatMessages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-message';
  div.innerHTML = `<span style="color:${color}; font-weight:bold;">${sender}</span>: ${msg}`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

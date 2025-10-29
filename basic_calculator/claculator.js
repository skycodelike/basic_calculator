const display = document.getElementById('display');
let current = '';
let memory = 0;

function updateDisplay(value) {
  display.textContent = value.length > 12 ? value.slice(0, 12) : value;
}

// Handle button clicks
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => handleInput(btn.textContent.trim()));
});

function handleInput(val) {
  if (val === 'OFF') {
    display.textContent = '';
     display.style.backgroundColor ='#000';
     display.style.color = 'transparent';
    
    current = '';
    updateDisplay('0');
    return;
    }

  if (val === 'AC') {
    current = '';
    display.style.backgroundColor ='#b9d3a4';
    display.style.color = 'black';
    updateDisplay('0');
    return;
  }

  if (val === 'C') {
    current = current.slice(0, -1);
    updateDisplay(current || '0');
    return;
  }

  if (val === '+/-') {
    if (current.startsWith('-')) current = current.slice(1);
    else if (current) current = '-' + current;
    updateDisplay(current);
    return;
  }

  if (val === '%') {
    current = (parseFloat(current) / 100).toString();
    updateDisplay(current);
    return;
  }

  if (val === '√') {
    current = Math.sqrt(parseFloat(current) || 0).toString();
    updateDisplay(current);
    return;
  }

  if (val === 'M+') {
    memory += parseFloat(current) || 0;
    return;
  }

  if (val === 'M-') {
    memory -= parseFloat(current) || 0;
    return;
  }

  if (val === 'MRC') {
    current = memory.toString();
    updateDisplay(current);
    return;
  }

  if (val === '=') {
    try {
      current = eval(current).toString();
      updateDisplay(current);
    } catch {
      updateDisplay('Error');
      current = '';
    }
    return;
  }

  // Numbers or operators
  if (['+', '-', '*', '/', '.'].includes(val) || !isNaN(val)) {
    current += val;
    updateDisplay(current);
  }
}

// --- Keyboard / Numpad support ---
document.addEventListener('keydown', e => {
  const key = e.key;

  // Map keyboard keys to calculator buttons
  const map = {
    'Enter': '=',
    'Escape': 'AC',
    'Backspace': 'C',
  };

  const input = map[key] || key;

  // Allow only valid keys
  if (/^[0-9+\-*/.=]$/.test(input) || ['Enter', 'Escape', 'Backspace', '%'].includes(key)) {
    handleInput(input === 'Enter' ? '=' : input);
    highlightKey(input);
  }
});

// Visual feedback for key press
function highlightKey(char) {
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.trim() === char) {
      btn.classList.add('active-key');
      setTimeout(() => btn.classList.remove('active-key'), 150);
    }
  });
}

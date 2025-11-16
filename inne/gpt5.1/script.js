const copyIpBtn = document.getElementById('copyIpBtn');
const toast = document.getElementById('toast');
const yearEl = document.getElementById('year');
const statusText = document.getElementById('statusText');
const playersOnline = document.getElementById('playersOnline');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (copyIpBtn && toast) {
  copyIpBtn.addEventListener('click', async () => {
    const ip = 'mc.takemc.pl';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(ip);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = ip;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast('Skopiowano IP serwera!');
    } catch (e) {
      showToast('Nie udało się skopiować IP.');
    }
  });
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// Prosta animacja przewijania sekcji
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  },
  {
    threshold: 0.18,
  }
);

const sections = document.querySelectorAll('.section');
sections.forEach((section) => {
  section.classList.add('section-hidden');
  observer.observe(section);
});

// Placeholder API status / licznik graczy (do podłączenia pod prawdziwe API)
async function fetchServerStatus() {
  if (!statusText || !playersOnline) return;

  try {
    // Tutaj możesz podpiąć prawdziwe API od statusu serwera
    // Na razie wstawiam delikatny "fejkowy" status, żeby coś się działo wizualnie.
    await new Promise((r) => setTimeout(r, 800));
    const min = 5;
    const max = 60;
    const current = Math.floor(Math.random() * (max - min + 1)) + min;

    statusText.textContent = 'Online';
    statusText.classList.remove('offline');
    playersOnline.textContent = `${current} / 200`;
  } catch (e) {
    statusText.textContent = 'Offline';
    statusText.classList.add('offline');
    playersOnline.textContent = '0 / 0';
  }
}

fetchServerStatus();

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

const copyIp = () => {
    const ipAddress = document.getElementById('ip-address').innerText;
    navigator.clipboard.writeText(ipAddress).then(() => {
        const tooltip = document.getElementById('copy-tooltip');
        tooltip.classList.add('visible');
        setTimeout(() => {
            tooltip.classList.remove('visible');
        }, 2000);
    });
}

// Funkcja do animacji licznika
const animateStats = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Im większa wartość, tym wolniejsza animacja

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Uruchomienie funkcji
navSlide();

// Listener do przycisku kopiowania IP
// Sprawdzamy, czy element istnieje, zanim dodamy listener
const copyBtn = document.querySelector('.ip-container button');
if (copyBtn) {
    copyBtn.addEventListener('click', copyIp);
}


// Uruchomienie animacji statystyk, gdy sekcja jest widoczna
const statsSection = document.querySelector('#stats');
if (statsSection) {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateStats();
            observer.disconnect(); // Uruchom animację tylko raz
        }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

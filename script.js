// --- Mobile Menu Toggle ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// --- Typewriter Effect ---
const words = ["Scalable Web Apps.", "Backend Architectures.", "Secure Applications.", "Full-Stack Solutions."];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typewriter').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typewriter').innerHTML = word.join("");
        } else {
            i = (i + 1) % words.length;
            setTimeout(typingEffect, 500);
            return;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

typingEffect();

// --- Skills Filter ---
const filterBtns = document.querySelectorAll('.skill-filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/30');
            b.classList.add('bg-slate-800', 'text-slate-300', 'border', 'border-slate-700/60');
        });
        btn.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/30');
        btn.classList.remove('bg-slate-800', 'text-slate-300', 'border', 'border-slate-700/60');

        const filter = btn.getAttribute('data-filter');

        skillCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// --- Project Modal Data & Logic ---
const projectData = {
    heha: {
        title: "Heha Movers Web App",
        tag: "Web Application",
        desc: "A professional web platform built for a Kenyan relocation business. Features structured folder routing, backend server handling with Node.js and Express, and persistent SQLite database integration to manage client inquiries and logistics records.",
        tech: ["Node.js", "Express", "SQLite", "HTML5", "Tailwind CSS"],
        link: "https://github.com"
    },
    akan: {
        title: "Akan Name Generator",
        tag: "Frontend Application",
        desc: "A school assignment web application that calculates and displays traditional Ghanaian Akan names based on the user's birthdate and gender. Fully responsive and deployed live via GitHub Pages.",
        tech: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
        link: "https://github.com"
    },
    kivy: {
        title: "Python Kivy Mobile Utility",
        tag: "Mobile Application",
        desc: "An exploratory cross-platform mobile application prototype built using Python and the Kivy framework, showcasing custom UI components and event handling.",
        tech: ["Python", "Kivy Framework", "Mobile UI"],
        link: "https://github.com"
    }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalTag = document.getElementById('modal-tag');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');
const modalLink = document.getElementById('modal-link');

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalTag.textContent = project.tag;
    modalDesc.textContent = project.desc;
    modalLink.href = project.link;

    modalTech.innerHTML = '';
    project.tech.forEach(t => {
        const badge = document.createElement('span');
        badge.className = 'px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono';
        badge.textContent = t;
        modalTech.appendChild(badge);
    });

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProjectModal();
    }
});

// --- Contact Form Validation & Submission ---
const contactForm = document.getElementById('contact-form');
const successBanner = document.getElementById('form-success-banner');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    // Reset errors
    [nameError, emailError, subjectError, messageError].forEach(el => {
        el.textContent = '';
        el.classList.add('hidden');
    });

    if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        nameError.classList.remove('hidden');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        emailError.classList.remove('hidden');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.remove('hidden');
        isValid = false;
    }

    if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter your message.';
        messageError.classList.remove('hidden');
        isValid = false;
    }

    if (isValid) {
        successBanner.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => {
            successBanner.classList.add('hidden');
        }, 6000);
    }
});
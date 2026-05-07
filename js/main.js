// Particles.js initialization
if (window.particlesJS) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#90caf9" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#90caf9",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true
      }
    },
    retina_detect: true
  });
}

// Section reveal on scroll
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { 
    if (entry.isIntersecting) {
      entry.target.classList.add("visible"); 
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Smooth scroll
document.querySelectorAll("nav a, .btn").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    if (this.getAttribute("href") && this.getAttribute("href").startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        
        // Close mobile menu if open
        setMobileMenuState(false);
      }
    }
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

const setMobileMenuState = (isOpen) => {
  navMenu.classList.toggle('show', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');

  const icon = navToggle.querySelector('i');
  icon.classList.toggle('fa-bars', !isOpen);
  icon.classList.toggle('fa-times', isOpen);
};

navToggle.addEventListener('click', () => {
  setMobileMenuState(!navMenu.classList.contains('show'));
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    setMobileMenuState(false);
  });
});

// Project modal
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const projectGallery = document.getElementById('projectGallery');

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

const renderList = (items) => items
  .map(item => `<li>${escapeHtml(item)}</li>`)
  .join('');

const renderBadges = (badges) => badges
  .map(badge => `<span class="project-badge">${escapeHtml(badge)}</span>`)
  .join('');

const renderAppLinks = (project, title, showLabels = false) => `
  <a
    href="${escapeHtml(project.links.android)}"
    class="proj-link"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="${escapeHtml(title)} Android app"
  >
    <i class="fab fa-android"></i>
    ${showLabels ? '<span>Android App</span>' : ''}
  </a>
  <a
    href="${escapeHtml(project.links.ios)}"
    class="proj-link"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="${escapeHtml(title)} iOS app"
  >
    <i class="fab fa-apple"></i>
    ${showLabels ? '<span>iOS App</span>' : ''}
  </a>
`;

const renderProjectCards = () => {
  projectGallery.innerHTML = Object.entries(projectDetails).map(([title, project]) => `
    <div
      class="proj-card"
      role="button"
      tabindex="0"
      data-project-title="${escapeHtml(title)}"
      aria-label="View ${escapeHtml(title)} project details"
    >
      <div class="proj-img-container">
        <div class="project-badges">${renderBadges(project.badges)}</div>
        <div class="proj-placeholder">
          <i class="${escapeHtml(project.icon)}"></i>
          <span>${escapeHtml(title)}</span>
        </div>
        <div class="proj-overlay">
          <div class="proj-links">${renderAppLinks(project, title)}</div>
        </div>
      </div>
      <div class="proj-content">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(project.shortDescription)}</p>
        <div class="proj-stats">
          <span class="proj-stat"><i class="fas fa-download"></i> ${escapeHtml(project.stats.downloads)}</span>
          <span class="proj-stat"><i class="fas fa-star"></i> ${escapeHtml(project.stats.rating)}</span>
        </div>
        <div class="project-action">
          <span>View details</span>
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  `).join('');
};

const closeProjectModal = () => {
  projectModal.classList.remove('open');
  document.body.style.overflow = 'auto';
};

const openProjectModal = (title) => {
  const project = projectDetails[title];

  if (!project) {
    return;
  }

  const aiLayerSection = project.aiHighlights?.length ? `
    <div class="modal-section">
      <h3 class="modal-section-title">AI / Intelligence Layer</h3>
      <ul class="modal-feature-list">${renderList(project.aiHighlights)}</ul>
    </div>
  ` : '';

  modalBody.innerHTML = `
    <div class="modal-header">
      <div class="modal-icon">
        <i class="${escapeHtml(project.icon)}"></i>
      </div>
      <div>
        <div class="modal-badges">${renderBadges(project.badges)}</div>
        <h2 class="modal-title" id="projectModalTitle">${escapeHtml(title)}</h2>
        <p class="modal-description">${escapeHtml(project.description)}</p>
      </div>
    </div>
    <div class="modal-stats">
      <span class="proj-stat"><i class="fas fa-download"></i> ${escapeHtml(project.stats.downloads)}</span>
      <span class="proj-stat"><i class="fas fa-star"></i> ${escapeHtml(project.stats.rating)}</span>
    </div>
    <div class="modal-section">
      <h3 class="modal-section-title">My Role</h3>
      <p class="modal-description">${escapeHtml(project.role)}</p>
    </div>
    ${aiLayerSection}
    <div class="modal-section">
      <h3 class="modal-section-title">Architecture Highlights</h3>
      <ul class="modal-feature-list">${renderList(project.architectureHighlights)}</ul>
    </div>
    <div class="modal-section">
      <h3 class="modal-section-title">Business Impact</h3>
      <p class="modal-description">${escapeHtml(project.impact)}</p>
    </div>
    <div class="modal-section">
      <h3 class="modal-section-title">App Links</h3>
      <div class="modal-links">${renderAppLinks(project, title, true)}</div>
    </div>
    <h3 class="modal-section-title">Technologies Used</h3>
    <div class="modal-tech-list">
      ${project.technologies.map(tech => `<div class="skill-item">${escapeHtml(tech)}</div>`).join('')}
    </div>
    <h3 class="modal-section-title">Key Features</h3>
    <ul class="modal-feature-list">${renderList(project.features)}</ul>
  `;

  projectModal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

renderProjectCards();

projectGallery.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    return;
  }

  const card = e.target.closest('.proj-card');

  if (card) {
    openProjectModal(card.dataset.projectTitle);
  }
});

projectGallery.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') {
    return;
  }

  const card = e.target.closest('.proj-card');

  if (card) {
    e.preventDefault();
    openProjectModal(card.dataset.projectTitle);
  }
});

modalClose.addEventListener('click', closeProjectModal);

projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    closeProjectModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('open')) {
    closeProjectModal();
  }
});

// Contact form handling for Formspree
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  formMessage.classList.remove('success', 'error');
  
  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
      formMessage.classList.add('success');
      contactForm.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    formMessage.textContent = 'Oops! There was a problem sending your message. Please try again or email me directly.';
    formMessage.classList.add('error');
  }
});

// Dynamic footer year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Initialize with navbar state
if (window.scrollY > 100) {
  navbar.classList.add('scrolled');
}

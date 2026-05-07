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
        navMenu.classList.remove('show');
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

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  
  // Change icon based on menu state
  const icon = navToggle.querySelector('i');
  if (navMenu.classList.contains('show')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Project modal
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent;
    const stats = card.querySelector('.proj-stats').innerHTML;
    const links = card.querySelector('.proj-links').innerHTML;
    
    const project = projectDetails[title];
    
    modalBody.innerHTML = `
      <h2 class="modal-title">${title}</h2>
      <p class="modal-description">${project.description}</p>
      <div class="modal-stats">${stats}</div>
      <div class="modal-section">
        <h3 class="modal-section-title">App Links</h3>
        <div class="modal-links">${links}</div>
      </div>
      <h3 class="modal-section-title">Technologies Used</h3>
      <div class="modal-tech-list">
        ${project.technologies.map(tech => `<div class="skill-item">${tech}</div>`).join('')}
      </div>
      <h3 class="modal-section-title">Key Features</h3>
      <ul class="modal-feature-list">
        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    `;
    
    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', () => {
  projectModal.classList.remove('open');
  document.body.style.overflow = 'auto';
});

// Contact form handling for Formspree
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  
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

// Initialize with navbar state
if (window.scrollY > 100) {
  navbar.classList.add('scrolled');
}

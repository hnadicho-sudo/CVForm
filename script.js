const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const revealItems = document.querySelectorAll('.reveal');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sections = document.querySelectorAll('main section[id]');
const navMap = new Map(
  Array.from(navLinks).map((link) => {
    const targetId = link.getAttribute('href');
    return [targetId, link];
  })
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = `#${entry.target.id}`;
      navMap.forEach((link, href) => {
        link.classList.toggle('active', href === id);
      });
    });
  },
  {
    threshold: 0.45,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const animateSkills = () => {
  skillProgressBars.forEach((bar) => {
    const level = bar.dataset.level || '0';
    bar.style.width = `${level}%`;
  });
};

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills();
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  skillsObserver.observe(skillsSection);
}

const currentYear = document.getElementById('current-year');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const toggleTheme = () => {
  document.body.classList.toggle('dark-theme');
  const icon = themeToggle?.querySelector('.theme-icon');
  if (icon) {
    icon.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  }
};

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

const handleBackToTop = () => {
  if (!backToTop) return;

  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
};

window.addEventListener('scroll', handleBackToTop);

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const setFormMessage = (message, type) => {
  if (!formMessage) return;
  formMessage.textContent = message;
  formMessage.className = 'form-message';
  formMessage.classList.add(type);
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    const fields = [name, email, subject, message];
    const missingField = fields.find((field) => !field.value.trim());

    if (missingField) {
      setFormMessage('Please complete all fields before sending your message.', 'error');
      missingField.focus();
      return;
    }

    if (!validateEmail(email.value.trim())) {
      setFormMessage('Please enter a valid email address.', 'error');
      email.focus();
      return;
    }

    setFormMessage('Your message is ready to be sent. Connect this form to a backend service to receive emails.', 'success');
    contactForm.reset();
  });
}

const downloadButton = document.getElementById('download-cv');
if (downloadButton) {
  downloadButton.addEventListener('click', (event) => {
    event.preventDefault();

    const cvUrl = 'cv.pdf';
    const fallbackText = 'Hnin Nadi Cho\nJunior Web Developer\nNCC Level 4 Diploma in Computing Student\nEmail: hnadicho@gmail.com\nPhone: 09 259 508 607';

    fetch(cvUrl, { method: 'HEAD' })
      .then((response) => {
        if (response.ok) {
          const link = document.createElement('a');
          link.href = cvUrl;
          link.download = 'Hnin-Nadi-Cho-CV.pdf';
          document.body.appendChild(link);
          link.click();
          link.remove();
          return;
        }

        const blob = new Blob([fallbackText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const fallbackLink = document.createElement('a');
        fallbackLink.href = url;
        fallbackLink.download = 'Hnin-Nadi-Cho-CV.txt';
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        fallbackLink.remove();
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        const blob = new Blob([fallbackText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const fallbackLink = document.createElement('a');
        fallbackLink.href = url;
        fallbackLink.download = 'Hnin-Nadi-Cho-CV.txt';
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        fallbackLink.remove();
        URL.revokeObjectURL(url);
      });
  });
}

handleBackToTop();

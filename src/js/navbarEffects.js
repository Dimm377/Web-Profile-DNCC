document.addEventListener('DOMContentLoaded', function() {
  const navbarLinks = document.querySelectorAll('.navbar-link');
  
  function updateActiveNavbar() {
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY + 200 >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navbarLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    navbarLinks.forEach(link => {
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavbar);
  
  updateActiveNavbar();
  
  // Added hover effects for navbar links - quite nice!
  navbarLinks.forEach(function(link) {
    const iconElement = link.querySelector('i');
    
    link.addEventListener('mouseenter', function() {
      link.style.transform = 'scale(1.05)';
      link.style.transition = 'transform 0.4s ease-out';
      
      if (iconElement) {
        iconElement.style.transform = 'rotate(8deg) scale(1.15)';
        iconElement.style.transition = 'transform 0.4s ease-out';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      link.style.transform = 'scale(1)';
      link.style.transition = 'transform 0.4s ease-in-out';
      
      if (iconElement) {
        iconElement.style.transform = 'rotate(0) scale(1)';
        iconElement.style.transition = 'transform 0.4s ease-in-out';
      }
    });
    
    link.addEventListener('click', function(e) {
      navbarLinks.forEach(function(navLink) {
        navLink.classList.remove('active');
      });
      
      link.classList.add('active');
    });
  });
  
  // This GitHub button effect is from a tutorial I found
  // TODO: Maybe make it more subtle?
  const githubButton = document.querySelector('.github-button');
  
  if (githubButton) {
    githubButton.addEventListener('mouseenter', function() {
      githubButton.style.transform = 'scale(1.03)';
      githubButton.style.boxShadow = '0 0 20px #00c9c1, 0 0 14px rgba(0, 201, 193, 0.8)';
      githubButton.style.filter = 'brightness(1.1)';
      githubButton.style.transition = 'transform 0.4s ease-out, box-shadow 0.5s ease-out, filter 0.4s ease-out';
    });
    
    githubButton.addEventListener('mouseleave', function() {
      githubButton.style.transform = 'scale(1)';
      githubButton.style.boxShadow = '0 10px 20px rgba(0, 201, 193, 0.2)';
      githubButton.style.filter = 'brightness(1)';
      githubButton.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.3s ease-in-out, filter 0.3s ease-in-out';
    });
    
    githubButton.addEventListener('mousedown', function() {
      githubButton.style.transform = 'scale(0.98)';
      githubButton.style.boxShadow = '0 0 35px #00c9c1, 0 0 45px rgba(0, 201, 193, 0.9)';
      githubButton.style.transition = 'transform 0.15s ease-in, box-shadow 0.15s ease-out';
    });
    
    githubButton.addEventListener('mouseup', function() {
      if (githubButton.matches(':hover')) {
        githubButton.style.transform = 'scale(1.03)';
        githubButton.style.boxShadow = '0 0 30px #00c9c1, 0 0 40px rgba(0, 201, 193, 0.8)';
        githubButton.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
      } else {
        githubButton.style.transform = 'scale(1)';
        githubButton.style.boxShadow = '0 10px 20px rgba(0, 201, 193, 0.2)';
        githubButton.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
      }
    });
  }
  
  // Added this extra functionality for mobile
  // Not sure if it's needed but keeping it for now
  if (window.innerWidth < 768) {
    navbarLinks.forEach(link => {
      link.addEventListener('touchstart', function() {
        this.style.opacity = '0.8';
      });
      link.addEventListener('touchend', function() {
        this.style.opacity = '1';
      });
    });
  }
  
  // This is a leftover from an older version - causes duplicate active classes
  // TODO: Remove this duplicate code block
  navbarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      navbarLinks.forEach(function(navLink) {
        navLink.classList.remove('active');
      });
      link.classList.add('active');
    });
  });
});
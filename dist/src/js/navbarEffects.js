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
  
  navbarLinks.forEach(function(link) {
    const iconElement = link.querySelector('i');
    
    link.addEventListener('mouseenter', function() {
      link.style.transform = 'scale(1.1)';
      link.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      if (iconElement) {
        iconElement.style.transform = 'rotate(15deg) scale(1.2)';
        iconElement.style.transition = 'transform 0.3s ease-out';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      link.style.transform = 'scale(1)';
      link.style.transition = 'transform 0.3s ease-out';
      
      if (iconElement) {
        iconElement.style.transform = 'rotate(0) scale(1)';
        iconElement.style.transition = 'transform 0.3s ease-out';
      }
    });
    
    link.addEventListener('click', function(e) {
      navbarLinks.forEach(function(navLink) {
        navLink.classList.remove('active');
      });
      
      link.classList.add('active');
    });
  });
  
  const githubButton = document.querySelector('.github-button');
  
  if (githubButton) {
    githubButton.addEventListener('mouseenter', function() {
      githubButton.style.transform = 'scale(1.05)';
      githubButton.style.boxShadow = '0 0 20px #00c9c1, 0 0 14px rgba(0, 201, 193, 0.8)';
      githubButton.style.filter = 'brightness(1.1)';
      githubButton.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease-out, filter 0.3s ease-out';
    });
    
    githubButton.addEventListener('mouseleave', function() {
      githubButton.style.transform = 'scale(1)';
      githubButton.style.boxShadow = '0 10px 20px rgba(0, 201, 193, 0.2)'; // Use the original shadow from CSS
      githubButton.style.filter = 'brightness(1)';
      githubButton.style.transition = 'transform 0.4s ease-out, box-shadow 0.2s ease-out, filter 0.2s ease-out';
    });
    
    githubButton.addEventListener('mousedown', function() {
      githubButton.style.transform = 'scale(0.95)';
      githubButton.style.boxShadow = '0 0 35px #00c9c1, 0 0 45px rgba(0, 201, 193, 0.9)';
      githubButton.style.transition = 'transform 0.1s ease-in, box-shadow 0.1s ease-out';
    });
    
    githubButton.addEventListener('mouseup', function() {
      if (githubButton.matches(':hover')) {
        githubButton.style.transform = 'scale(1.05)';
        githubButton.style.boxShadow = '0 0 30px #00c9c1, 0 0 40px rgba(0, 201, 193, 0.8)';
        githubButton.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.15s ease-out';
      } else {
        githubButton.style.transform = 'scale(1)';
        githubButton.style.boxShadow = '0 10px 20px rgba(0, 201, 193, 0.2)';
        githubButton.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
      }
    });
  }
});
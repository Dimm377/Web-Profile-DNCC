document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    
    if (!mobileMenu.classList.contains('hidden')) {
      // Ganti GSAP dengan CSS transitions
      menuIcon.style.opacity = '0';
      menuIcon.style.transition = 'opacity 0.2s ease-out';
      
      setTimeout(() => {
        closeIcon.style.opacity = '1';
        closeIcon.style.transition = 'opacity 0.2s ease-out';
      }, 100);
      
      mobileMenuButton.classList.add('active');
    } 
    else {
      closeIcon.style.opacity = '0';
      closeIcon.style.transition = 'opacity 0.2s ease-out';
      
      setTimeout(() => {
        menuIcon.style.opacity = '1';
        menuIcon.style.transition = 'opacity 0.2s ease-out';
      }, 100);
      
      mobileMenuButton.classList.remove('active');
    }
  }
  
  function closeMenuOnClick() {
    mobileMenu.classList.add('hidden');
    
    closeIcon.style.opacity = '0';
    closeIcon.style.transition = 'opacity 0.2s ease-out';
    
    setTimeout(() => {
      menuIcon.style.opacity = '1';
      menuIcon.style.transition = 'opacity 0.2s ease-out';
    }, 100);
    
    mobileMenuButton.classList.remove('active');
  }
  
  function closeMenuOnClickOutside(event) {
    const isClickInsideNav = mobileMenuButton.contains(event.target) || mobileMenu.contains(event.target);
    
    if (!isClickInsideNav && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      
      closeIcon.style.opacity = '0';
      closeIcon.style.transition = 'opacity 0.2s ease-out';
      
      setTimeout(() => {
        menuIcon.style.opacity = '1';
        menuIcon.style.transition = 'opacity 0.2s ease-out';
      }, 100);
      
      mobileMenuButton.classList.remove('active');
    }
  }
  
  mobileMenuButton.addEventListener('click', toggleMobileMenu);
  
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenuOnClick);
  });
  
  document.addEventListener('click', closeMenuOnClickOutside);
});
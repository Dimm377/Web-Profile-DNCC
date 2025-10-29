document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    
    if (!mobileMenu.classList.contains('hidden')) {
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
  
  // TODO: Need to optimize this function, it's getting complex
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
  
  //spacing added here for readability
  document.addEventListener('click', closeMenuOnClickOutside);
  
  // Had to add this because the mobile menu was being cut off
  // Need to come back and fix the CSS properly
  if (mobileMenu) {
    mobileMenu.style.overflow = 'auto';
  }
  
  // Quick fix for mobile menu height on smaller screens
  // Need to revisit this for better solution
  if (window.innerWidth < 640) {
    mobileMenu.style.maxHeight = '70vh';
  }
});
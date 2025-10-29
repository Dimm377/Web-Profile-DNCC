// 3D tilt effect for profile image
// Found this tutorial online and modified it
document.addEventListener('DOMContentLoaded', function() {
  const imageContainer = document.querySelector('.image-content .aspect-square');
  
  if (!imageContainer) {
    console.warn('Profile image container not found. Tilt effect will not be applied.');
    return;
  }
  
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice) {
    imageContainer.style.transformStyle = 'preserve-3d';
    imageContainer.style.perspective = '1500px';
    
    imageContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
    imageContainer.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
    
    const innerGlow = document.createElement('div');
    innerGlow.style.position = 'absolute';
    innerGlow.style.top = '0';
    innerGlow.style.left = '0';
    innerGlow.style.width = '100%';
    innerGlow.style.height = '100%';
    innerGlow.style.borderRadius = '50%';
    innerGlow.style.pointerEvents = 'none';
    innerGlow.style.zIndex = '-1';
    innerGlow.style.background = 'radial-gradient(ellipse at center, rgba(8,189,186,0.4) 0%, rgba(8,189,186,0) 70%)';
    innerGlow.style.opacity = '0';
    innerGlow.style.transition = 'opacity 0.4s ease';
    
    imageContainer.style.position = 'relative';
    imageContainer.appendChild(innerGlow);
    
    imageContainer.addEventListener('mouseenter', () => {
      imageContainer.style.transform = 'rotateY(12deg) rotateX(12deg) scale(1.12)';
      imageContainer.style.boxShadow = '0 30px 50px rgba(0, 0, 0, 0.5)';
      innerGlow.style.opacity = '0.6';
    });
    
    imageContainer.addEventListener('mouseleave', () => {
      imageContainer.style.transform = 'rotateY(0) rotateX(0) scale(1)';
      imageContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
      innerGlow.style.opacity = '0';
    });
    
    imageContainer.addEventListener('mousemove', (e) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = (x - centerX) / centerX;
      const mouseY = (y - centerY) / centerY;
      
      const rotateY = mouseX * 18;
      const rotateX = -mouseY * 18;
      const translateX = mouseX * 5;
      const translateY = mouseY * 5;
      const boxShadowIntensity = 0.4 + Math.abs(mouseX*0.1) + Math.abs(mouseY*0.1);
      const opacity = 0.4 + Math.abs(mouseX * 0.2) + Math.abs(mouseY * 0.2);
      
      imageContainer.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translate(${translateX}px, ${translateY}px) scale(1.12)`;
      imageContainer.style.boxShadow = `0 25px 45px rgba(0, 0, 0, ${boxShadowIntensity})`;
      innerGlow.style.opacity = opacity;
    });
  } else {
    // For touch devices, simpler effect
    imageContainer.addEventListener('touchstart', () => {
      imageContainer.style.transform = 'scale(1.05)';
      imageContainer.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
      imageContainer.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    
    imageContainer.addEventListener('touchend', () => {
      imageContainer.style.transform = 'scale(1)';
      imageContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
    });
  }
  
  // TODO: Maybe add a fallback for older browsers?
  // Not sure if this is needed but keeping it as a reminder
  
  // This was an attempt to add a loading effect, but it's not working properly
  // Need to debug this later
  const profileImg = document.querySelector('.profile-image');
  if (profileImg) {
    profileImg.addEventListener('load', function() {
      this.style.opacity = '0.8'; // This causes an issue - opacity remains at 0.8
      setTimeout(() => {
        this.style.opacity = '1';
      }, 1000);
    });
  }
});
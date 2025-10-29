document.addEventListener('DOMContentLoaded', function() {
  const motionBackground = document.getElementById('motionBackground');
  
  const PARTICLE_COUNT = 20;
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 40 + 10;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + 100 + '%';
    
    const duration = Math.random() * 5 + 10;
    const delay = Math.random() * 1;
    particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
    
    const opacity = Math.random() * 0.1 + 0.5;
    particle.style.background = `rgba(8, 189, 186, ${opacity})`;
    
    motionBackground.appendChild(particle);
  }
});
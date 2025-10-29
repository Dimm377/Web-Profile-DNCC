document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  
  const motionBackground = document.getElementById('motionBackground');
  if (!motionBackground) {
    console.error('Motion background container not found');
    return;
  }
  
  motionBackground.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  
  const PARTICLE_COUNT = 45;
  const MAX_DISTANCE = 120;
  const MOUSE_RADIUS = 100;
  
  let particles = [];
  
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      
      this.size = Math.random() * 3 + 1;
      this.baseSize = this.size;
      
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      
      this.color = `rgba(8, 189, 186, ${Math.random() * 0.4 + 0.2})`;
      this.originalColor = this.color;
    }
    
    update(mouse) {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
      
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < MOUSE_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          const repulsionStrength = 12;
          const moveX = Math.cos(angle) * force * repulsionStrength;
          const moveY = Math.sin(angle) * force * repulsionStrength;
          
          this.x -= moveX;
          this.y -= moveY;
          
          const sizeIncrease = (MOUSE_RADIUS - distance) / MOUSE_RADIUS * 5;
          this.size = this.baseSize + sizeIncrease;
          
          const opacityFactor = 0.9 - (distance / MOUSE_RADIUS) * 0.7;
          this.color = `rgba(8, 220, 210, ${opacityFactor})`;
        } else {
          this.size = this.baseSize;
          this.color = this.originalColor;
        }
      } else {
        this.size = this.baseSize;
        this.color = this.originalColor;
      }
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
  
  const mouse = {
    x: null,
    y: null,
    radius: MOUSE_RADIUS
  };

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && 
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
  });
  
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < MAX_DISTANCE) {
          let opacity = 1 - distance / MAX_DISTANCE;
          
          if (mouse.x !== null && mouse.y !== null) {
            const distToParticle1 = Math.sqrt(Math.pow(mouse.x - particles[i].x, 2) + Math.pow(mouse.y - particles[i].y, 2));
            const distToParticle2 = Math.sqrt(Math.pow(mouse.x - particles[j].x, 2) + Math.pow(mouse.y - particles[j].y, 2));
            
            if (distToParticle1 < MOUSE_RADIUS || distToParticle2 < MOUSE_RADIUS) {
              opacity = Math.min(1, opacity * 2);
            }
          }
          
          ctx.strokeStyle = `rgba(8, 189, 186, ${opacity * 0.5})`;
          ctx.lineWidth = 0.7 + (1 - distance / MAX_DISTANCE) * 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(mouse);
      particles[i].draw();
    }
    
    drawConnections();
    
    requestAnimationFrame(animate);
  }
  
  animate();
});
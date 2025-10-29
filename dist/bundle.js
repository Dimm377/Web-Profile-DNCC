// AGAR ORANG LAIN GAPERLU SETUP BUILD LAGI

class HamburgerMenu {
  constructor() {
    this.menuButton = document.getElementById('mobile-menu-button');
    this.mobileMenu = document.getElementById('mobile-menu');
    
    if (this.menuButton && this.mobileMenu) {
      this.init();
    }
  }
  
  init() {
    this.menuButton.addEventListener('click', () => {
      this.toggleMenu();
    });
    
    // Close menu when clicking on a link
    const menuLinks = this.mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.menuButton.contains(e.target) && 
          !this.mobileMenu.contains(e.target)) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    this.menuButton.classList.toggle('active');
    this.mobileMenu.classList.toggle('hidden');
  }
  
  closeMenu() {
    this.menuButton.classList.remove('active');
    this.mobileMenu.classList.add('hidden');
  }
}

// Inisialisasi hamburger menu saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
  new HamburgerMenu();
});/**
 * Image Tilt Effect Module
 * Digunakan untuk efek 3D pada gambar profil saat di-hover
 * Created: 2024
 */

class ImageTiltEffect {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.innerGlow = null;
    this.isActive = false;
    
    if (this.container) {
      this.init();
    }
  }
  
  init() {
    // Setup dasar efek 3D
    this.container.style.transformStyle = 'preserve-3d';
    this.container.style.perspective = '1500px';
    this.container.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
    
    // Buat elemen inner glow
    this.createInnerGlow();
    
    // Tambahkan event listeners
    this.addEventListeners();
  }
  
  createInnerGlow() {
    this.innerGlow = document.createElement('div');
    this.innerGlow.style.position = 'absolute';
    this.innerGlow.style.top = '0';
    this.innerGlow.style.left = '0';
    this.innerGlow.style.width = '100%';
    this.innerGlow.style.height = '100%';
    this.innerGlow.style.borderRadius = '50%';
    this.innerGlow.style.pointerEvents = 'none';
    this.innerGlow.style.zIndex = '-1';
    this.innerGlow.style.background = 'radial-gradient(ellipse at center, rgba(8,189,186,0.4) 0%, rgba(8,189,186,0) 70%)';
    this.innerGlow.style.opacity = '0';
    this.container.style.position = 'relative';
    this.container.appendChild(this.innerGlow);
  }
  
  addEventListeners() {
    this.container.addEventListener('mouseenter', () => {
      this.handleMouseEnter();
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.handleMouseLeave();
    });
    
    this.container.addEventListener('mousemove', (e) => {
      this.handleMouseMove(e);
    });
  }
  
  handleMouseEnter() {
    this.isActive = true;
    
    this.container.style.transform = 'rotateY(12deg) rotateX(12deg) scale(1.12)';
    this.container.style.boxShadow = '0 30px 50px rgba(0, 0, 0, 0.5)';
    this.container.style.transition = 'transform 0.4s ease-out, box-shadow 0.4s ease-out';
    this.innerGlow.style.opacity = '0.6';
    this.innerGlow.style.transition = 'opacity 0.4s ease-out';
  }
  
  handleMouseLeave() {
    this.isActive = false;
    
    this.container.style.transform = 'rotateY(0) rotateX(0) scale(1)';
    this.container.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
    this.container.style.transition = 'transform 0.4s ease-out, box-shadow 0.4s ease-out';
    this.innerGlow.style.opacity = '0';
    this.innerGlow.style.transition = 'opacity 0.4s ease-out';
  }
  
  handleMouseMove(e) {
    if (!this.isActive) return;
    
    const rect = this.container.getBoundingClientRect();
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
    
    this.container.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translate(${translateX}px, ${translateY}px) scale(1.12)`;
    this.container.style.boxShadow = `0 25px 45px rgba(0, 0, 0, ${boxShadowIntensity})`;
    this.innerGlow.style.opacity = opacity;
    this.container.style.transition = 'transform 0.08s ease-out, box-shadow 0.08s ease-out';
    this.innerGlow.style.transition = 'opacity 0.08s ease-out';
  }
}

// Inisialisasi efek tilt saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
  new ImageTiltEffect('.image-content .aspect-square');
});/**
 * Interactive Particles Module
 * Efek partikel interaktif di background halaman
 * Created: 2024
 */

class InteractiveParticles {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 100 };
    this.particleCount = 45;
    this.maxDistance = 120;
    this.motionBackground = document.getElementById('motionBackground');
    
    if (this.motionBackground) {
      this.init();
    }
  }
  
  init() {
    this.createCanvas();
    this.createParticles();
    this.addEventListeners();
    this.animate();
  }
  
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    
    this.motionBackground.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    this.resizeCanvas();
  }
  
  resizeCanvas() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  
  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }
  
  addEventListeners() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
    
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && 
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      }
    });
    
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
  
  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.maxDistance) {
          let opacity = 1 - distance / this.maxDistance;
          
          if (this.mouse.x !== null && this.mouse.y !== null) {
            const distToParticle1 = Math.sqrt(Math.pow(this.mouse.x - this.particles[i].x, 2) + Math.pow(this.mouse.y - this.particles[i].y, 2));
            const distToParticle2 = Math.sqrt(Math.pow(this.mouse.x - this.particles[j].x, 2) + Math.pow(this.mouse.y - this.particles[j].y, 2));
            
            if (distToParticle1 < this.mouse.radius || distToParticle2 < this.mouse.radius) {
              opacity = Math.min(1, opacity * 2);
            }
          }
          
          this.ctx.strokeStyle = `rgba(8, 189, 186, ${opacity * 0.5})`;
          this.ctx.lineWidth = 0.7 + (1 - distance / this.maxDistance) * 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(this.mouse);
      this.particles[i].draw(this.ctx);
    }
    
    this.drawConnections();
    
    requestAnimationFrame(() => this.animate());
  }
}

class Particle {
  constructor(canvas) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.baseSize = this.size;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.originalColor = `rgba(8, 189, 186, ${Math.random() * 0.4 + 0.2})`;
    this.color = this.originalColor;
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
      
      if (distance < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - distance) / mouse.radius;
        const repulsionStrength = 12;
        const moveX = Math.cos(angle) * force * repulsionStrength;
        const moveY = Math.sin(angle) * force * repulsionStrength;
        
        this.x -= moveX;
        this.y -= moveY;
        
        const sizeIncrease = (mouse.radius - distance) / mouse.radius * 5;
        this.size = this.baseSize + sizeIncrease;
        
        const opacityFactor = 0.9 - (distance / mouse.radius) * 0.7;
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
  
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Inisialisasi efek particles saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
  new InteractiveParticles();
});/**
 * Navbar Effects Module
 * Efek tambahan untuk link navbar
 * Created: 2024
 */

class NavbarEffects {
  constructor() {
    this.navLinks = document.querySelectorAll('.navbar-link');
    this.init();
  }
  
  init() {
    // Tambahkan efek hover ke semua link navbar
    this.navLinks.forEach(link => {
      this.addHoverEffect(link);
    });
  }
  
  addHoverEffect(link) {
    link.addEventListener('mouseenter', () => {
      // Efek tambahan saat hover bisa ditambahkan di sini
    });
    
    link.addEventListener('mouseleave', () => {
      // Efek saat mouse keluar 
    });
  }
}

// Inisialisasi efek navbar saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
  new NavbarEffects();
});/**
 * Navbar Active Link Module
 * Mengatur highlight link navbar saat scroll
 * Created: 2024
 */

class NavbarManager {
  constructor() {
    this.sections = document.querySelectorAll('section');
    this.navLinks = document.querySelectorAll('.navbar-link');
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => {
      this.updateActiveLink();
    });
  }
  
  updateActiveLink() {
    let current = '';
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });
    
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
}

// Inisialisasi navbar manager saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
  new NavbarManager();
});
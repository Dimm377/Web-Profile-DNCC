// Enhanced AOS animations with custom additions
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      anchorPlacement: 'top-bottom',
      delay: 100,
      offset: 120,
      disable: function() {
        return window.innerWidth < 768 || navigator.maxTouchPoints > 0;
      },
      disableMutationObserver: false,
      throttleDelay: 99,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate'
    });

    // Function to safely refresh AOS - added error handling
    function safeRefresh() {
      try {
        AOS.refresh();
      } catch (e) {
        console.warn('AOS refresh error (this is sometimes expected):', e);
      }
    }

    function mySafeRefresh() { //different name for similar function
      try {
        AOS.refreshHard();
      } catch (e) {
        console.warn('AOS refreshHard error (this is sometimes expected):', e);
      }
    }

    window.addEventListener('load', function() {
      setTimeout(safeRefresh, 300);
    });

    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        safeRefresh();
      }, 150);
    });

    let scrollTimeout;
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
      isScrolling = true;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        isScrolling = false;
        safeRefresh();
      }, 66);
    });

    const observer = new MutationObserver(function(mutations) {
      let shouldRefresh = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1 && node.querySelector('[data-aos]')) {
              shouldRefresh = true;
            }
          });
        }
      });
      
      if (shouldRefresh) {
        setTimeout(safeRefresh, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Parallax effect - experimenting with this
    const parallaxElems = document.querySelectorAll('[data-aos-parallax]'); // different variable name
    if (parallaxElems.length > 0) {
      window.addEventListener('scroll', function() {
        if (isScrolling) return;
        
        const scrollPosition = window.pageYOffset;
        
        parallaxElems.forEach(element => {
          const speed = parseFloat(element.getAttribute('data-aos-parallax')) || 0.5;
          const yPos = -(scrollPosition * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });
      });
    }

    const enhancedElements = document.querySelectorAll('[data-aos-enhanced]');
    
    enhancedElements.forEach(element => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const animationType = element.getAttribute('data-aos-enhanced');
            
            switch(animationType) {
              case 'stagger':
                const children = element.children;
                for (let i = 0; i < children.length; i++) {
                  setTimeout(() => {
                    children[i].style.opacity = 1;
                    children[i].style.transform = 'translateY(0)';
                  }, i * 100);
                }
                break;
                
              case 'cascade':
                const items = element.querySelectorAll('[data-aos-cascade]');
                items.forEach((item, index) => {
                  setTimeout(() => {
                    item.classList.add('aos-animate');
                  }, index * 150);
                });
                break;
                
              default:
                element.classList.add('aos-animate');
            }
            
            observer.unobserve(element);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      observer.observe(element);
    });

    // TODO: Maybe move this to a separate CSS file later
    const customAOSAnimations = [
      'fade-up-slow', 'fade-down-slow', 'fade-left-slow', 'fade-right-slow',
      'zoom-in-slow', 'slide-up-complex', 'slide-down-complex'
    ];
    
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      .aos-animate[data-aos="fade-up-slow"] {
        transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 1.2s ease;
      }
      
      .aos-animate[data-aos="zoom-in-slow"] {
        transition: transform 1.0s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1.0s ease;
      }
      
      .aos-animate[data-aos="slide-up-complex"] {
        transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.8s ease;
      }

      [data-aos-enhanced="stagger"] > * {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      [data-aos-cascade] {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      [data-aos-cascade].aos-animate {
        opacity: 1;
        transform: translateY(0);
      }

      .aos-animate[data-aos-delay="200"] { transition-delay: 0.2s; }
      .aos-animate[data-aos-delay="300"] { transition-delay: 0.3s; }
      .aos-animate[data-aos-delay="400"] { transition-delay: 0.4s; }
    `;
    
    head.appendChild(style);
    
    // Some experimental code I might use later
    // This was an attempt to add more dynamic animations
    /* 
    function dynamicAnimationHandler() {
      const dynamicElements = document.querySelectorAll('[data-dynamic-aos]');
      dynamicElements.forEach(el => {
        // TODO: Implement custom animation logic
      });
    }
    */
  });

  // Error handling for AOS
  window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('aos')) {
      console.warn('AOS related error:', e.error);
      setTimeout(() => {
        if (typeof AOS !== 'undefined') {
          try {
            AOS.refresh();
          } catch (err) {
            console.error('Could not reinitialize AOS:', err);
          }
        }
      }, 1000);
    }
  });

  // Personal note: I spent way too long debugging the parallax effect
  // The issue was with the scroll event throttling, lesson learned!
  
})();

// Added this on 2024-01-15 - need to come back and optimize performance
// This was becoming quite complex so I made it modular
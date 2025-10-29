// Enhanced and optimized AOS initialization with custom animations
(function() {
  'use strict';

  // Enhanced AOS configuration with better performance and visual appeal
  document.addEventListener('DOMContentLoaded', function() {
    // Improved AOS configuration
    AOS.init({
      duration: 800,              // Animation duration
      easing: 'ease-out-cubic',   // Smooth cubic easing
      once: false,                // Allow animations to repeat when scrolling back
      mirror: true,               // Show animations again when scrolling back up
      anchorPlacement: 'top-bottom', // Trigger when element is 1/4 up the viewport
      delay: 100,                 // Delay between animations
      offset: 120,                // Trigger animation earlier (120px before element enters viewport)
      disable: function() {
        // Disable on touch devices with smaller screens for performance
        return window.innerWidth < 768 || navigator.maxTouchPoints > 0;
      },
      // Enhanced animation options
      disableMutationObserver: false, // Allow AOS to observe DOM changes
      throttleDelay: 99,            // Performance optimization
      startEvent: 'DOMContentLoaded', // When to start AOS
      initClassName: 'aos-init',    // Class added to AOS elements on init
      animatedClassName: 'aos-animate' // Class added to AOS elements on animation
    });

    // Enhanced refresh functions to fix common bugs
    function safeRefresh() {
      try {
        AOS.refresh();
      } catch (e) {
        console.warn('AOS refresh error (this is sometimes expected):', e);
      }
    }

    function safeRefreshHard() {
      try {
        AOS.refreshHard();
      } catch (e) {
        console.warn('AOS refreshHard error (this is sometimes expected):', e);
      }
    }

    // Improved image loading refresh
    window.addEventListener('load', function() {
      setTimeout(safeRefresh, 300); // Small delay to ensure all images are loaded
    });

    // Optimized resize handler to prevent performance issues
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        safeRefresh();
      }, 150);
    });

    // Optimized scroll handler to prevent performance issues
    let scrollTimeout;
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
      isScrolling = true;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        isScrolling = false;
        safeRefresh();
      }, 66); // ~15fps for performance
    });

    // Handle dynamic content (for SPA or dynamic loading)
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

    // Enhanced parallax effect for selected elements
    const parallaxElements = document.querySelectorAll('[data-aos-parallax]');
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', function() {
        if (isScrolling) return; // Skip parallax if scrolling is happening for performance
        
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
          const speed = parseFloat(element.getAttribute('data-aos-parallax')) || 0.5;
          const yPos = -(scrollPosition * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });
      });
    }

    // Custom enhanced animations that work alongside AOS
    const enhancedElements = document.querySelectorAll('[data-aos-enhanced]');
    
    enhancedElements.forEach(element => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const animationType = element.getAttribute('data-aos-enhanced');
            
            // Apply enhanced animations based on type
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
            
            // Stop observing after animation is triggered
            observer.unobserve(element);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger when 50px from bottom of viewport
      });
      
      observer.observe(element);
    });

    // Add custom animation classes for more variety
    const customAOSAnimations = [
      'fade-up-slow', 'fade-down-slow', 'fade-left-slow', 'fade-right-slow',
      'zoom-in-slow', 'slide-up-complex', 'slide-down-complex'
    ];
    
    // Apply custom animation timing and easing
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      /* Enhanced AOS animations */
      .aos-animate[data-aos="fade-up-slow"] {
        transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 1.2s ease;
      }
      
      .aos-animate[data-aos="zoom-in-slow"] {
        transition: transform 1.0s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1.0s ease;
      }
      
      .aos-animate[data-aos="slide-up-complex"] {
        transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.8s ease;
      }

      /* Stagger animations */
      [data-aos-enhanced="stagger"] > * {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      /* Cascade animations */
      [data-aos-cascade] {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      [data-aos-cascade].aos-animate {
        opacity: 1;
        transform: translateY(0);
      }

      /* Enhanced animation delays */
      .aos-animate[data-aos-delay="200"] { transition-delay: 0.2s; }
      .aos-animate[data-aos-delay="300"] { transition-delay: 0.3s; }
      .aos-animate[data-aos-delay="400"] { transition-delay: 0.4s; }
    `;
    
    head.appendChild(style);
  });

  // Add global error handler for AOS
  window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('aos')) {
      console.warn('AOS related error:', e.error);
      // Try to reinitialize AOS if there's an error
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

})();
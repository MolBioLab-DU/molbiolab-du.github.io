// Complete JavaScript for Molecular Biology Lab Website
// This replaces the React app with vanilla JS that works with the existing HTML

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
  } else {
    initSite();
  }

  function initSite() {
    console.log('Molecular Biology Lab - Static Site Initialized');
    
    // Remove any loading spinners
    removeSpinners();
    
    // Initialize mobile menu with animation
    initMobileMenu();
    
    // Initialize desktop dropdowns
    initDesktopDropdowns();
    
    // Initialize Bootstrap accordions (for mobile menu)
    initAccordions();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize carousel if present
    initCarousel();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Lazy load images
    initLazyLoad();
    
    // Fade in animations
    setTimeout(fadeInOnScroll, 100);
  }

  function removeSpinners() {
    // Find and remove any loading spinners
    const spinners = document.querySelectorAll('[class*="spinner"], [class*="loading"]');
    spinners.forEach(spinner => {
      if (spinner.parentElement) {
        spinner.style.display = 'none';
      }
    });
    
    // Ensure main content is visible
    const main = document.querySelector('main');
    if (main) {
      main.style.opacity = '1';
      main.style.visibility = 'visible';
      main.style.display = 'block';
    }
    
    // Ensure root div is visible
    const root = document.getElementById('root');
    if (root) {
      root.style.opacity = '1';
      root.style.visibility = 'visible';
    }
  }

  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-react');
    const mobileMenu = document.querySelector('.menu_main');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    
    if (hamburger && mobileMenu) {
      // Toggle menu on hamburger click
      hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        const isHidden = mobileMenu.classList.contains('menu_main_hidden');
        
        if (isHidden) {
          // Open menu
          mobileMenu.classList.remove('menu_main_hidden');
          mobileMenu.classList.add('menu_main_visible');
          
          // Animate hamburger to X
          if (hamburgerLines.length >= 3) {
            hamburgerLines[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            hamburgerLines[1].style.opacity = '0';
            hamburgerLines[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
          }
        } else {
          // Close menu
          closeMenu();
        }
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
          if (mobileMenu.classList.contains('menu_main_visible')) {
            closeMenu();
          }
        }
      });
      
      // Close menu when clicking on a link (except accordion buttons)
      const menuLinks = mobileMenu.querySelectorAll('a');
      menuLinks.forEach(link => {
        link.addEventListener('click', function() {
          closeMenu();
        });
      });
      
      function closeMenu() {
        mobileMenu.classList.add('menu_main_hidden');
        mobileMenu.classList.remove('menu_main_visible');
        
        // Reset hamburger animation
        if (hamburgerLines.length >= 3) {
          hamburgerLines[0].style.transform = 'none';
          hamburgerLines[1].style.opacity = '1';
          hamburgerLines[2].style.transform = 'none';
        }
      }
    }
  }

  function initDesktopDropdowns() {
    const navItems = document.querySelectorAll('.menubar_pc .navbar_item');
    
    navItems.forEach(item => {
      // Check if this menu item should have a dropdown
      const itemText = item.textContent.trim();
      
      // Create dropdown menu based on item text
      if (itemText === 'About Us') {
        createDropdown(item, [
          { text: 'Our Lab', url: '/ourlab' },
          { text: 'Supervisors', url: '/supervisors' },
          { text: 'Lab Members', url: '/labmembers' },
          { text: 'Gallery', url: '/gallery' }
        ]);
      } else if (itemText === 'Research') {
        createDropdown(item, [
          { text: 'Current Research', url: '/current-research' },
          { text: 'Publications', url: '/publications' }
        ]);
      } else if (itemText === 'News & Events') {
        createDropdown(item, [
          { text: 'News', url: '/news' },
          { text: 'Molbiolab in the news', url: '/molbiolab-in-the-news' }
        ]);
      }
    });
  }

  function createDropdown(parentItem, links) {
    // Make parent clickable but not navigable
    parentItem.style.cursor = 'pointer';
    parentItem.style.position = 'relative';
    
    // Create dropdown container
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-menu-custom';
    dropdown.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-radius: 4px;
      min-width: 200px;
      padding: 8px 0;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1000;
      margin-top: 5px;
    `;
    
    // Add links to dropdown
    links.forEach(link => {
      const dropdownItem = document.createElement('a');
      dropdownItem.href = link.url;
      dropdownItem.textContent = link.text;
      dropdownItem.style.cssText = `
        display: block;
        padding: 10px 20px;
        color: #333;
        text-decoration: none;
        transition: all 0.2s ease;
        font-size: 14px;
      `;
      
      dropdownItem.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#e8f5e9';
        this.style.color = '#2e7d32';
      });
      
      dropdownItem.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.color = '#333';
      });
      
      dropdown.appendChild(dropdownItem);
    });
    
    parentItem.appendChild(dropdown);
    
    // Hover effect on parent item
    parentItem.addEventListener('mouseenter', function() {
      // Show dropdown
      dropdown.style.opacity = '1';
      dropdown.style.visibility = 'visible';
      dropdown.style.transform = 'translateY(0)';
      
      // Change parent text color to green and remove any underlines
      parentItem.style.color = '#4caf50';
      parentItem.style.textDecoration = 'none';
      parentItem.style.borderBottom = 'none';
      
      // Remove pseudo-element effects by adding a class
      parentItem.classList.add('dropdown-active');
    });
    
    parentItem.addEventListener('mouseleave', function() {
      // Hide dropdown
      dropdown.style.opacity = '0';
      dropdown.style.visibility = 'hidden';
      dropdown.style.transform = 'translateY(-10px)';
      
      // Reset parent text color
      parentItem.style.color = '';
      parentItem.style.textDecoration = '';
      parentItem.style.borderBottom = '';
      
      // Remove the class
      parentItem.classList.remove('dropdown-active');
    });
  }

  function initAccordions() {
    const accordionButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    
    accordionButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = this.getAttribute('data-bs-target');
        const target = document.querySelector(targetId);
        
        if (target) {
          const isCollapsed = !target.classList.contains('show');
          
          // Close all other accordions (optional - for single open at a time)
          const allCollapses = document.querySelectorAll('.accordion-collapse');
          allCollapses.forEach(collapse => {
            if (collapse !== target && collapse.classList.contains('show')) {
              collapse.classList.remove('show');
              const collapseButton = document.querySelector(`[data-bs-target="#${collapse.id}"]`);
              if (collapseButton) {
                collapseButton.classList.add('collapsed');
                collapseButton.setAttribute('aria-expanded', 'false');
              }
            }
          });
          
          if (isCollapsed) {
            // Expand
            target.classList.add('show');
            this.classList.remove('collapsed');
            this.setAttribute('aria-expanded', 'true');
          } else {
            // Collapse
            target.classList.remove('show');
            this.classList.add('collapsed');
            this.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    
    if (!header) return;
    
    // Check if we're on the homepage
    const isHomepage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' ||
                       window.location.pathname === '';
    
    function updateHeader() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
        // Make header solid on scroll
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        header.style.backdropFilter = 'blur(10px)';
        
        // Change text color to dark on scroll
        const navItems = header.querySelectorAll('.navbar_item, .navbar_logo');
        navItems.forEach(item => {
          item.style.color = '#333';
        });
        
        // Change hamburger lines color for mobile
        const hamburgerLines = header.querySelectorAll('.hamburger-line');
        hamburgerLines.forEach(line => {
          line.style.backgroundColor = '#333';
        });
      } else {
        header.classList.remove('scrolled');
        
        if (isHomepage) {
          // Transparent on homepage when at top
          header.style.backgroundColor = 'transparent';
          header.style.boxShadow = 'none';
          header.style.backdropFilter = 'none';
          
          // White text on transparent background
          const navItems = header.querySelectorAll('.navbar_item, .navbar_logo');
          navItems.forEach(item => {
            item.style.color = 'white';
          });
          
          // White hamburger lines for mobile
          const hamburgerLines = header.querySelectorAll('.hamburger-line');
          hamburgerLines.forEach(line => {
            line.style.backgroundColor = 'white';
          });
        } else {
          // Solid on other pages even at top
          header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
          
          const navItems = header.querySelectorAll('.navbar_item, .navbar_logo');
          navItems.forEach(item => {
            item.style.color = '#333';
          });
          
          const hamburgerLines = header.querySelectorAll('.hamburger-line');
          hamburgerLines.forEach(line => {
            line.style.backgroundColor = '#333';
          });
        }
      }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Check initial state
  }

  function initCarousel() {
    // Simple carousel functionality
    const carousel = document.querySelector('.slick-slider');
    if (!carousel) return;

    let currentSlide = 0;
    const slides = carousel.querySelectorAll('.slick-slide:not(.slick-cloned)');
    const track = carousel.querySelector('.slick-track');
    
    if (!slides.length || !track) return;

    // Auto-advance carousel every 5 seconds
    const interval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    }, 5000);

    function updateCarousel() {
      const slideWidth = slides[0].offsetWidth;
      const offset = -(currentSlide * slideWidth);
      track.style.transform = `translate3d(${offset}px, 0px, 0px)`;
      track.style.transition = 'transform 0.5s ease';
    }
    
    // Add manual navigation if dots or arrows exist
    const dots = carousel.querySelectorAll('.slick-dots li button');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
      });
    });
    
    const prevButton = carousel.querySelector('.slick-prev');
    const nextButton = carousel.querySelector('.slick-next');
    
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
      });
    }
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
      }, 5000);
    });
  }

  function initSmoothScroll() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  function initLazyLoad() {
    // Lazy load images with data-src attribute
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // Add fade-in animation on scroll
  function fadeInOnScroll() {
    const elements = document.querySelectorAll('.supervisor_card, .news_card, .publication_card, .gallery_item');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });
    } else {
      // Fallback - just show everything
      elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }
  }

  // Back to top button
  function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });
      
      backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // Initialize back to top after a delay
  setTimeout(initBackToTop, 100);

  // Form validation (if forms exist)
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
        }
        form.classList.add('was-validated');
      });
    });
  }

  initFormValidation();

  // External link handling (open in new tab)
  function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
      const url = new URL(link.href);
      if (url.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  initExternalLinks();

  // Image error handling
  function initImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      img.addEventListener('error', function() {
        // Replace with placeholder or hide
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
      });
    });
  }

  initImageErrorHandling();

  // Accessibility improvements
  function initAccessibility() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('[role="button"]:not(button)');
    
    interactiveElements.forEach(el => {
      if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
      }
      
      el.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  initAccessibility();

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Optimize scroll performance
  const optimizedScroll = debounce(() => {
    // Any additional scroll-based functionality
  }, 100);

  window.addEventListener('scroll', optimizedScroll);

  // Print styles helper
  window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
  });

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
  });

  // Console greeting (optional)
  console.log('%c🧬 Molecular Biology Lab', 'font-size: 20px; font-weight: bold; color: #007bff;');
  console.log('%cWebsite by Md Nazid Bin Ibrahim & S M Kaiser Ahmed', 'font-size: 12px; color: #666;');

})();

/**
* Template Name: MyResume - v4.10.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Theme toggle (light / dark)
   */
  const themeToggle = select('#theme-toggle')
  if (themeToggle) {
    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme)
      const icon = themeToggle.querySelector('i')
      if (icon) {
        icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars'
      }
    }
    const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
    const getInitialTheme = () => {
      let stored = null
      try {
        stored = localStorage.getItem('theme')
      } catch (e) {}
      if (stored) return stored
      return (systemDark && systemDark.matches) ? 'dark' : 'light'
    }
    applyTheme(getInitialTheme())
    on('click', '#theme-toggle', function() {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('theme', next)
      } catch (e) {}
      applyTheme(next)
    })
    if (systemDark && systemDark.addEventListener) {
      systemDark.addEventListener('change', (e) => {
        let stored = null
        try {
          stored = localStorage.getItem('theme')
        } catch (err) {}
        if (!stored) applyTheme(e.matches ? 'dark' : 'light')
      })
    }
  }

  /**
   * Scroll progress bar
   */
  const scrollProgress = select('#scroll-progress')
  const updateScrollProgress = () => {
    if (!scrollProgress) return
    const doc = document.documentElement
    const scrollTop = window.scrollY || doc.scrollTop
    const height = doc.scrollHeight - doc.clientHeight
    scrollProgress.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + '%'
  }
  window.addEventListener('load', updateScrollProgress)
  onscroll(document, updateScrollProgress)

  /**
   * Footer year
   */
  const yearEl = select('#year')
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear()
  }

  /**
   * Contact form: PHP with mailto fallback
   */
  const contactForm = select('#contact_form')
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault()
      const form = this
      const loading = form.querySelector('.loading')
      const errorMsg = form.querySelector('.error-message')
      const sentMsg = form.querySelector('.sent-message')

      if (loading) loading.classList.add('d-block')
      if (errorMsg) errorMsg.classList.remove('d-block')
      if (sentMsg) sentMsg.classList.remove('d-block')

      const action = form.getAttribute('action')
      const formData = new FormData(form)

      const mailtoFallback = () => {
        if (loading) loading.classList.remove('d-block')
        const name = form.querySelector('[name=name]').value
        const email = form.querySelector('[name=email]').value
        const subject = form.querySelector('[name=subject]').value
        const message = form.querySelector('[name=message]').value
        const mailto = 'mailto:isabelvillegas915@gmail.com' +
          '?subject=' + encodeURIComponent(subject || 'Contact from portfolio') +
          '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)
        if (sentMsg) {
          sentMsg.textContent = 'Opening your email app so you can send it manually...'
          sentMsg.classList.add('d-block')
        }
        window.location.href = mailto
      }

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(response => response.text())
        .then(data => {
          if (loading) loading.classList.remove('d-block')
          if (data.trim() === 'OK') {
            if (sentMsg) {
              sentMsg.textContent = 'Your message has been sent. Thank you!'
              sentMsg.classList.add('d-block')
            }
            form.reset()
          } else {
            throw new Error(data || 'Form submission failed')
          }
        })
        .catch(() => {
          mailtoFallback()
        })
    })
  }

})()
document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector(".header")
  const backToTop = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
      backToTop.classList.add("active")
    } else {
      header.classList.remove("scrolled")
      backToTop.classList.remove("active")
    }
  })

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navList = document.querySelector(".nav-list")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active")
      navList.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-list a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active")
      navList.classList.remove("active")
    })
  })

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]")

  function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight
      const sectionTop = current.offsetTop - 100
      const sectionId = current.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(".nav-list a[href*=" + sectionId + "]").classList.add("active")
      } else {
        document.querySelector(".nav-list a[href*=" + sectionId + "]").classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", scrollActive)

  // Animated Counter
  const counters = document.querySelectorAll(".stat-number")
  const speed = 200

  function animateCounters() {
    counters.forEach((counter) => {
      const target = +counter.dataset.count
      const count = +counter.innerText
      const increment = target / speed

      if (count < target) {
        counter.innerText = Math.ceil(count + increment)
        setTimeout(animateCounters, 1)
      } else {
        counter.innerText = target
      }
    })
  }

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Start counter animation when stats section is in viewport
  window.addEventListener("scroll", () => {
    const statsSection = document.querySelector(".hero-stats")
    if (statsSection && isInViewport(statsSection)) {
      animateCounters()
    }
  })

  // Portfolio Filter
  const filterBtns = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      const filterValue = btn.getAttribute("data-filter")

      portfolioItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.9)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Testimonial Slider
  const testimonialTrack = document.querySelector(".testimonial-track")
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const prevBtn = document.querySelector(".testimonial-prev")
  const nextBtn = document.querySelector(".testimonial-next")
  const dots = document.querySelectorAll(".dot")

  let currentIndex = 0
  const cardWidth = 100 // 100%

  function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}%)`

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex)
    })
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : testimonialCards.length - 1
      updateSlider()
    })

    nextBtn.addEventListener("click", () => {
      currentIndex = currentIndex < testimonialCards.length - 1 ? currentIndex + 1 : 0
      updateSlider()
    })
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index
      updateSlider()
    })
  })

  // Auto slide testimonials
  setInterval(() => {
    if (nextBtn) {
      currentIndex = currentIndex < testimonialCards.length - 1 ? currentIndex + 1 : 0
      updateSlider()
    }
  }, 5000)

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simple form validation
      const name = this.querySelector('input[name="name"]').value
      const email = this.querySelector('input[name="email"]').value
      const message = this.querySelector('textarea[name="message"]').value

      if (!name || !email || !message) {
        alert("Please fill in all required fields")
        return
      }

      // Show success message
      const formGroups = this.querySelectorAll(".form-group")
      const submitBtn = this.querySelector('button[type="submit"]')

      formGroups.forEach((group) => {
        group.style.opacity = "0"
        group.style.transform = "translateY(-20px)"
        group.style.transition = "all 0.3s ease"
      })

      submitBtn.style.opacity = "0"
      submitBtn.style.transform = "translateY(-20px)"
      submitBtn.style.transition = "all 0.3s ease"

      setTimeout(() => {
        const successMessage = document.createElement("div")
        successMessage.className = "success-message"
        successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you soon!</p>
                `

        this.innerHTML = ""
        this.appendChild(successMessage)

        // Reset form after 5 seconds
        setTimeout(() => {
          window.location.reload()
        }, 5000)
      }, 300)
    })
  }

  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value

      if (!email) {
        alert("Please enter your email address")
        return
      }

      // Simulate form submission
      emailInput.value = ""

      // Show success message
      const successMessage = document.createElement("p")
      successMessage.className = "newsletter-success"
      successMessage.textContent = "Thank you for subscribing!"
      successMessage.style.color = "#4cc9f0"
      successMessage.style.marginTop = "10px"

      // Remove any existing success message
      const existingMessage = this.querySelector(".newsletter-success")
      if (existingMessage) {
        existingMessage.remove()
      }

      this.appendChild(successMessage)
    })
  }

  // Smooth scrolling for anchor links with improved animation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Get header height for offset
        const headerHeight = document.querySelector(".header").offsetHeight

        // Calculate position with smooth easing
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
        const startPosition = window.pageYOffset
        const distance = targetPosition - startPosition
        let startTime = null

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime
          const timeElapsed = currentTime - startTime
          const duration = 1000 // Animation duration in ms

          // Easing function (easeOutQuad)
          const run = easeOutQuad(timeElapsed, startPosition, distance, duration)
          window.scrollTo(0, run)

          if (timeElapsed < duration) {
            requestAnimationFrame(animation)
          }
        }

        // Easing function
        function easeOutQuad(t, b, c, d) {
          t /= d
          return -c * t * (t - 2) + b
        }

        requestAnimationFrame(animation)
      }
    })
  })

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".section-header, .service-card, .about-image, .about-text, .portfolio-item, .team-card, .contact-info, .contact-form",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Run on load and scroll
  animateOnScroll()
  window.addEventListener("scroll", animateOnScroll)
})


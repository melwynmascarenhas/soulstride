/* eslint-disable */
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
gsap.registerPlugin(Flip)
gsap.registerPlugin(ScrollTrigger)

import Swiper from 'swiper'
import {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Thumbs,
  Mousewheel,
  Keyboard,
  Parallax,
} from 'swiper/modules'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
Swiper.use([
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Thumbs,
  Mousewheel,
  Keyboard,
  Parallax,
])

document.body.style.overflow = 'hidden'

function enableScrolling() {
  // Enable scrolling after the delay
  document.body.style.overflowY = 'auto'
  //LENIS
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    console.log(e)
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
  //
}

//PRELOADER
const numberElement = document.querySelector('.number')
let counter = 0
const duration = 3000 // 4 seconds
const interval = duration / 100 // interval for each increment

function updateCount() {
  const updateCounter = setInterval(() => {
    counter++
    numberElement.textContent = counter
    if (counter === 100) {
      clearInterval(updateCounter)
    }
  }, interval)
}

gsap.set('svg rect', {
  width: '0%',
})

const preloaderTL = gsap.timeline()

preloaderTL
  .to('svg rect', {
    duration: 3,
    width: '100%', // Animate the width to cover the SVG
    ease: 'power1.inOut',
    onStart: updateCount,
  })
  .to(
    '.pre-loader',
    {
      delay: 0.5,
      duration: 1,
      opacity: 0,
      ease: 'power1.inOut',
      onComplete: enableScrolling,
    },
    '>'
  )
//

const horizontalSection = document.querySelector('.is-saboteurs')
const wrapper = horizontalSection.querySelector('.wrapper')
const items = wrapper.querySelectorAll('.item')
document.body.style.overflow = 'hidden'
const bulletWrapper = document.querySelector('.swiper-bullet-wrapper')
bulletWrapper.style.borderRadius = '100vw'
bulletWrapper.style.overflow = 'hidden'

//////EXPLAINER SLIDER

//TEXT SLIDER
const textslider = new Swiper('.swiper_titles', {
  slideActiveClass: 'is-active',
  slideDuplicateActiveClass: 'is-active',
  slidesPerView: 'auto',
  speed: 800,
  loop: true,
  grabCursor: true,
  keyboard: true,
  mousewheel: {
    forceToAxis: true,
  },
  slideToClickedSlide: true,
  centeredSlides: true,
  allowTouchMove: true, //click and drag to change
  followFinger: true, //move with click and drag
  navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: bulletWrapper,
    bulletClass: 'swiper-bullet',
    bulletActiveClass: 'is-active',
    bulletElement: 'button',
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        '">' +
        //
        '<div class="' +
        'bullet-bg' +
        '">' +
        '</div>' +
        //
        '<div class="' +
        'bullet-progress' +
        '">' +
        '</div>' +
        //
        '<div class="' +
        'o-progress' +
        '">' +
        '</div>' +
        //
        '</span>'
      )
    },
  },

  on: {
    realIndexChange: function () {
      // Get the real index
      const realIndex = this.realIndex

      // Loop through each bullet
      document.querySelectorAll('.swiper-bullet').forEach((bullet, index) => {
        const oProgress = bullet.querySelector('.o-progress')
        // Check if the index of the bullet is less than the realIndex
        if (realIndex == 0) {
          if (oProgress) {
            oProgress.style.display = 'none'
          }
        } else if (index < realIndex) {
          // Find the o-progress div within the bullet and set its display to block
          if (oProgress) {
            oProgress.style.display = 'block'
          }
        }
      })
    },
  },
})
//

//horizontal scrolling effect
let wrapperTween = gsap.to(wrapper, {
  x: () => (wrapper.offsetWidth - window.innerWidth) * -1,
  ease: 'none',
  scrollTrigger: {
    // markers: true,
    trigger: horizontalSection,
    pin: true,
    start: 'top 6%',
    end: () => `+=${items[0].offsetWidth * items.length}`,
    scrub: 1,
    invalidateOnRefresh: true, //recalculate the start and end points when window resize
  },
})

const sageHeadingWrap = document.querySelector('.is-sage')
const sageCardsWrap = document.querySelector('.sage-cards-wrap')

sageCardsWrap.style.marginBottom = '-300vh'
const cards = document.querySelectorAll('.card')

gsap.set(cards[0], { rotationZ: -45 })
gsap.set(cards[1], { rotationZ: 45 })
gsap.set(cards[2], { rotationZ: -30 })

const animatecards = gsap.timeline({
  scrollTrigger: {
    trigger: sageCardsWrap, // Element to trigger the animation
    start: 'top bottom', // Start the animation when the top of the element hits the center of the viewport
    end: 'bottom bottom', // End the animation when the bottom of the element hits the center of the viewport
    scrub: true, // Smoothly animate elements as the user scrolls
    pin: sageHeadingWrap,
  },
  ease: 'none',
})
animatecards
  .to(cards[0], { y: '-100vh', rotationZ: -3 })
  .to(cards[1], { y: '-100vh', rotationZ: 2 })
  .to(cards[2], { y: '-100vh', rotationZ: 3 })
//

function animateNextCard() {
  animatecards.play() // Continue playing the timeline to animate the next card
}

//TESTIMONIAL SWIPER
const teamSlider = new Swiper('.swiper.is-testimonial', {
  // Parameters
  slidesPerView: 1.5,
  spaceBetween: 16,
  breakpoints: {
    // When window width is >= 768px
    320: {
      slidesPerView: 1.5,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1440: {
      slidesPerView: 'auto',
      spaceBetween: 24,
    },
  },
  loop: true,
  allowTouchMove: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
})

//FLIP MENU
gsap.registerPlugin(Flip)
let hamburgerEl = document.querySelector('.nav_hamburger_wrap')
let navLineEl = document.querySelectorAll('.nav_hamburger_line')
let flipItemEl = document.querySelector('.nav_hamburger_base')
let menuWrapEl = document.querySelector('.mob_menu_wrap')
let menuBaseEl = document.querySelector('.menu_base')
let menuContainEl = document.querySelector('.mob_menu_contain')

let flipDuration = 0.6

function flip(forwards) {
  let state = Flip.getState(flipItemEl)
  if (forwards) {
    menuContainEl.appendChild(flipItemEl)
  } else {
    hamburgerEl.appendChild(flipItemEl)
  }
  Flip.from(state, { duration: flipDuration })
}

let tl = gsap.timeline({ paused: true })
tl.set(menuWrapEl, { display: 'flex' })
//from is used because we want to move the base first
tl.from(menuBaseEl, {
  opacity: 0,
  duration: flipDuration,
  ease: 'none',
  //conditional...only runs when the timeline starts
  onStart: function () {
    flip(true)
  },
})
tl.to(navLineEl[0], { y: 4, rotate: 45, duration: flipDuration }, '<')
tl.to(navLineEl[1], { y: -4, rotate: -45, duration: flipDuration }, '<')

const menuLinks = gsap.utils.toArray('.menu_link')
tl.from(menuLinks, {
  opacity: 0,
  yPercent: 50,
  duration: 0.2,
  stagger: { amount: 0.2 },
  //conditional...only runs when the tween finishes the reverse to the start point
  //here moving the base after the links disappear completely
  onReverseComplete: function () {
    flip(false)
  },
})

function openMenu(open) {
  //check if the animation is playing to stop intteruption
  if (!tl.isActive()) {
    if (open) {
      tl.play()
      hamburgerEl.classList.add('nav-open')
      document.body.style.overflow = 'hidden'
    } else {
      //play close animation because because open menu was set to false
      tl.reverse()
      hamburgerEl.classList.remove('nav-open')
      document.body.style.overflow = ''
    }
  }
}

//callback to perform menu open or close
hamburgerEl.addEventListener('click', function () {
  //checking if the menu is open or closed
  if (hamburgerEl.classList.contains('nav-open')) {
    //then set openmenu to false
    openMenu(false)
  } else {
    openMenu(true)
  }
})

menuBaseEl.addEventListener('mouseenter', function () {
  openMenu(false)
})
menuBaseEl.addEventListener('click', function () {
  openMenu(false)
})

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    openMenu(false)
  }
})

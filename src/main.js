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

const horizontalSection = document.querySelector('.is-saboteurs')
const wrapper = horizontalSection.querySelector('.wrapper')
const items = wrapper.querySelectorAll('.item')
document.body.style.overflow = 'hidden'
const bulletWrapper = document.querySelector('.swiper-bullet-wrapper')
bulletWrapper.style.borderRadius = '100vw'
bulletWrapper.style.overflow = 'hidden'

function enableScrolling() {
  // Enable scrolling after the delay
  document.body.style.overflowY = 'auto'
}

gsap.to(
  {},
  {
    duration: 1,
    onComplete: enableScrolling, // Call enableScrolling function after the delay
  }
)

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
    markers: true,
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
  spaceBetween: 24,
  breakpoints: {
    // When window width is >= 768px
    768: {
      slidesPerView: 2.5,
    },
    992: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 'auto',
    },
  },
  loop: true,
  allowTouchMove: false,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
})
//TESTIMONIAL SWIPER ENDS

/* eslint-disable */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

const horizontalSection = document.querySelector('.layout')
const wrapper = horizontalSection.querySelector('.wrapper')
const items = wrapper.querySelectorAll('.item')
document.body.style.overflow = 'hidden'
const splineElement = document.querySelector('.spline')
splineElement.style.pointerEvents = 'none'

function enableScrolling() {
  // Enable scrolling after the delay
  document.body.style.overflowY = 'auto'
  splineElement.style.pointerEvents = 'auto'
}

gsap.to(
  {},
  {
    duration: 1,
    onComplete: enableScrolling, // Call enableScrolling function after the delay
  }
)

// MOBILE SWIPER
const isIntro = new Swiper('.swiper.is-intro', {
  slideActiveClass: 'is-active',
  slidesPerView: 1,
  speed: 800,
  effect: 'fade',
  // loop: true,
  allowTouchMove: true,
  grabCursor: true, //just changes the icon
  followFinger: true, //drag on touchpad/mobile
  keyboard: true,
  mousewheel: {
    eventsTarget: '.swiper.is-intro', // Listen for mousewheel events on the swiper container
    invert: false,
    releaseOnEdges: true, // Releases the scrollbar when it hits the end
  },

  pagination: {
    el: '.swiper-pagination-progressbar',
    type: 'progressbar',
    clickable: true,
    progressbarFillClass: 'swiper-pagination-progressbar-fill',
    direction: 'vertical', // Set pagination direction to vertical
  },
})

//enable disable the swiper
//

//horizontal scrolling effect
let wrapperTween = gsap.to(wrapper, {
  x: () => (wrapper.offsetWidth - window.innerWidth) * -1,
  ease: 'none',
  scrollTrigger: {
    markers: true,
    trigger: horizontalSection,
    pin: true,
    start: 'top top',
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

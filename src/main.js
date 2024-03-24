/* eslint-disable */
window.alert('local')
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const horizontalSection = document.querySelector('.layout')
const wrapper = horizontalSection.querySelector('.wrapper')
const items = wrapper.querySelectorAll('.item')

//function for the horizontal scrolling effect and parallax effect

function initScroll() {
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

  //parallax effect
  items.forEach((item) => {
    gsap.fromTo(
      item,
      {
        backgroundPosition: '0% 50%',
      },
      {
        backgroundPosition: '100% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          containerAnimation: wrapperTween, //link the animation to the main scrolltrigger
          //sets this trigger as it is nested in another scrolltrigger
          start: 'left right',
          end: 'right left',
          scrub: true,
          markers: true,
        },
      }
    )
  })
}

initScroll()

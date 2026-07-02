'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function useSmoothScroll() {
  const raf = useRef<number>(0)
  const scrollToRef = useRef<(y: number) => void>(() => {})
  const state = useRef({ currentScroll: 0, targetScroll: 0 })

  useEffect(() => {
    const lerpFactor = 0.1
    const maxDelta = 180

    state.current.currentScroll = window.scrollY
    state.current.targetScroll = window.scrollY

    // Chỉ smooth scroll trên desktop (thiết bị không có touch event)
    // Dùng matchMedia để detect: "chỉ touch, không có mouse/cursor chính xác"
    // coarse pointer = ngón tay, fine pointer = chuột
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (isCoarsePointer) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      state.current.currentScroll = window.scrollY
      const delta = Math.max(-maxDelta, Math.min(maxDelta, e.deltaY))
      state.current.targetScroll = Math.max(0, Math.min(maxScroll, state.current.targetScroll + delta))
      if (!raf.current) raf.current = requestAnimationFrame(tick)
    }

    const tick = () => {
      const s = state.current
      s.currentScroll += (s.targetScroll - s.currentScroll) * lerpFactor
      window.scrollTo(0, Math.round(s.currentScroll))

      if (Math.abs(s.currentScroll - s.targetScroll) > 0.5) {
        raf.current = requestAnimationFrame(tick)
      } else {
        s.currentScroll = s.targetScroll
        raf.current = 0
      }
    }

    scrollToRef.current = (y: number) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      state.current.targetScroll = Math.max(0, Math.min(maxScroll, y))
      if (!raf.current) raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return scrollToRef
}

export function ScrollProvider() {
  const smoothScrollTo = useSmoothScroll()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Anchor links via smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href')
        if (!id || id === '#') return
        const target = document.querySelector(id)
        if (target) {
          e.preventDefault()
          const y = target.getBoundingClientRect().top + window.scrollY - 64
          const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
          if (isCoarsePointer) {
            window.scrollTo({ top: y, behavior: 'smooth' })
          } else {
            smoothScrollTo.current(y)
          }
        }
      })
    })

    // Section headers: eyebrow slides from left, title slides up
    document.querySelectorAll('section').forEach((section) => {
      const eyebrow = section.querySelector('p[class*="tracking-"]')
      const heading = section.querySelector('h2')
      const divider = section.querySelector('svg[aria-hidden]')

      if (eyebrow) {
        gsap.fromTo(eyebrow,
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'restart reverse restart reverse' } }
        )
      }
      if (heading) {
        gsap.fromTo(heading,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'restart reverse restart reverse' } }
        )
      }
      if (divider) {
        gsap.fromTo(divider,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out',
            transformOrigin: 'center',
            scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'restart reverse restart reverse' } }
        )
      }
    })

    // About section: left quote slides from left, right content from right
    const aboutLeft = document.querySelector('#about .md\\:grid-cols-2 > div:first-child')
    const aboutRight = document.querySelector('#about .md\\:grid-cols-2 > div:last-child')
    if (aboutLeft) {
      gsap.fromTo(aboutLeft,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: '#about', start: 'top 70%', toggleActions: 'restart reverse restart reverse' } }
      )
    }
    if (aboutRight) {
      gsap.fromTo(aboutRight,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, delay: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: '#about', start: 'top 70%', toggleActions: 'restart reverse restart reverse' } }
      )
    }

    // Gallery: alternate left/right per item
    const galleryItems = document.querySelectorAll('#gallery .group')
    galleryItems.forEach((item, i) => {
      gsap.fromTo(item,
        { x: i % 2 === 0 ? -30 : 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, delay: 0.3 + i * 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: '#gallery', start: 'top 65%', toggleActions: 'restart reverse restart reverse' } }
      )
    })

    // Branch cards: slide up with 3D tilt stagger
    gsap.fromTo('.branch-card',
      { y: 40, opacity: 0, rotateX: 6 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.5,
        delay: 0.15, stagger: 0.1, ease: 'power2.out',
        transformPerspective: 800,
        scrollTrigger: { trigger: '#visit', start: 'top 65%', toggleActions: 'restart reverse restart reverse' } }
    )

    // Hero parallax
    gsap.to('#top img', {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: { trigger: '#top', start: 'top top',
        end: 'bottom top', scrub: true }
    })

    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return null
}

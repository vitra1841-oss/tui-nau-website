'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'

const links = [
  { href: '#menu', label: 'Thực Đơn' },
  { href: '#gallery', label: 'Khoảnh Khắc' },
  { href: '#visit', label: 'Chi Nhánh' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on link click
  const handleLinkClick = () => setMobileOpen(false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled || mobileOpen
          ? 'bg-espresso/95 backdrop-blur-md border-b border-cream/10'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-cream">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2" onClick={handleLinkClick}>
          <Image
            src="/images/logo.png"
            alt="Tiệm Trà Túi Nâu"
            width={28}
            height={36}
            className="object-contain brightness-0 invert"
          />
          <span className="font-serif text-lg tracking-wide">Túi Nâu</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-cream/80 transition-colors hover:text-cream after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-rose after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center md:hidden text-cream p-1 relative h-8 w-8"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
        >
          <span className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{ transform: mobileOpen ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)', opacity: mobileOpen ? 0 : 1 }}
          >
            <Menu className="h-6 w-6" />
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{ transform: mobileOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)', opacity: mobileOpen ? 1 : 0 }}
          >
            <X className="h-6 w-6" />
          </span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="bg-espresso/95 backdrop-blur-md border-t border-cream/10 px-6 pb-6 pt-2">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={handleLinkClick}
                  className="block text-cream/80 text-base py-1.5 transition-colors hover:text-cream"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}

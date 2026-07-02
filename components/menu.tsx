'use client'

import { useState, useEffect } from 'react'
import { Leaf, Flower2, Citrus, Candy, Coffee, Bubbles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BotanicalDivider } from './botanical-divider'
import { cn } from '../lib/utils'

const animStyles = `
@keyframes menu-in-left {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes menu-in-right {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
.menu-card-l { animation: menu-in-left  0.6s cubic-bezier(0.4,0,0.2,1) var(--delay,0ms) both; }
.menu-card-r { animation: menu-in-right 0.6s cubic-bezier(0.4,0,0.2,1) var(--delay,0ms) both; }
.delay-0  { --delay: 0ms; }
.delay-200 { --delay: 200ms; }
.delay-400 { --delay: 400ms; }
.delay-600 { --delay: 600ms; }
`

type Price = { label?: string; value: string }
type Item = { name: string; note?: string; desc?: string; prices: Price[] }
type Category = { id: string; label: string; icon: typeof Leaf; items: Item[] }

const categories: Category[] = [
  {
    id: 'matcha',
    label: 'Matcha',
    icon: Leaf,
    items: [
      { name: 'Matcha Oolong', desc: 'Matcha kết hợp ô long, thanh và thơm.', prices: [{ label: 'Bé', value: '33' }, { label: 'Bự', value: '39' }] },
      { name: 'Matcha Latte', desc: 'Matcha hòa sữa, béo nhẹ dễ uống.', prices: [{ label: 'Bé', value: '33' }, { label: 'Bự', value: '39' }] },
      { name: 'Cold Whisk', note: 'Best', desc: 'Matcha đánh lạnh, đậm vị nguyên bản.', prices: [{ label: 'Bé', value: '38' }, { label: 'Bự', value: '45' }] },
      { name: 'Thay Sữa Yến Mạch', prices: [{ value: '8' }], note: 'thêm' },
    ],
  },
  {
    id: 'thom-thom',
    label: 'Thơm Thơm',
    icon: Flower2,
    items: [
      { name: 'Hồng Trà Quế', desc: 'Hồng trà thơm quế, ấm nhẹ và dễ uống.', prices: [{ label: 'Bé', value: '22' }, { label: 'Bự', value: '28' }] },
      { name: 'Hồng Trà Cúc', desc: 'Hồng trà kết hợp hoa cúc, hương dịu thư giãn.', prices: [{ label: 'Bé', value: '22' }, { label: 'Bự', value: '28' }] },
      { name: 'Cúc Latte', desc: 'Hoa cúc cùng sữa, béo nhẹ và thơm ngọt.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
      { name: 'Quế Latte', desc: 'Latte hương quế, ấm áp và mềm vị.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
      { name: 'Lài Latte', note: 'Best', desc: 'Trà lài sữa thanh thơm, hậu vị nhẹ nhàng.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
    ],
  },
  {
    id: 'chua-chua',
    label: 'Chua Chua',
    icon: Citrus,
    items: [
      { name: 'Oh My Tea', note: 'Best', desc: 'Ly trà trái cây chua ngọt, cực kỳ giải khát.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
      { name: 'Hồng Trà Tắc', desc: 'Hồng trà và tắc, chua thanh quen thuộc.', prices: [{ label: 'Bé', value: '22' }, { label: 'Bự', value: '28' }] },
      { name: 'Trà Tắc Quế', desc: 'Tắc tươi điểm chút quế thơm độc đáo.', prices: [{ label: 'Bé', value: '22' }, { label: 'Bự', value: '28' }] },
      { name: 'Hồng Trà Chanh Tây', desc: 'Hồng trà chanh vàng, tươi mát và cân bằng.', prices: [{ label: 'Bé', value: '27' }, { label: 'Bự', value: '33' }] },
      { name: 'Trà Chanh Quế', desc: 'Chanh và quế hòa quyện, thơm mát lạ miệng.', prices: [{ label: 'Bé', value: '27' }, { label: 'Bự', value: '33' }] },
      { name: 'Trà Me Nam Du', desc: 'Vị me chua ngọt đậm đà, cực cuốn.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
      { name: 'Trà Vải Túi Nâu', desc: 'Trà thơm cùng vải ngọt dịu, dễ mê.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
    ],
  },
  {
    id: 'ngot-ngot',
    label: 'Ngọt Ngọt',
    icon: Candy,
    items: [
      { name: 'Đào Mật Ong', desc: 'Đào ngọt thanh hòa cùng mật ong tự nhiên.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
      { name: 'Xoài Mật Ong', desc: 'Xoài chín kết hợp mật ong, ngọt thơm đậm vị.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
      { name: 'Trà Cam Quế', desc: 'Cam tươi và quế, thơm ấm đầy sức sống.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
      { name: 'Nhài Cam Thơm', desc: 'Trà nhài cùng cam, hương thơm thanh mát.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
      { name: 'Trà Ổi Hồng', note: 'Best', desc: 'Ổi hồng ngọt nhẹ, thơm dịu và tươi mới.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
      { name: 'Trà Bưởi Đỏ', desc: 'Bưởi đỏ thanh mát, hậu vị hơi chua nhẹ.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
      { name: 'Trà Sen Vải', desc: 'Sen thơm kết hợp vải, thanh tao và dịu ngọt.', prices: [{ label: 'Bé', value: '35' }, { label: 'Bự', value: '41' }] },
      { name: 'Gừng Cam Xoài', note: 'New', desc: 'Gừng ấm, cam thơm, xoài ngọt đầy cá tính.', prices: [{ label: 'Bé', value: '33' }, { label: 'Bự', value: '39' }] },
    ],
  },
  {
    id: 'beo-beo',
    label: 'Béo Béo',
    icon: Coffee,
    items: [
      { name: 'Trà Sữa Hoa Cúc', note: 'Best', desc: 'Trà sữa hoa cúc, thơm dịu và béo nhẹ.', prices: [{ label: 'Bé', value: '27' }, { label: 'Bự', value: '33' }] },
      { name: 'Trà Sữa Hoa Nhài', desc: 'Trà sữa nhài thanh hương, uống không ngấy.', prices: [{ label: 'Bé', value: '27' }, { label: 'Bự', value: '33' }] },
      { name: 'Trà Sữa Quế', desc: 'Trà sữa điểm hương quế, ấm và thơm.', prices: [{ label: 'Bé', value: '27' }, { label: 'Bự', value: '33' }] },
      { name: 'Trà Sữa Túi Nâu', note: 'Best', desc: 'Công thức đặc trưng của Tiệm Trà Túi Nâu.', prices: [{ label: 'Bé', value: '33' }, { label: 'Bự', value: '39' }] },
      { name: 'Oolong Sữa', desc: 'Ô long sữa thơm đậm, hậu vị sạch.', prices: [{ label: 'Bé', value: '33' }, { label: 'Bự', value: '39' }] },
      { name: 'Trà Sữa Caramel', desc: 'Caramel ngọt thơm, béo mịn vừa đủ.', prices: [{ label: 'Bé', value: '33' }, { label: 'Bự', value: '39' }] },
      { name: 'Trà Sữa Hạt Phỉ', desc: 'Hương hạt phỉ bùi béo, thơm quyến rũ.', prices: [{ label: 'Bé', value: '32' }, { label: 'Bự', value: '38' }] },
    ],
  },
  {
    id: 'topping',
    label: 'Topping',
    icon: Bubbles,
    items: [
      { name: 'Trân Châu Đen', prices: [{ value: '7' }], note: 'phần' },
      { name: 'Trân Châu Trắng', prices: [{ value: '6' }], note: 'phần' },
      { name: 'Sương Sáo', prices: [{ value: '6' }], note: 'phần' },
      { name: 'Nha Đam', prices: [{ value: '7' }], note: 'phần' },
      { name: 'Vải Tươi', prices: [{ value: '10' }], note: 'phần' },
      { name: 'Đào Miếng', prices: [{ value: '10' }], note: 'phần' },
      { name: 'Thạch Xí Muội', prices: [{ value: '10' }], note: 'viên' },
    ],
  },
]

export function Menu() {
  const [active, setActive] = useState('matcha')
  const current = categories.find((c) => c.id === active)!

  // Scroll-triggered animation for tablist & items
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tablist = document.querySelector('#menu [role="tablist"]')
    const grid = document.querySelector('#menu .menu-grid')

    const sts: ScrollTrigger[] = []

    if (tablist) {
      const t = gsap.fromTo(tablist,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: '#menu', start: 'top 75%', toggleActions: 'restart reverse restart reverse' } }
      )
      if (t.scrollTrigger) sts.push(t.scrollTrigger)
    }

    if (grid) {
      const t = gsap.fromTo(grid,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.35, ease: 'power2.out',
          scrollTrigger: { trigger: '#menu', start: 'top 65%', toggleActions: 'restart reverse restart reverse' } }
      )
      if (t.scrollTrigger) sts.push(t.scrollTrigger)
    }

    return () => sts.forEach((st) => st.kill())
  }, [active])

  return (
    <section id="menu" className="bg-espresso py-20 text-cream md:py-32">
      <style>{animStyles}</style>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-rose">
            Thực Đơn
          </p>
          <h2 className="font-serif text-3xl text-balance sm:text-4xl sm:text-5xl">
            Gọi một tách yêu thích
          </h2>
          <BotanicalDivider className="mt-6 h-6 w-48 text-rose sm:w-56" />
        </div>

        {/* tabs */}
        <div role="tablist" className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-12 sm:gap-3">
          {categories.map((c) => {
            const Icon = c.icon
            const isActive = c.id === active
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-2 text-xs uppercase tracking-wider transition-all duration-200 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm sm:tracking-widest',
                  isActive
                    ? 'bg-cream text-espresso scale-105'
                    : 'border border-cream/25 text-cream/70 hover:border-cream/60 hover:text-cream',
                )}
                role="tab"
                aria-selected={isActive ? 'true' : 'false'}
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {c.label}
              </button>
            )
          })}
        </div>

        {/* cards — key triggers remount for CSS animation */}
        <div
          key={active}
          className="menu-grid mt-8 grid gap-4 sm:mt-12 sm:gap-5 sm:grid-cols-2"
        >
          {current.items.map((item, i) => {
            const Icon = current.icon
            const isTopping = current.id === 'topping'
            return (
              <div
                key={item.name}
                className={cn(
                  'group flex items-center justify-between gap-3 rounded-xl bg-card px-4 py-4 text-card-foreground shadow-sm hover:shadow-md sm:gap-4 sm:px-6 sm:py-5',
                  i % 2 === 0 ? 'menu-card-l' : 'menu-card-r',
                  `delay-${Math.floor(i / 2) * 200}`,
                )}
              >
                <div className="flex items-center gap-3 min-w-0 sm:gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-caramel sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-base leading-tight sm:text-lg">
                      {item.name}
                      {item.note && !isTopping && (
                        <span className="ml-1.5 text-[10px] uppercase tracking-wider text-rose sm:text-xs">
                          {item.note}
                        </span>
                      )}
                    </h3>
                    {item.desc && (
                      <p className="mt-0.5 text-xs leading-snug text-muted-foreground sm:text-sm">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {item.prices.map((p) => (
                    <span
                      key={`${p.label ?? ''}-${p.value}`}
                      className="whitespace-nowrap text-sm sm:text-base"
                    >
                      {p.label && (
                        <span className="mr-1 font-serif text-xs text-card-foreground sm:text-sm">
                          {p.label}
                        </span>
                      )}
                      <span className="font-serif text-caramel">
                        {p.value}K
                      </span>
                      {!p.label && item.note && (
                        <span className="ml-0.5 text-[10px] text-card-foreground/60 sm:text-xs">
                          /{item.note}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

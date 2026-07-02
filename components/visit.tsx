'use client'

import { useState } from 'react'
import { MapPin, Clock } from 'lucide-react'
import { BotanicalDivider } from './botanical-divider'



const branches = [
  {
    label: 'Chi Nhánh Tân Phú',
    name: 'Túi Nâu Tân Phú',
    address: 'Số 2, Đường Độc Lập, Phường Phú Thọ Hòa, TP. HCM',
    hours: '10:00 — 22:00 hàng ngày',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.255406566726!2d106.63459587594018!3d10.79174008935799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fc40cf29053%3A0x6d5b89aab97fe99b!2zVGnhu4dtIFRyw6AgVMO6aSBOw6J1!5e0!3m2!1svi!2s!4v1782973158353!5m2!1svi!2s',
    signature: false,
  },
  {
    label: 'Chi Nhánh Quận 3',
    name: 'Túi Nâu Quận 3',
    address: 'Số 44/7, Đường Nguyễn Thông, Phường Xuân Hòa, TP. HCM',
    hours: '10:00 — 22:00 hàng ngày',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.416545764306!2d106.67985317594004!3d10.7793743893696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f005dcf7afd%3A0x56c72fc99915e3f5!2zVGnhu4dtIFRyw6AgVMO6aSBOw6J1IFNpZ25hdHVyZSAtIE5ndXnhu4VuIFRow7RuZw!5e0!3m2!1svi!2s!4v1782973096843!5m2!1svi!2s',
    signature: false,
  },
  {
    label: 'Chi Nhánh Quận 1',
    name: 'Túi Nâu Quận 1',
    address: 'Số 69A, Đường Nguyễn Khắc Nhu, Phường Cầu Ông Lãnh, TP. HCM',
    hours: '10:00 — 22:00 hàng ngày',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6227469699193!2d106.69041497593979!3d10.76353018938444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fb373fff4ab%3A0x2a02a9bde456f00d!2zVGnhu4dtIFRyw6AgVMO6aSBOw6J1IC0gTmd1eeG7hW4gS2jhuq9jIE5odQ!5e0!3m2!1svi!2s!4v1782973133851!5m2!1svi!2s',
    signature: true,
  },
]

export function Visit() {
  const [selected, setSelected] = useState<number>(0)

  return (
    <section id="visit" className="bg-espresso py-20 text-cream md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-rose">
            TÌM CHÚNG MÌNH
          </p>
          <h2 className="font-serif text-3xl text-balance sm:text-4xl sm:text-5xl">
            Ba góc nhỏ, một vị quen
          </h2>
          <BotanicalDivider className="mt-6 h-6 w-48 text-rose sm:w-56" />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-14">
          {/* Branch cards */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {branches.map((b, i) => (
              <button
                key={b.name}
                onClick={() => setSelected(i)}
                className={`branch-card bg-cream/5 rounded-xl p-5 border text-left transition-all duration-300 sm:p-6 ${
                  selected === i
                    ? 'border-rose/60 shadow-[0_0_0_1px_rgba(249,115,160,0.3)]'
                    : 'border-cream/10'
                } ${
                  b.signature ? 'border-t-2' : ''
                }`}
              >
                {b.signature && (
                  <div className="mb-2">
                    <span className="bg-rose/20 text-rose border border-rose/30 rounded-full px-2 py-0.5 text-xs inline-block">
                      ✦ Signature
                    </span>
                  </div>
                )}
                <div className="uppercase tracking-widest text-rose text-xs">
                  {b.label}
                </div>
                <h3 className="font-serif text-lg text-cream mt-1 sm:text-xl">
                  {b.name}
                </h3>
                <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:gap-2.5">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
                    <span className="text-cream/75 text-sm">{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-rose" />
                    <span className="text-cream/75 text-sm">{b.hours}</span>
                  </div>
                </div>
              </button>
            ))}


          </div>

          {/* Map — taller on mobile so it's usable */}
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-cream/15 md:min-h-[400px]">
            <iframe
              key={selected}
              title={branches[selected].name}
              src={branches[selected].src}
              className="absolute inset-0 h-full w-full opacity-80 [filter:sepia(0.4)_saturate(0.8)]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <div className="pointer-events-none absolute inset-0 bg-espresso/10" />
          </div>
        </div>
      </div>
    </section>
  )
}

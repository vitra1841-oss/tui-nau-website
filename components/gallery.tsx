import Image from 'next/image'
import { BotanicalDivider } from './botanical-divider'

type ImageDim = { w: number; h: number }

const DIMS: Record<string, ImageDim> = {
  '/images/gallery-1.jpg': { w: 880, h: 881 },
  '/images/gallery-2.jpg': { w: 3072, h: 4096 },
  '/images/gallery-3.jpg': { w: 2048, h: 1365 },
  '/images/gallery-4.jpg': { w: 3072, h: 4096 },
  '/images/gallery-5.jpg': { w: 3072, h: 4096 },
  '/images/gallery-6.jpg': { w: 1591, h: 2022 },
}

const ALTS: Record<string, string> = {
  '/images/gallery-1.jpg': 'Cà phê nguyên bản.',
  '/images/gallery-2.jpg': 'Matcha tươi ngon.',
  '/images/gallery-3.jpg': 'Phục vụ tận tâm.',
  '/images/gallery-4.jpg': 'Ấm áp mỗi ngày.',
  '/images/gallery-5.jpg': 'Không gian ấm cúng.',
  '/images/gallery-6.jpg': 'Trà xanh thanh mát.',
}

type Cell = {
  src: string
  alt: string
  colStart: number
  rowStart: number
  colSpan: number
  rowSpan: number
}

function computeLayout(): Cell[] {
  const items = Object.entries(DIMS).map(([src, dim]) => ({
    src,
    ar: dim.w / dim.h,
  }))

  items.sort((a, b) => b.ar - a.ar)

  const landscape = items.filter((i) => i.ar >= 1.2)
  const square = items.filter((i) => i.ar >= 0.9 && i.ar < 1.2)
  const portraits = items.filter((i) => i.ar < 0.9)

  portraits.sort((a, b) => b.ar - a.ar)

  return [
    {
      src: landscape[0].src,
      alt: ALTS[landscape[0].src],
      colStart: 1,
      rowStart: 1,
      colSpan: 12,
      rowSpan: 8,
    },
    {
      src: portraits[0].src,
      alt: ALTS[portraits[0].src],
      colStart: 13,
      rowStart: 1,
      colSpan: 12,
      rowSpan: 10,
    },
    {
      src: portraits[1].src,
      alt: ALTS[portraits[1].src],
      colStart: 1,
      rowStart: 9,
      colSpan: 6,
      rowSpan: 8,
    },
    {
      src: portraits[2].src,
      alt: ALTS[portraits[2].src],
      colStart: 7,
      rowStart: 9,
      colSpan: 6,
      rowSpan: 8,
    },
    {
      src: square[0].src,
      alt: ALTS[square[0].src],
      colStart: 13,
      rowStart: 11,
      colSpan: 6,
      rowSpan: 6,
    },
    {
      src: portraits[3].src,
      alt: ALTS[portraits[3].src],
      colStart: 19,
      rowStart: 11,
      colSpan: 6,
      rowSpan: 6,
    },
  ]
}

const cells = computeLayout()

export function Gallery() {
  return (
    <section id="gallery" className="paper-texture bg-background py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center text-caramel">
          <p className="mb-3 text-xs uppercase tracking-[0.4em]">Khoảnh Khắc</p>
          <h2 className="font-serif text-3xl text-balance text-foreground sm:text-4xl sm:text-5xl">
            Một chút Túi Nâu
          </h2>
          <BotanicalDivider className="mt-6 h-6 w-48 sm:w-56" />
        </div>

        <div className="mt-10 grid gap-3 md:gap-4 gallery-grid">
          <style>{`
            @media (max-width: 767px) {
              .gallery-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
              .gallery-grid > * {
                grid-column: auto !important;
                grid-row: auto !important;
                aspect-ratio: 3 / 4;
              }
            }
            @media (min-width: 768px) {
              .gallery-grid {
                grid-template-columns: repeat(24, 1fr) !important;
                grid-auto-rows: 1fr !important;
                aspect-ratio: 3 / 2;
              }
            }
          `}</style>
          {cells.map((c) => (
            <div
              key={c.src}
              className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-muted"
              style={{
                gridColumn: `${c.colStart} / span ${c.colSpan}`,
                gridRow: `${c.rowStart} / span ${c.rowSpan}`,
              }}
            >
              <Image
                src={c.src || '/placeholder.svg'}
                alt={c.alt}
                fill
                className="object-cover transition-all duration-500 [filter:sepia(0.15)] group-hover:scale-105 group-hover:[filter:sepia(0.55)]"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/15" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="text-xs font-medium text-white/90">{c.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Image from 'next/image'
import { BotanicalDivider } from './botanical-divider'

const photos = [
  { src: '/images/gallery-1.jpg', alt: 'Đồ uống Túi Nâu', tall: true },
  { src: '/images/gallery-2.jpg', alt: 'Không gian Túi Nâu', tall: false },
  { src: '/images/gallery-3.jpg', alt: 'Trà thủ công Túi Nâu', tall: false },
  { src: '/images/gallery-4.jpg', alt: 'Chi tiết tách trà', tall: true },
  { src: '/images/gallery-5.jpg', alt: 'Bánh tại Túi Nâu', tall: true },
  { src: '/images/gallery-6.jpg', alt: 'Mặt tiền Túi Nâu', tall: false },
]

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

        {/* 2 cols on mobile, 3 on md+ */}
        <div className="mt-10 columns-2 gap-3 md:columns-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4">
          {photos.map((p) => (
            <div
              key={p.src}
              className="group relative block break-inside-avoid overflow-hidden rounded-lg sm:rounded-xl"
            >
              <Image
                src={p.src || '/placeholder.svg'}
                alt={p.alt}
                width={600}
                height={p.tall ? 800 : 520}
                className="w-full object-cover transition-all duration-500 [filter:sepia(0.15)] group-hover:scale-105 group-hover:[filter:sepia(0.55)]"
              />
              <div className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

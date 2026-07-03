import Image from 'next/image'
import { BotanicalDivider } from './botanical-divider'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-espresso text-cream"
    >
      {/* atmospheric hero image */}
      <Image
        src="/images/hero.jpg"
        alt="Không gian ấm cúng của Tiệm Trà Túi Nâu dưới ánh đèn vàng"
        fill
        priority
        className="object-cover opacity-55"
      />

      {/* soft vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 40%, transparent 20%, rgba(44,26,14,0.55) 70%, rgba(44,26,14,0.92) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo — nhỏ hơn trên mobile */}
        <div className="animate-fade-up mb-6">
          <Image
            src="/images/logo.png"
            alt="Tiệm Trà Túi Nâu"
            width={160}
            height={200}
            className="mx-auto object-contain brightness-0 invert opacity-90 w-24 h-auto sm:w-32 md:w-40"
          />
        </div>

        <p
          className="animate-fade-up mb-5 text-xs uppercase tracking-[0.4em] text-rose"
          style={{ animationDelay: '0.15s' }}
        >
          TRÀ · ĐỒ UỐNG · TAKE AWAY
        </p>

        <h1
          className="animate-fade-up font-serif text-4xl leading-tight text-balance sm:text-5xl md:text-7xl lg:text-8xl"
          style={{ animationDelay: '0.25s' }}
        >
          Tiệm Trà Túi Nâu
        </h1>

        <div
          className="animate-fade-up my-6 text-rose sm:my-7"
          style={{ animationDelay: '0.4s' }}
        >
          <BotanicalDivider className="h-6 w-48 sm:w-64" />
        </div>

        <p
          className="animate-fade-up max-w-sm font-serif text-base italic text-cream/85 text-pretty sm:max-w-md sm:text-lg sm:text-xl"
          style={{ animationDelay: '0.5s' }}
        >
          {'Một tách trà — một khoảnh khắc chỉ của bạn'}
        </p>

        <a
          href="#menu"
          className="animate-fade-up mt-8 rounded-full bg-cream px-6 py-3 text-xs uppercase tracking-widest text-espresso transition-transform hover:-translate-y-0.5 sm:mt-10 sm:px-8 sm:text-sm"
          style={{ animationDelay: '0.65s' }}
        >
          Xem Thực Đơn
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.3em] text-cream/50">
        Xuống dưới để hiểu thêm về tụi mình
      </div>
    </section>
  )
}

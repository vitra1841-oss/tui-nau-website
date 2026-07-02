import Image from 'next/image'

export function SiteFooter() {
  return (
    <footer className="bg-espresso pb-10 text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 border-t border-cream/10 px-6 pt-10 text-center">
        <Image
          src="/images/logo.png"
          alt="Tiệm Trà Túi Nâu"
          width={28}
          height={40}
          className="object-contain brightness-0 invert opacity-60"
        />
        <p className="font-serif text-2xl">Tiệm Trà Túi Nâu</p>
        <p className="max-w-xs text-sm italic text-cream/60">
          {'Một tách trà, một khoảnh khắc chỉ của bạn'}
        </p>
        <p className="mt-4 text-xs uppercase tracking-widest text-cream/40">
          © {new Date().getFullYear()} Tiệm Trà Túi Nâu · TP. Hồ Chí Minh
        </p>
      </div>
    </footer>
  )
}

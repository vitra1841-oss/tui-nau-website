import { BotanicalDivider } from './botanical-divider'

function WaxSeal() {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-20 w-20 text-caramel sm:h-24 sm:w-24"
      aria-hidden="true"
    >
      <path
        d="M48 6 c 6 4 14 3 18 8 c 5 4 4 12 8 17 c 4 5 11 7 12 13 c 1 6 -5 11 -5 17 c 0 6 6 11 5 17 c -1 6 -8 8 -12 13 c -4 5 -3 13 -8 17 c -4 5 -12 4 -18 8 c -6 4 -12 -1 -18 -1 c -6 0 -12 5 -18 1 c -6 -4 -5 -12 -9 -17 c -4 -5 -12 -7 -13 -13 c -1 -6 5 -11 5 -17 c 0 -6 -6 -11 -5 -17 c 1 -6 9 -8 13 -13 c 4 -5 3 -13 9 -17 c 6 -5 12 -4 18 -8 Z"
        fill="currentColor"
        fillOpacity="0.9"
        transform="translate(0,0)"
      />
      <circle
        cx="48"
        cy="48"
        r="30"
        stroke="var(--cream)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <text
        x="48"
        y="55"
        textAnchor="middle"
        className="font-serif"
        fontSize="26"
        fill="var(--cream)"
        fontStyle="italic"
      >
        TN
      </text>
    </svg>
  )
}

export function About() {
  return (
    <section id="about" className="paper-texture bg-background py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-20">
        <div className="text-caramel">
          <BotanicalDivider className="mb-6 h-6 w-36 text-caramel sm:mb-8 sm:w-40" />
          <blockquote className="font-serif text-2xl italic leading-snug text-foreground text-pretty sm:text-3xl md:text-4xl lg:text-5xl">
            {'"Trà không vội. Người uống trà cũng vậy."'}
          </blockquote>
        </div>

        <div className="flex flex-col items-start gap-6 sm:gap-8">
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Túi Nâu ra đời từ tình yêu với những hương vị giản dị: một túi trà ủ kỹ, một ly matcha mịn thơm, một khoảnh khắc chậm giữa ngày.
            </p>
            <p>
              Chúng tôi không có ghế sang hay không gian rộng. Chỉ có đồ uống ngon,
              làm thủ công mỗi ngày, sẵn sàng đồng hành cùng bạn trên mọi con đường.
            </p>
            <p>
              Mang theo một ly Túi Nâu, và mang theo một khoảnh khắc chỉ của riêng
              bạn.
            </p>
          </div>
          <WaxSeal />
        </div>
      </div>
    </section>
  )
}

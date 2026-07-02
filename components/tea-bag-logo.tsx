import { cn } from '../lib/utils'

export function TeaBagLogo({
  className,
  animate = false,
}: {
  className?: string
  animate?: boolean
}) {
  return (
    <svg
      viewBox="0 0 64 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('overflow-visible', className)}
      aria-hidden="true"
    >
      <g className={animate ? 'tea-bag-string' : undefined}>
        {/* string */}
        <path
          d="M32 2 C 30 14, 34 20, 32 30"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* top tab / label */}
        <rect
          x="24"
          y="1"
          width="16"
          height="10"
          rx="2"
          fill="currentColor"
        />
        {/* bag body */}
        <path
          d="M20 32 C 20 30, 22 30, 32 30 C 42 30, 44 30, 44 32 L 50 84 C 50 90, 46 92, 40 92 L 24 92 C 18 92, 14 90, 14 84 Z"
          fill="currentColor"
          fillOpacity="0.16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* fold line */}
        <path
          d="M20 32 C 28 36, 36 36, 44 32"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* leaf mark */}
        <path
          d="M32 52 C 27 56, 27 66, 32 72 C 37 66, 37 56, 32 52 Z"
          fill="currentColor"
          fillOpacity="0.75"
        />
        <path
          d="M32 54 L 32 70"
          stroke="var(--cream)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

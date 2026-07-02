import { cn } from '@/lib/utils'

export function BotanicalDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-60', className)}
      aria-hidden="true"
    >
      <line
        x1="8"
        y1="12"
        x2="92"
        y2="12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="148"
        y1="12"
        x2="232"
        y2="12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* central sprig */}
      <path
        d="M120 4 C 120 10, 120 16, 120 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M120 9 C 114 7, 110 9, 108 12 C 112 13, 117 13, 120 11 Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M120 9 C 126 7, 130 9, 132 12 C 128 13, 123 13, 120 11 Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M120 15 C 115 13, 112 15, 110 18 C 114 19, 118 18, 120 16 Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M120 15 C 125 13, 128 15, 130 18 C 126 19, 122 18, 120 16 Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <circle cx="120" cy="4" r="2" fill="currentColor" />
    </svg>
  )
}

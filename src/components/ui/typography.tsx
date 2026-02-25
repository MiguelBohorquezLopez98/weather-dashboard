import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type TypographyProps = {
  children: ReactNode
  className?: string
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  )
}

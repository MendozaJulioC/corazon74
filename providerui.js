// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'

export function ProvidersUI({children}) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}
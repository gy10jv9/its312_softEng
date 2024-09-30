'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), []) // to prevent rendering issues related to server-side rendering (SSR) in Next.js

  if (!mounted) return ( // loading indicator lang na ang image mag switch theme
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={36}
      height={36}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
    />
  )

  if (resolvedTheme === 'dark') { // para mag switch ang theme pati ang button
    return <button className="bg-[#00087a] ml-60 hover:bg-[#335CF0]" onClick={() => setTheme('light')}> Switch to Light Mode </button>
  }

  if (resolvedTheme === 'light') { // para mag switch ang theme pati ang button
    return <button className="ml-60" onClick={() => setTheme('dark')}> Switch to Light Mode </button>
  }

  // source: https://www.davegray.codes/posts/light-dark-mode-nextjs-app-router-tailwind
}
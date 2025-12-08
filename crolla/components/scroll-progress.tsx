"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setWidth(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-gray-100/20">
      <div
        className="h-full bg-gradient-to-r from-[#0055FF] to-cyan-400 transition-all duration-150 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"

export function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // マウスの位置を少し遅れて追従させるために、requestAnimationFrameを使う手もありますが、
      // 今回はシンプルにstate更新で実装します
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.body.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:block"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${position.x + 16}px, ${position.y + 16}px)`,
      }}
    >
      {/* 追従させるアイコン。
         自作ロゴの一部（アイコン部分）を使うと可愛いです。
         ここでは簡易的に絵文字を使っていますが、imgタグに変えてもOK！ 
      */}
      <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-blue-100">
        <img src="/logo_icon.png" alt="" className="w-4 h-4 object-contain" />
      </div>
    </div>
  )
}
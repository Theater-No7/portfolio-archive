"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background dark">
      {/* 1. 常に左にあるサイドバー */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 2. 常に上にあるヘッダー */}
        <Header />
        
        {/* 3. ページごとに中身が変わるエリア (Main) */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  )
}
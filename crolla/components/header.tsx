"use client"

import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-4 flex-1">
        <h1 className="text-xl font-semibold text-foreground">記事管理</h1>
        <div className="relative max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input type="search" placeholder="記事を検索..." className="pl-9 bg-background" />
        </div>
      </div>
      <Button className="gap-2">
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">新規記事</span>
      </Button>
    </header>
  )
}

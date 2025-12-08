"use client"

import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  Bell, 
  BarChart3, 
  Globe,
  ChevronDown,
  LogOut,
  GitBranch,
  Github,
  Database, // 👈 追加
  Check     // 👈 追加
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "ダッシュボード", href: "/dashboard", icon: LayoutDashboard },
  { name: "記事一覧", href: "/dashboard/articles", icon: FileText },
  { name: "AI分析", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "チーム管理", href: "/dashboard/team", icon: Users },
  { name: "通知設定", href: "/dashboard/notifications", icon: Bell },
  { name: "設定", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-slate-950 border-r border-slate-800 text-slate-300 h-full flex-shrink-0">
      {/* ヘッダーロゴ */}
      <div className="p-6 flex items-center justify-start">
        <Link 
          href="/dashboard" 
          className="block h-19 w-40 relative overflow-hidden group rounded-lg"
        >
          <img 
            src="/logo-full.png" 
            alt="Crolla" 
            className="absolute inset-0 h-full w-full object-cover group-hover:opacity-80 transition-opacity" 
          />
        </Link>
      </div>

      {/* 👇 サイト & 環境選択エリア */}
      <div className="px-4 mb-6 space-y-4">
        
        {/* 1. Current Site */}
        <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors group">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700">
              <Globe className="h-4 w-4 text-slate-400 group-hover:text-[#0055FF] transition-colors" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Current Site</span>
              <span className="text-sm font-bold text-white truncate">crolla.web.app</span>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </div>

        {/* 環境設定グループ */}
        <div className="space-y-3 pt-2 border-t border-slate-800/50">
          
          {/* 2. GitHub Branch */}
          <div className="relative group">
            <div className="flex items-center justify-between px-1 mb-1.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold pl-1">
                Target Branch
              </span>
              <Github className="h-3 w-3 text-slate-600" />
            </div>
            <div className="relative">
              <select 
                className="w-full bg-slate-900/50 border border-slate-800 text-slate-300 text-xs font-mono rounded-md py-2 pl-9 pr-8 appearance-none cursor-pointer hover:border-slate-600 hover:text-white focus:outline-none focus:border-[#0055FF] transition-all"
                defaultValue="main"
              >
                <option value="main">main</option>
                <option value="develop">develop</option>
                <option value="feature/new-pricing">feature/pricing</option>
              </select>
              <GitBranch className="absolute left-2.5 top-2 h-4 w-4 text-[#0055FF]" />
              <ChevronDown className="absolute right-2.5 top-2.5 h-3 w-3 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* 3. Content Source (CMS) - 新規追加！ */}
          <div className="relative group">
            <div className="flex items-center justify-between px-1 mb-1.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold pl-1">
                Content Source
              </span>
              {/* 接続中ステータス */}
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] text-emerald-500 font-medium">Online</span>
              </div>
            </div>
            <div className="relative">
              <select 
                className="w-full bg-slate-900/50 border border-slate-800 text-slate-300 text-xs font-sans rounded-md py-2 pl-9 pr-8 appearance-none cursor-pointer hover:border-slate-600 hover:text-white focus:outline-none focus:border-emerald-500 transition-all"
                defaultValue="wp-prod"
              >
                <option value="wp-prod">WordPress [Prod]</option>
                <option value="wp-stg">WordPress [Staging]</option>
                <option value="microcms">MicroCMS</option>
              </select>
              {/* CMSっぽいデータベースアイコン */}
              <Database className="absolute left-2.5 top-2 h-4 w-4 text-emerald-500" />
              <ChevronDown className="absolute right-2.5 top-2.5 h-3 w-3 text-slate-500 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* ナビゲーションメニュー */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? "bg-[#0055FF] text-white shadow-lg shadow-blue-900/20" 
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }
              `}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400"}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* フッター */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">
            田中
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">田中太郎</p>
            <p className="text-xs text-slate-500 truncate">admin@example.com</p>
          </div>
        </div>
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-950/30 gap-2 pl-2">
            <LogOut className="h-4 w-4" />
            ログアウト
          </Button>
        </Link>
      </div>
    </div>
  )
}
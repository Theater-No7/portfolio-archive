"use client"

import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  MessageSquare, 
  Trello, 
  Database, 
  Cloud, 
  FileText,
  Check
} from "lucide-react"

// 連携ツールリスト
const integrations = [
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description: "更新通知や承認依頼をSlackチャンネルに通知します。",
    icon: MessageSquare,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    connected: false
  },
  {
    id: "linear",
    name: "Linear",
    category: "Project Mgmt",
    description: "修正タスクをLinearのIssueとして自動起票します。",
    icon: Trello,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    connected: false
  },
  {
    id: "notion",
    name: "Notion",
    category: "Knowledge",
    description: "Notion上のドキュメントも同期・監視対象にします。",
    icon: FileText,
    color: "text-slate-200",
    bg: "bg-slate-500/10",
    connected: false
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Deployment",
    description: "デプロイ完了のフックを受け取り、即時解析を実行します。",
    icon: Cloud,
    color: "text-white",
    bg: "bg-white/10",
    connected: true
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM / CMS",
    description: "LPやブログ記事の更新を管理・同期します。",
    icon: Database,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    connected: false
  }
]

export function IntegrationsModal() {
  const [searchQuery, setSearchQuery] = useState("")
  const [connectedTools, setConnectedTools] = useState<string[]>(["vercel"])
  const [open, setOpen] = useState(false) // Stateで開閉を管理

  const toggleConnection = (id: string) => {
    if (connectedTools.includes(id)) {
      setConnectedTools(connectedTools.filter(t => t !== id))
    } else {
      setConnectedTools([...connectedTools, id])
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-7 h-7 rounded-full bg-slate-800 border-2 border-slate-700 border-dashed flex items-center justify-center hover:border-slate-500 hover:bg-slate-700 transition-all group">
          <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
        </button>
      </DialogTrigger>
      
      {/* Hydrationエラー対策：マウントされた時だけ中身を表示する手もありますが、
          今回はState管理に変えたのでこのままで大丈夫なはずです */}
      <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">連携を追加</DialogTitle>
          <DialogDescription className="text-slate-400">
            ワークフローを自動化するために、普段お使いのツールと接続してください。
          </DialogDescription>
        </DialogHeader>

        {/* 検索バー */}
        <div className="relative mt-2 mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <Input 
            placeholder="ツールを検索..." 
            className="pl-9 bg-slate-900 border-slate-800 text-slate-200 focus:border-[#0055FF]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* ツール一覧グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {integrations
            .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((item) => {
              const isConnected = connectedTools.includes(item.id)
              return (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-xl border transition-all ${
                    isConnected 
                      ? "bg-blue-950/20 border-[#0055FF]/50" 
                      : "bg-slate-900 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className={`p-2 rounded-lg ${item.bg}`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    {isConnected ? (
                      <Badge className="bg-[#0055FF] hover:bg-[#0055FF] text-white gap-1 pl-1 pr-2">
                        <Check className="h-3 w-3" /> Connected
                      </Badge>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs border-slate-700 text-slate-300 hover:bg-white hover:text-black"
                        onClick={() => toggleConnection(item.id)}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                      {item.name}
                      <span className="text-[10px] font-normal text-slate-500 px-1.5 py-0.5 rounded border border-slate-800 bg-slate-950">
                        {item.category}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
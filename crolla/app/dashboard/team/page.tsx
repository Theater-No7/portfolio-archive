"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  UserPlus, 
  MoreHorizontal, 
  Shield, 
  CheckCircle2, 
  FileEdit, 
  GitMerge, 
  Settings,
  Mail,
  Check,
  Copy,
  Loader2
} from "lucide-react"
import { toast } from "sonner" // トースト通知用

// モックデータ：メンバーリスト
const members = [
  {
    id: 1,
    name: "田中 太郎",
    email: "taro.tanaka@example.com",
    role: "Admin",
    status: "active",
    avatar: "/avatars/01.png",
    initial: "TT"
  },
  {
    id: 2,
    name: "鈴木 花子",
    email: "hanako.suzuki@example.com",
    role: "Editor",
    status: "active",
    avatar: "/avatars/02.png",
    initial: "SH"
  },
  {
    id: 3,
    name: "佐藤 健",
    email: "ken.sato@example.com",
    role: "Viewer",
    status: "invited",
    avatar: "",
    initial: "KS"
  },
]

// モックデータ：アクティビティログ
const activities = [
  {
    id: 1,
    user: "田中 太郎",
    initial: "TT",
    action: "が記事を承認しました",
    target: "料金プラン一覧",
    time: "10分前",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10"
  },
  {
    id: 2,
    user: "鈴木 花子",
    initial: "SH",
    action: "が設定を変更しました",
    target: "通知設定 / Slack連携",
    time: "2時間前",
    icon: Settings,
    color: "text-slate-400",
    bg: "bg-slate-500/10"
  },
  {
    id: 3,
    user: "System",
    initial: "AI",
    action: "が自動修正案を作成しました",
    target: "API v2 リファレンス",
    time: "3時間前",
    icon: FileEdit,
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  {
    id: 4,
    user: "田中 太郎",
    initial: "TT",
    action: "がGitHub連携を行いました",
    target: "main branch",
    time: "昨日",
    icon: GitMerge,
    color: "text-purple-400",
    bg: "bg-purple-500/10"
  },
  {
    id: 5,
    user: "鈴木 花子",
    initial: "SH",
    action: "がメンバーを招待しました",
    target: "佐藤 健 (Viewer)",
    time: "昨日",
    icon: UserPlus,
    color: "text-orange-400",
    bg: "bg-orange-500/10"
  },
]

export default function TeamPage() {
  // 招待モーダルの開閉状態
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // リンクコピー機能
  const handleCopyLink = () => {
    const inviteLink = "https://crolla.web.app/invite/x8d9s0"
    navigator.clipboard.writeText(inviteLink)
    
    // ✅ トースト通知を表示
    toast.success("クリップボードにコピーしました", {
      description: "招待リンクを共有してください。",
      icon: <Check className="w-4 h-4 text-emerald-500" />,
      duration: 3000,
    })
  }

  // 招待送信機能（モック）
  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    // 1.5秒後に完了させる演出
    setTimeout(() => {
      setIsSending(false)
      setIsInviteOpen(false) // モーダルを閉じる
      toast.success("招待メールを送信しました", {
        description: "メンバーが承認すると一覧に追加されます。",
      })
    }, 1500)
  }

  return (
    <div className="space-y-8">
      
      {/* ヘッダーエリア */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">チーム管理</h2>
          <p className="text-slate-400 text-sm">メンバーの権限設定とアクティビティログ</p>
        </div>

        {/* 👇 メンバー招待ボタン（Dialogでラップ） */}
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0055FF] hover:bg-[#0044CC] text-white gap-2">
              <UserPlus className="h-4 w-4" />
              メンバーを招待
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-950 border-slate-800 text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>メンバーを招待</DialogTitle>
              <DialogDescription className="text-slate-400">
                新しいメンバーをプロジェクトに追加します。<br/>招待メールが送信されます。
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSendInvite}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-slate-200">メールアドレス <span className="text-red-400">*</span></Label>
                  <Input id="email" type="email" placeholder="name@company.com" required className="bg-slate-900 border-slate-800 text-white focus:border-[#0055FF]" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message" className="text-slate-200">メッセージ (任意)</Label>
                  <Textarea id="message" placeholder="プロジェクトへの参加をお願いします。" className="bg-slate-900 border-slate-800 text-white focus:border-[#0055FF] min-h-[100px]" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSending} className="bg-[#0055FF] hover:bg-[#0044CC] text-white w-full sm:w-auto">
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 送信中...
                    </>
                  ) : (
                    "招待を送信"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        
        {/* 左カラム：メンバーリスト (8/12) */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">メンバー ({members.length})</CardTitle>
              <CardDescription className="text-slate-400">
                現在プロジェクトに参加しているユーザー
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-900 transition-colors group">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-slate-800 text-slate-300 font-medium">
                          {member.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-slate-200">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {member.status === "invited" ? (
                        <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 bg-yellow-500/10 text-[10px]">
                          招待中
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-slate-700 text-slate-400 bg-slate-800/50 text-[10px]">
                          {member.role}
                        </Badge>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 招待リンク共有カード */}
          <Card className="bg-gradient-to-r from-blue-900/20 to-slate-900 border-blue-800/30 border-dashed border">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">招待リンクで追加</h4>
                  <p className="text-xs text-slate-400">リンクを共有して、SlackやTeamsからメンバーを招待できます</p>
                </div>
              </div>
              {/* 👇 リンクコピーボタンの実装 */}
              <Button 
                variant="outline" 
                size="sm" 
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 gap-2"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4" />
                リンクをコピー
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 右カラム：アクティビティ・タイムライン (4/12) */}
        <div className="md:col-span-5 lg:col-span-4">
          <Card className="bg-slate-950 border-slate-800 h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                <CardTitle className="text-white">監査ログ</CardTitle>
              </div>
              <CardDescription className="text-slate-400">チームの操作履歴</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-4 border-l border-slate-800 space-y-8">
                {activities.map((activity, i) => (
                  <div key={i} className="relative group">
                    {/* タイムラインのドット */}
                    <div className={`absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-slate-950 ${
                      i === 0 ? "bg-emerald-500 animate-pulse" : "bg-slate-700"
                    }`} />
                    
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span>{activity.time}</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Avatar className="h-6 w-6 mt-0.5">
                          <AvatarFallback className="text-[9px] bg-slate-800 text-slate-400 border border-slate-700">
                            {activity.initial}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <span className="font-bold text-slate-200">{activity.user}</span> {activity.action}
                          </p>
                          <div className={`mt-1.5 inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium border border-transparent ${activity.bg} ${activity.color}`}>
                            <activity.icon className="h-3 w-3" />
                            {activity.target}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
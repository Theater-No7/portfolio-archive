"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertTriangle, ExternalLink, Github, Activity, GitCommit, ArrowRight, Check, X, Sparkles } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner" 
import { motion, AnimatePresence } from "framer-motion"
import { IntegrationsModal } from "@/components/integrations-modal" 

// 承認待ちタスクのデータ型
type Task = {
  id: string
  type: "price" | "link" | "brand"
  title: string
  desc: string
  time: string
  diffOld?: string
  diffNew?: string
}

export default function DashboardPage() {
  // タスクリストの状態管理
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      type: "price",
      title: "料金プランページの価格更新",
      desc: "GitHub: feat/new-pricing",
      time: "2時間前",
      diffOld: "月額 ¥9,800",
      diffNew: "月額 ¥12,800"
    },
    {
      id: "2",
      type: "link",
      title: "API v1 廃止に伴うリンク削除",
      desc: "リンク切れ(404)を自動修復",
      time: "5時間前",
      diffOld: "/docs/api-v1/intro",
      diffNew: "/docs/api-v2/intro"
    },
    {
      id: "3",
      type: "brand",
      title: "表記ゆれの統一 (20件)",
      desc: "「引っ越し」に統一",
      time: "昨日",
      diffOld: "引越",
      diffNew: "引っ越し"
    }
  ])

  // ランダムメッセージ用のState
  const [emptyMessage, setEmptyMessage] = useState("")

  // タスクが0になった時にメッセージを決定
  useEffect(() => {
    if (tasks.length === 0) {
      const messages = [
        "🎉 すべて完了しました！素晴らしい一日を🙌",
        "🥳 パーフェクトな整合です！Crollaもにっこり✨",
        "🎉 最高にロックです！バンド組もう🎸"
      ]
      setEmptyMessage(messages[Math.floor(Math.random() * messages.length)])
    }
  }, [tasks.length])

  // 承認アクション
  const handleApprove = (id: string) => {
    toast.success("承認が完了しました！", {
      description: "本番環境への反映を開始します。",
      duration: 3000,
    })
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  // 却下アクション
  const handleReject = (id: string) => {
    toast.info("タスクを却下しました", {
      description: "開発者にフィードバックを送信しました。",
    })
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-8">
      
      {/* ヘッダーエリア：タイトルと連携ステータス */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">ダッシュボード</h2>
          <p className="text-slate-400 text-sm">現在のアクションとサイト状況</p>
        </div>
        
        {/* 連携ステータス & 最新コミット */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-400 font-medium">Live Syncing</span>
            </div>
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#171515] border-2 border-slate-950 flex items-center justify-center" title="GitHub Connected">
                <Github className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="w-7 h-7 rounded-full bg-[#E37400] border-2 border-slate-950 flex items-center justify-center" title="Google Analytics 4 Connected">
                <span className="text-[9px] font-bold text-white">GA4</span>
              </div>
              {/* 👇 連携追加ボタン（復活！） */}
              <div className="ml-2 relative z-10">
                <IntegrationsModal />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono mt-1">
            <div className="flex items-center gap-1 text-slate-500">
              <GitCommit className="h-3 w-3" />
              <span>最新のコミット:</span>
            </div>
            <span className="text-blue-400 font-medium">8a2b9f</span>
            <span className="text-slate-400 max-w-[150px] truncate">feat: 新料金プランの実装</span>
            <span className="text-slate-600 border-l border-slate-800 pl-2 ml-1">2m ago</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        
        {/* 1. 承認待ちタスク & オールクリア画面 */}
        <Card className="bg-slate-950 border-slate-800 flex flex-col relative overflow-hidden min-h-[400px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-400" />
                <CardTitle className="text-white">承認待ち</CardTitle>
              </div>
              {tasks.length > 0 && (
                <Badge variant="outline" className="border-red-500/50 text-red-400 bg-red-500/10 animate-pulse">
                  残り {tasks.length} 件
                </Badge>
              )}
            </div>
            <CardDescription className="text-slate-400 text-xs">AIが生成した修正案の確認・承認</CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative">
            <AnimatePresence mode="popLayout">
              {tasks.length > 0 ? (
                // タスクがある場合：リスト表示
                tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                    className="mb-3"
                  >
                    <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`px-1.5 py-0.5 text-[10px] ${
                          task.type === "price" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                          task.type === "link" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        }`}>
                          {task.type === "price" ? "価格改定" : task.type === "link" ? "リンク修復" : "ブランド"}
                        </Badge>
                        <span className="text-xs text-slate-500">{task.time}</span>
                      </div>
                      <p className="text-sm text-slate-200 font-medium mb-1">{task.title}</p>
                      <p className="text-xs text-slate-500 mb-3 flex items-center gap-1 font-mono">
                        {task.desc}
                      </p>
                      
                      {/* 👇 4. クイック・プレビュー (Quick Diff) */}
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex-1 bg-[#0055FF] hover:bg-[#0044CC] text-white text-xs py-1.5 rounded font-medium transition-colors flex items-center justify-center gap-1">
                              確認 <ArrowRight className="h-3 w-3" />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>修正案のプレビュー</DialogTitle>
                              <DialogDescription className="text-slate-400">以下の変更内容を確認してください。</DialogDescription>
                            </DialogHeader>
                            {/* 簡易Diffビュー */}
                            <div className="grid grid-cols-2 gap-4 mt-4 text-sm font-mono bg-slate-900 p-4 rounded-lg border border-slate-800">
                              <div className="text-red-400 border-r border-slate-800 pr-4">
                                <p className="text-xs text-slate-500 mb-2">[Current]</p>
                                {task.diffOld}
                              </div>
                              <div className="text-green-400">
                                <p className="text-xs text-slate-500 mb-2">[New]</p>
                                {task.diffNew}
                              </div>
                            </div>
                            <DialogFooter className="mt-6">
                              <Button variant="ghost" className="text-slate-400 hover:text-white" onClick={() => handleReject(task.id)}>却下</Button>
                              <DialogTrigger asChild>
                                <Button className="bg-[#0055FF] hover:bg-[#0044CC] text-white" onClick={() => handleApprove(task.id)}>
                                  <Check className="w-4 h-4 mr-2" /> 承認して反映
                                </Button>
                              </DialogTrigger>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                // 👇 3. オールクリア画面 (Empty State)
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-10 w-10 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">All Clear!</h3>
                  <p className="text-sm text-slate-400 max-w-[200px] leading-relaxed">
                    {emptyMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* 2. 緊急対応リスト (High Traffic Risk) */}
        <Card className="col-span-2 bg-slate-950 border-slate-800 border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <CardTitle className="text-white">緊急対応が必要なページ</CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              アクセス数が多いにも関わらず、長期間更新されていないページ（ユーザー失望リスク高）
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-400 h-8 text-xs">ページ / URL</TableHead>
                  <TableHead className="text-slate-400 h-8 text-xs">月間PV</TableHead>
                  <TableHead className="text-slate-400 h-8 text-xs">最終更新</TableHead>
                  <TableHead className="text-slate-400 h-8 text-xs">リスク</TableHead>
                  <TableHead className="h-8 text-xs"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    title: "料金プラン一覧",
                    url: "/pricing",
                    pv: "45,200",
                    updated: "6ヶ月前",
                    risk: "価格改定未反映の可能性",
                  },
                  {
                    title: "API v2 リファレンス",
                    url: "/docs/api-v2",
                    pv: "12,500",
                    updated: "1年前",
                    risk: "新機能の記述不足",
                  },
                  {
                    title: "会社概要",
                    url: "/about",
                    pv: "8,900",
                    updated: "2年前",
                    risk: "役員情報の不一致",
                  },
                ].map((item, i) => (
                  <TableRow key={i} className="border-slate-800 hover:bg-slate-900/50 group">
                    <TableCell>
                      <div className="font-medium text-slate-200 text-sm">{item.title}</div>
                      <div className="text-[10px] text-slate-500">{item.url}</div>
                    </TableCell>
                    <TableCell className="text-white font-mono text-sm">{item.pv}</TableCell>
                    <TableCell className="text-red-400 font-medium text-sm">{item.updated}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-red-400 border-red-400/30 bg-red-400/10 text-[10px] px-1">
                        {item.risk}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-xs text-[#0055FF] hover:underline font-medium whitespace-nowrap">
                        修正案
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
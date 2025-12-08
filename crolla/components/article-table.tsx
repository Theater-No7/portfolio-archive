"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, FileText, Lock, Check } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    id: "1",
    title: "Next.js 16の新機能完全ガイド",
    category: "技術",
    lastUpdated: "2024-12-01",
    // 👇 ここを変更：デモ用に「要更新」にします（詳細画面と合わせるため）
    status: "critical", 
    action: "リライト推奨", 
  },
  {
    id: "2",
    title: "React Server Componentsの実装方法",
    category: "技術",
    lastUpdated: "2024-10-15",
    status: "warning",
    action: "情報更新を推奨",
  },
  {
    id: "3",
    title: "TypeScript 5.0移行ガイド",
    category: "技術",
    lastUpdated: "2023-08-20",
    // 👇 ここを変更：逆にこちらは「良好」にしておきます
    status: "good",
    action: "最新情報です",
  },
  {
    id: "4",
    title: "Tailwind CSS v4の変更点まとめ",
    category: "デザイン",
    lastUpdated: "2024-11-28",
    status: "good",
    action: "最新情報です",
  },
  // ... (記事5以降はそのまま)
  {
    id: "5",
    title: "Vercelデプロイメント最適化",
    category: "インフラ",
    lastUpdated: "2024年9月10日",
    status: "warning",
    action: "情報更新を推奨",
  },
  {
    id: "6",
    title: "Node.js v18からv20への移行",
    category: "技術",
    lastUpdated: "2023年6月5日",
    status: "critical",
    action: "リライト推奨",
  },
  {
    id: "7",
    title: "WebパフォーマンスチューニングTips",
    category: "パフォーマンス",
    lastUpdated: "2024年11月15日",
    status: "good",
    action: "最新情報です",
  },
  {
    id: "8",
    title: "セキュリティベストプラクティス2024",
    category: "セキュリティ",
    lastUpdated: "2024年3月20日",
    status: "warning",
    action: "情報更新を推奨",
  },
]

export function ArticleTable() {
  return (
    <Card className="border-slate-800 bg-slate-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">記事一覧</CardTitle>
            <CardDescription className="text-slate-400">全8件の記事を管理</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              フィルタ
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              エクスポート
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-900/50">
              <TableHead className="text-slate-400 w-[400px]">記事タイトル</TableHead>
              <TableHead className="text-slate-400">カテゴリ</TableHead>
              <TableHead className="text-slate-400">最終更新日</TableHead>
              <TableHead className="text-slate-400">鮮度スコア</TableHead>
              <TableHead className="text-slate-400">AI推奨アクション</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => {
              // IDが1, 2, 3 の記事だけクリック可能にする
              const isClickable = ["1", "2", "3"].includes(article.id)

              return (
                <TableRow key={article.id} className="border-slate-800 hover:bg-slate-900/50 group">
                  <TableCell className="font-medium text-slate-200">
                    {/* クリック可能な場合のみLinkで囲む */}
                    {isClickable ? (
                      <Link href={`/dashboard/article/${article.id}`} className="flex items-center gap-2 hover:text-[#0055FF] transition-colors">
                        <FileText className="h-4 w-4 text-slate-500" />
                        {article.title}
                      </Link>
                    ) : (
                      <span className="flex items-center gap-2 text-slate-500 cursor-not-allowed" title="デモ版のため閲覧できません">
                        <Lock className="h-3 w-3" />
                        {article.title}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                      {article.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-400">{article.lastUpdated}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        article.status === "good"
                          ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20"
                          : article.status === "warning"
                          ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border-yellow-500/20"
                          : "bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20"
                      }
                    >
                      {article.status === "good" && <Check className="h-3 w-3 mr-1" />}
                      {article.status === "good" ? "良好" : article.status === "warning" ? "注意" : "要更新"}
                    </Badge>
                  </TableCell>
                  <TableCell className={article.status === "critical" ? "text-red-400 font-medium" : "text-slate-400"}>
                    {article.action}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
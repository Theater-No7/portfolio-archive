"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, FileText, Lock, Check, Search, Filter, FolderOpen } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    id: "1",
    path: "/docs/nextjs-guide", // パス情報を追加
    title: "Next.js 16の新機能完全ガイド",
    category: "技術",
    lastUpdated: "2024-12-01",
    status: "critical", 
    action: "リライト推奨", 
  },
  {
    id: "2",
    path: "/docs/rsc-implementation",
    title: "React Server Componentsの実装方法",
    category: "技術",
    lastUpdated: "2024-10-15",
    status: "warning",
    action: "情報更新を推奨",
  },
  {
    id: "3",
    path: "/docs/typescript-migration",
    title: "TypeScript 5.0移行ガイド",
    category: "技術",
    lastUpdated: "2023-08-20",
    status: "good",
    action: "最新情報です",
  },
  {
    id: "4",
    path: "/blog/design/tailwind-v4",
    title: "Tailwind CSS v4の変更点まとめ",
    category: "デザイン",
    lastUpdated: "2024-11-28",
    status: "good",
    action: "最新情報です",
  },
  {
    id: "5",
    path: "/docs/infrastructure/vercel",
    title: "Vercelデプロイメント最適化",
    category: "インフラ",
    lastUpdated: "2024年9月10日",
    status: "warning",
    action: "情報更新を推奨",
  },
  {
    id: "6",
    path: "/blog/tech/nodejs-v20",
    title: "Node.js v18からv20への移行",
    category: "技術",
    lastUpdated: "2023年6月5日",
    status: "critical",
    action: "リライト推奨",
  },
  {
    id: "7",
    path: "/blog/performance/tips",
    title: "WebパフォーマンスチューニングTips",
    category: "パフォーマンス",
    lastUpdated: "2024年11月15日",
    status: "good",
    action: "最新情報です",
  },
  {
    id: "8",
    path: "/help/security/best-practices",
    title: "セキュリティベストプラクティス2024",
    category: "セキュリティ",
    lastUpdated: "2024年3月20日",
    status: "warning",
    action: "情報更新を推奨",
  },
]

export function ArticleTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [pathFilter, setPathFilter] = useState("") // パスフィルター用State

  // フィルタリングロジック
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPath = article.path.toLowerCase().includes(pathFilter.toLowerCase())
    return matchesSearch && matchesPath
  })

  return (
    <Card className="border-slate-800 bg-slate-950">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-white">記事一覧</CardTitle>
            <CardDescription className="text-slate-400">
              全{articles.length}件の記事を管理中
            </CardDescription>
          </div>
          
          {/* フィルターエリア */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* パス指定フィルター */}
            <div className="relative flex-1 md:w-64">
              <FolderOpen className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                placeholder="パスで絞り込み (例: /docs)" 
                className="pl-9 bg-slate-900 border-slate-800 text-slate-300 focus:border-[#0055FF] h-9 text-xs"
                value={pathFilter}
                onChange={(e) => setPathFilter(e.target.value)}
              />
            </div>
            
            {/* キーワード検索 */}
            <div className="relative flex-1 md:w-48">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                placeholder="タイトル検索..." 
                className="pl-9 bg-slate-900 border-slate-800 text-slate-300 focus:border-[#0055FF] h-9 text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white h-9 px-3">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-900/50">
              <TableHead className="text-slate-400 w-[350px]">記事タイトル / パス</TableHead>
              <TableHead className="text-slate-400">カテゴリ</TableHead>
              <TableHead className="text-slate-400">最終更新日</TableHead>
              <TableHead className="text-slate-400">鮮度スコア</TableHead>
              <TableHead className="text-slate-400">AI推奨アクション</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => {
                // IDが1, 2, 3 の記事だけクリック可能にする
                const isClickable = ["1", "2", "3"].includes(article.id)

                return (
                  <TableRow key={article.id} className="border-slate-800 hover:bg-slate-900/50 group">
                    <TableCell className="font-medium text-slate-200">
                      {/* クリック可能な場合のみLinkで囲む */}
                      {isClickable ? (
                        <Link href={`/dashboard/article/${article.id}`} className="block group/link">
                          <div className="flex items-center gap-2 group-hover/link:text-[#0055FF] transition-colors">
                            <FileText className="h-4 w-4 text-slate-500 group-hover/link:text-[#0055FF]" />
                            {article.title}
                          </div>
                          {/* パスを小さく表示 */}
                          <div className="text-[10px] text-slate-500 ml-6 font-mono mt-0.5 group-hover/link:text-blue-400/70">
                            {article.path}
                          </div>
                        </Link>
                      ) : (
                        <div className="block cursor-not-allowed opacity-60">
                          <span className="flex items-center gap-2 text-slate-500" title="デモ版のため閲覧できません">
                            <Lock className="h-3 w-3" />
                            {article.title}
                          </span>
                          <div className="text-[10px] text-slate-600 ml-5 font-mono mt-0.5">
                            {article.path}
                          </div>
                        </div>
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
              })
            ) : (
              // 検索結果が0件の場合
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                  該当する記事が見つかりませんでした。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
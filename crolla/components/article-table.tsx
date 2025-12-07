"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { AlertCircle, Clock, CheckCircle, MoreVertical, ExternalLink } from "lucide-react"
import Link from "next/link"

type FreshnessLevel = "critical" | "warning" | "good"

interface Article {
  id: string
  title: string
  lastUpdated: string
  freshnessScore: FreshnessLevel
  aiRecommendation: string
  category: string
}

const articles: Article[] = [
  {
    id: "1",
    title: "Next.js 16の新機能完全ガイド",
    lastUpdated: "2024-12-01",
    freshnessScore: "good",
    aiRecommendation: "最新情報です",
    category: "技術",
  },
  {
    id: "2",
    title: "React Server Componentsの実装方法",
    lastUpdated: "2024-10-15",
    freshnessScore: "warning",
    aiRecommendation: "情報更新を推奨",
    category: "技術",
  },
  {
    id: "3",
    title: "TypeScript 5.0移行ガイド",
    lastUpdated: "2023-08-20",
    freshnessScore: "critical",
    aiRecommendation: "リライト推奨",
    category: "技術",
  },
  {
    id: "4",
    title: "Tailwind CSS v4の変更点まとめ",
    lastUpdated: "2024-11-28",
    freshnessScore: "good",
    aiRecommendation: "最新情報です",
    category: "デザイン",
  },
  {
    id: "5",
    title: "Vercelデプロイメント最適化",
    lastUpdated: "2024-09-10",
    freshnessScore: "warning",
    aiRecommendation: "情報更新を推奨",
    category: "インフラ",
  },
  {
    id: "6",
    title: "Node.js v18からv20への移行",
    lastUpdated: "2023-06-05",
    freshnessScore: "critical",
    aiRecommendation: "リライト推奨",
    category: "技術",
  },
  {
    id: "7",
    title: "WebパフォーマンスチューニングTips",
    lastUpdated: "2024-11-15",
    freshnessScore: "good",
    aiRecommendation: "最新情報です",
    category: "パフォーマンス",
  },
  {
    id: "8",
    title: "セキュリティベストプラクティス2024",
    lastUpdated: "2024-03-20",
    freshnessScore: "warning",
    aiRecommendation: "情報更新を推奨",
    category: "セキュリティ",
  },
]

function getFreshnessIcon(level: FreshnessLevel) {
  switch (level) {
    case "critical":
      return <AlertCircle className="w-4 h-4" />
    case "warning":
      return <Clock className="w-4 h-4" />
    case "good":
      return <CheckCircle className="w-4 h-4" />
  }
}

function getFreshnessVariant(level: FreshnessLevel) {
  switch (level) {
    case "critical":
      return "destructive"
    case "warning":
      return "secondary"
    case "good":
      return "default"
  }
}

function getFreshnessLabel(level: FreshnessLevel) {
  switch (level) {
    case "critical":
      return "要更新"
    case "warning":
      return "注意"
    case "good":
      return "良好"
  }
}

export function ArticleTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">記事一覧</h2>
          <p className="text-sm text-muted-foreground mt-1">全{articles.length}件の記事を管理</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            フィルター
          </Button>
          <Button variant="outline" size="sm">
            エクスポート
          </Button>
        </div>
      </div>

      <Card className="border border-border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="text-foreground font-semibold">記事タイトル</TableHead>
              <TableHead className="text-foreground font-semibold">カテゴリ</TableHead>
              <TableHead className="text-foreground font-semibold">最終更新日</TableHead>
              <TableHead className="text-foreground font-semibold">鮮度スコア</TableHead>
              <TableHead className="text-foreground font-semibold">AI推奨アクション</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id} className="border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">
                  <Link href={`/dashboard/article/${article.id}`} className="flex items-center gap-2 group">
                    <span className="text-foreground">{article.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                    {article.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(article.lastUpdated).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant={getFreshnessVariant(article.freshnessScore)} className="gap-1.5 font-medium">
                    {getFreshnessIcon(article.freshnessScore)}
                    {getFreshnessLabel(article.freshnessScore)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        article.freshnessScore === "critical"
                          ? "text-destructive font-medium"
                          : article.freshnessScore === "warning"
                            ? "text-foreground"
                            : "text-muted-foreground"
                      }
                    >
                      {article.aiRecommendation}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

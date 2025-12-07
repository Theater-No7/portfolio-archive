"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Sparkles } from "lucide-react"
import Link from "next/link"

interface ArticleComparisonProps {
  articleId: string
}

// Sample data - in real app this would come from an API
const articleData = {
  "1": {
    title: "Next.js 16の新機能完全ガイド",
    category: "技術",
    lastUpdated: "2024-12-01",
    original: `# Next.js 16の新機能完全ガイド

Next.js 16がリリースされました。この記事では、主要な新機能を解説します。

## 価格プラン

**Proプラン**: 月額 ¥9,800
- 高速ビルド
- 無制限デプロイ
- 優先サポート

**Enterpriseプラン**: 月額 ¥49,800
- カスタムドメイン無制限
- 専用サポート
- SLA保証

## 新機能

1. Turbopackの安定版リリース
2. React 19サポート
3. Server Actionsの改善

詳細な料金については、公式サイトをご確認ください。`,
    aiSuggestion: `# Next.js 16の新機能完全ガイド

Next.js 16がリリースされました。この記事では、主要な新機能を解説します。

## 価格プラン

**Proプラン**: 月額 ¥12,800
- 高速ビルド
- 無制限デプロイ
- 優先サポート
- AIチャット機能（新規）

**Enterpriseプラン**: 月額 ¥59,800
- カスタムドメイン無制限
- 専用サポート
- SLA保証
- 24時間365日サポート

## 新機能

1. Turbopackの安定版リリース
2. React 19サポート
3. Server Actionsの改善

詳細な料金については、公式サイトをご確認ください。`,
  },
  "2": {
    title: "React Server Componentsの実装方法",
    category: "技術",
    lastUpdated: "2024-10-15",
    original: "# React Server Componentsの実装方法\n\nReact Server Componentsは...",
    aiSuggestion: "# React Server Componentsの実装方法\n\nReact Server Componentsは...",
  },
  "3": {
    title: "TypeScript 5.0移行ガイド",
    category: "技術",
    lastUpdated: "2023-08-20",
    original: "# TypeScript 5.0移行ガイド\n\nTypeScript 5.0への移行方法を解説します...",
    aiSuggestion: "# TypeScript 5.0移行ガイド\n\nTypeScript 5.0への移行方法を解説します...",
  },
}

function highlightDifferences(original: string, suggested: string) {
  const originalLines = original.split("\n")
  const suggestedLines = suggested.split("\n")

  return {
    originalHighlighted: originalLines.map((line, idx) => {
      const isChanged = suggestedLines[idx] !== line
      return { line, isChanged, isRemoved: isChanged }
    }),
    suggestedHighlighted: suggestedLines.map((line, idx) => {
      const isChanged = originalLines[idx] !== line
      return { line, isChanged, isAdded: isChanged }
    }),
  }
}

export function ArticleComparison({ articleId }: ArticleComparisonProps) {
  const article = articleData[articleId as keyof typeof articleData] || articleData["1"]
  const { originalHighlighted, suggestedHighlighted } = highlightDifferences(article.original, article.aiSuggestion)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-foreground">{article.title}</h1>
                <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                  {article.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                最終更新:{" "}
                {new Date(article.lastUpdated).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">AIが3箇所の更新を検出しました</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison View */}
      <div className="flex-1 grid lg:grid-cols-2 gap-6 p-6 lg:p-8 overflow-hidden">
        {/* Original Content */}
        <Card className="border-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              現在の記事本文
              <Badge variant="outline" className="text-xs bg-background">
                オリジナル
              </Badge>
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="prose prose-invert prose-sm max-w-none">
              {originalHighlighted.map((item, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    item.isRemoved
                      ? "bg-red-500/10 text-red-200 border-l-2 border-red-500 pl-3 -ml-3 py-0.5"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.line || "\u00A0"}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* AI Suggested Content */}
        <Card className="border-primary/30 flex flex-col overflow-hidden shadow-lg shadow-primary/5">
          <div className="p-4 border-b border-primary/30 bg-primary/5">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AIによる修正案
              <Badge className="text-xs bg-primary text-primary-foreground">推奨</Badge>
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="prose prose-invert prose-sm max-w-none">
              {suggestedHighlighted.map((item, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    item.isAdded
                      ? "bg-green-500/10 text-green-200 border-l-2 border-green-500 pl-3 -ml-3 py-0.5"
                      : "text-foreground"
                  }`}
                >
                  {item.line || "\u00A0"}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm p-6 lg:p-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-red-500/20 border border-red-500 rounded"></span>
              削除される内容
            </span>
            <span className="inline-flex items-center gap-2 ml-6">
              <span className="inline-block w-3 h-3 bg-green-500/20 border border-green-500 rounded"></span>
              追加される内容
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg">
              キャンセル
            </Button>
            <Button size="lg" className="gap-2">
              <Check className="w-4 h-4" />
              修正を適用
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

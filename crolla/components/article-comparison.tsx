"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ArticleComparisonProps {
  articleId: string
}

// Sample data (省略せずそのまま記載します)
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
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  
  const article = articleData[articleId as keyof typeof articleData] || articleData["1"]
  const { originalHighlighted, suggestedHighlighted } = highlightDifferences(article.original, article.aiSuggestion)

  const handleApply = () => {
    setIsUpdating(true)
    
    // 処理中の演出 (1.5秒)
    setTimeout(() => {
      setIsUpdating(false)
      
      // 完了トースト
      toast.success("修正案を適用しました", {
        description: "GitHubにPull Requestを作成し、承認待ちステータスに更新しました。",
        icon: <Check className="w-4 h-4 text-emerald-500" />,
      })

      // 記事一覧に戻る
      router.push("/dashboard/articles")
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard/articles">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-white hover:bg-slate-800">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-white">{article.title}</h1>
                <Badge variant="outline" className="bg-slate-800 text-slate-400 border-slate-700">
                  {article.category}
                </Badge>
              </div>
              <p className="text-sm text-slate-400">
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
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">AIが3箇所の更新を検出しました</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison View */}
      <div className="flex-1 grid lg:grid-cols-2 gap-6 p-6 lg:p-8 overflow-hidden">
        {/* Original Content */}
        <Card className="border-slate-800 bg-slate-900/50 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-900">
            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
              現在の記事本文
              <Badge variant="outline" className="text-xs border-slate-700 text-slate-500">
                オリジナル
              </Badge>
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-sm leading-7 text-slate-300 font-mono">
              {originalHighlighted.map((item, idx) => (
                <div
                  key={idx}
                  className={`px-1 ${
                    item.isRemoved
                      ? "bg-red-500/10 text-red-400 border-l-4 border-red-500 pl-3 -ml-3 py-1 font-bold block"
                      : ""
                  }`}
                >
                  {item.line || <span className="inline-block min-h-[1.5em] w-full" />}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* AI Suggested Content */}
        <Card className="border-blue-500/30 bg-slate-900/50 flex flex-col overflow-hidden shadow-lg shadow-blue-900/10">
          <div className="p-4 border-b border-blue-500/30 bg-blue-500/5">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              AIによる修正案
              <Badge className="text-xs bg-blue-500 text-white hover:bg-blue-600 border-0">推奨</Badge>
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-sm leading-7 text-slate-300 font-mono">
              {suggestedHighlighted.map((item, idx) => (
                <div
                  key={idx}
                  className={`px-1 ${
                    item.isAdded
                      ? "bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500 pl-3 -ml-3 py-1 font-bold block"
                      : ""
                  }`}
                >
                  {item.line || <span className="inline-block min-h-[1.5em] w-full" />}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-slate-800 bg-slate-950 p-6 lg:p-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-sm text-slate-400">
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
            <Link href="/dashboard">
              {/* 👇 修正箇所：キャンセルボタンの色を明るく */}
              <Button variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                キャンセル
              </Button>
            </Link>
            {/* 👇 修正箇所：適用ロジックを追加 */}
            <Button 
              size="lg" 
              className="gap-2 bg-[#0055FF] hover:bg-[#0044CC] text-white min-w-[140px]"
              onClick={handleApply}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> 適用中...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" /> 修正を適用
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
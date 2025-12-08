"use client"

import { ArticleTable } from "@/components/article-table"

export default function ArticlesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">記事管理</h2>
        <p className="text-slate-400">全記事のステータス確認と編集</p>
      </div>
      
      {/* 記事一覧テーブル */}
      <ArticleTable />
    </div>
  )
}
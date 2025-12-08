"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, Building2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // 本来はここで新規登録処理を行いますが、今はダッシュボードへ進めます
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      {/* トップページへ戻るリンク */}
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0055FF] transition-colors">
          <ArrowLeft className="h-4 w-4" />
          トップページに戻る
        </Link>
      </div>

      <Card className="w-full max-w-md border-gray-200 shadow-xl shadow-blue-50">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-[#0055FF]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#0F172A]">アカウント作成</CardTitle>
          <CardDescription>
            まずは無料でCrollaの機能をお試しください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {/* 会社名入力（B2Bなので重要！） */}
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium leading-none">会社名 / 組織名</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input id="company" placeholder="株式会社〇〇" className="pl-9" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">メールアドレス</label>
              <Input id="email" placeholder="name@company.com" type="email" required />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none">パスワード</label>
              <Input id="password" type="password" required />
              <p className="text-xs text-gray-500">8文字以上の英数字を入力してください</p>
            </div>

            <Button type="submit" className="w-full bg-[#0055FF] hover:bg-[#0044CC] text-white">
              無料でアカウント作成
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">すでにアカウントをお持ちですか？ </span>
            <Link href="/login" className="text-[#0055FF] font-medium hover:underline">
              ログインはこちら
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
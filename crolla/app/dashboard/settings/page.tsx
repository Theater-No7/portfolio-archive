"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { 
  User, 
  CreditCard, 
  Terminal, 
  Moon, 
  Sun, 
  Monitor, 
  Copy, 
  RefreshCw,
  Bot, // 👈 追加（ボットアイコン）
  Play, // 👈 追加（再生アイコン）
  Clock,
  Globe
} from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCrawling, setIsCrawling] = useState(false) // クロール中の状態
  const [theme, setTheme] = useState("dark")

  // 保存処理のモック
  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("設定を保存しました", {
        description: "クローリング設定が更新されました。",
      })
    }, 1000)
  }

  // 手動クロール開始のモック
  const handleManualCrawl = () => {
    setIsCrawling(true)
    toast.info("手動クローリングを開始しました", {
      description: "完了まで数分かかる場合があります。",
      icon: <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
    })
    
    // 3秒後に完了
    setTimeout(() => {
      setIsCrawling(false)
      toast.success("クローリングが完了しました", {
        description: "3件の新しい修正案が見つかりました。",
      })
    }, 3000)
  }

  // APIキーのコピー
  const copyApiKey = () => {
    navigator.clipboard.writeText("sk_test_51MzXXXXXXXXXXXXXXXXXXXX")
    toast.success("APIキーをコピーしました")
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    toast.info(`テーマを「${newTheme}」に変更しました`, {
        description: "※デモ版のため実際の配色は変更されません"
    })
  }

  return (
    <div className="space-y-8 pb-20 max-w-5xl">
      
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">設定</h2>
          <p className="text-slate-400">アカウント、クローラー、システム設定の管理</p>
        </div>
      </div>

      <Tabs defaultValue="crawler" className="w-full">
        <TabsList className="bg-slate-900 border border-slate-800 text-slate-400">
          <TabsTrigger value="general" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" /> 全般
          </TabsTrigger>
          {/* 👇 新しいタブを追加 */}
          <TabsTrigger value="crawler" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
            <Bot className="w-4 h-4 mr-2" /> クローラー設定
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
            <CreditCard className="w-4 h-4 mr-2" /> 請求・プラン
          </TabsTrigger>
          <TabsTrigger value="developer" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
            <Terminal className="w-4 h-4 mr-2" /> API・開発
          </TabsTrigger>
        </TabsList>

        {/* === 1. クローラー設定 (New!) === */}
        <TabsContent value="crawler" className="space-y-6 mt-6">
          
          {/* 手動実行カード */}
          <Card className="bg-slate-950 border-slate-800 border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">即時実行 (Manual Run)</CardTitle>
                <CardDescription className="text-slate-400">
                  スケジュールに関わらず、今すぐサイト全体を解析します。
                </CardDescription>
              </div>
              <Button 
                onClick={handleManualCrawl} 
                disabled={isCrawling}
                className="bg-[#0055FF] hover:bg-[#0044CC] text-white min-w-[140px]"
              >
                {isCrawling ? (
                  <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 解析中...</>
                ) : (
                  <><Play className="mr-2 h-4 w-4" /> 今すぐ開始</>
                )}
              </Button>
            </CardHeader>
          </Card>

          {/* スケジュール設定 */}
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">実行スケジュール</CardTitle>
              <CardDescription className="text-slate-400">定期的な巡回の頻度を設定します。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-blue-500/10">
                    <Globe className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">リアルタイム同期 (Webhook)</p>
                    <p className="text-xs text-slate-500">GitHub/CMSの更新を検知して即座に実行</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid gap-2">
                <Label className="text-slate-200">定期フルスキャン</Label>
                <div className="flex gap-4">
                  <select className="flex h-10 w-full items-center justify-between rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 focus:border-[#0055FF] outline-none">
                    <option>毎日 (深夜 2:00 JST)</option>
                    <option>毎週 (月曜 9:00 JST)</option>
                    <option>毎月 (1日 0:00 JST)</option>
                    <option>無効</option>
                  </select>
                </div>
                <p className="text-xs text-slate-500">
                  ※ サーバー負荷の低い時間帯（深夜）を推奨します。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 詳細設定 (Scope & Politeness) */}
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">巡回範囲と制限</CardTitle>
              <CardDescription className="text-slate-400">クロール対象のディレクトリと、アクセス頻度の制限</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="include" className="text-slate-200">対象パス (Allow)</Label>
                <Input id="include" defaultValue="/docs/*, /help/*, /blog/*" className="bg-slate-900 border-slate-800 text-slate-300" />
                <p className="text-xs text-slate-500">カンマ区切りで指定。ワイルドカード (*) が使用可能です。</p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="exclude" className="text-slate-200">除外パス (Disallow)</Label>
                <Input id="exclude" defaultValue="/admin/*, /private/*, /api/*" className="bg-slate-900 border-slate-800 text-slate-300" />
              </div>

              <Separator className="bg-slate-800" />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-slate-200">リクエスト間隔 (Politeness)</Label>
                  <select className="flex h-10 w-full items-center justify-between rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 focus:border-[#0055FF] outline-none">
                    <option>1秒に1回 (推奨)</option>
                    <option>1秒に5回 (高速)</option>
                    <option>5秒に1回 (低負荷)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">User-Agent名</Label>
                  <Input defaultValue="Crolla-Bot/1.0 (+https://crolla.web.app/bot)" disabled className="bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 pt-6">
              <Button onClick={handleSave} disabled={isLoading} className="bg-[#0055FF] hover:bg-[#0044CC] text-white ml-auto">
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                設定を保存
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* === 2. 全般設定 (General) === */}
        <TabsContent value="general" className="space-y-6 mt-6">
          {/* ...以前のGeneralと同じ内容... */}
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">プロフィール</CardTitle>
              <CardDescription className="text-slate-400">
                あなたの公開プロフィール情報です。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border-2 border-slate-800">
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback className="bg-slate-800 text-slate-300 text-xl">TT</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                    画像をアップロード
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-200">表示名</Label>
                  <Input id="name" defaultValue="田中 太郎" className="bg-slate-900 border-slate-800 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">メールアドレス</Label>
                  <Input id="email" defaultValue="taro.tanaka@example.com" className="bg-slate-900 border-slate-800 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* テーマ設定 */}
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">表示設定</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 max-w-md">
                  <div 
                    className={`cursor-pointer rounded-lg border-2 p-2 hover:border-slate-500 transition-all ${theme === 'light' ? 'border-[#0055FF] bg-slate-900' : 'border-slate-800 bg-slate-950'}`}
                    onClick={() => handleThemeChange('light')}
                  >
                    <div className="mb-2 rounded-md bg-[#e2e8f0] p-2 h-16 w-full flex items-center justify-center">
                      <Sun className="h-6 w-6 text-slate-900" />
                    </div>
                    <div className="text-center text-xs font-medium text-slate-300">ライト</div>
                  </div>
                  <div 
                    className={`cursor-pointer rounded-lg border-2 p-2 hover:border-slate-500 transition-all ${theme === 'dark' ? 'border-[#0055FF] bg-slate-900' : 'border-slate-800 bg-slate-950'}`}
                    onClick={() => handleThemeChange('dark')}
                  >
                    <div className="mb-2 rounded-md bg-[#020817] p-2 h-16 w-full flex items-center justify-center">
                      <Moon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center text-xs font-medium text-slate-300">ダーク</div>
                  </div>
                  <div 
                    className={`cursor-pointer rounded-lg border-2 p-2 hover:border-slate-500 transition-all ${theme === 'system' ? 'border-[#0055FF] bg-slate-900' : 'border-slate-800 bg-slate-950'}`}
                    onClick={() => handleThemeChange('system')}
                  >
                    <div className="mb-2 rounded-md bg-[#1e293b] p-2 h-16 w-full flex items-center justify-center">
                      <Monitor className="h-6 w-6 text-slate-400" />
                    </div>
                    <div className="text-center text-xs font-medium text-slate-300">システム</div>
                  </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* === 3. 請求設定 (Billing) === */}
        <TabsContent value="billing" className="space-y-6 mt-6">
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white">現在のプラン</CardTitle>
                  <CardDescription className="text-slate-400">現在ご利用中のサブスクリプションプランです。</CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1">Pro Plan</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-3xl font-bold text-white">
                ¥9,800 <span className="text-sm font-normal text-slate-400">/ 月</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-300">
                  <span>月間解析ページ数</span>
                  <span>12,500 / 50,000</span>
                </div>
                <Progress value={25} className="h-2 bg-slate-800" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* === 4. 開発者設定 (Developer) === */}
        <TabsContent value="developer" className="space-y-6 mt-6">
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">APIキー</CardTitle>
              <CardDescription className="text-slate-400">外部ツールとの連携に使用します。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apikey" className="text-slate-200">Secret Key</Label>
                <div className="flex gap-2">
                  <Input 
                    id="apikey" 
                    value="sk_test_dummy_key_12345" 
                    readOnly 
                    className="bg-slate-900 border-slate-800 text-slate-400 font-mono"
                  />
                  <Button variant="outline" className="border-slate-700 text-slate-300" onClick={copyApiKey}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}
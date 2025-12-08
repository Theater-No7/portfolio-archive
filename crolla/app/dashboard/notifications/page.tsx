"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Zap, 
  Clock, 
  Check, 
  AlertTriangle,
  Globe
} from "lucide-react"
import { toast } from "sonner"

export default function NotificationsPage() {
  const [loading, setLoading] = useState(false)

  // 設定保存のモック関数
  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("通知設定を保存しました", {
        description: "変更は即時反映されます。",
        icon: <Check className="w-4 h-4 text-emerald-500" />,
      })
    }, 1000)
  }

  // テスト通知の送信
  const handleTestNotification = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Slackにテスト通知を送信中...',
        success: '送信成功！Slackを確認してください 🔔',
        error: '送信に失敗しました',
      }
    )
  }

  return (
    <div className="space-y-8 max-w-4xl pb-20">
      
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">通知設定</h2>
        <p className="text-slate-400">いつ、どこで、どのアラートを受け取るか管理します</p>
      </div>

      {/* 1. メール通知設定 */}
      <Card className="bg-slate-950 border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-white">メール通知</CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            登録アドレス (admin@example.com) 宛の通知設定
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-slate-200">ウィークリーレポート</Label>
              <p className="text-xs text-slate-500">
                毎週月曜の朝に、サイトの健全性と修正サマリを送付
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator className="bg-slate-800" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-slate-200">記事の承認依頼</Label>
              <p className="text-xs text-slate-500">
                AIが修正案を作成したタイミングで通知
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator className="bg-slate-800" />

          <div className="space-y-3">
            <Label className="text-base text-slate-200">緊急アラートの頻度</Label>
            <RadioGroup defaultValue="realtime" className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="realtime" id="r1" className="border-slate-600 text-blue-500" />
                <Label htmlFor="r1" className="text-slate-300 font-normal">リアルタイム (推奨)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hourly" id="r2" className="border-slate-600 text-blue-500" />
                <Label htmlFor="r2" className="text-slate-300 font-normal">1時間ごとにまとめて通知</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="r3" className="border-slate-600 text-blue-500" />
                <Label htmlFor="r3" className="text-slate-300 font-normal">1日1回ダイジェスト</Label>
              </div>
            </RadioGroup>
          </div>

        </CardContent>
      </Card>

      {/* 2. Slack連携設定 */}
      <Card className="bg-slate-950 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-white">Slack連携</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800" onClick={handleTestNotification}>
              <Bell className="w-3 h-3 mr-2" /> テスト送信
            </Button>
          </div>
          <CardDescription className="text-slate-400">
            SlackのIncoming Webhook URLを設定して通知を受け取る
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="slack-url" className="text-slate-200">Webhook URL</Label>
            <Input 
              id="slack-url" 
              placeholder="https://hooks.slack.com/services/..." 
              className="bg-slate-900 border-slate-800 text-slate-300 focus:border-purple-500"
              defaultValue="https://hooks.slack.com/services/DUMMY/EXAMPLE/XXXXXXXXXXXXXXXXXXXXXXXX"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-slate-400 mb-2">通知するイベント</h4>
            
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-red-500/10">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">重大なエラー (Critical)</p>
                  <p className="text-xs text-slate-500">404エラー、サイトダウン、コンプライアンス違反など</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-yellow-500/10">
                  <Clock className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">情報の陳腐化 (Warning)</p>
                  <p className="text-xs text-slate-500">更新から半年経過、古い価格表記の検知など</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-blue-500/10">
                  <Globe className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">開発同期 (Info)</p>
                  <p className="text-xs text-slate-500">GitHubの変更検知、自動リライトの作成完了</p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-slate-900/30 border-t border-slate-800 py-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Check className="w-3 h-3 text-emerald-500" />
            最終送信成功: 2時間前 (#general)
          </div>
        </CardFooter>
      </Card>

      {/* 保存ボタンエリア（固定フッター風でもOKですが今回は通常配置） */}
      <div className="flex justify-end pt-4">
        <Button 
          size="lg" 
          onClick={handleSave} 
          disabled={loading}
          className="bg-[#0055FF] hover:bg-[#0044CC] text-white min-w-[150px]"
        >
          {loading ? "保存中..." : "設定を保存"}
        </Button>
      </div>

    </div>
  )
}
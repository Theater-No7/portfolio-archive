"use client"

import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Clock, CheckCircle2, ShieldCheck, TrendingUp, Info } from "lucide-react"
import CountUp from 'react-countup'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'

// グラフ用ダミーデータ
const data = [
  { name: '1月', cost: 40, errors: 24 },
  { name: '2月', cost: 30, errors: 18 },
  { name: '3月', cost: 20, errors: 12 },
  { name: '4月', cost: 27, errors: 9 },
  { name: '5月', cost: 18, errors: 5 },
  { name: '6月', cost: 12, errors: 2 },
];

export default function DashboardPage() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-8">
        
        {/* ヘッダーエリア */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">ダッシュボード</h2>
          <p className="text-slate-400">サイト全体の健全性とROIモニタリング</p>
        </div>

        {/* 1. ROIウィジェットエリア */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* 工数削減 */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-slate-900 border-blue-800/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-medium text-slate-300">今月の削減工数</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-slate-500 hover:text-blue-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 border-slate-700 text-slate-200 p-3">
                    <p className="font-bold mb-1">工数内訳 (想定)</p>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>監視・検知: 20時間</li>
                      <li>影響範囲調査: 20時間</li>
                      <li>執筆・修正作業: 88時間</li>
                    </ul>
                    <div className="mt-2 pt-2 border-t border-slate-700 text-xs text-blue-400">
                      時給3,000円換算で約38.4万円削減
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Clock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                <CountUp end={128} duration={2.5} separator="," />
                <span className="text-lg ml-1">時間</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                先月比 +12% の効率化
              </p>
            </CardContent>
          </Card>

          {/* 自動修正数 */}
          <Card className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border-emerald-800/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-medium text-slate-300">自動修正数</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-slate-500 hover:text-emerald-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 border-slate-700 text-slate-200 p-3">
                    <p className="font-bold mb-1">解決済みタスク内訳</p>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>リンク切れ自動修復: 30件</li>
                      <li>表記ゆれ統一: 10件</li>
                      <li>アジャイルリライト: 5件</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </div>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                <CountUp end={45} duration={2} />
                <span className="text-lg ml-1">件</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                リンク切れ・表記ゆれを解決
              </p>
            </CardContent>
          </Card>

          {/* ブランド整合性 */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-slate-900 border-purple-800/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-medium text-slate-300">ブランド整合性</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-slate-500 hover:text-purple-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 border-slate-700 text-slate-200 p-3">
                    <p className="font-bold mb-1">スコア算出ロジック</p>
                    <p className="text-xs mb-2">100点満点からの減点方式</p>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>重大エラー: -5点/件</li>
                      <li>軽微な警告: -1点/件</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </div>
              <ShieldCheck className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                <CountUp end={98} duration={3} />
                <span className="text-lg ml-1">%</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                リスク項目はありません
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 2. 推移グラフエリア (Recharts) */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 bg-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">コスト削減推移</CardTitle>
              <CardDescription>Crolla導入による月次の人的リソース削減効果</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0055FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0055FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}h`} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="cost" name="削減時間" stroke="#0055FF" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 bg-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">エラー検出数</CardTitle>
              <CardDescription>サイト内の問題箇所の減少推移</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="errors" name="検出エラー" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorError)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </TooltipProvider>
  )
}
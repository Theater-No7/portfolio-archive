import { Sidebar } from "@/components/sidebar"
import { ArticleTable } from "@/components/article-table"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import { Clock, CheckCircle2, ShieldCheck, TrendingUp, Info } from "lucide-react"

export default function DashboardPage() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-screen bg-background dark">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            
            {/* 👇 ROIウィジェットエリア */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              
              {/* 1. 工数削減アピール */}
              <Card className="bg-gradient-to-br from-blue-900/20 to-slate-900 border-blue-800/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium text-slate-300">
                      今月の削減工数
                    </CardTitle>
                    {/* ツールチップ実装部分 */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-slate-500 hover:text-blue-400 cursor-help transition-colors" />
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
                  <div className="text-2xl font-bold text-white">128時間</div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    先月比 +12% の効率化
                  </p>
                </CardContent>
              </Card>

              {/* 2. 自動修正数アピール */}
              <Card className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border-emerald-800/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium text-slate-300">
                      自動修正数
                    </CardTitle>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-slate-500 hover:text-emerald-400 cursor-help transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-900 border-slate-700 text-slate-200 p-3">
                        <p className="font-bold mb-1">解決済みタスク内訳</p>
                        <ul className="list-disc pl-4 text-xs space-y-1">
                          <li>リンク切れ自動修復: 30件</li>
                          <li>表記ゆれ統一: 10件</li>
                          <li>アジャイルリライト: 5件</li>
                        </ul>
                        <div className="mt-2 pt-2 border-t border-slate-700 text-xs text-emerald-400">
                          ユーザーの離脱要因を未然に防止
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">45件</div>
                  <p className="text-xs text-slate-400 mt-1">
                    リンク切れ・表記ゆれを解決
                  </p>
                </CardContent>
              </Card>

              {/* 3. ブランド整合性アピール */}
              <Card className="bg-gradient-to-br from-purple-900/20 to-slate-900 border-purple-800/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium text-slate-300">
                      ブランド整合性
                    </CardTitle>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-slate-500 hover:text-purple-400 cursor-help transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-900 border-slate-700 text-slate-200 p-3">
                        <p className="font-bold mb-1">スコア算出ロジック</p>
                        <p className="text-xs mb-2">100点満点からの減点方式</p>
                        <ul className="list-disc pl-4 text-xs space-y-1">
                          <li>重大エラー(リンク切れ等): -5点/件</li>
                          <li>軽微な警告(古い情報等): -1点/件</li>
                        </ul>
                        <div className="mt-2 pt-2 border-t border-slate-700 text-xs text-purple-400">
                          現在の減点対象: 警告2件のみ
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <ShieldCheck className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">98%</div>
                  <p className="text-xs text-slate-400 mt-1">
                    リスク項目はありません
                  </p>
                </CardContent>
              </Card>
            </div>

            <ArticleTable />
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
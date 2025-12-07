"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Shield, Eye, FolderSync as FileSync, Languages, LogIn } from "lucide-react"
import Link from "next/link"

type Language = "jp" | "en"

const translations = {
  jp: {
    nav: {
      features: "機能",
      pricing: "料金",
      security: "セキュリティ",
      login: "ログイン",
    },
    hero: {
      headline: (
        <>
          手動更新は、もう終わり。
          <br className="hidden md:block" />
          Webコンテンツ自動同期AI
          <br className="hidden md:block" />『 
          {/* 👇 ここからロゴ画像に変更 */}
          <span className="inline-block relative w-35 h-22 md:w-48 md:h-22 align-bottom ml-2 -mb-1 md:-mb-2 overflow-hidden">
            <img 
              src="/logo-full.png" 
              alt="Crolla" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          </span>{/* 👆 ここまで */}&nbsp;』
        </>
      ),
      // 👇 ビジネスメリットを強調したサブコピー
      subheadline:
        "プロダクトの進化に合わせて、AIがサイトを自動更新。ヘルプページやオウンドメディアの「情報の食い違い」をなくし、信頼されるサービスへ。",
      cta: "無料で試す",
      trustBadge: "GMO Pepabo運営",
    },
    socialProof: {
      title: "イノベーティブなチームに信頼されています",
    },
    problem: {
      title: "なぜ、手動更新では限界なのか？",
      before: {
        title: "従来の手動更新",
        desc: "開発スピードに追いつけず、情報は常に古いまま...",
        points: ["リリースのたびに修正箇所を探すのが手間", "リンク切れや古い表記が放置される", "属人化し、担当者がいないと更新不可"],
      },
      after: {
        title: "Crollaによる自動化",
        desc: "開発はアジャイル。コンテンツもアジャイル。",
        points: ["コードの変更を検知し、ドキュメントを即更新", "AIが代替リンクを探して自動修復", "トーン＆マナーを統一し、ブランドを守る"],
      },
    },
    features: {
      title: "主な機能",
      agile: {
        title: "アジャイル・リライト",
        desc: "新機能リリースに合わせて、関連する過去記事やLPの記述更新をAIが自動提案。",
      },
      brand: {
        title: "ブランド保護",
        desc: "新人ライターの文章も、AIが「御社らしい」表現に自動統一。表記ゆれもゼロに。",
      },
      competitor: {
        title: "競合モニタリング",
        desc: "ライバルサイトの価格変更や新機能をリアルタイムで検知し、通知します。",
      },
    },
    security: {
      title: "エンタープライズ水準のセキュリティ",
      desc: "お客様のデータとコンテンツを堅牢に保護します",
      features: ["SSO統合", "データ暗号化", "GDPR/APPI準拠", "監査ログ"],
    },
    pricing: {
      title: "料金プラン",
      desc: "コスト削減と品質向上を、この価格で。",
      free: {
        name: "フリー",
        price: "¥0",
        period: "/月",
        features: ["月間1,000ページまで", "基本的なリンク切れ検知", "コミュニティサポート"],
        cta: "無料で始める",
      },
      pro: {
        name: "プロ",
        price: "¥9,800",
        period: "/月",
        badge: "人気",
        features: ["月間50,000ページまで", "AI自動リライト機能", "ブランド保護", "優先サポート"],
        cta: "無料トライアル",
      },
      enterprise: {
        name: "エンタープライズ",
        price: "カスタム",
        period: "",
        features: ["専用インスタンス", "競合モニタリング", "SLA保証", "専任サポート"],
        cta: "お問い合わせ",
      },
    },
    footer: {
      copyright: "© 2025 GMO Pepabo, Inc. All rights reserved.",
      product: "製品",
      company: "会社情報",
      legal: "法的事項",
    },
  },
  en: {
    nav: {
      features: "Features",
      pricing: "Pricing",
      security: "Security",
      login: "Login",
    },
    hero: {
      headline: (
        <>
          Manual updates are over.
          <br className="hidden md:block" />
          Web Content Auto-Sync AI 'Crolla'
        </>
      ),
      subheadline:
        "AI automatically updates your site as your product evolves. Eliminate information discrepancies and build a trusted service.",
      cta: "Try for Free",
      trustBadge: "Operated by GMO Pepabo",
    },
    socialProof: {
      title: "Trusted by innovative teams",
    },
    problem: {
      title: "Why Manual Updates Fail",
      before: {
        title: "Manual Updates",
        desc: "Cant keep up with dev speed, content stays outdated...",
        points: ["Tedious to find updates for every release", "Broken links and old info persist", "Dependent on specific staff"],
      },
      after: {
        title: "Automated with Crolla",
        desc: "Development is Agile. Content is Agile.",
        points: ["Detects code changes, updates docs instantly", "Auto-repairs broken links with AI", "Unifies tone & manner for branding"],
      },
    },
    features: {
      title: "Key Features",
      agile: {
        title: "Agile Rewrite",
        desc: "Automatically proposes doc updates matching new feature releases.",
      },
      brand: {
        title: "Brand Guardian",
        desc: "Unifies writing style to match your brand voice automatically.",
      },
      competitor: {
        title: "Competitor Watch",
        desc: "Real-time monitoring of competitor prices and features.",
      },
    },
    security: {
      title: "Enterprise-grade Security",
      desc: "Protecting your data and content",
      features: ["SSO Integration", "Data Encryption", "GDPR/APPI Compliance", "Audit Logs"],
    },
    pricing: {
      title: "Pricing Plans",
      desc: "Reduce costs and improve quality.",
      free: {
        name: "Free",
        price: "$0",
        period: "/mo",
        features: ["Up to 1,000 pages", "Basic link checking", "Community support"],
        cta: "Get Started",
      },
      pro: {
        name: "Pro",
        price: "$65",
        period: "/mo",
        badge: "Popular",
        features: ["Up to 50,000 pages", "AI Auto-Rewrite", "Brand Protection", "Priority support"],
        cta: "Start Free Trial",
      },
      enterprise: {
        name: "Enterprise",
        price: "Custom",
        period: "",
        features: ["Dedicated instance", "Competitor Monitoring", "SLA guarantee", "Dedicated support"],
        cta: "Contact Sales",
      },
    },
    footer: {
      copyright: "© 2025 GMO Pepabo, Inc. All rights reserved.",
      product: "Product",
      company: "Company",
      legal: "Legal",
    },
  },
}

export default function CrollaLandingPage() {
  const [lang, setLang] = useState<Language>("jp")
  const t = translations[lang]

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="#" className="block h-10 w-40 relative overflow-hidden group">
            <img 
              src="/logo-full.png" 
              alt="Crolla" 
              className="absolute inset-0 h-full w-21 object-cover group-hover:opacity-80 transition-opacity"
            />
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-[#0F172A] hover:text-[#0055FF] transition-colors">
              {t.nav.features}
            </a>
            <a href="#pricing" className="text-sm font-medium text-[#0F172A] hover:text-[#0055FF] transition-colors">
              {t.nav.pricing}
            </a>
            <a href="#security" className="text-sm font-medium text-[#0F172A] hover:text-[#0055FF] transition-colors">
              {t.nav.security}
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === "jp" ? "en" : "jp")}
              className="gap-2 text-[#0F172A]"
            >
              <Languages className="h-4 w-4" />
              {lang === "jp" ? "EN" : "JP"}
            </Button>
            <Link href="/login">
            <Button variant="outline" size="sm" className="gap-2 border-[#0055FF] text-[#0055FF] hover:bg-[#0055FF]/10 bg-transparent">
                <LogIn className="h-4 w-4" />
                {t.nav.login}
            </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          {/* PCでは横並び(row)、スマホでは縦並び(col)にするコンテナ */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
            
            {/* 左側：テキストエリア */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight font-feature-settings-palt">
                {t.hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
                {t.hero.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8">
                <Link href="/login">
                  <Button size="lg" className="bg-[#0055FF] hover:bg-[#0044CC] text-white px-8 w-full sm:w-auto shadow-lg shadow-blue-500/20">
                    {t.hero.cta}
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 font-medium">
                <img src="/pepabo-logo.svg" alt="GMO Pepabo" className="h-5 w-auto opacity-70" /> 
                <span>{t.hero.trustBadge}</span>
              </div>
            </div>

            {/* 右側：アイソメトリックイラストエリア */}
            <div className="flex-1 w-full max-w-xl relative">
              {/* イラストの背景にうっすら光るエフェクトを追加 */}
              <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
              <img
                src="/LP_image.png"
                alt="Crolla Platform Illustration"
                // 👇 こだわり演出：角丸、影、ホバーでふわっと浮くアニメーション
                className="w-full h-auto object-contain rounded-2xl shadow-2xl shadow-blue-900/5 hover:-translate-y-2 transition-transform duration-500"
              />
            </div>

          </div>
        </div>

        {/* Decorative mesh (背景の装飾はそのまま維持) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl -z-10" />
      </section>

    {/* Social Proof */}
      <section className="py-12 bg-[#F8FAFC] border-b border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium text-gray-500 mb-8">{t.socialProof.title}</p>
          
          {/* ロゴの並びコンテナ */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 md:gap-x-20">
            {[1, 2, 3, 4, 5].map((i) => (
              // 👇 変更点1: 幅指定(w-32など)を削除し、高さを h-16 (64px) にアップ
              // flex-shrink-0 を追加して、画面が狭くなっても枠が潰れないようにする
              <div key={i} className="flex items-center justify-center h-16 flex-shrink-0">
                <img
                  src={`/company-${i}.svg`}
                  alt={`Partner Company ${i}`}
                  // 👇 変更点2: h-full w-auto で、高さに合わせて幅をなりゆきにする
                  // object-contain で枠内にきれいに収める
                  className="h-full w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer px-2"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-12">{t.problem.title}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-[#0F172A]">{t.problem.before.title}</CardTitle>
                <CardDescription className="text-gray-600">{t.problem.before.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg mb-4 h-60 flex items-center justify-center text-gray-400 overflow-hidden relative">
                    <img src="/before.jpg" alt="Before" className="w-full h-full object-cover" />
                </div>
                <ul className="space-y-2">
                  {t.problem.before.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* After */}
            <Card className="border-2 border-[#0055FF] shadow-lg shadow-blue-100">
              <CardHeader>
                <CardTitle className="text-xl text-[#0055FF]">{t.problem.after.title}</CardTitle>
                <CardDescription className="text-gray-600">{t.problem.after.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 rounded-lg mb-4 h-60 flex items-center justify-center overflow-hidden relative">
                    <img src="/after.jpg" alt="After" className="w-full h-full object-cover" />
                </div>
                <ul className="space-y-2">
                  {t.problem.after.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-[#0055FF] flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-12">{t.features.title}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Agile Sync */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileSync className="h-6 w-6 text-[#0055FF]" />
                </div>
                <CardTitle className="text-xl text-[#0F172A]">{t.features.agile.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{t.features.agile.desc}</p>
              </CardContent>
            </Card>

            {/* Brand Guardian */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-[#0055FF]" />
                </div>
                <CardTitle className="text-xl text-[#0F172A]">{t.features.brand.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{t.features.brand.desc}</p>
              </CardContent>
            </Card>

            {/* Competitor Watch */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-[#0055FF]" />
                </div>
                <CardTitle className="text-xl text-[#0F172A]">{t.features.competitor.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{t.features.competitor.desc}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-20 bg-[#EFF6FF]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#0055FF] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t.security.title}</h2>
            <p className="text-lg text-gray-600 mb-12">{t.security.desc}</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {t.security.features.map((feature, i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                  <CheckCircle2 className="h-6 w-6 text-[#0055FF] mx-auto mb-3" />
                  <p className="text-sm font-medium text-[#0F172A]">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t.pricing.title}</h2>
            <p className="text-lg text-gray-600">{t.pricing.desc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-[#0F172A]">{t.pricing.free.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#0F172A]">{t.pricing.free.price}</span>
                  <span className="text-gray-500">{t.pricing.free.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {t.pricing.free.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-[#0055FF] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-[#0055FF] text-[#0055FF] hover:bg-[#0055FF]/10 bg-transparent"
                >
                  {t.pricing.free.cta}
                </Button>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="border-2 border-[#0055FF] shadow-xl shadow-blue-100 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-[#0055FF] text-white text-xs font-semibold px-4 py-1 rounded-full">
                  {t.pricing.pro.badge}
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-[#0055FF]">{t.pricing.pro.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#0F172A]">{t.pricing.pro.price}</span>
                  <span className="text-gray-500">{t.pricing.pro.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {t.pricing.pro.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-[#0055FF] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-[#0055FF] hover:bg-[#0044CC] text-white">{t.pricing.pro.cta}</Button>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-[#0F172A]">{t.pricing.enterprise.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#0F172A]">{t.pricing.enterprise.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {t.pricing.enterprise.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-[#0055FF] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-[#0055FF] text-[#0055FF] hover:bg-[#0055FF]/10 bg-transparent"
                >
                  {t.pricing.enterprise.cta}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              {/* フッターロゴ開始 */}
              <div className="mb-6">
                <a href="#" className="block h-20 w-32 relative overflow-hidden group">
                  <img 
                    src="/logo-full.png" 
                    alt="Crolla" 
                    className="absolute inset-0 h-full w-full object-cover group-hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
              {/* フッターロゴ終了 */}
              <p className="text-sm text-gray-600 leading-relaxed">{t.hero.subheadline.split(".")[0]}.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0F172A] mb-4">{t.footer.product}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#features" className="hover:text-[#0055FF] transition-colors">
                    {t.nav.features}
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-[#0055FF] transition-colors">
                    {t.nav.pricing}
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-[#0055FF] transition-colors">
                    {t.nav.security}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#0F172A] mb-4">{t.footer.company}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-[#0055FF] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0055FF] transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0055FF] transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#0F172A] mb-4">{t.footer.legal}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-[#0055FF] transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0055FF] transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0055FF] transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">{t.footer.copyright}</div>
        </div>
      </footer>
    </div>
  )
}

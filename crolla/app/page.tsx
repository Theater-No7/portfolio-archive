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
      headline: "プロダクトの進化に、コンテンツを置き去りにしない。",
      subheadline:
        "アジャイル時代のWeb整合性管理AI。仕様変更に伴うリライトからリンク切れ修復まで、サイトを常に「最新」へ。",
      cta: "無料で試す",
      trustBadge: "GMO Pepabo運営",
    },
    socialProof: {
      title: "イノベーティブなチームに信頼されています",
    },
    problem: {
      title: "コンテンツ管理の課題",
      before: {
        title: "従来の方法",
        desc: "手動更新は遅く、エラーが発生しやすい...",
        points: ["手動でのドキュメント更新", "リンク切れの発見が困難", "ブランド統一性の欠如"],
      },
      after: {
        title: "Crollaを使用",
        desc: "AIが自動的に同期します。",
        points: ["自動ドキュメント同期", "リアルタイムリンク監視", "ブランド保護機能"],
      },
    },
    features: {
      title: "主な機能",
      agile: {
        title: "アジャイル・リライト",
        desc: "新機能リリースに合わせてドキュメントを自動更新。",
      },
      brand: {
        title: "ブランド保護",
        desc: "企業のトーン＆マナーを守り、表現を統一。",
      },
      competitor: {
        title: "競合監視",
        desc: "ライバルサイトの変更をリアルタイム検知。",
      },
    },
    security: {
      title: "エンタープライズ水準のセキュリティ",
      desc: "お客様のデータとコンテンツを保護します",
      features: ["SSO統合", "データ暗号化", "GDPR/APPI準拠", "監査ログ"],
    },
    pricing: {
      title: "料金プラン",
      desc: "あなたのビジネスに合ったプランを選択",
      free: {
        name: "無料",
        price: "¥0",
        period: "/月",
        features: ["最大5ページ", "基本的なリンクチェック", "コミュニティサポート"],
        cta: "始める",
      },
      pro: {
        name: "プロ",
        price: "¥49,800",
        period: "/月",
        badge: "人気",
        features: ["無制限ページ", "AI自動リライト", "ブランド保護", "優先サポート"],
        cta: "無料トライアル",
      },
      enterprise: {
        name: "エンタープライズ",
        price: "カスタム",
        period: "",
        features: ["専用インスタンス", "カスタムAIモデル", "SLA保証", "専任サポート"],
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
      headline: "Don't let your content lag behind product evolution.",
      subheadline:
        "AI-powered web integrity for the agile era. From fixing broken links to syncing content with updates.",
      cta: "Try for Free",
      trustBadge: "Operated by GMO Pepabo",
    },
    socialProof: {
      title: "Trusted by innovative teams",
    },
    problem: {
      title: "Content Management Challenges",
      before: {
        title: "Traditional Way",
        desc: "Updates are manual & slow...",
        points: ["Manual documentation updates", "Hard to find broken links", "Lack of brand consistency"],
      },
      after: {
        title: "With Crolla",
        desc: "AI syncs automatically.",
        points: ["Automatic doc sync", "Real-time link monitoring", "Brand protection"],
      },
    },
    features: {
      title: "Key Features",
      agile: {
        title: "Agile Rewrite",
        desc: "Automatically update docs to match new feature releases.",
      },
      brand: {
        title: "Brand Guardian",
        desc: "Maintain tone & manner consistency across all content.",
      },
      competitor: {
        title: "Competitor Watch",
        desc: "Real-time monitoring of competitor site changes.",
      },
    },
    security: {
      title: "Enterprise-grade Security",
      desc: "Protecting your data and content",
      features: ["SSO Integration", "Data Encryption", "GDPR/APPI Compliance", "Audit Logs"],
    },
    pricing: {
      title: "Pricing Plans",
      desc: "Choose the plan that fits your business",
      free: {
        name: "Free",
        price: "$0",
        period: "/mo",
        features: ["Up to 5 pages", "Basic link checking", "Community support"],
        cta: "Get Started",
      },
      pro: {
        name: "Pro",
        price: "$399",
        period: "/mo",
        badge: "Popular",
        features: ["Unlimited pages", "AI auto-rewrite", "Brand protection", "Priority support"],
        cta: "Start Free Trial",
      },
      enterprise: {
        name: "Enterprise",
        price: "Custom",
        period: "",
        features: ["Dedicated instance", "Custom AI models", "SLA guarantee", "Dedicated support"],
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
          <div className="font-bold text-2xl text-[#0055FF]">Crolla</div>

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
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] mb-6 text-balance leading-tight">
              {t.hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
              {t.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/login">
                <Button size="lg" className="bg-[#0055FF] hover:bg-[#0044CC] text-white px-8">
                    {t.hero.cta}
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <img src="/pepabo-logo.svg" alt="GMO Pepabo" className="h-4 w-auto" />
              <span>{t.hero.trustBadge}</span>
            </div>
          </div>
        </div>

        {/* Decorative mesh */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl -z-10" />
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500 mb-8">{t.socialProof.title}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="text-2xl font-bold text-gray-400">
                LOGO {i}
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
              <div className="font-bold text-2xl text-[#0055FF] mb-4">Crolla</div>
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

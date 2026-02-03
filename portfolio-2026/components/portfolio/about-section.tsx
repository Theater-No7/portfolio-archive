"use client";

import { motion } from "framer-motion";
import { Award, Globe, Code2, Palette, GraduationCap } from "lucide-react";

const skills = [
    { icon: Palette, label: "HCI Research", description: "人間中心設計の方法論" },
    { icon: Code2, label: "Web Engineering", description: "フルスタック開発" },
    { icon: Globe, label: "Industrial Design", description: "プロダクトデザイン経験" },
];

const timeline = [
    {
        year: "2025",
        title: "IASDR 2025 ポスター発表",
        type: "Research",
        description: "新型スツールの人間工学的評価の研究",
    },
    {
        year: "2025",
        title: "ITパスポート",
        type: "Certification",
        description: "情報処理技術者試験 合格",
    },
    {
        year: "2024",
        title: "弓道二段",
        type: "Certification",
        description: "全日本弓道連盟 認許",
    },
    {
        year: "2022",
        title: "TOEIC 755",
        type: "Certification",
        description: "ビジネス英語スキル",
    },
];

export function AboutSection() {
    return (
        <section id="about" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-[#148E96]" />
                        <span className="text-[#5eead4] text-sm font-medium uppercase tracking-wider">
                            Background
                        </span>
                        <div className="h-px flex-1 max-w-12 bg-gradient-to-l from-transparent to-[#148E96]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        About{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#148E96] to-[#5eead4]">
                            Me
                        </span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left - Bio & Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Avatar & Name */}
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#148E96] to-[#5eead4] flex items-center justify-center text-3xl font-bold text-[#0a0a0a]">
                                    LS
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#5eead4] border-2 border-[#0a0a0a] flex items-center justify-center">
                                    <span className="text-xs">✓</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">Leo Sato</h3>
                                <p className="text-[#5eead4]">Design Engineer / HCI Researcher</p>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                HCI研究、工業デザイン、そしてWebエンジニアリングのバックグラウンドを持ち、機能性と美しさが融合したデジタル体験を創造します。
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                人間の行動への深い理解と最先端の技術を活かし、見た目だけでなく、直感的で使いやすいインターフェースを設計・実装しています。
                            </p>
                        </div>

                        {/* Skills Grid */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium text-foreground uppercase tracking-wider">
                                Core Expertise
                            </h4>
                            <div className="grid gap-4">
                                {skills.map((skill, index) => {
                                    const Icon = skill.icon;
                                    return (
                                        <motion.div
                                            key={skill.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group flex items-center gap-4 p-4 rounded-xl bg-[rgba(20,142,150,0.05)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(20,142,150,0.3)] transition-all duration-300"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-[rgba(20,142,150,0.2)] flex items-center justify-center group-hover:bg-[#148E96] transition-colors">
                                                <Icon className="w-6 h-6 text-[#5eead4] group-hover:text-foreground transition-colors" />
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-foreground">
                                                    {skill.label}
                                                </h5>
                                                <p className="text-sm text-muted-foreground">
                                                    {skill.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h4 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#5eead4]" />
                            Awards & Certifications
                        </h4>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#148E96] via-[rgba(20,142,150,0.3)] to-transparent" />

                            {/* Timeline Items */}
                            <div className="space-y-6">
                                {timeline.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 }}
                                        className="relative pl-16"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-[#148E96]">
                                            <div className="absolute inset-1 rounded-full bg-[#5eead4]" />
                                        </div>

                                        {/* Content Card */}
                                        <div className="p-5 rounded-xl bg-[rgba(20,142,150,0.05)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(20,142,150,0.3)] transition-all duration-300">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="px-2 py-1 text-xs font-medium rounded-md bg-[rgba(20,142,150,0.2)] text-[#5eead4]">
                                                    {item.type}
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {item.year}
                                                </span>
                                            </div>
                                            <h5 className="font-semibold text-foreground mb-1">
                                                {item.title}
                                            </h5>
                                            <p className="text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Education Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[rgba(20,142,150,0.15)] to-[rgba(94,234,212,0.05)] border border-[rgba(20,142,150,0.3)]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-[#148E96] flex items-center justify-center">
                                    <GraduationCap className="w-7 h-7 text-foreground" />
                                </div>
                                <div>
                                    <h5 className="font-semibold text-foreground">
                                        Continuous Learning
                                    </h5>
                                    <p className="text-sm text-muted-foreground">
                                        デザインとテクノロジーの交差点を常に探求しています
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

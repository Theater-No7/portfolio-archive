"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink, Sparkles, BookOpen } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Crolla",
        description:
            "Webコンテンツを自動同期・管理するAIツール。複数のプラットフォーム間での情報更新をスマートに自動化します。",
        image: "/projects/crolla.jpg",
        tags: ["Next.js", "Firebase", "OpenAI", "HCI"],
        link: "#",
        icon: Sparkles,
        gradient: "from-[#148E96] to-[#0d4f52]",
    },
    {
        id: 2,
        title: "Kalua",
        description:
            "飲食店のマニュアル管理・教育コストを削減するSaaS。現場のオペレーションを考慮したUI設計で、トレーニング効率を向上させます。",
        image: "/projects/kalua.jpg",
        tags: ["React", "Tailwind", "Supabase", "UX Research"],
        link: "#",
        icon: BookOpen,
        gradient: "from-[#5eead4] to-[#148E96]",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export function WorksSection() {
    return (
        <section id="works" className="min-h-screen py-20 px-4">
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
                            Portfolio
                        </span>
                        <div className="h-px flex-1 max-w-12 bg-gradient-to-l from-transparent to-[#148E96]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Featured{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#148E96] to-[#5eead4]">
                            Works
                        </span>
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl">
                        デザイン思考と技術実装を融合させた、代表的なプロジェクト。
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {projects.map((project) => {
                        const Icon = project.icon;
                        return (
                            <motion.article
                                key={project.id}
                                variants={itemVariants}
                                className="group relative"
                            >
                                <div className="relative rounded-2xl bg-[rgba(20,142,150,0.05)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] overflow-hidden transition-all duration-500 hover:border-[rgba(20,142,150,0.4)] hover:shadow-2xl hover:shadow-[rgba(20,142,150,0.15)]">
                                    {/* Project Image/Placeholder */}
                                    <div
                                        className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}
                                    >
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNC0yIDQtMiA0LTItMi0yLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                className="w-20 h-20 rounded-2xl bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.2)] flex items-center justify-center"
                                            >
                                                <Icon className="w-10 h-10 text-foreground" />
                                            </motion.div>
                                        </div>
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-xl font-semibold text-foreground group-hover:text-[#5eead4] transition-colors">
                                                {project.title}
                                            </h3>
                                            <motion.a
                                                href={project.link}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-muted-foreground hover:text-[#5eead4] hover:bg-[rgba(20,142,150,0.2)] transition-all"
                                                aria-label={`View ${project.title} project`}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </motion.a>
                                        </div>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-xs font-medium rounded-full bg-[rgba(20,142,150,0.15)] text-[#5eead4] border border-[rgba(20,142,150,0.3)]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* View Project Button */}
                                        <motion.button
                                            whileHover={{ x: 5 }}
                                            className="flex items-center gap-2 text-sm font-medium text-[#148E96] hover:text-[#5eead4] transition-colors mt-4"
                                        >
                                            View Project
                                            <ExternalLink className="w-4 h-4" />
                                        </motion.button>
                                    </div>

                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(20,142,150,0.1)] to-transparent" />
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>

                {/* More Projects Teaser */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <p className="text-muted-foreground text-sm">
                        その他のプロジェクトは準備中...
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Mail, Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

const socialLinks = [
    {
        icon: Github,
        label: "GitHub",
        href: "https://github.com",
        username: "@leosato",
    },
    {
        icon: Twitter,
        label: "Twitter",
        href: "https://twitter.com",
        username: "@leosato",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        href: "https://linkedin.com",
        username: "Leo Sato",
    },
];

export function ContactSection() {
    return (
        <section id="contact" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#148E96]" />
                        <span className="text-[#5eead4] text-sm font-medium uppercase tracking-wider">
                            Get in Touch
                        </span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#148E96]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        {"Let's "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#148E96] to-[#5eead4]">
                            Connect
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        新しいプロジェクトやアイデアについて、お気軽にご連絡ください。
                    </p>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative rounded-3xl bg-[rgba(20,142,150,0.05)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] p-8 sm:p-12 overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#148E96]/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5eead4]/10 rounded-full blur-3xl" />

                        <div className="relative z-10 space-y-8">
                            {/* Email CTA */}
                            <div className="text-center">
                                <motion.a
                                    href="mailto:hello@leosato.dev"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-[#148E96] text-foreground font-medium transition-all duration-300 hover:bg-[#5eead4] hover:text-[#0a0a0a] hover:shadow-lg hover:shadow-[rgba(20,142,150,0.4)]"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span className="text-lg">hello@leosato.dev</span>
                                    <ArrowUpRight className="w-5 h-5" />
                                </motion.a>
                            </div>

                            {/* Divider */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
                                <span className="text-xs text-muted-foreground tracking-wider">
                                    SNS
                                </span>
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
                            </div>

                            {/* Social Links */}
                            <div className="grid sm:grid-cols-3 gap-4">
                                {socialLinks.map((link, index) => {
                                    const Icon = link.icon;
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * index }}
                                            whileHover={{ y: -4 }}
                                            className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(20,142,150,0.4)] hover:bg-[rgba(20,142,150,0.1)] transition-all duration-300"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-[rgba(20,142,150,0.2)] flex items-center justify-center group-hover:bg-[#148E96] transition-colors">
                                                <Icon className="w-6 h-6 text-[#5eead4] group-hover:text-foreground transition-colors" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-medium text-foreground group-hover:text-[#5eead4] transition-colors">
                                                    {link.label}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {link.username}
                                                </p>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-muted-foreground">
                        Designed & Built by{" "}
                        <span className="text-[#5eead4]">Leo Sato</span> © {new Date().getFullYear()}
                    </p>
                </motion.footer>
            </div>
        </section>
    );
}

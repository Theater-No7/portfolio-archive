"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Mail, Menu, X, Info } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
    activeSection: string;
    onNavigate: (section: string) => void;
}

const navItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "works", label: "Works", icon: Briefcase },
    { id: "about", label: "About", icon: Info },
    { id: "contact", label: "Contact", icon: Mail },
];

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <motion.button
                className="fixed top-4 left-4 z-50 p-3 rounded-xl bg-[#0d0d0d]/80 backdrop-blur-xl border border-[rgba(255,255,255,0.1)] lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                {isOpen ? (
                    <X className="w-5 h-5 text-foreground" />
                ) : (
                    <Menu className="w-5 h-5 text-foreground" />
                )}
            </motion.button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`fixed left-0 top-0 h-full w-64 bg-[#0d0d0d]/90 backdrop-blur-2xl border-r border-[rgba(255,255,255,0.08)] z-40 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300`}
            >
                {/* Logo Area */}
                <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#148E96] to-[#5eead4] flex items-center justify-center">
                            <span className="text-lg font-bold text-[#0a0a0a]">LS</span>
                        </div>
                        <div>
                            <h1 className="font-semibold text-foreground">Leo Sato</h1>
                            <p className="text-xs text-muted-foreground">Design Engineer</p>
                        </div>
                    </motion.div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;

                            return (
                                <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * (index + 1) }}
                                >
                                    <button
                                        onClick={() => {
                                            onNavigate(item.id);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                      ${isActive
                                                ? "bg-[#148E96]/20 text-[#5eead4]"
                                                : "text-muted-foreground hover:bg-[rgba(255,255,255,0.05)] hover:text-foreground"
                                            }`}
                                    >
                                        <Icon
                                            className={`w-5 h-5 transition-colors ${isActive ? "text-[#148E96]" : "group-hover:text-[#148E96]"}`}
                                        />
                                        <span className="font-medium">{item.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="ml-auto w-1.5 h-1.5 rounded-full bg-[#5eead4]"
                                            />
                                        )}
                                    </button>
                                </motion.li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Profile Summary */}
                <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="p-4 rounded-xl bg-[rgba(20,142,150,0.1)] border border-[rgba(20,142,150,0.2)]"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#148E96] to-[#5eead4] flex items-center justify-center text-[#0a0a0a] font-semibold text-sm">
                                LS
                            </div>
                            <div>
                                <p className="font-medium text-foreground text-sm">Leo Sato</p>
                                <p className="text-xs text-[#5eead4]">Available for work</p>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            HCIとエンジニアリングの架け橋。
                        </p>
                    </motion.div>
                </div>
            </motion.aside>
        </>
    );
}

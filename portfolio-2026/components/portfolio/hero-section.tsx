"use client";

import { motion } from "framer-motion";
import { Github, FileText, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useState } from "react";

const codeSnippet = `// Design meets Engineering
export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  
  return (
    <motion.div 
      className="glass-card"
      whileHover={{ scale: 1.02 }}
    >
      <Album cover={track.art} />
      <Controls 
        onPlay={() => setPlaying(!playing)}
        isPlaying={playing}
      />
    </motion.div>
  );
}`;

export function HeroSection() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section
            id="profile"
            className="min-h-screen flex items-center justify-center px-4 py-20 lg:py-0"
        >
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Side - Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(20,142,150,0.15)] border border-[rgba(20,142,150,0.3)]"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#5eead4] animate-pulse" />
                            <span className="text-sm text-[#5eead4] font-medium">
                                Open for Work
                            </span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                            <span className="text-balance">Designing Logic,</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#148E96] to-[#5eead4]">
                                Coding Experience.
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-md">
                            <span className="text-foreground font-medium">Leo Sato</span> —
                            Design Engineer / HCI Researcher.
                        </p>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted-foreground leading-relaxed max-w-lg"
                    >
                        HCI（人間中心設計）の視点と、モダンなエンジニアリング技術を架橋するデザインエンジニア。論理的な使いやすさと、心躍る体験を実装します。
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-[#148E96] text-[#ffffff] font-medium transition-all duration-300 hover:bg-[#5eead4] hover:text-[#0a0a0a] hover:shadow-lg hover:shadow-[rgba(20,142,150,0.4)]"
                        >
                            <Github className="w-5 h-5" />
                            GitHub
                        </a>
                        <a
                            href="https://note.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.2)] text-foreground font-medium transition-all duration-300 hover:border-[#148E96] hover:text-[#5eead4] hover:bg-[rgba(20,142,150,0.1)]"
                        >
                            <FileText className="w-5 h-5" />
                            Note
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Side - Peeling Card Effect */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative perspective-1000">
                        {/* Code Layer (Behind) */}
                        <div className="absolute inset-0 rounded-2xl bg-[#0d1117] border border-[rgba(255,255,255,0.1)] p-4 overflow-hidden">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                                <span className="ml-2 text-xs text-muted-foreground">
                                    MusicPlayer.tsx
                                </span>
                            </div>
                            <pre className="text-xs font-mono leading-relaxed overflow-hidden">
                                <code className="text-muted-foreground">
                                    {codeSnippet.split("\n").map((line, i) => (
                                        <div key={i} className="flex">
                                            <span className="w-6 text-[rgba(255,255,255,0.3)] select-none">
                                                {i + 1}
                                            </span>
                                            <span>
                                                {line.includes("export") || line.includes("function") ? (
                                                    <span className="text-[#ff7b72]">{line}</span>
                                                ) : line.includes("const") ? (
                                                    <span className="text-[#79c0ff]">{line}</span>
                                                ) : line.includes("return") ? (
                                                    <span className="text-[#ff7b72]">{line}</span>
                                                ) : line.includes("//") ? (
                                                    <span className="text-[#8b949e]">{line}</span>
                                                ) : line.includes("<") ? (
                                                    <span className="text-[#7ee787]">{line}</span>
                                                ) : (
                                                    <span className="text-[#c9d1d9]">{line}</span>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </code>
                            </pre>
                        </div>

                        {/* UI Card Layer (Front with Peel) */}
                        <motion.div
                            className="relative rounded-2xl bg-gradient-to-br from-[rgba(20,142,150,0.2)] to-[rgba(94,234,212,0.1)] backdrop-blur-xl border border-[rgba(255,255,255,0.15)] p-6 shadow-2xl"
                            style={{
                                transformStyle: "preserve-3d",
                                transformOrigin: "top left",
                            }}
                            animate={{
                                rotateX: isHovered ? -5 : 0,
                                rotateY: isHovered ? 8 : 0,
                                z: isHovered ? 30 : 0,
                            }}
                            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        >
                            {/* Glass overlay effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-transparent pointer-events-none" />

                            {/* Music Player UI */}
                            <div className="relative space-y-6">
                                {/* Album Art */}
                                <div className="relative aspect-square rounded-xl bg-gradient-to-br from-[#148E96] to-[#0d4f52] overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            className="w-24 h-24 rounded-full border-4 border-[rgba(255,255,255,0.2)]"
                                            animate={{ rotate: isHovered ? 360 : 0 }}
                                            transition={{
                                                duration: 3,
                                                repeat: isHovered ? Infinity : 0,
                                                ease: "linear",
                                            }}
                                        >
                                            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#5eead4] to-[#148E96] flex items-center justify-center">
                                                <div className="w-6 h-6 rounded-full bg-[#0a0a0a]" />
                                            </div>
                                        </motion.div>
                                    </div>
                                    {/* Vinyl grooves effect */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.3)_70%)]" />
                                </div>

                                {/* Track Info */}
                                <div className="text-center space-y-1">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        Design Systems
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Leo Sato</p>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[#148E96] to-[#5eead4] rounded-full"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "65%" }}
                                            transition={{ duration: 2, delay: 1 }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>2:34</span>
                                        <span>3:56</span>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-center gap-6">
                                    <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Previous track">
                                        <SkipBack className="w-5 h-5" />
                                    </button>
                                    <button className="p-4 rounded-full bg-[#148E96] text-foreground hover:bg-[#5eead4] hover:text-[#0a0a0a] transition-all duration-300 shadow-lg shadow-[rgba(20,142,150,0.4)]" aria-label="Play or pause">
                                        {isHovered ? (
                                            <Pause className="w-6 h-6" />
                                        ) : (
                                            <Play className="w-6 h-6 ml-0.5" />
                                        )}
                                    </button>
                                    <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Next track">
                                        <SkipForward className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Volume */}
                                <div className="flex items-center gap-3">
                                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                                    <div className="flex-1 h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                                        <div className="w-3/4 h-full bg-[rgba(255,255,255,0.4)] rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Peel Corner Effect */}
                            <motion.div
                                className="absolute -bottom-2 -right-2 w-20 h-20 pointer-events-none"
                                animate={{
                                    scale: isHovered ? 1.15 : 1,
                                    rotate: isHovered ? -10 : 0,
                                }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <svg
                                    viewBox="0 0 80 80"
                                    className="w-full h-full"
                                    style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="peelGradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop offset="0%" stopColor="#148E96" />
                                            <stop offset="100%" stopColor="#5eead4" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M80 0 Q60 20 80 80 L80 0"
                                        fill="url(#peelGradient)"
                                        opacity="0.9"
                                    />
                                    <path
                                        d="M80 80 Q60 60 0 80 L80 80"
                                        fill="#0d1117"
                                        opacity="0.8"
                                    />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                        className="absolute -z-10 -top-10 -right-10 w-40 h-40 rounded-full bg-[#148E96]/20 blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#5eead4]/20 blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}

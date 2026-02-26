'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const experiences = [
    {
        year: "2024 - Present",
        role: "Lead 3D Director",
        company: "Studio Oscillate",
        desc: "Pioneering the boundary between immersive 3D simulations, real-time Unreal Engine environments, and WebGL."
    },
    {
        year: "2022 - 2024",
        role: "Senior VFX Artist",
        company: "Global Media Agency",
        desc: "Led a team of artists building cinematic compositing pipelines and fluid simulations for international broadcast."
    },
    {
        year: "2020 - 2022",
        role: "Motion Designer",
        company: "Creative Render Co.",
        desc: "Architected 3D motion systems and stylized broadcast packages viewed by millions globally."
    }
]

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<SVGPathElement>(null)
    const itemsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (!containerRef.current || !lineRef.current) return

        const ctx = gsap.context(() => {
            // Animate SVG Line Drawing
            const pathLength = lineRef.current!.getTotalLength()
            gsap.set(lineRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength })

            gsap.to(lineRef.current, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1
                }
            })

            // Stagger in experience items
            itemsRef.current.forEach((item, i) => {
                if (!item) return
                gsap.fromTo(item,
                    { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                )
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative w-full py-32 bg-obsidian-800 z-20">
            {/* Gold Background Glow */}
            <div className="absolute inset-0 bg-glow-gold pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center md:text-left mb-16 md:mb-24">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-gradient-gold">
                        Studio Journey
                    </h2>
                    <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-o_gold-400 to-transparent rounded-full mx-auto md:mx-0" />
                </div>

                <div className="relative">
                    {/* SVG Timeline Path */}
                    <svg className="absolute top-0 bottom-0 left-[23px] md:left-1/2 md:-ml-[2px] w-[4px] h-full z-0" preserveAspectRatio="none">
                        <path
                            ref={lineRef}
                            d="M2,0 L2,10000"
                            className="stroke-o_gold-500/30"
                            strokeWidth="4"
                            fill="none"
                        />
                    </svg>

                    {/* Experience Nodes */}
                    <div className="space-y-24">
                        {experiences.map((exp, idx) => {
                            const isEven = idx % 2 === 0
                            return (
                                <div
                                    key={idx}
                                    ref={el => { itemsRef.current[idx] = el }}
                                    className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[16px] md:-translate-x-1/2 md:left-1/2 w-[18px] h-[18px] rounded-full bg-o_gold-500 shadow-[0_0_20px_rgba(245,158,11,0.5)] z-10 border-4 border-obsidian-800" />

                                    {/* Content Card */}
                                    <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                                        <div className="liquid-glass p-8 rounded-2xl border border-o_gold-500/10 hover:border-o_gold-500/30 transition-colors duration-500 group relative overflow-hidden">
                                            {/* Hover Glow */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-o_gold-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                            <span className="inline-block px-4 py-1 rounded-full bg-o_gold-500/10 text-o_gold-400 text-xs font-bold tracking-widest uppercase mb-4">
                                                {exp.year}
                                            </span>

                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-o_gold-200 transition-colors duration-300">
                                                {exp.role}
                                            </h3>

                                            <h4 className="text-lg text-white/70 mb-4">{exp.company}</h4>

                                            <p className="text-white/50 text-sm leading-relaxed">
                                                {exp.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

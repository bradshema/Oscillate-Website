'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, PenTool, Database, Cpu, Globe, Rocket } from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const services = [
    {
        icon: Globe,
        title: "WebGL & 3D Web",
        desc: "Transforming standard DOM elements into immersive, performant 3D experiences utilizing Three.js and Spline."
    },
    {
        icon: PenTool,
        title: "UX/UI Design",
        desc: "Crafting extremely premium, fluid aesthetics focused on dark mode, liquid glass, and kinetic typography."
    },
    {
        icon: Code2,
        title: "Frontend Engineering",
        desc: "Building highly interactive React architectures strictly utilizing Next.js 14 App Router and Server Components."
    },
    {
        icon: Database,
        title: "Headless CMS Architecture",
        desc: "Structuring and securing bespoke content lakes via Sanity.io for ultimate content independence."
    },
    {
        icon: Cpu,
        title: "Creative Animations",
        desc: "Breathing life into the static web through advanced DOM manipulation with GSAP and custom math hooks."
    },
    {
        icon: Rocket,
        title: "Performance Optimization",
        desc: "Achieving 100/100 Lighthouse scores through edge computing, ISR caching, and pristine bundle size management."
    }
]

export default function Expertise() {
    const containerRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            // Pin the entire section while scrolling through standard stagger
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%", // Pin it for a full screen height of scrolling
                pin: true,
                pinSpacing: true,
                animation: gsap.from(cardsRef.current, {
                    y: 100,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out"
                }),
                scrub: 1 // Link animation strictly to scroll bar
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement | null) => {
        if (!card) return

        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const tiltX = ((y - centerY) / centerY) * -15
        const tiltY = ((x - centerX) / centerX) * 15

        gsap.to(card, {
            rotateX: tiltX,
            rotateY: tiltY,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center"
        })
    }

    const handleMouseLeave = (card: HTMLDivElement | null) => {
        if (!card) return
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
        })
    }

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-obsidian-900 z-30">
            {/* Lapis Background Glow */}
            <div className="absolute inset-0 bg-glow-lapis pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="mb-16 md:mb-24 relative z-10">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-gradient-lapis">
                        Technical Expertise
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-o_lapis-400 to-transparent rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10 perspective-1000">
                    {services.map((service, idx) => {
                        const Icon = service.icon
                        return (
                            <div
                                key={idx}
                                ref={el => { cardsRef.current[idx] = el }}
                                className="liquid-glass rounded-2xl p-8 border border-white/5 hover:border-o_lapis-500/30 transition-colors duration-500 group"
                                style={{ transformStyle: 'preserve-3d' }}
                                onMouseMove={(e) => handleMouseMove(e, cardsRef.current[idx])}
                                onMouseLeave={() => handleMouseLeave(cardsRef.current[idx])}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-o_lapis-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="w-14 h-14 rounded-full bg-o_lapis-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-o_lapis-500/20" style={{ transform: "translateZ(30px)" }}>
                                    <Icon className="w-6 h-6 text-o_lapis-400" />
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-o_lapis-200 transition-colors duration-300" style={{ transform: "translateZ(20px)" }}>
                                    {service.title}
                                </h3>

                                <p className="text-white/50 text-sm leading-relaxed" style={{ transform: "translateZ(10px)" }}>
                                    {service.desc}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

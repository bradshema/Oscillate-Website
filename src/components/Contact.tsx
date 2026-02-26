'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const button = buttonRef.current
        if (!button) return

        // Magnetic Button Logic
        const onMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            // Limit the magnetic pull radius
            const distance = Math.sqrt(x * x + y * y)
            if (distance < 100) {
                gsap.to(button, {
                    x: x * 0.4,
                    y: y * 0.4,
                    duration: 0.6,
                    ease: "power3.out"
                })
            } else {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                })
            }
        }

        const onMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            })
        }

        window.addEventListener('mousemove', onMouseMove)
        button.addEventListener('mouseleave', onMouseLeave)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            button.removeEventListener('mouseleave', onMouseLeave)
        }
    }, [])

    return (
        <section ref={containerRef} className="relative w-full py-32 overflow-hidden flex items-center justify-center bg-obsidian-900 border-t border-white/5 z-20">
            {/* Emerald Background Glow */}
            <div className="absolute inset-0 bg-glow-emerald pointer-events-none" />

            {/* Organic Background Shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-o_emerald-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-o_emerald-800/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
                <p className="text-o_emerald-400 font-bold tracking-[0.2em] uppercase text-sm mb-6">Start a Project</p>

                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white leading-tight">
                    Let&apos;s Build The <br />
                    <span className="text-gradient-emerald">Impossible.</span>
                </h2>

                <p className="text-sm sm:text-base md:text-xl text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed px-4 md:px-0">
                    Elevate your brand with award-winning 3D cinematic experiences and meticulously engineered VFX pipelines.
                </p>

                <button
                    ref={buttonRef}
                    className="relative group overflow-hidden rounded-full bg-o_emerald-500 text-obsidian-900 font-bold tracking-widest uppercase px-12 py-6 text-lg transition-transform hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                >
                    <span className="relative z-10">Initiate Contact</span>

                    {/* Hover Liquid Fill Effect */}
                    <div className="absolute inset-0 h-full w-full bg-o_emerald-400 translate-y-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-0" />
                </button>
            </div>
        </section>
    )
}

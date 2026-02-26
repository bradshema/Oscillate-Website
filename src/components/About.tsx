'use client'

import { useRef, useEffect } from 'react'
import { Rocket, Globe, Award } from 'lucide-react'
import gsap from 'gsap'
import StaggerText from './StaggerText'

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const leftPanelRef = useRef<HTMLDivElement>(null)
    // Store refs in an array so we can animate them individually
    const rightPanelsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        // Parallax mouse movement attached to window for a global floating effect
        const ctx = gsap.context(() => {
            const handleMouseMove = (e: MouseEvent) => {
                if (!sectionRef.current) return

                const { clientX, clientY } = e
                const xPos = (clientX / window.innerWidth - 0.5) * 20
                const yPos = (clientY / window.innerHeight - 0.5) * 20

                // Move left panel slightly
                gsap.to(leftPanelRef.current, {
                    x: xPos * 0.5,
                    y: yPos * 0.5,
                    rotationY: xPos * 0.2,
                    rotationX: -yPos * 0.2,
                    ease: "power2.out",
                    duration: 1
                })

                // Move right panels with different depths
                rightPanelsRef.current.forEach((panel, index) => {
                    if (!panel) return
                    const depth = (index + 2) * 0.6 // Different depth per card
                    gsap.to(panel, {
                        x: xPos * depth,
                        y: yPos * depth,
                        rotationY: xPos * 0.3,
                        rotationX: -yPos * 0.3,
                        ease: "power2.out",
                        duration: 1.5,
                        delay: index * 0.05
                    })
                })
            }

            window.addEventListener('mousemove', handleMouseMove)
            return () => window.removeEventListener('mousemove', handleMouseMove)
        })

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24"
            style={{ perspective: 1000 }}
        >
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">

                {/* Left Side: Bio Panel */}
                <div
                    ref={leftPanelRef}
                    className="glass-panel h-full flex flex-col justify-center !bg-white/5 border-l-emerald-500/20 shadow-[0_12px_40px_0_rgba(0,0,0,0.6)]"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <StaggerText
                        text="Oscillate"
                        className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight"
                    />
                    <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                        I craft deeply immersive, high-performance digital experiences.
                        Blending cutting-edge 3D technologies with fluid motion design,
                        I build environments that transcend the traditional web canvas—focusing on weightless interfaces, liquid glass aesthetics, and premium interactions.
                    </p>
                </div>

                {/* Right Side: Feat Squares */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full perspective-[1000px]">
                    {/* Square 1 */}
                    <div
                        ref={el => { rightPanelsRef.current[0] = el }}
                        className="liquid-glass rounded-2xl p-8 flex flex-col items-center justify-center text-center sm:col-span-2 group hover:bg-white/10 transition-colors duration-500"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <Rocket className="w-12 h-12 text-emerald-400/80 mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-500" />
                        <h3 className="text-2xl font-semibold text-white/90">20+ Projects</h3>
                        <p className="text-sm text-white/50 mt-2 tracking-wider uppercase">Delivered worldwide</p>
                    </div>

                    {/* Square 2 */}
                    <div
                        ref={el => { rightPanelsRef.current[1] = el }}
                        className="liquid-glass rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors duration-500"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <Globe className="w-10 h-10 text-emerald-400/80 mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-500" />
                        <h3 className="text-xl font-semibold text-white/90">Global Clients</h3>
                        <p className="text-xs text-white/50 mt-2 tracking-wider uppercase">Across 4 continents</p>
                    </div>

                    {/* Square 3 */}
                    <div
                        ref={el => { rightPanelsRef.current[2] = el }}
                        className="liquid-glass rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors duration-500"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <Award className="w-10 h-10 text-emerald-400/80 mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-500" />
                        <h3 className="text-xl font-semibold text-white/90">Premium Quality</h3>
                        <p className="text-xs text-white/50 mt-2 tracking-wider uppercase">Award winning</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

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
                        text="Ruganintwali Shema Arnaud Brad"
                        className="text-4xl sm:text-5xl lg:text-7xl font-medium mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-wider leading-tight"
                    />
                    <p className="text-base md:text-xl text-white/70 leading-relaxed font-extralight tracking-wide">
                        I craft deeply immersive, high-end 3D environments and custom VFX pipelines.
                        Blending industry-standard rendering technologies with cinematic motion design,
                        I build media that transcends the screen—focusing on weightless animation, liquid glass aesthetics, and premium visual experiences.
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
                        <Rocket className="w-10 h-10 md:w-12 md:h-12 text-emerald-400/80 mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-500" />
                        <h3 className="text-xl md:text-2xl font-medium tracking-wide text-white/90">Premium Renderings</h3>
                        <p className="text-xs md:text-sm text-white/50 mt-2 tracking-[0.2em] font-light uppercase">8k & 12k Resolution</p>
                    </div>

                    {/* Square 2 */}
                    <div
                        ref={el => { rightPanelsRef.current[1] = el }}
                        className="liquid-glass rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors duration-500"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <Globe className="w-8 h-8 md:w-10 md:h-10 text-emerald-400/80 mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-500" />
                        <h3 className="text-lg md:text-xl font-medium tracking-wide text-white/90">Cinematic VFX</h3>
                        <p className="text-[10px] md:text-xs text-white/50 mt-2 tracking-[0.2em] font-light uppercase">Industry Standard</p>
                    </div>

                    {/* Square 3 */}
                    <div
                        ref={el => { rightPanelsRef.current[2] = el }}
                        className="liquid-glass rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors duration-500"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <Award className="w-8 h-8 md:w-10 md:h-10 text-emerald-400/80 mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-500" />
                        <h3 className="text-lg md:text-xl font-medium tracking-wide text-white/90">Motion Media</h3>
                        <p className="text-[10px] md:text-xs text-white/50 mt-2 tracking-[0.2em] font-light uppercase">Award winning designs</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

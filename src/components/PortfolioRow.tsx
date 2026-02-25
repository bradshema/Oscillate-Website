'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/all'

export type Project = {
    _id: string
    title: string
    overview: string
    imageUrl?: string
    link?: string
}

if (typeof window !== 'undefined') {
    gsap.registerPlugin(Draggable)
}

export default function PortfolioRow({
    projects,
    direction = "left"
}: {
    projects: Project[],
    direction?: "left" | "right"
}) {
    const rowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!rowRef.current) return

        const ctx = gsap.context(() => {
            // Infinite horizontal scroll animation
            const scrollAnimation = gsap.to(rowRef.current, {
                xPercent: direction === "left" ? -50 : 50,
                ease: "none",
                duration: projects.length * 8, // speed based on items
                repeat: -1,
            })

            // Add draggable functionality for the row
            Draggable.create(rowRef.current, {
                type: "x",
                inertia: true,
                bounds: { minX: -2000, maxX: 2000 },
                onPress() {
                    scrollAnimation.pause()
                },
                onRelease() {
                    scrollAnimation.play()
                }
            })
        })

        return () => ctx.revert()
    }, [projects, direction])

    return (
        <div className="w-full overflow-visible relative flex items-center h-[400px]">
            <div
                ref={rowRef}
                className="flex flex-nowrap gap-6 sm:gap-8 cursor-grab active:cursor-grabbing w-max px-6 md:px-12 lg:px-24"
                style={direction === "right" ? { transform: "translateX(-50%)" } : {}}
            >
                {projects.map((project, idx) => (
                    <div
                        key={`${project._id}-${idx}`}
                        className="flex-none w-[280px] sm:w-[350px] md:w-[450px] h-[300px] md:h-[350px] liquid-glass rounded-2xl group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                    >
                        {project.imageUrl ? (
                            <div className="absolute inset-0 z-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                                />
                            </div>
                        ) : (
                            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0a0b0f] to-[#2a3541] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/90 via-[#020202]/40 to-transparent z-10" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 transform-gpu">
                            <h4 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">{project.title}</h4>
                            <p className="text-sm md:text-base text-white/60 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {project.overview}
                            </p>

                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-500/30 rounded-full px-4 py-2 hover:bg-emerald-500/10 transition-colors opacity-0 group-hover:opacity-100 delay-200"
                                >
                                    View Case
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

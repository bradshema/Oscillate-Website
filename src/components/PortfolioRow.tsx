'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/all'

export type Project = {
    _id: string
    title: string
    overview: string
    imageUrl?: string
    videoUrl?: string
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
            // 3 copies of the array are rendered. Moving exactly 33.3333% creates a perfect, seamless loop.
            const scrollAnimation = gsap.fromTo(rowRef.current,
                { xPercent: direction === "left" ? 0 : -33.333333 },
                {
                    xPercent: direction === "left" ? -33.333333 : 0,
                    ease: "none",
                    duration: projects.length * 8, // speed based on distinct items
                    repeat: -1,
                }
            )

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

    // Duplicate projects array to create the infinite loop effect seamlessly
    const infiniteProjects = [...projects, ...projects, ...projects]

    return (
        <div className="w-full relative flex items-center h-[400px] overflow-hidden group/row py-10">
            <div
                ref={rowRef}
                className="flex flex-nowrap gap-6 sm:gap-8 cursor-grab w-max pl-6 sm:pl-8"
            >
                {infiniteProjects.map((project, idx) => (
                    <div
                        key={`${project._id}-${idx}`}
                        className="flex-none w-[280px] sm:w-[350px] md:w-[450px] h-[300px] md:h-[350px] liquid-glass rounded-2xl group overflow-hidden transition-all duration-700 hover:scale-110 hover:z-50 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] relative"
                        onMouseEnter={(e) => {
                            const video = e.currentTarget.querySelector('video');
                            if (video) video.play().catch(() => { });
                            // Pause the row scrolling when hovering over an item
                            gsap.getTweensOf(rowRef.current).forEach(t => t.pause());
                        }}
                        onMouseLeave={(e) => {
                            const video = e.currentTarget.querySelector('video');
                            if (video) {
                                video.pause();
                                video.currentTime = 0;
                            }
                            // Resume scrolling
                            gsap.getTweensOf(rowRef.current).forEach(t => t.play());
                        }}
                    >
                        {project.videoUrl ? (
                            <div className="absolute inset-0 z-0 bg-black">
                                <video
                                    src={project.videoUrl}
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                                    poster={project.imageUrl || ''}
                                />
                            </div>
                        ) : project.imageUrl ? (
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
                            <h4 className="text-xl md:text-2xl font-medium text-white mb-2 tracking-wide">{project.title}</h4>
                            <p className="text-sm md:text-base text-white/50 font-extralight tracking-wide line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {project.overview}
                            </p>

                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-emerald-400 border border-emerald-500/20 rounded-full px-4 py-2 hover:bg-emerald-500/10 transition-colors opacity-0 group-hover:opacity-100 delay-200"
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

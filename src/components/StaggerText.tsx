'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export default function StaggerText({
    text,
    className = ""
}: {
    text: string,
    className?: string
}) {
    const textRef = useRef<HTMLDivElement>(null)
    const words = text.split(" ")

    useEffect(() => {
        if (!textRef.current) return

        const ctx = gsap.context(() => {
            const chars = textRef.current?.querySelectorAll('.stagger-char')
            if (!chars) return

            gsap.from(chars, {
                y: 50,
                opacity: 0,
                rotateX: -90,
                stagger: 0.02,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            })
        }, textRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={textRef} className={`inline-flex flex-wrap ${className}`} style={{ perspective: '400px' }}>
            {words.map((word, wordIdx) => (
                <div key={wordIdx} className="inline-block mr-[0.25em] whitespace-nowrap overflow-hidden py-1">
                    {word.split("").map((char, charIdx) => (
                        <span
                            key={charIdx}
                            className="stagger-char inline-block origin-bottom"
                        >
                            {char}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    )
}

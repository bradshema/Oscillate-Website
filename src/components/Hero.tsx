'use client'

import { useState, useRef, useEffect } from 'react'
import Spline from '@splinetool/react-spline'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Starfield from './Starfield'

// Register plugins inside component or file scope
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin)
}

export default function Hero() {
    const [isLoaded, setIsLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Lock scrolling on initial load if at the top of the page
        if (typeof window !== 'undefined' && window.scrollY === 0) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        }

        // Cleanup on unmount to ensure scrolling is never permanently stuck
        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = '';
            }
        }
    }, [])

    const handleStart = () => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = ''; // Unlock scrolling
        }

        if (typeof window !== 'undefined') {
            gsap.to(window, {
                duration: 2,
                scrollTo: "#about",
                ease: "power3.inOut"
            });
        }
    }

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden flex flex-col justify-end items-center bg-transparent z-10"
        >
            {/* Starfield Background Layer */}
            <Starfield />

            {/* Spline Container - Fade in when loaded */}
            <div
                className={`absolute inset-0 z-10 transition-opacity duration-[2000ms] ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
                <Spline
                    scene="https://prod.spline.design/afBlfmhvcO2kZLoC/scene.splinecode"
                    onLoad={() => setIsLoaded(true)}
                />
            </div>

            {/* Loading State fallback */}
            {!isLoaded && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 border border-white/5 border-t-white/40 rounded-full animate-spin mb-4"></div>
                    <p className="text-white/30 tracking-[0.3em] font-extralight text-xs uppercase">Initializing Core</p>
                </div>
            )}

            {/* Fade at bottom to blend with background if needed */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none opacity-50" />

            {/* START Button - Fade in with scene */}
            <button
                onClick={handleStart}
                className={`liquid-glass-button z-30 mb-[15vh] md:mb-20 relative transition-all duration-[1500ms] delay-[1000ms] text-sm md:text-base px-6 py-3 md:px-8 md:py-4 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
                START
            </button>
        </section>
    )
}

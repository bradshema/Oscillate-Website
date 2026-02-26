'use client'

import { useEffect, useRef } from 'react'

export default function AutoScroll() {
    const isIdle = useRef(false)
    const idleTimeout = useRef<NodeJS.Timeout | null>(null)
    const animationFrame = useRef<number | null>(null)
    const accumulateScroll = useRef(0)

    useEffect(() => {
        const startScroll = () => {
            if (isIdle.current) {
                accumulateScroll.current += 0.3; // Very slow, graceful scroll: 0.3px per frame ≈ 18px per second
                if (accumulateScroll.current >= 1) {
                    const scrollAmount = Math.floor(accumulateScroll.current)

                    // Only scroll if we haven't reached the absolute bottom
                    if (window.innerHeight + Math.round(window.scrollY) < document.body.scrollHeight) {
                        window.scrollBy({ top: scrollAmount, behavior: 'auto' })
                    } else {
                        // Optional: You could loop back to top here. For now, we rest at the bottom.
                    }

                    accumulateScroll.current -= scrollAmount
                }
            }
            animationFrame.current = requestAnimationFrame(startScroll)
        }

        const resetIdle = () => {
            isIdle.current = false
            if (idleTimeout.current) clearTimeout(idleTimeout.current)
            idleTimeout.current = setTimeout(() => {
                isIdle.current = true
            }, 3000) // 3 seconds of inactivity before auto-scroll kicks in
        }

        // Passive listeners for user activity
        const options = { passive: true }
        window.addEventListener('mousemove', resetIdle, options)
        window.addEventListener('mousedown', resetIdle, options)
        window.addEventListener('touchstart', resetIdle, options)
        window.addEventListener('touchmove', resetIdle, options)
        window.addEventListener('keydown', resetIdle, options)
        window.addEventListener('wheel', resetIdle, options)
        // We intentionally do NOT listen to 'scroll' to avoid programmatic scroll resetting the idle timer!

        // Start checking
        resetIdle()
        animationFrame.current = requestAnimationFrame(startScroll)

        return () => {
            if (idleTimeout.current) clearTimeout(idleTimeout.current)
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
            window.removeEventListener('mousemove', resetIdle)
            window.removeEventListener('mousedown', resetIdle)
            window.removeEventListener('touchstart', resetIdle)
            window.removeEventListener('touchmove', resetIdle)
            window.removeEventListener('keydown', resetIdle)
            window.removeEventListener('wheel', resetIdle)
        }
    }, [])

    return null
}

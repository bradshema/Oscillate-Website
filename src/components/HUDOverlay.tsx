'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function HUDOverlay() {
    const [time, setTime] = useState('')
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const [isClient, setIsClient] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsClient(true)

        const updateTime = () => {
            const now = new Date()
            const hours = now.getHours().toString().padStart(2, '0')
            const minutes = now.getMinutes().toString().padStart(2, '0')
            const seconds = now.getSeconds().toString().padStart(2, '0')
            const ms = Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0')
            setTime(`${hours}:${minutes}:${seconds}:${ms}`)
        }

        const interval = setInterval(updateTime, 50)

        const handleMouseMove = (e: MouseEvent) => {
            setCoords({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            clearInterval(interval)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    if (!isClient) return null;

    // Do not show HUD inside the Sanity Studio
    if (pathname?.startsWith('/studio')) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden opacity-60 mix-blend-screen mix-blend-difference">
            {/* Top Left */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col items-start font-mono text-[10px] tracking-widest text-[#10b981]/70">
                <span className="mb-1">SYS.OP.MODE // ACTIVE</span>
                <span>T: {time}</span>
            </div>

            {/* Top Right */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col items-end font-mono text-[10px] tracking-widest text-[#10b981]/70">
                <span className="mb-1">OSC // GENESIS</span>
                <span>VOL: NOMINAL</span>
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex flex-col items-start font-mono text-[10px] tracking-widest text-[#10b981]/70">
                <span className="mb-1">COORD: {coords.x.toString().padStart(4, '0')} , {coords.y.toString().padStart(4, '0')}</span>
                <span>STATUS: STABLE</span>
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end font-mono text-[10px] tracking-widest text-[#10b981]/70">
                <div className="flex gap-1 mb-1 items-end h-[10px]">
                    <div className="w-1 h-2 bg-[#10b981]/70 animate-pulse"></div>
                    <div className="w-1 h-[8px] bg-[#10b981]/70 animate-pulse delay-75"></div>
                    <div className="w-1 h-[10px] bg-[#10b981]/70 animate-pulse delay-150"></div>
                </div>
                <span>UPLINK: SECURE</span>
            </div>

            {/* Crosshairs/Scanner lines - Very subtle */}
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#10b981]/5"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#10b981]/5"></div>

            {/* Corner brackets */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 w-4 h-4 border-t border-l border-[#10b981]/30"></div>
            <div className="absolute top-6 right-6 md:top-10 md:right-10 w-4 h-4 border-t border-r border-[#10b981]/30"></div>
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-4 h-4 border-b border-l border-[#10b981]/30"></div>
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-4 h-4 border-b border-r border-[#10b981]/30"></div>
        </div>
    )
}

'use client'

import { useEffect, useRef } from 'react'

export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight
        canvas.width = width
        canvas.height = height

        const stars: { x: number, y: number, z: number, size: number, glow: number }[] = []
        const numStars = 1500

        // Distribute stars in a large 3D sphere so rotation doesn't change density
        for (let i = 0; i < numStars; i++) {
            const r = 400 + Math.random() * 5000;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            stars.push({
                x: r * Math.sin(phi) * Math.cos(theta),
                y: r * Math.sin(phi) * Math.sin(theta),
                z: r * Math.cos(phi),
                size: Math.random() * 1.2 + 0.5,
                glow: Math.random() * 0.5 + 0.3
            })
        }

        let isDragging = false
        let previousMousePosition = { x: 0, y: 0 }

        // Rotation angles
        let rx = 0
        let ry = 0

        const handlePointerDown = (e: PointerEvent) => {
            isDragging = true
            previousMousePosition = { x: e.clientX, y: e.clientY }
        }

        const handlePointerMove = (e: PointerEvent) => {
            if (!isDragging) return

            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            }

            // Adjust sensitivity to match the 3D object rotation feel
            ry += deltaMove.x * 0.003
            rx += deltaMove.y * 0.003

            previousMousePosition = { x: e.clientX, y: e.clientY }
        }

        const handlePointerUp = () => {
            isDragging = false
        }

        // Use capture phase to ensure we catch events even if Spline processes them
        window.addEventListener('pointerdown', handlePointerDown, { capture: true })
        window.addEventListener('pointermove', handlePointerMove, { capture: true })
        window.addEventListener('pointerup', handlePointerUp, { capture: true })
        window.addEventListener('pointercancel', handlePointerUp, { capture: true })

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }
        window.addEventListener('resize', handleResize)

        let autoRy = 0;
        let req: number;

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // Very slow ambient rotation so the stars feel alive even when not dragging
            autoRy += 0.0003;

            const cx = width / 2
            const cy = height / 2

            const totalRy = ry + autoRy
            const totalRx = rx

            stars.forEach(star => {
                // Rotate around X axis
                const y1 = star.y * Math.cos(totalRx) - star.z * Math.sin(totalRx)
                const z1 = star.y * Math.sin(totalRx) + star.z * Math.cos(totalRx)

                // Rotate around Y axis
                const x2 = star.x * Math.cos(totalRy) + z1 * Math.sin(totalRy)
                const z2 = -star.x * Math.sin(totalRy) + z1 * Math.cos(totalRy)

                // Project to 2D
                const fov = 1000
                const z = z2 + 2000

                if (z > 0) {
                    const scale = fov / z
                    const px = cx + x2 * scale
                    const py = cy + y1 * scale

                    // Only draw if within bounds (with slight margin)
                    if (px >= -50 && px <= width + 50 && py >= -50 && py <= height + 50) {
                        const alphaDistance = Math.min(1, Math.max(0, 1 - (z / 6000)))
                        const twinkle = 0.5 + 0.5 * Math.sin(Date.now() * 0.001 + star.glow * 100)
                        const finalAlpha = alphaDistance * star.glow * (0.5 + 0.5 * twinkle)

                        // Core star
                        ctx.beginPath()
                        ctx.arc(px, py, star.size * scale, 0, Math.PI * 2)
                        ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`
                        ctx.fill()

                        // Add glow
                        ctx.shadowBlur = 15 * scale
                        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
                        ctx.fill()
                        ctx.shadowBlur = 0 // Reset
                    }
                }
            })

            req = requestAnimationFrame(render)
        }

        req = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(req)
            window.removeEventListener('pointerdown', handlePointerDown, { capture: true })
            window.removeEventListener('pointermove', handlePointerMove, { capture: true })
            window.removeEventListener('pointerup', handlePointerUp, { capture: true })
            window.removeEventListener('pointercancel', handlePointerUp, { capture: true })
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.9 }}
        />
    )
}

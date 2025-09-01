"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 16,
  flickerChance = 0.05,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.8,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const cols = Math.floor(width / (squareSize + gridGap))
      const rows = Math.floor(height / (squareSize + gridGap))

      const squares = new Float32Array(cols * rows * 5) // r, g, b, opacity, lastFlicker for each square
      for (let i = 0; i < cols * rows; i++) {
        const baseIndex = i * 5
        // initialize with light tones for glowing pixels
        squares[baseIndex] = 180 + Math.random() * 75 // red
        squares[baseIndex + 1] = 180 + Math.random() * 75 // green
        squares[baseIndex + 2] = 180 + Math.random() * 75 // blue
        squares[baseIndex + 3] = 0 // start with opacity 0
        squares[baseIndex + 4] = Math.random() * 2000 // random initial lastFlicker time
      }

      return { cols, rows, squares, dpr }
    },
    [squareSize, gridGap, maxOpacity],
  )

  const updateSquares = useCallback(
    (squares: Float32Array, currentTime: number, cols: number, rows: number) => {
      for (let i = 0; i < cols * rows; i++) {
        const baseIndex = i * 5
        const lastFlicker = squares[baseIndex + 4]

        const flickerInterval = 500 + Math.random() * 2500

        if (currentTime - lastFlicker > flickerInterval) {
          if (Math.random() < 0.3) {
            // switch to another light color when flickering on
            squares[baseIndex] = 180 + Math.random() * 75 // red
            squares[baseIndex + 1] = 180 + Math.random() * 75 // green
            squares[baseIndex + 2] = 180 + Math.random() * 75 // blue
            squares[baseIndex + 3] = Math.random() * maxOpacity // opacity
            squares[baseIndex + 4] = currentTime // update lastFlicker time
          } else {
            squares[baseIndex + 3] *= 0.95
            if (squares[baseIndex + 3] < 0.01) {
              squares[baseIndex + 3] = 0
            }
            squares[baseIndex + 4] = currentTime - flickerInterval + Math.random() * 1000
          }
        }
      }
    },
    [flickerChance, maxOpacity],
  )

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height)
      // white background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const squareIndex = i * rows + j
          const baseIndex = squareIndex * 5
          const r = Math.floor(squares[baseIndex])
          const g = Math.floor(squares[baseIndex + 1])
          const b = Math.floor(squares[baseIndex + 2])
          const opacity = squares[baseIndex + 3]

          if (opacity > 0) {
            const color = `rgba(${r}, ${g}, ${b}, ${opacity})`
            // soft glow
            ctx.shadowBlur = 8
            ctx.shadowColor = color
            ctx.fillStyle = color
            ctx.fillRect(
              i * (squareSize + gridGap) * dpr,
              j * (squareSize + gridGap) * dpr,
              squareSize * dpr,
              squareSize * dpr,
            )
            // reset shadow for safety (kept inside loop for clarity)
            ctx.shadowBlur = 0
          }
        }
      }
    },
    [squareSize, gridGap],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let gridParams: ReturnType<typeof setupCanvas>

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth
      const newHeight = height || container.clientHeight
      setCanvasSize({ width: newWidth, height: newHeight })
      gridParams = setupCanvas(canvas, newWidth, newHeight)
    }

    updateCanvasSize()

    const lastTime = 0
    const animate = (time: number) => {
      if (!isInView) return

      updateSquares(gridParams.squares, time, gridParams.cols, gridParams.rows)
      drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr)
      animationFrameId = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })

    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0 },
    )

    intersectionObserver.observe(canvas)

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView])

  return (
    <div ref={containerRef} className={cn(`h-full w-full ${className}`)} {...props}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  )
}

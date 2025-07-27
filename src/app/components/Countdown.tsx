"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

declare global {
  interface Window {
    FlipDown: any
  }
}

export default function Countdown() {
  const countdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initFlipDown = () => {
      if (typeof window.FlipDown !== "undefined" && countdownRef.current) {
        const targetDate = new Date("2025-08-26T00:00:00+03:00")
        let endDate = localStorage.getItem("countdownEndDate")
        endDate = Math.floor(targetDate.getTime() / 1000).toString()

        if (!endDate) {
          const targetDate = new Date("2025-08-26T00:00:00+03:00")
          endDate = Math.floor(targetDate.getTime() / 1000).toString()
          localStorage.setItem("countdownEndDate", endDate)
        }

        new window.FlipDown(Number.parseInt(endDate)).start().ifEnded(() => {
          console.log("Countdown Finished!")
        })
      }
    }

    if (typeof window.FlipDown !== "undefined") {
      initFlipDown()
    } else {
      window.addEventListener("flipdown-ready", initFlipDown)
    }

    return () => {
      window.removeEventListener("flipdown-ready", initFlipDown)
    }
  }, [])

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/flipdown@0.3.2/dist/flipdown.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.dispatchEvent(new Event("flipdown-ready"))
        }}
      />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flipdown@0.3.2/dist/flipdown.min.css" />
      <div className="countdownWrapper">
        <div id="flipdown" ref={countdownRef} className="flipdown"></div>
      </div>
    </>
  )
}
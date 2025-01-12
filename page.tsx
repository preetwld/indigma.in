'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const showOffset = window.innerHeight * 0.3
      setIsVisible(scrollPosition > showOffset)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-[200vh]">
      {/* Hero Section */}
      <section 
        className="h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chill-guy-wallpapers-i-made-v0-gmi69xqd0t4e1-NVThGESWskXeEPGgvT05VijYRO0JDz.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Preet's incomplete project</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            this chill guy is so lazy to build the project please getin touch with him and make him build this
          </p>
          <Button 
            className="text-lg px-8 py-6"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ 
                behavior: 'smooth' 
              })
            }}
          >
            Get in Touch
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact"
        className={`py-24 bg-background transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <a 
            href="mailto:preet@indigma.in"
            className="text-xl text-primary hover:underline"
          >
            preet@indigma.in
          </a>
        </div>
      </section>
    </main>
  )
}


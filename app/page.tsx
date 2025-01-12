'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollPosition > windowHeight * 0.5) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative">
      {/* Hero Section */}
      {/* Hero Section */}
<section 
  className="h-screen relative flex items-center justify-center"
  style={{
    backgroundImage: 'url("images/chill-guy-wallpapers-i-made-v0-gmi69xqd0t4e1.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Hero Content */}
  <div className="absolute top-1/4 w-full text-center text-white px-4">
    <h1 className="text-4xl md:text-6xl font-bold mb-4">Indigma</h1>
    <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
      Chill guy is very lazy, Please motivate him to build this!
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
        className={`min-h-screen relative flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-lg w-full p-8 bg-white/90 rounded-lg shadow-lg">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
            <p className="text-gray-600">
              We'd love to hear from you. Feel free to reach out!
            </p>
            <Button 
              className="text-lg px-8 py-4 border border-black bg-black text-white hover:bg-gray-800"
              onClick={() => window.location.href = 'mailto:preet@indigma.in'}
            >
              Email: preet@indigma.in
            </Button>
            <p className="text-sm text-gray-500">
              We aim to respond to all inquiries within 24 hours.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Mail } from 'lucide-react'
import { InstagramIcon, TwitterIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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
    <div className="relative">
      {/* Background Image Section with Hero Typography */}
      <div 
        className="h-screen bg-cover bg-center fixed inset-0 flex flex-col"
        style={{
          backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chill-guy-wallpapers-i-made-v0-7v0c4awj0t4e1-MejQnilaTft36ITQWObUVv3M3QX35l.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center px-8 py-6 mx-auto w-full leading-none">
          Just a chill guy building this project.
        </h1>
      </div>

      {/* Spacer to enable scrolling */}
      <div className="h-screen" />
      
      {/* Contact Section */}
      <section 
        className={`min-h-screen relative flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Card className="max-w-lg w-full p-8 bg-white/90 backdrop-blur-sm">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
            <p className="text-muted-foreground">
              We'd love to hear from you. Please feel free to reach out.
            </p>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-1 bg-primary rounded-full" />
              
              <Button
                asChild
                variant="outline"
                className="text-lg py-6 px-8 space-x-3 border-2 hover:scale-105 transition-transform"
              >
                <a href="mailto:preet@indigma.in">
                  <Mail className="w-5 h-5" />
                  <span>preet@indigma.in</span>
                </a>
              </Button>

              <div className="flex items-center gap-4 pt-4">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:scale-110 transition-transform"
                >
                  <a 
                    href="https://instagram.com/preetwld" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:scale-110 transition-transform"
                >
                  <a 
                    href="https://x.com/p1c1x" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Twitter/X"
                  >
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                We aim to respond to all inquiries within 24 hours.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}


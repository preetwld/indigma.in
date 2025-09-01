"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Target,
  Activity,
  Cpu,
  Radio,
  Gauge,
  Battery,
  Wifi,
  Signal,
  Thermometer,
  Clock,
  Database,
  Users,
} from "lucide-react"
import Image from "next/image"
import DynamicFrameLayoutComplete from "@/components/dynamicframelayout"
import { FlickeringGrid } from "@/components/flickering-grid"

export default function IndigmaVentures() {
  

  const systemBoxes = [
    { label: "STATUS", value: "OPERATIONAL", color: "green", icon: <Activity className="w-4 h-4" /> },
    { label: "MISSION", value: "LED_REVOLUTION", color: "blue", icon: <Target className="w-4 h-4" /> },
    { label: "LOCATION", value: "INDIA", color: "orange", icon: <MapPin className="w-4 h-4" /> },
    { label: "POWER", value: "98.7%", color: "green", icon: <Battery className="w-4 h-4" /> },
    { label: "NETWORK", value: "CONNECTED", color: "blue", icon: <Wifi className="w-4 h-4" /> },
    { label: "SIGNAL", value: "STRONG", color: "green", icon: <Signal className="w-4 h-4" /> },
    { label: "TEMP", value: "OPTIMAL", color: "blue", icon: <Thermometer className="w-4 h-4" /> },
    { label: "UPTIME", value: "24/7", color: "green", icon: <Clock className="w-4 h-4" /> },
    { label: "DATABASE", value: "SYNCED", color: "blue", icon: <Database className="w-4 h-4" /> },
    { label: "SYSTEMS", value: "ALL_GO", color: "green", icon: <Cpu className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen text-slate-200 overflow-x-hidden relative bg-white">
      {/* Flickering Grid Background - full-page */}
      <div className="fixed inset-0 z-0">
        <FlickeringGrid
          squareSize={4}
          gridGap={16}
          flickerChance={0.05}
          maxOpacity={0.8}
        />
      </div>
      {/* Transparent Navbar (no background/border) */}
      <div className="absolute top-0 left-0 right-0 z-50 h-16">
        <div className="h-full mx-4">
          <div className="grid grid-cols-3 items-center h-full">
            {/* Brand */}
            <a href="#" className="flex items-center gap-2 text-black font-bold font-simple text-stroke">
              <Image src="/placeholder-logo.svg" alt="Indigma Ventures" width={24} height={24} className="opacity-90" />
              <span className="tracking-wide">INDIGMA VENTURES</span>
            </a>
            {/* Centered CTA */}
            <nav className="flex justify-center items-center gap-2 font-simple text-stroke">
              <Button variant="ghost" size="sm" className="text-black hover:text-black font-bold px-3 font-simple">
                Services
              </Button>
              <Button variant="ghost" size="sm" className="text-black hover:text-black font-bold px-3 font-simple">
                About
              </Button>
              <Button variant="ghost" size="sm" className="text-black hover:text-black font-bold px-3 font-simple">
                Contact
              </Button>
            </nav>
            {/* User profile placeholder */}
            <div className="flex justify-end items-center font-simple text-black font-bold text-stroke">
              <button className="w-8 h-8 rounded-full overflow-hidden border border-slate-700">
                <Image src="/placeholder-user.jpg" alt="User" width={32} height={32} className="w-8 h-8 object-cover" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - fits in first viewport below navbar */}
      <section className="mt-16 min-h-[calc(100vh-4rem)] flex items-center justify-center relative z-10">
        <div className="relative z-10 text-center w-full">
          {/* Outer Dark Container - Much Wider */}
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/80 backdrop-blur-sm p-6 rounded-[3rem] border border-slate-600/30 shadow-2xl shadow-black/50 mx-4 h-[calc(100vh-4rem)]">
            <div className="bg-gradient-to-br from-blue-50/95 to-blue-100/95 backdrop-blur-2xl px-12 py-10 rounded-[2.25rem] border border-blue-200/50 shadow-2xl shadow-blue-500/20 text-slate-800 h-full flex flex-col justify-center">
              <div className="bg-gradient-to-br from-blue-50/80 to-white/80 px-10 py-8 rounded-[1.75rem] border border-blue-100/50">

                <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tight bg-gradient-to-r from-slate-700 to-blue-800 bg-clip-text text-transparent">
                  INDIGMA
                </h1>
                <div className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-400 mb-4 rounded-full shadow-inner" />
                <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-wide bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent">
                  VENTURES
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12 max-w-6xl mx-auto">
                  {systemBoxes.map((box, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/70 backdrop-blur-sm border border-blue-200/50 p-6 rounded-2xl hover:bg-white/90 transition-all duration-300 group shadow-lg shadow-blue-100/30"
                    >
                      <div className="flex items-center justify-center mb-3 text-blue-500 group-hover:scale-110 transition-transform">
                        {box.icon}
                      </div>
                      <div className="text-blue-600 text-xs mb-2 font-bold">{box.label}:</div>
                      <div className="text-slate-800 font-bold text-sm">{box.value}</div>
                      <div
                        className={`w-full h-1 mt-3 rounded-full ${
                          box.color === "green"
                            ? "bg-gradient-to-r from-green-300 to-green-500"
                            : box.color === "blue"
                              ? "bg-gradient-to-r from-blue-300 to-blue-500"
                              : "bg-gradient-to-r from-orange-300 to-orange-500"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                <p className="text-2xl mb-12 font-bold tracking-wide bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent max-w-5xl mx-auto">
                  POWERING THE LED REVOLUTION IN ADVERTISEMENT
                </p>

                {/* CTA removed for minimal hero */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder & Co-Founder Section - Wider Message Boxes */}
      <section className="py-20 px-4 relative z-10">
        <div className="w-full px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            {/* Founder Message - Horizontal Card with Wider Message Box */}
            <div className="h-[450px]">
              {/* Outer Dark Container */}
              <div className="bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-900/80 backdrop-blur-sm p-6 rounded-[3rem] border border-slate-600/30 shadow-2xl shadow-black/50 h-full">
                {/* Inner Light Container */}
                <div className="bg-gradient-to-br from-blue-50/95 via-white/95 to-blue-100/95 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-blue-200/50 shadow-2xl shadow-blue-500/20 h-full flex flex-col text-slate-800 relative">
                  <Badge className="mb-6 bg-gradient-to-r from-blue-100/80 to-blue-50/80 border-2 border-blue-300/50 text-blue-700 font-bold px-6 py-2 rounded-full self-start">
                    FOUNDER
                  </Badge>

                  <div className="flex-1 grid grid-cols-5 gap-8 items-center">
                    {/* Left: Name with Status Indicator (2 columns) */}
                    <div className="col-span-2 flex flex-col justify-end h-full pb-8">
                      <h2 className="text-6xl font-black tracking-tight bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent mb-4">
                        ONE
                      </h2>
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg shadow-green-400/30">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    {/* Right: Wider Rectangular Message Box (3 columns) */}
                    <div className="col-span-3 bg-gradient-to-br from-blue-50/80 to-white/80 p-8 rounded-lg border border-blue-100/50 shadow-lg shadow-blue-100/30 h-full flex flex-col justify-center overflow-hidden">
                      <div className="text-blue-600 text-xs mb-6 font-bold flex items-center">
                        <Activity className="w-3 h-3 mr-1" />
                        SYSTEM MESSAGE
                      </div>
                      <div className="space-y-4 text-left flex-1 flex flex-col justify-center">
                        <p className="font-semibold text-slate-700 leading-relaxed text-sm">
                          "The hj."
                        </p>
                        <p className="font-semibold text-slate-700 leading-relaxed text-sm">
                          "Excellence demands a platform. Innovation requires vision. Indigma Ventures is both."
                        </p>
                      </div>
                      <div className="mt-6 text-blue-600 font-bold text-xs">— FOUNDER & VISIONARY</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Co-Founder Section - Horizontal Card with Wider Message Box */}
            <div className="h-[450px]">
              {/* Outer Dark Container */}
              <div className="bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-900/80 backdrop-blur-sm p-6 rounded-[3rem] border border-slate-600/30 shadow-2xl shadow-black/50 h-full">
                {/* Inner Light Container */}
                <div className="bg-gradient-to-br from-blue-50/95 via-white/95 to-blue-100/95 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-blue-200/50 shadow-2xl shadow-blue-500/20 h-full flex flex-col text-slate-800 relative">
                  <Badge className="mb-6 bg-gradient-to-r from-purple-100/80 to-purple-50/80 border-2 border-purple-300/50 text-purple-700 font-bold px-6 py-2 rounded-full self-start">
                    CO-FOUNDER
                  </Badge>

                  <div className="flex-1 grid grid-cols-5 gap-8 items-center">
                    {/* Left: Name with Status Indicator (2 columns) */}
                    <div className="col-span-2 flex flex-col justify-end h-full pb-8">
                      <h2 className="text-6xl font-black tracking-tight bg-gradient-to-r from-slate-700 to-purple-700 bg-clip-text text-transparent mb-4">
                        PREET
                      </h2>
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg shadow-purple-400/30">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    {/* Right: Wider Rectangular Message Box (3 columns) */}
                    <div className="col-span-3 bg-gradient-to-br from-purple-50/80 to-white/80 p-8 rounded-lg border border-purple-100/50 shadow-lg shadow-purple-100/30 h-full flex flex-col justify-center overflow-hidden">
                      <div className="text-purple-600 text-xs mb-6 font-bold flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        SYSTEM MESSAGE
                      </div>
                      <div className="space-y-4 text-left flex-1 flex flex-col justify-center">
                        <p className="font-semibold text-slate-700 leading-relaxed text-sm">
                          "jsddsdgy. Every projedsdfsfto
                          redefine what's possible."
                        </p>
                        <p className="font-semibold text-slate-700 leading-relaxed text-sm">
                          "Building the future requires both vision and execution. We deliver both with precision."
                        </p>
                      </div>
                      <div className="mt-6 text-purple-600 font-bold text-xs">— CO-FOUNDER & STRATEGIST</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advertisement Solutions - Dynamic Frame Layout */}
      <section className="py-20 px-4 relative z-10">
        <div className="w-full px-8">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-900/80 backdrop-blur-sm p-4 rounded-[3rem] border border-slate-600/30 shadow-2xl shadow-black/50 mb-8">
              <div className="bg-gradient-to-br from-blue-50/95 via-white/95 to-blue-100/95 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-blue-200/50 shadow-2xl shadow-blue-500/20 text-slate-800">
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight bg-gradient-to-r from-slate-700 via-blue-700 to-slate-600 bg-clip-text text-transparent">
                  ADVERTISEMENT SOLUTIONS
                </h2>
                <div className="w-full h-2 bg-gradient-to-r from-blue-300 via-blue-500 via-blue-400 to-blue-300 mb-4 rounded-full shadow-inner" />
                <p className="text-lg font-bold tracking-wide max-w-4xl mx-auto bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent">
                  Pioneering LED Revolution Across India with Precision and Innovation
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-900/80 backdrop-blur-sm p-3 rounded-[2.5rem] border border-slate-600/30 shadow-2xl shadow-black/50">
            <div className="bg-gradient-to-br from-blue-50/95 via-white/95 to-blue-100/95 backdrop-blur-2xl text-slate-800 border-2 border-blue-200/50 p-4 rounded-[2rem]">
              <div className="h-[720px] w-full">
                <DynamicFrameLayoutComplete />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Updated Inside Colors and Mini Icons */}
      <section className="py-32 px-4 relative z-10">
        <div className="w-full px-8 text-center">
          {/* Outer Dark Container */}
          <div className="bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90 backdrop-blur-sm p-8 rounded-[4rem] border border-slate-600/30 shadow-2xl shadow-black/50">
            {/* Inner Light Container - light theme to contrast dark outer */}
            <div className="bg-gradient-to-br from-slate-50/95 via-white/95 to-slate-100/95 backdrop-blur-2xl p-16 rounded-[3rem] border border-slate-200/60 shadow-xl shadow-slate-900/10">
              <h2 className="text-5xl md:text-6xl font-black mb-16 tracking-tight text-black font-simple text-stroke">CONNECT WITH US</h2>

              {/* Contact Cards Container */}
              <div className="bg-gradient-to-br from-slate-200/50 via-white/60 to-slate-200/50 backdrop-blur-sm p-6 rounded-[3rem] border border-slate-300/50 shadow-xl shadow-black/10 mb-16">
                <Card className="bg-gradient-to-br from-slate-50/95 via-white/95 to-slate-100/95 backdrop-blur-xl text-slate-800 border-2 border-slate-200/60 p-12 rounded-[2.5rem] shadow-2xl shadow-slate-900/10">
                  <div className="grid md:grid-cols-4 gap-8">
                    <div className="bg-gradient-to-br from-slate-100/80 to-white/80 border border-slate-200/50 p-8 rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-lg shadow-slate-100/30">
                      <Mail className="h-10 w-10 text-slate-600 mb-4 mx-auto" />
                      <div className="text-slate-600 text-xs font-bold mb-2"> EMAIL:</div>
                      <span className="font-bold text-sm text-slate-700">Preet@indigma.in</span>
                    </div>
                    <div className="bg-gradient-to-br from-slate-100/80 to-white/80 border border-slate-200/50 p-8 rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-lg shadow-slate-100/30">
                      <Mail className="h-10 w-10 text-slate-600 mb-4 mx-auto" />
                      <div className="text-slate-600 text-xs font-bold mb-2">CO-FOUNDER EMAIL:</div>
                      <span className="font-bold text-sm text-slate-700">Preet@indigma.in</span>
                    </div>
                    <div className="bg-gradient-to-br from-slate-100/80 to-white/80 border border-slate-200/50 p-8 rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-lg shadow-slate-100/30">
                      <Phone className="h-10 w-10 text-slate-600 mb-4 mx-auto" />
                      <div className="text-slate-600 text-xs font-bold mb-2">PHONE:</div>
                      <span className="font-bold text-sm text-slate-700">+91 7426838488</span>
                    </div>
                    <div className="bg-gradient-to-br from-slate-100/80 to-white/80 border border-slate-200/50 p-8 rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-lg shadow-slate-100/30">
                      <MapPin className="h-10 w-10 text-slate-600 mb-4 mx-auto" />
                      <div className="text-slate-600 text-xs font-bold mb-2">LOCATION:</div>
                      <span className="text-slate-700 font-bold text-sm">Indigma Ventures, Udaipur, Rajasthan</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Embedded Footer-like Box */}
              <div className="mt-16">
                <div className="bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-900/80 backdrop-blur-sm p-6 rounded-[3rem] border border-slate-600/30 shadow-2xl shadow-black/50">
                  <div className="bg-gradient-to-br from-blue-50/95 via-white/95 to-blue-100/95 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-blue-200/50 shadow-xl shadow-blue-100/30 text-slate-800">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <p className="font-black text-2xl mb-2 text-stroke text-slate-900 font-simple">
                          © 2024 INDIGMA VENTURES
                        </p>
                        <p className="text-blue-600 font-bold font-simple">Illuminating the future of advertising</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-600 font-bold text-lg font-simple">PROUDLY MADE IN INDIA</p>
                        <div className="w-full h-3 bg-gradient-to-r from-orange-400 via-white via-green-400 to-orange-400 mt-3 rounded-full shadow-inner" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
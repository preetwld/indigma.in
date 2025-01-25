"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

/**
 * LandingPage Component: The main entry point of the page.
 * Contains the Hero Section, Gradient Canvas, and Contact Section.
 */
export default function LandingPage() {
  const [isContactVisible, setIsContactVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Properly typed canvasRef
  const quotes = [
    "Kindness is free. Sprinkle it everywhere.",
    "A kind word is like a spring day.",
    "No act of kindness, no matter how small, is ever wasted.",
    "Kindness is the language which the deaf can hear and the blind can see.",
    "In a world where you can be anything, be kind.",
    "Kind people are the best kind of people.",
    "Do things for people not because of who they are or what they do in return, but because of who you are.",
    "Kindness begins with the understanding that we all struggle.",
    "How beautiful a day can be when kindness touches it.",
    "Carry out a random act of kindness, with no expectation of reward.",
    "A warm smile is the universal language of kindness.",
    "Kindness is a gift everyone can afford to give.",
    "Kindness is seeing the best in others when they cannot see it in themselves.",
    "The world is full of kind people. If you can’t find one, be one.",
    "Kindness is the sunshine in which virtue grows.",
    "No one has ever become poor by giving.",
    "Be somebody who makes everybody feel like a somebody.",
    "Kindness costs nothing, but means everything.",
    "A little thought and a little kindness are often worth more than a great deal of money.",
    "Kindness is a passport that opens doors and fashions friends.",
    "Wherever there is a human being, there is an opportunity for kindness.",
    "Kind hearts are the gardens, kind thoughts are the roots.",
    "Remember there’s no such thing as a small act of kindness.",
    "You cannot do a kindness too soon, for you never know how soon it will be too late.",
    "Kindness is the golden chain by which society is bound together.",
    "To kindness and love, the things we need most.",
    "A single act of kindness throws out roots in all directions.",
    "Kindness makes you the most beautiful person in the world.",
    "Be the reason someone smiles today.",
    "Kindness is the key that unlocks the door of happiness."
  ];

  // Handles scroll visibility for the contact section
  useScrollEffect(setIsContactVisible);

  // Sets up the animated gradient and grid-based quote placement
  useGradientCanvas(canvasRef, quotes);

  return (
    <main className="relative">
      <HeroSection />
      <ContactSection isVisible={isContactVisible} canvasRef={canvasRef} />
    </main>
  );
}

/**
 * Custom Hook: Adds scroll listener to toggle visibility for the contact section.
 */
function useScrollEffect(setIsVisible: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show contact section when scrolled halfway through the viewport
      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsVisible]);
}

/**
 * Custom Hook: Manages gradient canvas animation, cursor effect, and grid-based quote placement.
 */
function useGradientCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  quotes: string[]
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number | null = null;
    const gradientShift = { value: 0 }; // Controls gradient movement
    const cursor = { x: -1000, y: -1000 }; // Cursor starts offscreen
    const quotePositions: { text: string; x: number; y: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Define grid dimensions
      const rows = 5; // Number of rows
      const cols = 5; // Number of columns
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      // Clear previous positions
      quotePositions.length = 0;

      let quoteIndex = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (quoteIndex >= quotes.length) break; // Stop if we've placed all quotes

          // Calculate random position within the current grid cell
          const x = col * cellWidth + Math.random() * cellWidth * 0.8;
          const y = row * cellHeight + Math.random() * cellHeight * 0.8;

          // Skip placing quotes inside the contact box
          const contactBox = canvas.getBoundingClientRect();
          const contactMargin = 150; // Buffer zone for the contact section
          if (
            y > canvas.height - contactMargin // Exclude bottom area
          ) {
            continue;
          }

          // Add quote position
          quotePositions.push({ text: quotes[quoteIndex], x, y });
          quoteIndex++;
        }
      }
    };

    // Update canvas size on window resize
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse movements
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = event.clientX - rect.left;
      cursor.y = event.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Draw gradient, disruption effect, and grid-based quotes
    const drawGradient = () => {
      const w = canvas.width;
      const h = canvas.height;

      gradientShift.value += 0.01; // Gradient animation speed

      // Linear gradient for background
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, `hsl(${(gradientShift.value * 50) % 360}, 80%, 90%)`);
      gradient.addColorStop(1, `hsl(${((gradientShift.value + 2) * 50) % 360}, 70%, 85%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Draw quotes in their grid positions
      quotePositions.forEach(({ text, x, y }) => {
        const distance = Math.sqrt(
          Math.pow(cursor.x - x, 2) + Math.pow(cursor.y - y, 2)
        );
        const opacity = Math.max(0.5, 1 - distance / 150); // Closer quotes are brighter

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.font = "16px Arial";
        ctx.fillText(text, x, y);
      });
    };

    // Animation loop
    const animate = () => {
      drawGradient();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasRef, quotes]);
}

/**
 * HeroSection Component: Displays the hero section with title and call-to-action.
 */
function HeroSection() {
  return (
    <section
      className="h-screen relative flex items-center justify-center"
      style={{
        backgroundImage: 'url("images/chill-guy-wallpapers-i-made-v0-gmi69xqd0t4e1.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute top-1/4 w-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Indigma</h1>
        <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
          Chill guy is very lazy, Please motivate him to build this!
        </p>
        <Button
          className="text-lg px-8 py-6"
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Get in Touch
        </Button>
      </div>
    </section>
  );
}

/**
 * ContactSection Component: Displays the contact section with social links and email.
 */
function ContactSection({
  isVisible,
  canvasRef,
}: {
  isVisible: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  return (
    <section
      id="contact"
      className={`min-h-screen relative flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />

      <div className="max-w-lg w-full p-8 bg-white/90 rounded-lg shadow-lg">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
          <p className="text-gray-600">
            &quot;We&apos;d love to hear from you. Feel free to reach out!&quot;
          </p>
          <Button
            className="text-lg px-8 py-4 border border-black bg-black text-white hover:bg-gray-800"
            onClick={() => (window.location.href = "mailto:preet@indigma.in")}
          >
            Email: Preet@indigma.in
          </Button>
          <div className="flex items-center gap-4 pt-4">
            <SocialButton
              href="https://instagram.com/preet.wld/"
              label="Instagram"
              icon="/instagram.svg"
            />
            <SocialButton href="https://x.com/p1c1x" label="Twitter/X" icon="/x.svg" />
          </div>
          <p className="text-sm text-gray-500">Kind people are always beautiful, be kind.</p>
        </div>
      </div>
    </section>
  );
}

function SocialButton({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="rounded-full hover:scale-110 transition-transform"
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <img src={icon} alt={label} className="w-5 h-5" />
      </a>
    </Button>
  );
}

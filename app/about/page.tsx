"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="h-screen overflow-hidden bg-background grid-bg flex flex-col">
      <nav className="bg-primary wavy-lace shadow-lg flex-shrink-0">
        <div className="container mx-auto px-6 py-2 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary-foreground" />
              <div>
                <h1
                  className="text-xl font-bold tracking-wide text-primary-foreground"
                  style={{ fontFamily: "var(--font-pacifico)" }}
                >
                  萌萌茶屋
                </h1>
                <p className="text-[10px] text-primary-foreground/80 tracking-widest">MOE MOE TEA HOUSE</p>
              </div>
            </div>
            <div className="flex gap-6">
              <Link
                href="/"
                className="text-primary-foreground hover:text-primary-foreground/80 transition-all font-medium tracking-wide text-base"
              >
                首頁
              </Link>
              <Link
                href="/menu"
                className="text-primary-foreground hover:text-primary-foreground/80 transition-all font-medium tracking-wide text-base"
              >
                菜單
              </Link>
              <Link
                href="/drinks"
                className="text-primary-foreground hover:text-primary-foreground/80 transition-all font-medium tracking-wide text-base"
              >
                飲品
              </Link>
              <Link
                href="/recipes"
                className="text-primary-foreground hover:text-primary-foreground/80 transition-all font-medium tracking-wide text-base"
              >
                食譜
              </Link>
              <Link
                href="/about"
                className="text-primary-foreground hover:text-primary-foreground/80 transition-all font-medium tracking-wide text-base"
              >
                關於我們
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="flex-1 overflow-y-auto px-6 py-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6">
            <div className="inline-block cute-card px-8 py-4 mb-3">
              <Heart className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="text-xs tracking-widest text-secondary font-bold mb-1">ABOUT US</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-primary"
                style={{ fontFamily: "var(--font-pacifico)" }}
              >
                關於我們
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="cute-border rounded-3xl overflow-hidden">
              <img
                src="/cute-japanese-tea-house-interior-with-matcha.jpg"
                alt="店主"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative">
              <div className="cute-card p-6 relative">
                <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-r-[20px] border-r-primary"></div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-primary" style={{ fontFamily: "var(--font-pacifico)" }}>
                      店主的話
                    </h3>
                  </div>

                  <p className="text-base text-foreground/90 leading-relaxed">
                    💖 歡迎光臨主人！我是萌萌茶屋的店主，很高興能為您服務 ✨
                  </p>

                  <p className="text-sm text-foreground/80 leading-relaxed">
                    自2015年創立以來，我們始終堅持使用日本進口的頂級茶葉與新鮮食材。每一杯茶飲、每一份和菓子都是用心手作，讓您品嚐到最道地的日式風味。
                  </p>

                  <p className="text-sm text-foreground/80 leading-relaxed">
                    在這裡，我們不只是提供茶飲與甜點，更希望為您帶來日式的溫暖與療癒。就像在日本的喫茶店一樣，讓您在忙碌的生活中找到片刻的寧靜與放鬆
                    💕
                  </p>

                  <p className="text-base text-primary font-bold mt-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    歡迎來到萌萌茶屋，讓我為您沖泡一杯溫暖的日式好茶！
                  </p>
                </div>
              </div>

              <div className="text-center mt-4">
                <Button
                  asChild
                  className="retro-gradient hover:scale-110 text-primary-foreground transition-all px-8 py-4 text-base font-bold tracking-wide rounded-full cute-border"
                >
                  <Link href="/">
                    <Sparkles className="w-4 h-4 mr-2" />
                    回到首頁
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

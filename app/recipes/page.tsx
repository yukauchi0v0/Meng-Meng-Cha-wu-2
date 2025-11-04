"use client"

import type React from "react"

import Link from "next/link"
import { Heart, Sparkles, Trash2, ShoppingCart, Plus, X } from "lucide-react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const foodItems = [
  { id: 1, name: "草莓大福", image: "/ichigo-daifuku-strawberry-mochi-japanese-sweet.jpg", category: "和菓子" },
  { id: 2, name: "抹茶蛋糕", image: "/matcha-green-tea-roll-cake-japanese.jpg", category: "和菓子" },
  { id: 3, name: "銅鑼燒", image: "/dorayaki-japanese-red-bean-pancake.jpg", category: "和菓子" },
  { id: 4, name: "櫻花麻糬", image: "/sakura-mochi-pink-cherry-blossom-japanese.jpg", category: "和菓子" },
  { id: 5, name: "抹茶提拉米蘇", image: "/matcha-tiramisu-dessert.jpg", category: "和菓子" },
  { id: 6, name: "水果大福", image: "/mango-mille-crepe-cake.jpg", category: "和菓子" },
  { id: 7, name: "抹茶拿鐵", image: "/matcha-latte-in-cute-japanese-cup.jpg", category: "茶飲" },
  { id: 8, name: "櫻花奶茶", image: "/sakura-cherry-blossom-milk-tea-pink.jpg", category: "茶飲" },
  { id: 9, name: "焙茶歐蕾", image: "/hojicha-roasted-green-tea-latte.jpg", category: "茶飲" },
  { id: 10, name: "柚子蜂蜜茶", image: "/yuzu-citrus-honey-tea-japanese.jpg", category: "茶飲" },
]

interface PlateItem {
  id: number
  foodId: number
  name: string
  image: string
  x: number
  y: number
}

export default function RecipesPage() {
  const [plateItems, setPlateItems] = useState<PlateItem[]>([])
  const [nextId, setNextId] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>("全部")
  const [draggingId, setDraggingId] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const plateRef = useRef<HTMLDivElement>(null)

  const addToPlate = (food: (typeof foodItems)[0]) => {
    const randomX = Math.random() * 60 - 30 // -30% to 30%
    const randomY = Math.random() * 60 - 30
    const newItem: PlateItem = {
      id: nextId,
      foodId: food.id,
      name: food.name,
      image: food.image,
      x: randomX,
      y: randomY,
    }
    setPlateItems([...plateItems, newItem])
    setNextId(nextId + 1)
  }

  const removeFromPlate = (id: number) => {
    setPlateItems(plateItems.filter((item) => item.id !== id))
  }

  const clearPlate = () => {
    setPlateItems([])
  }

  const handleMouseDown = (e: React.MouseEvent, item: PlateItem) => {
    e.preventDefault()
    if (!plateRef.current) return

    const plateRect = plateRef.current.getBoundingClientRect()
    const plateRadius = plateRect.width / 2

    // Calculate current position in pixels
    const currentX = plateRadius + (item.x / 100) * plateRadius
    const currentY = plateRadius + (item.y / 100) * plateRadius

    // Calculate offset from mouse to item center
    const offsetX = e.clientX - (plateRect.left + currentX)
    const offsetY = e.clientY - (plateRect.top + currentY)

    setDraggingId(item.id)
    setDragOffset({ x: offsetX, y: offsetY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingId === null || !plateRef.current) return

    const plateRect = plateRef.current.getBoundingClientRect()
    const plateRadius = plateRect.width / 2

    // Calculate new position relative to plate center
    const mouseX = e.clientX - plateRect.left - dragOffset.x
    const mouseY = e.clientY - plateRect.top - dragOffset.y

    // Convert to percentage offset from center
    const percentX = ((mouseX - plateRadius) / plateRadius) * 100
    const percentY = ((mouseY - plateRadius) / plateRadius) * 100

    // Limit to plate boundaries (keep within ~80% of radius)
    const maxPercent = 60
    const clampedX = Math.max(-maxPercent, Math.min(maxPercent, percentX))
    const clampedY = Math.max(-maxPercent, Math.min(maxPercent, percentY))

    setPlateItems((items) =>
      items.map((item) => (item.id === draggingId ? { ...item, x: clampedX, y: clampedY } : item)),
    )
  }

  const handleMouseUp = () => {
    setDraggingId(null)
  }

  const filteredFoods =
    selectedCategory === "全部" ? foodItems : foodItems.filter((food) => food.category === selectedCategory)

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

      <section className="flex-1 overflow-y-auto px-4 py-4 bg-muted/50 diagonal-lines">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-4">
            <div className="inline-block bg-accent/20 border-4 border-accent rounded-3xl px-8 py-3 mb-2">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-accent" />
                <Sparkles className="w-4 h-4 text-accent" />
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold text-primary"
                style={{ fontFamily: "var(--font-pacifico)" }}
              >
                客製化你的和風時光
              </h2>
              <p className="text-[10px] tracking-widest text-secondary font-bold mt-1">CUSTOMIZE YOUR JAPANESE TIME</p>
            </div>
            <p className="text-sm text-foreground/80">點擊食物加入盤子，拖曳移動位置！✨</p>
          </div>

          <div className="flex gap-4">
            <div className="w-[450px] flex-shrink-0">
              <div className="bg-card rounded-2xl border-4 border-primary p-4 shadow-lg flex flex-col items-center justify-center h-full">
                <div
                  ref={plateRef}
                  className="relative w-[380px] h-[380px] bg-background rounded-full border-8 border-secondary shadow-2xl flex items-center justify-center cursor-default"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div className="absolute inset-6 rounded-full border-4 border-secondary/30"></div>

                  {plateItems.length === 0 ? (
                    <div className="text-center text-muted-foreground pointer-events-none">
                      <Sparkles className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p className="text-base">盤子是空的</p>
                      <p className="text-xs">從右邊選擇食物吧！</p>
                    </div>
                  ) : (
                    plateItems.map((item) => (
                      <div
                        key={item.id}
                        className={`absolute group ${draggingId === item.id ? "cursor-grabbing z-50" : "cursor-grab"}`}
                        style={{
                          left: `calc(50% + ${item.x}%)`,
                          top: `calc(50% + ${item.y}%)`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onMouseDown={(e) => handleMouseDown(e, item)}
                      >
                        <div
                          className={`relative w-20 h-20 rounded-full overflow-hidden border-3 border-white shadow-lg transition-transform ${
                            draggingId === item.id ? "scale-110" : "group-hover:scale-105"
                          }`}
                        >
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <button
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFromPlate(item.id)
                          }}
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <p className="mt-3 text-base font-medium text-foreground">
                  盤子上有 <span className="text-primary font-bold text-xl">{plateItems.length}</span> 個食物
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="bg-card rounded-2xl border-4 border-primary p-4 shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-3 text-center border-b-2 border-primary pb-2">
                  選擇食物
                </h3>

                <div className="flex gap-2 mb-3">
                  {["全部", "和菓子", "茶飲"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {filteredFoods.map((food) => (
                    <button
                      key={food.id}
                      onClick={() => addToPlate(food)}
                      className="bg-background rounded-xl border-2 border-secondary p-2 hover:border-accent hover:shadow-lg transition-all group"
                    >
                      <div className="relative w-full h-16 mb-1 rounded-lg overflow-hidden">
                        <Image src={food.image || "/placeholder.svg"} alt={food.name} fill className="object-cover" />
                      </div>
                      <p className="text-[10px] font-medium text-foreground group-hover:text-accent transition-colors">
                        {food.name}
                      </p>
                      <div className="flex items-center justify-center gap-0.5 mt-0.5 text-[10px] text-muted-foreground">
                        <Plus className="w-2.5 h-2.5" />
                        <span>加入</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-card rounded-2xl border-4 border-primary p-3 shadow-lg">
                  <h4 className="text-base font-bold text-primary mb-2 text-center">醬料</h4>
                  <div className="space-y-1.5">
                    <Button className="w-full bg-accent hover:bg-accent/80 text-white py-1.5 rounded-xl text-xs">
                      蜂蜜醬
                    </Button>
                    <Button className="w-full bg-accent hover:bg-accent/80 text-white py-1.5 rounded-xl text-xs">
                      巧克力醬
                    </Button>
                    <Button className="w-full bg-accent hover:bg-accent/80 text-white py-1.5 rounded-xl text-xs">
                      草莓醬
                    </Button>
                  </div>
                </div>

                <div className="bg-card rounded-2xl border-4 border-primary p-3 shadow-lg">
                  <h4 className="text-base font-bold text-primary mb-2 text-center">購物車</h4>
                  <Button
                    disabled={plateItems.length === 0}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl disabled:opacity-50 text-sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    加入
                  </Button>
                </div>

                <div className="bg-card rounded-2xl border-4 border-primary p-3 shadow-lg">
                  <h4 className="text-base font-bold text-primary mb-2 text-center">清空</h4>
                  <Button
                    onClick={clearPlate}
                    disabled={plateItems.length === 0}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-6 rounded-xl disabled:opacity-50 text-sm"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    清空盤子
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

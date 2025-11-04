"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Star } from "lucide-react"
import { useState, useEffect } from "react"

const drinks = [
  {
    name: "抹茶拿鐵",
    englishName: "Matcha Latte",
    description: "京都宇治抹茶，濃郁香醇",
    price: "¥580",
    image: "/matcha-latte-in-cute-japanese-cup.jpg",
    badge: "人気",
    fullDescription:
      "使用京都宇治的頂級抹茶粉，搭配綿密的奶泡，呈現出抹茶特有的苦甜滋味。每一口都能感受到日本茶道的精緻與優雅，是本店最受歡迎的招牌飲品。",
    ingredients: ["宇治抹茶粉", "鮮奶", "奶泡", "糖漿"],
  },
  {
    name: "櫻花奶茶",
    englishName: "Sakura Milk Tea",
    description: "春日限定，浪漫櫻花香",
    price: "¥620",
    image: "/sakura-cherry-blossom-milk-tea-pink.jpg",
    badge: "New",
    fullDescription:
      "季節限定！使用鹽漬櫻花與紅茶調製而成，帶有淡淡的櫻花香氣與微鹹的口感。粉嫩的色澤如同春日盛開的櫻花，讓人彷彿置身於櫻花樹下。",
    ingredients: ["鹽漬櫻花", "紅茶", "鮮奶", "櫻花糖漿"],
  },
  {
    name: "焙茶歐蕾",
    englishName: "Hojicha Latte",
    description: "香濃焙茶，溫暖療癒",
    price: "¥550",
    image: "/hojicha-roasted-green-tea-latte.jpg",
    fullDescription:
      "使用日本焙茶製作，帶有獨特的烘焙香氣，口感溫潤不苦澀。搭配香濃鮮奶，是寒冷天氣的最佳選擇，讓人感到溫暖與放鬆。",
    ingredients: ["焙茶", "鮮奶", "黑糖", "奶泡"],
  },
  {
    name: "柚子蜂蜜茶",
    englishName: "Yuzu Honey Tea",
    description: "清新柚香，酸甜可口",
    price: "¥580",
    image: "/yuzu-citrus-honey-tea-japanese.jpg",
    badge: "限定",
    fullDescription:
      "使用日本柚子與天然蜂蜜調製，酸甜適中的口感讓人一喝就愛上。富含維生素C，美味又健康，是女孩們的最愛。",
    ingredients: ["日本柚子", "天然蜂蜜", "綠茶", "冰塊"],
  },
  {
    name: "黑糖珍珠奶茶",
    englishName: "Brown Sugar Boba Tea",
    description: "手工珍珠，香甜濃郁",
    price: "¥600",
    image: "/brown-sugar-boba-milk-tea-japanese-style.jpg",
    fullDescription:
      "使用手工製作的黑糖珍珠，Q彈有嚼勁。搭配香濃的鮮奶與紅茶，黑糖的焦香與茶香完美融合，每一口都是滿滿的幸福感。",
    ingredients: ["手工黑糖珍珠", "紅茶", "鮮奶", "黑糖漿"],
  },
  {
    name: "白桃烏龍茶",
    englishName: "White Peach Oolong",
    description: "果香茶韻，清爽怡人",
    price: "¥590",
    image: "/white-peach-oolong-tea-japanese.jpg",
    fullDescription:
      "精選台灣高山烏龍茶搭配日本白桃果肉，茶香與果香交織，清爽不膩。白桃的香甜與烏龍茶的韻味完美結合，是夏日的最佳選擇。",
    ingredients: ["烏龍茶", "白桃果肉", "白桃糖漿", "冰塊"],
  },
]

const allRecipes = [
  {
    name: "經典檸檬水",
    englishName: "Classic Lemonade",
    description: "清爽解渴的經典夏日飲品",
    prepTime: "10 分鐘",
    servings: "4 人份",
    image: "/fresh-lemonade-in-a-pitcher-with-lemon-slices.jpg",
    ingredients: ["6 顆新鮮檸檬", "1 杯白糖", "6 杯冷水", "冰塊適量", "薄荷葉裝飾"],
    instructions: [
      "將檸檬榨汁，約需 1 杯檸檬汁",
      "在大水壺中混合檸檬汁和糖",
      "加入冷水攪拌至糖完全溶解",
      "加入冰塊，用薄荷葉裝飾即可享用",
    ],
  },
  {
    name: "蜂蜜薑茶冰飲",
    englishName: "Honey Ginger Iced Tea",
    description: "健康養生的清涼飲品",
    prepTime: "15 分鐘",
    servings: "4 人份",
    image: "/iced-ginger-tea-with-honey-in-glasses.jpg",
    ingredients: ["4 杯水", "2 英寸新鮮薑片", "3 個紅茶包", "3 湯匙蜂蜜", "檸檬片裝飾"],
    instructions: [
      "將水煮沸，加入薑片煮 5 分鐘",
      "關火後加入茶包，浸泡 5 分鐘",
      "取出茶包和薑片，加入蜂蜜攪拌",
      "冷卻後加冰塊，用檸檬片裝飾",
    ],
  },
  {
    name: "草莓奇亞籽飲",
    englishName: "Strawberry Chia Drink",
    description: "營養豐富的健康飲品",
    prepTime: "5 分鐘 + 浸泡時間",
    servings: "2 人份",
    image: "/strawberry-chia-seed-drink-in-glass-jars.jpg",
    ingredients: ["2 杯新鮮草莓", "2 杯椰奶或杏仁奶", "3 湯匙奇亞籽", "2 湯匙蜂蜜或楓糖漿", "香草精少許"],
    instructions: [
      "將草莓、椰奶、蜂蜜和香草精放入攪拌機",
      "攪拌至順滑",
      "倒入容器中，加入奇亞籽攪拌均勻",
      "冷藏至少 2 小時讓奇亞籽膨脹後享用",
    ],
  },
  {
    name: "黃瓜薄荷水",
    englishName: "Cucumber Mint Water",
    description: "清新排毒的健康飲品",
    prepTime: "5 分鐘",
    servings: "6 人份",
    image: "/cucumber-mint-infused-water-in-a-glass-pitcher.jpg",
    ingredients: ["1 條黃瓜切片", "10 片新鮮薄荷葉", "2 顆萊姆切片", "8 杯冷水", "冰塊適量"],
    instructions: [
      "將黃瓜片、薄荷葉和萊姆片放入大水壺",
      "加入冷水",
      "冷藏至少 1 小時讓風味融合",
      "加入冰塊即可享用，可重複加水 2-3 次",
    ],
  },
  {
    name: "西瓜薄荷冰沙",
    englishName: "Watermelon Mint Smoothie",
    description: "夏日消暑聖品",
    prepTime: "8 分鐘",
    servings: "3 人份",
    image: "/watermelon-mint-drink-in-a-glass.jpg",
    ingredients: ["4 杯西瓜塊", "10 片薄荷葉", "2 湯匙蜂蜜", "1 杯冰塊", "萊姆汁少許"],
    instructions: [
      "將西瓜塊、薄荷葉和冰塊放入攪拌機",
      "加入蜂蜜和萊姆汁",
      "攪拌至順滑",
      "倒入杯中，用薄荷葉裝飾即可享用",
    ],
  },
  {
    name: "熱帶水果冰沙",
    englishName: "Tropical Fruit Smoothie",
    description: "充滿陽光的熱帶風味",
    prepTime: "10 分鐘",
    servings: "2 人份",
    image: "/tropical-mango-smoothie-in-a-tall-glass.jpg",
    ingredients: ["1 杯芒果塊", "1 杯鳳梨塊", "1 根香蕉", "1 杯椰奶", "冰塊適量"],
    instructions: ["將所有水果放入攪拌機", "加入椰奶和冰塊", "攪拌至順滑濃稠", "倒入杯中，可用鳳梨片裝飾"],
  },
  {
    name: "藍莓優格冰沙",
    englishName: "Blueberry Yogurt Smoothie",
    description: "抗氧化健康飲品",
    prepTime: "5 分鐘",
    servings: "2 人份",
    image: "/strawberry-chia-seed-drink-in-glass-jars.jpg",
    ingredients: ["2 杯新鮮藍莓", "1 杯希臘優格", "1 根香蕉", "2 湯匙蜂蜜", "半杯牛奶"],
    instructions: ["將藍莓、優格、香蕉放入攪拌機", "加入蜂蜜和牛奶", "攪拌至順滑", "倒入杯中即可享用"],
  },
  {
    name: "抹茶拿鐵",
    englishName: "Matcha Latte",
    description: "日式經典飲品",
    prepTime: "8 分鐘",
    servings: "2 人份",
    image: "/lime-green-tea-refreshing-drink.jpg",
    ingredients: ["2 茶匙抹茶粉", "2 杯牛奶", "2 湯匙糖", "熱水少許", "冰塊"],
    instructions: [
      "用少許熱水將抹茶粉調成糊狀",
      "加入糖攪拌均勻",
      "將牛奶加熱或使用冷牛奶",
      "將抹茶糊倒入杯中，加入牛奶和冰塊攪拌",
    ],
  },
  {
    name: "蜜桃冰茶",
    englishName: "Peach Iced Tea",
    description: "甜美果香茶飲",
    prepTime: "12 分鐘",
    servings: "4 人份",
    image: "/passion-fruit-drink-with-ice.jpg",
    ingredients: ["3 個紅茶包", "2 顆新鮮蜜桃", "3 湯匙蜂蜜", "4 杯水", "冰塊"],
    instructions: [
      "將水煮沸，加入茶包浸泡 5 分鐘",
      "蜜桃切片，一半放入茶中",
      "加入蜂蜜攪拌至溶解",
      "冷卻後加冰塊，用蜜桃片裝飾",
    ],
  },
  {
    name: "椰子水果冰沙",
    englishName: "Coconut Fruit Smoothie",
    description: "清爽椰香飲品",
    prepTime: "7 分鐘",
    servings: "2 人份",
    image: "/tropical-mango-smoothie-in-a-tall-glass.jpg",
    ingredients: ["1 杯椰子水", "1 杯鳳梨塊", "半杯芒果塊", "1 根香蕉", "冰塊"],
    instructions: ["將所有水果放入攪拌機", "加入椰子水和冰塊", "攪拌至順滑", "倒入杯中即可享用"],
  },
  {
    name: "紅石榴氣泡飲",
    englishName: "Pomegranate Sparkler",
    description: "華麗氣泡飲品",
    prepTime: "5 分鐘",
    servings: "2 人份",
    image: "/strawberry-yogurt-drink.jpg",
    ingredients: ["1 杯紅石榴汁", "2 杯氣泡水", "2 湯匙檸檬汁", "薄荷葉", "冰塊"],
    instructions: ["在杯中加入冰塊", "倒入紅石榴汁和檸檬汁", "加入氣泡水輕輕攪拌", "用薄荷葉裝飾即可享用"],
  },
  {
    name: "奇異果冰沙",
    englishName: "Kiwi Smoothie",
    description: "酸甜維C飲品",
    prepTime: "6 分鐘",
    servings: "2 人份",
    image: "/lime-green-tea-refreshing-drink.jpg",
    ingredients: ["4 顆奇異果", "1 根香蕉", "1 杯蘋果汁", "1 湯匙蜂蜜", "冰塊"],
    instructions: ["奇異果去皮切塊", "將奇異果、香蕉、蘋果汁放入攪拌機", "加入蜂蜜和冰塊", "攪拌至順滑即可享用"],
  },
]

const carouselImages = [
  "/cute-japanese-tea-house-interior-with-matcha.jpg",
  "/japanese-tea-ceremony-cute-aesthetic.jpg",
  "/kawaii-japanese-cafe-drinks-display.jpg",
  "/japanese-desserts-and-tea-cute-presentation.jpg",
  "/cozy-japanese-tea-room-moe-aesthetic.jpg",
]

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedDrink, setSelectedDrink] = useState<(typeof drinks)[0] | null>(null)
  const [currentRecipePage, setCurrentRecipePage] = useState(0)
  const recipesPerPage = 4

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentRecipes = allRecipes.slice(currentRecipePage * recipesPerPage, (currentRecipePage + 1) * recipesPerPage)
  const totalPages = Math.ceil(allRecipes.length / recipesPerPage)

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

      <section className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: currentImageIndex === index ? 1 : 0,
              }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Drink ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
            </div>
          ))}
        </div>

        <div className="absolute top-32 left-20 text-4xl float-animation opacity-50">✨</div>
        <div
          className="absolute bottom-40 right-32 text-4xl float-animation opacity-50"
          style={{ animationDelay: "1s" }}
        >
          💖
        </div>

        <div className="container mx-auto px-6 text-center relative z-10 max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <div className="mb-3">
                <Heart className="w-12 h-12 mx-auto text-primary mb-2 float-animation drop-shadow-2xl" />
              </div>
              <h2
                className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-2xl"
                style={{ fontFamily: "var(--font-pacifico)" }}
              >
                萌萌茶屋
              </h2>
              <div className="h-1 w-32 retro-gradient mx-auto mb-3 rounded-full" />
              <p className="text-xl md:text-2xl text-white mb-2 tracking-widest font-bold drop-shadow-lg">
                MOE MOE TEA HOUSE
              </p>
              <p className="text-lg text-white mb-3 font-medium drop-shadow-lg">歡迎光臨主人！✨</p>
              <p className="text-base text-white mb-4 drop-shadow-lg">一杯日式好茶，療癒您的心靈 💖</p>
              <div className="flex items-center justify-center gap-3 text-sm text-white drop-shadow-lg mb-4">
                <Star className="w-4 h-4" />
                <span>營業時間：11:00 - 21:00</span>
                <span>•</span>
                <span>每日新鮮手作</span>
                <Star className="w-4 h-4" />
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="retro-gradient hover:scale-110 text-white px-10 py-5 text-base shadow-2xl transition-all border-2 border-white/50 font-bold tracking-wide rounded-full"
            >
              <Link href="/menu">
                <Sparkles className="w-5 h-5 mr-2" />
                查看菜單
                <Sparkles className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-background/95 border-t-2 border-primary py-3 flex-shrink-0">
        <div className="container mx-auto px-6 text-center max-w-7xl">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-primary" />
            <p className="font-bold tracking-wide text-foreground text-sm">© 2025 萌萌茶屋 Moe Moe Tea House</p>
            <Heart className="w-4 h-4 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-accent" />
            用心沖泡每一杯 • 傳遞日式溫暖與療癒
            <Sparkles className="w-3 h-3 text-accent" />
          </p>
        </div>
      </footer>
    </div>
  )
}

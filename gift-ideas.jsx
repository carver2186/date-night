import { useState, useMemo } from "react";

const gifts = [
  // TRAVEL
  { id: 1, name: "Personalized Passport Holder", category: "Travel", price: 25, tier: "Under $30", desc: "Monogrammed leather passport wallet — practical and chic for every trip.", occasions: ["Birthday & Anniversary", "Just because"], emoji: "✈️", link: "https://www.etsy.com/search?q=personalized+passport+holder", alreadyGifted: false },
  { id: 2, name: "Packing Cubes Set", category: "Travel", price: 40, tier: "$30–$75", desc: "Color-coded packing cubes to keep her suitcase perfectly organized.", occasions: ["Birthday & Anniversary", "Just because"], emoji: "🧳", link: "https://www.amazon.com/s?k=packing+cubes+set", alreadyGifted: false },
  { id: 3, name: "Scratch-Off World Travel Map", category: "Travel", price: 35, tier: "$30–$75", desc: "A large wall map she can scratch off every country she visits.", occasions: ["Birthday & Anniversary", "Just because", "Mother's Day"], emoji: "🗺️", link: "https://www.amazon.com/s?k=scratch+off+world+map", alreadyGifted: false },
  { id: 4, name: "Noise-Canceling Earbuds", category: "Travel", price: 130, tier: "$75–$150", desc: "Perfect for long flights — she can zone out with podcasts or music in peace.", occasions: ["Birthday & Anniversary"], emoji: "🎧", link: "https://www.amazon.com/s?k=noise+canceling+earbuds", alreadyGifted: false },
  { id: 5, name: "Airbnb or Hotel Gift Card", category: "Travel", price: 150, tier: "$150+", desc: "Let her pick the dream destination. Perfect for a couples getaway or solo retreat.", occasions: ["Birthday & Anniversary", "Mother's Day"], emoji: "🏨", link: "https://www.airbnb.com/giftcards", alreadyGifted: false },
  { id: 6, name: "Weekend Getaway Experience", category: "Travel", price: 300, tier: "$150+", desc: "Plan a surprise overnight trip — a spa resort, beach town, or city she's mentioned.", occasions: ["Birthday & Anniversary", "Mother's Day"], emoji: "🌴", link: "https://www.tripadvisor.com", alreadyGifted: false },
  { id: 7, name: "Travel Jewelry Organizer", category: "Travel", price: 30, tier: "Under $30", desc: "A slim roll-up case to keep her accessories tangle-free on the road.", occasions: ["Just because", "Birthday & Anniversary"], emoji: "💼", link: "https://www.amazon.com/s?k=travel+jewelry+organizer", alreadyGifted: false },

  // FOOD
  { id: 8, name: "Fancy Charcuterie Board Kit", category: "Food", price: 60, tier: "$30–$75", desc: "A beautiful serving board with knives and accessories for hosting nights.", occasions: ["Birthday & Anniversary", "Just because"], emoji: "🧀", link: "https://www.amazon.com/s?k=charcuterie+board+set", alreadyGifted: false },
  { id: 9, name: "Cooking Class Experience", category: "Food", price: 120, tier: "$75–$150", desc: "A hands-on class — Asian fusion, pasta making, or sushi rolling.", occasions: ["Birthday & Anniversary", "Mother's Day"], emoji: "👩‍🍳", link: "https://www.coursehorse.com", alreadyGifted: false },
  { id: 10, name: "Omakase Dinner for Two", category: "Food", price: 250, tier: "$150+", desc: "Book a tasting-menu or omakase experience at a top local restaurant.", occasions: ["Birthday & Anniversary"], emoji: "🍣", link: "https://www.opentable.com", alreadyGifted: false },
  { id: 11, name: "Specialty Tea Collection", category: "Food", price: 45, tier: "$30–$75", desc: "A curated set of premium loose-leaf teas — matcha, oolong, jasmine.", occasions: ["Just because", "Mother's Day"], emoji: "🍵", link: "https://www.amazon.com/s?k=premium+tea+gift+set", alreadyGifted: false },
  { id: 12, name: "Meal Kit Subscription", category: "Food", price: 80, tier: "$75–$150", desc: "A month of HelloFresh or Marley Spoon — fun to cook together as a family.", occasions: ["Just because", "Mother's Day"], emoji: "🥘", link: "https://www.hellofresh.com", alreadyGifted: false },
  { id: 13, name: "Truffle & Fancy Salts Gift Box", category: "Food", price: 40, tier: "$30–$75", desc: "A gourmet set of flavored salts, truffle oil, and specialty spices for the home cook.", occasions: ["Just because", "Birthday & Anniversary"], emoji: "🧂", link: "https://www.amazon.com/s?k=truffle+salt+gift+set", alreadyGifted: false },
  { id: 14, name: "Food Tour Experience", category: "Food", price: 90, tier: "$75–$150", desc: "A guided neighborhood food tour — great for a date day or solo adventure.", occasions: ["Birthday & Anniversary", "Mother's Day"], emoji: "🍜", link: "https://www.airbnb.com/experiences", alreadyGifted: false },
  { id: 15, name: "Bestselling Cookbook", category: "Food", price: 35, tier: "$30–$75", desc: "A beautiful cookbook — Ottolenghi, Hetty Lui McKinnon, or a cuisine she loves.", occasions: ["Just because", "Birthday & Anniversary"], emoji: "📖", link: "https://www.amazon.com/s?k=bestselling+cookbook+2025", alreadyGifted: false },

  // YOGA
  { id: 16, name: "Premium Yoga Mat (Manduka/Lululemon)", category: "Yoga", price: 120, tier: "$75–$150", desc: "An upgrade-worthy mat with superior grip and cushion she'll use for years.", occasions: ["Birthday & Anniversary", "Mother's Day"], emoji: "🧘", link: "https://www.manduka.com", alreadyGifted: false },
  { id: 17, name: "Yoga Bolster & Block Set", category: "Yoga", price: 55, tier: "$30–$75", desc: "Perfect for restorative yoga and deepening stretches at home.", occasions: ["Just because", "Mother's Day"], emoji: "🪨", link: "https://www.amazon.com/s?k=yoga+bolster+block+set", alreadyGifted: false },
  { id: 18, name: "Alo Moves Subscription", category: "Yoga", price: 100, tier: "$75–$150", desc: "A year of premium yoga, meditation & fitness classes she can do anywhere.", occasions: ["Birthday & Anniversary", "Just because"], emoji: "📱", link: "https://www.alomoves.com", alreadyGifted: false },
  { id: 19, name: "Yoga Retreat Day Pass", category: "Yoga", price: 200, tier: "$150+", desc: "A full-day retreat at a local yoga studio — classes, meditation, and healthy lunch.", occasions: ["Birthday & Anniversary", "Mother's Day"], emoji: "🌿", link: "https://www.eventbrite.com/d/online/yoga-retreat/", alreadyGifted: false },
  { id: 20, name: "Meditation Cushion (Zafu)", category: "Yoga", price: 65, tier: "$30–$75", desc: "A beautiful buckwheat-filled zafu cushion to elevate her daily meditation practice.", occasions: ["Just because", "Birthday & Anniversary"], emoji: "🪷", link: "https://www.amazon.com/s?k=meditation+cushion+zafu", alreadyGifted: false },
  { id: 21, name: "Lululemon Leggings", category: "Yoga", price: 128, tier: "$75–$150", desc: "The Align or Swift Speed — she'll live in these on and off the mat.", occasions: ["Birthday & Anniversary", "Mother's Day", "Just because"], emoji: "👖", link: "https://www.lululemon.com", alreadyGifted: false },
  { id: 22, name: "Yoga Wheel", category: "Yoga", price: 38, tier: "$30–$75", desc: "A fun prop for backbends and core work — a fresh addition to her practice.", occasions: ["Just because"], emoji: "⭕", link: "https://www.amazon.com/s?k=yoga+wheel", alreadyGifted: false },

  // DOGS
  { id: 23, name: "Custom Pet Portrait (Painted)", category: "Dogs", price: 80, tier: "$75–$150", desc: "A beautiful hand-illustrated portrait of her dog — frameable wall art.", occasions: ["Birthday & Anniversary", "Mother's Day", "Just because"], emoji: "🎨", link: "https://www.etsy.com/search?q=custom+pet+portrait", alreadyGifted: false },
  { id: 24, name: "Matching Dog Mom Hoodie Set", category: "Dogs", price: 45, tier: "$30–$75", desc: "Matching 'dog mom' sweatshirt + a bandana for the pup. Adorable photos guaranteed.", occasions: ["Mother's Day", "Just because"], emoji: "🐾", link: "https://www.etsy.com/search?q=dog+mom+hoodie", alreadyGifted: false },
  { id: 25, name: "Dog DNA Test Kit", category: "Dogs", price: 90, tier: "$75–$150", desc: "Embark or Wisdom Panel — fun to discover your pup's full breed breakdown.", occasions: ["Just because", "Birthday & Anniversary"], emoji: "🔬", link: "https://embarkvet.com", alreadyGifted: false },
  { id: 26, name: "Luxury Dog Bed or Accessories", category: "Dogs", price: 60, tier: "$30–$75", desc: "A chic linen dog bed, designer collar, or fancy leash set for the beloved pup.", occasions: ["Just because", "Mother's Day"], emoji: "🛏️", link: "https://www.amazon.com/s?k=luxury+dog+bed", alreadyGifted: false },
  { id: 27, name: "Custom Dog Plush (Lookalike)", category: "Dogs", price: 75, tier: "$75–$150", desc: "A stuffed animal made to look exactly like her dog — the 4-year-old will love it too!", occasions: ["Mother's Day", "Birthday & Anniversary"], emoji: "🧸", link: "https://www.etsy.com/search?q=custom+dog+plush+lookalike", alreadyGifted: false },

  // WARMTH / COMFORT
  { id: 28, name: "Cashmere Robe", category: "Comfort", price: 150, tier: "$150+", desc: "Ultra-soft cashmere or bamboo robe — spa-level luxury she'll reach for every morning.", occasions: ["Birthday & Anniversary", "Mother's Day"], emoji: "🌸", link: "https://www.amazon.com/s?k=cashmere+robe+women", alreadyGifted: false },
  { id: 29, name: "Heated Slippers", category: "Comfort", price: 55, tier: "$30–$75", desc: "Electric USB-heated slippers — the coziest upgrade to her morning and evening routine.", occasions: ["Just because", "Birthday & Anniversary"], emoji: "🔥", link: "https://www.amazon.com/s?k=heated+slippers+women", alreadyGifted: false },
  { id: 30, name: "Weighted Blanket", category: "Comfort", price: 75, tier: "$75–$150", desc: "A 15–20 lb weighted blanket for better sleep and serious couch lounging.", occasions: ["Just because", "Birthday & Anniversary"], emoji: "🛌", link: "https://www.amazon.com/s?k=weighted+blanket", alreadyGifted: false },
  { id: 31, name: "Luxury Cozy Socks Set", category: "Comfort", price: 28, tier: "Under $30", desc: "A gift box of cashmere-blend or fluffy sherpa socks in beautiful colors.", occasions: ["Just because", "Mother's Day"], emoji: "🧦", link: "https://www.amazon.com/s?k=luxury+cozy+socks+gift+set", alreadyGifted: false },
  { id: 32, name: "Cashmere Sweater or Wrap", category: "Comfort", price: 180, tier: "$150+", desc: "A soft, timeless cashmere crewneck or wrap she'll wear for years.", occasions: ["Birthday & Anniversary", "Mother's Day"], emoji: "🧣", link: "https://www.amazon.com/s?k=women+cashmere+sweater", alreadyGifted: false },

  // SELF-CARE / WELLNESS
  { id: 33, name: "Spa Day Gift Card", category: "Self-Care", price: 150, tier: "$150+", desc: "A gift card to a local spa for a facial, massage, or full day package.", occasions: ["Birthday & Anniversary", "Mother's Day"], emoji: "💆", link: "https://www.spafinder.com", alreadyGifted: false },
  { id: 34, name: "Gua Sha + Jade Roller Set", category: "Self-Care", price: 30, tier: "Under $30", desc: "An elegant facial massage tool set — part skincare ritual, part self-care.", occasions: ["Just because", "Mother's Day"], emoji: "💎", link: "https://www.amazon.com/s?k=gua+sha+jade+roller+set", alreadyGifted: false },
  { id: 35, name: "Premium Skincare Set", category: "Self-Care", price: 110, tier: "$75–$150", desc: "A curated skincare set — serum, moisturizer, eye cream — from a brand she loves.", occasions: ["Birthday & Anniversary", "Mother's Day"], emoji: "✨", link: "https://www.sephora.com/beauty/skincare-sets", alreadyGifted: false },
  { id: 36, name: "Aromatherapy Diffuser + Oils", category: "Self-Care", price: 45, tier: "$30–$75", desc: "A beautiful ceramic diffuser with a set of essential oils for her yoga space or bedroom.", occasions: ["Just because", "Birthday & Anniversary"], emoji: "🕯️", link: "https://www.amazon.com/s?k=aromatherapy+diffuser+essential+oils+set", alreadyGifted: false },
  { id: 37, name: "Sound Bath or Meditation Class", category: "Self-Care", price: 70, tier: "$30–$75", desc: "Book her into a local sound bath session — deeply restorative and trendy.", occasions: ["Birthday & Anniversary", "Mother's Day", "Just because"], emoji: "🎶", link: "https://www.eventbrite.com/d/online/sound-bath/", alreadyGifted: false },
  { id: 38, name: "Manicure/Pedicure Gift Card", category: "Self-Care", price: 65, tier: "$30–$75", desc: "A gift card to her favorite nail salon — simple, practical, always appreciated.", occasions: ["Just because", "Mother's Day"], emoji: "💅", link: "https://www.google.com/search?q=nail+salon+near+me", alreadyGifted: false },

  // EXPERIENCES
  { id: 39, name: "Concert or Show Tickets", category: "Experiences", price: 150, tier: "$150+", desc: "Tickets to see her favorite artist, a Broadway show, or comedy night.", occasions: ["Birthday & Anniversary", "Just because"], emoji: "🎤", link: "https://www.ticketmaster.com", alreadyGifted: false },
  { id: 40, name: "Pottery Class for Two", category: "Experiences", price: 90, tier: "$75–$150", desc: "A couples pottery class — hands-on, creative, and a great date night activity.", occasions: ["Birthday & Anniversary", "Just because"], emoji: "🏺", link: "https://www.coursehorse.com", alreadyGifted: false },
  { id: 41, name: "Hot Air Balloon Ride", category: "Experiences", price: 280, tier: "$150+", desc: "A once-in-a-lifetime sunrise hot air balloon experience — unforgettable.", occasions: ["Birthday & Anniversary"], emoji: "🎈", link: "https://www.groupon.com/local/hot-air-balloon-ride", alreadyGifted: false },
  { id: 42, name: "Photography Mini Session", category: "Experiences", price: 120, tier: "$75–$150", desc: "A family or mommy-and-me photo session with a local photographer.", occasions: ["Mother's Day", "Birthday & Anniversary"], emoji: "📸", link: "https://www.thumbtack.com/k/photographer/near-me/", alreadyGifted: false },

  // ALREADY GIFTED (for reference)
  { id: 43, name: "Phone Case", category: "Already Gifted", price: 20, tier: "Under $30", desc: "Already given.", occasions: [], emoji: "📱", link: "", alreadyGifted: true },
  { id: 44, name: "Greeting Cards", category: "Already Gifted", price: 5, tier: "Under $30", desc: "Already given.", occasions: [], emoji: "💌", link: "", alreadyGifted: true },
  { id: 45, name: "Photo Coffee Mug", category: "Already Gifted", price: 20, tier: "Under $30", desc: "Already given.", occasions: [], emoji: "☕", link: "", alreadyGifted: true },
  { id: 46, name: "Massage Gun", category: "Already Gifted", price: 80, tier: "$75–$150", desc: "Already given.", occasions: [], emoji: "💪", link: "", alreadyGifted: true },
  { id: 47, name: "Warm Clothing", category: "Already Gifted", price: 50, tier: "$30–$75", desc: "Already given.", occasions: [], emoji: "🧥", link: "", alreadyGifted: true },
  { id: 48, name: "Jewelry", category: "Already Gifted", price: 80, tier: "$75–$150", desc: "Already given (not her fave).", occasions: [], emoji: "💍", link: "", alreadyGifted: true },
];

const CATEGORIES = ["All", "Travel", "Food", "Yoga", "Dogs", "Comfort", "Self-Care", "Experiences"];
const BUDGETS = ["All Budgets", "Under $30", "$30–$75", "$75–$150", "$150+"];
const OCCASIONS = ["All Occasions", "Birthday & Anniversary", "Mother's Day", "Just because"];
const CATEGORY_COLORS = {
  Travel: "bg-sky-100 text-sky-700",
  Food: "bg-orange-100 text-orange-700",
  Yoga: "bg-purple-100 text-purple-700",
  Dogs: "bg-yellow-100 text-yellow-700",
  Comfort: "bg-rose-100 text-rose-700",
  "Self-Care": "bg-pink-100 text-pink-700",
  Experiences: "bg-emerald-100 text-emerald-700",
};

export default function GiftApp() {
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All Budgets");
  const [occasion, setOccasion] = useState("All Occasions");
  const [favorites, setFavorites] = useState(new Set());
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [search, setSearch] = useState("");

  const activeGifts = useMemo(() => {
    return gifts.filter((g) => {
      if (g.alreadyGifted) return false;
      if (showFavOnly && !favorites.has(g.id)) return false;
      if (category !== "All" && g.category !== category) return false;
      if (budget !== "All Budgets" && g.tier !== budget) return false;
      if (occasion !== "All Occasions" && !g.occasions.includes(occasion)) return false;
      if (search && !g.name.toLowerCase().includes(search.toLowerCase()) && !g.desc.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [category, budget, occasion, favorites, showFavOnly, search]);

  const toggleFav = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const surprise = () => {
    const pool = gifts.filter((g) => !g.alreadyGifted);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) {
      setCategory(pick.category);
      setBudget("All Budgets");
      setOccasion("All Occasions");
      setSearch(pick.name);
    }
  };

  const reset = () => {
    setCategory("All");
    setBudget("All Budgets");
    setOccasion("All Occasions");
    setShowFavOnly(false);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 font-sans">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">🎁 Gift Ideas for Her</h1>
            <p className="text-sm text-gray-500 mt-0.5">Travel · Food · Yoga · Dogs · Comfort · Self-Care · Experiences</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={surprise}
              className="px-4 py-2 bg-rose-500 text-white rounded-full text-sm font-medium hover:bg-rose-600 transition"
            >
              🎲 Surprise Me
            </button>
            <button
              onClick={() => setShowFavOnly(!showFavOnly)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border ${showFavOnly ? "bg-yellow-400 text-white border-yellow-400" : "bg-white text-gray-600 border-gray-200 hover:border-yellow-300"}`}
            >
              ⭐ Favorites {favorites.size > 0 && `(${favorites.size})`}
            </button>
            <button onClick={reset} className="px-4 py-2 bg-white border border-gray-200 text-gray-500 rounded-full text-sm hover:bg-gray-50 transition">
              ↺ Reset
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-5xl mx-auto px-4 pt-5 pb-2 space-y-3">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍  Search gifts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
        />
        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition border ${category === c ? "bg-rose-500 text-white border-rose-500" : "bg-white text-gray-600 border-gray-200 hover:border-rose-300"}`}
            >
              {c}
            </button>
          ))}
        </div>
        {/* Budget + Occasion */}
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              onClick={() => setBudget(b)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition border ${budget === b ? "bg-purple-500 text-white border-purple-500" : "bg-white text-gray-600 border-gray-200 hover:border-purple-300"}`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              onClick={() => setOccasion(o)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition border ${occasion === o ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"}`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-5xl mx-auto px-4 py-2 text-sm text-gray-400">
        {activeGifts.length} gift idea{activeGifts.length !== 1 ? "s" : ""} found
      </div>

      {/* Gift Grid */}
      <div className="max-w-5xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeGifts.map((g) => (
          <div key={g.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{g.emoji}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[g.category] || "bg-gray-100 text-gray-600"}`}>
                  {g.category}
                </span>
              </div>
              <button onClick={() => toggleFav(g.id)} className="text-xl leading-none hover:scale-125 transition-transform">
                {favorites.has(g.id) ? "⭐" : "☆"}
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-base leading-snug">{g.name}</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{g.desc}</p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-1">
              <span className="text-sm font-bold text-gray-700">{g.tier}</span>
              {g.link && (
                <a
                  href={g.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-full hover:bg-rose-100 transition font-medium"
                >
                  Shop →
                </a>
              )}
            </div>
          </div>
        ))}
        {activeGifts.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🎁</p>
            <p className="font-medium text-gray-500">No gifts match your filters.</p>
            <button onClick={reset} className="mt-3 text-rose-500 underline text-sm">Clear filters</button>
          </div>
        )}
      </div>

      {/* Already Gifted Section */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <details className="bg-white border border-gray-100 rounded-2xl px-5 py-4">
          <summary className="cursor-pointer text-sm font-semibold text-gray-500 select-none">📦 Already Gifted (avoid repeating these)</summary>
          <div className="mt-3 flex flex-wrap gap-2">
            {gifts.filter((g) => g.alreadyGifted).map((g) => (
              <span key={g.id} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 text-xs px-3 py-1.5 rounded-full line-through">
                {g.emoji} {g.name}
              </span>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { 
  BookOpen, 
  Leaf, 
  ScrollText, 
  Package, 
  ChevronRight, 
  Sparkles,
  Zap,
  ShieldCheck,
  Compass
} from 'lucide-react';

// --- Types ---
interface Herb {
  name: string;
  pinyin: string;
  property: string;
  description: string;
  benefit: string;
  image: string;
}

// --- Data ---
const HERBS: Herb[] = [
  {
    name: "人參",
    pinyin: "Ren Shen",
    property: "微溫",
    description: "被譽為「百草之王」，生長於深山密林，吸取天地精華。",
    benefit: "大補元氣，復脈固脫，補脾益肺。",
    image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "當歸",
    pinyin: "Dang Gui",
    property: "溫",
    description: "其根入藥，因能「使氣血各歸其所」而得名，為婦科聖藥。",
    benefit: "補血活血，調經止痛，潤腸通便。",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "靈芝",
    pinyin: "Ling Zhi",
    property: "平",
    description: "古代傳說中的仙草，象徵長壽與吉祥，具神祕能量。",
    benefit: "補氣安神，止咳平喘，延年益壽。",
    image: "https://images.unsplash.com/photo-1505252585441-24b6f5d8360d?q=80&w=400&auto=format&fit=crop"
  }
];

const COMPONENTS = [
  { name: "保生大帝大地圖", desc: "精美繪製的藥草采擷圖，重現古代尋藥之路。", icon: <Compass className="w-8 h-8 text-[#8C6A45]" /> },
  { name: "保生藥籤卡 (60張)", desc: "根據大龍峒保安宮藥籤文化設計，兼具遊戲功能與歷史考究。", icon: <ScrollText className="w-8 h-8 text-[#8C6A45]" /> },
  { name: "木製藥籤筒", desc: "實體木製工藝，讓玩家體驗最真實的求籤儀式。", icon: <Zap className="w-8 h-8 text-[#8C6A45]" /> },
  { name: "煉丹指示物", desc: "高品質透明琥珀材質，代表玩家在醫道上的修行進度。", icon: <Sparkles className="w-8 h-8 text-[#8C6A45]" /> }
];

// --- Components ---

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-sm border-b-2 border-[#8C6A45]/20 px-6 py-4">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#B22222] rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg">醫</div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-widest text-[#2D3A30] font-serif">解藥籤 · 尋藥香</span>
          <span className="text-[10px] text-[#8C6A45] tracking-tighter uppercase font-bold">Dadaogong Medicine Culture</span>
        </div>
      </div>
      <div className="hidden md:flex space-x-8 text-sm font-bold text-[#8C6A45]">
        <a href="#rules" className="hover:text-[#B22222] transition-colors flex items-center gap-1"><BookOpen className="w-4 h-4" /> 玩法</a>
        <a href="#components" className="hover:text-[#B22222] transition-colors flex items-center gap-1"><Package className="w-4 h-4" /> 配件</a>
        <a href="#oracle" className="hover:text-[#B22222] transition-colors flex items-center gap-1"><ScrollText className="w-4 h-4" /> 求籤</a>
        <a href="#knowledge" className="hover:text-[#B22222] transition-colors flex items-center gap-1"><Leaf className="w-4 h-4" /> 百草</a>
      </div>
    </div>
  </nav>
);

const OracleSection = () => {
  const [loading, setLoading] = useState(false);
  const [oracleResult, setOracleResult] = useState<string | null>(null);

  const drawOracle = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `你是一位精通「保生大帝（大道公）」藥籤文化的民俗專家。現在玩家在玩一款關於中醫藥籤的桌遊。
      請為玩家生成一張神祕的「藥籤」。內容應包含：
      1. 籤名（例如：保生大帝藥籤 第三十六首 · 平安）
      2. 籤詩（七言四句，古風韻味）
      3. 聖意（關於目前的運勢或是遊戲策略建議）
      4. 藥方啟示（提及一兩樣藥材及其對應的身心益處）。
      請用繁體中文，字體排版應有古籍感。`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      
      setOracleResult(response.text || "藥香繞樑，天機隱現。請再次誠心叩問。");
    } catch (error) {
      console.error(error);
      setOracleResult("靈藥尚未炮製完成，大道公指示暫待片刻。請確認 API 金鑰是否正確。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="oracle" className="py-24 px-6 bg-[#4A5D4E] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-wrap gap-20 justify-around items-center">
         {[...Array(8)].map((_, i) => <div key={i} className="text-9xl font-serif text-white rotate-12 select-none">醫</div>)}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold mb-4 text-[#FDFBF7] font-serif tracking-widest">保生求籤：誠心叩問</h2>
        <p className="mb-12 text-lg text-[#FDFBF7]/80 italic font-serif">「萬病回春，一籤定乾坤。」</p>
        
        <div className="bg-[#FDFBF7] p-8 md:p-12 rounded-sm shadow-2xl text-[#2D3A30] min-h-[450px] flex flex-col items-center justify-center border-[12px] border-double border-[#8C6A45] relative">
          <div className="absolute top-4 right-4 seal select-none">保生大帝</div>
          
          {loading ? (
            <div className="flex flex-col items-center space-y-6">
              <div className={`w-24 h-24 flex items-center justify-center animate-shake`}>
                <ScrollText className="w-16 h-16 text-[#B22222]" />
              </div>
              <p className="text-[#8C6A45] font-serif font-bold animate-pulse">正在搖動古木籤筒...</p>
            </div>
          ) : oracleResult ? (
            <div className="animate-fadeIn w-full">
              <div className="mb-4 text-center">
                 <div className="inline-block px-4 py-1 border-2 border-[#B22222] text-[#B22222] font-bold text-lg mb-4 font-serif">
                   大道公藥籤
                 </div>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed text-[#2D3A30] max-w-lg mx-auto font-serif text-lg border-x border-[#8C6A45]/20 px-8 py-4 bg-white/50">
                {oracleResult}
              </div>
              <button 
                onClick={() => setOracleResult(null)}
                className="mt-10 px-8 py-3 bg-[#8C6A45] text-white rounded-sm font-serif hover:bg-[#2D3A30] transition-colors border-b-4 border-[#5D462E]"
              >
                謝過大道公，再次求籤
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="w-32 h-32 bg-[#8C6A45]/5 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#8C6A45]/30">
                <div className="p-4 border-2 border-dashed border-[#8C6A45] rounded-full">
                  <ScrollText className="w-16 h-16 text-[#8C6A45]" />
                </div>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={drawOracle}
                  className="px-12 py-5 bg-[#B22222] text-white text-2xl font-serif font-bold rounded-sm shadow-xl hover:bg-red-800 transition-all hover:-translate-y-1 active:translate-y-0 border-b-4 border-red-950 flex items-center justify-center space-x-3 mx-auto"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>恭請藥籤</span>
                </button>
                <p className="text-sm text-gray-500 font-serif">闔眼默念心事，輕點按鈕，獲取大道公的指引</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="min-h-screen text-[#2D3A30] selection:bg-[#B22222] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative py-24 md:py-40 px-6 overflow-hidden bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto text-center relative z-10 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 mb-8 bg-[#8C6A45]/10 px-6 py-2 rounded-full border border-[#8C6A45]/20">
            <div className="w-2 h-2 bg-[#B22222] rounded-full"></div>
            <span className="text-xs font-bold tracking-[0.3em] text-[#8C6A45] uppercase">
               醫道傳承 · 百世流芳
            </span>
            <div className="w-2 h-2 bg-[#B22222] rounded-full"></div>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-bold mb-4 text-[#2D3A30] font-serif leading-tight">
             解藥籤 <span className="text-[#B22222] block md:inline relative">尋藥香<span className="absolute -top-10 -right-10 text-xl font-bold seal text-sm">御筆</span></span>
          </h1>
          
          <div className="h-1 w-32 bg-[#B22222] mx-auto mb-8"></div>
          
          <p className="text-2xl md:text-4xl text-[#8C6A45] mb-12 max-w-4xl mx-auto font-serif font-light tracking-widest italic leading-snug">
            醫神大道公的藥籤文化
          </p>
          
          <p className="text-lg md:text-xl text-[#4A5D4E] mb-16 max-w-2xl mx-auto leading-relaxed font-serif">
            穿梭於廟宇與靈山之間，在博大精深的傳統智慧中，尋找療癒身心的古老配方。
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#rules" className="px-10 py-4 bg-[#2D3A30] text-white font-serif tracking-widest text-lg hover:bg-black transition-all shadow-xl border-b-4 border-gray-900">
               探索醫道傳奇
            </a>
            <a href="#oracle" className="px-10 py-4 border-2 border-[#8C6A45] text-[#8C6A45] font-serif tracking-widest text-lg hover:bg-[#8C6A45] hover:text-white transition-all">
               虔誠求籤
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="hidden lg:block absolute -left-20 top-40 w-64 h-96 border-2 border-[#8C6A45]/10 rounded-full rotate-12 pointer-events-none"></div>
        <div className="hidden lg:block absolute -right-20 bottom-40 w-96 h-96 border-[20px] border-[#4A5D4E]/5 rounded-full pointer-events-none"></div>
      </header>

      {/* Rules Section */}
      <section id="rules" className="py-24 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-20 text-center">
            <div className="w-12 h-1 bg-[#B22222] mb-4"></div>
            <h2 className="text-5xl font-bold text-[#2D3A30] font-serif mb-4">尋藥手冊：遊戲規則</h2>
            <p className="text-[#8C6A45] font-serif tracking-widest">Master the Ancient Healing Arts</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "虔心求籤", desc: "遊戲初始，玩家須於保安宮前擲筊，獲取首張藥籤，這將決定你的天命能力與開局物資。", icon: <ScrollText className="w-8 h-8"/> },
              { title: "靈山辨草", desc: "走訪四方靈山，根據藥性（寒、熱、溫、涼）辨識藥草，在多變的天氣中採集高品質藥材。", icon: <Leaf className="w-8 h-8"/> },
              { title: "懸壺濟世", desc: "根據病案卡上的症狀，調配對症下藥。完成治療可累積「功德值」，最終成就大醫精誠之境。", icon: <ShieldCheck className="w-8 h-8"/> }
            ].map((item, idx) => (
              <div key={idx} className="relative p-10 bg-[#FDFBF7] border border-[#8C6A45]/20 group hover:border-[#B22222] transition-all duration-500">
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#B22222] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-lg group-hover:rotate-6 transition-transform">
                  {idx + 1}
                </div>
                <div className="mb-6 text-[#8C6A45] group-hover:text-[#B22222] transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-serif">{item.title}</h3>
                <p className="text-[#555] leading-relaxed font-serif">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section id="components" className="py-24 px-6 bg-[#F9F6F0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-16 border-b-2 border-[#8C6A45]/20 pb-6">
            <h2 className="text-4xl font-bold font-serif">匠心配件</h2>
            <div className="text-[#8C6A45] font-serif tracking-widest text-sm font-bold">GAME COMPONENTS</div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMPONENTS.map((comp, idx) => (
              <div key={idx} className="bg-white p-8 border border-[#8C6A45]/10 hover:shadow-xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FDFBF7] -mr-8 -mt-8 rotate-45 border-b border-l border-[#8C6A45]/20"></div>
                <div className="mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  {comp.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 font-serif text-[#2D3A30] border-l-2 border-[#B22222] pl-3">{comp.name}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Oracle Section */}
      <OracleSection />

      {/* Knowledge Section */}
      <section id="knowledge" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#B22222] font-serif font-bold text-lg mb-2 block tracking-[0.4em]">百草圖譜</span>
          <h2 className="text-5xl font-bold font-serif underline decoration-[#B22222]/20 underline-offset-8 decoration-4">藥材百科</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {HERBS.map((herb, idx) => (
            <div key={idx} className="group bg-[#FDFBF7] border-2 border-[#8C6A45]/20 hover:border-[#B22222] transition-all duration-700">
              <div className="relative h-80 overflow-hidden m-4 grayscale group-hover:grayscale-0 transition-all duration-700 border border-[#8C6A45]/10">
                <img 
                  src={herb.image} 
                  alt={herb.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-bold tracking-widest uppercase text-[#8C6A45] border border-[#8C6A45]/20">
                  {herb.pinyin}
                </div>
              </div>
              <div className="p-8 pt-4">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-[#2D3A30] font-serif mb-1">{herb.name}</h3>
                    <div className="flex items-center space-x-2">
                       <span className="w-12 h-[1px] bg-[#B22222]"></span>
                       <span className="text-[10px] font-bold text-[#8C6A45] tracking-widest uppercase">Ancient Wisdom</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-[#8C6A45] mb-1 font-bold">藥性</span>
                    <span className="px-3 py-1 bg-[#8C6A45] text-white text-xs rounded-full font-serif font-bold shadow-sm">{herb.property}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-8 leading-relaxed font-serif italic border-l-2 border-[#8C6A45]/20 pl-4 bg-white/30 py-2">
                  「{herb.description}」
                </p>
                
                <div className="space-y-3 bg-white p-4 border border-[#8C6A45]/5 shadow-inner">
                  <p className="text-xs font-bold text-[#4A5D4E] flex items-center uppercase tracking-widest">
                    <Leaf className="w-3 h-3 mr-2 text-[#B22222]" /> 主治功效
                  </p>
                  <p className="text-sm text-gray-700 font-serif leading-relaxed">{herb.benefit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D3A30] text-[#FDFBF7] py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-16 relative z-10">
          <div className="col-span-2">
            <h3 className="text-4xl font-bold mb-6 font-serif tracking-widest">解藥籤 · 尋藥香</h3>
            <p className="opacity-70 leading-relaxed mb-8 font-serif text-lg italic">
              「藥中自有天地，籤裡盡是禪機。」<br/>
              這是一場以桌遊為載體的文化朝聖，向醫神大道公致敬。
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 text-[#B22222] uppercase tracking-[0.3em] font-serif border-b border-[#B22222]/30 pb-2">章節索引</h4>
            <ul className="space-y-4 opacity-70 font-serif">
              <li><a href="#rules" className="hover:text-[#B22222] transition-colors">遊戲玩法</a></li>
              <li><a href="#components" className="hover:text-[#B22222] transition-colors">配件介紹</a></li>
              <li><a href="#oracle" className="hover:text-[#B22222] transition-colors">線上求籤</a></li>
              <li><a href="#knowledge" className="hover:text-[#B22222] transition-colors">本草綱目</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 text-[#B22222] uppercase tracking-[0.3em] font-serif border-b border-[#B22222]/30 pb-2">聯絡我們</h4>
            <p className="text-xs opacity-50 mb-4 font-serif">歡迎文化單位與桌遊開發者合作</p>
            <div className="flex flex-col space-y-3">
              <input type="email" placeholder="您的信箱" className="bg-white/5 border border-white/10 px-4 py-2 w-full focus:ring-1 focus:ring-[#B22222] outline-none transition-all font-serif" />
              <button className="bg-[#B22222] px-6 py-2 font-serif font-bold hover:bg-red-800 transition-colors">
                 送出
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-white/10 text-center opacity-40 text-xs font-serif tracking-widest">
          &copy; 2025 解藥籤 · 尋藥香 | 大道公藥籤文化桌遊工作室. 
          <br className="md:hidden"/>
          傳統智慧 · 數位再現
        </div>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

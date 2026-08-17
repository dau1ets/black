import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Crown, Gem,
  Github, Instagram, Linkedin, Menu, Music2, PartyPopper, ShieldCheck,
  Sparkles, Star, Ticket, Users, X, Zap
} from "lucide-react";

const features = [
  { icon: Music2, title: "Звук мирового уровня", text: "Мощный звук и выверенная акустика, чтобы каждый трек ощущался физически." },
  { icon: Sparkles, title: "Атмосфера после полуночи", text: "Свет, дым, экраны и детали интерьера превращают обычный вечер в событие." },
  { icon: Crown, title: "VIP без компромиссов", text: "Приватные зоны, персональный сервис и лучшие места в клубе." },
  { icon: Users, title: "Своя энергия", text: "Комьюнити людей, которые приходят не просто выпить, а прожить ночь." },
  { icon: Gem, title: "Black Events", text: "Специальные ночи, guest DJs и неожиданные лайнапы каждую неделю." },
  { icon: ShieldCheck, title: "Комфорт и безопасность", text: "Контроль входа и команда, которая следит за атмосферой весь вечер." },
];

const testimonials = [
  ["AM", "Алина М.", "Дизайнер", "Black — это тот случай, когда уходить домой вообще не хочется."],
  ["DK", "Данияр К.", "Предприниматель", "Свет, музыка, люди — всё собрано так, будто ты попал в клип."],
  ["ES", "Ерасыл С.", "Продюсер", "Лучшее место для пятницы. Особенно когда играет guest DJ."],
];

const plans = [
  { name: "Base", price: 5900, text: "Для тех, кто хочет почувствовать Black.", features: ["Вход в клуб", "Доступ к основному танцполу", "Welcome drink"], icon: Ticket },
  { name: "Black Pro", price: 12900, text: "Максимум атмосферы и привилегий.", features: ["Fast-track вход", "VIP-зона", "2 welcome drinks", "Приоритетный стол"], icon: Crown, popular: true },
  { name: "Empire", price: 49900, text: "Ваша ночь. Ваше пространство.", features: ["Private lounge", "Персональный сервис", "Premium bottle", "До 8 гостей"], icon: Gem },
];

const faqs = [
  ["Как забронировать стол?", "Выберите тариф или оставьте заявку в форме ниже. Менеджер свяжется с вами и подтвердит детали."],
  ["Есть ли дресс-код?", "Да. Black — это smart night: аккуратный вечерний образ, без спортивной одежды и пляжного стиля."],
  ["Можно ли попасть без брони?", "Да, если есть свободные места. Но на тематические ночи рекомендуем бронировать заранее."],
  ["С какого возраста вход?", "Вход на клубные мероприятия — 21+. На отдельных событиях возрастные условия могут отличаться."],
  ["Где посмотреть ближайшие события?", "Следите за афишей и нашими социальными сетями — там первыми появляются анонсы."],
  ["Можно ли отметить день рождения?", "Конечно. Для дней рождения и больших компаний есть специальные VIP-пакеты."],
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        io.disconnect();
      }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Counter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (value - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, value]);
  return <span ref={ref}>{count.toLocaleString("ru-RU")}{suffix}</span>;
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-on" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function BlackNightClub() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [billing, setBilling] = useState("month");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenu(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#08080f] text-white selection:bg-fuchsia-500/30">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translate3d(0,0,0) scale(1); } 50% { transform:translate3d(24px,-28px,0) scale(1.06); } }
        @keyframes pulseGlow { 0%,100% { opacity:.35; } 50% { opacity:.7; } }
        @keyframes spinSlow { to { transform:rotate(360deg); } }
        .hero-in { opacity:0; animation:fadeInUp .8s cubic-bezier(.16,1,.3,1) forwards; }
        .reveal { opacity:0; transform:translateY(34px); transition:opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1); }
        .reveal-on { opacity:1; transform:translateY(0); }
        .float { animation:float 9s ease-in-out infinite; }
        .pulse { animation:pulseGlow 4s ease-in-out infinite; }
        .spin-slow { animation:spinSlow 22s linear infinite; }
        .grid-bg { background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px); background-size:54px 54px; mask-image:linear-gradient(to bottom,black,transparent 78%); }
        .glass { background:rgba(255,255,255,.045); border:1px solid rgba(255,255,255,.10); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); }
        .card-hover { transition:transform .35s ease, box-shadow .35s ease, border-color .35s ease; }
        .card-hover:hover { transform:translateY(-4px) scale(1.03); border-color:rgba(217,70,239,.42); box-shadow:0 22px 70px rgba(217,70,239,.13); }
        .btn { transition:transform .25s ease, box-shadow .25s ease; }
        .btn:hover { transform:scale(1.05); box-shadow:0 16px 42px rgba(217,70,239,.28); }
        .noise { background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.025'/%3E%3C/svg%3E"); }
      `}</style>

      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-white/10 bg-[#08080f]/75 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="flex items-center gap-3 font-black tracking-tight" onClick={closeMenu}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-500/20"><Music2 size={20}/></span>
            <span className="text-xl">BLACK<span className="text-fuchsia-400">.</span></span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-white/65 md:flex">
            {["О клубе", "Афиша", "VIP", "Отзывы", "FAQ"].map((x, i) => <a key={x} href={["#about","#events","#pricing","#reviews","#faq"][i]} className="transition hover:text-white">{x}</a>)}
          </div>
          <a href="#pricing" className="btn hidden min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-black md:flex">Забронировать <ArrowRight size={16}/></a>
          <button aria-label="Открыть меню" onClick={() => setMenu(!menu)} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 md:hidden">{menu ? <X/> : <Menu/>}</button>
        </div>
        {menu && <div className="border-t border-white/10 bg-[#08080f]/95 px-5 py-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5 text-lg">
            {["О клубе","Афиша","VIP","Отзывы","FAQ"].map((x,i)=><a onClick={closeMenu} href={["#about","#events","#pricing","#reviews","#faq"][i]} key={x}>{x}</a>)}
            <a onClick={closeMenu} href="#pricing" className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-3 text-center font-bold">Забронировать</a>
          </div>
        </div>}
      </nav>

      <section id="home" className="relative isolate flex min-h-[820px] items-center overflow-hidden px-5 pt-24 sm:px-8">
        <div className="absolute inset-0 grid-bg -z-20"/>
        <div className="absolute left-[-12%] top-[5%] h-80 w-80 rounded-full bg-fuchsia-600/25 blur-[110px] float -z-10"/>
        <div className="absolute right-[-8%] top-[20%] h-96 w-96 rounded-full bg-violet-600/20 blur-[120px] float -z-10" style={{animationDelay:"-3s"}}/>
        <div className="absolute left-[45%] top-[42%] h-40 w-40 rounded-full bg-pink-500/15 blur-[80px] pulse -z-10"/>
        <div className="absolute inset-0 noise -z-10 pointer-events-none"/>
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <div className="hero-in mb-7 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-fuchsia-300" style={{animationDelay:".05s"}}><span className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_15px_#e879f9]"/> The night starts here</div>
            <h1 className="hero-in text-6xl font-black leading-[.88] tracking-[-.06em] sm:text-8xl lg:text-[9.5rem]" style={{animationDelay:".15s"}}>BLACK<br/><span className="bg-gradient-to-r from-fuchsia-400 via-pink-300 to-violet-400 bg-clip-text text-transparent">AFTER DARK.</span></h1>
            <p className="hero-in mt-8 max-w-2xl text-lg leading-8 text-white/55 sm:text-xl" style={{animationDelay:".28s"}}>Ночной клуб, где музыка, свет и люди собираются в одну энергию. Не просто ночь — история, которую захочется повторить.</p>
            <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={{animationDelay:".4s"}}>
              <a href="#pricing" className="btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-7 font-bold">Забронировать стол <ArrowRight size={18}/></a>
              <a href="#events" className="btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 font-bold backdrop-blur-md">Смотреть афишу <CalendarDays size={18}/></a>
            </div>
          </div>
          <div className="mt-16 flex items-center gap-4 text-xs uppercase tracking-[.25em] text-white/35"><span className="h-px w-14 bg-gradient-to-r from-fuchsia-500 to-transparent"/><span>Taraz · Every weekend</span></div>
        </div>
      </section>

      <section id="about" className="relative px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-fuchsia-400">Why Black</p><h2 className="text-4xl font-black tracking-tight sm:text-6xl">Больше, чем<br/>ночная жизнь.</h2></div><p className="max-w-md text-white/45">Мы строим пространство вокруг музыки, свободы и эстетики. Каждая деталь работает на одну вещь — вашу ночь.</p></div></Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({icon:Icon,title,text},i)=><Reveal key={title} delay={i*70}><div className="glass card-hover h-full rounded-3xl p-7"><div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 text-fuchsia-300"><Icon size={23}/></div><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-white/45">{text}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[.018] px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
          {[["12","K+","гостей в год"],["48","%","гостей возвращаются"],["96","%","оценка атмосферы"],["7","лет","создаём ночи"]].map(([n,s,l],i)=><Reveal key={l} delay={i*70}><div><div className="text-4xl font-black sm:text-5xl"><Counter value={Number(n)} suffix={s}/></div><div className="mt-2 text-sm text-white/35">{l}</div></div></Reveal>)}
        </div>
      </section>

      <section id="events" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal><div className="mb-16 max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-fuchsia-400">How it works</p><h2 className="text-4xl font-black sm:text-6xl">Три шага.<br/>И ночь начинается.</h2></div></Reveal>
          <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            <div className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-400/40 to-fuchsia-500/0 md:block"/>
            {[["01",CalendarDays,"Выберите дату","Посмотрите ближайшие события и выберите ночь под своё настроение."],["02",Ticket,"Забронируйте","Выберите вход, стол или VIP-пакет. Мы всё подготовим заранее."],["03",PartyPopper,"Проживите ночь","Приходите, выключайте телефон и оставьте остальное Black."]].map(([num,Icon,title,text],i)=><Reveal key={num} delay={i*120}><div className="relative"><div className="mb-7 flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-xl shadow-fuchsia-500/15"><Icon size={23}/></div><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/45">{num}</span></div><h3 className="text-2xl font-bold">{title}</h3><p className="mt-3 max-w-sm leading-7 text-white/45">{text}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section id="reviews" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><div className="mb-12 flex items-end justify-between"><div><p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-fuchsia-400">People talk</p><h2 className="text-4xl font-black sm:text-6xl">Что говорят<br/>после ночи.</h2></div><div className="hidden items-center gap-2 text-sm text-white/40 sm:flex"><Star className="fill-fuchsia-400 text-fuchsia-400" size={17}/> 4.9 / 5</div></div></Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map(([initials,name,role,quote],i)=><Reveal key={name} delay={i*90}><div className="glass card-hover rounded-3xl p-7"><div className="mb-7 flex items-center gap-3"><div className={`grid h-11 w-11 place-items-center rounded-full font-bold ${["bg-fuchsia-500/25 text-fuchsia-200","bg-violet-500/25 text-violet-200","bg-pink-500/25 text-pink-200"][i]}`}>{initials}</div><div><div className="font-bold">{name}</div><div className="text-xs text-white/35">{role}</div></div></div><div className="mb-5 flex gap-1">{[1,2,3,4,5].map(x=><Star key={x} size={15} className="fill-fuchsia-400 text-fuchsia-400"/>)}</div><p className="text-lg leading-8 text-white/70">“{quote}”</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal><div className="text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-fuchsia-400">Tickets & VIP</p><h2 className="text-4xl font-black sm:text-6xl">Выбери свою<br/><span className="text-white/35">версию Black.</span></h2><div className="mx-auto mt-8 inline-flex rounded-full border border-white/10 bg-white/5 p-1"><button onClick={()=>setBilling("month")} className={`rounded-full px-5 py-2 text-sm font-bold ${billing==="month"?"bg-white text-black":"text-white/45"}`}>За ночь</button><button onClick={()=>setBilling("year")} className={`rounded-full px-5 py-2 text-sm font-bold ${billing==="year"?"bg-white text-black":"text-white/45"}`}>Абонемент <span className="text-fuchsia-500">−20%</span></button></div></div></Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {plans.map((plan,i)=>{const Icon=plan.icon; const price=billing==="year"?Math.round(plan.price*.8):plan.price; return <Reveal key={plan.name} delay={i*100}><div className={`glass card-hover relative flex h-full flex-col rounded-[2rem] p-7 ${plan.popular?"border-fuchsia-400/40 shadow-[0_0_70px_rgba(217,70,239,.12)] lg:-translate-y-3":""}`}>{plan.popular&&<div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider">Популярный</div>}<div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-white/7"><Icon size={22}/></div><h3 className="text-2xl font-black">{plan.name}</h3><p className="mt-2 min-h-14 text-sm leading-6 text-white/40">{plan.text}</p><div className="my-7 flex items-end gap-1"><span className="text-5xl font-black">{price.toLocaleString("ru-RU")}</span><span className="mb-2 text-white/35">₸ / ночь</span></div><div className="mb-8 space-y-3">{plan.features.map(f=><div key={f} className="flex gap-3 text-sm text-white/65"><Check className="mt-0.5 shrink-0 text-fuchsia-400" size={17}/>{f}</div>)}</div><a href="#cta" className={`mt-auto inline-flex min-h-12 items-center justify-center rounded-xl px-5 font-bold ${plan.popular?"bg-gradient-to-r from-fuchsia-500 to-violet-600":"bg-white/8 hover:bg-white/12"}`}>Выбрать пакет</a></div></Reveal>})}
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal><div className="mb-12 text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-fuchsia-400">FAQ</p><h2 className="text-4xl font-black sm:text-6xl">Есть вопросы?</h2></div></Reveal>
          <div className="grid gap-x-8 md:grid-cols-2">
            {faqs.map(([q,a],i)=><Reveal key={q} delay={i*50}><div className="border-b border-white/10"><button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="flex min-h-20 w-full items-center justify-between gap-5 text-left font-bold">{q}<ChevronDown className={`shrink-0 text-white/40 transition-transform duration-300 ${openFaq===i?"rotate-180":""}`}/></button><div className={`grid transition-all duration-300 ${openFaq===i?"grid-rows-[1fr] pb-6":"grid-rows-[0fr]"}`}><div className="overflow-hidden text-sm leading-7 text-white/45">{a}</div></div></div></Reveal>)}
          </div>
        </div>
      </section>

      <section id="cta" className="px-5 py-20 sm:px-8 lg:py-28">
        <Reveal><div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-fuchsia-600 via-violet-600 to-indigo-700 p-8 sm:p-14 lg:p-20"><div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/20 bg-white/10 blur-sm pulse"/><div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full border border-white/10 bg-white/10 blur-sm float"/><div className="relative max-w-3xl"><p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-white/65">Don't miss the night</p><h2 className="text-4xl font-black tracking-tight sm:text-6xl">Поймай следующий<br/>момент Black.</h2><p className="mt-5 max-w-xl text-white/70">Оставь email — отправим ближайшую афишу, guest DJ анонсы и специальные предложения.</p><form onSubmit={e=>e.preventDefault()} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"><input type="email" placeholder="you@email.com" className="min-h-13 flex-1 rounded-xl border border-white/20 bg-black/15 px-5 outline-none placeholder:text-white/40 focus:border-white/50"/><button className="btn min-h-13 rounded-xl bg-white px-6 font-black text-black">Подписаться</button></form></div></div></Reveal>
      </section>

      <footer className="border-t border-white/10 px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2"><div className="flex items-center gap-3 font-black"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600"><Music2 size={20}/></span>BLACK.</div><p className="mt-5 max-w-sm text-sm leading-7 text-white/35">Ночной клуб нового поколения. Музыка, люди и атмосфера, которую невозможно объяснить — её нужно прожить.</p><div className="mt-6 flex gap-2">{[Instagram, Github, Linkedin].map((Icon,i)=><a key={i} href="#" aria-label="Социальная сеть" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/55 transition hover:text-white"><Icon size={17}/></a>)}</div></div>
            {[["Клуб","О нас","Афиша","VIP","Дресс-код"],["Сервис","Бронь стола","День рождения","FAQ","Контакты"],["Следи","Instagram","Telegram","Новости","Партнёры"]].map(([title,...items])=><div key={title}><h4 className="mb-5 text-sm font-bold">{title}</h4><div className="space-y-3 text-sm text-white/35">{items.map(x=><a href="#" key={x} className="block transition hover:text-white">{x}</a>)}</div></div>)}
          </div>
          <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-7 text-xs text-white/25 sm:flex-row"><span>© 2026 BLACK Night Club. All rights reserved.</span><span>Made for the night.</span></div>
        </div>
      </footer>
    </main>
  );
}

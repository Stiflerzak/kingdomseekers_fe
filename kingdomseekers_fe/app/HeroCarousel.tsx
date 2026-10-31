'use client';

import { useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

const slides = [
  {
    eyebrow: 'MATTHEW 6:33 · OUR ANCHOR',
    lines: ['Seek first', 'the Kingdom.', 'Together.'],
    text: '“But seek ye first the kingdom of God, and his righteousness…” — Matthew 6:33 (KJV)',
    image: '/images/prayer-concept.webp',
    imageAlt: 'Concept image of people praying together in a church',
    cta: 'Discover our church',
    href: '#vision',
  },
  {
    eyebrow: 'PRAISE & WORSHIP',
    lines: ['Lift your', 'voice.', 'Belong here.'],
    text: 'A church home for worship, the Word, and a life of faith beyond Sunday.',
    image: '/images/worship-team-concept.webp',
    imageAlt: 'Concept image of a Kenyan praise and worship team singing',
    cta: 'Plan your first visit',
    href: '#visit',
  },
  {
    eyebrow: 'A COMMUNITY OF PRAYER',
    lines: ['Come', 'as you are.', 'Pray with us.'],
    text: 'There is room to seek God together, share what is on your heart, and be welcomed.',
    image: '/images/prayer-concept.webp',
    imageAlt: 'Concept image of a prayer gathering',
    cta: 'Plan your first visit',
    href: '#visit',
  },
  {
    eyebrow: 'UPCOMING EVENTS',
    lines: ['Gather.', 'Grow.', 'Go together.'],
    text: 'The next confirmed Eastern Bypass event will appear here with its date, venue and registration details.',
    image: '/images/rev-simon-crusade-concept.webp',
    imageAlt: 'Concept image of Rev. Simon preaching at an outdoor gathering',
    cta: 'Explore event plans',
    href: '#events',
  },
] as const;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const slide = slides[active];
  const go = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return <section className="hero" id="top" tabIndex={0} aria-roledescription="carousel" aria-label="Kingdom Seekers highlights" onKeyDown={(event) => { if (event.key === 'ArrowLeft') go(-1); if (event.key === 'ArrowRight') go(1); }} onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { if (touchStartX.current === null) return; const distance = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(distance) > 45) go(distance > 0 ? -1 : 1); touchStartX.current = null; }}>{slides.map((item,index)=><div key={item.eyebrow} className={index===active?'hero-image is-active':'hero-image'} role={index===active?'img':undefined} aria-label={index===active?item.imageAlt:undefined} aria-hidden={index===active?undefined:true} style={{backgroundImage:`url(${item.image})`}}/>)}<div className="hero-shade"/><div key={active} className="hero-content container slide-enter" aria-live="polite"><div className="eyebrow light"><span className="eyebrow-line"/> {slide.eyebrow}</div><h1>{slide.lines[0]}<br/><em>{slide.lines[1]}</em><br/>{slide.lines[2]}</h1><p>{slide.text}</p><div className="hero-actions"><a className="button button-gold" href={slide.href}>{slide.cta} <ArrowRight size={17}/></a><a className="text-link light-link" href="#about">Meet the church <ArrowDown size={16}/></a></div></div><div className="hero-controls" aria-label="Carousel controls"><button aria-label="Previous slide" onClick={() => go(-1)}><ArrowLeft size={17}/></button><span>{String(active + 1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span><button aria-label="Next slide" onClick={() => go(1)}><ArrowRight size={17}/></button></div><div className="hero-dots" role="group" aria-label="Choose a slide">{slides.map((item,i)=><button key={item.eyebrow} aria-label={`Show slide ${i+1}: ${item.eyebrow.toLowerCase()}`} aria-current={active === i ? 'true' : undefined} className={active === i ? 'active' : ''} onClick={() => setActive(i)}/>)}</div><div className="hero-footer"><span><MapPin size={16}/> Eastern Bypass, Nairobi</span><span>CONCEPT IMAGES · BRANCH DETAILS TO CONFIRM</span><span>SCROLL TO EXPLORE <ArrowDown size={14}/></span></div></section>;
}

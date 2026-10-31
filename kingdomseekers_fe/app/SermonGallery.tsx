'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Play, Youtube } from 'lucide-react';

const channel = 'https://www.youtube.com/channel/UCiJ8sLxT1g_O4IvfAmdULhw';
const items = [
  {
    label: 'FEATURED SERMON',
    title: 'Finishing Strong',
    detail: 'Rev Simon Mwangi Chege · Kingdom Seekers Fellowship Utawala',
    image: '/images/rev-simon-crusade-concept.webp',
    type: 'video',
  },
  {
    label: 'MORE TEACHING',
    title: 'Explore the sermons',
    detail: 'Visit Rev Simon Mwangi Chege’s YouTube channel',
    image: '/images/rev-simon-church-concept.webp',
    type: 'channel',
  },
  {
    label: 'SUNDAY SERVICES',
    title: 'Worship and the Word',
    detail: 'Find more videos on the channel',
    image: '/images/worship-team-concept.webp',
    type: 'channel',
  },
] as const;

export default function SermonGallery() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const step = (direction: number) => {
    setPlaying(false);
    setActive((current) => (current + direction + items.length) % items.length);
  };
  const select = (index: number) => { setPlaying(false); setActive(index); };
  const item = items[active];

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setPlaying(false); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  return <div className="sermon-gallery" aria-roledescription="carousel" aria-label="YouTube sermon gallery" tabIndex={0} onKeyDown={(event) => { if (event.key === 'ArrowLeft') step(-1); if (event.key === 'ArrowRight') step(1); }} onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { if (touchStartX.current === null) return; const distance = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(distance) > 45) step(distance > 0 ? -1 : 1); touchStartX.current = null; }}>
    <div className="sermon-stage">
      {[-1, 1].map((offset) => {
        const index = (active + offset + items.length) % items.length;
        const preview = items[index];
        return <button key={offset} className={`sermon-peek ${offset < 0 ? 'left' : 'right'}`} onClick={() => select(index)} aria-label={`Show ${preview.title}`} style={{ backgroundImage: `linear-gradient(#1113,#1117),url('${preview.image}')` }}><span>{preview.label}</span></button>;
      })}
      <div className="sermon-center" key={active}>
        <div className="sermon-screen">
          {playing && item.type === 'video' ? <iframe title="Finishing Strong by Rev Simon Mwangi Chege" src="https://www.youtube-nocookie.com/embed/-otUcXwUwrw?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/> : <div className="sermon-poster" style={{ backgroundImage: `linear-gradient(0deg,#090b0dbe,#090b0d0d 62%),url('${item.image}')` }}><span className="sermon-poster-label"><Youtube size={19}/> REV SIMON MWANGI CHEGE</span>{item.type === 'video' ? <button className="sermon-play-button" onClick={() => setPlaying(true)} aria-label="Play Finishing Strong sermon"><Play size={31} fill="currentColor"/></button> : <a className="sermon-play-button" href={channel} target="_blank" rel="noopener noreferrer" aria-label="Open Rev Simon Mwangi Chege's YouTube channel"><ExternalLink size={29}/></a>}<span className="sermon-concept-label">CONCEPT IMAGE · VIDEO OPENS ON PLAY</span></div>}
        </div>
        <div className="sermon-caption"><div><span>{item.label}</span><h3>{item.title}</h3><p>{item.detail}</p></div>{item.type === 'video' ? <a href="https://www.youtube.com/watch?v=-otUcXwUwrw" target="_blank" rel="noopener noreferrer">Watch on YouTube <ExternalLink size={15}/></a> : <a href={channel} target="_blank" rel="noopener noreferrer">Visit channel <ExternalLink size={15}/></a>}</div>
      </div>
      <button className="sermon-arrow previous" onClick={() => step(-1)} aria-label="Previous sermon gallery card"><ArrowLeft size={22}/></button>
      <button className="sermon-arrow next" onClick={() => step(1)} aria-label="Next sermon gallery card"><ArrowRight size={22}/></button>
    </div>
    <div className="sermon-gallery-footer"><div className="sermon-indicators" role="group" aria-label="Choose a gallery card">{items.map((entry, index) => <button key={entry.title} aria-label={`Show ${entry.title}`} aria-current={active === index ? 'true' : undefined} className={active === index ? 'active' : ''} onClick={() => select(index)}/>)}</div><a href={channel} target="_blank" rel="noopener noreferrer">Browse the YouTube channel <ArrowRight size={16}/></a></div>
  </div>;
}

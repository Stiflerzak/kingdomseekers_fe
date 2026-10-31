'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroCarousel from './HeroCarousel';
import GivingDialog from './GivingDialog';
import SermonGallery from './SermonGallery';
import TestimonyRibbon from './TestimonyRibbon';
import { ScriptureSection, EventsSection, ProjectsSection, MobileAppSection } from './ExtraSections';
import { ArrowDown, ArrowRight, BookOpen, CalendarDays, Check, ChevronDown, Church, Clock3, Headphones, Heart, HeartHandshake, MapPin, Menu, Play, Plus, Radio, Sparkles, Users, X } from 'lucide-react';

const pathways = [
  { icon: Church, number: '01', title: 'Experience worship', text: 'A welcoming place to pray, worship, and hear the Word together.', action: 'Plan a visit', href: '#visit' },
  { icon: Users, number: '02', title: 'Find your people', text: 'Connect through fellowships, youth gatherings, and serving teams.', action: 'Explore community', href: '#community' },
  { icon: BookOpen, number: '03', title: 'Grow in the Word', text: 'Follow devotionals and guided Bible learning at your own pace.', action: 'See discipleship', href: '#discipleship' },
];

const ministries = [
  { label: 'Everyone', title: 'A place to belong', text: 'From a first Sunday to a lifelong journey, discover your next step in faith and community.', accent: 'Community / All ages' },
  { label: 'Youth', title: 'Faith for a new generation', text: 'Space for young people to ask honest questions, build friendships, worship and lead.', accent: 'Youth / Young adults' },
  { label: 'Families', title: 'Growing together at home', text: 'Resources and relationships that help families carry faith into everyday life.', accent: 'Families / Children' },
  { label: 'Serve', title: 'Put faith into action', text: 'Discover meaningful ways to volunteer, care for neighbours and support church projects.', accent: 'Outreach / Service' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMinistry, setActiveMinistry] = useState(0);
  const [visitOpen, setVisitOpen] = useState(false);
  const [givingOpen, setGivingOpen] = useState(false);
  const [visitSent, setVisitSent] = useState(false);
  const [questionOpen, setQuestionOpen] = useState<number | null>(null);
  const selected = ministries[activeMinistry];

  return <>
    <div className="announcement"><span className="live-dot" /> A NEW DIGITAL HOME FOR EASTERN BYPASS <a href="#vision">Explore the vision <ArrowRight size={13} /></a></div>
    <TestimonyRibbon/>
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Kingdom Seekers Eastern Bypass home"><img className="brand-logo" src="/images/logo.svg" alt="" width="46" height="46"/><span className="brand-words"><strong>KINGDOM<br/>SEEKERS</strong><small>EASTERN BYPASS</small></span></Link>
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
        <a href="#about" onClick={() => setMenuOpen(false)}>Our story</a><a href="#community" onClick={() => setMenuOpen(false)}>Community</a><a href="#discipleship" onClick={() => setMenuOpen(false)}>Grow</a><a href="#events" onClick={() => setMenuOpen(false)}>Events</a><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#media" onClick={() => setMenuOpen(false)}>Sermons</a>
        <Link className="mobile-member" href="/member">Member space</Link><Link className="mobile-member" href="/qr">QR codes</Link>
      </nav>
      <div className="header-actions"><Link className="member-link" href="/member">Member space <ArrowRight size={15}/></Link><button className="button button-gold header-visit" onClick={() => setVisitOpen(true)}>Plan a visit</button><button className="header-give" onClick={() => {setGivingOpen(true);setMenuOpen(false);}}><Heart size={16} fill="currentColor"/> Give / Partner</button><button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>

    <main>
      <HeroCarousel />

      <div className="story-ticker" aria-label="Explore sermons and events"><div className="ticker-track">{[0,1,2,3].map((index) => <div className="ticker-pair" key={index}><a href="#media"><span className="ticker-star">✦</span> WATCH REV SIMON MWANGI CHEGE SERMONS <ArrowRight size={15}/></a><a href="#events"><span className="ticker-star">✦</span> THURSDAY STREET PRAISE AT MWIHOKO MARKET <ArrowRight size={15}/></a></div>)}</div></div>

      <section className="intro section-pad" id="vision"><div className="container intro-grid"><div><div className="eyebrow"><span className="eyebrow-line"/> THE HEART OF THIS EXPERIENCE</div><h2>More than a<br/><em>Sunday service.</em></h2></div><div className="intro-copy"><p>Kingdom Seekers Eastern Bypass can be a digital front door for the curious and a daily companion for members. One place to discover the church, stay connected, and keep growing.</p><a href="#about" className="inline-link">Get to know us <ArrowRight size={17}/></a></div></div><div className="container pathways">{pathways.map((item) => <a href={item.href} className="pathway" key={item.number}><div className="pathway-top"><item.icon size={25} strokeWidth={1.6}/><span>{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p><span className="pathway-link">{item.action} <ArrowRight size={16}/></span></a>)}</div></section>

      <ScriptureSection />

      <section className="feature-band" id="about"><div className="feature-photo" role="img" aria-label="Concept image of Rev. Simon preaching inside a church"><div className="photo-label">AI CONCEPT IMAGE · REV. SIMON CHEGE</div></div><div className="feature-copy"><div className="eyebrow light"><span className="eyebrow-line"/> OUR STORY</div><h2>Rooted in faith.<br/><em>Growing together.</em></h2><p>This Eastern Bypass branch is led by Rev. Simon Chege and is part of the wider Kingdom Seekers family founded by Apostle John Kimani William in Nakuru.</p><p>Our proposed digital home makes that connection clear while giving this Nairobi community its own voice, stories and ways to connect.</p><div className="pastor-signature"><img src="/images/rev-simon-portrait.webp" alt="Portrait supplied for Rev. Simon Chege" width="50" height="50"/><span><strong>Rev. Simon Chege</strong><small>Eastern Bypass branch</small></span></div><a className="text-link light-link" href="#community">Explore our community <ArrowRight size={17}/></a></div></section>

      <section className="community section-pad" id="community"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> LIFE TOGETHER</div><h2>There is room<br/><em>for you here.</em></h2></div><p>Church comes alive in the relationships we build, the questions we ask, and the ways we serve.</p></div><div className="ministry-tabs" role="tablist" aria-label="Community pathways">{ministries.map((m, i) => <button key={m.label} role="tab" aria-selected={activeMinistry === i} className={activeMinistry === i ? 'active' : ''} onClick={() => setActiveMinistry(i)}>{m.label}</button>)}</div><div className="ministry-feature"><div className={activeMinistry === 1 ? "ministry-art youth-photo" : "ministry-art"} role={activeMinistry === 1 ? "img" : undefined} aria-label={activeMinistry === 1 ? "Concept image of Rev. Simon speaking with young adults" : undefined}>{activeMinistry === 1 ? <span className="concept-photo-label">AI CONCEPT IMAGE</span> : <><div className="orb orb-one"/><div className="orb orb-two"/><div className="ministry-art-text"><Sparkles size={28}/><span>GROW<br/>TOGETHER</span></div></>}</div><div className="ministry-text"><span className="small-caps">{selected.accent}</span><h3>{selected.title}</h3><p>{selected.text}</p><div className="ministry-note"><Plus size={18}/><span>In the full platform, members can discover and join a fellowship or serving team from their phone.</span></div><Link className="inline-link" href="/member">Preview member experience <ArrowRight size={17}/></Link></div></div></div></section>

      <EventsSection />

      <section className="discipleship section-pad" id="discipleship"><div className="container discipleship-grid"><div><div className="eyebrow light"><span className="eyebrow-line"/> DISCIPLESHIP FOR NEW BELIEVERS</div><h2>Begin in faith.<br/><em>Grow in the Word.</em></h2><p>Start with Foundations of Faith, a short self-paced path for new believers. Read Scripture, reflect, check your understanding and return whenever you are ready.</p><div className="learning-list"><div><BookOpen size={20}/><span>Daily Scripture & reflection</span></div><div><Check size={20}/><span>Self-paced learning tracks</span></div><div><Users size={20}/><span>Fellowship discussion prompts</span></div></div><Link href="/learn" className="button button-outline">Start the learning path <ArrowRight size={17}/></Link></div><div className="lesson-card"><div className="lesson-top"><span>DISCIPLESHIP JOURNEY</span><span>PREVIEW</span></div><div className="lesson-icon"><BookOpen size={35}/></div><div className="lesson-meta">FOUNDATIONS · SAMPLE COURSE</div><h3>Foundations of Faith</h3><p>Four beginner lessons on new life, prayer, community and Matthew 6:33.</p><div className="progress-label"><span>Self-paced course</span><strong>4 lessons</strong></div><div className="progress-track"><span style={{width:0}}/></div><button onClick={() => window.location.href = '/learn/'}>Explore lessons <ArrowRight size={17}/></button></div></div></section>

      <section className="media section-pad" id="media"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> SERMONS & STORIES</div><h2>A word for<br/><em>your week.</em></h2></div><p>Watch Rev Simon Mwangi Chege and explore more teaching through his YouTube channel.</p></div><SermonGallery/><div className="media-gallery-note"><Headphones size={20}/><span>Short clips, captions and sermon playlists are planned for the full platform.</span></div></div></section>

      <ProjectsSection />

      <MobileAppSection />

      <section className="visit section-pad" id="visit"><div className="container visit-grid"><div><div className="eyebrow light"><span className="eyebrow-line"/> YOUR NEXT STEP</div><h2>Your story<br/><em>belongs here.</em></h2><p>Whether you are exploring faith, visiting for the first time, or looking for a place to grow, we would love to welcome you.</p><button className="button button-gold" onClick={() => setVisitOpen(true)}>Plan your visit <ArrowRight size={17}/></button><Link className="visit-qr-link" href="/qr">Create a shareable QR code <ArrowRight size={16}/></Link></div><div className="visit-info"><div><MapPin size={23}/><span><strong>Eastern Bypass, Nairobi</strong><small>Exact location and directions to be confirmed by the branch.</small></span></div><div><Clock3 size={23}/><span><strong>Service details</strong><small>Times and livestream schedule to be confirmed.</small></span></div><div><HeartHandshake size={23}/><span><strong>Come as you are</strong><small>Tell the welcome team how they can help you feel at home.</small></span></div></div></div></section>

      <section className="faq section-pad"><div className="container faq-grid"><div><div className="eyebrow"><span className="eyebrow-line"/> GOOD TO KNOW</div><h2>Questions before<br/><em>you come?</em></h2></div><div className="faq-list">{[
        ['Where exactly is the church?', 'The confirmed pin and directions will be added after the Eastern Bypass team approves the location.'],
        ['What time are services?', 'The branch will publish its current service and livestream times here. We have intentionally left unverified times out of this concept.'],
        ['Can I join online?', 'The proposed platform includes a live worship page, sermon replays and short clips. Official channels will be linked once confirmed.'],
      ].map(([q,a],i) => <div className="faq-item" key={q}><button aria-expanded={questionOpen === i} onClick={() => setQuestionOpen(questionOpen === i ? null : i)}>{q}<ChevronDown className={questionOpen === i ? 'rotated' : ''} size={20}/></button>{questionOpen === i && <p>{a}</p>}</div>)}</div></div></section>
    </main>
    <footer><div className="container footer-callout"><div><span className="small-caps">FAITH IN ACTION</span><h2>There is more<br/><em>to come.</em></h2></div><div><p>Worship with us, grow in the Word, or partner with the work of this Eastern Bypass community.</p><button className="button button-gold" onClick={() => setGivingOpen(true)}>Explore giving <Heart size={16}/></button></div></div><div className="container footer-grid"><div><Link className="brand footer-brand" href="/"><img className="brand-logo" src="/images/logo.svg" alt="" width="46" height="46"/><span className="brand-words"><strong>KINGDOM<br/>SEEKERS</strong><small>EASTERN BYPASS</small></span></Link><p>A proposed digital home for the Eastern Bypass branch in Nairobi.</p></div><div><span className="footer-title">EXPLORE</span><a href="#about">Our story</a><a href="#community">Community</a><a href="#discipleship">Discipleship</a><a href="#media">Sermons</a><a href="#events">Events</a><a href="#projects">Projects</a></div><div><span className="footer-title">YOUR NEXT STEP</span><button onClick={() => setVisitOpen(true)}>Plan a visit</button><button onClick={() => setGivingOpen(true)}>Give / Partner</button><Link href="/member">Member preview</Link><a href="#visit">Location & service details</a><Link href="/qr">Create a QR code</Link><a href="https://www.youtube.com/channel/UCiJ8sLxT1g_O4IvfAmdULhw" target="_blank" rel="noopener noreferrer">Rev Simon on YouTube</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Kingdom Seekers Eastern Bypass · Website concept</span><span>Concept imagery and sample features. Content requires branch approval.</span></div></footer>

    <GivingDialog open={givingOpen} onClose={() => setGivingOpen(false)}/>

    {visitOpen && <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setVisitOpen(false); }}><div className="visit-modal" role="dialog" aria-modal="true" aria-labelledby="visit-title"><button className="modal-close" aria-label="Close" onClick={() => setVisitOpen(false)}><X size={20}/></button>{visitSent ? <div className="success-state"><div className="success-icon"><Check/></div><h2 id="visit-title">You’re on your way.</h2><p>This concept keeps requests in the browser only. In the production platform, the welcome team would receive your visit details and follow up.</p><button className="button button-gold" onClick={() => {setVisitOpen(false); setVisitSent(false);}}>Done</button></div> : <><div className="eyebrow"><span className="eyebrow-line"/> PLAN A VISIT</div><h2 id="visit-title">Let’s welcome you.</h2><p>Preview the simple first-visit flow. No information is sent or stored.</p><form onSubmit={(e) => {e.preventDefault(); setVisitSent(true);}}><label>Your name<input required placeholder="Your name"/></label><label>Email or phone<input required placeholder="How can we reach you?"/></label><label>Coming with family or friends?<select defaultValue=""><option value="" disabled>Choose one</option><option>Just me</option><option>With others</option></select></label><button className="button button-gold" type="submit">Preview welcome request <ArrowRight size={17}/></button></form></>}</div></div>}
  </>;
}

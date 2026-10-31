'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Check, CircleCheck, LockKeyhole } from 'lucide-react';

const lessons = [
  {
    title: 'A new beginning', reference: '2 Corinthians 5:17', duration: '8 min',
    overview: 'Following Jesus begins a new journey. You do not need to know everything before taking the next step.',
    read: 'Read 2 Corinthians 5:17. Notice the language of a new creation. Write down one area of your life where you want to grow.',
    reflect: 'What does a new beginning mean to you today?',
    question: 'What is the focus of this lesson?', choices: ['A new life and an ongoing journey', 'Knowing every answer immediately', 'Growing entirely alone'], answer: 0,
  },
  {
    title: 'Prayer and the Word', reference: 'Matthew 6:9–13 · Psalm 119:105', duration: '10 min',
    overview: 'Prayer is a conversation with God. Scripture helps shape what we believe, ask and practice.',
    read: 'Read the Lord’s Prayer and Psalm 119:105. Begin with a short prayer and one passage you can revisit this week.',
    reflect: 'What is one honest thing you would like to bring to God in prayer?',
    question: 'Which habit can help you begin?', choices: ['Wait until you have perfect words', 'Pray honestly and read a short passage', 'Read only when you feel confident'], answer: 1,
  },
  {
    title: 'Growing together', reference: 'Acts 2:42', duration: '9 min',
    overview: 'Faith grows through teaching, fellowship, shared meals and prayer. Community gives us people to learn and serve with.',
    read: 'Read Acts 2:42. Think about what kind of support you need and how you could encourage another person.',
    reflect: 'Who could you invite into your faith journey?',
    question: 'Which practice appears in Acts 2:42?', choices: ['Fellowship and prayer', 'Isolation', 'Competition'], answer: 0,
  },
  {
    title: 'Seek first the Kingdom', reference: 'Matthew 6:33', duration: '9 min',
    overview: 'Our anchor scripture invites us to put God’s Kingdom and righteousness first in everyday choices.',
    read: 'Read Matthew 6:25–34 for the full context. Notice Jesus’ invitation to trust God amid ordinary concerns.',
    reflect: 'What choice this week could reflect Kingdom priorities?',
    question: 'What does Matthew 6:33 invite us to seek first?', choices: ['Our own recognition', 'The Kingdom of God and his righteousness', 'A perfect schedule'], answer: 1,
  },
] as const;

export default function LearnPage() {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [choice, setChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ksf-foundations-progress') || '[]');
      if (Array.isArray(saved)) setCompleted(saved.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < lessons.length));
    } catch { /* Start fresh if local data is unavailable. */ }
    setLoaded(true);
  }, []);

  const lesson = lessons[active];
  const progress = Math.round((completed.length / lessons.length) * 100);

  function selectLesson(index: number) { setActive(index); setChoice(null); setFeedback(''); }
  function checkAnswer() {
    if (choice === null) return;
    if (choice !== lesson.answer) { setFeedback('Try again. Revisit the reading, then choose the best answer.'); return; }
    setFeedback('Correct. Lesson complete!');
    const next = [...new Set([...completed, active])].sort();
    setCompleted(next);
    localStorage.setItem('ksf-foundations-progress', JSON.stringify(next));
  }

  return <main className="learn-page"><header className="learn-header container"><Link className="brand" href="/"><img className="brand-logo" src="/images/logo.svg" alt="" width="46" height="46"/><span className="brand-words"><strong>KINGDOM<br/>SEEKERS</strong><small>EASTERN BYPASS</small></span></Link><Link href="/member" className="qr-back"><ArrowLeft size={16}/> Member space</Link></header><div className="container learn-heading"><div className="eyebrow"><span className="eyebrow-line"/> NEW BELIEVERS · SELF-PACED LEARNING</div><h1>Foundations of Faith</h1><p>Four short sample lessons to help you begin: scripture, prayer, community and a life centred on Matthew 6:33.</p><div className="learn-progress"><span>{loaded ? `${completed.length} of ${lessons.length} lessons completed` : 'Loading your journey…'}</span><strong>{progress}%</strong></div><div className="progress-track"><span style={{width:`${progress}%`}}/></div></div><div className="container learn-layout"><aside className="learn-list" aria-label="Course lessons"><span>YOUR LEARNING PATH</span>{lessons.map((item,index)=><button key={item.title} className={active===index?'active':''} onClick={()=>selectLesson(index)}><span className="learn-number">{completed.includes(index)?<Check size={17}/>:String(index+1).padStart(2,'0')}</span><span><strong>{item.title}</strong><small>{item.duration} · {item.reference}</small></span><ArrowRight size={16}/></button>)}<p>Progress is saved only on this device in the prototype.</p></aside><article className="learn-lesson"><div className="lesson-header"><span>LESSON {String(active+1).padStart(2,'0')} / {String(lessons.length).padStart(2,'0')}</span><span>{lesson.duration} READ</span></div><div className="learn-lesson-icon"><BookOpen size={30}/></div><h2>{lesson.title}</h2><p className="learn-reference">READ · {lesson.reference}</p><p className="learn-overview">{lesson.overview}</p><div className="learn-block"><h3>Read & notice</h3><p>{lesson.read}</p></div><div className="learn-block"><h3>Reflect</h3><p>{lesson.reflect}</p></div><div className="learn-quiz"><span>CHECK YOUR UNDERSTANDING</span><h3>{lesson.question}</h3><div role="radiogroup" aria-label={lesson.question}>{lesson.choices.map((option,index)=><label key={option} className={choice===index?'selected':''}><input type="radio" name={`lesson-${active}`} checked={choice===index} onChange={()=>{setChoice(index);setFeedback('')}}/>{option}</label>)}</div><button className="button button-gold" onClick={checkAnswer} disabled={choice===null}>Check answer <ArrowRight size={16}/></button>{feedback&&<p className={feedback.startsWith('Correct')?'quiz-feedback correct':'quiz-feedback'} role="status">{feedback.startsWith('Correct')?<CircleCheck size={17}/>:null}{feedback}</p>}</div><div className="learn-next">{active<lessons.length-1?<button onClick={()=>selectLesson(active+1)}>Next lesson <ArrowRight size={16}/></button>:<Link href="/member">Return to member space <ArrowRight size={16}/></Link>}</div></article></div><div className="container learn-note"><LockKeyhole size={17}/> This is a prototype course. A Spring Boot backend will later support accounts, leader-reviewed content and progress across devices.</div></main>;
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, LockKeyhole, ShieldCheck } from 'lucide-react';

export default function MemberAccess({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<'login' | 'mfa'>('login');
  const [pin, setPin] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pin !== '2468') { setError('Use the sample PIN 2468 for this preview.'); return; }
    setError(''); setStep('mfa');
  };
  const submitCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code !== '123456') { setError('Use the sample code 123456 for this preview.'); return; }
    setError(''); onComplete();
  };

  return <main className="member-access"><div className="member-access-art"><Link className="member-access-back" href="/"><ArrowLeft size={16}/> Back to church website</Link><div><img src="/images/logo.svg" alt="Kingdom Seekers Fellowship logo" width="68" height="68"/><span>MEMBER SPACE · MOBILE PREVIEW</span><h1>Faith, community,<br/><em>every day.</em></h1><p>Devotionals, fellowship, learning and church updates together in one place.</p></div><small>INTERACTIVE CONCEPT · NO REAL ACCOUNT IS CREATED</small></div><div className="member-access-panel"><div className="member-access-card"><span className="member-access-step"><ShieldCheck size={17}/> {step === 'login' ? '01 / 02 · MEMBER SIGN IN' : '02 / 02 · VERIFY YOUR SIGN IN'}</span>{step === 'login' ? <><h2>Welcome back.</h2><p>Try the member login flow using only the sample details below.</p><form onSubmit={submitLogin}><label>Demo member ID<input autoComplete="off" value="demo.member@example.test" readOnly/></label><label>Demo PIN<input inputMode="numeric" type="password" autoComplete="off" value={pin} onChange={(event) => setPin(event.target.value)} placeholder="Enter 2468" required/></label><div className="demo-hint"><LockKeyhole size={16}/><span>Sample PIN: <strong>2468</strong>. Please do not enter a real password.</span></div>{error && <p className="access-error" role="alert">{error}</p>}<button type="submit">Continue to verification <ArrowRight size={17}/></button></form></> : <><h2>One more step.</h2><p>Enter the sample verification code to preview multi-factor authentication.</p><form onSubmit={submitCode}><label>Six-digit demo code<input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))} placeholder="123456" required/></label><div className="demo-hint"><Check size={16}/><span>Sample code: <strong>123456</strong>. No SMS or email is sent.</span></div>{error && <p className="access-error" role="alert">{error}</p>}<button type="submit">Open dashboard <ArrowRight size={17}/></button><button className="access-secondary" type="button" onClick={() => { setStep('login'); setError(''); }}>Back to sign in</button></form></>}</div></div></main>;
}

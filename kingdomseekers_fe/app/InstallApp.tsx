'use client';

import { useEffect, useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

interface InstallPromptEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> }

export default function InstallApp() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setPlatform(/iPad|iPhone|iPod/.test(ua) ? 'ios' : /Android/.test(ua) ? 'android' : 'other');
    setInstalled(window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && Boolean((navigator as Navigator & {standalone?: boolean}).standalone)));
    const onPrompt = (event: Event) => { event.preventDefault(); setPromptEvent(event as InstallPromptEvent); };
    const onInstalled = () => { setInstalled(true); setOpen(false); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => { window.removeEventListener('beforeinstallprompt', onPrompt); window.removeEventListener('appinstalled', onInstalled); };
  }, []);

  async function install() {
    if (!promptEvent) { setOpen(true); return; }
    await promptEvent.prompt();
    const result = await promptEvent.userChoice;
    if (result.outcome === 'accepted') setInstalled(true);
    setPromptEvent(null);
  }

  if (installed) return null;
  return <><div className="install-card"><div className="install-card-icon"><Smartphone size={22}/></div><div><strong>Take your faith journey with you.</strong><span>Add this member space to your iPhone or Android home screen.</span></div><button onClick={promptEvent ? install : () => setOpen(true)}><Download size={16}/>{promptEvent ? 'Install app' : 'How to install'}</button></div>{open&&<div className="install-overlay" onMouseDown={event=>{if(event.target===event.currentTarget)setOpen(false)}}><div className="install-dialog" role="dialog" aria-modal="true" aria-labelledby="install-title"><button className="install-close" aria-label="Close install instructions" onClick={()=>setOpen(false)}><X size={19}/></button><div className="eyebrow"><span className="eyebrow-line"/> MEMBER APP</div><h2 id="install-title">Add it to your phone.</h2><div className="install-steps"><div><strong>iPhone</strong><p>Open the published site in Safari, tap Share, then Add to Home Screen. Leave “Open as Web App” enabled if shown.</p></div><div><strong>Android</strong><p>Open the published site in Chrome, tap the menu, then Install app or Add to Home screen.</p></div></div><p className="install-note">This is an installable web app prototype. App Store and Google Play versions are planned after the backend and member account features are ready.</p></div></div>}</>;
}

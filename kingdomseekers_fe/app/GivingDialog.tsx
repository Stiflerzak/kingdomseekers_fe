'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Heart, Megaphone, Volume2, X } from 'lucide-react';

const purposes = [
  { name: 'Tithe', detail: 'Set apart your tithe in support of the ministry.' },
  { name: 'Offering', detail: 'Give an offering as part of worship.' },
  { name: 'Sacrifice', detail: 'Make a personal sacrificial gift.' },
  { name: 'Project', detail: 'Partner with a specific branch project.' },
] as const;

export default function GivingDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [purpose, setPurpose] = useState<(typeof purposes)[number]['name']>('Offering');
  const [project, setProject] = useState('Church sound system');
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); previousFocus?.focus(); };
  }, [open, onClose]);

  if (!open) return null;
  const selected = purposes.find((item) => item.name === purpose)!;

  return <div className="modal-backdrop giving-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="giving-dialog" role="dialog" aria-modal="true" aria-labelledby="giving-title">
      <button ref={closeButton} className="modal-close" aria-label="Close giving options" onClick={onClose}><X size={21}/></button>
      <div className="giving-dialog-intro"><span className="giving-kicker"><Heart size={16}/> PARTNER WITH US</span><h2 id="giving-title">Giving with <em>purpose.</em></h2><p>Choose how you would like to support the work at Kingdom Seekers Eastern Bypass.</p></div>
      <div className="giving-options" role="group" aria-label="Giving purpose">{purposes.map((item) => <button key={item.name} className={purpose === item.name ? 'selected' : ''} aria-pressed={purpose === item.name} onClick={() => setPurpose(item.name)}><strong>{item.name}</strong><span>{item.detail}</span></button>)}</div>
      {purpose === 'Project' && <div className="giving-projects"><span>CHOOSE A PROJECT</span><button className={project === 'Church sound system' ? 'selected' : ''} onClick={() => setProject('Church sound system')}><Volume2 size={17}/> Church sound system</button><button className={project === 'Evangelism outreach' ? 'selected' : ''} onClick={() => setProject('Evangelism outreach')}><Megaphone size={17}/> Evangelism outreach</button></div>}
      <div className="giving-methods"><span>PAYMENT METHODS · PREVIEW</span><div className="payment-method-grid"><div className="payment-method"><img className="payment-method-art" src="/images/payment-mpesa.svg" alt="" width="180" height="112"/><strong>M-Pesa</strong><small>Mobile money</small><p>Paybill 247247<br/>Account pending</p></div><div className="payment-method"><img className="payment-method-art" src="/images/payment-rtgs.svg" alt="" width="180" height="112"/><strong>RTGS</strong><small>Bank transfer</small><p>Bank and account details pending</p></div><div className="payment-method"><img className="payment-method-art" src="/images/payment-pdq.svg" alt="" width="180" height="112"/><strong>PDQ terminal</strong><small>Card payment</small><p>Coming soon</p></div></div></div>
      <div className="giving-next"><span>SELECTED PURPOSE</span><strong>{purpose === 'Project' ? project : selected.name}</strong><p>Before sending a payment, please wait for the church to confirm the complete account and recipient details.</p><a href="#giving" onClick={onClose}>View giving details <ArrowRight size={16}/></a></div>
    </div>
  </div>;
}

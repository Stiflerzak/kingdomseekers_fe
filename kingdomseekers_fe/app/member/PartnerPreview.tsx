'use client';

import { useState } from 'react';
import { ArrowRight, HandCoins, MessageSquareText, Smartphone } from 'lucide-react';

const purposes = ['Tithe', 'Offering', 'Sacrifice', 'Sound system project', 'Evangelism project'] as const;

export default function PartnerPreview() {
  const [purpose, setPurpose] = useState<(typeof purposes)[number]>('Offering');
  const [messageOpen, setMessageOpen] = useState(false);
  const choose = (value: (typeof purposes)[number]) => { setPurpose(value); setMessageOpen(false); };

  return <div className="partner-preview"><div className="partner-preview-copy"><span className="card-eyebrow"><HandCoins size={18}/> PARTNER & CONTRIBUTE · CONCEPT</span><h2>Every gift has a purpose.</h2><p>Preview how a member could choose a contribution and receive a clear mobile message. This demo does not connect to a USSD service or send a payment.</p><div className="partner-purpose-list" role="group" aria-label="Select a giving purpose">{purposes.map((value) => <button key={value} aria-pressed={purpose === value} className={purpose === value ? 'active' : ''} onClick={() => choose(value)}>{value}</button>)}</div><button className="partner-message-action" onClick={() => setMessageOpen(true)}>Preview partner message <ArrowRight size={17}/></button><p className="partner-payment-note">Paybill 247247 was supplied for the concept. The account number, recipient and USSD shortcode still require church confirmation.</p></div><div className="ussd-phone" aria-label="Sample USSD style mobile screen"><div className="ussd-phone-top"><span>KS</span><span>9:41</span></div><div className="ussd-screen"><div className="ussd-screen-heading"><Smartphone size={18}/> KINGDOM SEEKERS</div><span className="ussd-preview-label">USSD FLOW · SAMPLE ONLY</span><div className="ussd-window"><strong>Partner with the work</strong><p>Select a contribution:</p>{purposes.map((value, index) => <span key={value}>{index + 1}. {value}</span>)}<small>Shortcode to be confirmed</small></div>{messageOpen && <div className="ussd-message" role="status"><MessageSquareText size={16}/><p>Sample message: Thank you for choosing <strong>{purpose}</strong>. Please wait for verified payment instructions from Kingdom Seekers Eastern Bypass. No contribution has been processed.</p></div>}</div><div className="ussd-phone-home"/></div></div>;
}

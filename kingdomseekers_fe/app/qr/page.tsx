'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import { ArrowLeft, Check, Copy, Download, Link2, QrCode } from 'lucide-react';

type Preset = 'website' | 'visit' | 'member' | 'custom';

function validWebUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return (url.protocol === 'https:' || url.protocol === 'http:') && Boolean(url.hostname);
  } catch { return false; }
}

export default function QRPage() {
  const [origin, setOrigin] = useState('');
  const [preset, setPreset] = useState<Preset>('website');
  const [custom, setCustom] = useState('');
  const [svg, setSvg] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => setOrigin(window.location.origin), []);

  const url = preset === 'custom' ? custom.trim() : origin ? `${origin}${preset === 'member' ? '/member' : preset === 'visit' ? '/#visit' : '/'}` : '';
  const valid = validWebUrl(url);

  useEffect(() => {
    let active = true;
    if (!valid) { setSvg(''); return; }
    QRCode.toString(url, { type: 'svg', width: 360, margin: 3, errorCorrectionLevel: 'H', color: { dark: '#142b3c', light: '#ffffff' } })
      .then(result => { if (active) setSvg(result); })
      .catch(() => { if (active) setSvg(''); });
    return () => { active = false; };
  }, [url, valid]);

  function download() {
    if (!svg) return;
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = `kingdom-seekers-${preset}-qr.svg`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  }

  async function copy() {
    if (!valid) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return <main className="qr-page"><div className="qr-header container"><Link className="brand" href="/"><img className="brand-logo" src="/images/logo.svg" alt="" width="46" height="46"/><span className="brand-words"><strong>KINGDOM<br/>SEEKERS</strong><small>EASTERN BYPASS</small></span></Link><Link href="/" className="qr-back"><ArrowLeft size={16}/> Back to website</Link></div><section className="qr-content container"><div className="qr-intro"><div className="eyebrow"><span className="eyebrow-line"/> SHARE & CONNECT</div><h1>A simple way<br/><em>to find us.</em></h1><p>Generate a scannable SVG QR code for a church page or any confirmed web link. Download it for a poster, invitation or social graphic.</p><div className="qr-context"><QrCode size={22}/><span>Vector QR code · print-ready · generated in your browser</span></div></div><div className="qr-tool"><div className="qr-tool-heading"><span>QR GENERATOR</span><span>CONCEPT TOOL</span></div><h2>Choose a destination</h2><div className="qr-presets" role="group" aria-label="QR destination">{([['website','Website'],['visit','Visit details'],['member','Member space'],['custom','Custom link']] as const).map(([key,label]) => <button key={key} className={preset === key ? 'active' : ''} onClick={() => setPreset(key)}>{label}</button>)}</div>{preset === 'custom' ? <label className="qr-url-label">Destination URL<input type="url" value={custom} onChange={e => setCustom(e.target.value)} placeholder="https://your-confirmed-link.com" aria-invalid={Boolean(custom) && !valid}/></label> : <div className="qr-destination"><span><Link2 size={16}/> Destination</span><code>{url || 'Loading page address…'}</code></div>}{preset === 'custom' && custom && !valid && <p className="qr-error">Enter a complete http:// or https:// URL.</p>}{origin.includes('localhost') && preset !== 'custom' && <p className="qr-warning">This preview points to localhost. Choose Custom link and enter the published church URL before printing or sharing.</p>}<div className="qr-preview"><div className="qr-preview-image">{svg ? <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`} alt={`QR code for ${url}`} width="250" height="250"/> : <span>Enter a valid link to preview a QR code.</span>}</div><div className="qr-preview-copy"><img src="/images/logo.svg" alt="Kingdom Seekers Fellowship logo" width="56" height="56"/><strong>KINGDOM SEEKERS</strong><small>EASTERN BYPASS · NAIROBI</small><span>Scan to connect</span></div></div><div className="qr-actions"><button className="button button-gold" disabled={!svg} onClick={download}><Download size={17}/> Download SVG</button><button className="qr-copy" disabled={!valid} onClick={copy}>{copied ? <Check size={17}/> : <Copy size={17}/>} {copied ? 'Copied' : 'Copy link'}</button></div><p className="qr-footnote">Test the downloaded code with a phone before printing. Links to giving, events or maps should be used only after the branch confirms them.</p></div></section></main>;
}

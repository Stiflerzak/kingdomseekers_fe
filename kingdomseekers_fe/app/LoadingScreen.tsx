'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(false); return; }
    const timer = window.setTimeout(() => setVisible(false), 1050);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return <div className="brand-loader" role="status" aria-label="Loading Kingdom Seekers"><div className="brand-loader-ring"><img src="/images/logo.svg" width="94" height="94" alt=""/></div><span>KINGDOM SEEKERS</span><small>EASTERN BYPASS</small><div className="brand-loader-track"><i/></div></div>;
}

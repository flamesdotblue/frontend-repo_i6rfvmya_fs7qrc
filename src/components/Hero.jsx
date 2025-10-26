import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Volume2 } from 'lucide-react';

export default function Hero() {
  const [spoken, setSpoken] = useState(false);
  const hasSpokenRef = useRef(false);

  // Speak intro once on first user interaction (autoplay policies)
  useEffect(() => {
    const handler = () => {
      if (hasSpokenRef.current) return;
      trySpeak();
      hasSpokenRef.current = true;
    };
    window.addEventListener('click', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('keydown', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trySpeak = () => {
    if (typeof window === 'undefined') return;
    const text = "Hello! I’m your smart assistant. Tell me anything — I can read, reply, search, schedule, or automate for you.";
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1.0;
      utter.pitch = 1.0;
      utter.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
      setSpoken(true);
    }
  };

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* soft gradient glow overlay (won't block the Spline) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.16),transparent_55%)]" />

      <div className="relative z-10 px-6 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
          <Rocket size={14} className="text-indigo-300" />
          Fully autonomous, voice-enabled AI assistant
        </div>

        <h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Speak naturally. Your no‑code agent will understand and act.
        </h1>
        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          Use your voice to read and draft emails, send messages, search, schedule, and automate across your apps — on desktop or mobile.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={trySpeak}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 shadow-lg shadow-indigo-500/25 transition"
          >
            <Volume2 size={18} />
            {spoken ? 'Play intro again' : 'Play voice intro'}
          </button>
        </div>
      </div>
    </section>
  );
}

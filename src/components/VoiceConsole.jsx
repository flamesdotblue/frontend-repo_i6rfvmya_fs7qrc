import React, { useEffect, useRef, useState } from 'react';
import { Mic, Square, Volume2, Activity } from 'lucide-react';

export default function VoiceConsole() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onresult = (event) => {
        let text = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setTranscript(text.trim());
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onerror = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      setTranscript('');
      setResponse('');
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      setListening(false);
      handleAgentResponse();
    }
  };

  const handleAgentResponse = () => {
    if (!transcript) return;
    const reply = `Okay, I understood: "${transcript}". I will route this to the right no‑code automation and ask for confirmation if needed.`;
    setResponse(reply);
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(reply);
      utter.rate = 1.0;
      utter.pitch = 1.0;
      utter.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  };

  const playResponse = () => {
    if (!response) return;
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(response);
      utter.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <section className="relative py-12 md:py-16 bg-slate-950">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Voice commands</h2>
            <p className="mt-2 text-slate-300">Speak naturally. Your assistant detects intent, confirms critical actions, and triggers automations.</p>
          </div>

          <div className="flex items-center gap-3">
            {!listening ? (
              <button onClick={startListening} className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 shadow-lg shadow-emerald-500/25 transition">
                <Mic size={18} /> Start listening
              </button>
            ) : (
              <button onClick={stopListening} className="inline-flex items-center gap-2 rounded-lg bg-rose-500 hover:bg-rose-400 text-white px-4 py-2 shadow-lg shadow-rose-500/25 transition">
                <Square size={18} /> Stop
              </button>
            )}
            <button onClick={playResponse} className="inline-flex items-center gap-2 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white px-4 py-2 transition">
              <Volume2 size={18} /> Read out
            </button>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Activity size={14} className="text-emerald-300" /> Live transcript
            </div>
            <div className="mt-2 min-h-[96px] whitespace-pre-wrap text-white/90">
              {transcript || '—'}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Volume2 size={14} className="text-indigo-300" /> Assistant response
            </div>
            <div className="mt-2 min-h-[96px] whitespace-pre-wrap text-white/90">
              {response || '—'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

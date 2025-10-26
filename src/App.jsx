import React from 'react';
import Hero from './components/Hero';
import VoiceConsole from './components/VoiceConsole';
import Integrations from './components/Integrations';
import DashboardPreview from './components/DashboardPreview';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <VoiceConsole />
      <Integrations />
      <DashboardPreview />

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-white/70">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p>
              Memory system ready: memory.md, architecture.md, development-notes.md, troubleshooting.md — the assistant can read and update these after each task.
            </p>
            <p className="text-white/50">Works across desktop and mobile browsers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

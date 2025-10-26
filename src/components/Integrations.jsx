import React from 'react';
import { Mail, MessageSquare, Calendar, Shield, Search, Globe, Bot, Database } from 'lucide-react';

const items = [
  { icon: Mail, label: 'Gmail' },
  { icon: Mail, label: 'Outlook' },
  { icon: MessageSquare, label: 'WhatsApp' },
  { icon: Calendar, label: 'Google Calendar' },
  { icon: Globe, label: 'Bardeen.ai' },
  { icon: Globe, label: 'Browse.ai' },
  { icon: Search, label: 'Google Search' },
  { icon: Database, label: 'Airtable' },
  { icon: Database, label: 'Notion' },
  { icon: Bot, label: 'OpenAI Realtime / ElevenLabs' },
  { icon: Shield, label: 'Auth0 / Firebase' },
];

export default function Integrations() {
  return (
    <section className="py-12 md:py-16 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">No‑code integrations</h2>
        <p className="mt-2 text-slate-300">Visually connect to your apps and data stores. Trigger automations from voice or text.</p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Icon size={18} className="text-indigo-300" />
              </div>
              <div className="text-white/90 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

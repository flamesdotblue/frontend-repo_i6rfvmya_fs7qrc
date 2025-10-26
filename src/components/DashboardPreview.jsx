import React from 'react';
import { BarChart2, ListChecks } from 'lucide-react';

const stats = [
  { label: 'Emails sent', value: 3 },
  { label: 'Meetings scheduled', value: 2 },
  { label: 'Videos watched', value: 1 },
  { label: 'Automations run', value: 7 },
];

export default function DashboardPreview() {
  const maxVal = Math.max(...stats.map(s => s.value)) || 1;

  return (
    <section className="py-12 md:py-16 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Daily dashboard</h2>
          <div className="inline-flex items-center gap-2 text-xs text-white/70">
            <ListChecks size={14} className="text-emerald-300" /> Secure summaries of actions taken
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-white/80 text-sm">Today</div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg bg-black/20 p-4 border border-white/10">
                  <div className="text-2xl font-semibold text-white">{s.value}</div>
                  <div className="text-xs text-slate-300 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <BarChart2 size={16} className="text-indigo-300" /> Activity overview
            </div>
            <div className="mt-4 h-40 flex items-end gap-2">
              {stats.map((s) => (
                <div key={s.label} className="flex-1">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-indigo-500 to-violet-400"
                    style={{ height: `${(s.value / maxVal) * 100}%` }}
                    title={`${s.label}: ${s.value}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-white/70">
              {stats.map((s) => (
                <div key={s.label} className="truncate">{s.label}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

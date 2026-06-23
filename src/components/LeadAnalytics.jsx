import React, { useMemo } from 'react';

// Harmonious custom colors matching the dark theme
const PURPOSE_COLORS = {
  'Hire Me': { stroke: '#6366f1', bg: 'rgba(99, 102, 241, 0.2)', text: 'text-indigo-400' },
  'Freelance Project': { stroke: '#a855f7', bg: 'rgba(168, 85, 247, 0.2)', text: 'text-purple-400' },
  'Event Collaboration': { stroke: '#ec4899', bg: 'rgba(236, 72, 153, 0.2)', text: 'text-pink-400' },
  'Speaking Opportunity': { stroke: '#10b981', bg: 'rgba(16, 185, 129, 0.2)', text: 'text-emerald-400' },
  'Mentorship': { stroke: '#f59e0b', bg: 'rgba(245, 158, 11, 0.2)', text: 'text-amber-400' },
  'Partnership': { stroke: '#3b82f6', bg: 'rgba(59, 130, 246, 0.2)', text: 'text-blue-400' },
  'Other': { stroke: '#94a3b8', bg: 'rgba(148, 163, 184, 0.2)', text: 'text-slate-400' },
};

export default function LeadAnalytics({ leads }) {
  
  // 1. Purpose Breakdown Stats
  const purposeStats = useMemo(() => {
    const counts = {};
    leads.forEach(lead => {
      const p = lead.purpose || 'Other';
      counts[p] = (counts[p] || 0) + 1;
    });

    const total = leads.length || 1;
    return Object.keys(counts).map(purpose => ({
      name: purpose,
      value: counts[purpose],
      percentage: Math.round((counts[purpose] / total) * 100),
      color: PURPOSE_COLORS[purpose] || PURPOSE_COLORS['Other'],
    })).sort((a, b) => b.value - a.value);
  }, [leads]);

  // 2. Monthly Trend Stats (Last 6 Months)
  const monthlyStats = useMemo(() => {
    const months = [];
    const now = new Date();
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        label: d.toLocaleString('en-US', { month: 'short' }),
        count: 0,
      });
    }

    leads.forEach(lead => {
      const leadDate = new Date(lead.created_at);
      const leadKey = `${leadDate.getFullYear()}-${String(leadDate.getMonth() + 1).padStart(2, '0')}`;
      const found = months.find(m => m.key === leadKey);
      if (found) {
        found.count += 1;
      }
    });

    return months;
  }, [leads]);

  // SVG Area Chart drawing logic
  const areaChartPath = useMemo(() => {
    if (monthlyStats.length === 0) return { line: '', area: '' };

    const width = 500;
    const height = 150;
    const padding = 30;
    
    const maxVal = Math.max(...monthlyStats.map(m => m.count), 5); // Minimum peak scale of 5
    const points = monthlyStats.map((m, idx) => {
      const x = padding + (idx * (width - 2 * padding)) / (monthlyStats.length - 1);
      const y = height - padding - (m.count / maxVal) * (height - 2 * padding);
      return { x, y };
    });

    // Create SVG Path for the Line
    const linePath = points.reduce((acc, p, idx) => {
      return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');

    // Close the path for the Area fill
    const areaPath = linePath 
      ? `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z` 
      : '';

    return { 
      line: linePath, 
      area: areaPath, 
      points,
      width,
      height,
      padding
    };
  }, [monthlyStats]);

  // SVG Donut segments calculations
  const donutSegments = useMemo(() => {
    let accumulatedPercent = 0;
    const radius = 50;
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius; // ~314.16

    return purposeStats.map((stat) => {
      const percentage = stat.percentage;
      const strokeDashoffset = circumference - (percentage / 100) * circumference;
      const rotation = (accumulatedPercent / 100) * 360;
      accumulatedPercent += percentage;

      return {
        ...stat,
        circumference,
        strokeDashoffset,
        rotation,
        radius,
        strokeWidth,
      };
    });
  }, [purposeStats]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* 1. Monthly Leads Volume Area Chart */}
      <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
        <h3 className="text-lg font-semibold text-slate-200 mb-6 flex justify-between items-center">
          <span>Leads Volume Trend</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Last 6 Months
          </span>
        </h3>

        {leads.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-slate-500 text-sm">
            No data available
          </div>
        ) : (
          <div className="relative">
            {/* SVG custom graph */}
            <svg 
              viewBox={`0 0 ${areaChartPath.width} ${areaChartPath.height}`} 
              className="w-full h-auto overflow-visible"
            >
              {/* Gradients */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line 
                x1={areaChartPath.padding} 
                y1={areaChartPath.height - areaChartPath.padding} 
                x2={areaChartPath.width - areaChartPath.padding} 
                y2={areaChartPath.height - areaChartPath.padding} 
                className="stroke-slate-800"
                strokeWidth="1"
              />
              <line 
                x1={areaChartPath.padding} 
                y1={areaChartPath.padding} 
                x2={areaChartPath.width - areaChartPath.padding} 
                y2={areaChartPath.padding} 
                className="stroke-slate-800/40"
                strokeDasharray="4 4"
                strokeWidth="1"
              />

              {/* Area Under Line */}
              {areaChartPath.area && (
                <path d={areaChartPath.area} fill="url(#chartGradient)" />
              )}

              {/* Curve Line */}
              {areaChartPath.line && (
                <path 
                  d={areaChartPath.line} 
                  fill="none" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              )}

              {/* Interaction Data Points */}
              {areaChartPath.points && areaChartPath.points.map((p, idx) => (
                <g key={idx} className="group/point cursor-pointer">
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="5" 
                    fill="#0f172a" 
                    stroke={idx % 2 === 0 ? '#6366f1' : '#a855f7'}
                    strokeWidth="3.5"
                    className="transition-all duration-200 group-hover/point:r-7"
                  />
                  {/* Tooltip on point hover */}
                  <text
                    x={p.x}
                    y={p.y - 12}
                    textAnchor="middle"
                    fill="#f3f4f6"
                    fontSize="10"
                    fontWeight="bold"
                    className="opacity-0 group-hover/point:opacity-100 transition-opacity duration-200 bg-slate-900 px-1"
                  >
                    {monthlyStats[idx].count}
                  </text>
                </g>
              ))}

              {/* Monthly Labels */}
              {monthlyStats.map((m, idx) => {
                const x = areaChartPath.padding + (idx * (areaChartPath.width - 2 * areaChartPath.padding)) / (monthlyStats.length - 1);
                return (
                  <text
                    key={idx}
                    x={x}
                    y={areaChartPath.height - 8}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                    fontWeight="500"
                  >
                    {m.label}
                  </text>
                );
              })}
            </svg>
          </div>
        )}
      </div>

      {/* 2. Purpose Distribution Donut Chart */}
      <div className="p-6 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-slate-200 mb-6">
          Purpose Breakdown
        </h3>

        {leads.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-slate-500 text-sm">
            No data available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Donut SVG */}
            <div className="relative flex justify-center items-center">
              <svg width="150" height="150" viewBox="0 0 120 120" className="transform -rotate-90">
                {donutSegments.map((seg, idx) => (
                  <circle
                    key={idx}
                    cx="60"
                    cy="60"
                    r={seg.radius}
                    fill="transparent"
                    stroke={seg.color.stroke}
                    strokeWidth={seg.strokeWidth}
                    strokeDasharray={seg.circumference}
                    strokeDashoffset={seg.strokeDashoffset}
                    transform={`rotate(${seg.rotation} 60 60)`}
                    strokeLinecap="round"
                    className="transition-all duration-500 hover:opacity-85 cursor-pointer"
                  />
                ))}
                {/* Hollow center for text */}
                <circle cx="60" cy="60" r="41" fill="#0b0f19" />
              </svg>

              {/* Absolute Center Counter */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-100">{leads.length}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Leads</span>
              </div>
            </div>

            {/* Legend Cards */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {purposeStats.slice(0, 5).map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/40 border border-white/5">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full inline-block shrink-0" 
                      style={{ backgroundColor: stat.color.stroke }}
                    />
                    <span className="text-slate-300 truncate max-w-[100px]">{stat.name}</span>
                  </div>
                  <div className="font-semibold text-slate-200">
                    {stat.value} <span className="text-slate-500 font-normal">({stat.percentage}%)</span>
                  </div>
                </div>
              ))}
              {purposeStats.length > 5 && (
                <div className="text-[10px] text-center text-slate-500 italic mt-1">
                  + {purposeStats.length - 5} more types
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/currency';

const SavingsChart = ({ savings }) => {
  const sorted = [...savings].sort((a, b) => new Date(a.date) - new Date(b.date));

  let running = 0;
  const trendData = sorted.map((s) => {
    const signedAmount = s.type === 'WITHDRAWAL' ? -parseFloat(s.amount) : parseFloat(s.amount);
    running += signedAmount;
    return {
      date: new Date(s.date).toLocaleDateString(),
      total: running,
    };
  });

  const tooltipStyle = {
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '13px',
  };

  if (trendData.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-zinc-500 text-sm">Add a savings entry to see your trend here</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={trendData}>
        <defs>
          <linearGradient id="savingsGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
        <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} stroke="#71717a" fontSize={12} />
        <YAxis stroke="#71717a" fontSize={12} />
        <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SavingsChart;
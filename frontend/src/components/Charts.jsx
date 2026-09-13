import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatCurrency } from '../utils/currency';

const Charts = ({ expenses }) => {
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.value += parseFloat(expense.amount);
    } else {
      acc.push({ name: expense.category, value: parseFloat(expense.amount) });
    }
    return acc;
  }, []);

  const dateData = expenses
    .reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.amount += parseFloat(expense.amount);
      } else {
        acc.push({ date, amount: parseFloat(expense.amount) });
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const COLORS = ['#f97316', '#f59e0b', '#fb923c', '#fbbf24', '#ea580c', '#d97706', '#fdba74'];

  const tooltipStyle = {
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '13px',
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-4 text-zinc-400">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
              outerRadius={80}
              fill="#f97316"
              dataKey="value"
              stroke="#09090b"
              strokeWidth={2}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {dateData.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-4 text-zinc-400">Spending Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dateData}>
              <defs>
                <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} stroke="#71717a" fontSize={12} />
              <YAxis stroke="#71717a" fontSize={12} />
              <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Charts;
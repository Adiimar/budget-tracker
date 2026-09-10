import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const Charts = ({ expenses }) => {
  // Category breakdown
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.value += parseFloat(expense.amount);
    } else {
      acc.push({ name: expense.category, value: parseFloat(expense.amount) });
    }
    return acc;
  }, []);

  // Daily spending trend
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

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

  return (
    <div className="space-y-6">
      {/* Pie Chart */}
      <div>
        <h3 className="font-bold text-lg mb-4 text-gray-800">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      {dateData.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-800">Spending Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Charts;

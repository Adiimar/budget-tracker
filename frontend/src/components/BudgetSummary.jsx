import React, { useState } from 'react';
import { budgetAPI } from '../api/api';

const BudgetSummary = ({ budgets, onBudgetDeleted }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    limitAmount: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'limitAmount' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await budgetAPI.create(formData);
      setFormData({ category: '', limitAmount: '' });
      setShowForm(false);
      onBudgetDeleted();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create budget');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this budget?')) {
      try {
        await budgetAPI.delete(id);
        onBudgetDeleted();
      } catch (err) {
        alert('Failed to delete budget');
      }
    }
  };

  return (
    <div>
      {budgets.map((budget) => {
        const percentUsed = (budget.spent / budget.limitAmount) * 100;
        const isOverBudget = budget.spent > budget.limitAmount;

        return (
          <div key={budget.id} className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-gray-800">{budget.category}</p>
                <p className="text-sm text-gray-600">${budget.spent.toFixed(2)} / ${budget.limitAmount.toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleDelete(budget.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
              >
                Delete
              </button>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  isOverBudget ? 'bg-red-500' : percentUsed > 75 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              />
            </div>
          </div>
        );
      })}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          + Add Budget
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 bg-white p-4 rounded-lg border border-gray-200">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            required
          />
          <input
            type="number"
            name="limitAmount"
            placeholder="Budget Limit ($)"
            value={formData.limitAmount}
            onChange={handleChange}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded text-sm disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BudgetSummary;

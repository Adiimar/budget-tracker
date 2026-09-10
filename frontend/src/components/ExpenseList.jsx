import React from 'react';
import { expenseAPI } from '../api/api';

const ExpenseList = ({ expenses, onExpenseDeleted }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseAPI.delete(id);
        onExpenseDeleted();
      } catch (err) {
        alert('Failed to delete expense');
      }
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-2">
      {sortedExpenses.map((expense) => (
        <div key={expense.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-bold text-gray-800">{expense.category}</span>
              <span className="text-green-600 font-bold">${expense.amount.toFixed(2)}</span>
            </div>
            <p className="text-gray-600 text-sm">{expense.description}</p>
            <p className="text-gray-400 text-xs mt-1">{new Date(expense.date).toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => handleDelete(expense.id)}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;

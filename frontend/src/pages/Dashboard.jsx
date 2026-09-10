import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expenseAPI, budgetAPI } from '../api/api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import BudgetSummary from '../components/BudgetSummary';
import Charts from '../components/Charts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const userName = localStorage.getItem('userName');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expenseRes, budgetRes] = await Promise.all([
        expenseAPI.getAll(),
        budgetAPI.getAll(),
      ]);
      setExpenses(expenseRes.data);
      setBudgets(budgetRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleExpenseAdded = () => {
    setShowExpenseForm(false);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Budget Tracker</h1>
            <p className="text-blue-100">Welcome, {userName}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Forms and Lists */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Expense Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={() => setShowExpenseForm(!showExpenseForm)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                {showExpenseForm ? 'Cancel' : '+ Add Expense'}
              </button>
              {showExpenseForm && <ExpenseForm onExpenseAdded={handleExpenseAdded} />}
            </div>

            {/* Expense List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
              {expenses.length > 0 ? (
                <ExpenseList expenses={expenses} onExpenseDeleted={fetchData} />
              ) : (
                <p className="text-gray-500 text-center py-8">No expenses yet. Add one to get started!</p>
              )}
            </div>
          </div>

          {/* Right Column - Summary and Charts */}
          <div className="space-y-6">
            {/* Budget Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Budget Overview</h2>
              {budgets.length > 0 ? (
                <BudgetSummary budgets={budgets} onBudgetDeleted={fetchData} />
              ) : (
                <p className="text-gray-500 text-center py-4">No budgets set. Create one to track limits!</p>
              )}
            </div>

            {/* Charts */}
            {expenses.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Analytics</h2>
                <Charts expenses={expenses} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

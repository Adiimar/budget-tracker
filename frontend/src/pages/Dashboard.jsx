import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expenseAPI, budgetAPI } from '../api/api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import BudgetSummary from '../components/BudgetSummary';
import Charts from '../components/Charts';
import { formatCurrency } from '../utils/currency';

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

  const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
  const totalBudget = budgets.reduce((sum, b) => sum + parseFloat(b.limitAmount || 0), 0);
  const remaining = totalBudget - totalSpent;

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin" />
          <div className="text-zinc-400 font-medium">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-900 sticky top-0 z-10 bg-zinc-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-2.5 shadow-lg shadow-orange-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Budget Tracker</h1>
              <p className="text-zinc-500 text-sm">Welcome back, {userName}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium py-2 px-4 rounded-xl transition-colors duration-150 flex items-center gap-2 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero balance card */}
        <div className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 mb-6">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-zinc-400 text-sm font-medium">Total Spent</p>
            <p className="text-4xl sm:text-5xl font-bold mt-1 tracking-tight">{formatCurrency(totalSpent)}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 flex-1 min-w-[140px]">
                <p className="text-zinc-500 text-xs font-medium">Total Budget</p>
                <p className="text-lg font-bold mt-0.5">{formatCurrency(totalBudget)}</p>
              </div>
              <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 flex-1 min-w-[140px]">
                <p className="text-zinc-500 text-xs font-medium">Remaining</p>
                <p className={`text-lg font-bold mt-0.5 ${remaining < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {formatCurrency(remaining)}
                </p>
              </div>
              <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 flex-1 min-w-[140px]">
                <p className="text-zinc-500 text-xs font-medium">Expenses Logged</p>
                <p className="text-lg font-bold mt-0.5">{expenses.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Forms and Lists */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Expense Section */}
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
              <button
                onClick={() => setShowExpenseForm(!showExpenseForm)}
                className={`w-full font-semibold py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 ${
                  showExpenseForm
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/20'
                }`}
              >
                {showExpenseForm ? (
                  'Cancel'
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Expense
                  </>
                )}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${showExpenseForm ? 'max-h-[600px] opacity-100 mt-5' : 'max-h-0 opacity-0'}`}>
                <ExpenseForm onExpenseAdded={handleExpenseAdded} />
              </div>
            </div>

            {/* Expense List */}
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
              <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
              {expenses.length > 0 ? (
                <ExpenseList expenses={expenses} onExpenseDeleted={fetchData} />
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-800 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <p className="text-zinc-400 font-medium">No expenses yet</p>
                  <p className="text-zinc-600 text-sm mt-1">Add one to get started!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Summary and Charts */}
          <div className="space-y-6">
            {/* Budget Summary */}
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
              <h2 className="text-lg font-bold mb-4">Budget Overview</h2>
              <BudgetSummary budgets={budgets} onBudgetDeleted={fetchData} />
            </div>

            {/* Charts */}
            {expenses.length > 0 && (
              <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
                <h2 className="text-lg font-bold mb-4">Statistics</h2>
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
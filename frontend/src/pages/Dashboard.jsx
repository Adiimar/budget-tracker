import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { expenseAPI, budgetAPI, savingAPI } from '../api/api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import BudgetSummary from '../components/BudgetSummary';
import Charts from '../components/Charts';
import SavingsSection from '../components/SavingsSection';
import SavingsChart from '../components/SavingsChart';
import { formatCurrency } from '../utils/currency';
import SavingsWithdrawals from '../components/SavingsWithdrawals';

const Dashboard = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [filterDate, setFilterDate] = useState('');

  const userName = localStorage.getItem('userName');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // allSettled: if one request fails, the others still load
      const [expenseRes, budgetRes, savingsRes] = await Promise.allSettled([
        expenseAPI.getAll(),
        budgetAPI.getAll(),
        savingAPI.getAll(),
      ]);

      if (expenseRes.status === 'fulfilled') setExpenses(expenseRes.value.data);
      if (budgetRes.status === 'fulfilled') setBudgets(budgetRes.value.data);
      if (savingsRes.status === 'fulfilled') setSavings(savingsRes.value.data);

      [expenseRes, budgetRes, savingsRes].forEach((r) => {
        if (r.status === 'rejected') {
          console.error('Fetch failed:', r.reason);
          const status = r.reason?.response?.status;
          if (status === 401 || status === 403) {
            navigate('/login');
          }
        }
      });
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
  
  // Expenses paid from savings must not reduce the remaining balance
  const balanceExpenses = expenses.filter((e) => e.source !== 'SAVINGS');
  const totalSpent = balanceExpenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
  const totalBudget = budgets.reduce((sum, b) => sum + parseFloat(b.limitAmount || 0), 0);
  
  // Money moved into savings leaves the balance (withdrawals don't touch it)
  const totalMovedToSavings = savings
    .filter((s) => s.type !== 'WITHDRAWAL')
    .reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
  
  const remaining = totalBudget - totalSpent - totalMovedToSavings;
  const totalSavings = savings.reduce(
    (sum, s) => sum + (s.type === 'WITHDRAWAL' ? -parseFloat(s.amount || 0) : parseFloat(s.amount || 0)),
    0
  );

  const filteredExpenses = filterDate
    ? expenses.filter((e) => {
        const expenseDate = new Date(e.date).toISOString().split('T')[0];
        return expenseDate === filterDate;
      })
    : expenses;

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-zinc-800 border-t-emerald-500 rounded-full animate-spin" />
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
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-2.5 shadow-lg shadow-emerald-500/20">
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
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 mb-6">
          <p className="text-zinc-400 text-sm font-medium">Remaining</p>
          <p
            className={`text-4xl sm:text-5xl font-bold mt-1 tracking-tight ${
              remaining < 0 ? 'text-red-400' : 'text-emerald-400'
            }`}
          >
            {formatCurrency(remaining)}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 flex-1 min-w-[140px]">
              <p className="text-zinc-500 text-xs font-medium">Total Budget</p>
              <p className="text-lg font-bold mt-0.5">{formatCurrency(totalBudget)}</p>
            </div>
            <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 flex-1 min-w-[140px]">
              <p className="text-zinc-500 text-xs font-medium">Total Spent</p>
              <p className="text-lg font-bold mt-0.5">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 flex-1 min-w-[140px]">
              <p className="text-zinc-500 text-xs font-medium">Expenses Logged</p>
              <p className="text-lg font-bold mt-0.5">{expenses.length}</p>
            </div>
            <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 flex-1 min-w-[140px]">
              <p className="text-zinc-500 text-xs font-medium">Savings</p>
              <p className="text-lg font-bold mt-0.5">{formatCurrency(totalSavings)}</p>
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
                    : 'bg-emerald-700 hover:bg-emerald-600 text-white'
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
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showExpenseForm ? 'max-h-[1200px] opacity-100 mt-5' : 'max-h-0 opacity-0'
                }`}
              >
                <ExpenseForm onExpenseAdded={handleExpenseAdded} />
              </div>
            </div>

            {/* Expense List */}
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="text-lg font-bold">Recent Transactions</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all [color-scheme:dark]"
                    />
                  </div>
                  {filterDate && (
                    <button
                      onClick={() => setFilterDate('')}
                      className="text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-xl transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
              {filteredExpenses.length > 0 ? (
                <ExpenseList expenses={filteredExpenses} onExpenseDeleted={fetchData} />
              ) : filterDate ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-800 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <p className="text-zinc-400 font-medium">No transactions on this date</p>
                  <p className="text-zinc-600 text-sm mt-1">Try a different date, or clear the filter</p>
                </div>
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

            {/* Savings */}
              <SavingsSection savings={savings} remaining={remaining} onSavingsChanged={fetchData} />

            {/* Expenses paid from savings */}
              <SavingsWithdrawals savings={savings} onSavingsChanged={fetchData} />
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

            {/* Savings Trend */}
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
              <h2 className="text-lg font-bold mb-4 text-blue-400">Savings Trend</h2>
              <SavingsChart savings={savings} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
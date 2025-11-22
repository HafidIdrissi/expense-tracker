'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getExpenses,
  deleteExpense,
  getMonthlyTotal,
  getRemainingBudget,
  getDailyRecommendation,
  type Expense
} from '@/lib/storage';

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [dailyRecommendation, setDailyRecommendation] = useState(0);

  const loadData = () => {
    const allExpenses = getExpenses();
    setExpenses(allExpenses);
    
    const total = getMonthlyTotal(allExpenses);
    setMonthlyTotal(total);
    
    const remaining = getRemainingBudget(total);
    setRemainingBudget(remaining);
    
    const daily = getDailyRecommendation(remaining);
    setDailyRecommendation(daily);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Delete this expense?')) {
      deleteExpense(id);
      loadData();
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryEmoji = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food': return '🍔';
      case 'entertainment': return '🎉';
      case 'leisure': return '🎮';
      default: return '💰';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: 'white',
          fontSize: '32px',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          💸 My Expenses
        </h1>

        {/* Dashboard */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '16px',
          marginBottom: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontSize: '13px', color: '#7f8c8d', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total spent this month
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#e74c3c', marginTop: '5px' }}>
              €{monthlyTotal.toFixed(2)}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: '#7f8c8d', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Remaining budget
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: remainingBudget >= 0 ? '#27ae60' : '#e74c3c',
              marginTop: '5px'
            }}>
              €{remainingBudget.toFixed(2)}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '15px',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
          }}>
            <div style={{ fontSize: '14px', opacity: 0.95, fontWeight: '600' }}>
              💰 You can spend today
            </div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '8px' }}>
              €{dailyRecommendation > 0 ? dailyRecommendation.toFixed(2) : '0.00'}
            </div>
          </div>

          {/* Daily average visual */}
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '15px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)'
          }}>
            <div style={{ fontSize: '13px', opacity: 0.95, fontWeight: '600' }}>
              📊 Average daily spending this month
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px' }}>
              €{expenses.length > 0 ? (monthlyTotal / new Date().getDate()).toFixed(2) : '0.00'}
            </div>
          </div>
        </div>

        {/* Add button */}
        <Link href="/add" style={{
          display: 'block',
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          color: 'white',
          padding: '18px',
          textAlign: 'center',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(56, 239, 125, 0.4)',
          transition: 'transform 0.2s'
        }}>
          ➕ Add Expense
        </Link>

        {/* Expenses list */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{ 
            fontSize: '22px', 
            marginBottom: '20px',
            color: '#2c3e50',
            fontWeight: 'bold'
          }}>
            📋 History
          </h2>

          {expenses.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#95a5a6', padding: '40px 0', fontSize: '16px' }}>
              No expenses recorded
            </p>
          ) : (
            <div>
              {expenses
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map(expense => (
                  <div
                    key={expense.id}
                    style={{
                      background: '#f8f9fa',
                      border: '2px solid #e9ecef',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '12px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '8px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          color: '#e74c3c'
                        }}>
                          €{expense.amount.toFixed(2)}
                        </div>
                        <div style={{
                          fontSize: '15px',
                          color: '#555',
                          marginTop: '4px',
                          fontWeight: '600'
                        }}>
                          {getCategoryEmoji(expense.category)} {expense.category}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        style={{
                          background: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 8px rgba(235, 51, 73, 0.3)'
                        }}
                      >
                        🗑️
                      </button>
                    </div>

                    {expense.note && (
                      <div style={{
                        fontSize: '14px',
                        color: '#6c757d',
                        marginBottom: '8px',
                        fontStyle: 'italic',
                        padding: '8px',
                        background: 'white',
                        borderRadius: '6px'
                      }}>
                        💬 "{expense.note}"
                      </div>
                    )}

                    <div style={{
                      fontSize: '12px',
                      color: '#95a5a6',
                      fontWeight: '500'
                    }}>
                      🕒 {formatDate(expense.date)}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
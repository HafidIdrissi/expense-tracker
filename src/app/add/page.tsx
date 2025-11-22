'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addExpense } from '@/lib/storage';

export default function AddExpensePage() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  // Changed default to 'food' to match the select option value
  const [category, setCategory] = useState('food');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const amountNum = parseFloat(amount);

    // Validation
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      setError('Invalid amount');
      return;
    }

    if (!category) {
      setError('Category required');
      return;
    }

    // Add expense
    addExpense({
      amount: amountNum,
      category,
      note: note.trim() || undefined,
    });

    // Redirect to home
    router.push('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <Link href="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}>
            ← Back
          </Link>
        </div>

        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: 'white',
          fontSize: '32px',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          ➕ Add an expense
        </h1>

      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        {/* Amount */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#2c3e50'
          }}>
            Amount (€) *
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10.50"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              boxSizing: 'border-box',
              color: '#FFFFFF' // Fixed color so text is visible on white background
            }}
            autoFocus
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#2c3e50'
          }}>
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              boxSizing: 'border-box',
              background: 'white',
              color: '#2c3e50'
            }}
          >
            <option value="food">🍔 Food</option>
            <option value="outings">🎉 Outings</option>
            <option value="leisure">🎮 Leisure</option>
          </select>
        </div>

        {/* Note */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#2c3e50'
          }}>
            Note (optional)
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ex: Restaurant with friends"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              boxSizing: 'border-box',
              color: '#FFFFFF' // Fixed color so text is visible
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#e74c3c',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            color: 'white',
            padding: '16px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(56, 239, 125, 0.4)',
            transition: 'transform 0.2s'
          }}
        >
          ✅ Save
        </button>
      </form>

      <div style={{
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '14px',
        color: 'white',
        background: 'rgba(255,255,255,0.2)',
        padding: '12px',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)'
      }}>
        Monthly budget: €280 | Flexible goal: ~€10/day
      </div>
      </div>
    </div>
  );
}
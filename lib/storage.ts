export interface Expense {
  id: string;
  amount: number;
  category: string;
  note?: string;
  date: string; // ISO string
}

export function getExpenses(): Expense[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem('expenses');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture des dépenses:', error);
    return [];
  }
}

export function saveExpenses(expenses: Expense[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des dépenses:', error);
  }
}

export function addExpense(expense: Omit<Expense, 'id' | 'date'>): void {
  const expenses = getExpenses();
  
  const newExpense: Expense = {
    ...expense,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  
  expenses.push(newExpense);
  saveExpenses(expenses);
}

export function deleteExpense(id: string): void {
  const expenses = getExpenses();
  const filtered = expenses.filter(exp => exp.id !== id);
  saveExpenses(filtered);
}

// Fonctions utilitaires pour les calculs

export function getMonthlyTotal(expenses: Expense[]): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return expenses
    .filter(exp => {
      const expDate = new Date(exp.date);
      return expDate.getMonth() === currentMonth && 
             expDate.getFullYear() === currentYear;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);
}

export function getRemainingBudget(monthlyTotal: number): number {
  const MONTHLY_BUDGET = 280;
  return MONTHLY_BUDGET - monthlyTotal;
}

export function getDailyRecommendation(remainingBudget: number): number {
  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysRemaining = lastDayOfMonth.getDate() - now.getDate() + 1;
  
  if (daysRemaining <= 0) return 0;
  
  return remainingBudget / daysRemaining;
}
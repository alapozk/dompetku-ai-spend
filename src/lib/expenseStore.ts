import { useState, useCallback } from 'react';
import { Transaction, sampleTransactions, Category } from './sampleData';

let globalTransactions = [...sampleTransactions];
let globalBudget = 2000000; // Default 2M IDR
let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach(l => l());
}

export function useExpenseStore() {
  const [, setTick] = useState(0);

  const subscribe = useCallback(() => {
    const listener = () => setTick(t => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  useState(() => {
    const unsub = subscribe();
    return unsub;
  });

  const addExpense = useCallback((expense: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = { ...expense, id: crypto.randomUUID() };
    globalTransactions = [newTx, ...globalTransactions];
    notify();
    return newTx;
  }, []);

  const deleteExpense = useCallback((id: string) => {
    globalTransactions = globalTransactions.filter(t => t.id !== id);
    notify();
  }, []);

  const updateExpense = useCallback((id: string, updates: Partial<Omit<Transaction, 'id'>>) => {
    globalTransactions = globalTransactions.map(t => t.id === id ? { ...t, ...updates } : t);
    notify();
  }, []);

  const setBudget = useCallback((amount: number) => {
    globalBudget = amount;
    notify();
  }, []);

  const totalSpending = globalTransactions.reduce((sum, t) => sum + t.amount, 0);

  const spendingByCategory = globalTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<Category, number>);

  const topCategory = Object.entries(spendingByCategory).sort((a, b) => b[1] - a[1])[0] as [Category, number] | undefined;

  const budgetUsedPercent = globalBudget > 0 ? Math.min((totalSpending / globalBudget) * 100, 100) : 0;
  const budgetRemaining = globalBudget - totalSpending;

  return {
    transactions: globalTransactions,
    addExpense,
    deleteExpense,
    updateExpense,
    totalSpending,
    spendingByCategory,
    budget: globalBudget,
    setBudget,
    budgetUsedPercent,
    budgetRemaining,
    topCategory,
  };
}

export function classifyCategory(description: string): Category {
  const d = description.toLowerCase();
  if (/coffee|food|eat|lunch|dinner|breakfast|rice|mie|tea|restaurant|cafe|gofood|grabfood/.test(d)) return 'Food';
  if (/grab|gojek|bus|train|taxi|ride|transport|fuel|gas|parking/.test(d)) return 'Transport';
  if (/shop|buy|purchase|tokopedia|shopee|uniqlo|zara|clothes|shirt|shoes/.test(d)) return 'Shopping';
  if (/netflix|spotify|game|movie|cinema|concert|entertainment|stream/.test(d)) return 'Entertainment';
  if (/book|course|tuition|school|university|class|study|education|textbook/.test(d)) return 'Education';
  if (/bill|electric|internet|water|phone|subscription|rent|insurance/.test(d)) return 'Bills';
  return 'Food';
}

export function generateInsights(
  spendingByCategory: Record<string, number>,
  totalSpending: number,
  budget: number,
  topCategory?: [Category, number]
): string[] {
  const insights: string[] = [];
  const formatRp = (v: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

  if (topCategory) {
    const pct = Math.round((topCategory[1] / totalSpending) * 100);
    insights.push(`🔥 Your highest category is ${topCategory[0]} at ${pct}% of total spending (${formatRp(topCategory[1])}).`);
  }

  const budgetPct = Math.round((totalSpending / budget) * 100);
  if (budgetPct >= 90) {
    insights.push(`⚠️ You've used ${budgetPct}% of your monthly budget! Consider cutting non-essential spending.`);
  } else if (budgetPct >= 70) {
    insights.push(`📊 You've used ${budgetPct}% of your budget. Stay mindful of your remaining balance.`);
  } else {
    insights.push(`✅ You've used ${budgetPct}% of your budget. You're on track this month!`);
  }

  if (spendingByCategory['Food'] && totalSpending > 0) {
    const foodPct = Math.round((spendingByCategory['Food'] / totalSpending) * 100);
    if (foodPct > 35) {
      insights.push(`🍳 Food takes up ${foodPct}% of your spending. Try meal prepping to save money!`);
    }
  }

  if (spendingByCategory['Entertainment'] && totalSpending > 0) {
    const entPct = Math.round((spendingByCategory['Entertainment'] / totalSpending) * 100);
    if (entPct < 15) {
      insights.push(`🎯 Entertainment spending is well-controlled at ${entPct}%. Keep it up!`);
    }
  }

  if (spendingByCategory['Bills']) {
    insights.push(`💡 Bills total ${formatRp(spendingByCategory['Bills'])}. Set up auto-pay reminders to stay on top.`);
  }

  return insights.slice(0, 4);
}

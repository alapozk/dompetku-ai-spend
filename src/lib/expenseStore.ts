import { useState, useCallback } from 'react';
import { Transaction, sampleTransactions, Category } from './sampleData';

let globalTransactions = [...sampleTransactions];
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

  // Subscribe on mount
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

  const totalSpending = globalTransactions.reduce((sum, t) => sum + t.amount, 0);

  const spendingByCategory = globalTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<Category, number>);

  return {
    transactions: globalTransactions,
    addExpense,
    deleteExpense,
    updateExpense,
    totalSpending,
    spendingByCategory,
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

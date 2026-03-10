export type Category = 'Food' | 'Transport' | 'Shopping' | 'Entertainment' | 'Education' | 'Bills';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
}

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: 'hsl(25, 95%, 53%)',
  Transport: 'hsl(217, 91%, 60%)',
  Shopping: 'hsl(330, 81%, 60%)',
  Entertainment: 'hsl(271, 81%, 56%)',
  Education: 'hsl(160, 84%, 39%)',
  Bills: 'hsl(43, 96%, 56%)',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Food: '🍔',
  Transport: '🚗',
  Shopping: '🛍️',
  Entertainment: '🎮',
  Education: '📚',
  Bills: '💡',
};

export const sampleTransactions: Transaction[] = [
  { id: '1', description: 'Starbucks coffee', amount: 45000, category: 'Food', date: '2026-03-10' },
  { id: '2', description: 'Grab ride to campus', amount: 25000, category: 'Transport', date: '2026-03-10' },
  { id: '3', description: 'Netflix subscription', amount: 54000, category: 'Entertainment', date: '2026-03-09' },
  { id: '4', description: 'Textbook purchase', amount: 120000, category: 'Education', date: '2026-03-09' },
  { id: '5', description: 'Electricity bill', amount: 350000, category: 'Bills', date: '2026-03-08' },
  { id: '6', description: 'Mie Ayam lunch', amount: 20000, category: 'Food', date: '2026-03-08' },
  { id: '7', description: 'Uniqlo t-shirt', amount: 199000, category: 'Shopping', date: '2026-03-07' },
  { id: '8', description: 'GoFood dinner', amount: 55000, category: 'Food', date: '2026-03-07' },
  { id: '9', description: 'Bus pass top-up', amount: 50000, category: 'Transport', date: '2026-03-06' },
  { id: '10', description: 'Spotify premium', amount: 49000, category: 'Entertainment', date: '2026-03-06' },
  { id: '11', description: 'Padang rice lunch', amount: 30000, category: 'Food', date: '2026-03-05' },
  { id: '12', description: 'Internet bill', amount: 299000, category: 'Bills', date: '2026-03-05' },
  { id: '13', description: 'Online course fee', amount: 150000, category: 'Education', date: '2026-03-04' },
  { id: '14', description: 'Bubble tea', amount: 35000, category: 'Food', date: '2026-03-04' },
  { id: '15', description: 'Tokopedia gadget case', amount: 85000, category: 'Shopping', date: '2026-03-03' },
];

export const sampleInsights = [
  "You spent 45% of your budget on Food this month. Consider meal prepping to save! 🍳",
  "Your Transport spending decreased by 15% compared to last week. Great job! 🚌",
  "Bills make up Rp649,000 of your expenses. Set up auto-pay reminders to stay on top. 📋",
  "Entertainment spending is well-controlled at under 10%. Keep it up! 🎯",
];

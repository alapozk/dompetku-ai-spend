import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardNav from '@/components/DashboardNav';
import TransactionList from '@/components/TransactionList';
import { useExpenseStore } from '@/lib/expenseStore';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Transactions = () => {
  const { transactions } = useExpenseStore();
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(t =>
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-heading text-2xl font-bold text-foreground">All Transactions</h1>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <TransactionList transactions={filtered} showActions />
        </motion.div>
      </main>
    </div>
  );
};

export default Transactions;

import { motion } from 'framer-motion';
import { TrendingDown, Wallet } from 'lucide-react';
import DashboardNav from '@/components/DashboardNav';
import SpendingChart from '@/components/SpendingChart';
import InsightsCard from '@/components/InsightsCard';
import TransactionList from '@/components/TransactionList';
import { useExpenseStore } from '@/lib/expenseStore';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const formatRp = (v: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

const Dashboard = () => {
  const { transactions, totalSpending, spendingByCategory } = useExpenseStore();

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Total Spending This Month</span>
            </div>
            <p className="font-heading text-3xl font-bold text-foreground">{formatRp(totalSpending)}</p>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Transactions</span>
            </div>
            <p className="font-heading text-3xl font-bold text-foreground">{transactions.length}</p>
          </div>
        </motion.div>

        {/* Chart + Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingChart data={spendingByCategory} />
          <InsightsCard />
        </div>

        {/* Recent Transactions */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-semibold text-foreground">Recent Transactions</h3>
            <Link to="/transactions">
              <Button variant="ghost" size="sm" className="text-primary">View all</Button>
            </Link>
          </div>
          <TransactionList transactions={transactions} limit={5} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useExpenseStore, generateInsights } from '@/lib/expenseStore';

const InsightsCard = () => {
  const { spendingByCategory, totalSpending, budget, topCategory } = useExpenseStore();
  const insights = generateInsights(spendingByCategory, totalSpending, budget, topCategory);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">AI Insights</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="bg-accent/50 rounded-xl px-4 py-3 text-sm text-foreground"
          >
            {insight}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InsightsCard;

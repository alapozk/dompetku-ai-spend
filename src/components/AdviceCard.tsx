import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { useExpenseStore } from '@/lib/expenseStore';
import { CATEGORY_ICONS, Category } from '@/lib/sampleData';

function getAdvice(
  spendingByCategory: Record<string, number>,
  totalSpending: number,
  budget: number,
  topCategory?: [Category, number]
): { title: string; body: string; emoji: string } {
  const budgetPct = budget > 0 ? (totalSpending / budget) * 100 : 0;

  if (budgetPct >= 95) {
    return {
      emoji: '🚨',
      title: 'Budget Alert',
      body: 'You\'ve nearly exhausted your monthly budget. Try a no-spend weekend to recover. Cancel unused subscriptions and cook at home this week.',
    };
  }

  if (topCategory) {
    const [cat, amount] = topCategory;
    const pct = Math.round((amount / totalSpending) * 100);
    if (cat === 'Food' && pct > 35) {
      return {
        emoji: '🍳',
        title: 'Food Spending Tip',
        body: `Food makes up ${pct}% of your spending. Try the 50/30/20 rule: allocate 50% to needs, 30% to wants, and 20% to savings. Meal prepping on Sundays can cut food costs by 40%.`,
      };
    }
    if (cat === 'Shopping' && pct > 25) {
      return {
        emoji: '🛒',
        title: 'Smart Shopping',
        body: `Shopping is ${pct}% of your expenses. Apply the 48-hour rule — wait 2 days before any non-essential purchase. You'll find most impulse buys lose their appeal.`,
      };
    }
  }

  if (budgetPct < 50) {
    return {
      emoji: '🌟',
      title: 'Great Progress!',
      body: 'You\'re spending wisely this month. Consider putting the extra savings into an emergency fund or a high-yield savings account. Even small amounts compound over time!',
    };
  }

  return {
    emoji: '💡',
    title: 'Financial Tip',
    body: 'Track daily for awareness. Students who log expenses daily save 23% more on average. Try setting category limits to stay disciplined!',
  };
}

const AdviceCard = () => {
  const { spendingByCategory, totalSpending, budget, topCategory } = useExpenseStore();
  const advice = getAdvice(spendingByCategory, totalSpending, budget, topCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6 border-l-4 border-l-primary"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-accent-foreground" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">{advice.emoji} {advice.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{advice.body}</p>
    </motion.div>
  );
};

export default AdviceCard;

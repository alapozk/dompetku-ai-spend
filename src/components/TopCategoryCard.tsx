import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { CATEGORY_COLORS, CATEGORY_ICONS, Category } from '@/lib/sampleData';

interface Props {
  topCategory?: [Category, number];
  totalSpending: number;
}

const formatRp = (v: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

const TopCategoryCard = ({ topCategory, totalSpending }: Props) => {
  if (!topCategory) return null;
  const [cat, amount] = topCategory;
  const pct = Math.round((amount / totalSpending) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: `${CATEGORY_COLORS[cat]}20` }}
        >
          {CATEGORY_ICONS[cat]}
        </div>
        <div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> Top Category
          </p>
          <p className="font-heading text-lg font-bold text-foreground">{cat}</p>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="font-heading text-2xl font-bold text-foreground">{formatRp(amount)}</p>
        <span
          className="text-sm font-semibold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `${CATEGORY_COLORS[cat]}20`, color: CATEGORY_COLORS[cat] }}
        >
          {pct}%
        </span>
      </div>
    </motion.div>
  );
};

export default TopCategoryCard;

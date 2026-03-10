import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Pencil, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useExpenseStore } from '@/lib/expenseStore';

const formatRp = (v: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

const BudgetCard = () => {
  const { budget, setBudget, totalSpending, budgetUsedPercent, budgetRemaining } = useExpenseStore();
  const [editing, setEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState(String(budget));

  const isOverBudget = budgetRemaining < 0;
  const progressColor = budgetUsedPercent >= 90 ? 'bg-destructive' : budgetUsedPercent >= 70 ? 'bg-chart-bills' : 'bg-primary';

  const handleSave = () => {
    const val = Number(tempBudget);
    if (val > 0) {
      setBudget(val);
    }
    setEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-6 col-span-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Target className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">Monthly Budget</h3>
            {!editing && (
              <p className="text-sm text-muted-foreground">
                {formatRp(totalSpending)} of {formatRp(budget)}
              </p>
            )}
          </div>
        </div>
        {!editing ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => { setTempBudget(String(budget)); setEditing(true); }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={tempBudget}
              onChange={e => setTempBudget(e.target.value)}
              className="w-40 h-8 text-sm"
              min="1"
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleSave()}
            />
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={handleSave}>
              <Check className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setEditing(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${budgetUsedPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`absolute inset-y-0 left-0 rounded-full ${progressColor}`}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{Math.round(budgetUsedPercent)}% used</span>
          <span className={isOverBudget ? 'text-destructive font-semibold' : 'text-muted-foreground'}>
            {isOverBudget ? `Over by ${formatRp(Math.abs(budgetRemaining))}` : `${formatRp(budgetRemaining)} remaining`}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetCard;

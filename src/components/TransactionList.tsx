import { Transaction, CATEGORY_ICONS, CATEGORY_COLORS, Category } from '@/lib/sampleData';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExpenseStore } from '@/lib/expenseStore';
import { toast } from 'sonner';

interface Props {
  transactions: Transaction[];
  showActions?: boolean;
  limit?: number;
}

const formatRp = (v: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

const TransactionList = ({ transactions, showActions = false, limit }: Props) => {
  const { deleteExpense } = useExpenseStore();
  const items = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="space-y-2">
      {items.map(tx => (
        <div key={tx.id} className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-accent/30 transition-colors border border-border">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ backgroundColor: `${CATEGORY_COLORS[tx.category]}20` }}
          >
            {CATEGORY_ICONS[tx.category]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{tx.description}</p>
            <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
          </div>
          <p className="font-heading font-semibold text-foreground whitespace-nowrap">
            -{formatRp(tx.amount)}
          </p>
          {showActions && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => {
                  deleteExpense(tx.id);
                  toast.success('Transaction deleted');
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;

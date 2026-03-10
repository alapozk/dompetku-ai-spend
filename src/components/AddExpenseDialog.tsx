import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useExpenseStore, classifyCategory } from '@/lib/expenseStore';
import { CATEGORY_ICONS } from '@/lib/sampleData';
import { toast } from 'sonner';

const AddExpenseDialog = () => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { addExpense } = useExpenseStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const category = classifyCategory(description);
    addExpense({
      description,
      amount: Number(amount),
      category,
      date,
    });
    toast.success(`Expense added as ${CATEGORY_ICONS[category]} ${category}`);
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 gradient-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" /> Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Add New Expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Input id="desc" placeholder="e.g. Starbucks coffee" value={description} onChange={e => setDescription(e.target.value)} required />
            {description && (
              <p className="text-xs text-muted-foreground">
                AI Category: {CATEGORY_ICONS[classifyCategory(description)]} {classifyCategory(description)}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (Rp)</Label>
            <Input id="amount" type="number" min="1" placeholder="50000" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground">Add Expense</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;

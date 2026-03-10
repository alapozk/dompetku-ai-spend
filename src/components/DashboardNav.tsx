import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Receipt, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddExpenseDialog from './AddExpenseDialog';

const DashboardNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/dashboard" className="font-heading text-xl font-bold text-primary">DompetKu</Link>
        <nav className="flex items-center gap-1">
          <Link to="/dashboard">
            <Button variant={isActive('/dashboard') ? 'secondary' : 'ghost'} size="sm" className="gap-2">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Button>
          </Link>
          <Link to="/transactions">
            <Button variant={isActive('/transactions') ? 'secondary' : 'ghost'} size="sm" className="gap-2">
              <Receipt className="w-4 h-4" /> Transactions
            </Button>
          </Link>
          <div className="ml-2">
            <AddExpenseDialog />
          </div>
          <Button variant="ghost" size="icon" className="ml-2 text-muted-foreground" onClick={() => navigate('/')}>
            <LogOut className="w-4 h-4" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default DashboardNav;

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Category, CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/sampleData';

interface Props {
  data: Record<string, number>;
}

const SpendingChart = ({ data }: Props) => {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  const formatRp = (v: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

  return (
    <div className="glass-card p-6">
      <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Spending by Category</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-48 h-48">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={80} strokeWidth={2} stroke="hsl(var(--background))">
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name as Category]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => formatRp(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-3">
          {chartData.map(entry => (
            <div key={entry.name} className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[entry.name as Category] }} />
              <span className="text-muted-foreground">{CATEGORY_ICONS[entry.name as Category]} {entry.name}</span>
              <span className="font-medium text-foreground">{formatRp(entry.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingChart;

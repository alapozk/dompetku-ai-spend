import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Category, CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/sampleData';

interface Props {
  data: Record<string, number>;
  topCategoryName?: string;
}

const SpendingChart = ({ data, topCategoryName }: Props) => {
  const chartData = Object.entries(data)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const formatRp = (v: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

  return (
    <div className="glass-card p-6">
      <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Spending by Category</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-52 h-52">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                strokeWidth={2}
                stroke="hsl(var(--background))"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CATEGORY_COLORS[entry.name as Category]}
                    opacity={topCategoryName && entry.name !== topCategoryName ? 0.5 : 1}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => formatRp(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2.5 flex-1">
          {chartData.map(entry => {
            const isTop = entry.name === topCategoryName;
            return (
              <div
                key={entry.name}
                className={`flex items-center gap-3 text-sm rounded-lg px-3 py-2 transition-colors ${isTop ? 'bg-accent/60 ring-1 ring-primary/20' : ''}`}
              >
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: CATEGORY_COLORS[entry.name as Category] }} />
                <span className="text-muted-foreground flex-1">{CATEGORY_ICONS[entry.name as Category]} {entry.name}</span>
                <span className="font-medium text-foreground">{formatRp(entry.value)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpendingChart;

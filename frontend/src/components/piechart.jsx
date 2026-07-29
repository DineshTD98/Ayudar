import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function MyPieChart({ expense }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF1919"];
  
  // Group by category and sum amounts
  const categoryStats = expense.reduce((acc, curr) => {
    const categoryName = curr.category?.name || "Others";
    const amount = Number(curr.amount) || 0;
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
    acc[categoryName] += amount;
    return acc;
  }, {});

  const totalexpenseamount = expense.reduce((acc,curr) => acc + Number(curr.amount), 0);
  
  const percentage = Object.entries(categoryStats).map(([category, amount]) => ({
    category,
    percentage: totalexpenseamount === 0 ? 0 : Math.floor((amount / totalexpenseamount * 100) * 100) / 100
  }));
  
  if (totalexpenseamount === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[100px] text-slate-500">
        <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        <span className="italic font-medium">No expenses for this period.</span>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={percentage}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            dataKey="percentage"
            nameKey="category"
            label={({ name, percentage }) => `${name}: ${percentage.toFixed(2)}%`}
          >
            {percentage.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MyPieChart;

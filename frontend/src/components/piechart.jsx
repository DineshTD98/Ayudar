import { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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

  const totalexpenseamount=expense.reduce((acc,curr)=>acc+Number(curr.amount),0)
  
  const percentage=Object.entries(categoryStats).map(([category,amount])=>({
    category,
    percentage:Math.floor((amount/totalexpenseamount*100)*100)/100
  }))
  
  console.log(percentage)
  const data = Object.keys(categoryStats).map((name) => ({
    name,
    percentage:percentage
  }));
  

  return (
    <div className="flex justify-center">
      <PieChart width={400} height={400} className="p-1">
        <Pie
          data={percentage}
          cx={200}
          cy={180}
          outerRadius={120}
          dataKey="percentage"
          nameKey="category"
          label={({ name, percentage }) => `${name}: ${percentage.toFixed(2)}%`}
        >
          {percentage.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `Rs ${value}`} />
        <Legend verticalAlign="bottom" height={36}/>
      </PieChart>
    </div>
  );
}

export default MyPieChart;

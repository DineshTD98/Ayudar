import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function MyPieChart({ expense }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const data = expense.map((item) => ({
    name: item.category?.name,
    amount: item.amount,
    title: item.title,
  }));

  return (
    <div>
      <PieChart width={400} height={400} className="p-1">
        <Pie
          data={data}
          cx={200}
          cy={200}
          outerRadius={150}
          dataKey="amount"
          nameKey="title"
          label={({ amount }) => `₹Rs${amount}`}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default MyPieChart;

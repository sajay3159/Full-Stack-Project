import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function MyLineChart() {
  const data = [
    { name: 'Jan', data: 2 },
    { name: 'Feb', data: 5.5 },
    { name: 'Mar', data: 2 },
    { name: 'Apr', data: 8.5 },
    { name: 'May', data: 1.5 },
    { name: 'Jun', data: 5 },
  ];

  return (
    <div>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="data" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}



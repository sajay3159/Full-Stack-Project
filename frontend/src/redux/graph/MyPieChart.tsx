import * as React from 'react';
import { PieChart } from '@mui/x-charts';

interface DataPoint {
  id: number;
  value: number;
  label: string;
}

interface PieChartProps {
  series: { data: DataPoint[] }[];
  width: number;
  height: number;
}

const MyPieChart: React.FC = () => {
  const pieChartData: PieChartProps = {
    series: [
      {
        data: [
          { id: 0, value: 10, label: 'series A' },
          { id: 1, value: 15, label: 'series B' },
          { id: 2, value: 20, label: 'series C' },
        ],
      },
    ],
    width: 400,
    height: 200,
  };
  return <PieChart {...pieChartData} />;

};

export default MyPieChart;

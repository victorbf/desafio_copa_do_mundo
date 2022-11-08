import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { TeamTypes } from "../../App";

const ChartComponent = ({ data }: { data: TeamTypes[] }) => {
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="goals" fill="#8884d8" />
    </BarChart>
  );
};

export default ChartComponent;

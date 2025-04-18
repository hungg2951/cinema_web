import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelectMovie } from "../../../../hook";
import { Spin } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
type Props = {
};

type PropsChart = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

const Chart = (props: Props) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Top phim được xem nhiều nhất",
      },
    },
  };
  const { datasetChart, labels, top5 } = useSelectMovie();

  const data: PropsChart = {
    labels: labels,
    datasets: [
      {
        label: "%",
        data: datasetChart,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div>
      {top5 && datasetChart && labels ? (
        <Line options={options} data={data} />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Chart;

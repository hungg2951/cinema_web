import { Table } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelectUser } from "../../../../hook";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
}

const UserChart = ({}: Props) => {
  const { dayta, total } = useSelectUser();
  const data = {
    labels: dayta.map((item) => item.name),
    datasets: [
      {
        label: "%",
        data: dayta.map((item) => item.percent),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const dataSource = dayta.map((item: any, index: any) => {
    return {
      key: index + 1,
      name: item?.name,
      data: item?.data.length,
      percent: (item?.percent)
    }
  })

  const columns = [
    {
      title: "#",
      key: "key",
      dataIndex: "key"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SL",
      dataIndex: "data",
      key: "data",
      render: (_: any, { data }: any) => <p>{`${data} / ${total}`}</p>
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
      render: (_: any, { percent }: any) => <p>{`${percent}%`}</p>
    },
  ];
  return (
    <div className=" grid grid-cols-2 gap-5	">
      <div className="progress w-full h-auto overflow-auto" style={{
      }}>
        <Table dataSource={dataSource} columns={columns} pagination={false} loading={(!dayta || !total) ? true : false} />
      </div>
      <div className="canvas_fill">
        <Doughnut data={data} width={3} height={3} />
      </div>
    </div>
  );
};

export default UserChart;

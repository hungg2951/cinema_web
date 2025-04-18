import React, { useState, lazy } from "react";
import { formatCurrency } from "./../../../../ultils/index";
import { Button, Dropdown, MenuProps, Space, Spin } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useSelectMovie } from "../../../../hook";
const Chart = lazy(() => import("./Chart"));
import "./movieStyle.scss"
type Props = {

};
const MovieChart = ({ }: Props) => {
  const [key, setKey] = useState("0");
  const { top5, mostProfit } = useSelectMovie();
  
  const items: MenuProps['items'] = [
    { label: "Arnh", key: '0' },
    { label: "chart", key: '1' },
  ];

  return (
    <div className="grid grid-cols-[300px_minmax(700px,_1fr)_100px] gap-3  mt-5	movieDB_container w-full min-w-full max-w-full">
      <div className="item-1 item">
        <div className="text-center p-3">
          <h1 className="font-bold text-lg">Phim có doanh thu cao nhất</h1>
        </div>
        <div className=" h-[70%] max-h-[70%] w-[80%] m-auto  shadow-lg rounded-lg item1-content">
          <img
            src={mostProfit?.image?.[0]?.url}
            alt={mostProfit.name}
            className="w-full h-full p-1 object-cover object-center
            "
          />
          <div className="text-center mt-2 item1-content__text ">
            <p>{mostProfit.name}</p>
            <p>{formatCurrency(mostProfit.profit)}</p>
          </div>
        </div>
      </div>

      <div className="item2 item ">
        <div className=" p-3 flex justify-between items-center">
          <div className="">
            <h1 className="font-bold text-lg">Phim được xem nhiều nhất</h1>
          </div>
          <Dropdown menu={{ items, onClick: (e: any) => setKey(e.key), }} >
            <Button onClick={(e: any) => { e.preventDefault() }}>
              <Space>
                Xem theo
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div>

          {key == "0" ? (
            <div className="gallary_admin_top5">
              {top5.map((item: any, index: any) => (
                <div className="" key={index} style={{ backgroundImage: `url(${item?.image?.[0]?.url})` }}>
                </div>
              ))}
            </div>
          ) : (
            <Chart />
          )}

        </div>

      </div>
      {!top5 && <Spin />}
    </div>
  );
};

export default MovieChart;
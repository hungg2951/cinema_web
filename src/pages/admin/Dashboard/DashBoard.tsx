import { useState, lazy } from 'react';
import { Tabs } from 'antd';
import { BiUserPin } from "react-icons/bi"
import { useSelectUser, useSelectMovie } from '../../../hook';
const UserChart = lazy(() => import("./UserChart/UserChart"));
const MovieChart = lazy(() => import("./MovieChart"))
const Revenue = lazy(() => import("./Revenue"))
type Props = {};

const Dashboard = (props: Props) => {
  const [state, setState] = useState("1")
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  const items: any[] = [
    {
      label: <span style={style}><BiUserPin /> Tổng quan người dùng</span>,
      key: "1",
      children: <UserChart  />,
    },
    {
      label: <span style={style}><BiUserPin /> Tổng quan phim</span>,
      key: "2",
      children: <MovieChart />,
    },
    {
      label: <span style={style}><BiUserPin /> Tổng quan doanh thu</span>,
      key: "3",
      children: <Revenue />,
    },
  ]
  return (
    <div className="h-[80vh] max-h-[80vh] overflow-hidden w-full">
      <Tabs
        type="card"
        size={"large"}
        items={items}
        onChange={(value: string) => setState(value)}
        style={{ padding: '10px' }}
      />
    </div>
  );
};

export default Dashboard;

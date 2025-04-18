import { lazy } from "react"
import { Space, Button } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { EditOutlined } from "@ant-design/icons";
const DataTable = lazy(() => import("../../../components/admin/Form&Table/Table"));
import configRoute from "../../../config";
type Props = {};

const ListSeatType = (props: Props) => {
  const dispatch = useAppDispatch();
  const { seatType, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.seatTypeReducer
  );

  const columnList: any = [
    {
      title: "Tên loại ghế",
      render: (item: any, index: any) => (
        <div className="flex">
          <p>{item.name}</p>
          <div
            style={{
              backgroundColor: `${item.color}`,
              width: "70px",
              height: "20px",
              marginLeft: "10px",
              border: "1px solid black",
            }}
          ></div>
        </div>
      ),
      height: "10",
      width: "400px",
    },
    {
      title: "Giá loại ghế",
      render: (item: any, index: any) => <p>{item.extraPrice} VNĐ</p>,
      height: "10",
      width: "200px",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, item: any) => (
        <Space size="middle">
          <Link to={`${item._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
        </Space>
      ),
      width: 30,
    },
  ];
  const data = seatType?.map((item: any) => {
    return {
      _id: item._id,
      name: item.name,
      extraPrice: item.extraPrice,
      color: item.color,
    };
  });
  return (
    <>
      <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to={configRoute.routes.adminSeatTypeAdd}>Thêm Loại Ghế</Link>
        </Button>
        <Button>
          <Link to={configRoute.routes.adminRooms}>Quản lí phòng chiếu</Link>
        </Button>
      </div>
      <DataTable column={columnList} data={data} loading={isFetching} />
    </>
  );
};

export default ListSeatType;

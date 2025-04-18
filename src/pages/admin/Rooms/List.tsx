import { useEffect } from "react";
import { Button, message, Space, Select, Tooltip, Table, } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link } from "react-router-dom";
import { updateRoom, getRooms } from "../../../redux/slice/roomSlice";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { PAGE_SIZE, defaultStatus } from "../../../ultils/data";
import configRoute from "../../../config";
import { useSearch } from "../../../hook";
const { Option } = Select;
type Props = {};

const AdminRoomList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { rooms, isFetching, isErr, errorMessage } = useAppSelector(
    (state: { roomReducer: any }) => state.roomReducer
  );

  useEffect(() => {
    document.title = "Admin | Rooms";
    dispatch(getRooms());
  }, [dispatch]);

  const changeStatus = (id: any, val: any) => {
    dispatch(updateRoom({ _id: id, status: val }))
      .unwrap()
      .then(() => message.success("Thay đổi trạng thái thành công"))
      .catch((err: any) => message.error(err));
  };
  const { getColumnSearchProps } = useSearch()
  const columns: any = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: '10px'
    },
    {
      title: "Tên phòng chiếu",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link to={`${record?._id}`} style={{ color: "#262626", height: "10px" }} className="hover:text-red-700"   >
            {record?.name}
          </Link>
        </div>
      ),
      width: '200px'
    },
    {
      title: "Tổng ghế",
      dataIndex: "tongGhe",
      key: "tongGhe",
      ...getColumnSearchProps("tongGhe"),
      width: '100px'
    },
    {
      title: "Số cột",
      dataIndex: "columns",
      key: "columns",
      width: '100px'
    },
    {
      title: "Số hàng",
      dataIndex: "rows",
      key: "rows",
      width: '100px'
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => (
        <Select
          value={record?.status === 0 ? "Hoạt động" : "Dừng hoạt động"}
          onChange={(value: any) => {
            changeStatus(record?._id, value);
          }}
        >
          {defaultStatus?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
      width: '50px'
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa ">
            <Link to={`${record?._id}?seatTypeId=${"123"}`}>
              <EditOutlined
                style={{ color: "var(--primary)", fontSize: "18px" }}
              />
            </Link>
          </Tooltip>

          <Tooltip title="Xem tổng quan phòng ">
            <Link to={`/admin/seatsByRoom/${record?._id}`}>
              <EyeOutlined
                style={{ color: "var(--primary)", fontSize: "18px" }}
              />
            </Link>
          </Tooltip>

          <Button type="dashed" block>
            <Link to={`/admin/stByRoom/${record?._id}`}>
              DS Giờ chiếu theo phòng
            </Link>
          </Button>

        </Space>
      ),
      width: 130,
    },
  ];

  const data: Props[] = rooms?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      columns: item?.columns,
      rows: item?.rows,
      seats: item?.seats,
      status: item?.status,
      tongGhe: item?.rows * item?.columns,
    };
  });

  useEffect(() => {
    if (isErr) {
      message.error({ content: `Failed: ${errorMessage} `, key: "handling" });
    }
  }, []);

  return (
    <div>
      <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to="create">Thêm Phòng chiếu</Link>
        </Button>
        <Button>
          <Link to={configRoute.routes.adminSeatType}>Quản lí loại ghế</Link>
        </Button>
        <Button className="mb-5">
          <Link to={configRoute.routes.AdminFilmFormat}>
            Quản lí format film
          </Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={data} loading={isFetching}
        pagination={data && data?.length > PAGE_SIZE && {
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"]
        }} />
    </div>
  );
};

export default AdminRoomList;

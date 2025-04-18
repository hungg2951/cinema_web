import { message, Space, Select, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link } from "react-router-dom";
import { updateUser } from "../../../redux/slice/userSlice";
import { EditOutlined } from "@ant-design/icons";
import { userRole, userStatus ,PAGE_SIZE} from "../../../ultils/data";
import { provices } from "../../../redux/slice/Provider";
import { useSearch } from "../../../hook";
type Props = {
  data: any
};
const { Option } = Select;
const AdminUserList = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const { getColumnSearchProps } = useSearch()

  const { isFetching } = useAppSelector((state: any) => state.userReducer);

  const changeRole = (id: any, value: any) => {
    dispatch(updateUser({ _id: id, role: value }))
      .unwrap()
      .then(() => message.success("Thay đổi quyền thành công"));
  };
  const changeStatus = (id: any, value: any) => {
    dispatch(updateUser({ _id: id, status: value }))
      .unwrap()
      .then(() => message.success("Thay đổi trạng thái thành công"));
  };
  const changeAddress = (id: any, value: any) => {
    dispatch(updateUser({ _id: id, address: value }))
      .unwrap()
      .then(() => message.success("Thay đổi điạ chỉ thành công"));
  };
  const columnUserList: any = [
    {
      title: "#",
      dataIndex: "key"
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => (
        <Link to={`${record?._id}`}>
          <img width="40px" height="40px" src={record?.avatar} alt="" />
        </Link>
      ),
      width: 30,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.email}
          </Link>
        </div>
      ),
      sorter: (a: any, b: any) => a.email - b.email,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (_: any, { _id, status }: any) => (
        <Select
          value={status === 0 ? "Chưa xác thực" : status === 1 ? "Đang hoạt động" : "Dừng hoạt động"}
          onChange={(value: any) => {
            changeStatus(_id, value);
          }}
        >
          {userStatus?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
      width: "30px",
      sorter: (a: any, b: any) => a.status - b.status,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (_: any, { role, _id }: any) => (
        <Select
          value={role === 0 ? "user" : "admin"}
          onChange={(value: any) => {
            changeRole(_id, value);
          }}
        >
          {userRole?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
      sorter: (a: any, b: any) => a.role - b.role,
      width: 30,
    },
    {
      title: "Tên",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.username}
          </Link>
        </div>
      ),
      sorter: (a: any, b: any) => a.username - b.username,
    },
    {
      title: "SDT",
      dataIndex: "phone",
      key: "phone",
      sorter: (a: any, b: any) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (_: any, { address, _id }: any) => (
        <Select
          value={address}
          onChange={(value: any) => {
            changeAddress(_id, value);
          }}
        >
          {provices?.map((item: any) => (
            <Option value={item?.codename} key={item?.codename}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
      sorter: (a: any, b: any) => a.address - b.address,

      width: 30,
    },
    {
      title: "",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`${record._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
        </Space>
      ),
      width: 30,
    },
  ];

  const dataSource: Props[] = data?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      username: item?.username,
      fullname: item?.fullname,
      email: item?.email,
      avatar: (item?.avatar[0]?.url || item?.avatar[0]) ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
      phone: item?.phone,
      address: item?.address,
      role: item?.role,
      status: item?.status,
    };
  });

  return (
    <div>
      <Table columns={columnUserList} dataSource={dataSource} loading={isFetching}
        pagination={data.length > PAGE_SIZE && {
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"]
        }}
      />

    </div>
  );
};
export default AdminUserList;

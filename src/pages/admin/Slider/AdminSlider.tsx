import { Button, Select, Space, Table, message, } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { UpdateSliderThunk, getSlider } from "../../../redux/slice/Slider";
import { defaultStatus } from "../../../ultils/data";
import { useEffect } from "react"
type Props = {};
const { Option } = Select;

const AdminSlider = (props: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSlider())
  }, [])
  const { slider } = useAppSelector((state) => state.slider);

  const changeStatus = (id: any, value: any, title: any) => {
    dispatch(UpdateSliderThunk({ _id: id, status: value, title: title }))
      .unwrap()
      .then(() => message.success("Thay đổi trạng thái thành công"));
  };
  const columnUserList: any = [
    {
      title: "#",
      dataIndex: "key",
      width: "50px",
    },
    {
      title: "Image",
      dataIndex: "image",

      render: (_: any, record: any) => (
        <img src={record?.image} style={{ width: '50px', height: '50px' }} />
      ),
      width: "200px",
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "200px",
    },
    {
      title: "Url",
      dataIndex: "url",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (_: any, { _id, status, title }: any) => (
        <Select value={status === 0 ? "Hoạt động" : "Dừng hoạt động"} onChange={(value: any) => { changeStatus(_id, value, title) }} >
          {defaultStatus?.map((item: any) => (
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
      title: "ACTION",
      key: "action",
      fixed: "right",
      width: "100px",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`${record._id}`}> <EditOutlined style={{ color: "var(--primary)", fontSize: "18px" }} />
          </Link>
        </Space>
      ),
    },
  ];

  const data: Props[] = slider?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      image: item?.images[0]?.url ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
      title: item?.title,
      url: item?.url,
      status: item?.status
    };
  });

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/slider/create">Thêm Slider</Link>
      </Button>
      <Table
        columns={columnUserList}
        dataSource={data}
      />
    </div>
  );
};

export default AdminSlider;

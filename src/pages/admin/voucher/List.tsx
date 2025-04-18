import { useEffect, lazy } from "react";
import { message, Select, Space, Typography, Tag } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { Link } from "react-router-dom";
import { UpdateMultiMovie, getAlVc, updateData } from "../../../redux/slice/voucherSlice";
import { EditOutlined } from "@ant-design/icons";
import {
  formatCurrency,
  compareBtwDate,
} from "../../../ultils";
import { defaultStatus } from "../../../ultils/data";
import { useSearch } from "../../../hook";
const SelectTable = lazy(() => import("../../../components/admin/SelectTable"));
import moment from "moment";
import { isPast, parseISO } from "date-fns";

type Props = {
  data: any;
  isLoading?: boolean;
  statusUpdate?: any;
  currStatus?: any
};
const { Option } = Select;
const { Text } = Typography

const AdminVoucherList = ({ data, isLoading, statusUpdate, currStatus }: Props) => {
  document.title = "Admin | DS Phim";
  const dispatch = useAppDispatch();
  const { getColumnSearchProps } = useSearch();

  const changeStatus = (id: any, value: any) => {
    dispatch(updateData({ _id: id, status: value }))
      .unwrap()
      .then(() => message.success("Thay đổi trạng thái thành công"));
  };
  const columns: any[] = [
    {
      title: "#",
      key: "key",
      dataIndex: "key",
      width: 10
    },
    {
      title: "Thumbnail",
      key: "thumbnail",
      dataIndex: "thumbnail",
      render: (_: any, record: any) => (
        <img
          width="40px"
          height="40px"
          src={record?.thumbnail}
          alt=""
          className="object-cover"
        />
      ),
      width: 50,
    },
    {
      title: "code",
      key: "code",
      dataIndex: "code",
      ...getColumnSearchProps("code"),
      render: (item: any, record: any) => (
        <Link to={`${record._id}`}>
          <Text className="text-[#1890ff]">
            {item.length >= 30 ? `${item.substring(0, 30)}...` : item}
          </Text>
        </Link>
      ),
      width: 70,
    },
    {
      title: "SL",
      key: "quantity",
      dataIndex: "quantity",
      width: 50,
    },
    {
      title: "Condition",
      key: "condition",
      render: (_: any, record: any) => (
        <Tag color={record.condition ? "green" : "blue"}>
          {record.condition === 1
            ? `Giảm ${formatCurrency(record.conditionNumber)}`
            : `Giảm ${record.conditionNumber}%`}
        </Tag>
      ),
      width: 50,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_: any, { _id, status }: any) => (
        <Select
          value={status === 0 ? "active" : "inActive"}
          onChange={(value: any) => {
            changeStatus(_id, value);
          }}
        >
          {defaultStatus?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
      width: 50
    },
    {
      title: "Thời gian áp dụng",
      key: "time",
      render: (_: any, record: any) => (
        <Text>
          {moment(record.timeStart).format("DD/MM/YYYY HH:mm")} -
          {moment(record.timeEnd).format("DD/MM/YYYY HH:mm")}
        </Text>
      ),
      width: 260
    },
    {
      title: "Thời hạn ",
      key: "distance",
      ...getColumnSearchProps("distance"),
      render: (_: any, record: any) => <Text>{record.distance}</Text>,
      width: 80
    },
    {
      title: "Còn Hoạt động ?",
      key: "distance",
      render: (_: any, { isActive }: any) => <Text>{isActive ? "Hết hạn" : "Đang hoạt động"}</Text>,
      width: 80
    },
    {
      title: "ACTION",
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
      width: 10,
    },
  ];

  const dataTable: Props[] = data?.map((item: any, index: any) => {
    let distanceV = compareBtwDate(item?.timeStart, item?.timeEnd)
    let checkTime = isPast(parseISO(item?.timeEnd));

    return {
      key: index + 1,
      _id: item?._id,
      code: item?.code,
      thumbnail:
        item?.imagesFile[0]?.url ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
      quantity: item?.quantity,
      status: item?.status,
      condition: item?.condition,
      content: item?.content,
      timeStart: item?.timeStart,
      timeEnd: item?.timeEnd,
      conditionNumber: item?.conditionNumber,
      distance: distanceV,
      isActive: checkTime
    };
  });

  const api = {
    read: getAlVc,
    update: UpdateMultiMovie
  }
  return (
    <>
      <SelectTable
        columns={columns}
        data={dataTable}
        statusUpdate={statusUpdate}
        currStatus={currStatus}
        type="timeEnd"
        api={api} />

    </>
  );
};

export default AdminVoucherList;

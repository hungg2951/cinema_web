import React, { useEffect, useState } from "react";
import { Button, Empty, Table, TableColumnsType } from "antd";
import { convertDate, formatDate, formatTime } from "../../../ultils";
import { isPast, parseISO } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAlSt } from "../../../redux/slice/ShowTimeSlice";
import { Link, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useGroupBy } from "../../../hook";
import { PAGE_SIZE } from "../../../ultils/data";
type Props = {};
interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}
const ListShowTimeByRoom = ({ }: Props) => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const { rooms } = useAppSelector((state) => state.roomReducer);
  const [stByRoom, setStByRoom] = useState<any[]>([]);
  const [showByDate, setShowByDate] = useState<any[]>([]);
  let roomSelect = rooms.find((item: any) => item?._id === id);
  const { groupByDate } = useGroupBy()
  useEffect(() => {
    dispatch(getAlSt({}));
  }, [dispatch]);

  const { stList } = useAppSelector((state) => state.ShowTimeReducer);

  useEffect(() => {
    let lea = stList.filter((obj) => {
      for (let key of obj["roomId"]) {
        return key["_id"] == id;
      }
    });
    setStByRoom(lea);
  }, [stList, id]);

  useEffect(() => {
    if (stByRoom) {
      handleSubmit();
    }
  }, [stByRoom]);

  const handleSubmit = () => {
    let sort: any[] = stByRoom?.sort((a: any, b: any) => convertDate(b.startAt) - convertDate(a.startAt));
    const group = groupByDate(sort)
    setShowByDate({ ...group });
  };

  const expandedRowRender = (row: any) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: "",
        dataIndex: "key",
        key: "key",
        width: 0,
        className: "",
        render: (_: any, { key }: any) => <p className="text-white">{key}</p>,
      },
      {
        title: "Thời gian chiếu ",
        dataIndex: "startAt",
        key: "startAt",
        width: 150,
        render: (_: any, { startAt, endAt }: any) => (
          <p>
            Từ {startAt} đến {endAt}
          </p>
        ),
      },
      {
        title: "Tên Phim",
        dataIndex: "movieList",
        key: "movieList",
        width: 100,
        render: (_: any, { movieList }: any) => <p>{movieList?.name}</p>,
      },
      {
        title: "Trạng thái truy cập",
        dataIndex: "status2",
        key: "status2",
        width: 100,
        render: (_: any, { status2 }: any) => (
          <p>{status2 ? "Quá hạn, không thể truy cập" : "Đang hoạt động"}</p>
        ),
      },
    ];

    const data: any[] = [];
    for (let showKey in showByDate) {
      showByDate[showKey]?.map((item: any, index: any) => {
        if (formatDate(item?.date) == row?.date) {
          let checkTime = isPast(parseISO(item?.date));
          data.push({
            key: index,
            startAt: formatTime(item?.startAt),
            endAt: formatTime(item?.endAt),
            _id: item?._id,
            status: item?.status,
            movieList: item?.movieId,
            status2: checkTime,
          });
        }
      });
    }
    return <Table columns={columns} dataSource={data}
      pagination={data && data?.length > PAGE_SIZE && {
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"]
      }} />;
  };
  const columns: TableColumnsType<any[]> = [
    { title: "Ngày chiếu", dataIndex: "date", key: "date" },
    {
      title: "",
      dataIndex: "key",
      key: "key",
      width: 3,
      render: (_: any, { key }: any) => <p className="text-white">{key}</p>,
    },
  ];
  const dataTable: any[] = [];
  for (let key in showByDate) {
    dataTable.push({
      key: Math.floor(Math.random() * showByDate[key].length * 100),
      date: key,
    });
  }

  return (
    <>
      <Button className="mr-3">
        <Link to={configRoute.routes.adminRooms}>DS Phòng chiếu</Link>
      </Button>
      <h1 className="flex justify-center uppercase">
        Phòng chiếu : {roomSelect?.name}
      </h1>
      {stByRoom?.length > 0 ? (
        <div className="container">
          <Table
            columns={columns}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            dataSource={dataTable}
            pagination={dataTable && dataTable?.length > PAGE_SIZE && {
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "30"]
            }}
          />
        </div>
      ) : (
        <div className="h-[300px] container">
          <Empty description="Chưa có suất chiếu nào" />
        </div>
      )}
    </>
  );
};

export default ListShowTimeByRoom;

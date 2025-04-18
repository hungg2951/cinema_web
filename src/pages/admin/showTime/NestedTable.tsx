import React, { useState, useEffect, lazy , useId} from 'react';
import { Button, message, Select, TableColumnsType, Table } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { isPast, parseISO } from "date-fns";

import { formatDate, formatTime, convertDate } from '../../../ultils';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAlSt, updateData } from '../../../redux/slice/ShowTimeSlice';
import { defaultStatus } from '../../../ultils/data';
import configRoute from '../../../config';
import { useGroupBy } from '../../../hook';
const DrawerShowTime = lazy(() => import('./DrawerShowTime'));
const AdminShowTimesCreate = lazy(() => import('./Create'));

type Props = {}
interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}
const NestedTable = (props: Props) => {
  const [payload, setPayload] = useState<any[]>([]);
  const [showByDate, setShowByDate] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const { groupByDate } = useGroupBy()
  useEffect(() => {
    document.title = "Admin | Showtime"
    dispatch(getAlSt({}));
  }, [dispatch]);

  const { stList, isLoading, errorMessage } = useAppSelector((state) => state.ShowTimeReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  let movieId = searchParams.get("movieId");
  let { movie } = useAppSelector((state: any) => state.movie);
  let movieSelect = movie.find((item: any) => item?._id === movieId);
  const keyId = useId();

  useEffect(() => {
    if (stList) {
      let itemGet = stList?.filter((item: any) => item?.movieId?._id === movieId);
      setPayload(itemGet);

    }
  }, [stList, movieId]);

  useEffect(() => {
    if (payload) {
      handleSubmit();
    }
  }, [payload]);

  const handleSubmit = () => {
    let sort: any[] = payload?.sort((a: any, b: any) => convertDate(b.startAt) - convertDate(a.startAt))
    const groupDate = groupByDate(sort)
    setShowByDate({ ...groupDate });
  };
  const changeStatus = (_id: any, val: any) => {
    dispatch(updateData({ _id: _id, status: val })).unwrap()
      .then(() => {
        message.success("Thay đổi trạng thái thành công"); setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(() => message.error("Lỗi"))
  };

  const expandedRowRender = (row: any) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: '', dataIndex: 'key', key: 'key', width: 0, className: "", render: (_: any, { key }: any) => <p className='text-white'>{key}</p> },
      { title: 'Thời gian chiếu ', dataIndex: 'startAt', key: 'startAt', width: 150, render: (_: any, { startAt, endAt }: any) => <p>Từ {startAt} đến {endAt}</p>, },
      {
        title: 'Phòng chiếu', dataIndex: 'room', width: 250, key: 'room', render: (_: any, { room, _id, status2 }: any) => (
          <>
            {status2 ? (
              <>
                {room?.map((roomItem: any) => (
                  <Button key={roomItem?._id} className="ml-3" disabled>
                    <Link to={`/book-chair?room=${roomItem?._id}&showtime=${_id}`}>
                      {roomItem?.name}
                    </Link>
                  </Button>
                ))}
              </>
            ) : (
              <>
                {room?.map((roomItem: any) => (
                  <Button key={roomItem?._id} className="ml-3">
                    <Link to={`/book-chair?room=${roomItem?._id}&showtime=${_id}`}>
                      {roomItem?.name}
                    </Link>
                  </Button>
                ))}
              </>
            )}
          </>
        )
      },
      { title: 'Trạng thái truy cập', dataIndex: 'status2', key: 'status2', width: 100, render: (_: any, { status2 }: any) => <p>{status2 ? "Quá hạn, không thể truy cập" : "Đang hoạt động"}</p> },
      { title: 'Xem theo phòng', key: 'watching', width: 100, render: (_: any, { _id }: any) =>(
        <Link to="">Xem ghế đã bán</Link>
      ) },
      {
        title: "Hành động",
        key: "status",
        width: 100,
        render: (_: any, { _id, status2, status }: any) => (
          <>
            {status2 ? (
              <>
                <Select disabled value={status === 0 ? "Hoạt động" : "Dừng hoạt động"}  >
                  {defaultStatus?.map((item: any) => (
                    <Select.Option value={item?.value} key={item?.value}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>

              </>
            ) : (
              <>
                <Select
                  value={status === 0 ? "Hoạt động" : "Dừng hoạt động"}
                  onChange={(value: any) => {
                    changeStatus(_id, value);
                  }}
                >
                  {defaultStatus?.map((item: any) => (
                    <Select.Option value={item?.value} key={item?.value}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </>
            )}
          </>
        ),
      },

    ];

    const data: any[] = [];
    for (let showKey in showByDate) {
      showByDate[showKey]?.map((item: any, index: any) => {
        if (formatDate(item?.date) == row?.date) {
          let checkTime = isPast(parseISO(item?.date))
          data.push({
            key: index,
            startAt: formatTime(item?.startAt),
            endAt: formatTime(item?.endAt),
            _id: item?._id,
            status: item?.status,
            room: item?.roomId,
            status2: checkTime
          })
        }

      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<any[]> = [
    { title: 'Ngày chiếu', dataIndex: 'date', key: 'date' },
    { title: '', dataIndex: 'key', key: 'key', width: 3, render: (_: any, { key }: any) => <p className='text-white'>{key}</p> },
  ];

  const data: any[] = [];
  for (let key in showByDate) {
    let idShowTime = showByDate[key].map((item:any) => item._id);
    data.push({
      key: keyId.concat(idShowTime),
      date: key,
    });
  }
  return (
    <div>
      <Button className='mr-3'>
        <Link to={configRoute.routes.adminMovie}>DS Phim</Link>
      </Button>
      <DrawerShowTime children={<AdminShowTimesCreate />} isCreate={true} />
      <h1 className='flex justify-center uppercase'> phim : {movieSelect?.name} </h1>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        loading={isLoading}
      />

    </div>
  )
}

export default NestedTable
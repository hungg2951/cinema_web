import { Button, Space } from "antd";
import React, { useEffect, lazy } from "react";
import { Link } from "react-router-dom";
const DataTable = lazy(() => import("../../../components/admin/Form&Table/Table"));
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { EditOutlined } from "@ant-design/icons";
import { getMovieType } from "../../../redux/slice/movieTypeSlice";
type Props = {};

const ListMovieType = (props: Props) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMovieType())
  }, [])
  const { movieType, isFetching } = useAppSelector(
    (state) => state.movieTypeReducer
  );

  const columnList: any = [
    {
      title: "Tên",
      render: (item: any) => <p>{item.name}</p>,
      height: "10",
    },
    {
      title: "Hành động",
      key: "action",
      height: "10",
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
  const data = movieType?.map((item: any) => {
    return {
      _id: item._id,
      name: item.name,
      site: item.imdbId
    };
  });
  return (
    <>
      <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to={configRoute.routes.adminMovieTypeAdd}>
            Thêm thể loại phim
          </Link>
        </Button>
        <Button>
          <Link to={configRoute.routes.adminMovie}>DS Phim</Link>
        </Button>
      </div>
      <DataTable column={columnList} data={data} loading={isFetching} />
    </>
  );
};

export default ListMovieType;

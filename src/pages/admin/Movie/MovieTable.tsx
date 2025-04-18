import {lazy} from "react"
import { Button, message, Modal, Select, Tooltip } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { Link, useNavigate } from "react-router-dom";
import { getMovie, UpdateMovie, UpdateMultiMovie } from "../../../redux/slice/Movie";
import { EditOutlined } from "@ant-design/icons";
import {
  formatDate,
  convertMovieTime,
  formatDateString,
  formatCurrency,
  compareDate,
} from "../../../ultils";
import { AiOutlineInfoCircle, AiOutlineMore } from "react-icons/ai";
import { defaultStatus } from "../../../ultils/data";
import { useSearch } from "../../../hook";
const SelectTable = lazy(() => import("../../../components/admin/SelectTable")) ;

type Props = {
  data: any;
  isLoading: boolean;
  statusUpdate?: any;
  currStatus?: any
};
const { Option } = Select;

const ListMovie = ({ data, isLoading, statusUpdate, currStatus }: Props) => {
  document.title = "Admin | DS Phim";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const changeStatus = (id: any, value: any) => {
    dispatch(UpdateMovie({ _id: id, status: value }))
      .unwrap()
      .then(() => message.success("Thay đổi trạng thái thành công"));
  };
  const { getColumnSearchProps } = useSearch();

  const column: any = [
    {
      title: "#",
      dataIndex: "key",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (_: any, { image, _id }: any) => (
        <Link to={_id}>
          <img width="50px" src={image} height="50px" />
        </Link>
      ),
      width: 120,
    },
    {
      title: "Tên",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      onFilter: (value: string, record: any) => console.log('value, record', value, record),
      compare: (a: any, b: any) => a.name - b.name,

      render: (_: any, { name, _id }: any) => (
        <Link to={_id} className="capitalize font-semibold">
          {name}
        </Link>
      ),
    },
    {
      title: "Ngày khởi chiếu",
      key: "releaseDate",
      ...getColumnSearchProps("releaseDate"),
      render: (_: any, record: any) => (
        <div>
          <p>{formatDate(record?.releaseDate)}</p>
        </div>
      ),
    },
    {
      title: "Time Compare",
      key: "compareNow",
      ...getColumnSearchProps("compareNow"),
      render: (_: any, record: any) => (
        <div>
          <p>{record?.compareNow}</p>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_: any, { _id, status }: any) => (
        <Select
          value={status === 0 ? "Hoạt động" : "Dừng hoạt động"}
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
    },
    {
      title: "Doanh thu",
      key: "profit",
      ...getColumnSearchProps("profit"),
      render: (_: any, record: any) => (
        <div>
          <p>{formatCurrency(record?.profit)}</p>
        </div>
      ),
      width: "150px",
    },

    {
      title: "",
      key: "action",
      fixed: "right",
      render: (item: any, { _id, status, name }: any) => (
        <div className="cursor-pointer flex items-center gap-3 justify-around text-[--primary] text-lg	">
          <Tooltip title="Xem chi tiết">
            <Link to={`${_id}`}>
              <EditOutlined />
            </Link>
          </Tooltip>
          <Tooltip title="Xem nhanh">
            <AiOutlineInfoCircle onClick={() => info(_id)} />
          </Tooltip>
          <Tooltip title="More">
            <AiOutlineMore
              onClick={() => {
                moreOption(_id, status, name);
              }}
            />
          </Tooltip>
        </div>
      ),
      width: 100,
    },
  ];
  const dataTable: Props[] = data?.map((item: any, index: any) => {
    let compare = compareDate(item?.releaseDate);
    return {
      key: index + 1,
      _id: item?._id,
      image: item?.image[0]?.url ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
      name: item?.name,
      actor: item?.actor,
      runTime: item?.runTime,
      releaseDate: item?.releaseDate,
      ageLimit: item?.ageLimit,
      languages: item?.languages,
      country: item?.country,
      director: item?.director,
      description: item?.description,
      status: item?.status,
      profit: item?.profit,
      compareNow: compare,
    };
  });

  const info = (id: any) => {
    const movieOne = data.find((item: any) => item._id === id);
    Modal.info({
      title: `${movieOne?.name} - ( Doanh thu: ${formatCurrency(
        movieOne?.profit
      )})`,
      width: 1000,
      content: (
        <div>
          <div className="grid grid-cols-[30%,70%]">
            <div>
              <img src={movieOne?.image[0]?.url} alt="" width={200} />
            </div>
            <div>
              <p></p>
              <p>
                Loại phim:
                {movieOne?.movieTypeId?.map(
                  (item: any) => item.movieName + ", "
                )}
              </p>
              <p>Thời lượng: {convertMovieTime(movieOne?.runTime)}</p>
              <p>Diễn viên: {movieOne?.actor}</p>
              <p>Đạo diễn: {movieOne?.director}</p>
              <p>Quốc gia: {movieOne?.country}</p>
              <p>Ngày khởi chiếu: {formatDateString(movieOne?.releaseDate)}</p>
            </div>
          </div>
          <div className="mt-4">{movieOne?.description}</div>
        </div>
      ),
      onOk() { },
    });
  };

  //modal show more
  const moreOption = (id: any, status: any, name: any) => {
    Modal.info({
      title: `Phim:  ${name}`,
      width: 300,
      icon: null,
      content: (
        <div className="button_admin_group	">
          {status == 0 && (
            <Button
              type="link"
              onClick={() => {
                navigate(`/admin/showTimes/create?movieId=${id}`);
                Modal.destroyAll();
              }}
            >
              Tạo suất chiếu
            </Button>
          )}
          <Button
            type="link"
            onClick={() => {
              navigate(`/admin/showTimes?movieId=${id}`);
              Modal.destroyAll();
            }}
          >
            Danh sách giờ chiếu
          </Button>
          <Button
            type="link"
            onClick={() => {
              navigate(`/admin/movieComment/${id}`);
              Modal.destroyAll();
            }}
          >
            Đánh giá về phim
          </Button>
        </div>
      ),

      onOk() { },
    });
  };

  const api = {
    read: getMovie,
    update: UpdateMultiMovie
  }


  return (
    <>
      <SelectTable
        columns={column}
        data={dataTable}
        loading={isLoading}
        statusUpdate={statusUpdate}
        currStatus={currStatus}
        type={"releaseDate"}
        api={api}
      />
    </>
  );
};

export default ListMovie;

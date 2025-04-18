import { Button, Collapse, Tabs } from "antd";
import { useEffect, useState, lazy} from "react";
import { Link, useParams } from "react-router-dom";
const RenderSeats = lazy(() => import("../../../components/admin/RenderSeats"));
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOneSBSTById } from "../../../redux/slice/SeatBySTSlice";
import { RenderSeatClient } from "../../../components/admin/RenderSeats/RenderSeatClient";
import { FaUsersCog, FaRegEye, FaExclamation } from "react-icons/fa";
import { getAlSt } from "../../../redux/slice/ShowTimeSlice";
import { getSeatType } from "../../../redux/slice/SeatTypeSlice";

const { Panel } = Collapse;
type Props = {};

const SeatByRoom = (props: Props) => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const [seats, setSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState<any>();
  const [row, setRow] = useState<number>();
  const [column, setColumn] = useState<number>();
  const [seatFile, setSeatFile] = useState<any>();
  useEffect(() => {
    dispatch(getAlSt({}));
    dispatch(getSeatType())
  }, [dispatch])

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getOneSBSTById(id));
      setSeats(payload);
    })();
  }, [id]);

  const { rooms, isFetching } = useAppSelector((state) => state.roomReducer);
  const roomSelect = rooms?.find((item) => item?._id === id);
  const { seatType } = useAppSelector((state) => state.seatTypeReducer);


  useEffect(() => {
    setColumn(roomSelect?.columns);
    setRow(roomSelect?.rows);
  }, []);

  const RenderInfoRoom = () => {
    return (
      <div className="p-3">
        <p>Tên rạp: {roomSelect?.name} </p>
        <p>
          Trạng thái rạp:
          {roomSelect?.status == 0 ? "Đang hoạt động" : "Dừng hoạt động"}
        </p>
        <p>Số lượng ghế: {roomSelect?.rows * roomSelect?.columns}</p>
      </div>
    );
  };
  const items: any[] = [
    {
      key: "1",
      label: (
        <span style={{ display: "flex", justifyItems: "center", gap: 3 }}>
          <FaExclamation /> Thông tin rạp
        </span>
      ),
      children: <RenderInfoRoom />,
      showSeatType: false
    },
    {
      key: "2",
      label: (
        <span style={{ display: "flex", justifyItems: "center", gap: 3 }}>
          <FaUsersCog /> Quản trị ghế
        </span>
      ),
      children: (
        <RenderSeats
          setSeatFile={setSeatFile}
          seatFile={seatFile}
          row={row}
          column={column}
          seatDetails={seatDetails}
          setSeatDetails={setSeatDetails}
          seats={seats}
          setSeats={setSeats}
          roomId={id}
        />
      ),
      showSeatType: true

    },
    {
      key: "3",
      label: (
        <span style={{ display: "flex", justifyItems: "center", gap: 3 }}>
          <FaRegEye /> Xem với tư cách khách hàng
        </span>
      ),
      children: (
        <RenderSeatClient
          setSeatFile={setSeatFile}
          seatFile={seatFile}
          row={row}
          column={column}
          seatDetails={seatDetails}
          setSeatDetails={setSeatDetails}
          seats={seats}
          setSeats={setSeats}
          roomId={roomSelect}
          showtime={null}
          userId={undefined}
          adminPreview={true}
        />
      ),
      showSeatType: true
    },
  ];

  return (
    <div>
      <Button className="mb-3">
        <Link to="/admin/rooms">DS Phòng chiếu</Link>
      </Button>
      <Tabs defaultActiveKey="2" type="card" items={items} />
      <div className="mb-10 flex gap-3 mx-20">
        <div className="flex mr-5">
          {seatType?.map((item: any) => (
            <div className="flex mr-5" key={item._id}>
              <p
                className={`w-5 h-5 border-2 border-black`}
                style={{ backgroundColor: `${item.color}` }}
              ></p>
              <span className="text-black pl-2 capitalize  ">{item.name}</span>
            </div>
          ))}

          <div className="flex" >
            <p className={`w-5 h-5 border-2 border-black`} style={{ backgroundColor: "#000" }}  ></p>
            <span className="text-black pl-2 capitalize  ">Ghế bị khóa</span>
          </div>

        </div>
        <div className="flex">
          <p className="w-5 h-5 bg-[#35d406]"></p>
          <span className="text-black pl-2"> Ghế Đang Chọn</span>
        </div>

      </div>
    </div>
  );
};

export default SeatByRoom;

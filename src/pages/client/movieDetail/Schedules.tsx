import { Button, DatePicker, Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useGroupBy } from "../../../hook";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getShowTimeByDate } from "../../../redux/slice/ShowTimeSlice";
import { formatDate2 } from "../../../ultils";
import { getOneMovie } from "../../../redux/slice/Movie";
import { useNavigate } from "react-router-dom";
type Props = {
  slug: String;
};
interface ShowTime {
  createdAt: string;
  date: string;
  endAt: string;
  movieId: MovieId;
  price: number;
  roomId: Room;
  startAt: string;
  status: number;
  updatedAt: string;
  _id: string;
}
interface MovieId {
  _id: string;
  name: string;
}


interface GroupedShowTimes {
  [date: string]: ShowTime[];
}

interface Room {
  columns: number;
  createdAt: string;
  formatId: formatId;
  name: string;
  rows: number;
  status: number;
  updatedAt: string;
  _id: string;
}
interface formatId {
  _id: string;
  name: string;
}


const Schedules = ({ slug }: Props) => {
  const [groupedShowTimes, setGroupedShowTimes] = useState<GroupedShowTimes>(
    {}
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [roomsToChoose, setRoomsToChoose] = useState<Room[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedShowTimeId, setSelectedShowTimeId] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const movieRes = await dispatch(getOneMovie(slug)).unwrap();
        const showtimes: ShowTime[] = await dispatch(
          getShowTimeByDate({ id: movieRes.movie._id })
        ).unwrap();

        const grouped = showtimes.reduce((acc: GroupedShowTimes, showtime) => {
          const date = moment(showtime.startAt).format("YYYY-MM-DD");
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(showtime);
          return acc;
        }, {});

        setGroupedShowTimes(grouped);

        // Mặc định chọn ngày hôm nay nếu có
        const today = moment().format("YYYY-MM-DD");
        if (grouped[today]) {
          setSelectedDate(today);
        } else {
          const firstAvailableDate = Object.keys(grouped)[0];
          setSelectedDate(firstAvailableDate);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchShowtimes();
  }, [dispatch, slug]);

  const handleDateClick = (showtime: any) => {
    if (showtime.roomId.length === 1) {
      // Nếu chỉ có 1 phòng → chọn luôn phòng đó
      const room = showtime.roomId[0];
      navigate(`/book-chair?room=${room._id}&showtime=${showtime._id}`);
    } else if (showtime.roomId.length > 1) {
      // Nếu có nhiều phòng → mở popup chọn phòng
      setRoomsToChoose(showtime.roomId);
      setSelectedShowTimeId(showtime._id);
      setIsModalVisible(true);
    } else {
      console.warn("Không có phòng nào trong suất chiếu này.");
    }
  };

  const handleRoomSelect = (roomId: Room) => {
    navigate(`/book-chair?room=${roomId._id}&showtime=${selectedShowTimeId}`);
    setIsModalVisible(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Chọn ngày chiếu</h2>

      {/* Các nút chọn ngày */}
      <div className="flex gap-4 mb-8 overflow-x-auto">
        {Object.keys(groupedShowTimes).map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`min-w-[120px] px-4 py-2 rounded-full border ${
              selectedDate === date
                ? "bg-[#0f1729] text-white"
                : "bg-gray-100 text-gray-800"
            } hover:bg-[#0f1729] hover:text-white transition`}
          >
            {moment(date).format("DD/MM/YYYY")}
          </button>
        ))}
      </div>

      {/* Các khung giờ trong ngày */}
      <h3 className="text-xl font-semibold mb-4 text-white">
        Suất chiếu ngày{" "}
        {selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : ""}
      </h3>

      <div className="flex flex-wrap gap-4">
        {groupedShowTimes[selectedDate]?.length ? (
          groupedShowTimes[selectedDate].map((showtime) => (
            <div
              key={showtime._id}
              className="px-4 py-2 border rounded-lg shadow hover:shadow-md transition cursor-pointer"
              onClick={() => handleDateClick(showtime)}
            >
              {moment(showtime.startAt).format("HH:mm")}
            </div>
          ))
        ) : (
          <p>Không có suất chiếu cho ngày này.</p>
        )}
      </div>

      {/* Modal chọn phòng */}
      <Modal
        title="Chọn phòng chiếu"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="flex flex-wrap gap-4">
          {roomsToChoose.map((room) => (
            <Button
              key={room._id}
              type="default"
              onClick={() => handleRoomSelect(room)}
              className="w-full"
            >
              {room.name} ({room.formatId.name})
            </Button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Schedules;

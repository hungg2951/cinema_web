import { Form, Button, message } from "antd";
import { useState, useEffect,lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
const RoomForm = lazy(() => import("../../../components/admin/Form&Table/RoomForm")) ;
import config from "../../../config";
import { useAppDispatch } from "../../../redux/hook";
import { createRooms } from "../../../redux/slice/roomSlice";

type Props = {};

const AdminRoomCreate = (props: Props) => {
  const [seatFile, setSeatFile] = useState({});
  const [rowFile, setRowFile] = useState(0);
  const [colFile, setSColFile] = useState(0);
  const [showSeatTye, setShowSeatTye] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [seats, setSeats] = useState();

  const onFinish = (val: any) => {
    dispatch(createRooms(val))
      .unwrap()
      .then(() => {
        message.success("tạo thành công");
        navigate(config.routes.adminRooms);
      })
      .catch((err: any) => message.error(`${err}`));
  };
  useEffect(() => {
    setShowSeatTye(true);
    document.title = "Admin | Create-Room";
  }, []);
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={config.routes.adminRooms}>DS Phòng chiếu</Link>
      </Button>
      <RoomForm
        onFinish={onFinish}
        form={form}
        seatFile={seatFile}
        setSeatFile={setSeatFile}
        rowFile={rowFile}
        colFile={colFile}
        setRowFile={setRowFile}
        setColFile={setSColFile}
        seats={seats}
        setSeats={setSeats}
        showSeatTye={showSeatTye}
        adminRenderSeat={false}


      />
    </div>
  );
};

export default AdminRoomCreate;

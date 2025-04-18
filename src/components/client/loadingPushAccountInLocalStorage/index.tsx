import { message, notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch } from "../../../redux/hook";
import { getCurrentUser } from "../../../redux/slice/AuthSlice";


type Props = {};

const LoadingPushAccountInLocalStorage = (props: Props) => {

   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   dispatch(getCurrentUser()).unwrap()
      .then((payload: any) => {
         message.success("Đăng Nhập thành công")
         navigate('/')
      })
      .catch((err: any) => {
         notification.error({ message: "Đăng nhập thất bại" });
         navigate(configRoute.routes.signin)
      }
      )
   return (
      <div style={{ position: "absolute", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
         <Spin size="large" />
      </div>

   )
};

export default LoadingPushAccountInLocalStorage;

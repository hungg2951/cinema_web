import { Tabs, message } from "antd";
import { useEffect, useState, lazy } from "react";
import { useAppSelector } from "../../../redux/hook";
const OrderTable = lazy(() => import("./OrderTable"));
const SearchByCate = lazy(() => import("../../../components/admin/SearchByCate"));
import { useDispatch } from "react-redux";
import { getAllOrders } from "../../../redux/slice/OrdersSlice";
import { orderMutipleOption } from "../../../ultils/data";
type Props = {};

const OrderTab = ({ }: Props) => {
   document.title = "Admin | Orders";
   const dispatch = useDispatch<any>();
   useEffect(() => { dispatch(getAllOrders({})) }, [dispatch]);

   const { orders } = useAppSelector((state: any) => state.OrderReducer);
   const [orderSuccess, setOrderSuccess] = useState<any[]>([]);
   const [orderFailed, setOrderFailed] = useState<any[]>([]);
   const [orderXuatVe, setOrderXuatVe] = useState<any[]>([]);
   const [hiddenEl, setHiddenEl] = useState<any>(false);
   const [findData, setFindData] = useState<any[]>([]);

   useEffect(() => {
      if (orders) {
         let dataStt0 = orders?.filter((item: any) => item?.status == 0);
         let dataStt2 = orders?.filter((item: any) => item?.status == 2);
         setOrderSuccess(orders?.filter((item: any) => item?.status == 1));
         setOrderFailed([...dataStt0, ...dataStt2]);
         setOrderXuatVe(orders?.filter((item: any) => item?.status == 3));
      }
   }, [orders]);


   console.log(orderSuccess);
   
   const items: any[] = [
      {
         key: 1,
         label: `Đơn thanh toán thành công (${orderSuccess?.length})`,
         children: <OrderTable data={orderSuccess} />,
      },
      {
         key: 2,
         label: `Đơn thanh toán Lỗi / Chưa thanh toán (${orderFailed?.length}) `,
         children: <OrderTable data={orderFailed} />,
      },
      {
         key: 3,
         label: `Đã xuất vé  (${orderXuatVe?.length}) `,
         children: <OrderTable data={orderXuatVe} />,
      },
   ];
   const SearchItems: any[] = [
      {
         key: 4,
         label: `Đơn  tìm thấy (${findData?.length})`,
         children: <OrderTable data={findData} />,
      },
   ];

   const onFinish = (val: any) => {
      if (val?.optionData == "orderCode") {
         let a = orders.filter((item: any) => item?.shortId.toLowerCase().includes(val?.searchValue.toLowerCase()));
         if (a?.length > 0) {
            setHiddenEl(true);
            setFindData(a);
         } else {
            message.error("Không tìm thấy đơn nào");
            setFindData([]);
            setHiddenEl(true);
         }
      } else if (val?.optionData == "userId") {
         let b = orders.filter((item: any) => item?.userId?._id.toLowerCase().includes(val?.searchValue.toLowerCase()));
         if (b?.length > 0) {
            setHiddenEl(true); setFindData(b);
         } else {
            message.error("Không tìm thấy đơn nào");
            setFindData([]);
            setHiddenEl(true);
         }
      } else {
         let c = orders.filter((item: any) => item?.userId?.username.toLowerCase().includes(val?.searchValue.toLowerCase()));
         if (c?.length > 0) {
            setHiddenEl(true);
            setFindData(c);
         } else {
            message.error("Không tìm thấy đơn nào");
            setFindData([]);
            setHiddenEl(true);
         }
      }
   };
   const onReset = () => {
      setHiddenEl(false);
   };
   return (
      <>
         <SearchByCate
            data={orders}
            onFinish={onFinish}
            onReset={onReset}
            category={orderMutipleOption}
         />
         {!hiddenEl ? (
            <Tabs
               defaultActiveKey="1"
               size={"small"}
               style={{ marginBottom: 32 }}
               items={items}
            />
         ) : (
            <Tabs
               defaultActiveKey="1"
               size={"small"}
               style={{ marginBottom: 32 }}
               items={SearchItems}
            />
         )}
      </>
   );
};

export default OrderTab;

import { Button, Tabs } from 'antd';
import { useEffect, useState, lazy } from 'react'
import { useAppSelector } from '../../../redux/hook';
const AdminVoucherList = lazy(() => import('./List'));
import { useDispatch } from 'react-redux';
import { getAllOrders } from '../../../redux/slice/OrdersSlice';
import { Link } from 'react-router-dom';
import { getAlVc } from '../../../redux/slice/voucherSlice';
type Props = {}

const VoucherTab = (props: Props) => {
   document.title = "Admin | Orders";
   const dispatch = useDispatch<any>();

   useEffect(() => { dispatch(getAllOrders({})); dispatch(getAlVc()) }, [dispatch])
   const { vouchers, isLoading } = useAppSelector((state) => state.voucherReducer);
   const [voucherActive, setVoucherActive] = useState<any[]>([]);//status =0
   const [voucherInActive, setVoucherInActive] = useState<any[]>([]); // status = 1 

   useEffect(() => {
      if (vouchers) {
         setVoucherActive(vouchers?.filter((item: any) => item?.status == 0));
         setVoucherInActive(vouchers?.filter((item: any) => item?.status !== 0))
      }
   }, [vouchers])

   const items: any[] = [
      {
         key: 1,
         label: `Voucher đang sd (${voucherActive?.length})`,
         children: <AdminVoucherList data={voucherActive} statusUpdate={1} currStatus={0} isLoading={isLoading} />
      },
      {
         key: 2,
         label: `Voucher dừng hoạt động / hết hạn (${voucherInActive?.length}) `,
         children: <AdminVoucherList data={voucherInActive} statusUpdate={0} currStatus={1} isLoading={isLoading} />
      },
   ];

   return (
      <>
         <Button type="primary" style={{ marginBottom: "20px" }}>
            <Link to="add">Thêm Voucher</Link>
         </Button>
         <Tabs
            defaultActiveKey="1"
            size={"small"}
            style={{ marginBottom: 32 }}
            items={items}
         />
      </>

   )
}

export default VoucherTab
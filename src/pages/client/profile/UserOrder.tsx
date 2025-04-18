import { Button, Modal, Table, Tag } from 'antd'
import { useState, lazy } from 'react'
import { useSearch } from '../../../hook'
import { formatCurrency, formatDate, formatTime } from '../../../ultils'
import type { ColumnsType } from 'antd/es/table';
const Ticket = lazy(() => import('../../../components/client/Ticket'));
import { useAppDispatch } from '../../../redux/hook';
import { getOneOrder } from '../../../redux/slice/OrdersSlice';

type Props = {
   orders: any
}

const UserOrder = ({ orders }: Props) => {
   const [open, setOpen] = useState(false);
   const [order, setOrder] = useState<any>([]);
   const { getColumnSearchProps } = useSearch();
   const dispatch = useAppDispatch()
   const handleOneOrder = (val: any) => {

      dispatch(getOneOrder(val)).unwrap()
         .then((payload: any) => { setOrder(payload); setOpen(true); console.log(payload) })
         .catch((err: any) => { console.log(err) })
   }
   const dataSource: Props[] = orders?.map((item: any, index: any) => {
      return {
         key: index + 1,
         _id: item?._id,
         status: item?.status,
         createdAt: item?.createdAt,
         qrCode: item?.qrCode,
         ticketId: item?.ticketId,
         totalPrice: formatCurrency(item?.totalPrice),
         userId: item?.userId,
         ticket: item?.ticketId?.quantity,
         email: item?.userId?.email,
         code: item?.shortId,
         date: formatDate(item?.createdAt)
      };
   });
   const columns: ColumnsType<any> = [
      {
         title: '#',
         dataIndex: 'key',
         key: 'key'
      },
      {
         title: 'Mã đơn',
         dataIndex: 'code',
         key: 'code',
         ...getColumnSearchProps('code'),
         render: (_: any, { code, _id }: any) => (
            <>
               <Button type="link" onClick={() => handleOneOrder(_id)}>
                  {code}
               </Button>
               <Modal
                  centered
                  open={open}
                  onOk={() => setOpen(false)}
                  onCancel={() => setOpen(false)}
                  width={1000}
               >
                  <Ticket isAdmin={false} detail={order?.detail} order={order?.order} />
               </Modal>
            </>
         )
      },
      {
         title: 'Ngày đặt',
         dataIndex: 'createdAt',
         key: 'createdAt',
         ...getColumnSearchProps('date'),
         sortDirections: ['descend', 'ascend'],
         render: (_: any, { createdAt }: any) => <p>{formatDate(createdAt)} {formatTime(createdAt)}</p>
      },
      {
         title: 'SL Vé',
         dataIndex: 'ticket',
         key: 'ticket',
         ...getColumnSearchProps('ticket'),
         sorter: (a, b) => a.ticket.length - b.ticket.length,
         sortDirections: ['descend', 'ascend'],
      },
      {
         title: 'Tổng tiền',
         dataIndex: 'totalPrice',
         key: 'totalPrice',
         ...getColumnSearchProps('totalPrice'),
      },
      {
         title: "Trạng thái",
         dataIndex: "status",
         render: (_: any, record: any) => (
            <>
               {record?.status === 1 ? <Tag color="#87d068"> Đã thanh toán   </Tag> : record?.status === 3 ? <Tag color="#d06d68"> Đã xuất vé </Tag> : <Tag color="processing">Đang chờ thanh toán / thanh toán lỗi</Tag>}
            </>
         )
      },
   ];
   return (
      <>
         <b> Bạn có {orders?.length} đơn hàng</b>
         <Table columns={columns} dataSource={dataSource} />
      </>
   )
}

export default UserOrder
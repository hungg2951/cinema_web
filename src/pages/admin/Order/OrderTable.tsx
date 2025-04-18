import { Tag, Tooltip } from 'antd';
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { EditOutlined } from "@ant-design/icons";
import { formatCurrency, formatDate, formatTime } from '../../../ultils';
import { useSearch } from '../../../hook';
import { PAGE_SIZE } from '../../../ultils/data';

type Props = { data: any }

const OrderTable = ({ data }: Props) => {
   const { getColumnSearchProps } = useSearch()
   const dataSource: Props[] = data?.map((item: any, index: any) => {
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
         key: 'key',
      },
      {
         title: 'Mã đơn',
         dataIndex: 'code',
         key: 'code',
         ...getColumnSearchProps('code'),
         render: (_: any, { code, _id }: any) => <Link to={`${_id}`}>{code}</Link>
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

      {
         title: 'Người đặt',
         dataIndex: 'userId',
         key: 'userId',
         ...getColumnSearchProps("email"),
         sortDirections: ['descend', 'ascend'],
         render: (_: any, { userId }: any) => (
            <Tooltip title={userId?.email}>
               {userId?.username ?? userId?.email}
            </Tooltip>
         )
      },
      {
         title: "ACTION",
         key: "action",
         fixed: "right",
         render: (_: any, record: any) => (
            <Space size="middle">
               <Link to={`${record._id}`}>
                  <EditOutlined
                     style={{ color: "var(--primary)", fontSize: "18px" }}
                  />
               </Link>
            </Space>
         ),
      },
   ];
   return (
      <div>
         <Table columns={columns} dataSource={dataSource}
            pagination={dataSource && dataSource?.length > PAGE_SIZE && {
               defaultPageSize: 5,
               showSizeChanger: true,
               pageSizeOptions: ["5", "10", "20", "30"]
            }} />
      </div>
   )
}

export default OrderTable
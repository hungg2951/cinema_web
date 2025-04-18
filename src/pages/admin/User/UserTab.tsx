import { lazy } from "react"
import { Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';
const AdminUserList = lazy(() => import('./List'));
import { useSelectUser } from '../../../hook';
type Props = {
}

const UserTab = ({ }: Props) => {
   document.title = "Admin | Orders";
   const { activeUser, closeUser, inActiveUser } = useSelectUser()

   const items: any[] = [
      {
         key: 1,
         label: `${activeUser?.name} (${activeUser?.data?.length})`,
         children: <AdminUserList data={activeUser.data} />
      },
      {
         key: 2,
         label: `${closeUser?.name}(${closeUser?.data?.length}) `,
         children: <AdminUserList data={closeUser.data} />
      },
      {
         key: 3,
         label: `${inActiveUser?.name}(${inActiveUser?.data?.length}) `,
         children: <AdminUserList data={inActiveUser.data} />
      },
   ]

   return (
      <>
         <div className="flex gap-5">
            <Button type="primary" style={{ marginBottom: "20px" }}>
               <Link to="/admin/users/add">Tạo người dùng</Link>
            </Button>
         </div>
         <Tabs
            defaultActiveKey="1"
            size={"small"}
            style={{ marginBottom: 32 }}
            items={items}
         />

      </>

   )
}

export default UserTab
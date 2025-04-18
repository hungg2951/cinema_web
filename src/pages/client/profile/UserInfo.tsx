import { useEffect, useState,lazy } from "react";
const UserForm = lazy(() => import("../../../components/admin/Form&Table/UserForm")) ;
import { Form, message } from "antd";
import moment from "moment";
import { AuthApi } from "../../../service/authApi";
type Props = {
   data: any;
   token: any
};

const UserInfo = ({ data, token }: Props) => {
   const [form] = Form.useForm();
   const [avatarList, setAvatarList] = useState<any[]>([]);
   const [newPass, setNewPass] = useState<any>("");
   useEffect(() => {
      document.title = "Cập nhật thông tin cá nhân";
      if (data) {
         setAvatarList(data?.avatar as any[]);
         form.setFieldsValue({
            ...data,
            dob: moment(data?.dob),
         });
      }
   }, [data]);

   const onFinish = (val: any) => {
      val._id = data?._id;
      let avatarList = val?.avatarList?.fileList;
      if (avatarList) val.avatar = avatarList;
      else val.avatar = val?.avatar;
      const dob = new Date(moment(val.dob).format());
      AuthApi.createOrUpdateUser(token as any, { ...val, dob })
         .then(() => {
            message.success("update thông tin thành công");
         })
         .catch((res) => {
            message.error(res);
         });

   };
   const onReset = () => {
      form.resetFields()
   };
   return (
      <div>
         <UserForm
            onFinish={onFinish}
            form={form}
            avatarList={avatarList}
            newPass={newPass}
            setNewPass={setNewPass}
            setAvatarList={setAvatarList}
            onReset={onReset}
            edit={true}
            showPass={false}
            userId={data?._id}
            userEdit={false}
         />
      </div>
   );
};

export default UserInfo;

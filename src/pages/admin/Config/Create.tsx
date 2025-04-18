import { useEffect, useState } from "react"
import { Button, Form, message } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { createData } from "../../../redux/slice/webConfig"
import WebConfigForm from "../../../components/admin/Form&Table/WebConfigForm";
import configRoute from "../../../config";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

const WebConfigCreate = (props: Props) => {
   const [form] = Form.useForm();
   const dispatch = useAppDispatch();
   const navigate = useNavigate()
   const [avatarList, setAvatarList] = useState([]);
   useEffect(() => { document.title = "Admin | Config Store - Create" }, []);

   const onFinish = (values: any) => {
      let address = [{ text: values.address_text, iframe: values.map }]
      let logo = values?.avatarList?.fileList;
      let upload = { ...values, address, logo }
      dispatch(createData(upload)).unwrap()
         .then(() => { message.success('Tạo thành công'); navigate(configRoute.routes.webConfig) })
         .catch(() => message.error('Tạo thất bại'))
   };
   const onReset = () => { form.resetFields() };

   return (
      <>
         <Button>
            <Link to={configRoute.routes.webConfig}>Danh sách</Link>
         </Button>
         <WebConfigForm
            form={form}
            onFinish={onFinish}
            onReset={onReset}
            avatarList={avatarList}
            setAvatarList={setAvatarList}
            hiddenBtn={true}
         />
      </>
   );
};

export default WebConfigCreate;
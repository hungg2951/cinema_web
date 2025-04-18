import { useEffect, useState, lazy } from "react";
import { Button, Form, message } from "antd";
import { createData } from "../../../redux/slice/PostSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
const PostForm = lazy(() => import("../../../components/admin/Form&Table/PostForm"));
import { Link, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
type Props = {};

const AddPost = (props: Props) => {
   document.title = "Admin | Create Post";
   const [form] = Form.useForm();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const currentUser = useAppSelector(state => state.authReducer.currentUser);

   const [avatarList, setAvatarList] = useState<any[]>([]);
   const { errorMessage } = useAppSelector(state => state.FormatReducer);

   const onFinish = async (values: any) => {
      values.imagesFile = values?.avatarList?.fileList;
      values.userId = currentUser._id

      dispatch(createData(values)).unwrap()
         .then(() => { message.success('Tạo thành công'); navigate(configRoute.routes.AdminPosts) })
         .catch(() => message.error(errorMessage))
   };

   const onReset = () => {
      form.resetFields();
      setAvatarList([]);
   };

   return (
      <>
         <Button type="primary" style={{ marginBottom: "20px" }}>
            <Link to={configRoute.routes.AdminPosts}>DS Bài viết</Link>
         </Button>
         <Button style={{ marginLeft: "20px" }}>
            <Link to={configRoute.routes.adminCategories}>DS Danh mục</Link>
         </Button>
         <PostForm
            form={form}
            onFinish={onFinish}
            avatarList={avatarList}
            setAvatarList={setAvatarList}
            onReset={onReset}
         />
      </>
   );
};

export default AddPost;
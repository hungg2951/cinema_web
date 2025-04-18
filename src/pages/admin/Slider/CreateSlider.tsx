import { useEffect, useState ,lazy} from "react";
import { Button, Form, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { createSlider } from "../../../redux/slice/Slider";
const SliderForm = lazy(() => import("../../../components/admin/Form&Table/SliderForm")) ;
type Props = {};

const CreateSlider = (props: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movie } = useAppSelector((state) => state.movie);
  const { posts } = useAppSelector((state) => state.PostReducer);
  const [avatarList, setAvatarList] = useState<any[]>([]);
  
  const onFinish = async (values: any) => {
    values.images = values.avatarList?.fileList;
    let checkURL = movie?.filter((item: any) => (item?.slug)?.includes(values?.url));
    if (!checkURL || checkURL?.length > 0) {
      values.url = values.url
    } else {
      values.url = `/post/${values.url}`
    }
    const { meta, payload } = await dispatch(createSlider(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminSlider);
    } else {
      message.error(`${payload}`);
    }
  };
  useEffect(() => {
    if (movie && data) {
      setData([...movie, ...posts]);
    }
  }, [movie, posts])

  return (
    <>
      <Button className="mb-3">
        <Link to={configRoute.routes.adminSlider}>List Slider</Link>
      </Button>
      <SliderForm form={form} onFinish={onFinish} data={data} avatarList={avatarList} setAvatarList={setAvatarList} />
    </>
  );
};

export default CreateSlider;

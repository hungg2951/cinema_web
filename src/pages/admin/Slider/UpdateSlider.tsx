import { Button, Form, message } from "antd";
import { useEffect, useState,lazy } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { UpdateSliderThunk } from "../../../redux/slice/Slider";
const SliderForm = lazy(() => import("../../../components/admin/Form&Table/SliderForm")) ;

type Props = {};

const UpdateSlider = (props: Props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { slider } = useAppSelector((state) => state.slider);
  const data = slider.find((item: any) => item._id === id);
  const [dataUpdate, setDataUpdate] = useState<any[]>([]);
  const [avatarList, setAvatarList] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setAvatarList(data?.images as any[]);
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data]);
  const { movie } = useAppSelector((state) => state.movie);
  const { posts } = useAppSelector((state) => state.PostReducer);

  useEffect(() => {
    if (movie && data) {
      setDataUpdate([...movie, ...posts]);
    }
  }, [movie, posts]);

  const onFinish = async (values: any) => {
    values._id = id;
    let avatarList = values?.avatarList?.fileList;
    if (avatarList) values.images = avatarList;
    else values.images = values?.images;

    let checkURL = movie?.filter((item: any) => (item?.slug)?.includes(values?.url));
    if (!checkURL || checkURL?.length > 0) {
      values.url = values.url
    } else {
      values.url = `/post/${values.url}`
    }
    console.log(values);
    
    dispatch(UpdateSliderThunk(values)).unwrap()
      .then(() => { message.success({ content: "Sửa thành công" }); navigate(configRoute.routes.adminSlider) })
      .catch(() => {
        message.error({ content: "Thất bại" });
      });
  };

  return (
    <>
      <Button className="mb-3">
        <Link to={configRoute.routes.adminSlider}>DS Slider</Link>
      </Button>
      <SliderForm form={form} onFinish={onFinish} data={dataUpdate} avatarList={avatarList} setAvatarList={setAvatarList} />
    </>
  );
};

export default UpdateSlider;

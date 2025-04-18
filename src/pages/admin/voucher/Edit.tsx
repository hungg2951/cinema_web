import { useEffect, useState ,lazy} from "react";
import { Button, Form, message } from "antd";
import { updateData } from "../../../redux/slice/voucherSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
const VoucherForm = lazy(() => import("../../../components/admin/Form&Table/VoucherForm")) ;
import { Link, useNavigate, useParams } from "react-router-dom";
import config from "../../../config";
import moment from "moment";
import { upperOrLowerText } from "../../../ultils";

type Props = {};

const AdminVoucherEdit = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [avatarList, setAvatarList] = useState<any[]>([]);
  const { id } = useParams();
  const { vouchers } = useAppSelector((state) => state.voucherReducer);


  const dataSelected = vouchers.find((item: any) => item._id === id);
  useEffect(() => {
    document.title = `Admin | Edit ${dataSelected?.code ?? dataSelected?._id}`;
    if (dataSelected) {
      setAvatarList(dataSelected?.imagesFile as any[]);
      form.setFieldsValue({
        ...dataSelected,
        timeValid: [
          moment(dataSelected.timeStart),
          moment(dataSelected.timeEnd),
        ],
      });
    }
  }, [dataSelected]);

  const onReset = () => {
    form.resetFields();
    setAvatarList([]);
  };

  const onFinish = async ({ timeValid, ...values }: any) => {
    try {
      const [x, y] = timeValid;
      const timeStart = new Date(moment(x).format());
      const timeEnd = new Date(moment(y).format());
      values.code = upperOrLowerText(values.code, "upper");
      await dispatch(
        updateData({ ...values, _id: id, timeStart, timeEnd })
      ).unwrap();
      message.success("Cập nhật Voucher thành công");
      navigate(config.routes.AdminVouchers);
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={config.routes.AdminVouchers}>DS Voucher</Link>
      </Button>
      <VoucherForm
        form={form}
        onFinish={onFinish}
        avatarList={avatarList}
        setAvatarList={setAvatarList}
        onReset={onReset}
        voucherId={id}
        userId={dataSelected?.userId}
      />
    </div>
  );
};

export default AdminVoucherEdit;

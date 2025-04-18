import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updatePass } from "../../../redux/slice/userSlice";
import Swal from "sweetalert2";
import { LogOut } from "../../../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
type Props = {};

const ChangePassword = (props: Props) => {
  const [form] = Form.useForm();
  const { accessToken } = useAppSelector( (state) => state.authReducer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    dispatch(
      updatePass({
        token: accessToken,
        newPassword: values.password,
        oldPassword: values.oldPassword,
      })
    )
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Đổi mật khẩu thành công",
          text: "Bạn có muốn đăng nhập lại không",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(LogOut());
            navigate(configRoute.routes.signin);
          }
        });
      })
      .catch((err: any) => {
        Swal.fire({
          icon: "warning",
          title: `${err}`,
        });
      });
  };
  const reset = () => {
    form.resetFields();
  };
  return (
    <>
      <div className="min-h-[200px] pt-5">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="oldPassword"
            label={<label> Mật khẩu cũ </label>}
            rules={[{ required: true, message: "Không được để trống!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="password"
            label={<label> Mật khẩu mới </label>}
            rules={[{ required: true, message: "Không được để trống!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            dependencies={["password"]}
            hasFeedback
            name="confirm"
            label={<label> Nhập lại mật khẩu </label>}
            rules={[
              { required: true, message: "Không được để trống!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đổi mật khẩu
            </Button>
            <Button htmlType="submit" onClick={reset} className="ml-5">
              Nhập lại
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;

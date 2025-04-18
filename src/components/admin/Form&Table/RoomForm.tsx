import { useState,useEffect } from "react";
import styled from "styled-components";
import { Button, Card, Form, FormInstance, Input, Select, Skeleton, InputNumber } from "antd";
import { validateMessages } from "../../../ultils/FormMessage";
import { useAppSelector } from "../../../redux/hook";
import { useAppDispatch } from './../../../redux/hook';
import { getSeatType } from "../../../redux/slice/SeatTypeSlice";
import { getAllData } from "../../../redux/slice/FilmFormatSlice";
interface RoomFormProps {
  form: FormInstance<any>;
  onFinish: (values: any) => void;
  edit?: boolean;
  editData?: boolean;
  loading?: boolean;
  setSeatFile: any;
  seatFile: any;
  seats: any;
  setSeats: any;
  showSeatTye: any;
  rowFile: any;
  colFile: any;
  setRowFile: any;
  setColFile: any;
  adminRenderSeat: any;
  showTable?: boolean;
}
const RoomForm = ({ form, onFinish, showSeatTye, rowFile, colFile, editData = true }: RoomFormProps) => {
  const [row, setRow] = useState<number>(rowFile);
  const [column, setColumn] = useState<number>(colFile);
  const { seatType } = useAppSelector((state: any) => state?.seatTypeReducer);
  const { filmFormats } = useAppSelector((state) => state.FormatReducer);
  const dispatch = useAppDispatch()
  const onChangeRow = (val: any) => { setRow(val) };
  const onChangeCols = (val: any) => { setColumn(val) };

  useEffect(() => {
    dispatch(getSeatType());
    dispatch(getAllData());
  }, [dispatch])



  return (
    <div className="">
      {editData ? (
        <div className="w-full ">
          <Form layout="vertical" form={form} onFinish={onFinish} validateMessages={validateMessages}  >
            <Card className="col-12">
              <Form.Item label="Tên phòng" name="name" rules={[{ type: "string", required: true, min: 5, max: 20, whitespace: true }]}  >
                <Input placeholder="Nhập vào" />
              </Form.Item>

              <Form.Item label="Định dạng phim" name="formatId" rules={[{ required: true }]}   >
                <Select>
                  {filmFormats &&
                    filmFormats?.map((item: any) => (
                      <Select.Option value={item._id} key={item._id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              {showSeatTye && (
                <Form.Item label="Loại ghế" name="seatTypeId" rules={[{ required: true }]}   >
                  <Select>
                    {seatType && seatType?.map((item: any) => (
                      <Select.Option value={item._id} key={item._id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}

              <Form.Item label="columns" name="rows" rules={[{ required: true }]}>
                <InputNumberCs min={1} max={20} placeholder="tạo số hàng" onChange={onChangeRow} className="w-full" />
              </Form.Item>
              <Form.Item label="rows" name="columns" rules={[{ required: true }]}>
                <InputNumberCs min={1} max={20} placeholder="tạo số hàng" onChange={onChangeCols}
                />
              </Form.Item>
              <Card style={{ position: "sticky", bottom: "0", left: "0", width: "100%", border: "none" }}  >
                <div style={{ display: "flex", justifyContent: "start", gap: "5px" }}  >
                  <Button htmlType="submit" type="primary" style={{ minWidth: 150 }}   >
                    Lưu
                  </Button>
                </div>
              </Card>
            </Card>
          </Form>
        </div>
      ) : (
        <>
          <Skeleton />
        </>
      )}
    </div>
  );
};

export default RoomForm;
const InputNumberCs = styled(InputNumber)`
  width: 100%;
`;

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  DatePicker,
  Form,
  FormInstance,
  InputNumber,
  Select,
  Skeleton
  } from 'antd';
import { convertMovieTime, formatCurrency, formatDate } from '../../../ultils';
import { defaultStatus } from '../../../ultils/data';
import { getAlSt } from '../../../redux/slice/ShowTimeSlice';
import { getMovie } from '../../../redux/slice/Movie';
import { getRooms } from '../../../redux/slice/roomSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { useGroupBy } from '../../../hook';
import { validateMessages } from '../../../ultils/FormMessage';
import 'antd/dist/antd.css';
import type { RangePickerProps } from "antd/es/date-picker";
interface ShowTimeFormProps {
  form: FormInstance<any>;
  onFinish: (values: any) => void;
  onReset?: () => void;
  edit?: boolean;
  editUser?: boolean;
  loading?: boolean;
  extraPrice: any;
  setExtraprice: any;
  movieId: any;
  setTimeEnd: any;
  timeEnd: any;
}
const ShowTimeForm = ({
  form,
  movieId,
  onFinish,
  onReset,
  editUser = true,
}: ShowTimeFormProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAlSt({}));
    dispatch(getMovie())
    dispatch(getRooms())
  }, [dispatch]);
  const { movie } = useAppSelector((state) => state.movie);
  const { rooms } = useAppSelector((state) => state.roomReducer);
  const [messRoom, setMessRoom] = useState<any>("");
  const [messTime, setMessTime] = useState<any>("");
  const [roomSelect, setRoomSelect] = useState<any>();
  const [timeEnd, setTimeEnd] = useState<any>();
  const [priceExtra, setPriceExtra] = useState<any>();
  const [days, setDays] = useState<any>();
  const [timeChose, setTimeChose] = useState<any>();
  const [timeStartCreate, setTimeStartCreate] = useState<any>();
  const [hiddenRoom, setHiddenRoom] = useState<any>(false);
  const [stByDays, setStByDays] = useState<any>();
  const [roomList, setRoomList] = useState<any>([]);
  const [stLisst, setStLisst] = useState<any>([]);
  const [startTime, setStartTime] = useState<any>();
  const [disableBtn, setDisableBtn] = useState<any>(false);


  const { stList, isLoading } = useAppSelector((state: any) => state.ShowTimeReducer);
  const { groupByTime, groupByDate } = useGroupBy()
  let movieSelect = movie?.find((item: any) => item?._id === movieId);
  let movieTime = convertMovieTime((movieSelect?.runTime) + 15);
  let movieRelease = moment(movieSelect?.releaseDate).date();
  // flatten roomId
  const flatten = (arr: any) => {
    return arr.reduce((pre: any, cur: any) => {
      return pre.concat(Array.isArray(cur) ? flatten(cur) : cur?.roomId);
    }, []);
  };
  useEffect(() => {
    if (stList) {
      setStLisst(stList);
    }
  }, [stList]);
  useEffect(() => {
    if (movieId) {
      form.setFieldsValue({
        movieId: movieId,
        releaseDate: moment(movieSelect?.releaseDate),
      });
    }
    if (rooms) {
      let roomActive = rooms?.filter((item: any) => item?.status == 0);
      setRoomList(roomActive);
    }
  }, [movieId, rooms]);
  useEffect(() => {
    if (timeEnd && priceExtra) {
      form.setFieldsValue({
        timeEnd: moment(timeEnd),
        price: priceExtra,
      });
    }
  }, [timeEnd]);

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current <= moment().endOf("day");
  };
  useEffect(() => {
    if (timeStartCreate >= 2 && timeStartCreate < 7) {
      setStartTime("không đặt suất chiếu từ 2-7h sáng");
      setDisableBtn(true);
    } else {
      setStartTime("");
      setDisableBtn(false);
    }
  }, [timeStartCreate]);
  const validRange = (value: any, dateString: any) => {
    setTimeEnd(moment(value).add(movieTime));
    let timeStart = moment(value).hour();
    let dayStart = moment(value).date();
    let getDayStart = formatDate(dateString);
    let fullTimeStart = moment(value).format("HH:mm");
    setTimeChose(fullTimeStart);
    setDays(getDayStart);
    setTimeStartCreate(timeStart);

    if (dayStart >= movieRelease) {
      if (timeStart >= 9 && timeStart <= 16) {
        setPriceExtra(20000);
      } else if (timeStart >= 17 && timeStart <= 21) {
        setPriceExtra(30000);
      } else {
        setPriceExtra(10000);
      }
    } else {
      if (timeStart >= 9 && timeStart <= 16) {
        setPriceExtra(40000);
      } else if (timeStart >= 17 && timeStart <= 21) {
        setPriceExtra(50000);
      } else {
        setPriceExtra(30000);
      }
    }
  };
  const watchRoomId = (val: any) => {
    setRoomSelect(val);
  };
  useEffect(() => {
    const sortStByDay = groupByDate(stLisst);
    setStByDays(sortStByDay);
  }, [stLisst]);

  useEffect(() => {
    if (days && timeChose) {
      validateST();
    }
  }, [days, timeChose, stLisst]);

  const validateST = () => {
    // for (let key in stByDays) {
    //   let arrTimeStart = groupByTime(stByDays[key], "startAt")
    //   let arrTimeEnd = groupByTime(stByDays[key], "endAt");
    //   let newTimeEnd = moment(timeEnd).format("HH:mm")

    //   for (let inputStart in arrTimeStart) {
    //     for (let inputEnd in arrTimeEnd) {
    //       if (timeChose < inputEnd && newTimeEnd  < inputStart) {
    //         let roomExist = arrTimeStart[inputStart]
    //         let data = flatten(roomExist)

    //         let kiemtraphongtrong = roomList.filter((cv: any) => {
    //           return !data.find((e: any) => {
    //             return e?._id == cv?._id;
    //           });
    //         });
    //         setRoomList(kiemtraphongtrong);
    //         if (kiemtraphongtrong?.length > 0) {
    //           setMessRoom(`Phòng đang trống: ${kiemtraphongtrong?.map((item: any) => item?.name)}`);
    //         } else {
    //           console.log("Không còn phòng nào trống, vui lòng chọn khung giờ khác");
    //           setHiddenRoom(true);
    //         }
    //       }
    //     }
    //   }

    // }
  };

  return (
    <>
      <Alert message="Mỗi khung giờ sẽ được cộng thêm 15 phút để phòng trừ mọi tình huống + thời gian dọn dẹp" type="info" showIcon />
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="grid grid-flow-col">
          {editUser ? (
            <>
              <Card className="col-6 w-full">
                <Form.Item
                  label="Chọn Phim"
                  name="movieId"
                  rules={[{ required: true }]}
                >
                  <Select disabled>
                    {movie.map((item: any, index: any) => (
                      <Select.Option key={item._id} value={item[index]}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Ngày khởi chiếu"
                  name="releaseDate"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    format="DD-MM-YYYY"
                    value={movieSelect?.releaseDate}
                    disabled
                    className="w-full"
                  />
                </Form.Item>
                <div className="flex flex-wrap justify-between">
                  <Form.Item
                    label="Chọn thời gian phát sóng"
                    name="timeStart"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      // disabledDate={disabledDate}
                      showTime={{ hideDisabledOptions: true, format: "HH:mm" }}
                      format="DD-MM-YYYY HH:mm"
                      onChange={validRange}
                      showNow={false}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Thời gian kết thúc"
                    name="timeEnd"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      disabled
                      showTime={{ hideDisabledOptions: true, format: "HH:mm" }}
                      showNow={false}
                      format="DD-MM-YYYY HH:mm"
                      onChange={validRange}
                    />
                  </Form.Item>
                </div>
                {messTime && (
                  <div className="mt-[-10px] mb-3 text-red-600">

                    <Alert message={messTime} type="warning" showIcon />
                  </div>
                )}
                {startTime && (
                  <div className="mt-[-10px] mb-3 text-red-600">
                    <Alert message={startTime} type="error" showIcon />
                  </div>
                )}
                <Form.Item
                  label="Chọn phòng chiếu"
                  name="roomId"
                  rules={[{ required: true }]}
                >
                  {hiddenRoom == true ? (
                    <Select mode="multiple" onChange={watchRoomId} disabled>
                      {roomList.map((item: any, index: any) => (
                        <Select.Option key={item._id} value={item[index]}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    <Select mode="multiple" onChange={watchRoomId}>
                      {roomList.map((item: any, index: any) => (
                        <Select.Option key={item._id} value={item[index]}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                {messRoom && (
                  <div className="mt-[-10px] mb-3 text-red-600">
                    <Alert message={messRoom} type="error" showIcon />
                  </div>
                )}
              </Card>
              <Card className="col-6 w-full">
                <small className="block text-red-600 w-[300px] font-semibold">
                  <span className="text-black">Bảng giá extra:</span> <br />
                  Từ 9.am - 16.am: phụ thu {formatCurrency(20000)}
                  <br />
                  Từ 17.am - 21.pm: phụ thu {formatCurrency(30000)}
                  <br />
                  Sau 21.pm: phụ thu {formatCurrency(10000)}
                  <br />
                  <b>
                    * Suất chiếu sớm: phụ thu {formatCurrency(20000)} + giờ chiếu
                  </b>
                </small>
                <Form.Item
                  label="price"
                  name="price"
                  rules={[
                    {
                      type: "number",
                      required: true,
                      min: 10000,
                      max: 200000,
                      whitespace: true,
                    },
                  ]}
                >
                  <InputNumber
                    readOnly
                    min={10000}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    style={{ width: "40%" }}
                    step="10000"
                  />
                </Form.Item>

                <Form.Item
                  label="Chọn trạng thái"
                  name="status"
                  rules={[{ required: true }]}
                >
                  <Select>
                    {defaultStatus &&
                      defaultStatus?.map((item: any) => (
                        <Select.Option value={item.value} key={item.value}>
                          {item.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                <div className="col-12">
                  <Card
                    style={{
                      position: "sticky",
                      bottom: "0",
                      left: "0",
                      width: "100%",
                      border: "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        gap: "5px",
                      }}
                    >
                      {onReset && (
                        <Button htmlType="button" onClick={onReset}>
                          Nhập lại
                        </Button>
                      )}

                      {disableBtn ? (
                        <Button
                          htmlType="submit"
                          type="primary"
                          style={{ minWidth: 150 }}
                          disabled
                        >
                          Lưu
                        </Button>
                      ) : (
                        <Button
                          htmlType="submit"
                          type="primary"
                          style={{ minWidth: 150 }}
                          loading={isLoading}
                        >
                          Lưu
                        </Button>
                      )}
                    </div>
                  </Card>
                </div>
              </Card>
            </>
          ) : (
            <>
              <Skeleton />
            </>
          )}
        </div>
      </Form>
    </>
  );
};

export default ShowTimeForm;

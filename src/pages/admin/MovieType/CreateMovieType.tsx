import { Button, Divider, Form, Input, Table, message } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { createMovieType } from "../../../redux/slice/movieTypeSlice";
import { Link, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { useState } from 'react';
import requests from "../../../tmdb"
import axiosClient from "../../../service/instance";
type Props = {};

const CreateMovieType = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    if (values.length !== undefined) {
      const options = values.map(function (row: any) {
        return { imdbId: row.id || null, name: row.name }
      });
      dispatch(createMovieType(options))
        .then(() => { message.success("Nhap thanh cong");navigate(configRoute.routes.adminMovieType)  })
        .catch(() => message.error("Loix"))
    } else {
      dispatch(createMovieType(values))
        .then(() => { message.success("Them thanh cong");navigate(configRoute.routes.adminMovieType)  })
        .catch(() => message.error("Loix"))
    }
  };
  const [res, setRes] = useState([]);
  const handleFromTmdb = () => {
    const handle = async () => {
      const { data } = await axiosClient.get(requests.getGenres);
      setRes(data.genres)
    }
    handle()
  }
  const dataSource = res && res.map((item: any, index: any) => {
    return {
      key: index + 1,
      name: item?.name
    }
  });

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <>
      <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to={configRoute.routes.adminMovieType}>DS Thể loại</Link>
        </Button>
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to={configRoute.routes.adminMovie}>DS Phim</Link>
        </Button>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Tên thể loại phim"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>

      <Divider>Hoặc</Divider>
      <Button type="primary" onClick={handleFromTmdb}>Nhập từ tài nguyên TMDB</Button>
      {res && res.length > 0 && (
        <>
          <Table columns={columns} dataSource={dataSource} size="middle" />
          <Button onClick={() => onFinish(res)}>Pushlist</Button>
        </>
      )}
    </>
  );
};

export default CreateMovieType;

import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import ImageUpload from '../../upload'
import { defaultStatus } from '../../../ultils/data';

type Props = {
   onFinish: any,
   form: any,
   data: any,
   avatarList: any[];
   setAvatarList: React.Dispatch<any>;
}

const SliderForm = ({ onFinish, form, data, avatarList, setAvatarList }: Props) => {
   return (
      <>
         <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off" >
            <Form.Item label="Ảnh">
               <ImageUpload imageList={avatarList} limit={1} key={1} />
            </Form.Item>
            <Form.Item name="title" label="Title" rules={[{ required: true, message: "Không được để trống! " }]} >
               <Input />
            </Form.Item>
            <Form.Item label="Url" name="url" rules={[{ required: true, message: "Không được để trống! " }]}    >
               <Select>
                  {data?.map((item: any) => (
                     <Select.Option value={`${item?.slug}`} key={item._id}>
                        {item?.name ?? `/post/${item?.title}`}
                     </Select.Option>
                  ))}
               </Select>
            </Form.Item>
            <Form.Item label="Trạng thái" name="status">
               <Select>
                  {defaultStatus.map((item: any) => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
               </Select>
            </Form.Item>
            <Form.Item>
               <Button type="primary" htmlType="submit">
                  Submit
               </Button>
            </Form.Item>
         </Form>
      </>
   )
}

export default SliderForm
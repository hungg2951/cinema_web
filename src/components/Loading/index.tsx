import React from 'react'
import { Spin } from 'antd';
interface Props {
  
}

const Loading = (props: Props) => {
  return (
    <div className='h-[100vh] flex justify-center items-center'>
        <Spin size='large' spinning/>
    </div>
  )
}

export default Loading

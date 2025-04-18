import React from 'react'
import useSelectRevenue from '../../../../hook/useSelectRevenue'

type Props = {}

const Days = (props: Props) => {
  const {byDay} = useSelectRevenue();
  console.log(byDay);
  
  return (
    <div>
      {!byDay && <p>Chưa có dữ liệu</p>}
    </div>
  )
}

export default Days
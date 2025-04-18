import React, { lazy } from 'react';
const Days = lazy(() => import('./Days'));
const Months = lazy(() => import("./Months"));
const Years = lazy(() => import("./Years"));
const Company = lazy(() => import("./Company"))
type Props = {}

const Revenue = (props: Props) => {

  return (
    <div className='p-5 grid grid-cols-3 gap-4' >
      <div className="item border border-solid border-red-400">
        <div className="">
          <h1>Doanh thu theo ngay</h1>
        </div>
        <div className="">
          <Days />
        </div>
      </div>

      <div className="item border border-solid border-red-400">
        <div className=""><h1> Doanh thu theo tháng</h1></div>
        <div className="">
          <Months />
        </div>
      </div>
      <div className="item border border-solid border-red-400 ">
        <div className=""><h1>Doanh thu theo nam</h1></div>
        <div className="">
          <Years />
        </div>
      </div>
      <div className="item border border-solid border-red-400 col-start-1 col-end-7">
        <div className=""><h1>Tổng doanh thu</h1></div>
        <div className="">
          <Company />
        </div>
      </div>

    </div>
  )
}

export default Revenue
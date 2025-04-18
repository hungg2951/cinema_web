import React, { useEffect, useState } from 'react'
import { Button, Result } from 'antd';
import { Link, useLocation } from 'react-router-dom';
type Props = { }

const CancelOrder = (props: Props) => {
  const { state } = useLocation();
  const [info, setInfo] = useState<any>()
  console.log("🚀 ~ CancelOrder ~ info:", info)

  useEffect(() => {
    document.title = "SUNCINEMA";
    if (state) {
      setInfo(state?.stateToNextStep?.populatedDetail[0])
    }
  }, [state])
  return (
    <div className="flex flex-row justify-center mt-24">
      <div className="w-[55%]">
        <div className="bg-[#f6710d] h-[550px] ">
          <div className="flex items-center justify-between p-2">
            <h1 className="text-3xl p-3 text-white "> </h1>
            <div className="">
            </div>
          </div>
          <div className="bg-[#ffffff] h-[550px] max-h-[550px] w-[98%] max-w-[98%] p-5 ml-2">
            <Result
              status="warning"
              title="Đơn hàng của bạn đã bị hủy do quá hạn thời gian"
              extra={
                <>
                  {(info ) ? (
                    <Button type="primary" key="console">
                      <Link to={`/book-chair?room=${info?.seatId?.roomId?._id}&showtime=${info?.showTimeId?._id}`}>
                        Đặt lại vé</Link>
                    </Button>
                  ) : (
                    <Button type="primary" key="console">
                      <Link to={`/`}>
                        Đặt lại vé</Link>
                    </Button>
                  )}
                </>
              }
            />
          </div>
        </div>
      </div>
      <div className="w-[20%] bg-white ml-10 h-[580px] ">
      </div>
    </div>
  )
}

export default CancelOrder
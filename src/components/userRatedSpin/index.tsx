import { Progress } from 'antd'
import React from 'react'

type Props = {
    per: number
}

const UserRateSpin = ({per}: Props) => {
    return (
        <div className="flex gap-5">
            <div className="wrapper_progress absolute bg-black  w-[80px] h-[80px] text-white overflow-hidden rounded-full ring-2 ring-white">
               <div className="progress absolute top-[4px] right-[-4px] ">
                <Progress type="circle"
                        percent={per}
                        size={70}
                        strokeColor={per < 70 ? "rgb(255 255 0)" : "rgb(0 205 0)"}
                        trailColor ={per < 70 ? "rgb(255 255 0 / 0.3)" : "rgb(0 205 0 / 0.3)"}
                        className='px-2'
                        format={(percent) => (
                            <div className='progress_content'>
                                <span className="text-white text-[20px] font-bold">{percent}</span>
                                <small className="text-white text-[10px] top-[-3px]">%</small>
                            </div>
                        ) }
                />
               </div>  
            </div>
            <div className="relative left-[85px] top-[20px] font-bold text-[17.5px] text-white pl-2">
            User <br/> Score
            </div>                
        </div>
    )
}

export default UserRateSpin
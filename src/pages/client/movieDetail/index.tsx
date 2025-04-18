import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import { formatRunTimeToDate, formatDate } from '../../../ultils';
import { AiOutlineHeart } from "react-icons/ai"
import { BsFillPlayFill } from "react-icons/bs"
import { Modal, Spin } from "antd";
import Tab from "./Tab";
import { useAppDispatch } from "../../../redux/hook";
import { getOneMovie} from "../../../redux/slice/Movie";
import {getShowTimeByDate} from "../../../redux/slice/ShowTimeSlice";
import moment from "moment";

type Props = {}

const DetailMovie = (props: Props) => {
  let { state } = useLocation();
  const dispatch = useAppDispatch()
  const { slug } = useParams()
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<any>();
  const [date, setDate] = useState<any>(moment().startOf('day').format())
    console.log("datedâdasdasd",date)

    useEffect(() => {
    if (!state && state == null) {
      (async () => {
        const { payload } = await dispatch(getOneMovie(slug));
        setDetail(payload?.movie);
      })();
    } else {
      setDetail(state)
    }
  }, [state, slug])

  useEffect(() => {
      if((state !== null || detail !== undefined) && (state || detail)) {
        const id  = state ? state?._id : detail?._id;
        console.log("id",id);

       (async () => {
           const options = {
               id: id,
               date:date
           }
           console.log("options",options)
          const payload  = await dispatch(getShowTimeByDate(options));
          console.log("payload của  gọi danh sách ngày chiếu", payload)
        })()
      }
  },[slug,state,date])




  document.title = `${detail?.name || state?.name || "Loading..."}`

  return (
    <div className='w-full h-full'>
      <div className="header h-[600px] border border-blue-600 mb-8">
        {detail !== undefined ? (
          <div className=" h-[600px] w-full">
            <img className='hidden sm:block w-full h-[600px] object-cover '
              src={`${detail?.image?.[0]?.url}`}
              alt='/'
            />
            <div className="absolute bg-black/80 top-0 left-0 w-full h-[610px]">
              <div className="h-full top-[15%] px-8 w-full z-50">
                <div className='h-[450px] absolute top-[20%]  rounded-lg flex flex-row gap-7'>
                  <img className=' w-full h-full object-cover rounded-lg basis-[20%]'
                    src={`${detail?.image?.[1]?.url}`}
                    alt='/'
                  />
                  <div className="content basis-[80%] p-3">
                    <div className="title">
                      <span className='font-bold text-[32px] text-white'>{detail?.name}</span>
                      <span className='text-[32px] text-gray-600'> ({detail?.releaseDate?.slice(0, 4)})</span>
                    </div>
                    <div className="facts">
                      <span className='border rounded-sm mr-2 px-1 text-gray-400'>{detail?.ageLimit}</span>
                      <span className='text-white mr-2'>{formatDate(detail?.releaseDate)}</span>
                      <span className="text-white mr-2 before:contents-[*] before:text-red-600 after:tetx-red-600 before:mr-2 after:contents-[*] after:mr-2 ">
                        {detail?.movieTypeId?.map((item: any) => <Link to="#" className='p-1 text-slate-300' key={item?._id}>{item?.movieName?.concat(",") || ""}</Link>)}
                      </span>
                      <span className='text-white'>{formatRunTimeToDate(140)}</span>
                    </div>

                    <div className="flex gap-3 mt-4  items-center mb-10">
                      <button className='bg-[#032541] w-[50px] h-[50px] rounded-full  flex justify-center items-center '><AiOutlineHeart style={{ fontSize: "20px", color: '#ffff' }} /></button>
                      <button className='bg-[#032541] w-[50px] h-[50px] rounded-full flex justify-center items-center '><AiOutlineHeart style={{ fontSize: "20px", color: '#ffff' }} /></button>
                      <button className='bg-[#032541] w-[50px] h-[50px] rounded-full flex justify-center items-center '><AiOutlineHeart style={{ fontSize: "20px", color: '#ffff' }} /></button>
                      <button className='bg-[#032541] w-[50px] h-[50px] rounded-full flex justify-center items-center '><AiOutlineHeart style={{ fontSize: "20px", color: '#ffff' }} /></button>
                      <button onClick={() => setOpen(true)} className='flex text-white font-bold pl-2 gap-1 items-center hover:text-red-600 '><BsFillPlayFill /> Play Trailer</button>
                      <Modal
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        footer={null}
                        width={950}
                      >
                        <iframe width="900" height="315"
                          src="https://www.youtube.com/embed/Nv5Qt_nMRb8"
                          title="YouTube video player" frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen></iframe>
                      </Modal>
                    </div>
                    <div className="overview mb-3">
                      <b className='mb-3 text-[1.3em] text-white'>Overview</b>
                      <p className='text-white text-[16px]'>{detail?.description}</p>
                    </div>
                    <div className="castCrew grid grid-rows-2 grid-flow-col gap-4">
                      {detail?.actor && detail?.actor.slice(0, 3)?.map((item: any, index: any) => (
                        <div key={`${index}.${index}`} >
                          <div className='text-white text-[16px] font-semibold'> {item}</div>
                          <small className='text-white '>Characters</small>
                        </div>

                      ))}
                      {detail?.director && detail?.director?.slice(0, 3)?.map((item: any, index: any) => (
                        <div key={`${item}.${index}`}>
                          <div className='text-white text-[16px] font-semibold'> {item}</div>
                          <small className='text-white '>Director</small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" h-[600px] w-full grid place-items-center">
            <Spin  tip="Loading..."/>
          </div>
        )}
      </div>
      <div className="bg-[#0F172A] h-[450px] max-h-[450px] w-full relative">
        <div className="container bg-[#293548] w-[90%] h-[80%]  my-5 mx-auto rounded py-5  top-[10%] relative text-white ">
          <Tab  slug={slug}/>
        </div>

      </div>
    </div>
  )
}

export default DetailMovie
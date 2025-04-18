import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getMovie } from '../../../redux/slice/Movie';
import { Link } from 'react-router-dom';
import { truncateString, formatDate } from '../../../ultils';
import { MdOutlineSend } from "react-icons/md";
import { Spin } from 'antd';
type Props = {}

const Header = (props: Props) => {
    const dispatch = useAppDispatch()
    const [movieRender, setMovieRender] = useState<any>();

    useEffect(() => {dispatch(getMovie())}, [dispatch])
    const { movie } = useAppSelector(state => state.movie);
    
    useEffect(() => {
        movie && setMovieRender(movie[Math.floor(Math.random() * movie.length)])
    }, [movie])

    return (    
        <div className='w-full h-[550px]'>
            {movieRender !== undefined ? (
              <div className="w-full h-full">
                <div className="absolute w-full h-[550px] bg-gradient-to-r from-black">
                </div>
                <img className='w-full h-[550px] object-cover' src={`${movieRender?.image?.[0]?.url}`} />
                <div className="absolute w-full top-[5%] p-4 md:p-8 ">
                    <h1 className='text-3xl md:text-5xl font-bold text-white' >{movieRender?.name}</h1>
                    <div className="my-7 flex items-center">
                        <button className='border bg-gray-300 text-white border-gray-300 px-5 py-2 rounded hover:bg-transparent transiti'><Link to={`/${movieRender?.slug}`} className='font-bold flex items-center text-black hover:text-red-600 p-1' ><MdOutlineSend style={{ fontSize: '20px', paddingRight: '5px' }} />Đặt vé ngay</Link></button>
                        <button className='border  text-white border-gray-300 px-5 py-3 ml-4 hover:bg-white hover:text-black'><Link to={`/${movieRender?.slug}`} className='font-bold flex items-center text-white hover:text-red-600' >Xem chi tiết</Link></button>
                    </div>
                    <p className='text-gray-400 text-sm'>Khởi chiếu: {formatDate(movieRender?.releaseDate)}</p>
                    <p className='w-full md:max-w-[70%] lg:max-w-[35%] text-gray-200 mt-3'>{truncateString(movieRender?.description, 200)}</p>
                </div>
            </div>   
            ):(
                <div className="w-full h-full grid place-items-center" >
                    <Spin tip="Loading...."/>
                </div>
            )} 
           
        </div>
    )
}

export default Header
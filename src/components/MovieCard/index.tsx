import { Modal } from 'antd';
import { useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {formatDate2, formatRunTimeToDate, truncateString } from '../../ultils';
type Props = {
    item: any,
}

const MovieCard = ({ item }: Props) => {
    const [like, setLike] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal =async (id: any) => {
        setIsModalOpen(true);
    };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) };
    
    return (
        <div className="w-[250px] h-[350px] pl-2  bg-black inline-block cursor-pointer relative p-2 ">
            <img className='w-full h-full block object-contain' src={`${item?.image?.[1]?.url}`} alt={item?.name} />
            <div className="absolute w-full top-0 left-0 h-full hover:bg-black/80  opacity-0 hover:opacity-100 text-white">
                <p onClick={() => showModal(item?._id)} className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{truncateString(item?.name, 28)}</p>
                <Modal title={
                    <div className="font-extrabold text-2xl  bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-red-500">
                        {item?.name}
                    </div>}
                    open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <i> <b>Mô tả: </b> {item?.description || "Chưa có mô tả cho phim này"}</i> <br />
                    <i> <b>Thể loại: </b>{item?.movieTypeId && item?.movieTypeId?.map((item: any) => <span key={item?._id}>{item?.movieName?.concat(" ") || ""}</span>)}</i> <br />
                    <i> <b>Ngày khởi chiếu: </b> {formatDate2(item?.releaseDate)}</i> <br />
                    <i> <b>Thời lượng: </b>{formatRunTimeToDate(item?.runTime)}</i> <br />
                    <p className='mt-3 pt-3'>  <Link to={`/${item?.slug}`} state={item} className='bg-red-600 text-white px-2 py-2 rounded-r-sm hover:text-black font-semibold'>Đặt vé</Link> </p>
                </Modal>
                <p className=''>
                    {like ? <FaHeart className='absolute top-4 left-5 text-gray-300' size={25} /> : <FaRegHeart className='absolute top-4 left-5 text-gray-300'size={25}  />}
                </p>
            </div>
        </div>
    )
}

export default MovieCard
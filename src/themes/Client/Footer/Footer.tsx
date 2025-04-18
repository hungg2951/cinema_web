import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../redux/hook'
type Props = {}

const Footer = (props: Props) => {
    const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);

    return (
        <div className='bg-black h-[300px] mt-[150px] bg-[#1E293B] pt-12 relative top-0 bottom-0 w-full'>
            <div className="text-white flex items-center justify-center gap-8 mt-5">
                <div className="">
                    <Link to="/" className='grid place-items-center'><img className='w-[110px] h-[90px] object-fill border border-yellow-600' src={webConfigs?.[0]?.logo?.[0]?.url} alt="" /></Link>
                    <Link to={""}><button className='px-[1em] py-1 rounded-sm mt-5 text-[1.3em] font-bold whitespace-normal uppercase bg-[#01B4E4] text-white'>Join the Community</button></Link>
                </div>
                <div className="grid ">
                    <h2 className='text-black font-bold'>THE BASICS</h2>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>Giới thiệu về {webConfigs?.[0]?.storeName}</Link>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>Contact Us</Link>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>Chương trình khuyến mãi</Link>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>Chính sách ưu đãi</Link>
                </div>
                <div className="grid ">
                    <h2 className='text-black font-bold'>COMMUNITY</h2>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>Guidelines</Link>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>Discussions</Link>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>Leaderboard</Link>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>Twitter</Link>
                </div>
                <div className=" grid ">
                    <h2 className='text-black font-bold'>LEGAL</h2>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>Terms of Use</Link>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>API Terms of Use</Link>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>Privacy Policy</Link>
                    <Link to="#" className='text-white text-[14px] text-slate-400 hover:text-black font-medium'>Privacy Policy</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
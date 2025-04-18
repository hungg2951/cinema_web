import { useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getConfigs } from '../../../redux/slice/webConfig';
import { Dropdown, MenuProps, Space , Drawer, Button} from 'antd';
import { MdOutlineControlCamera, MdNotificationsNone, MdSearch, MdOutlineSettings, MdOutlineLogout, MdOutlineLoop } from "react-icons/md"

const Navbar = () => {
  const dispatch = useAppDispatch()
  useEffect(() => { dispatch(getConfigs()) }, []);
  const { webConfigs } = useAppSelector(state => state.WebConfigReducer);
  const { currentUser } = useAppSelector(state => state.authReducer);
  const [open, setOpen] = useState(false);
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (<Link to="/profile" className=''>Profile</Link>),

    },
    {
      key: '2',
      label: (<Link to="#" className='/profile'> Lịch sử giao dịch </Link>),
      icon: <MdOutlineLoop style={{ fontSize: "17px" }} />
    },
    {
      key: '3',
      label: (<Link to="#" className=''>  Đăng xuất </Link>),
      icon: <MdOutlineLogout style={{ fontSize: "17px" }} />
    },
  ];
  if (currentUser && currentUser?.role == 1 && currentUser?.status == 1) {
    const adminNav = {
      key: '4',
      label: (<Link to="/admin" className=''>Quản trị</Link>),
      icon: <MdOutlineSettings style={{ fontSize: "17px" }} />

    }
    items.splice(2, 0, adminNav);
  }

  return (
    <div className='w-full absolute flex justify-between top-0 items-center p-4 z-[100] sm:w-full '>
      <div className="w-[120px] max-w-[120px]"> <Link to="/"><img className='object-cover p-4' src={`${webConfigs?.[0]?.logo?.[0]?.url} ` || "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"} alt="" /></Link></div>
      <div className="flex items-center gap-5 border border-red-500">
        {/* <MdNotificationsNone className='text-[25px]' /> */}
        {/* <MdOutlineControlCamera className='text-[25px]' />
        <MdSearch className='text-[25px]' /> */}
        <Button onClick={() => setOpen(!open)} icon={<MdNotificationsNone />}></Button>


        <div className='flex items-center"'>
          {currentUser ? (
            <div className="w-[30px] h-[30px] rounded-full cursor-pointer">
              <Dropdown menu={{ items }} className="sm:relative sm:right-11 " placement="bottomRight">
                <a onClick={(e) => e.preventDefault()}>
                  <img className='w-full h-full  object-cover object-center' src={currentUser?.avatar?.[0]?.url || currentUser?.avatar?.url || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} alt="" />
                </a>
              </Dropdown>
            </div>
          ) : (
            <>
              <Link to="/login"><button className='text-white pr-4'>Sign In</button></Link>
              <Link to="/signup"> <button className='bg-red-600 rounded px-4 py-1 cursor-pointer text-white'>Sign Up</button></Link>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar;


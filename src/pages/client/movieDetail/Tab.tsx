import { useState } from 'react';
import { MdChat } from "react-icons/md"
import Comente from './Comment';
import Schedules from './Schedules';

type Props = {
    slug:any
}

const Tab = ({slug}: Props) => {
    const tabsData = [
        {
            label: <div className='flex justify-center items-center gap-4'>
                <MdChat size={25} />
                <h1 className='font-bold text-slate-200'> Danh sách giờ chiếu </h1>
            </div>,
            content: <Schedules slug={slug}/>,
        },
        {
            label: <div className='flex justify-center items-center gap-4'>
                <MdChat size={25} />
                <h1 className='font-bold text-slate-200'>Nhận xét </h1>
            </div>,
            content: <Comente data={[]} />,
        },
        {
            label: <div className='flex justify-center items-center gap-4'>
                <MdChat size={25} />
                <h1 className='font-bold text-slate-200'>Phim liên quan </h1>
            </div>,
            content: 'Ut irure mollit nulla eiusmod excepteur laboris elit sit anim magna tempor excepteur labore nulla.',
        },
    ];
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    return (
        <div>
            <div className="flex space-x-3 border-b">
                {tabsData.map((tab, idx) => {
                    return (
                        <button
                            key={idx}
                            className={`py-2 w-[20%] border-b-4 transition-colors duration-300 ${idx === activeTabIndex
                                ? 'border-slate-600'
                                : 'border-transparent hover:border-gray-200'
                                }`}
                            onClick={() => setActiveTabIndex(idx)}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
            <div className="py-4">
                <>{tabsData[activeTabIndex].content}</>
            </div>
        </div>
    );
}

export default Tab
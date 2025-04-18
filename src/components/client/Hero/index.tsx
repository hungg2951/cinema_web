import { Link } from "react-router-dom";

type Props = {};

const Hero = (props: Props) => {
    return (
        <div className="my-7 w-full h-[280px] container mx-auto">
            <div className="sm:p-[20px]  lg:p-[70px]  md:p-[70px] container" style={{backgroundPosition: "center"  ,backgroundImage: `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces_filter(duotone,190235,ad47dd)/lMnoYqPIAVL0YaLP5YjRy7iwaYv.jpg")` }}>
                <div className="lg:grid lg:grid-cols-3 gap-4 sm:block sm:p-3 ">
                    <div className="left col-span-2">
                        <h1 className="text-[32px] mb-3 text-white font-bold">Join Today</h1>
                        <p className="lg:w-[600px] text-[19px] sm:w-full">
                            Get access to maintain your own custom personal lists, track what
                            you've seen and search and filter for what to watch
                            next—regardless if it's in theatres, on TV or available on popular
                            streaming services like .
                        </p>
                        <Link to="/signup" > <button className="bg-[#805be7] text-white font-bold px-[16px] py-[8px] rounded-sm">Sign Up</button> </Link>
                    </div>
                    <div className="column_hero">
                        <ul className="leading-7">
                            <li className="list-outside list-disc text-[16px] font-semibold text-slate-400">Enjoy TMDB ad free</li>
                            <li className="list-outside list-disc text-[16px] font-semibold text-slate-400">Maintain a personal watchlist</li>
                            <li className="list-outside list-disc text-[16px] font-semibold text-slate-400">Filter by your subscribed streaming services and find something to watch</li>
                            <li className="list-outside list-disc text-[16px] font-semibold text-slate-400">Log the movies and TV shows you've seen</li>
                            <li className="list-outside list-disc text-[16px] font-semibold text-slate-400">Build custom lists</li>
                            <li className="list-outside list-disc text-[16px] font-semibold text-slate-400">Contribute to and improve our database</li>
                        </ul>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

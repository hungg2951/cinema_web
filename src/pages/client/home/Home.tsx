import Row from '../../../components/Row'
import Hero from '../../../components/client/Hero'
import { getMovie } from "../../../redux/slice/Movie"
import Header from '../../../themes/Client/Header'
type Props = {}

const Home = (props: Props) => {
  document.title = "SUN CINEMA"
  return (
    <>
      <Header />
      <Row rowID='1' rateSpin={true} title="Phim đang chiếu" fetchURL={getMovie} />
      {/* dưới đây  */}
      <Hero />


    </>
  )
}

export default Home
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
type Props = {
  slider: Array<any>
};

const SlideShow = (props: Props) => {
  return (
    <div className="banner">
      <Slide easing="ease">
        {props.slider.map((item: any) =>
          <div className="each-slide" key={item?._id}>
            <div >
              <Link to={item.url} title={item.title}>
                <img src={item.images[0].url} style={{width: "100%"}} /></Link>
            </div>;
          </div>
        )}
      </Slide>
    </div>
  );
};

export default SlideShow;

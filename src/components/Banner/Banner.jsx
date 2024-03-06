import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from "../images/malaikotai poster.webp"
import banner2 from "../images/falimy poster.webp"
import banner3 from "../images/garudan-movie poster.jpg"
import banner4 from "../images/neymer baner.jpg"

const Banner = () => {

    const images = [banner1, banner2,banner3,banner4];
    
    const settings = {
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      pauseOnHover: false,
      customPaging: (i) => (
        <div style={{ width: '10px', height: '10px', background: 'gray', borderRadius: '50%',marginTop:"-50px" }}>
          {/* You can customize the dot content here */}
        </div>
      ),
    };
    
  return (
    <div style={{ width: '100%',marginTop:"10px" }}>
         <Slider {...settings} style={{ width: '100%', }}>
      {images.map((image, index) => (
        <div key={index} >
          <img src={image}style={{width:"100%",height:"450px",objectFit:"cover",overflow:"hidden"}}alt={`slide-${index}`} />
        </div>
      ))}
    </Slider>
        
    </div>
    
  )
}

export default Banner
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from "../images/banner1.png"
import banner2 from "../images/banner2.png"

const Banner = () => {

    const images = [banner1, banner2];
    
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
    <div style={{ width: '100%', overflow: 'hidden',marginTop:"60px",backgroundColor:"skyblue" }}>
         <Slider {...settings} style={{ width: '100%', overflow: 'hidden' }}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} style={{width:"100%",objectFit:"contain",height:"500px"}} alt={`slide-${index}`} />
        </div>
      ))}
    </Slider>
        
    </div>
    
  )
}

export default Banner
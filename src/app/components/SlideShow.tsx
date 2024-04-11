import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import slide1 from '../assets/Images/slide1.png'
import slide2 from '../assets/Images/slide2.png'
import slide3 from '../assets/Images/slide3.png'
import slide4 from '../assets/Images/slide4.png'


const fadeImages = [
  {
    url: slide1,
    caption: 'Life is an event, Make it memorable!'
  },
  {
    url: slide2,
    caption: 'Our business is making memories!'
  },
  {
    url: slide3,
    caption: 'Get ready for an event to remember!'
  },
  {
    url: slide4,
    caption: 'Your event, our expertise.!'
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <style scoped>{`.slide-container { margin-top: 30px; }`}</style>
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: '100%', height: '90vh' }} src={fadeImage.url} />
            <h2 style={{
              position: "absolute",
              top: "50%",
              left: "3rem",
              transform: "translateY(-50%)",
              color: "white",
            }}>{fadeImage.caption}</h2>
          </div>
        ))}
      </Fade>
    </div>
  )
}

export default Slideshow;
import '../shared/AboutPage.css'; 
import NavBar from './Navbar';
import Footer from './Footer';
import divya from '../assets/Images/divya.png'
import rohan from '../assets/Images/rohan.png'


const AboutPage = () => {
  return (
    <><NavBar />

<div className="card-container container justify-content-center">
        <div className="card d-flex flex-column m-2">  
            <div className='imgContainer'>
              <a href='mailto:divya.tambat@joshsoftware.com?Subject=Query%20related%20to%20EVENTFUL'>   
              <img src={divya}/> 
              </a>
            </div>
            <div className="content"> 
              <h2 className='names'>Divya Tambat</h2>
              <p>Front End Developer (React)</p>
            </div>
        </div>

        <div className="card d-flex flex-column m-2">  
            <div className='imgContainer'>
            <a href='mailto:rohan.dhalpe@joshsoftware.com?Subject=Query%20related%20to%20EVENTFUL'>   
                <img src={rohan}/> </a>
            </div>
            <div className="content">  
              <h2 className='names'>Rohan Dhalpe</h2>
                <p>Backend Developer (ROR)</p>
            </div>
        </div>
    </div>

    <Footer />
    </>
  );
};

export default AboutPage;

import Footer from "./Footer";
import HoverCards from "./HoverCards";
import NavBar from "./Navbar";
import Slideshow from "./SlideShow";

const Home = () => {

    return( 
    <div className="page"> 
        <NavBar />
        <Slideshow />
        <HoverCards />
        <Footer />
    </div>)
}
export default Home;
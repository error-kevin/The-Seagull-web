import React,{useEffect} from 'react';
import './About.css';
import Carousel from 'react-multi-carousel';
import { imageData, responsive } from "./About-Data";
import 'react-multi-carousel/lib/styles.css';
import inditechlogo from '../../assets/Core/logo.png'
import ourmission from '../../assets/About/1.jfif'


const About = () => {
  useEffect(() => {
    document.title = 'About | Inditech.in';
  }, []);

  const images = imageData.map((item) => (
    <div className='about2-card'>
      <img className="about2-product-image" src={item.imageurl} alt="" />
    </div>
  ));

  return (
    <div className='about2-main'>
      <div className='about2-header-container'>
        <img className="about2-logo-image" alt='logo' src={inditechlogo} />
        <h1 className='about2-hero-text'>Where Innovation Meets Ingenuity!</h1>
      </div>
      <br/>
      {/* <div className='about2-core'>
            <div className="about2-Carousel">
              <Carousel showDots={false} responsive={responsive} autoPlay={true} autoPlaySpeed={3000} infinite={true}>
                {images}
              </Carousel>
            </div>
      </div> */}
      <div className='about2-bottom'>
        <div className='about2-horizontal-card'>
          <div className='about2-span'>
            <h1>Our Mission</h1>
            <p>
              At Inditech, our mission is to transform businesses by providing innovative and customized technology solutions that enhance efficiency, productivity, and growth. We are committed to delivering excellence through our comprehensive range of services, including software development, IT consulting, and digital transformation strategies. By leveraging cutting-edge technologies and industry best practices, we empower our clients to navigate the complexities of the digital landscape and achieve their strategic goals. Our dedication to understanding and addressing the unique needs of each client ensures that we deliver solutions that drive success and foster long-term partnerships.
                
            </p>
          </div>
          <img className='about2-img' src={ourmission} alt=''/>
        </div>
        <div className='about2-horizontal-card about2-horizontal-card-left'>
          <div className='about2-span'>
            <h1>What We Do?</h1>
            <p>
              At Inditech, we offer a comprehensive suite of technology solutions designed to meet the diverse needs of businesses in today's fast-paced digital world. Our core services include custom software development, IT consulting, and digital transformation strategies. We specialize in creating tailored software solutions that streamline operations and enhance productivity. Our expert IT consultants provide strategic guidance to help organizations optimize their technology investments and align IT initiatives with business objectives. Additionally, we lead digital transformation projects that modernize legacy systems, integrate cutting-edge technologies, and drive innovation. With a focus on delivering high-quality results, Inditech is committed to helping your business achieve sustainable growth and competitive advantage.
            </p>
          </div>
          <img className='about2-img' src={ourmission} alt=''/>
        </div>
        
        <div className='about2-horizontal-card about2-horizontal-card-flex'>
          <div className='about2-span about2-span2'>
            <h1>How We Work</h1>
            <p>
              At Inditech, our approach is centered around collaboration, innovation, and excellence. We begin by deeply understanding the unique challenges and goals of each client through thorough consultations and needs assessments. Our team of experts then crafts tailored solutions that leverage the latest technologies and industry best practices. We follow a transparent and agile development process, ensuring continuous communication and flexibility to adapt to evolving requirements. Throughout each project, we maintain a strong focus on quality, rigorously testing and refining our solutions to meet the highest standards. Post-deployment, we provide ongoing support and optimization to ensure long-term success. By working closely with our clients at every step, we deliver impactful technology solutions that drive efficiency, productivity, and growth.
            </p>
          </div>
          <img className='about2-img' src={ourmission} alt=''/>
        </div>
      </div>
    </div>
  )
}

export default About






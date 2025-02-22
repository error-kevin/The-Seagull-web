// ContactUs.js
import './Contact.css'
import React from 'react';
import { faInstagram,faFacebook,faDiscord,faTwitter,faReddit,faAndroid, faLinkedin } from '@fortawesome/free-brands-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMailBulk } from '@fortawesome/free-solid-svg-icons';

function ContactUs() {
  

  return (
    <div className='contact-main'>
      <h1 className='contact-heading'>Contact Us</h1>
      <div className='contact-gps'>
        <iframe className='contact-map'
          title='gps'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.3342980405405!2d76.60537699999999!3d30.680869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fe5b795735cfd%3A0xb287b4430b6720fb!2sChandigarh%20Group%20of%20Colleges%20Jhanjeri%20Mohali!5e0!3m2!1sen!2sin!4v1708253446156!5m2!1sen!2sin" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
        />
        <div className='contact-gps-text'>
          <h1 className='contact-gps-heading'>CHANDIGARH GROUP OF COLLEGES <br/> JHANJERI CAMPUS</h1>
          <p className='contact-gps-address'>State Highway 12A Jhanjeri, Sahibzada Ajit Singh Nagar, Punjab 140307</p>
     <p>Contact Number</p>
     <p><a href="tel:18002740444" >18002740444</a> (Toll free)</p>
     <p><a href="tel:+91-01723505300" >+91-01723505300</a> (General Helpline No.)</p>
     <p><a href="tel:18002740444" >+91-01723505300</a> (Admission Helpline No.)</p>
     
       {/* <button className='contact-cgc-web-btn'><a href="https://www.cgc.ac.in/" target='_blank'>CGCJ-Website</a></button> */}
       <div className="contact-us-icons-cgc">
  <a href="https://www.instagram.com/cgcjhanjeri/" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon className="contact-us-social-media-icons" icon={faInstagram} />
  </a>
  {/* Render Font Awesome icon */}

  <a href="https://www.facebook.com/CollegesJhanjeri" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon className="contact-us-social-media-icons" icon={faFacebook} />
  </a>
  {/* Render Font Awesome icon */}

  <a href="https://www.linkedincom/school/cgc-jhanjeri/" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon className="contact-us-social-media-icons" icon={faLinkedin} />
  </a>
  {/* Render Font Awesome icon */}

  <a href="https://twitter.com/cgcjhanjeri" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon className="contact-us-social-media-icons" icon={faTwitter} />
  </a>
  {/* Render Font Awesome icon */}

  <a href="mailto:info@cgc.ac.in">
    <FontAwesomeIcon className="contact-us-social-media-icons" icon={faEnvelope} />
  </a>
  {/* Render Font Awesome icon */}
</div>

        </div>
      </div>
    </div>
  );
}

export default ContactUs;

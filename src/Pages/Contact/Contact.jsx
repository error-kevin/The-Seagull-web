// ContactUs.js
import './Contact.css'
import React from 'react';
import { socialMedia,socialMediaData} from '../../components/SocialMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



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
          <h1 className='contact-gps-heading'>HEADQUARTERS <br/> CGC JHANJERI</h1>
          <p className='contact-gps-address'>State Highway 12A Jhanjeri, Sahibzada Ajit Singh Nagar, Punjab 140307</p>
          <div className="contact-us-icons-cgc">
            {Object.entries(socialMedia).map(([platform, link], index) => {
              const socialMediaIcon = socialMediaData[platform];
              return (
                  <a key={index} href={link} target='_blank' rel="noopener noreferrer" >
                      <FontAwesomeIcon className="logos" icon={socialMediaIcon} />
                  </a>
              );
            })}


          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactUs;

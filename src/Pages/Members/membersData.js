// membersData.js
import karan from  '../../assets/Team images/Karan.jpg'
import signature from '../../assets/icons8/icons8-signature-50.png'
import pragyansh from "../../assets/Team images/profile.jpg"

import { faHtml5, faCss3Alt, faJs,faReact,faPython,faAws,faNodeJs, faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons'; 
import { faInstagram,faFacebook,faDiscord,faTwitter,faReddit } from '@fortawesome/free-brands-svg-icons'; 
import { faEnvelope ,faGlobe} from '@fortawesome/free-solid-svg-icons';

export const skillsData = [
    { name: "HTML", icon: faHtml5 },
    { name: "CSS", icon: faCss3Alt },
    { name: "JavaScript", icon: faJs },
    { name: "React", icon: faReact },
    { name: "Python", icon: faPython },
    { name: "Aws", icon: faAws },
    { name: "NodeJs", icon: faNodeJs },
    
    
];
export const socialMediaData = {
    "facebook": faFacebook,
    "twitter": faTwitter,
    "instagram": faInstagram,
    "discord":faDiscord,
    "reddit": faReddit,
    "linkedin":faLinkedin,
    "github":faGithub,
    "email":faEnvelope,
    "website":faGlobe

};



const membersData = [
    {
        name: "Karan Agarwal",
        role: "Founder",
        description: `A versatile individual with a passion for coding, gaming, and entrepreneurship. Whether I'm crafting lines of code, exploring virtual worlds, or chasing innovative ideas, I thrive on creative challenges and strategic thinking. Tech, health, and fitness are integral to my lifestyle.`,
        imageUrl: karan,
        signatureUrl:signature,
        socialMedia: {
            github:"lalallal",
            linkedin:"https://www.linkedin.com/in/karan-agrawal-977746232/",
            instagram: "https://www.instagram.com/?hl=en",
            facebook: "https://www.facebook.com/",
            twitter:"https://twitter.com/karann__25",
            email:"mailto:karan25.pvt@gmail.com",
            website:"https://www.kk25@gmail.com"
            
        },
        skills: ["JavaScript","HTML","NodeJs","Aws","Python","React","CSS"],
        
        
    },
];

export default membersData;

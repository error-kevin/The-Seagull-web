// membersData.js
import karan from  '../../assets/Team images/Karan.jpg'

import { faHtml5, faCss3Alt, faJs,faReact,faPython,faAws,faNodeJs, faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons'; 
import { faInstagram,faFacebook,faDiscord,faTwitter,faReddit,faAndroid } from '@fortawesome/free-brands-svg-icons'; 
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const skillsData = [
    { name: "HTML", icon: faHtml5 },
    { name: "CSS", icon: faCss3Alt },
    { name: "JavaScript", icon: faJs },
    { name: "React", icon: faReact },
    { name: "Python", icon: faPython },
    { name: "Aws", icon: faAws },
    { name: "NodeJs", icon: faNodeJs },
    { name:"Android", icon:faAndroid },
    
    
];
export const socialMediaData = {
    "facebook": faFacebook,
    "twitter": faTwitter,
    "instagram": faInstagram,
    "discord":faDiscord,
    "reddit": faReddit,
    "linkedin":faLinkedin,
    "github":faGithub,
    "email":faEnvelope

};



const membersData = [
    {
        name: "Karan Kumar Agrawal",
        role: "Lead Developer",
        description: `A versatile individual with a passion for coding, gaming, and entrepreneurship. Whether I'm crafting lines of code, exploring virtual worlds, or chasing innovative ideas, I thrive on creative challenges and strategic thinking. Tech, health, and fitness are integral to my lifestyle.`,
        imageUrl: karan,
        socialMedia: {
            instagram: "https://www.instagram.com/official.kxran/",
            linkedin:"https://www.linkedin.com/in/karan-agrawal-977746232/",
            twitter:"https://twitter.com/karann__25",
            github:"https://github.com/KDrop25",
            email:"mailto:karan25.pvt@gmail.com"
        },
        skills: ["JavaScript","HTML","NodeJs","Aws","Python","React","CSS"],
        
        
    },
    
    

];

export default membersData;

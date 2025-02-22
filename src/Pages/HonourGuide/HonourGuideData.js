import {
  faInstagram,
  faFacebook,
  faDiscord,
  faTwitter,
  faReddit,
  faAndroid,
  faJava,
  faJira,
  faNpm,
  faRust,
  faPhp,
} from "@fortawesome/free-brands-svg-icons";

import director from "../../assets/Team images/director_sviit.png";
import mentor from "../../assets/Team images/mentor_gdg.png";

import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faPython,
  faAws,
  faNodeJs,
  faLinkedin,
  faGit,
  faDocker,
  faGithub,
  faFigma,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const skillsData = [
  { name: "HTML", icon: faHtml5 },
  { name: "CSS", icon: faCss3Alt },
  { name: "JavaScript", icon: faJs },
  { name: "React.js", icon: faReact },
  { name: "Python", icon: faPython },
  { name: "AWS", icon: faAws },
  { name: "Node.js", icon: faNodeJs },
  { name: "Android", icon: faAndroid },
  { name: "Figma", icon: faFigma }, // Figma for design
  { name: "Git", icon: faGit }, // Version control
  { name: "Docker", icon: faDocker }, // For containerization
  { name: "Java", icon: faJava },
  { name: "Jira", icon: faJira },
  { name: "Github", icon: faGithub },
  { name: "NPM", icon: faNpm },
  { name: "Rust", icon: faRust },
  { name: "PHP", icon: faPhp },

  // Add more skills as needed
];

export const socialMediaData = {
  facebook: faFacebook,
  twitter: faTwitter,
  instagram: faInstagram,
  discord: faDiscord,
  reddit: faReddit,
  linkedin: faLinkedin,
  github: faGithub,
  email: faEnvelope,
};

// const importAll = (r) => {
//   let images = {};
//   r.keys().forEach((item) => {
//     // Extract the file name without the extension
//     const fileName = item.replace("./", "").split(".")[0].replace("_", " "); // Replace underscores for matching
//     images[fileName] = r(item); // Assign the imported image to the file name
//   });
//   return images;
// };

// // Dynamically import images from the specified folder
// const images = importAll(
//   require.context("../../assets/Team images/", false, /\.(png|jpe?g|svg)$/)
// );

const membersData = [
  {
    name: "Dr. Anand Rajavat",
    role: "Director & Head CSE",
    role2: "Shri Vaishnav Institute of Information Technology (SVIIT)",
    imageUrl: director,
    description: `Dr. Anand Rajavat is the Director of Shri Vaishnav Institute of Information Technology (SVIIT), Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore. With over 19 years of academic and professional experience, he has significantly contributed to the field of computer science and engineering through exemplary teaching, research, and leadership.\n
Under his guidance, SVIIT has become a center of excellence, fostering innovation and preparing students to excel in the dynamic digital landscape while making meaningful contributions to society.`,
    socialMedia: {},
  },
  {
    name: "Mr.Virendra Dani",
    role: "Assistant Professor & Faculty Advisor",
    imageUrl: mentor,
    description: `Mr. Virendra Dani serves as an Assistant Professor and the Faculty Advisor for GDG On Campus SVVV at Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore. With a passion for technology and education, he plays a pivotal role in mentoring students and guiding them in their journey of innovation and technical excellence.\nAs a dedicated academician, Mr. Dani actively supports students in exploring cutting-edge technologies and fosters a collaborative environment that encourages growth, creativity, and impactful contributions to the tech community.`,
    socialMedia: {},
  },
];

export default membersData;

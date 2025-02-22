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

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    // Extract the file name without the extension
    const fileName = item.replace("./", "").split(".")[0].replace("_", " "); // Replace underscores for matching
    images[fileName] = r(item); // Assign the imported image to the file name
  });
  return images;
};

// Dynamically import images from the specified folder
const images = importAll(
  require.context("../../assets/Team images/", false, /\.(png|jpe?g|svg)$/)
);

const membersData = [
  {
    name: "Diya Verma",
    role: "Lead",
    imageUrl: images["Diya"],
    description: `Hi! I’m Diya Verma, blending creativity and technology as a digital artist and 2D animator. I’m passionate about tech innovation and love to bring a unique touch to community building and networking. Let’s make art and technology an inspiring combination!`,
    team_name: "",
    socialMedia: {
      linkedin: "https://www.linkedin.com/in/diya-verma-323665259/",
      instagram: "https://www.instagram.com/diya0ii/",
    },
    skills: ["React.js", "Git", "HTML", "CSS", "Figma", "Python"],
  },
  {
    name: "Yashraj Singh Sisodiya",
    role: "Cloud Head",
    imageUrl: images["Yashraj"],
    description: `Hello! I'm Yashraj Singh Sisodiya, a Computer Science Engineering student with a strong interest in DevOps and cloud computing. Experienced in CI/CD, Docker, Jenkins, and AWS, I'm eager to solve challenges and innovate.`,
    team_name: "Cloud",
    socialMedia: {},
    skills: ["AWS", "Docker", "Git", "Figma", "Python"],
  },
  {
    name: "Yashvardhan Sharma",
    role: "Web-Development Head",
    imageUrl: images["Yashvardhan"],
    description: `Hi! I’m Yashvardhan Sharma, a developer skilled in MERN, React Native, Next.js, and machine learning with Python. I'm also a powerlifter and former martial artist, always ready for new challenges!`,
    team_name: "Web Dev",
    socialMedia: {},
    skills: [
      "React.js",
      "Node.js",
      "AWS",
      "Docker",
      "Git",
      "HTML",
      "CSS",
      "Figma",
      "Python",
      "Android",
    ],
  },

  {
    name: "Anvisha Trivedi",
    role: "Content Head",
    imageUrl: images["Anvisha"],
    description: `Hello! I’m Anvisha Trivedi, a third-year Computer Science student at SVVV with a zest for learning. With a deep love for computer science, I’m always eager to take on new challenges and expand my knowledge in tech. I look forward to making a meaningful impact in this field.`,
    team_name: "Content",
    socialMedia: {},
    skills: ["AWS", "HTML", "CSS", "Python", "PHP", "Java"],
  },

  {
    name: "Kaustubh Joshi",
    role: "AI/ML Head",
    imageUrl: images["Kaustubh"],
    description: `I'm Kaustubh Joshi, a final-year CSE student passionate about AI and machine learning. I aim to become a high-paid AI developer and thrive in challenging situations by staying calm and patient. I enjoy singing and playing football in my free time.`,
    team_name: "AI/ML",
    socialMedia: {},
    skills: ["AI&ML", "HTML", "CSS", "Python", "Java", "Football", "Singing"],
  },
  {
    name: "Pratham Rathore",
    imageUrl: images["Pratham Rathore"],
    role: "Management Head",
    description: `Hello! I'm Pratham Rathore, a web developer passionate about building innovative web applications and exploring the latest technologies. I love discovering new music and continuously push myself to grow as a full-stack developer.`,
    team_name: "Management",
    socialMedia: {},
    skills: ["React.js", "Git", "HTML", "CSS", "Figma", "Java"],
  },
  {
    name: "Bhuvnesh Choudhary",
    role: "Media Head",
    imageUrl: images["Bhuvnesh"],
    description: `I am Bhuvnesh Choudhary, a Computer Science Engineering student with a background in competitive esports. My passion for technology and video editing allows me to create engaging content. I aspire to build a successful career in tech while actively contributing to the gaming community.`,
    team_name: "Media",
    socialMedia: {},
    skills: ["Angular.js", "HTML", "CSS", "Figma"],
  },
  {
    name: "Sarthak Shahane",
    role: "Graphic Head",
    imageUrl: images["Sarthak"],
    description: `I am Sarthak Shahane, a B.Tech third-year student pursuing Computer Science. I have a passion for creating seamless content and graphics. Alongside my love for sports and video games, my goal is to secure a position in a first-tier multinational corporation while solving real-life problems.`,
    team_name: "Graphics",
    socialMedia: {},
    skills: ["Git", "HTML", "CSS", "Figma", "Python", "Java", "Android"],
  },

  {
    name: "Kripansh Kumrawat",
    role: "Cloud Team",
    imageUrl: images["Kripansh"],
    description: `Hello! I’m Kripansh Kumrawat, a straightforward person who enjoys approaching problems in unique, sometimes complex ways. My journey is all about exploring and challenging conventional methods, and I’m always open to discovering new ideas and solutions.`,
    team_name: "Cloud",
    socialMedia: {},
    skills: ["Docker", "Python", "Java"],
  },
  {
    name: "Pratham Soni",
    imageUrl: images["Pratham Soni"],
    role: "Cloud Team",
    description: `Greetings! I'm Pratham Soni from Indore, a pre-final year Engineering student at SVVV. I'm a Java Developer with a keen interest in AWS and always looking to improve my skills for innovative projects.`,
    team_name: "Cloud",
    socialMedia: {},
    skills: [
      "React.js",
      "AWS",
      "Docker",
      "Git",
      "HTML",
      "CSS",
      "Java",
      "Jira",
      "TensorFlow",
    ],
  },
  {
    name: "Tushar Gour",
    role: "Flutter Head",
    imageUrl: images["Tushar"],
    description: `Hi! I'm Tushar Gour, a 3rd-year CSE student with a passion for mobile app development and creating innovative solutions. I enjoy working on personal projects, competitive programming, and gaming, all while striving to become a proficient software developer.`,
    team_name: "Flutter",
    socialMedia: {},
    skills: [
      "React.js",
      "Node.js",
      "Git",
      "HTML",
      "CSS",
      "Figma",
      "NPM",
      "Android",
    ],
  },
  {
    name: "Karan Kumar Agrawal",
    imageUrl: images["Karan"],
    role: "Web-Development Team",
    description: `I'm Karan Kumar Agrawal, a B.Tech AI/ML student and founder of Inditech, focused on innovative tech solutions. As a full-stack developer, I'm passionate about building impactful projects!`,
    team_name: "Web Dev",
    socialMedia: {
      instagram: "https://www.instagram.com/karan.inditech/",
      linkedin: "https://www.linkedin.com/in/karan-agrawal-977746232/",
      twitter: "https://twitter.com/karann__25",
      github: "https://github.com/KDrop25",
      email: "mailto:karan25.pvt@gmail.com",
    },
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Node.js",
      // "MongoDB",
      "Github",
      "AWS",
      "Docker",
    ],
  },
  {
    name: "Devika Bhange",
    imageUrl: images["Devika"],
    role: "Management Team",
    description: `Hello, I'm Devika Bhange, a B.Tech student specializing in Information Security and Cybersecurity. I am passionate about leadership, public speaking, and organizing events. With diverse skills like yoga, skating, and Kathak, I aim to make a positive impact in cybersecurity.`,
    team_name: "Management",
    socialMedia: {},
    skills: ["Cybersecurity", "Public Speaking", "Leadership"],
  },
  {
    name: "Harshwardhan Jadon",
    imageUrl: images["Harshwardhan"],
    role: "Management Team",
    description: `Hello! I'm Harsh Wardhan Singh Jadho, a Computer Science Engineering student focused on Big Data and Cloud Engineering. I'm passionate about data science and eager to make meaningful strides in technology.`,
    team_name: "Management",
    socialMedia: {},
    skills: ["AWS", "Git", "HTML", "Python", "Java"],
  },
  {
    name: "Himanshi Laddha",
    imageUrl: images["Himanshi"],
    role: "Graphic Team",
    description: `Hey there! I’m Himanshi Laddha, a designer who loves transforming creative ideas into user-friendly designs. When I'm not designing, you can find me coding, dancing, or capturing beautiful moments. I believe that creativity and tech can go hand-in-hand, and I’m here to make that happen.`,
    team_name: "Graphics",
    socialMedia: {},
    skills: ["Git", "HTML", "CSS", "Figma", "CSS"],
  },
  {
    name: "Urvashi Sharma",
    imageUrl: images["Urvashi"],
    role: "Graphic Team",
    description: `Hello! I’m Urvashi Sharma, a second-year Computer Science and Engineering student passionate about coding, problem-solving, and creativity. I enjoy exploring various domains in tech, from development to design, and am always up for new challenges that push my boundaries.`,
    team_name: "Graphics",
    socialMedia: {},
    skills: ["HTML", "CSS", "Figma", "Python", "Java"],
  },
  {
    name: "Vanshika Jadhav",
    imageUrl: images["Vanshika"],
    role: "Graphic Team",
    description: `Hi there! I’m Vanshika Jadhav, a second-year B.Tech CSE student and a proud GDG club member, contributing as a graphic designer. I’m passionate about learning new languages, enhancing my DSA skills, and creating unique graphic designs. Let’s create something extraordinary together!`,
    team_name: "Graphics",
    socialMedia: {},
    skills: ["HTML", "CSS", "Python"],
  },
  {
    name: "Aniket Vishwakarma",
    imageUrl: images["Aniket"],
    role: "Media Team",
    description: `Hi! I’m Aniket Vishwakarma, currently a second-year B.Tech student. With an interest in tech and a drive for learning, I’m excited to grow my skills and make valuable contributions to our tech community.`,
    team_name: "Media",
    socialMedia: {},
    skills: ["HTML", "CSS", "Figma"],
  },

  {
    name: "Mahi Chourasiya",
    imageUrl: images["Mahi"],
    role: "Content Team",
    description: `I'm Mahi Chourasiya, a B.Tech second-year student passionate about coding and content writing. Skilled in C/C++, Python, and Django, I'm eager to learn and grow. I love blending creativity with tech insights and exploring new ideas to make an impact.`,
    team_name: "Content",
    socialMedia: {},
    skills: ["Python"],
  },
  {
    name: "Tanish Pradhan",
    imageUrl: images["Tanish"],
    role: "Lead (2021-2022)",
    description: `Hi! I’m Tanish Pradhan, the GDG on-campus lead from 2021 to 2022. Passionate about technology and leadership, I aimed to build a collaborative and innovative community during my tenure. Known for my strategic thinking and enthusiasm, I strived to foster growth and development within the chapter.`,
    team_name: "Legacy",
    socialMedia: {
      linkedin:
        "https://www.linkedin.com/in/tanish-pradhan/?originalSubdomain=in",
    },
    skills: [],
  },

  {
    name: "Sneha Gupta",
    imageUrl: images["Sneha"],
    role: "Lead (2022-2023)",
    description: `Hi! I’m Sneha Yadav, the GDG on-campus lead from 2022 to 2023. I focused on empowering students with technology, encouraging active participation in tech events, and fostering a welcoming community for enthusiasts. I love exploring innovative solutions and guiding my peers towards success.`,
    team_name: "Legacy",
    socialMedia: {
      linkedin: "https://www.linkedin.com/in/sneha-yadav-02909021b/",
    },
    skills: [],
  },

  {
    name: "Dishika Talreja",
    imageUrl: images["Dishika"],
    role: "Lead (2023-2024)",
    description: `Hi! I’m Dishika Talreja, the GDG on-campus lead from 2023 to 2024. With a passion for innovation and collaboration, I dedicated my efforts to building a vibrant tech community. My tenure was focused on organizing impactful events, fostering talent, and creating a platform for learning and growth.`,
    team_name: "Legacy",
    socialMedia: {
      linkedin: "https://www.linkedin.com/in/dishika-talreja/",
    },
    skills: [],
  },
  {
    name: "Darsh Pareek",
    role: "AI/ML Team",
    imageUrl: images["Darsh"],
    description: `Hey there! I’m Darsh Pareek, a tech enthusiast passionate about programming and machine learning. I love exploring new tech, solving problems, and game development. If there’s a tech puzzle to crack, count me in!`,
    team_name: "AI/ML",
    socialMedia: {},
    skills: [
      "Node.js",
      "Docker",
      "Git",
      "HTML",
      "CSS",
      "Python",

      "NPM",
      "Rust",
      "TensorFlow",
    ],
  },
];

export default membersData;

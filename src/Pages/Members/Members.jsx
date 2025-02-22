// Members.js

import React,{useEffect} from 'react';
import './Members.css';
import { skillsData ,socialMediaData} from './membersData';
import membersData from './membersData'; // Importing the members data
import sample from "../../assets/Team images/sampleimg.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Members = () => {
    useEffect(() => {
        document.title = 'Our Team | Inditech.in';
      }, []);
    return (
        <div className='members-main'>
            <div className='members-core'>
                <div className='members-heading'>
                    <h1 className='members-heading-text'>Team Members</h1>
                </div>
                <div className='members-cards-row'>
                    {membersData.slice(0,1).map((member, index) => (
                        <div className='members-front-founder' key={index}>
                            <img className='bgimg-founder' src={member.imageUrl || sample} alt="" />
                            <div className='members-card-founder-right'>
                                <div className='members-title-founder'>
                                    <div className='members-title-name-container'>
                                        <h1 className="name-founder">{member.name}</h1>
                                        <h2 className="role-founder">{member.role}</h2>
                                        
                                    </div>
                                    <div className="members-social-media-container">
                                            {Object.entries(member.socialMedia).map(([platform, link], index) => {
                                                const socialMediaIcon = socialMediaData[platform]; // Get the icon for the social media platform
                                                return (
                                                    <a key={index} href={link} target='_blank' rel="noopener noreferrer" >
                                                        <FontAwesomeIcon className="logos" icon={socialMediaIcon} /> {/* Render Font Awesome icon */}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    
                                    
                                </div>
                                <p className="back-description-founder">{member.description}</p>
                                <div className='members-founder-card-bottom'>
                                    <div className='members-founder-card-info-icons-container'>
                                        
                                        <div className='members-skills-container'>
                                            {member.skills.map((skillName, index) => {
                                                const skill = skillsData.find(skill => skill.name === skillName);
                                                return (
                                                    <div key={index} className='skill'>
                                                        <FontAwesomeIcon className= "logos" icon={skill.icon} /> {/* Render Font Awesome icon */}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                <div className='members-cards-row'>
                    {membersData.slice(1).map((member, index) => (
                        <div className='card-container' key={index}>
                            <div className='card'>
                                <div className='members-front'>
                                    <img className='bgimg' src={member.imageUrl || sample} alt="" />
                                    <div className='members-card-text'>
                                        <p className="member-name">{member.name}</p>
                                        <p className="member-role">{member.role}</p>
                                    </div>
                                </div>
                                <div className="back">
                                    <div className='members-back-title-container'>
                                        <h2 className='members-back-card-title'>About</h2>
                                        <p className="back-description">{member.description}</p>
                                    </div>
                                    <div className='members-back-bottom-container'>
                                        <div className='members-back-skills-container'>
                                            {member.skills.length > 0 && (
                                                <h2 className='members-card-bottom-h2'>Skills</h2>
                                            )}
                                            <div className='members-skills-container'>
                                                {member.skills.map((skillName, index) => {
                                                    const skill = skillsData.find(skill => skill.name === skillName);
                                                    return (
                                                        <div key={index} className='skill'>
                                                            <FontAwesomeIcon className= "logos" icon={skill.icon} /> {/* Render Font Awesome icon */}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className='members-back-socials-container'>
                                            {Object.keys(member.socialMedia).length > 0 && (
                                                <h2 className='members-card-bottom-h2'>Follow</h2>
                                            )}
                                            <div className="members-social-media-container">
                                                {Object.entries(member.socialMedia).map(([platform, link], index) => {
                                                    const socialMediaIcon = socialMediaData[platform]; // Get the icon for the social media platform
                                                    return (
                                                        <a key={index} href={link} target='_blank' rel="noopener noreferrer" >
                                                            <FontAwesomeIcon className="logos" icon={socialMediaIcon} /> {/* Render Font Awesome icon */}
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Members;

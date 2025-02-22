// Members.js

import React from 'react';
import './Devs.css';
import { skillsData ,socialMediaData} from './DevsData';
import membersData from './DevsData'; // Importing the devs data
import sample from "../../assets/Team images/sampleimg.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Devs = () => {
    return (
        <div className='devs-main'>
            <div className='devs-core'>
                <div className='devs-heading'>
                    <h1 className='devs-heading-text'>Core Developers</h1>
                </div>
                <div className='devs-cards-row'>
                    {membersData.slice(0,1).map((member, index) => (
                        <div className='devs-front-founder' key={index}>
                            <img className='devs-bgimg-founder' src={member.imageUrl || sample} alt="" />
                            <div className='devs-card-founder-right'>
                                <div className='devs-title-founder'>
                                    <div className='devs-title-name-container'>
                                        <h1 className="devs-name-founder">{member.name}</h1>
                                        <h2 className="devs-role-founder">{member.role}</h2>
                                        
                                    </div>
                                    <div className="devs-social-media-container">
                                            {Object.entries(member.socialMedia).map(([platform, link], index) => {
                                                const socialMediaIcon = socialMediaData[platform]; // Get the icon for the social media platform
                                                return (
                                                    <a key={index} href={link} target='_blank' rel="noopener noreferrer" >
                                                        <FontAwesomeIcon className="devs-logos" icon={socialMediaIcon} /> {/* Render Font Awesome icon */}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    
                                    
                                </div>
                                <p className="devs-back-description-founder">{member.description}</p>
                                <div className='devs-founder-card-bottom'>
                                    <div className='devs-founder-card-info-icons-container'>
                                        
                                        <div className='devs-skills-container'>
                                            {member.skills.map((skillName, index) => {
                                                const skill = skillsData.find(skill => skill.name === skillName);
                                                return (
                                                    <div key={index} className='devs-skill'>
                                                        <FontAwesomeIcon className= "devs-logos" icon={skill.icon} /> {/* Render Font Awesome icon */}
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
                <div className='devs-cards-row'>
                    {membersData.slice(1).map((member, index) => (
                        <div className='devs-card-container' key={index}>
                            <div className='devs-card'>
                                <div className='devs-front'>
                                    <img className='devs-bgimg' src={member.imageUrl || sample} alt="" />
                                    <div className='devs-card-text'>
                                    <p className="devs-name">{member.name}</p>
                                    <h2 className="devs-role">{member.role}</h2>
                                </div>
                                </div>
                                <div className="devs-back">
                                    <div className='devs-back-title-container'>
                                        <h2 className='devs-back-card-title'>About</h2>
                                        <p className="devs-back-description">{member.description}</p>
                                    </div>
                                    <div className='devs-back-bottom-container'>
                                        <div className='devs-back-skills-container'>
                                            {member.skills.length > 0 && (
                                                <h2 className='devs-card-bottom-h2'>Skills</h2>
                                            )}
                                            <div className='devs-skills-container'>
                                                {member.skills.map((skillName, index) => {
                                                    const skill = skillsData.find(skill => skill.name === skillName);
                                                    return (
                                                        <div key={index} className='devs-skill'>
                                                            <FontAwesomeIcon className= "devs-logos" icon={skill.icon} /> {/* Render Font Awesome icon */}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className='devs-back-socials-container'>
                                            {Object.keys(member.socialMedia).length > 0 && (
                                                <h2 className='devs-card-bottom-h2'>Follow</h2>
                                            )}
                                            <div className="devs-social-media-container">
                                                {Object.entries(member.socialMedia).map(([platform, link], index) => {
                                                    const socialMediaIcon = socialMediaData[platform]; // Get the icon for the social media platform
                                                    return (
                                                        <a key={index} href={link} target='_blank' rel="noopener noreferrer" >
                                                            <FontAwesomeIcon className="devs-logos" icon={socialMediaIcon} /> {/* Render Font Awesome icon */}
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

export default Devs;

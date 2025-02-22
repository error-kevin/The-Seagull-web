// Members.js

import React from "react";
import "./HonourGuide.css";
import { skillsData, eventData, socialMediaData } from "./HonourGuideData";
import membersData from "./HonourGuideData"; // Importing the members data
import sample from "../../assets/Team images/sampleimg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Members = () => {
  const uniqueTeamNames = [
    ...new Set(membersData.map((member) => member.team_name)),
  ];
  return (
    <div className="honour-main">
      <div className="honour-core">
        <div className="honour-heading">
          <h1 className="honour-heading-text">Our Leadership</h1>
        </div>
        <div className="honour-cards-row" id="honour-row-founder">
          {membersData.map((member, index) => (
            <div className="honour-front-founder" key={index}>
              <img
                className="honour-bgimg-founder"
                src={member.imageUrl || sample}
                alt=""
              />
              <div className="honour-card-founder-right">
                <div className="honour-title-founder">
                  <div className="honour-title-name-container">
                    <h1 className="honour-name-founder">{member.name}</h1>
                    <h2 className="honour-role-founder">{member.role}</h2>
                    {member.role2 && (
                      <h4 className="honour-role-founder" id="role2">
                        {member.role2}
                      </h4>
                    )}
                  </div>
                  <p className="back-description-founder">
                    {member.description}
                  </p>
                  <div className="honour-social-media-container">
                    {Object.entries(member.socialMedia).map(
                      ([platform, link], index) => {
                        const socialMediaIcon = socialMediaData[platform]; // Get the icon for the social media platform
                        return (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon
                              className="logos"
                              icon={socialMediaIcon}
                            />{" "}
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>
                {/* <div className="honour-founder-card-bottom">
                  <div className="honour-founder-card-info-icons-container">
                    {(() => {
                      // Separate skills into two groups: those with icons and those without
                      const skillsWithIcons = member.skills.filter(
                        (skillName) => {
                          const skill = skillsData.find(
                            (skill) => skill.name === skillName
                          );
                          return skill && skill.icon;
                        }
                      );

                      const skillsWithoutIcons = member.skills.filter(
                        (skillName) => {
                          const skill = skillsData.find(
                            (skill) => skill.name === skillName
                          );
                          return !skill || !skill.icon;
                        }
                      );

                      return (
                        <div className="honour-skills-container">
                          {skillsWithIcons.map((skillName, skillIndex) => {
                            const skill = skillsData.find(
                              (skill) => skill.name === skillName
                            );
                            return (
                              <div key={skillIndex} className="skill">
                                <FontAwesomeIcon
                                  className="logos"
                                  icon={skill.icon} // Render Font Awesome icon
                                />
                              </div>
                            );
                          })}

                          {skillsWithoutIcons.length > 0 && (
                            <div className="skills-container">
                              {skillsWithoutIcons.map(
                                (skillName, skillIndex) => (
                                  <div key={skillIndex} className="skill">
                                    <span>{skillName}</span>
                                    {skillIndex !==
                                    skillsWithoutIcons.length - 1
                                      ? ", "
                                      : null}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;

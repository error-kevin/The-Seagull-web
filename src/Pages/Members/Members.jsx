// Members.js

import React from "react";
import "./Members.css";
import { skillsData, eventData, socialMediaData } from "./membersData";
import membersData from "./membersData"; // Importing the members data
import sample from "../../assets/Team images/sampleimg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Members = () => {
  const uniqueTeamNames = [
    ...new Set(membersData.map((member) => member.team_name)),
  ];
  return (
    <div className="members-main">
      <div className="members-core">
        {/* <div className="members-heading">
          <h1 className="members-heading-text">Team Members</h1>
        </div> */}
        <div className="members-cards-row" id="members-row-founder">
          {membersData.slice(0, 1).map((member, index) => (
            <div className="members-front-founder" key={index}>
              <img
                className="bgimg-founder"
                src={member.imageUrl || sample}
                alt=""
              />
              <div className="members-card-founder-right">
                <div className="members-title-founder">
                  <div className="members-title-name-container">
                    <h1 className="name-founder">{member.name}</h1>
                    <h2 className="role-founder">{member.role}</h2>
                  </div>
                  <p className="back-description">{member.description}</p>
                  <div className="members-social-media-container">
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
                            {/* Render Font Awesome icon */}
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>
                {/* <p className="back-description-founder">{member.description}</p> */}
                <div className="members-founder-card-bottom">
                  <div className="members-founder-card-info-icons-container">
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
                        <div className="members-skills-container">
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
                </div>
              </div>
            </div>
          ))}
        </div>
        {uniqueTeamNames.map((teamName, teamIndex) => (
          <React.Fragment key={teamIndex}>
            <div className="members-heading">
              <h1 className="members-heading-text">{teamName}</h1>
            </div>
            <div className="members-cards-row">
              {membersData
                .slice(1)
                .filter((member) => member.team_name === teamName)
                .map((member, memberIndex) => (
                  <div className="card-container" key={memberIndex}>
                    <div className="card">
                      <div className="members-front">
                        <img
                          className="bgimg"
                          src={member.imageUrl || sample} // Display image
                          alt={member.name}
                        />
                        <div className="members-card-text">
                          <h2 className="name">{member.name}</h2>
                          <p className="role">{member.role}</p>
                        </div>
                      </div>
                      <div className="back">
                        <div className="members-back-title-container">
                          <h2 className="members-back-card-title">About</h2>
                          <p className="back-description">
                            {member.description}
                          </p>
                        </div>
                        <div className="members-back-bottom-container">
                          {/* Skills section */}
                          {member.skills.length > 0 && (
                            <div className="members-back-skills-container">
                              <h2 className="members-card-bottom-h2">Skills</h2>

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
                                  <div className="members-skills-container">
                                    {skillsWithIcons.length > 0 && (
                                      <div className="skills-container">
                                        {skillsWithIcons.map(
                                          (skillName, skillIndex) => {
                                            const skill = skillsData.find(
                                              (skill) =>
                                                skill.name === skillName
                                            );
                                            return (
                                              <div
                                                key={skillIndex}
                                                className="skill"
                                              >
                                                <FontAwesomeIcon
                                                  className="logos"
                                                  icon={skill.icon} // Render Font Awesome icon
                                                />
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    )}

                                    {/* Render skills without icons */}
                                    {skillsWithoutIcons.length > 0 && (
                                      <div className="skills-container">
                                        {skillsWithoutIcons.map(
                                          (skillName, skillIndex) => (
                                            <div
                                              key={skillIndex}
                                              className="skill"
                                            >
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
                          )}
                          {/* Social media section */}
                          {Object.keys(member.socialMedia).length > 0 && (
                            <div className="members-back-socials-container">
                              <h2 className="members-card-bottom-h2">Follow</h2>
                              <div className="members-social-media-container">
                                {Object.entries(member.socialMedia).map(
                                  ([platform, link], socialIndex) => {
                                    const socialMediaIcon =
                                      socialMediaData[platform]; // Get icon
                                    return (
                                      <a
                                        key={socialIndex}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <FontAwesomeIcon
                                          className="logos"
                                          icon={socialMediaIcon} // Render Font Awesome icon
                                        />
                                      </a>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Members;

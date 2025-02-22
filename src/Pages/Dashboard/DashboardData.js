import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
// import { faHtml5, faCss3Alt, faJs,faReact,faPython,faAws,faNodeJs, faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons';
import {
  faChartSimple,
  faHouse,
  faPeopleGroup,
  faSatellite,
} from "@fortawesome/free-solid-svg-icons";

const USERS_URL = "/users";

export const nav_card_Data = [
  {
    name: "Home",
    icon: faHouse,
    btn: "home",
    roles: ["Developer"],
  },
  // {
  //   name: "Analytics",
  //   icon: faChartSimple,
  //   btn: "analytics",
  //   roles: ["Developer"],
  // },

  {
    name: "Users",
    icon: faPeopleGroup,
    btn: "users",
    roles: ["Developer", "Admin"],
  },
  // {
  //   name: "Participants",
  //   icon: faPeopleGroup,
  //   btn: "players",
  //   roles: ["Developer"],
  // },
  // {
  //   name: "Applications",
  //   icon: faPeopleGroup,
  //   btn: "applications",
  //   roles: ["Developer"],
  // },
  {
    name: "Events",
    icon: faPeopleGroup,
    btn: "events",
    roles: ["User"],
  },
  // {
  //   name: "Quiz Control",
  //   icon: faPeopleGroup,
  //   btn: "quiz",
  //   roles: ["User"],
  // },
];

export const hero_card_Data = [
  {
    name: "Home 2",
    icon: faHouse,
  },
  {
    name: "Analytics 2",
    icon: faChartSimple,
  },
  {
    name: "Social Media 2",
    icon: faSatellite,
  },
];

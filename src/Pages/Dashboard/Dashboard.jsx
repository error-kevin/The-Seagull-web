import React, { useState, useEffect, useRef } from "react";
import miragelogo from "../../assets/Core/gdglogo.png";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import axios from "../../api/axios";
import { nav_card_Data } from "./DashboardData";
import { BarChartComponent2, DonutChartComponent } from "./ChartsData";
import { storage } from "../../hooks/firebase";
import { io } from "socket.io-client";
import { WsBASE_URL } from "../../api/axios";
import {
  faCheckSquare,
  faCircleXmark,
  faUser,
  faPenToSquare,
  faCirclePlus,
  faCircleCheck,
  faArrowLeft,
  faClose,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import sample from "../../assets/Team images/sampleimg.png";
import { ROLES } from "../../App";
import DataWindow from "./Leaderboard";

const Dashboard = () => {
  const { auth } = useAuth();

  const [home, setHome] = useState(true);
  const [participantspage, setParticipantsPage] = useState(false);
  const [applicationspage, setApplicationsPage] = useState(false);
  const [userspage, setUsersPage] = useState(false);
  const [socialmediapage, setSocialMediaPage] = useState(false);
  const [analyticspage, setAnalyticsPage] = useState(false);
  const [infopage, setInfoPage] = useState(false);
  const [eventspage, setEventsPage] = useState(false);
  const [quizcontrolpage, setQuizControl] = useState(false);
  const [addnewrole, setAddNewRole] = useState(false);
  const [eventInfo, setEventInfo] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [eventname, setEventName] = useState("");
  const [eventtype, setEventType] = useState("normal");
  const [eventmode, setEventMode] = useState("virtual");
  const [eventdesc, setEventDesc] = useState("");
  const [eventsdesc, setEventSDesc] = useState("");
  const [newrole, setNewRole] = useState("");
  const [eventid, setEventId] = useState("");
  const [pfp, setpfp] = useState(null);
  const [pfpUrl, setpfpUrl] = useState(null);
  const [pfpLoading, setpfpLoading] = useState(false);
  const [sheetid, setSheetID] = useState("");
  const [sheetData, setSheetData] = useState([]);

  const [users, setUsers] = useState([]);
  const [infouser, setInfoUser] = useState([]);
  const [players, setPlayers] = useState([]);
  const [qplayers, setQPlayers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [events, setEvents] = useState([]);
  const [socket, setSocket] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [isFieldsLocked, setIsFieldsLocked] = useState({
    users: [],
    players: [],
  });
  const [eventTypeInput, setEventTypeInput] = useState(false); // Show/hide input field
  const [eventTypeInputValue, setEventTypeInputValue] = useState("");

  const USERS_URL = "/users";
  const PLAYERS_URL = "/players";
  const APPLICATION_URL = "/registration/application";
  const EVENTS_URL = "/events";

  const connectToSocket = () => {
    const data = {
      "user-name": auth.username,
      "user-role": "admin",
    };
    console.log(`Connecting to socket on ${WsBASE_URL}`);
    const newSocket = io(WsBASE_URL, {
      extraHeaders: data,
    });
    setSocket(newSocket);
    setIsConnected(true);

    // Listen for players list update
    newSocket.on("playersList", (data) => {
      console.log("playerslist recieved");
      setQPlayers(data);
    });

    return () => newSocket.close();
  };

  useEffect(() => {
    if (eventtype === "other") {
      setEventTypeInput(true); // Show input when 'other' is selected
    } else {
      setEventTypeInput(false); // Hide input for other selections
      setEventTypeInputValue(""); // Reset the input value when eventType changes
    }
  }, [eventtype]);

  const startquiz = () => {
    socket.emit("startQuiz");
  };

  const nextquestion = () => {
    socket.emit("nextQuestion");
  };

  const newWindowRef = useRef(null);
  const openDataWindow = () => {
    if (newWindowRef.current && !newWindowRef.current.closed) {
      // Focus the existing window if it's already open
      newWindowRef.current.focus();
      return; // Exit if the window is already open
    }

    // Create a new window
    newWindowRef.current = window.open("", "_blank", "width=400,height=300");

    // Set the title of the new window
    newWindowRef.current.document.title = "Data List";

    // Create a link element to include the CSS file
    const link = newWindowRef.current.document.createElement("link");
    link.rel = "stylesheet";
    link.href = "Dashboard.css"; // Path to your CSS file
    newWindowRef.current.document.head.appendChild(link); // Append link to the head

    // Create a div to mount the React component
    const newWindowContent = newWindowRef.current.document.createElement("div");
    newWindowRef.current.document.body.appendChild(newWindowContent);

    // Render the DataWindow component into the new window
    ReactDOM.render(<DataWindow dataList={qplayers} />, newWindowContent);
  };

  useEffect(() => {
    console.log(newWindowRef);

    if (newWindowRef.current && !newWindowRef.current.closed) {
      // Update the DataWindow content when qPlayers changes
      ReactDOM.render(
        <DataWindow dataList={qplayers} />,
        newWindowRef.current.document.body.firstChild
      );
    }
  }, [qplayers]);

  const handleHome = () => {
    setHome(true);
    setUsersPage(false);
    setParticipantsPage(false);
    setApplicationsPage(false);
    setSocialMediaPage(false);
    setAnalyticsPage(false);
    setEventsPage(false);
    setQuizControl(false);
    setInfoPage(false);
  };
  const handleSocialMedia = () => {
    setHome(false);
    setUsersPage(false);
    setParticipantsPage(false);
    setSocialMediaPage(true);
    setAnalyticsPage(false);
    setInfoPage(false);
    setQuizControl(false);
    setApplicationsPage(false);
    setEventsPage(false);
  };
  const handlePlayers = () => {
    setHome(false);
    setUsersPage(false);
    setParticipantsPage(true);
    setApplicationsPage(false);
    setSocialMediaPage(false);
    setQuizControl(false);
    setAnalyticsPage(false);
    setInfoPage(false);
    setEventsPage(false);
  };
  const handleUsersPage = () => {
    setHome(false);
    setParticipantsPage(false);
    setUsersPage(true);
    setSocialMediaPage(false);
    setApplicationsPage(false);
    setQuizControl(false);
    setAnalyticsPage(false);
    setInfoPage(false);
    setEventsPage(false);
  };
  const handleAnalyticsPage = () => {
    setHome(false);
    setParticipantsPage(false);
    setUsersPage(false);
    setSocialMediaPage(false);
    setApplicationsPage(false);
    setQuizControl(false);
    setAnalyticsPage(true);
    setInfoPage(false);
    setEventsPage(false);
  };
  const handleApplicationsPage = () => {
    setHome(false);
    setParticipantsPage(false);
    setUsersPage(false);
    setSocialMediaPage(false);
    setQuizControl(false);
    setApplicationsPage(true);
    setAnalyticsPage(false);
    setInfoPage(false);
    setEventsPage(false);
  };
  const handleInfoPage = () => {
    setHome(false);
    setParticipantsPage(false);
    setUsersPage(false);
    setSocialMediaPage(false);
    setAnalyticsPage(false);
    setApplicationsPage(false);
    setQuizControl(false);
    setInfoPage(true);
    setEventsPage(false);
  };
  const handleEventsPage = () => {
    setHome(false);
    setParticipantsPage(false);
    setUsersPage(false);
    setSocialMediaPage(false);
    setQuizControl(false);
    setAnalyticsPage(false);
    setApplicationsPage(false);
    setInfoPage(false);
    setEventsPage(true);
  };
  const handleQuizControlPage = () => {
    setHome(false);
    setParticipantsPage(false);
    setUsersPage(false);
    setSocialMediaPage(false);
    setAnalyticsPage(false);
    setApplicationsPage(false);
    setInfoPage(false);
    setEventsPage(false);
    setQuizControl(true);
  };

  const functionMapping = {
    home: handleHome,
    players: handlePlayers,
    users: handleUsersPage,
    social: handleSocialMedia,
    analytics: handleAnalyticsPage,
    applications: handleApplicationsPage,
    events: handleEventsPage,
    quiz: handleQuizControlPage,
  };

  const handlepfpChange = (e) => {
    if (e.target.files[0]) {
      setpfp(e.target.files[0]);
    }
  };

  useEffect(() => {
    console.log(eventmode);
    console.log(eventtype);
  }, [eventmode, eventtype]);

  const handlenewevent = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        name: eventname,
        desc: eventdesc,
        type: eventtype,
        mode: eventmode,
        sdesc: eventsdesc,
        logo: pfpUrl,
      };

      if (eventtype === "quiz") {
        requestBody.questions = quizQuestions;
      }

      if (eventtype === "other") {
        requestBody.type = eventTypeInputValue;
      }

      const response = await axios.post(`/events/`, requestBody);
      console.log(response);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Event Creation Failed");
      }
    }

    fetchEventData();
    setEventInfo(false);
    setEventName("");
    setEventType("normal");
    setEventMode("virtual");
    setEventDesc("");
    setEventSDesc("");
    setpfpUrl("");
    setpfp("");
  };

  const handledeleteevent = async (id) => {
    try {
      const response = await axios.delete(`/events/${id}`);
      console.log(response);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Event Creation Failed");
      }
    }
    fetchEventData();
  };

  const handleeventpfpUpload = () => {
    setpfpLoading(true);
    const uploadTask = storage.ref(`images/pfp/${pfp.name}`).put(pfp);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Error uploading image:", error);
      },
      () => {
        storage
          .ref("images/pfp")
          .child(pfp.name)
          .getDownloadURL()
          .then((url) => {
            setpfpUrl(url); // Save the image URL
            setpfpLoading(false);
          });
      }
    );
  };

  useEffect(() => {
    if (pfp) {
      handleeventpfpUpload();
    }
  }, [pfp]);

  const fetchUsersData = async () => {
    try {
      const response = await axios.get(USERS_URL);
      setUsers(response.data);
      setIsFieldsLocked((prev) => ({
        ...prev,
        users: Array(response.data.length).fill(true),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPlayersData = async () => {
    try {
      const response = await axios.get(PLAYERS_URL);
      setPlayers(response.data);
      setIsFieldsLocked((prev) => ({
        ...prev,
        players: Array(response.data.length).fill(true),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApplicationData = async () => {
    try {
      const response = await axios.get(APPLICATION_URL);
      setApplications(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEventData = async () => {
    try {
      const response = await axios.get(EVENTS_URL);
      setEvents(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplicationData();
    fetchEventData();
    fetchPlayersData();
    fetchUsersData();
  }, []);

  const handleToggleEditUser = (index) => {
    setIsFieldsLocked((prev) => {
      const newUserFieldsLocked = [...prev.users];
      newUserFieldsLocked[index] = !newUserFieldsLocked[index];
      return { ...prev, users: newUserFieldsLocked };
    });
  };
  const handleToggleDeleteUser = (index) => {};

  // const handleToggleEditPlayer = (index) => {
  //   setIsFieldsLocked((prev) => {
  //     const newPlayerFieldsLocked = [...prev.players];
  //     newPlayerFieldsLocked[index] = !newPlayerFieldsLocked[index];
  //     return { ...prev, players: newPlayerFieldsLocked };
  //   });
  // };

  const handleverification = async (id) => {
    try {
      const response = await axios.get(`/register/verify?id=${id}`);
      console.log(response.status);
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user._id === id) {
            return { ...user, verified: true };
          }
          return user;
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUserRemove = async (id) => {
    try {
      setUsers((prevUsers) => {
        return prevUsers.filter((user) => user._id !== id);
      });

      // Send a request to remove the user on the backend
      await axios.delete(`/users`, {
        data: { id: id },
      });

      console.log(`Removed user with ID ${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleRemove = async (role, id) => {
    try {
      // Update the user roles on the front end
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user._id === id) {
            const newRoles = { ...user.roles };
            delete newRoles[role];
            return { ...user, roles: newRoles };
          }
          return user;
        });
      });

      await axios.patch("/users/roles/remove", { id, role });

      console.log(`Removed role ${role} from user with ID ${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewRole = async (role, id) => {
    if (ROLES.includes(role)) {
      try {
        const response = await axios.put("/users/roles/add", { id, role });

        setUsers((prevUsers) => {
          return prevUsers.map((user) => {
            if (user._id === id) {
              const newRoles = { ...user.roles };
              newRoles[role] = true;
              console.log(newRoles);
              setNewRole("");
              setAddNewRole(false);
              return { ...user, roles: newRoles };
            }
            return user;
          });
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("denied");
    }
  };

  const handleInfoPlayer = async (user, index) => {
    console.log(user);
    console.log(index);
    setInfoUser(user);
    handleInfoPage();
  };
  const handleSheetUpdate = async () => {
    try {
      const response = await axios.post(`/sheets`);

      setSheetID(response.data.sheetid);
      // Assuming you have a state variable called 'sheetData'
      setSheetData(response.data.message);
    } catch (error) {
      console.error("Error fetching sheet data:", error);
    }
  };

  return (
    <div className="dashboard-main">
      <div className="dashboard-core">
        <div className="dashboard-nav-pane-main">
          <div className="dashboard-nav-card-group dashboard-nav-header-card-group">
            <div className="dashboard-nav-card dashboard-nav-header-card">
              {auth.pfpUrl ? (
                <div className="dashboard-nav-pane-header-pfp-container">
                  <img
                    className="dashboard-nav-pane-header-pfp"
                    src={auth.pfpUrl}
                    alt=""
                  />
                </div>
              ) : (
                <FontAwesomeIcon
                  className="dashboard-nav-pane-logo dashboard-nav-header-logo"
                  icon={faUser}
                />
              )}

              <h2 className="dashboard-nav-pane-text">Welcome!</h2>
            </div>
          </div>
          <hr className="dashboard-hr" />
          <div className="dashboard-nav-card-group dashboard-nav-card-group-scroll">
            {nav_card_Data.map((cardData, index) => {
              const allowedRoles = cardData.roles.filter((role) =>
                Object.keys(auth.roles).includes(role)
              );
              const access = allowedRoles.length > 0; // Check if any allowed roles exist
              return (
                access && (
                  <div
                    key={index} // key should be on the parent element
                    className="dashboard-nav-card dashboard-nav-card-noglow"
                    onClick={functionMapping[cardData.btn]}
                  >
                    <FontAwesomeIcon
                      className="dashboard-nav-pane-logo"
                      icon={cardData.icon}
                    />
                    <h3 className="dashboard-nav-pane-text">{cardData.name}</h3>
                  </div>
                )
              );
            })}
          </div>
          <hr className="dashboard-hr" />
          <div className="dashboard-nav-card-group dashboard-nav-footer-card-group">
            <Link
              className="dashboard-nav-card dashboard-nav-footer-card"
              to="/profile"
            >
              {auth.pfpUrl ? (
                <div className="dashboard-nav-pane-footer-pfp-container">
                  <img
                    className="dashboard-nav-pane-footer-pfp"
                    src={auth.pfpUrl}
                    alt=""
                  />
                </div>
              ) : (
                <FontAwesomeIcon
                  className="dashboard-nav-pane-logo dashboard-nav-footer-logo"
                  icon={faUser}
                />
              )}

              <h3 className="dashboard-nav-pane-text">My Profile</h3>
            </Link>
          </div>
        </div>
        <div className="dashboard-hero-pane-main">
          {home && (
            <div className="dashboard-home-container">
              <img
                className="dashboard-logo-image"
                alt="logo"
                src={miragelogo}
              />
              <h1>Welcome ! {auth.username}</h1>
              <div className="dashboard-home-button-container">
                <button
                  className="home-cssbuttons-io-button"
                  onClick={handleSheetUpdate}
                >
                  UPDATE SHEET
                </button>
                <button
                  className="home-cssbuttons-io-button"
                  onClick={() =>
                    window.open(
                      `https://docs.google.com/spreadsheets/d/1UKXEsJMlqvdvfJ-RrfanjxVJguf5HysErkq2GofGUC0`
                    )
                  }
                >
                  OPEN GOOGLE SHEET
                </button>
              </div>

              <p>{sheetData}</p>
            </div>
          )}
          {analyticspage && (
            <div className="dashboard-hero-pane-core">
              <div className="dashboard-hero-pane-home-container">
                <div className="dashboard-hero-pane-chart-card">
                  <h2>No. Applications</h2>
                  <div className="dashboard-hero-pane-bar-chart-container">
                    <p className="dashboard-card-text">{applications.length}</p>
                  </div>
                </div>
                <div className="dashboard-hero-pane-chart-card">
                  <h2>No. of Participants</h2>
                  <div className="dashboard-hero-pane-bar-chart-container">
                    <p className="dashboard-card-text">{players.length}</p>
                  </div>
                </div>

                <div className="dashboard-hero-pane-chart-card">
                  {/* <h2>College Entries</h2> */}
                  <div className="dashboard-hero-pane-bar-chart-container">
                    <DonutChartComponent />
                  </div>
                </div>
              </div>
              <div className="dashboard-hero-pane-home-container">
                {/* <div className="dashboard-hero-pane-chart-card">
                  <h2>Event Team Entries</h2>
                  <div className="dashboard-hero-pane-bar-chart-container">
                    <BarChartComponent />
                  </div>
                </div> */}
                <div className="dashboard-hero-pane-chart-card">
                  <h2>College Team Entries</h2>
                  <div className="dashboard-hero-pane-bar-chart-container">
                    <BarChartComponent2 />
                  </div>
                </div>
              </div>
            </div>
          )}
          {userspage && (
            <div className="dashboard-hero-pane-core">
              <h1>Users</h1>
              <div className="dashboard-hero-pane-table-container">
                <table className="dashboard-hero-pane-table">
                  <thead>
                    <tr>
                      <th className="dashboard-hero-pane-th" id="sno">
                        #
                      </th>
                      <th className="dashboard-hero-pane-th" id="uname">
                        Name
                      </th>
                      {/* <th className="dashboard-hero-pane-th" id="email">Email</th> */}
                      <th className="dashboard-hero-pane-th" id="role">
                        User Roles
                      </th>
                      <th className="dashboard-hero-pane-th" id="role">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <td className="dashboard-user-card-td" id="sno">
                          <input
                            className="dashboard-user-checkbox"
                            type="checkbox"
                          />
                        </td>
                        <td className="dashboard-user-card-td">
                          <div className="dashboard-user-name-container">
                            <div className="dashboard-user-pfp-container">
                              <img
                                className="dashboard-user-card-pfp"
                                src={user.pfp || sample}
                                alt="pfp"
                              />
                            </div>
                            <div className="dashboard-user-card-name-container">
                              <p>{user.username}</p>
                              <p>{user.email}</p>
                            </div>
                            {!user.verified && (
                              <div className="dashboard-user-card-verify-container">
                                <div className="dashboard-roles-container">
                                  <div className="dashboard-verify-card">
                                    Not Verified
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="dashboard-user-card-td">
                          <div className="dashboard-roles-container">
                            {Object.keys(user.roles).map((role) => (
                              <div
                                className="dashboard-role-card"
                                key={role}
                                id={role}
                              >
                                {role}
                                {!isFieldsLocked.users[index] && (
                                  <FontAwesomeIcon
                                    className="dashboard-role-cross-icon"
                                    onClick={() =>
                                      handleRoleRemove(role, user._id)
                                    }
                                    icon={faCircleXmark}
                                  />
                                )}
                              </div>
                            ))}

                            {addnewrole && !isFieldsLocked.users[index] && (
                              <div className="dashboard-role-card">
                                <input
                                  className="dashboard-add-role-input"
                                  value={newrole}
                                  onChange={(event) => {
                                    setNewRole(event.target.value);
                                  }}
                                  type="text"
                                />
                              </div>
                            )}
                            {!isFieldsLocked.users[index] &&
                              (!addnewrole ? (
                                <FontAwesomeIcon
                                  className="dashboard-role-plus-icon"
                                  onClick={() => setAddNewRole(true)}
                                  icon={faCirclePlus}
                                />
                              ) : !newrole ? (
                                <FontAwesomeIcon
                                  className="dashboard-role-plus-icon"
                                  onClick={() => setAddNewRole(false)}
                                  icon={faCircleXmark}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  className="dashboard-role-plus-icon"
                                  onClick={() =>
                                    handleNewRole(newrole, user._id)
                                  }
                                  icon={faCircleCheck}
                                />
                              ))}
                          </div>
                        </td>
                        <td className="dashboard-user-card-td dashboard-user-card-td-actions">
                          {!user.verified && (
                            <div className="dashboard-user-card-verify-container">
                              <div className="dashboard-roles-container">
                                <div
                                  className="dashboard-verify-card"
                                  onClick={() => {
                                    handleverification(user._id);
                                  }}
                                >
                                  Verify
                                </div>
                              </div>
                            </div>
                          )}
                          {isFieldsLocked.users[index] ? (
                            <FontAwesomeIcon
                              className="dashboard-user-card-action-icon"
                              onClick={() => handleToggleEditUser(index)}
                              icon={faPenToSquare}
                            />
                          ) : (
                            <>
                              <FontAwesomeIcon
                                className="dashboard-user-card-action-icon"
                                onClick={() => {
                                  handleToggleEditUser(index);
                                  setAddNewRole(false);
                                }}
                                icon={faCheckSquare}
                              />
                              <FontAwesomeIcon
                                className="dashboard-user-card-action-icon"
                                onClick={() => {
                                  handleUserRemove(user._id);
                                }}
                                icon={faTrash}
                              />
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {participantspage && (
            <div className="dashboard-hero-pane-core">
              <h1>Participants</h1>
              <div className="dashboard-hero-pane-table-container">
                <table className="dashboard-hero-pane-table">
                  <thead>
                    <tr>
                      <th className="dashboard-hero-pane-th" id="sno">
                        #
                      </th>
                      <th className="dashboard-hero-pane-th" id="uname">
                        Name
                      </th>
                      <th className="dashboard-hero-pane-th" id="uname">
                        Team Name
                      </th>
                      <th className="dashboard-hero-pane-th" id="uname">
                        Branch
                      </th>
                      <th className="dashboard-hero-pane-th" id="uname">
                        Department
                      </th>
                      <th className="dashboard-hero-pane-th" id="role">
                        College
                      </th>
                      {/* <th className="dashboard-hero-pane-th" id="role">Actions</th> */}
                    </tr>
                  </thead>
                  <tbody className="dashboard-user-tbody">
                    {players.map((user, index) => (
                      <tr key={user._id}>
                        <td className="dashboard-user-card-td" id="sno">
                          <input
                            className="dashboard-user-checkbox"
                            type="checkbox"
                          />
                        </td>
                        <td className="dashboard-user-card-td">
                          <div className="dashboard-user-name-container">
                            <div className="dashboard-user-pfp-container">
                              <img
                                className="dashboard-user-card-pfp"
                                src={user.pfp}
                                alt="Gov ID"
                              />
                            </div>
                            <div className="dashboard-user-card-name-container">
                              <p>{user.name}</p>
                              <p>{user.rollno}</p>
                            </div>
                            {/* <FontAwesomeIcon
                                  className="dashboard-user-card-action-icon dashboard-user-card-enlarge-icon"
                                  onClick={() => handleInfoPlayer(user,index)}
                                  icon={faUpRightFromSquare}
                                /> */}
                          </div>
                        </td>
                        <td className="dashboard-user-card-td">
                          {user.team_name}
                        </td>
                        <td className="dashboard-user-card-td">
                          {user.branch}
                        </td>
                        <td className="dashboard-user-card-td">
                          {user.department}
                        </td>
                        <td className="dashboard-user-card-td">
                          {user.college}
                        </td>
                        {/* <td className="dashboard-user-card-td dashboard-user-card-td-actions">
                          {isFieldsLocked.players[index] ? (
                            <FontAwesomeIcon
                              className="dashboard-user-card-action-icon"
                              onClick={() => handleToggleEditPlayer(index)}
                              icon={faPenToSquare}
                            />
                          ) : (
                            <FontAwesomeIcon
                              className="dashboard-user-card-action-icon"
                              onClick={() => handleToggleEditPlayer(index)}
                              icon={faCheckSquare}
                            />
                          )}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {applicationspage && (
            <div className="dashboard-hero-pane-core">
              <h1>Applications</h1>
              <div className="dashboard-hero-pane-table-container">
                <table className="dashboard-hero-pane-table">
                  <thead>
                    <tr>
                      <th className="dashboard-hero-pane-th" id="sno">
                        #
                      </th>
                      <th className="dashboard-hero-pane-th" id="uname">
                        Email
                      </th>
                      <th className="dashboard-hero-pane-th" id="uname">
                        Team ID
                      </th>
                      {/* <th className="dashboard-hero-pane-th" id="uname">Event</th> */}
                      {/* <th className="dashboard-hero-pane-th" id="role">Teacher Contact No.</th> */}
                      {/* <th className="dashboard-hero-pane-th" id="role">Actions</th> */}
                    </tr>
                  </thead>
                  <tbody className="dashboard-user-tbody">
                    {applications.map((user, index) => (
                      <tr key={user._id}>
                        <td className="dashboard-user-card-td" id="sno">
                          <input
                            className="dashboard-user-checkbox"
                            type="checkbox"
                          />
                        </td>
                        <td className="dashboard-user-card-td">
                          <div className="dashboard-user-name-container">
                            {/* <div className="dashboard-user-pfp-container">
                              <img className="dashboard-user-card-pfp" src={user.pfp} alt="Gov ID" />
                            </div> */}
                            <div className="dashboard-user-card-name-container">
                              {/* <p>{user.name}</p> */}
                              <p>{user.email}</p>
                            </div>
                          </div>
                        </td>
                        {/* <td className="dashboard-user-card-td">{user.email}</td> */}
                        <td className="dashboard-user-card-td">
                          {user.team_id}
                        </td>
                        <td className="dashboard-user-card-td">
                          {user.team_name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {eventspage && (
            <>
              <div className="dashboard-hero-pane-core">
                <div className="dashboard-hero-pane-heading-container">
                  <h1>Events</h1>
                  <button
                    className="about-button"
                    onClick={() => {
                      setEventInfo(true);
                    }}
                  >
                    <span>Add New</span>
                  </button>
                </div>

                <div className="dashboard-hero-pane-table-container">
                  <table className="dashboard-hero-pane-table">
                    <thead>
                      <tr>
                        <th className="dashboard-hero-pane-th" id="sno">
                          #
                        </th>
                        <th className="dashboard-hero-pane-th" id="uname">
                          Name
                        </th>
                        <th className="dashboard-hero-pane-th" id="uname">
                          Type
                        </th>
                        <th className="dashboard-hero-pane-th" id="uname">
                          Short Description
                        </th>
                        <th className="dashboard-hero-pane-th" id="uname">
                          Description
                        </th>
                        <th className="dashboard-hero-pane-th" id="uname">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="dashboard-user-tbody">
                      {events.map((user, index) => (
                        <tr key={user._id}>
                          <td className="dashboard-user-card-td" id="sno">
                            {/* <input
                              className="dashboard-user-checkbox"
                              type="checkbox"
                            /> */}
                            <p>{index + 1}.</p>
                          </td>
                          <td className="dashboard-user-card-td">
                            <div className="dashboard-user-name-container">
                              <div className="dashboard-user-pfp-container">
                                <img
                                  className="dashboard-event-card-pfp"
                                  src={user.logo}
                                  alt="Event PFP"
                                />
                              </div>
                              <div className="dashboard-user-card-name-container">
                                <p>{user.name}</p>
                                {/* <p>{user._id}</p> */}
                              </div>
                            </div>
                          </td>
                          <td className="dashboard-user-card-td">
                            {user.type}
                          </td>
                          <td className="dashboard-user-card-td">
                            {user.sdesc}
                          </td>

                          <td className="dashboard-user-card-td">
                            {user.desc
                              .split("\\n")
                              .slice(0, 3)
                              .map((line, index) => (
                                <p key={index}>{line}</p>
                              ))}
                            .....
                          </td>
                          <td className="dashboard-user-card-td">
                            <FontAwesomeIcon
                              onClick={() => handledeleteevent(user._id)}
                              className="dashboard-event-card-icon"
                              icon={faClose}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {eventInfo && (
                <div className="dashboard-eventInfo-main">
                  <div className="signin-main-core dashboard-eventInfo-core">
                    <div className="dashboard-main-close-button-container">
                      <FontAwesomeIcon
                        className="dashboard-close-icon"
                        icon={faClose}
                        onClick={() => {
                          setEventInfo(false);
                        }}
                      />
                    </div>
                    <div
                      className="signin-container signin-b-container"
                      id="b-container"
                    >
                      <form
                        className="dashboard-form"
                        onSubmit={handlenewevent}
                      >
                        <h2 className="signin-form_title dashboard-title">
                          Add New Event
                        </h2>
                        <span className="profile-pfp-container">
                          {pfpLoading ? (
                            <div>
                              <button className="" type="button" disabled />
                              <button
                                className="registration-players-upload-button"
                                type="button"
                                disabled
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 100 101"
                                  className="inline w-4 h-4 mr-3 text-white animate-bounce"
                                  role="status"
                                  aria-hidden="true"
                                >
                                  <circle
                                    fill="#34D399"
                                    r="45"
                                    cy="50"
                                    cx="50"
                                  ></circle>
                                </svg>
                                Uploading...
                              </button>
                            </div>
                          ) : pfpUrl ? (
                            <>
                              <label
                                className="registration-pfpfile"
                                htmlFor="pfpfile"
                              >
                                <img
                                  className="registration-pfp-image dashboard-pfp-image"
                                  src={pfpUrl}
                                  alt="icon"
                                />
                              </label>
                              <input
                                className="profile-pfp-upload"
                                disabled={isFieldsLocked}
                                type="file"
                                onChange={handlepfpChange}
                                id="pfpfile"
                              />
                            </>
                          ) : (
                            <>
                              <label
                                className="registration-pfpfile"
                                htmlFor="pfpfile"
                              >
                                <img
                                  className="registration-pfp-image dashboard-pfp-image"
                                  src={sample}
                                  alt="icon"
                                />
                              </label>
                              <input
                                className="profile-pfp-upload"
                                type="file"
                                onChange={handlepfpChange}
                                id="pfpfile"
                              />
                            </>
                          )}
                          <br />
                          <p>Event Logo</p>
                        </span>

                        <input
                          className="signin-form__input"
                          type="text"
                          id="Name"
                          value={eventname}
                          autoComplete="off"
                          onChange={(e) => setEventName(e.target.value)}
                          placeholder="Event Name"
                          required
                        />

                        <div className="event-input-container">
                          <label htmlFor="typeSelect">Select Type:</label>
                          <select
                            id="typeSelect"
                            className="signin-form__input"
                            value={eventtype}
                            onChange={(e) => setEventType(e.target.value)}
                            name="mode"
                            required
                          >
                            <option value="normal">Normal</option>
                            <option value="quiz">Quiz</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        {eventTypeInput && (
                          <div className="event-input-container">
                            <label htmlFor="eventTypeInput">
                              Enter Event Type:
                            </label>
                            <input
                              className="signin-form__input"
                              type="text"
                              value={eventTypeInputValue} // Bind to state
                              onChange={(e) =>
                                setEventTypeInputValue(e.target.value)
                              } // Update input value
                              id="eventTypeInput"
                              name="eventTypeInput"
                              placeholder="Enter event type"
                              required
                            />
                          </div>
                        )}

                        <div className="event-input-container">
                          <label htmlFor="modeSelect">Select Mode:</label>
                          <select
                            id="modeSelect"
                            className="signin-form__input"
                            value={eventmode}
                            defaultValue="virtual"
                            onChange={(e) => setEventMode(e.target.value)}
                            name="mode"
                            required
                          >
                            <option value="virtual" selected>
                              Virtual
                            </option>
                            <option value="physical">Physical</option>
                            <option value="physical">Hybrid</option>
                          </select>
                        </div>

                        {eventtype === "quiz" && (
                          <div>
                            <label htmlFor="csvUpload">Upload CSV File:</label>
                            <input
                              type="file"
                              id="csvUpload"
                              accept=".csv"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    const text = e.target.result;
                                    const rows = text.split("\n");
                                    const data = rows
                                      .slice(1)
                                      .map((row, index) => {
                                        const columns = row.split(",");
                                        const options = [
                                          columns[3]?.trim() || "",
                                          columns[4]?.trim() || "",
                                          columns[5]?.trim() || "",
                                          columns[6]?.trim() || "",
                                        ];

                                        // Filter out rows with any empty option
                                        if (
                                          options.some(
                                            (option) => option === ""
                                          )
                                        ) {
                                          return null;
                                        }

                                        return {
                                          number:
                                            columns[0]?.trim() || index + 1,
                                          question: columns[1]?.trim() || "",
                                          answer: columns[2]?.trim() || "",
                                          options,
                                          type: columns[7]?.trim() || "",
                                        };
                                      })
                                      .filter((item) => item !== null); // Remove null entries
                                    console.log("Parsed Data:", data);
                                    setQuizQuestions(data);
                                  };
                                  reader.readAsText(file);
                                }
                              }}
                            />
                          </div>
                        )}

                        <input
                          className="signin-form__input"
                          type="text"
                          id="SDesc"
                          value={eventsdesc}
                          maxLength="50"
                          autoComplete="off"
                          placeholder="Short Description (Max. 50 Characters)"
                          onChange={(e) => setEventSDesc(e.target.value)}
                          required
                        />

                        <textarea
                          className="signin-form__input signin-form__input-textarea"
                          id="Desc"
                          value={eventdesc}
                          autoComplete="off"
                          placeholder="Description (New Line Should be Separated by \n Character)"
                          onChange={(e) => setEventDesc(e.target.value)}
                          required
                        />

                        <p
                          className={errMsg ? "errmsg" : "offscreen"}
                          aria-live="assertive"
                        >
                          {errMsg}
                        </p>

                        <button className="cssbuttons-io-button" type="submit">
                          ADD
                          <div className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path
                                fill="currentColor"
                                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              ></path>
                            </svg>
                          </div>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {quizcontrolpage && (
            <>
              <div className="dashboard-hero-pane-core">
                <div className="dashboard-hero-pane-heading-container">
                  <h1>Events</h1>
                  <button
                    className="about-button"
                    onClick={() => {
                      setEventInfo(true);
                    }}
                  >
                    <span>Add New</span>
                  </button>
                </div>
                {!isConnected ? (
                  <button onClick={connectToSocket}>
                    connect to socket as admin
                  </button>
                ) : (
                  <p>Connected to Socket as Admin</p>
                )}
                <button onClick={startquiz}>stat quiz</button>
                <button onClick={openDataWindow}>playersList</button>
                <button onClick={nextquestion}>next question</button>
                <button>lederboard</button>
                <div className="dashboard-hero-pane-table-container"></div>
              </div>
            </>
          )}
          {infopage && infouser && (
            <div className="dashbord-info-main">
              <FontAwesomeIcon
                className="dashboard-user-card-action-icon dashboard-info-page-action-icon"
                icon={faArrowLeft}
                onClick={() => {
                  handlePlayers();
                  setInfoUser();
                }}
              />
              <div className="dashboard-info-card">
                <div className="dashboard-info-name-container">
                  <div className="dashboard-user-pfp-container">
                    <img
                      className="dashboard-info-user-card-pfp"
                      src={infouser.pfp}
                      alt="Gov ID"
                    />
                  </div>
                  <div className="dashboard-user-pfp-container">
                    <img
                      className="dashboard-info-user-card-idcard"
                      src={infouser.IdCard}
                      alt="Gov ID"
                    />
                  </div>
                </div>
              </div>

              <div className="dashboard-info-card2">
                <div className="dashboard-info-name-container2">
                  <div className="dashboard-user-card-name-container">
                    <p className="dashboard-info-card-text2">
                      Object ID: {infouser._id}
                    </p>
                    <p className="dashboard-info-card-text2">
                      Name: {infouser.name}
                    </p>
                    <p className="dashboard-info-card-text2">
                      Email: {infouser.email}
                    </p>
                    <p className="dashboard-info-card-text2">
                      College/University Roll Number: {infouser.rollno}
                    </p>
                    <p className="dashboard-info-card-text2">
                      Contact Number: {infouser.contactNumber}
                    </p>
                  </div>
                  <div className="dashboard-user-card-name-container">
                    <p className="dashboard-info-card-text2">
                      Team Name: {infouser.team_name}
                    </p>
                    <p className="dashboard-info-card-text2">
                      Event Name: {infouser.event}
                    </p>
                    <p className="dashboard-info-card-text2">
                      In Game ID: {infouser.inGameId}
                    </p>
                    <p className="dashboard-info-card-text2">
                      Seat Number: {infouser.seatname}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

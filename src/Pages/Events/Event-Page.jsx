import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Event-Page.css";
import "react-multi-carousel/lib/styles.css";
import { Timer } from "../../components/timer/timer";
import axios from "../../api/axios";
import Gallery from "../../components/Carousel/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocation,
  faMapMarked,
  faMapMarker,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faPinterest } from "@fortawesome/free-brands-svg-icons";

const Event_Page = () => {
  const { eventName } = useParams();
  const [events, setEvents] = useState([]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const fetchEventData = async () => {
    try {
      const response = await axios.get("/events");
      console.log(JSON.stringify(response.data));
      setEvents(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const eventData = events.find(
    (event) =>
      event.name.toLowerCase() === eventName.toLowerCase().replace(/_/g, " ")
  );

  if (!eventData) {
    return <div>Event not found!</div>;
  }
  return (
    <div className="ace-main">
      <div className="ace-cards-row">
        {eventData.logo && (
          <img
            className="ace-horizontal-card-userimage"
            alt=""
            src={eventData.logo}
          />
        )}
        <div className="ace-horizontal-card">
          <div className="ace-horizontal-card-left">
            <div className="events-page-info-container">
              <h1>{eventData.name}</h1>
              <p>{eventData.sdesc}</p>
            </div>
            <div className="ace-card-detail-container">
              <div className="ace-card-location-container">
                <FontAwesomeIcon
                  className="event-info-icon"
                  icon={faCalendar}
                />
                <p>
                  {new Date(eventData.date.from).toLocaleDateString()},{" "}
                  {new Date(eventData.date.from).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  Onwards
                </p>
              </div>
              {eventData.location && (
                <div className="ace-card-location-container">
                  <FontAwesomeIcon
                    className="event-info-icon"
                    icon={faMapMarker}
                  />
                  <p>{eventData.location}</p>
                </div>
              )}
              {eventData.mode && (
                <div className="ace-card-location-container">
                  <FontAwesomeIcon className="event-info-icon" icon={faPlane} />
                  <p>
                    {eventData.mode === "physical"
                      ? "Offline"
                      : eventData.mode === "virtual"
                      ? "Online"
                      : eventData.mode}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* {eventData.status === "Completed" && (
            <div className="ace-horizontal-card-right">
              <Timer
                className="home-countdown"
                targetDate={new Date(eventData.registration.start).getTime()}
                endDate={new Date(eventData.registration.end).getTime()}
                link={
                  eventData.type === "Quiz"
                    ? `/quiz/${eventData._id}`
                    : `/registration/${eventData._id}`
                }
              />
            </div>
          )} */}
        </div>
      </div>
      <div className="ace-bottom">
        {eventData.desc && (
          <div className="ace-info">
            <h2>Description</h2>
            {eventData.desc.split("\\n").map((line, index) => (
              <React.Fragment key={index}>
                {line === "" ? <br /> : <p>{line}</p>}
              </React.Fragment>
            ))}
          </div>
        )}
        {eventData.schedule && eventData.schedule.length > 0 && (
          <div className="ace-info">
            <h2>Schedule</h2>
            <div class="wrapper">
              <ul className="sessions">
                {eventData.schedule.map((item, index) => {
                  // Convert 24-hour time to 12-hour format with AM/PM
                  const time = new Date(
                    `1970-01-01T${item.time}:00`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });
                  return (
                    <li className="sessions-li" key={index}>
                      <p className="timeline-data-heading">
                        {time} - {item.activity}
                      </p>
                      <p2>{item.desc}</p2>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
      {eventData.images && eventData.images.length > 0 && (
        <Gallery images={eventData.images} responsive={responsive} />
      )}
    </div>
  );
};

export default Event_Page;

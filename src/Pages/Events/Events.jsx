import React, { useEffect, useState } from "react";
import "./Events.css";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const Events = () => {
  const EVENTS_URL = "/events";
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(EVENTS_URL);
        const sortedEvents = response.data.sort(
          (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime()
        );
        setEvents(sortedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEventData();
  }, []);

  const groupEventsByYear = () => {
    return events.reduce((acc, event) => {
      const year = new Date(event.date.from).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(event);
      return acc;
    }, {});
  };

  const renderEventSection = (status, title) => {
    const eventsByYear = groupEventsByYear();
    const sortedYears = Object.keys(eventsByYear).sort((a, b) => b - a);
    return (
      <div className="events-core">
        <div className="events-heading">
          <h1 className="events-heading-text">
            {sortedYears.length > 0 ? title : `No ${title}`}
          </h1>
        </div>
        {sortedYears.map((year) => {
          const filteredEvents = eventsByYear[year].filter(
            (event) => event.status === status
          );
          return (
            filteredEvents.length > 0 && (
              <div key={year} className="events-year-section">
                <h1 className="events-heading-year">{year}</h1>
                <div className="events-cards-row">
                  {filteredEvents.map((event, index) => (
                    <div
                      key={index}
                      className={`events-vertical-card ${
                        status === "Completed" && "events-vertical-past-card"
                      }`}
                    >
                      {status !== "Completed"
                        ? event.logo && (
                            <img
                              className="events-vertical-card-userimage"
                              src={event.logo}
                              alt="Event Logo"
                            />
                          )
                        : null}

                      <div className="events-vertical-card-bottom">
                        <h1 className="events-vertical-name-text">
                          {event.name}
                        </h1>
                        <p className="events-vertical-desc-text">
                          {event.sdesc}
                        </p>
                      </div>
                      <div className="events-buttons">
                        <Link to={`/events/${event.name.toLowerCase()}`}>
                          <button className="events-button" type="button">
                            Learn More
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          );
        })}
      </div>
    );
  };

  return (
    <div className="events-main">
      {renderEventSection("Active", "Active Events")}
      {renderEventSection("Scheduled", "Scheduled Events")}
      {renderEventSection("Completed", "Past Events")}
    </div>
  );
};

export default Events;

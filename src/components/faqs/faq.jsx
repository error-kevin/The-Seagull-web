import React, { useState } from "react";
import "./faq.css";
import { faqData } from "./faq_data";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleHeight = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-main">
      {faqData.map((que, index) => (
        <div key={index} className="content-box" onClick={() => toggleHeight(index)}>
          <div
            className="content-box-container"
            
          >
            <h2 className="content-title">{que.question}</h2>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="expandable-content"
                >
                  {que.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <FontAwesomeIcon
            icon={expandedIndex === index ? faChevronUp : faChevronDown}
            onClick={() => toggleHeight(index)}
            className="faq-icon"
          />
        </div>
      ))}
    </div>
  );
};

export default Faq;

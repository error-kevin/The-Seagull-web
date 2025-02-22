import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./Quiz.css";
import { quiz as quizQuestions, funFacts } from "./quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { WsBASE_URL } from "../../api/axios";

const App = () => {
  let timeperquestion = 10

  const socketRef = useRef(null);
  const [name, setName] = useState("");
  const [enroll, setEnroll] = useState("");
  const [players, setPlayers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeperquestion); // Timer for each question
  const [countdown, setCountdown] = useState(5); // Countdown before quiz starts
  const [waitingForNext, setWaitingForNext] = useState(false); // Waiting screen after answering
  const [userAnswered, setUserAnswered] = useState(false); // To track if user answered
  const [startTime, setStartTime] = useState(null); // Track when the question was displayed
  const timerInterval = useRef(null); // Declare the timerInterval variable outside of the function
  const [currentFact, setCurrentFact] = useState("");

  // Connect to socketRef

  const connectToSocket = () => {
    if (name && enroll) {
      const data = {
        "user-name": name,
        "user-role": "participant",
        "enroll-no": enroll,
      };

      // Check if the socket is already initialized
      if (!socketRef.current) {
        console.log(`Connecting to socket on ${WsBASE_URL}`);
        socketRef.current = io(WsBASE_URL, {
          extraHeaders: data,
        });
        console.log(socketRef);
        setIsConnected(true);

        // Listen for players list update
        socketRef.current.on("playersList", (data) => {
          setPlayers(data);
          console.log("Players list updated:", data);
        });

        // Listen for quiz start signal from admin
        socketRef.current.on("startQuiz", () => {
          setQuizStarted(true);
          startCountdown(); // Start the countdown for quiz
        });

        // Listen for next question signal from admin
        socketRef.current.on("nextQuestion", () => {
          console.log("1111111");
          setWaitingForNext(false);

          goToNextQuestion();

          // Move to the next question
        });
      } else {
        console.log("Socket is already connected.");
      }
    } else {
      alert("Please enter your name and enrollment number before connecting.");
    }
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        console.log("Disconnecting socket...");
        socketRef.current.disconnect(); // Clean up the socket on unmount
        socketRef.current = null; // Reset the reference
      }
    };
  }, []);

  // Start countdown 3, 2, 1 before the quiz
  const startCountdown = () => {
    setCountdown(3); // Reset countdown to 3 before starting
    let countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(countdownInterval);
        setCountdown(null);
        startTimer(); // Start quiz timer after countdown ends
        return prev;
      });
    }, 1000);
  };

  const startTimer = () => {
    // Clear any existing timer before starting a new one
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    setStartTime(Date.now()); // Track when the question started
    setUserAnswered(false); // Reset answered state
    setTimeLeft(timeperquestion); // Reset the timer

    // Start a new interval
    timerInterval.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(timerInterval.current); // Clear the interval when time is up
        if (!userAnswered) handleTimeout(); // Handle case where time runs out
        return prev;
      });
    }, 1000);
  };

  // Cleanup useEffect to clear the interval on component unmount
  useEffect(() => {
    return () => {
      clearInterval(timerInterval); // Clean up the timer interval
    };
  }, []);

  // Handle when the timer reaches 0
  const handleTimeout = () => {
    if (!userAnswered) {
      setWaitingForNext(true);
      setUserAnswered(true); // Mark that the user cannot answer anymore
      clearInterval(timerInterval.current); // Clear the timer when time is up

      const newTotalPoints = points; // No points if no answer submitted

      // Emit score to server when time runs out
      if (socketRef) {
        // Check if socketRef is connected
        socketRef.current.emit("userAnswer", {
          question: currentQuestion,
          answer: "No Answer",
          score: newTotalPoints, // Send updated score
        });
      } else {
        console.log(socketRef);
        console.error("Socket is not connected.");
      }
    }
  };

  useEffect(() => {
    console.log(socketRef);
  }, [socketRef]);

  useEffect(() => {
    // console.log(timeLeft);
  }, [timeLeft]);

  const handleSubmitAnswer = (answer) => {
    if (!userAnswered) {
      setUserAnswered(true); // Ensure user can only submit once
      clearInterval(timerInterval.current); // Clear the timer as soon as the user answers
      const timeTaken = timeperquestion - timeLeft; // Calculate time taken
      console.log(currentQuestion);
      console.log(quizQuestions[currentQuestion].answer);
      console.log(answer);

      if (quizQuestions[currentQuestion].answer === answer) {
        console.log("answer is correct");
        const pointsForQuestion = Math.max(0, 10 * (1 - timeTaken / timeperquestion)); // Points based on time
        console.log(`pps - ${pointsForQuestion} - ${timeTaken}`);
        const newTotalPoints = points + pointsForQuestion;

        setPoints(newTotalPoints);

        if (socketRef) {
          socketRef.current.emit("userAnswer", {
            question: currentQuestion,
            answer,
            score: pointsForQuestion, // Send updated score
          });
        } else {
          console.error("Socket is not connected.");
        }
      } else {
        console.log("answer is incorrect");
        if (socketRef) {
          socketRef.current.emit("userAnswer", {
            question: currentQuestion,
            answer,
            score: 0, // Send updated score
          });
        } else {
          console.error("Socket is not connected.");
        }
      }

      setWaitingForNext(true); // Show waiting screen
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random index to select a fun fact
      const randomIndex = Math.floor(Math.random() * funFacts.length);
      setCurrentFact(funFacts[randomIndex]);
    }, 10000); // Change fact every 5 seconds

    // Set the initial fact
    setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)]);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  // Move to next question when admin signals
  const goToNextQuestion = () => {
    console.log("222222");
    if (currentQuestion < quizQuestions.length - 1) {
      console.log(quizQuestions.length - 1);
      console.log("33333333");
      // setCurrentQuestion(currentQuestion + 1);
      setCurrentQuestion((prev) => {
        const nextQuestion = prev + 1;
        console.log("Updating to next question:", nextQuestion); // Log new question index
        return nextQuestion;
      });
      console.log("4444444");
      setTimeLeft(timeperquestion); // Reset timer for the next question
      startTimer(); // Start the timer for the new question
    } else {
      console.log("555555");
      alert(`Quiz finished! You scored ${points.toFixed(2)} points.`);
    }
  };

  if (currentQuestion === quizQuestions.length - 1) {
    console.log("Quiz ended");
    setQuizStarted(false); // Reset quiz state
    setCurrentQuestion(0); // Reset question to 0 for next quiz
    setWaitingForNext(true); // Send players back to waiting area
    setCountdown(null); // Reset countdown
    setPoints(0); // Reset points
  }

  useEffect(() => {
    console.log(currentQuestion);
  }, [currentQuestion]);

  return (
    <div className="quiz-main">
      {/* Lobby Phase */}
      {!isConnected ? (
        <div className="quiz-join-container">
          <h1>Welcome !</h1>

          <h2>To</h2>
          <div className="quiz-join-title-container">
            <h2>GDGOC @ SVVV</h2>
            <h2>ORIENTATION QUIZ</h2>
          </div>
          <div className="quiz-join-input-container">
            <input
              className="signin-form__input quiz-form__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <input
              className="signin-form__input quiz-form__input"
              type="text"
              value={enroll}
              onChange={(e) => setEnroll(e.target.value)}
              placeholder="Enter your Enrollment No."
            />
          </div>
          <button
            className="quiz-cssbuttons-io-button"
            onClick={connectToSocket}
          >
            Join
          </button>
        </div>
      ) : countdown !== null && quizStarted ? (
        <div className="quiz-countdown">
          <h1>Quiz starting in: {countdown}</h1>
        </div>
      ) : quizStarted && countdown === null && !waitingForNext ? (
        <div className="quiz-container">
          <h1>Question {currentQuestion + 1}</h1>
          <h3>{quizQuestions[currentQuestion].question}</h3>
          <div className="quiz-options">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="quiz-option"
                onClick={() => handleSubmitAnswer(option)}
                role="button" // Indicate the div acts like a button
                htmlFor={`option-${index}`}
              >
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="quizOption"
                  onChange={() => handleSubmitAnswer(option)} // Call handleSubmitAnswer when the radio is changed
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
          </div>
          <p>
            <strong>Time left:</strong> {timeLeft} seconds
          </p>
          {/* <p>Total Points: {points.toFixed(2)}</p> */}
        </div>
      ) : currentQuestion === quizQuestions.length - 1 ? (
        <>
          <h1>Thank You for Participating</h1>
          {console.log("Quiz ended")}
        </>
      ) : waitingForNext ? (
        // Waiting Phase after answering
        <div className="quiz-waiting">
          <h1>Please wait for the next question...</h1>
          <div className="quiz-waiting-fact">
            <h2>
              <strong>Fun Fact!</strong>
            </h2>
            <p>{currentFact}</p>
          </div>
        </div>
      ) : isConnected ? (
        <div className="quiz-lobby-main">
          <h1>Welcome!</h1>
          <h1>{name}</h1>

          <h2>Please Wait till the quiz starts</h2>
          <h3>Do not close this tab</h3>
          <div className="quiz-player-container">
            {players.map((player, index) => (
              <div className="quiz-player-card" key={index}>
                <FontAwesomeIcon
                  className="quiz-player-card-avatar"
                  icon={faUser}
                />
                <div className="quiz-player-card-name-container">
                  <p className="quiz-player-card-name-text">
                    {player.userName}
                  </p>
                  <p className="quiz-player-card-name-roll">
                    {player.enrollNo}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* <button
            className="cssbuttons-io-button quiz-start-button"
            onClick={() => {
              setQuizStarted(true);
              startCountdown();
            }}
          >
            Start Quiz
          </button> */}
        </div>
      ) : null}
    </div>
  );
};

export default App;

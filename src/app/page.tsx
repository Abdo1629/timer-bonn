"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPhone,
} from "react-icons/fa";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-08-26T04:00:00+03:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      totalDays: Math.floor(
        (targetDate -
          new Date("2025-08-26T04:00:00+03:00").getTime()) /
          (1000 * 60 * 60 * 24)
      ),
    };

    

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderCircle = (value: number, max: number, label: string) => (
    <div className="circle">
      <div className="progress-wrapper">
        <CircularProgressbar
          value={value}
          maxValue={max}
          text={`${value}`}
          styles={buildStyles({
            pathColor: "#007BFF",
            textColor: "#fff",
            trailColor: "rgba(255,255,255,0.2)",
            textSize: "24px",
            rotation: 0, 
          })}
        />
      </div>
      <p className="label" >{label}</p>
    </div>
  );

  const backgrounds = [
  "/bonn1.jpeg",
  "/bonn2.jpeg",
  "/bonn3.jpeg",
  "/bonn4.jpeg",
];

const [bgIndex, setBgIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
  }, 5000); // كل 5 ثواني
  return () => clearInterval(interval);
}, []);

const [email, setEmail] = useState("");
const [submitted, setSubmitted] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;

  console.log("Submitted email:", email);

  setSubmitted(true);
  setEmail("");

  setTimeout(() => {
    setSubmitted(false);
  }, 5000);
};

  return (
    
<div className="container">
  {backgrounds.map((bg, index) => (
    <div
      key={index}
      className="bg-image"
      style={{
        backgroundImage: `url(${bg})`,
        opacity: index === bgIndex ? 1 : 0,
        zIndex: index === bgIndex ? 0 : -1,
      }}
    ></div>
  ))}
    <div className="overlay"></div> 

      <Image src="/logo.png" alt="logo" width="160" height="160" className="logo" style={{ position: "relative", zIndex: 101 }}/>
      <h2 className="main-text">We’re crafting something BIG in Saudi beauty & innovation…</h2>
      <p className="sub-text">
        Get ready for a new standard in personal care & cosmetics manufacturing.
The next generation of Saudi excellence—Bonn is almost here.
      </p>

      <div className="countdown">
        {renderCircle(timeLeft.days, timeLeft.totalDays, "Days")}
        {renderCircle(timeLeft.hours, 24, "Hours")}
        {renderCircle(timeLeft.minutes, 60, "Minutes")}
        {renderCircle(timeLeft.seconds, 60, "Seconds")}
      </div>

      <form className="subscribe" onSubmit={handleSubmit}>
  <label className="submit-label">Be The First To Know</label>
  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <button type="submit">Submit</button>
</form>

{submitted && (
  <div className="success-message">
    ✅ Thank you! Your email has been submitted successfully.
  </div>
)}

      <div className="social-icons">
        <a href="" className="link"><FaLinkedinIn /></a>
        <a href="" className="link"><FaFacebookF /></a>
        <a href="" className="link"><FaTwitter /></a>
        <a href="" className="link"><FaPhone /></a>
      </div>

      <a href="/BMI Profile.pdf" download className="download-btn">
   Download Portfolio
</a>


      <footer>© Copyright 2025 | Bonn Medical Industries All Rights Reserved</footer>

<style jsx>{`
path.CircularProgressbar-path {
  width: 100px;
  height: 100px;}

.container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: #f2f2f2;
  text-align: center;
  padding: 40px 20px;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 1.5s ease-in-out;
  z-index: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5); 
  z-index: 1;
}

.container > *:not(.bg-image):not(.overlay) {
  position: relative;
  z-index: 2;
}

.logo {
  z-index: 100;
  position: relative;
}

  .submit-label {
    font-size: 14px;
    color: #ffc107;
    margin-right: 5px;
  }

  .subscribe input {
  height: 30px;
    width: 100%;
    max-width: 300px;
    padding: 10px;
    color: #c5daffff;
    background-color: transparent;
    border: 1px solid #007bff;
    border-radius: 5px;
  }

  .success-message {
  margin-top: 10px;
  color: #28a745;
  background-color: rgba(40, 167, 69, 0.1);
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.download-btn {
  display: inline-block;
  margin-top: 25px;
  background-color: #ffc107;
  color: #000;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s;
}

.download-btn:hover {
  background-color: #e0a800;
}


  .main-text {
    font-size: 24px;
    margin: 20px 0;
    color: #f2f2f2;
  }

  .sub-text {
    font-size: 16px;
    color: #ccc;
  }

  .countdown {
    display: flex;
    justify-content: center;
    flex-wrap: no-wrap;
    gap: 20px;
    margin: 30px 0;
  }

  .circle {
  width: 100px; 
}

.progress-wrapper {
  width: 100px;
  height: 100px;
}

  .label {
    font-size: 20px;
    color: #ffc107;
    margin-top: 2px;
  }

  .subscribe {
    margin: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .subscribe button {
    text-align: center;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.5;
    width: 100px;
    height: 30px;
    margin-left: -10px;
    padding: 0 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    font-size: 24px;
    margin-top: 20px;
    color: #cce0ff;
  }

  .link {
  color: #cce0ff;
  }

  footer {
    margin-top: 40px;
    color: #aaa;
  }

  @media (max-width: 768px) {
  .logo {
    font-size: 28px;
  }

  .main-text {
    font-size: 20px;
  }

  .sub-text {
    font-size: 14px;
  }

  .countdown {
    flex-wrap: no-wrap;
  }

  .circle {
    width: 60px;
  }

  .progress-wrapper {
    width: 20px;
    height: 20px;
  }

  .submit-label {
    font-size: 12px;
  }
    

  .subscribe input {
    width: 100%;
    max-width: 250px;
  }

  .subscribe button {
    width: 100%;
    max-width: 80px;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: inline-flex;
    font-size: 12px;
  }

  .label {
    font-size: 16px;
    color: #ffc107;
  }

  .social-icons {
    flex-wrap: wrap;
    gap: 15px;
    font-size: 20px;
  }
}
    @media (max-width: 425px) {
    .subscribe input  {
      width: 100%;
      max-width: 230px;
    }
    
    .submit-label {
      font-size: 12px;
    }
}
`}</style>

    </div>
  );
}

export default App;

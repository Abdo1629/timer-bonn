"use client";

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
    const targetDate = new Date("2025-08-26T00:00:00+03:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      totalDays: Math.floor(
        (targetDate -
          new Date("2025-08-26T00:00:00+03:00").getTime()) /
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

  return (
    <div className="container">
      <h1 className="logo">BONN</h1>
      <h2 className="main-text">Something Awesome Is In The Work</h2>
      <p className="sub-text">
        We’ll be up and running soon with our new and improved website.
      </p>

      <div className="countdown">
        {renderCircle(timeLeft.days, timeLeft.totalDays, "Days")}
        {renderCircle(timeLeft.hours, 24, "Hours")}
        {renderCircle(timeLeft.minutes, 60, "Minutes")}
        {renderCircle(timeLeft.seconds, 60, "Seconds")}
      </div>

      <div className="subscribe">
        <input type="email" placeholder="Enter your email" />
        <button>Submit</button>
      </div>

      <div className="social-icons">
        <a href="" className="link"><FaLinkedinIn /></a>
        <a href="" className="link"><FaFacebookF /></a>
        <a href="" className="link"><FaTwitter /></a>
        <a href="" className="link"><FaPhone /></a>
      </div>

      <footer>© Copyright 2025 | Bonn Medical Industries All Rights Reserved</footer>

<style jsx>{`
path.CircularProgressbar-path {
  width: 100px;
  height: 100px;}

.container {
  position: relative;
  min-height: 100%;
  background-image: url("/bonnback.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #f2f2f2;
  text-align: center;
  padding: 40px 20px;
}


.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* <= overlay سوداء شفافة */
  z-index: 0;
}

.container > * {
  position: relative;
  z-index: 1;
}

  .logo {
    font-size: 36px;
    font-weight: bold;
    color: #cce0ff;
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
  }

  .subscribe input {
    padding: 10px;
    width: 250px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
  }

  .subscribe button {
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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

  .label {
    font-size: 12px;
  }

  .subscribe input {
    width: 100%;
    max-width: 250px;
    margin-bottom: 10px;
  }

  .subscribe button {
    width: 100%;
    max-width: 150px;
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
`}</style>

    </div>
  );
}

export default App;

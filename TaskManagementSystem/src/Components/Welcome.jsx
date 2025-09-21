import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import { useTheme } from "../context/ThemeContext";
import Typewriter from "typewriter-effect";

const features = [
  {
    title: "User Authentication",
    desc: "Securely sign up, log in, and manage your access.",
    backText: "Your world. Your rules. No one gets in without the pass! 🙅‍♀️",
  },
  {
    title: "Task Management",
    desc: "Create, edit, delete, and manage your tasks easily.",
    backText: "You don’t manage tasks. You command them! 💪",
  },
  {
    title: "Category & Prioritize",
    desc: "Organize tasks by category and set priorities.",
    backText: "Every second has a job. You’re the boss! 🕒",
  },
  {
    title: "Dashboard & Progress Tracker",
    desc: "Track your productivity with a smart visual dashboard.",
    backText: "Your hustle, visualized. Watch yourself win 😎",
  },
];

const Welcome = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className={`welcome-page ${darkMode ? "dark-mode" : "light-mode"}`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="theme-toggle-btn"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="welcome-container">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            textAlign: "center", // ensures inline content centers properly
            width: "100%", // take full width for centering to work
          }}
        >
          Welcome to&nbsp;
          <span
            style={{
              background: "linear-gradient(90deg, #9a05cc, #b500c6, #2c60eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            <Typewriter
              options={{
                strings: ["PLANNINGS!"],
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 50,
                pauseFor: 1500,
              }}
            />
          </span>
        </h1>

        <p>Organize your tasks. Track your goals. Stay productive.</p>

        <h2 className="features-heading">What You Can Do with PLANNINGS 👇</h2>

        <div className="feature-cards-wrapper">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-card-front">
                <h2>{feature.title}</h2>
                <p>{feature.desc}</p>
              </div>
              <div className="feature-card-back">
                <p>{feature.backText}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate("/auth")} className="get-started-btn">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import { useTheme } from "../../context/ThemeContext";
import "./authStyle.css";

const Auth = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    isLogin
      ? setLoginData((prev) => ({ ...prev, [name]: value }))
      : setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "";
    let data = {};

    if (isLogin) {
      url = "http://localhost:8081/api/auth/login";
      data = loginData;
    } else {
      url = "http://localhost:8081/api/auth/signup";
      data = signupData;
    }

    try {
      const res = await axios.post(url, data);
      alert(res.data);
      if (isLogin && res.status === 200) {
        localStorage.setItem("isLoggedIn", true);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert(
        isLogin
          ? "Invalid credentials or server error"
          : "Signup failed. Check backend."
      );
    }
  };

  return (
    <div className="auth-wrapper">
      <div className={`auth-container ${darkMode ? "dark" : "light"}`}>
        <p>
          {isLogin
            ? "Welcome Back To"
            : "Welcome to the organized side of the world"}
        </p>

        <div className="typewriter-box gradient-text">
          <Typewriter
            options={{
              strings: ["PLANNINGS!", "GROWTH!", "SIMPLICITY!"],
              autoStart: true,
              loop: true,
              delay: 80,
              deleteSpeed: 50,
              pauseFor: 1500,
            }}
          />
        </div>

        {!isLogin && <p>Turn chaos into checklists.</p>}

        <button className="google-btn">
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h146.9c-6.4 34.5-25.7 63.8-54.9 83.5v68h88.7c52-47.9 80.8-118.4 80.8-196.4z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c73.9 0 135.9-24.5 181.2-66.6l-88.7-68c-24.6 16.5-56.2 26.2-92.5 26.2-71 0-131.2-47.9-152.7-112.1h-90.2v70.7C86.4 479 172.3 544.3 272 544.3z"
              />
              <path
                fill="#FBBC05"
                d="M119.3 323.8c-10.3-30.6-10.3-63.4 0-94.1V159H29.1c-30.2 60.5-30.2 132.8 0 193.3l90.2-70.5z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c39.9-.6 78 14 107.3 40.1l80.2-80.2C398.3 25 337.5-1 272 0 172.3 0 86.4 65.3 29.1 159l90.2 70.7c21.5-64.2 81.7-112.1 152.7-112z"
              />
            </svg>
          </span>
          Continue with Google
        </button>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={signupData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={isLogin ? loginData.email : signupData.email}
            onChange={handleChange}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={isLogin ? loginData.password : signupData.password}
              onChange={handleChange}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">{isLogin ? "Login" : "Signup"}</button>

          <p>
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <span onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
              {isLogin ? "Sign up!" : "Login"}
            </span>
          </p>

          {isLogin && (
            <p className="forgot-password-text">
              <span className="auth-toggle">Forgot Password?</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;

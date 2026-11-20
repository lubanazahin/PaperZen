

import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const { signInUser, signInWithGoogle, signInWithGithub } =
    useContext(AuthContext);


  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");

    signInUser(email, password)
      .then((result) => {
        console.log("Logged in:", result.user);
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setError(error.message);
      });
  };


  const handleGoogleLogin = () => {
    setError("");
    signInWithGoogle()
      .then((result) => {
        console.log("Google login:", result.user);
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setError(error.message);
      });
  };

  
  const handleGithubLogin = () => {
    setError("");
    signInWithGithub()
      .then((result) => {
        console.log("GitHub login:", result.user);
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setError(error.message);
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Login</h2>

   
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#000000",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login with Email
        </button>
      </form>

  
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <hr />
        <span style={{ position: "relative", top: "-12px", background: "white", padding: "0 10px" }}>
          OR
        </span>
      </div>

     
      <button
        onClick={handleGoogleLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#080808",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      >
         Login with Google
      </button>


      <button
        onClick={handleGithubLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#242222",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
         Login with GitHub
      </button>

      
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

    
      <p style={{ marginTop: "15px" }}>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;

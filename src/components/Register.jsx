

import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

const Register = () => {
 
  const { createUser } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  
  const handleRegister = (e) => {
    
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    
    setError("");
    setSuccess("");

 
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

   
    createUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        setSuccess("Account created successfully! 🎉");
        e.target.reset();
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setError(error.message);
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Register / Sign Up</h2>

      <form onSubmit={handleRegister}>
      
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
            placeholder="Enter password (min 6 chars)"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

   
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#161616",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Register
        </button>
      </form>


      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}

    
      <p style={{ marginTop: "15px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;

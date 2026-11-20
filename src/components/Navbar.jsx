// ============================================
// Navbar Component
// ============================================
// Navigation bar - links to navigate between pages
// Shows Logout button when user is logged in
// Shows Login/Register links when logged out

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  // Get user & logOut from AuthContext
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error(error));
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#333",
        color: "white",
      }}
    >
      {/* Logo / App Name */}
      <div>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "20px" }}>
          🔥 Firebase Auth
        </Link>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        {/* Conditional rendering: show logout if user exists, otherwise login/register */}
        {user ? (
          <>
            <span style={{ color: "#4CAF50" }}>{user.email}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: "5px 15px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

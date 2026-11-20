// ============================================
// Home Component (Profile Page)
// ============================================
// Shows user info after login
// Logout button is also here

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
  // Get user info & logOut function from AuthContext
  const { user, logOut } = useContext(AuthContext);

  // Logout handler
  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", textAlign: "center" }}>
      <h2>Welcome to Home Page!</h2>

   
      {user ? (
        <div>
          <h3>User Profile</h3>

          {/* User's photo (available when logged in via Google/GitHub) */}
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          )}

          <p><strong>Name:</strong> {user.displayName || "Not provided"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Email Verified:</strong> {user.emailVerified ? "Yes ✅" : "No ❌"}</p>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "20px",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Please login to see your profile.</p>
      )}
    </div>
  );
};

export default Home;

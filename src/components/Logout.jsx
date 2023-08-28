import { useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const Logout = () => {
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    // Send a log-out request to the backend
    axios
      .post("/logout")
      .then(() => {
        setUser(null);
        localStorage.removeItem("access_token");
      })
      .catch((error) => {
        console.error("Log-out error:", error);
      });
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;

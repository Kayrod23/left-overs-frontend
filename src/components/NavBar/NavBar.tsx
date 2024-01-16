import { Link } from 'react-router-dom';
import "./NavBar.css";
import logo from "../../assets/image.png"
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const { isAuthenticated, user } = useAuth0(); 
  return (
    <div className="navbar">
      <div>
        { isAuthenticated ? (
          <>
            <img src={logo} alt="ai_chatgpt_logo"/>
            <Link to="/">LandingPage</Link>
            <Link to="/home">Get Cooking!</Link>
            <img src={user.picture} alt={user.name} />
          </>
        ): (
          <img src={logo} alt="ai_chatgpt_logo"/>
        )}
      </div>
    </div>
  )
}

export default NavBar
import { Link } from 'react-router-dom';
import "./NavBar.css";
import logo from "../../assets/image.png"

function NavBar() {
  return (
    <div className="navbar">
      <div>
      <img src={logo} alt="ai_chatgpt_logo"/>
        <Link to="/">LandingPage</Link>
        <Link to="/home">Get Cooking!</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  )
}

export default NavBar
import { Link } from 'react-router-dom';
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <p>NavBar</p>
      <div>
        <Link to="/home">Get Cooking!</Link>
        <Link to="/">LandingPage</Link>
        {/* <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link> */}
      </div>
    </div>
  )
}

export default NavBar
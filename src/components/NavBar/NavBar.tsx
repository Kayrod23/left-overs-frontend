import { Link } from 'react-router-dom';
import "./NavBar.css";
import logo from "../../assets/image.png"
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="navbar">
      <div>
        { isAuthenticated ? (
          <div className="navbar__container">
            <div className="navbar__logo">
              <img className="navbar-logo__img" src={logo} alt="ai_chatgpt_logo"/>
              <p className="navbar-logo__name">LEFTOVERS</p>
            </div>
            <div className="navbar__menu">
              {/* <Link className="navbar-menu__landingpage" to="/">LandingPage</Link> */}
              <Link className="navbar-menu__recipe" to="/recipes">Recipes</Link>
              <Link className="navbar-menu__home" to="/">Get Cooking!</Link>
              <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
              </button>
              <img className="navbar-menu__img"src={user.picture} alt={user.name}/>
            </div>
          </div>
        ): (
          <div className="navbar__container">
            <div className="navbar__logo">
              <img className="navbar-logo__img" src={logo} alt="ai_chatgpt_logo"/>
              <p className="navbar-logo__name">LEFTOVERS</p>
            </div>
            <button className="" onClick={() => loginWithRedirect()}>Log In</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
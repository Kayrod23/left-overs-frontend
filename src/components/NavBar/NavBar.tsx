import { Link } from 'react-router-dom';
import "./NavBar.css";
import logo from "../../assets/image.png"
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  console.log(isOpen);
  /* <Link className="navbar-menu__landingpage" to="/">LandingPage</Link> */
  return (
    <div className="navbar">
      <div>
        {isAuthenticated ? (
          <div className="navbar__container">
            <Link className="navbar__logo" to="/">
              <img
                className="navbar-logo__img"
                src={logo}
                alt="ai_chatgpt_logo"
              />
              <p className="navbar-logo__name">LEFTOVERS</p>
            </Link>
            <div className="navbar-mobile">
              <div
                className="navbar-menu__ham"
                id={`${isOpen}`}
                onClick={() => toggleMenu()}
              >
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
              {isOpen ? (
                <div className="navbar__open">
                  <ul className="navbar-open__links">
                    <li>
                      <Link to="/">Get Cooking</Link>
                    </li>
                    <li>
                      <Link to="/recipes">Recipes</Link>
                    </li>
                    <li>
                      <p
                        onClick={() =>
                          logout({
                            logoutParams: { returnTo: window.location.origin },
                          })
                        }
                      >
                        Logout
                      </p>
                    </li>
                    <li>
                      <img
                        className="navbar-menu__img"
                        src={user?.picture}
                        alt={user?.name}
                      />
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="navbar__menu">
              <Link className="navbar-menu__home" to="/">
                Get Cooking
              </Link>
              <Link className="navbar-menu__recipe" to="/recipes">
                Recipes
              </Link>
              <p
                className="navbar-menu__logout"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </p>
              <img
                className="navbar-menu__img"
                src={user?.picture}
                alt={user?.name}
              />
            </div>
          </div>
        ) : (
          <div className="navbar__container">
            <div className="navbar__logo">
              <img
                className="navbar-logo__img"
                src={logo}
                alt="ai_chatgpt_logo"
              />
              <p className="navbar-logo__name">LEFTOVERS</p>
            </div>
            <button
              className="navbar__login"
              onClick={() => loginWithRedirect()}
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar
import { Link } from 'react-router-dom';
import "./NavBar.css";
import logo from "../../assets/image.png"
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';

function NavBar() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 750);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);


  return (
    <div className="navbar">
      <div>
        { isAuthenticated ? (
          <div className="navbar__container">
            <div className="navbar__logo">
              <img className="navbar-logo__img" src={logo} alt="ai_chatgpt_logo"/>
              <p className="navbar-logo__name">LEFTOVERS</p>
            </div>
            { isMobile ?
            <div className="">
              <svg stroke="currentColor" fill="none" className="navbar-menu__ham" stroke-width="0" viewBox="0 0 15 15" height="50px" width="30px" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor"></path>
              </svg>
            </div>
             : 
            <div className="navbar__menu">
             {/* <Link className="navbar-menu__landingpage" to="/">LandingPage</Link> */}
             <Link className="navbar-menu__recipe" to="/recipes">Recipes</Link>
             <Link className="navbar-menu__home" to="/">Get Cooking</Link>
             <p className="navbar-menu__logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
               Log Out
             </p>
             <img className="navbar-menu__img" src={user?.picture} alt={user?.name}/>
            </div>
             }
          </div>
        ) : (
          <div className="navbar__container">
            <div className="navbar__logo">
              <img className="navbar-logo__img" src={logo} alt="ai_chatgpt_logo"/>
              <p className="navbar-logo__name">LEFTOVERS</p>
            </div>
            <button className="navbar__login" onClick={() => loginWithRedirect()}>Get Started</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
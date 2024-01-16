import { useAuth0 } from "@auth0/auth0-react";
import "./LandingPage.css";

function LandingPage() {
  const { loginWithRedirect, logout, isAuthenticated} = useAuth0();

  return (
    <div className="landingPage">
      <img className="landingPage__img" src="/ingrediants.jpg" alt="ingrediants"/>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
      {isAuthenticated && (
      <div>
        <img className="landingPage__img" src="/ingrediants.jpg" alt="ingrediants"/>
        <button> Get Cooking!</button>
        {/* <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p> */}
      </div>
    )}
    </div>
  );
}

export default LandingPage;
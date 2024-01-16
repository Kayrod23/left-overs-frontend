import { useAuth0 } from "@auth0/auth0-react";
import "./LandingPage.css";

function LandingPage() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="landingPage">
      {isAuthenticated ? (
      <div>
        <button> Get Cooking!</button>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
        {/* <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p> */}
      </div>
    ) : (
      <button onClick={() => loginWithRedirect()}>Log In</button>
    )}
    </div>
  );
}

export default LandingPage;
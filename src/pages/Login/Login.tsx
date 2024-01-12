import { Link } from 'react-router-dom';
import "./Login.css";

function LogIn() {
  return (
    <div className="login">
      <div className="loginForm">
        <Link to="/">Image placeholder</Link>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
        <h1>Left Overs</h1>
        <form>
          <input placeholder="Email address" type="text"/>
          <input placeholder="Password" type="text"/>
        </form>
        <div>
          <button>Login</button>
          <button>Sign in with Google</button>
        </div>
      </div>
    </div>
  )
}

export default LogIn;
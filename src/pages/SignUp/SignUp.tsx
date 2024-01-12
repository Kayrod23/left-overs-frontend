import { Link } from 'react-router-dom';
import "./SignUp.css";

function SignUp() {
  return (
    <div className="signup">
    <div className="signUpForm">
      <Link to="/">Image placeholder</Link>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
      <h1>Left Overs</h1>
      <form>
        <div>
          <input placeholder="First Name" type="text"/>
          <input placeholder="Last Name" type="text"/>
        </div>
        <input placeholder="Email address" type="text"/>
        <input placeholder="Password" type="text"/>
      </form>
      <div>
        <button>Sign up</button>
        <button>Sign up with Google</button>
      </div>
    </div>
  </div>
  )
}

export default SignUp
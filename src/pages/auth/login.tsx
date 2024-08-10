import { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { login } from '../../config/firebaseMethods';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
    } else {
      setError('');
      // Handle login logic here
      const loginUser:any = await login(email,password)
      if(loginUser){
        navigate('/dashboard')
      }else{
        alert("Wrong email or pass")
      }
      console.log('Logging in with:', { email, password });
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="card login-card">
        <div className="card-header text-center"><img src='https://seeklogo.com/images/B/booking-logo-504475D532-seeklogo.com.png' width="140" style={{padding:"10px"}}  /></div>
        <div className="card-header text-center">Login</div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <Link to='/sign-up' ><p className='text-center' >Sign Up</p></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

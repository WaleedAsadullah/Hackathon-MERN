import { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { signup } from '../../config/firebaseMethods';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      const user:any = signup(email,password).then(()=>{
        if(user){
          navigate('/')
        }else{
          setError("Something went wrong")
        }
      })
    }
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center">
      <div className="card signup-card">
      <div className="card-header text-center"><img src='https://seeklogo.com/images/B/booking-logo-504475D532-seeklogo.com.png' width="140" style={{padding:"10px"}}  /></div>
        <div className="card-header text-center">Sign Up</div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit} >Sign Up</button>
          <Link to='/' ><p className='text-center' >Login in</p></Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

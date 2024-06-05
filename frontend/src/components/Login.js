// import React, { useState } from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import axios from '../utils/axios';
// import email_icon from './Assets/email.png';
// import password_icon from './Assets/password.png';
// import './form-styles.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/login', {
//         email,
//         password,
//       });
//       console.log('Login successful:', response.data);
//       // Save token to local storage
//       localStorage.setItem('token', response.data.token);
//       // Redirect to dashboard upon successful login
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="header">
//         <div className="text">Login</div>
//       </div>
//       <div className="inputs">
//         <div className="input">
//           <img src={email_icon} alt="Email Icon" />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="input">
//           <img src={password_icon} alt="Password Icon" />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="submit-container">
//           <div className="submit" onClick={handleSubmit}>
//             Login
//           </div>
//           <div className="added-text">
//             Don't? have an account? <Link to="/register">Sign Up</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import './form-styles.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Save token to local storage
      localStorage.setItem('token', response.data.token);
      // Redirect to dashboard upon successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Check if error is due to wrong password
      if (error.response && error.response.status === 400 && error.response.data.message === 'Invalid email or password') {
        setErrorMessage('Wrong email or password. Please try again.');
        setTimeout(() => {
          setErrorMessage('');
        }, 10000); // Hide error message after 10 seconds
      } else {
        // For other errors, display generic error message
        setErrorMessage('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
      </div>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="Email Icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="Password Icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            Login
          </div>
          <div className="added-text">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

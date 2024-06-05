

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../utils/axios';
// import user_icon from './Assets/person.png';
// import email_icon from './Assets/email.png';
// import password_icon from './Assets/password.png';
// import './form-styles.css';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     try {
//       const response = await axios.post('/register', {
//         name,
//         email,
//         password,
//         dob,
//       });
//       console.log('Registration successful:', response.data);
//       // Redirect to dashboard upon successful registration
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Registration failed:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="header">
//         <div className="text">Sign Up</div>
//       </div>
//       <div className="inputs">
//         <div className="input">
//           <img src={user_icon} alt="" />
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="input">
//           <img src={user_icon} alt="" />
//           <input
//             type="date"
//             placeholder="Date of Birth"
//             value={dob}
//             onChange={(e) => setDob(e.target.value)}
//           />
//         </div>
//         <div className="input">
//           <img src={email_icon} alt="" />
//           <input
//             type="email"
//             placeholder="Email ID"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="input">
//           <img src={password_icon} alt="" />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="submit-container">
//           <div className="submit" onClick={handleSubmit}>
//             Sign Up
//           </div>
//           <div className="added-text">
//             Already have an account? <Link to="/login">Login</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import './form-styles.css';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', {
        name,
        email,
        password,
        dob,
      });
      console.log('Registration successful:', response.data);
      // Redirect to dashboard upon successful registration
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      // Check if error is due to existing email
      if (error.response && error.response.status === 400 && error.response.data.message === 'User with this email already exists') {
        setErrorMessage('User with this email already exists. Please use a different email.');
      } else {
        // For other errors, display generic error message
        setErrorMessage('Registration failed. Please try again .');
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
      </div>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={user_icon} alt="" />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            Sign Up
          </div>
          <div className="added-text">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

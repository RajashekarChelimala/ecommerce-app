import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmail } from './EmailContext';
import axios from 'axios';
import MultiPageFormModal from './MultiPageFormModal'; // Import the MultiPageFormModal component

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [allUsernames, setAllUsernames] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control the modal

  const { setEmail } = useEmail();
  const navigate = useNavigate();

  // Function to check if the email address does not have the extension "gmail.com"
  const isNonGmailEmail = (email) => {
    const emailParts = email.split('@');
    if (emailParts.length === 2) {
      const domain = emailParts[1].toLowerCase();
      return domain !== 'gmail.com';
    }
    return false;
  };

  useEffect(() => {
    // Fetch the list of all usernames when the component mounts
    axios.get('http://localhost:8080/api/users/all-usernames')
      .then(response => {
        setAllUsernames(response.data); // Assuming the response contains an array of usernames
      })
      .catch(error => {
        console.error('Failed to fetch usernames:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username' && /\s/.test(value)) {
      // If it contains spaces, set an error message and mark it as invalid
      setIsUsernameAvailable(false);
    } else {
      // If it doesn't contain spaces, update the form data and check availability
      setFormData({ ...formData, [name]: value });

      if (name === 'username') {
        // Check username availability by comparing with the list of usernames
        setIsUsernameAvailable(!allUsernames.includes(value));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUsernameAvailable === false) {
      // Username is already taken, prevent form submission
      return;
    }

    try {
      setEmail(formData.email);

      const response = await axios.post('http://localhost:8080/api/users/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Successful registration, navigate to OTP verification
        navigate(`/verify-otp`);
      } else {
        // Handle registration failure, e.g., display an error message
        console.error('Registration failed');
      }
    } catch (error) {
      // Handle network errors, e.g., display a network error message
      console.error('Network error:', error);
    }
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Sign Up</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className={`form-control${isUsernameAvailable === false ? ' is-invalid' : ''}`}
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  {isUsernameAvailable === false && (
                    <div className="invalid-feedback">Username is already taken.. Try other</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3" onClick={() => setShowModal(true)}>
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isNonGmailEmail(formData.email) && showModal && (
        <MultiPageFormModal showModal={showModal} handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Signup;

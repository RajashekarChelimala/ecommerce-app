import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export const Navbar = () => {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Check the token initially when the component mounts
    useEffect(() => {
        // Get the token from local storage
        const token = localStorage.getItem('token');

        // Update the isAuthenticated state when the token changes
        setIsAuthenticated(!!token);
    }, []);


    // Update the isAuthenticated state when the token changes
    useEffect(() => {
        // Update the isAuthenticated state when the token changes
        setIsAuthenticated(!!localStorage.getItem('token'));
    }, [localStorage.getItem('token')]);


    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        // Update the isAuthenticated state immediately
        setIsAuthenticated(false);
        // Navigate to the login page
        navigate('/login');
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'yellow' }}>
            <Link className="navbar-brand" to="/">
                <img src="/logo.png" width="30" height="30" alt="Logo" className='mx-2 align-top' />
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/categories">Categories</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact us</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                    </li>
                    {!isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Signup</Link>
                            </li>
                        </>
                    )}
                    {isAuthenticated && (
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>

    );
}

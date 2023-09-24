import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ isAuthenticated }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand ms-3" to="/home">
                <img src="/logo.png" width="30" height="30" alt="Logo" className='mx-2'/>
                Home
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Categories</Link>
                    </li>
                </ul>

                <ul className="navbar-nav justify-content-end">
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                    </li>

                    {!isAuthenticated && <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>}
                    {!isAuthenticated &&
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Signup</Link>
                        </li>}
                </ul>
            </div>
            {isAuthenticated && (
                <ul className='navbar-nav me-3'>
                    <li className="nav-item m">
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
}

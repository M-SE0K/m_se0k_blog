import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './Header.css';
import Home from '../home/HomeMain';
import Blog from '../blog/BlogMain';
import {handleAuth} from '../auth/AuthUtil';

function Header(){
    const navigate = useNavigate();

    const handleAuthClick = () => {
        navigate('/signin');
    }


    return(
        <div id='header container'>
            <header className={'app-header'}>
                <div className='header-left'>
                    <div>
                        <ul className='nav-links'>
                            <li><Link to="/">HOME</Link></li>
                            <li><Link to="/blog">BLOG</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='header-right'>
                    <button className='login-logout-button' onClick={handleAuthClick}>
                        login
                    </button>
                </div>
            </header>
        </div>
    );
};

export default Header;
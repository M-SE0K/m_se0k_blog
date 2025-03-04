import React, {useState, useEffect} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './Header.css';
import Home from '../home/HomeMain';
import Blog from '../blog/BlogMain';
import {AuthUtil} from '../auth/AuthUtil';
import Signin from '../auth/sign-in/Signin';

function Header(){
    const navigate = useNavigate();
    
    //로그인 상태 관리 : 로컬스토리지에 저장된 token을 이용한 상태 관리
    const [mode, setMode] = useState(AuthUtil.isAuthenticated() ? "logout" : "signin");
    
    useEffect(() => {
        // 로그인 상태 변경을 감지하는 함수
        const checkAuthStatus = () => {
            setMode(AuthUtil.isAuthenticated() ? "logout" : "signin");
        };

        // 'storage' 이벤트 감지를 통해 다른 탭에서도 로그인 상태 동기화 가능
        window.addEventListener("storage", checkAuthStatus);

        return () => {
            window.removeEventListener("storage", checkAuthStatus);
        };
    }, []);

    // 로그인 또는 로그아웃 버튼 클릭 시
    const handleAuthClick = () => {
        if (mode === "logout") {
            AuthUtil.logout();
            setMode("signin"); // 상태 업데이트
        }
        navigate('/signin');
    };

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
                        {mode == "signin" ? "로그인" : "로그아웃"}
                    </button>
                </div>
            </header>
        </div>
    );
};

export default Header;
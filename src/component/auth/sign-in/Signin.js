import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUtil } from "../AuthUtil";
import "./Signin.css";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 저장

    const navigate = useNavigate();
    const [mode, setMode] = useState("signin");

    // 로그인 상태 확인 후 자동 로그인 유지
    useEffect(() => {
        if (AuthUtil.isAuthenticated()) {
            setIsLoggedIn(true);
        }
    }, []);

    /**
     * 로그인 핸들러
     * - `AuthUtil.login`을 호출하여 토큰 기반 로그인 처리
     * - 로그인 성공 시 로그인 상태를 true로 변경
     */
    const handleLogin = (event) => {
        event.preventDefault();
        const result = AuthUtil.login(email, password);
        if (result.success) {
            alert(result.message);
            setIsLoggedIn(true); // 로그인 상태 변경
            navigate("/home"); // 로그인 성공 시 홈 화면 이동
        } else {
            setErrorMessage(result.message);
        }
    };

    /**
     * 회원가입 핸들러
     * - 비밀번호 일치 여부 확인 후 `AuthUtil.register` 호출
     * - 성공 시 로그인 페이지로 전환
     */
    const handleRegister = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        const result = AuthUtil.register(email, password);
        if (result.success) {
            alert(result.message);
            setMode("signin"); // 회원가입 후 로그인 페이지로 전환
        } else {
            setErrorMessage(result.message);
        }
    };

    /**
     * 로그아웃 핸들러
     * - `AuthUtil.logout()`을 호출하여 로그인 상태 초기화
     */
    const handleLogout = () => {
        AuthUtil.logout();
        setIsLoggedIn(false);
        alert("로그아웃 되었습니다.");
    };

    return (
        <div className="signin-container">
            <div className="signin-modal">
                {/* 로그인한 상태라면 로그아웃 버튼 표시 */}
                {isLoggedIn ? (
                    <div>
                        <h2 className="signin-title">이미 로그인된 상태입니다.</h2>
                        <button className="signin-button" onClick={handleLogout}>로그아웃</button>
                    </div>
                ) : (
                    <>
                        <h2 className="signin-title">{mode === "signin" ? "로그인" : "회원가입"}</h2>

                        {errorMessage && <p className="signin-error">{errorMessage}</p>}

                        <input 
                            type="email" 
                            placeholder="이메일을 입력해주세요!" 
                            className="signin-input"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="비밀번호를 입력해주세요!" 
                            className="signin-input"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {mode === "signup" && (
                            <input 
                                type="password" 
                                placeholder="비밀번호를 다시 한 번 입력해주세요!" 
                                className="signin-input"
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        )}

                        {mode === "signin" ? (
                            <div className="signin-checkbox-container">
                                <input type="checkbox" id="remember" className="signin-checkbox" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                        ) : (
                            <div className="signin-checkbox-container">
                                <input type="checkbox" id="terms" className="signin-checkbox" />
                                <label htmlFor="terms">이용약관에 동의합니다.</label>
                            </div>
                        )}

                        <button 
                            className="signin-button"
                            onClick={mode === "signin" ? handleLogin : handleRegister}
                        >
                            {mode === "signin" ? "로그인" : "회원가입"}
                        </button>

                        <p>
                            {mode === "signin" ? "계정이 없으신가요? " : "이미 계정이 있으신가요? "}
                            <span 
                                className="signin-link"
                                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                            >
                                {mode === "signin" ? "회원가입" : "로그인"}
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Signin;

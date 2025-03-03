import React, { useState, useNavigate } from "react";
import { Modal } from "react-bootstrap";
//first commit
const LoginSignup = () => {
    //로그인 및 회원가입 공통 핖드
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginCheck, setLoginCheck] = useState('');
    
    const [confirmPassword, setConfirmPassword] = useState('');


    //로그인 성공 및 실패시 네비게이션
    const navigate = useNavigate(); 

    const handleLogin = async (event)=>{
        //로그인 핸들러 (비동기 처리)
        event.preventDefault();
        await new Promise((r) => setTimeout(r, 1000));

        const response = await fetch(
            "로그인 서버 주소",
            {

            }
        )
    }
    
    //폼 동적 렌더링
    const [mode, setMode] = useState("signin");
    const [show, setShow] = useState(true);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <div>
                    <h2>{mode === "signin" ? "Sign In" : "Sign Up"}</h2>

                    <input type="email" placeholder="Enter your email" value = {email}/>
                    <input type="password" placeholder="Enter your password" value = {password}/>
                    {/* email, password 유효성 검사 로직 추가할 것. */}

                    {mode === "signup" && <input type="password" placeholder="Confirm your password" value = {confirmPassword}/>}
                    {mode === "signin" ? (
                        <div>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                    ) : (
                        <div>
                            <input type="checkbox" id="terms" />
                            <label htmlFor="terms">I agree to the Terms and Conditions</label>
                        </div>
                    )}

                    <button>{mode === "signin" ? "Login" : "Register"}</button>
                    <p>
                        {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                        <span onClick={() => setMode(mode === "signin" ? "signup" : "signin")} style={{ cursor: "pointer", color: "blue" }}>
                            {mode === "signin" ? "Sign up" : "Sign in"}
                        </span>
                    </p>

                    <button onClick={handleClose}>Close</button>
                    {/* 로그인 및 회원가입 폼 닫는 버튼 */}
                </div>
            </Modal>
        </div>
    );
};

export default LoginSignup;
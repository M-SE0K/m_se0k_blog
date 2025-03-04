// src/AuthUtil.js
export const AuthUtil = {
    /**
     * 회원가입 함수
     * - 기존 사용자 목록을 확인하여 중복 가입 방지
     * - 비밀번호를 저장하여 사용자 추가
     */
    register: (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // 이메일 중복 검사
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            console.log("이미 가입된 이메일입니다.")
            return { success: false, message: "이미 가입된 이메일입니다." };
        }

        // 새로운 사용자 추가
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));

        console.log("회원가입 성공!")
        return { success: true, message: "회원가입 성공!" };
    },

    /**
     * 로그인 함수
     * - 이메일과 비밀번호를 확인 후 로그인 처리
     * - 로그인 성공 시 토큰을 생성하여 로컬 스토리지에 저장
     */
    login: (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            // 토큰 생성 (간단한 랜덤 문자열)
            const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
            
            console.log("토근 생성완료 : ", token);

            // 현재 로그인한 유저 정보 및 토큰 저장
            localStorage.setItem("authToken", token);
            localStorage.setItem("currentUser", JSON.stringify({ email, token }));

            window.dispatchEvent(new Event("storage"));

            console.log("로그인 성공!");
            return { success: true, message: "로그인 성공!", token };
        } else {
            return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
        }
    },

    /**
     * 로그아웃 함수
     * - 저장된 토큰 및 사용자 정보를 삭제
     */
    logout: () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");

        window.dispatchEvent(new Event("storage"));
    },

    /**
     * 현재 로그인한 사용자 가져오기
     * - 로컬 스토리지에서 유저 정보를 불러옴
     */
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem("currentUser"));
    },

    /**
     * 로그인 상태 확인 함수
     * - 로컬 스토리지에 저장된 토큰이 있는지 확인
     */
    isAuthenticated: () => {
        return !!localStorage.getItem("authToken");
    }
};

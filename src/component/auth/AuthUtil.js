import React from 'react';

export const tryLogin = async (email, password) => {
    try {
        const response = await fetch("http://localhost:3000/signin", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            // 로그인 성공 시 로컬 스토리지에 토큰 저장
            localStorage.setItem("token", data.token);
            return { success: true, user: data.user };
        } else {
            return { success: false, message: data.message || "Login failed" };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};

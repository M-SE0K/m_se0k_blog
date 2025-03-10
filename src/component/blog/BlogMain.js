import React from 'react';
import './BlogMain.css';

function BlogMain() {
    return (
        <div className="blog-container">
            {/* 왼쪽 - 오늘 가장 핫한 블로그 */}
            <div className="blog-hot-container">
                <h2>오늘 가장 핫한 블로그</h2>
            </div>

            {/* 오른쪽 - 새롭게 작성된 블로그, 구독한 블로그, 내 블로그 */}
            <div className="blog-right-container">
                <div className="blog-new-container">
                    <h2>새롭게 작성된 블로그</h2>
                </div>
                <div className="blog-sub-container">
                    <h2>구독한 블로그</h2>
                </div>
                <div className="blog-my-container">
                    <h2>내 블로그</h2>
                </div>
            </div>
        </div>
    );
}

export default BlogMain;

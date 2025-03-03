import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/layout/Header';
import BlogMain from './component/blog/BlogMain';
import HomeMain from './component/home/HomeMain';
import LoginSignup from './component/auth/sign-in/Signin';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<HomeMain/>}></Route>
          <Route path="/blog" element={<BlogMain/>}></Route>
          <Route path="/signin" element={<LoginSignup/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

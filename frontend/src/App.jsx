import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import LatestArticles from './components/LatestArticles';
import Principles from './pages/Principles';
import Sport from './pages/Sport'
import Contact from "./pages/Contact.jsx";
import Blog from "./pages/Blog.jsx";
import Courses from "./pages/Courses.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Admin from "./pages/Admin.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";

const Home = () => (
  <>
    <Hero />
    <AboutMe />
    <LatestArticles />
  </>
);

function App() {
  return (
    <Router>
        <ScrollToTop />
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/principy" element={<Principles />} />
            <Route path="/sport" element={<Sport />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blog/:id" element={<ArticleDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        <Footer />
    </Router>
  );
}

export default App;
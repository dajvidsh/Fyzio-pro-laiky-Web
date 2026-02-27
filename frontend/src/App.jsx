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
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />

        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/principy" element={<Principles />} />
            <Route path="/sport" element={<Sport />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            {/* Tady můžeš přidávat další stránky:
            <Route path="/kontakt" element={<Contact />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
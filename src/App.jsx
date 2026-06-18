import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Apps from './Apps';
import About from './About';
import Music from './Music';
import Contact from './Contact';

import './App.css'


function App() {

  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/about" element={<About />} />
          <Route path="/music" element={<Music />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </main>
    </Router>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css';         // Core CSS
import 'primeicons/primeicons.css';

import Home from './views/home';
import Test from './views/test';
import About from './views/about';

function App() {
  return (
    <Router basename="/evan-app">
      <Routes className="route-body">
        <Route path="/" element={<Home />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

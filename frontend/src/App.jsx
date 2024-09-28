import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import PostMessage from './pages/PostMessage/index.jsx';
import './App.css';
import './styles/GlobalStyles.css'; // Importera global CSS
import './styles/MessageList.css'; // Importera MessageList CSS

function App() {
  return (
    <Router>
      <div>
        <h1>Anslagstavla!</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostMessage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import Navbar from "./components/ Navbar";
import CreatePost from "./pages/CreatePost/CreatePost";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

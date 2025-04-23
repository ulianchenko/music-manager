import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TrackListPage from "./pages/TrackListPage";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrackListPage />} />
        <Route path="/tracks" element={<TrackListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
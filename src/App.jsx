import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Generator from './pages/Generator';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import TemplateSelection from './pages/TemplateSelection';
import AppStoreLanding from './pages/AppStoreLanding';
import './styles/global.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/select-template" element={<TemplateSelection />} />
                <Route path="/generator" element={<Generator />} />
                <Route path="/view/:shortId" element={<LandingPage />} />
                <Route path="/app/:shortId" element={<AppStoreLanding />} />
            </Routes>
        </Router>
    );
}

export default App;

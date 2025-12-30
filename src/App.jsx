import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Generator from './pages/Generator';
import StaticGenerator from './pages/StaticGenerator';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import TemplateSelection from './pages/TemplateSelection';
import AppStoreLanding from './pages/AppStoreLanding';
import Statistics from './pages/Statistics';
import CreateWithAI from './pages/CreateWithAI';
import './styles/global.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create-ai" element={<CreateWithAI />} />
                <Route path="/select-template" element={<TemplateSelection />} />
                <Route path="/generator" element={<Generator />} />
                <Route path="/static-generator" element={<StaticGenerator />} />
                <Route path="/view/:shortId" element={<LandingPage />} />
                <Route path="/app/:shortId" element={<AppStoreLanding />} />
                <Route path="/statistics/:id" element={<Statistics />} />
            </Routes>
        </Router>
    );
}

export default App;

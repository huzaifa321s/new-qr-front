import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Generator from './pages/Generator';
import StaticGenerator from './pages/StaticGenerator';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import TemplateSelection from './pages/TemplateSelection';
import AppStoreLanding from './pages/AppStoreLanding';
import Statistics from './pages/Statistics';
import CreateWithAI from './pages/CreateWithAI';
import { AxiosLoaderProvider } from './context/AxiosLoaderContext';
import GlobalLoader from './components/GlobalLoader';
import { Toaster } from 'react-hot-toast';
import './styles/global.css';

function App() {
    return (
        <AxiosLoaderProvider>
            <GlobalLoader />
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: '#0f172a', // Darker background (Slate 900) to match dashboard
                        color: '#f8fafc', // Slate 50
                        border: '1px solid #334155', // Slate 700
                        borderRadius: '12px',
                        padding: '12px 24px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981', // Emerald 500
                            secondary: '#0f172a',
                        },
                        style: {
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                        }
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444', // Red 500
                            secondary: '#0f172a',
                        },
                        style: {
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                        }
                    },
                    loading: {
                        iconTheme: {
                            primary: '#ffa305', // Orange for loading
                            secondary: '#0f172a',
                        },
                        style: {
                            border: '1px solid rgba(255, 163, 5, 0.2)',
                        }
                    }
                }}
            />
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
        </AxiosLoaderProvider>
    );
}

export default App;

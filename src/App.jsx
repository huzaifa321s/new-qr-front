import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Context
import { AxiosLoaderProvider } from './context/AxiosLoaderContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Sidebar from './components/Sidebar';
import GlobalLoader from './components/GlobalLoader';

// Pages
import Dashboard from './pages/Dashboard';
import CreateQR from './pages/Generator';
import EditQR from './pages/Generator';
import LandingPage from './pages/LandingPage';
import TemplateSelection from './pages/TemplateSelection';
import StaticGenerator from './pages/StaticGenerator';
import Statistics from './pages/Statistics';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AdminStats from './pages/AdminStats';
import Settings from './pages/Settings';

// Private Route Wrapper
const PrivateRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, loading, user } = useAuth();
    
    if (loading) return null; // Or a specific loading spinner
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && user?.role !== 'admin') {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

// Layout Wrapper (Sidebar + Content)
const Layout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setCollapsed] = useState(false);
    const location = useLocation();

    // Pages that should NOT have the sidebar
    const noSidebarRoutes = ['/view/', '/login', '/signup'];
    // Check if current path starts with any of the noSidebarRoutes
    const showSidebar = !noSidebarRoutes.some(route => location.pathname.startsWith(route));

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
            {showSidebar && (
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    onClose={() => setSidebarOpen(false)}
                    onToggle={(newCollapsedState) => setCollapsed(newCollapsedState)} 
                    collapsed={isCollapsed}
                />
            )}

            <div style={{ 
                flex: 1, 
                marginLeft: (showSidebar) ? (isCollapsed ? '80px' : '260px') : '0',
                transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: '100%',
                position: 'relative',
                maxWidth: (showSidebar) ? `calc(100vw - ${isCollapsed ? '80px' : '260px'})` : '100vw'
            }} className="content-area">
                <style>{`
                    @media (max-width: 768px) {
                        .content-area {
                            margin-left: 0 !important;
                            max-width: 100vw !important;
                        }
                    }
                `}</style>
                {children}
            </div>
        </div>
    );
};

const AppContent = () => {
    return (
        <Layout>
            <AnimatePresence mode="wait">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/view" element={<LandingPage />} />
                    <Route path="/view/:shortId" element={<LandingPage />} />
                    
                    {/* Protected Routes */}
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/select-template" element={<PrivateRoute><TemplateSelection /></PrivateRoute>} />
                    <Route path="/generator" element={<PrivateRoute><CreateQR /></PrivateRoute>} />
                    <Route path="/static-generator" element={<PrivateRoute><StaticGenerator /></PrivateRoute>} />
                    <Route path="/edit/:id" element={<PrivateRoute><EditQR /></PrivateRoute>} />
                    <Route path="/stats/:id" element={<PrivateRoute><Statistics /></PrivateRoute>} />

                    {/* Admin Routes */}
                    <Route path="/admin/stats" element={<PrivateRoute adminOnly={true}><AdminStats /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute adminOnly={true}><Settings /></PrivateRoute>} />
                </Routes>
            </AnimatePresence>
        </Layout>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <AxiosLoaderProvider>
                    <GlobalLoader />
                    <Toaster position="top-right" toastOptions={{
                        style: {
                            background: '#1e293b',
                            color: '#fff',
                            border: '1px solid #334155'
                        }
                    }} />
                    <AppContent />
                </AxiosLoaderProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;

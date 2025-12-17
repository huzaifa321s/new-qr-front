import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, BarChart, FileText, Home } from 'lucide-react';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

    return (
        <div style={{
            width: '240px',
            background: '#fff',
            borderRight: '1px solid #e5e5e5',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0,
            height: '100vh',
            maxHeight: '100vh',
            flexShrink: 0
        }}>
            {/* Logo */}
            <div style={{
                padding: '1.5rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
            }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                }}>
                    Q
                </div>
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#000', lineHeight: 1 }}>QR</div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#000', lineHeight: 1 }}>INSIGHT</div>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '0 0.75rem' }}>
                <button
                    onClick={() => navigate('/select-template')}
                    style={{
                        width: '100%',
                        background: '#000',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.625rem',
                        borderRadius: '6px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.875rem'
                    }}
                >
                    <Plus size={16} /> Create New QR
                </button>

                <div
                    onClick={() => navigate('/')}
                    style={{
                        padding: '0.625rem 1rem',
                        background: isActive('/') && !isActive('/statistics') ? '#7c3aed' : 'transparent',
                        color: isActive('/') && !isActive('/statistics') ? '#fff' : '#666',
                        borderRadius: '6px',
                        marginBottom: '0.5rem',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <div style={{ width: '4px', height: '4px', background: isActive('/') && !isActive('/statistics') ? '#fff' : '#666', borderRadius: '50%' }}></div>
                    My QR Codes
                </div>

                <div
                    onClick={() => toast.info('Coming Soon', { duration: 2000 })}
                    style={{
                        padding: '0.625rem 1rem',
                        background: 'transparent',
                        color: '#666',
                        borderRadius: '6px',
                        marginBottom: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <BarChart size={16} />
                    Statistics
                </div>
            </nav>

            {/* Support */}
            <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '1rem', padding: '1rem 1.5rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#999', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Support</div>
                <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ fontSize: '1rem' }}>?</div>
                    Help Center
                </div>
                <div style={{ fontSize: '0.875rem', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ fontSize: '1rem' }}>💬</div>
                    Contact Us
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

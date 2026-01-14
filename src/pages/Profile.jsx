import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
            color: '#f8fafc',
            fontFamily: '"Inter", sans-serif'
        }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>My Profile</h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: '#1e293b',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid #334155'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ffa305 0%, #f59e0b 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#000', fontSize: '2rem', fontWeight: '700'
                    }}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>{user?.name}</h2>
                        <span style={{
                            background: user?.role === 'admin' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                            color: user?.role === 'admin' ? '#f87171' : '#34d399',
                            padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>
                            {user?.role}
                        </span>
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <User size={20} color="#94a3b8" />
                        <div>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.1rem' }}>Full Name</p>
                            <p style={{ fontWeight: '500' }}>{user?.name}</p>
                        </div>
                    </div>

                    <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Mail size={20} color="#94a3b8" />
                        <div>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.1rem' }}>Email Address</p>
                            <p style={{ fontWeight: '500' }}>{user?.email}</p>
                        </div>
                    </div>

                    <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Shield size={20} color="#94a3b8" />
                        <div>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.1rem' }}>Account ID</p>
                            <p style={{ fontWeight: '500', fontFamily: 'monospace' }}>{user?.id}</p>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #334155' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.75rem 1.5rem', background: 'rgba(239, 68, 68, 0.1)',
                            color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '12px', cursor: 'pointer', fontWeight: '600',
                            fontSize: '0.9rem', transition: 'all 0.2s'
                        }}
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;

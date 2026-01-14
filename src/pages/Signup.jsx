import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import logoLoader from '../assets/logo-loader.jpg';
import { Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const { name, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        const success = await register({ name, email, password });
        setIsLoading(false);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            background: '#0f172a',
            color: '#f8fafc',
            fontFamily: '"Inter", sans-serif',
            overflow: 'hidden'
        }}>
            {/* Left Side - Image/Branding */}
            <div style={{
                flex: 1,
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                display: 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '4rem',
                position: 'relative',
                '@media (min-width: 1024px)': { display: 'flex' }
            }} className="hidden lg:flex">
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 163, 5, 0.05) 0%, transparent 50%)'
                }} />
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', zIndex: 10 }}
                >
                    <div style={{
                        width: '120px', height: '120px', borderRadius: '24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden',
                        border: '4px solid #ffa305',
                        boxShadow: '0 0 40px rgba(255, 163, 5, 0.2)',
                        margin: '0 auto 2rem'
                    }}>
                        <img src={logoLoader} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-1px' }}>
                        Join QR<span style={{ color: '#ffa305' }}>INSIGHT</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '400px', lineHeight: '1.6' }}>
                        Start creating professional dynamic QR codes for your business today.
                    </p>
                </motion.div>
            </div>

            {/* Right Side - Signup Form */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%', maxWidth: '420px' }}
                >
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Create Account</h2>
                        <p style={{ color: '#94a3b8' }}>Enter your details to get started.</p>
                    </div>

                    <form onSubmit={onSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                                Full Name
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    required
                                    placeholder="John Doe"
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem 0.875rem 3rem',
                                        background: '#1e293b',
                                        border: '1px solid #334155',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#ffa305'}
                                    onBlur={(e) => e.target.style.borderColor = '#334155'}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                    placeholder="john@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem 0.875rem 3rem',
                                        background: '#1e293b',
                                        border: '1px solid #334155',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#ffa305'}
                                    onBlur={(e) => e.target.style.borderColor = '#334155'}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem 0.875rem 3rem',
                                        background: '#1e293b',
                                        border: '1px solid #334155',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#ffa305'}
                                    onBlur={(e) => e.target.style.borderColor = '#334155'}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: '#ffa305',
                                color: '#000',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'transform 0.2s',
                                opacity: isLoading ? 0.8 : 1
                            }}
                        >
                            {isLoading ? <Loader className="animate-spin" size={20} /> : 'Create Account'}
                            {!isLoading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#ffa305', fontWeight: '600', textDecoration: 'none' }}>
                            Sign in
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;

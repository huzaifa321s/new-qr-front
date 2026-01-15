import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Settings, Eye, Sparkles, Zap, LayoutGrid } from 'lucide-react';
import { qrTypes } from '../utils/qrTypes';
import MobilePreview from '../components/MobilePreview';
import { getPreviewConfig } from '../utils/previewConfigs';
import { motion, AnimatePresence } from 'framer-motion';
import logoLoader from '../assets/logo-loader.jpg';

const TemplateSelection = () => {
    const [selectedType, setSelectedType] = useState('app-store');
    const [activeTab, setActiveTab] = useState('generator');
    // Switch to Tabbed View on screens < 1100px to ensure Preview is easy to find and not squeezed
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1100);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleContinue = () => {
        if (selectedType) {
            navigate('/generator', { state: { selectedType } });
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0f172a',
            color: '#f8fafc',
            fontFamily: '"Inter", sans-serif',
            overflowX: 'hidden'
        }}>
            {/* Top Navigation Bar */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    background: 'rgba(30, 41, 59, 0.8)',
                    backdropFilter: 'blur(12px)',
                    padding: isMobile ? '1rem' : '1rem 2rem',
                    borderBottom: '1px solid #334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50
                }}
            >
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', fontWeight: '800' }}>
                    <div style={{
                        width: isMobile ? '32px' : '36px', height: isMobile ? '32px' : '36px', borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden',
                        border: '2px solid #ffa305'
                    }}>
                        <img src={logoLoader} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                        <span style={{ fontSize: isMobile ? '0.9rem' : '1rem', color: '#fff' }}>QR</span>
                        <span style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#ffa305', letterSpacing: '1px' }}>INSIGHT</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '2rem' }}>
                    <motion.span
                        whileHover={{ scale: 1.05, color: '#fff' }}
                        onClick={() => navigate('/static-generator')}
                        style={{ fontSize: isMobile ? '0.8rem' : '0.95rem', color: '#94a3b8', cursor: 'pointer', fontWeight: '500' }}
                    >
                        {isMobile ? 'Static' : 'Static QRs'}
                    </motion.span>
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        style={{
                            fontSize: isMobile ? '0.8rem' : '0.95rem', color: '#ffa305', fontWeight: '700', cursor: 'pointer',
                            background: 'rgba(255, 163, 5, 0.1)', padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem', borderRadius: '20px',
                            border: '1px solid rgba(255, 163, 5, 0.2)'
                        }}
                    >
                        {isMobile ? 'Dynamic' : 'Dynamic QRs'}
                    </motion.span>
                </div>
            </motion.div>

            {/* Main Content */}
            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: isMobile ? '1.5rem' : '3rem 2rem' }}>
                
                {/* Back Button */}
                <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    whileHover={{ scale: 1.1, backgroundColor: '#334155' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    style={{
                        marginBottom: '2rem',
                        width: '44px', height: '44px', borderRadius: '12px',
                        background: '#1e293b', border: '1px solid #334155',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#94a3b8',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <ArrowLeft size={20} />
                </motion.button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 163, 5, 0.1)', color: '#ffa305', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', border: '1px solid rgba(255, 163, 5, 0.2)' }}
                    >
                        <Sparkles size={16} /> Choose Template
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontSize: isMobile ? '2rem' : '3rem', fontWeight: '800',
                            background: 'linear-gradient(to right, #fff, #94a3b8)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            marginBottom: '1rem', letterSpacing: '-1px'
                        }}
                    >
                        What would you like to create?
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}
                    >
                        Select a template to get started with your dynamic QR code campaign.
                    </motion.p>
                </div>

                <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexDirection: isMobile ? 'column' : 'row' }}>
                    
                    {/* Left Side: QR Type Grid */}
                    <div style={{ flex: 1, width: '100%', display: (isMobile && activeTab !== 'generator') ? 'none' : 'block' }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                gap: '1.25rem',
                                paddingBottom: '2rem'
                            }}
                        >
                            {qrTypes.map(type => (
                                <motion.div
                                    key={type.id}
                                    variants={cardVariants}
                                    whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(255, 163, 5, 0.3)' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedType(type.id)}
                                    style={{
                                        position: 'relative',
                                        background: selectedType === type.id ? 'linear-gradient(145deg, #1e293b, #451a03)' : '#1e293b',
                                        border: selectedType === type.id ? '2px solid #ffa305' : '1px solid #334155',
                                        borderRadius: '20px',
                                        padding: '1.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        minHeight: '160px',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div style={{
                                            width: '56px', height: '56px', borderRadius: '16px',
                                            background: selectedType === type.id ? 'rgba(255, 163, 5, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: selectedType === type.id ? '#ffa305' : '#94a3b8',
                                            fontSize: '1.75rem', border: '1px solid rgba(255,255,255,0.05)'
                                        }}>
                                            {type.icon}
                                        </div>
                                        {selectedType === type.id && (
                                            <motion.div
                                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                style={{ width: '24px', height: '24px', background: '#ffa305', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                <div style={{ width: '8px', height: '8px', background: '#000', borderRadius: '50%' }} />
                                            </motion.div>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff', fontSize: '1.1rem', fontWeight: '700' }}>
                                            {type.name}
                                        </h3>
                                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
                                            {type.description}
                                        </p>
                                    </div>

                                    {['survey', 'image', 'video'].includes(type.id) && (
                                        <div style={{
                                            position: 'absolute', top: '12px', right: '12px',
                                            background: 'rgba(239, 68, 68, 0.2)', color: '#f87171',
                                            padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem',
                                            fontWeight: 'bold', border: '1px solid rgba(239, 68, 68, 0.3)'
                                        }}>
                                            SOON
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Side: Mobile Preview Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{
                            width: isMobile ? '100%' : '380px',
                            flexShrink: 0,
                            position: isMobile ? 'relative' : 'sticky',
                            top: isMobile ? '0' : '6rem',
                            display: isMobile ? (activeTab === 'preview' ? 'flex' : 'none') : (selectedType ? 'block' : 'none'),
                            justifyContent: 'center'
                        }}
                    >
                        <div style={{
                            background: '#1e293b', borderRadius: '32px', padding: '1.5rem',
                            border: '1px solid #334155', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}>
                            <div style={{ marginBottom: '1.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                                <Eye size={16} />
                                <span style={{ fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Preview</span>
                            </div>
                            
                            <div style={{ transform: 'scale(0.95)', transformOrigin: 'top center' }}>
                                {selectedType && getPreviewConfig(selectedType) ? (
                                    <MobilePreview config={getPreviewConfig(selectedType)} />
                                ) : (
                                    <div style={{
                                        minHeight: '500px', display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', justifyContent: 'center', color: '#64748b',
                                        background: '#0f172a', borderRadius: '24px', border: '2px dashed #334155'
                                    }}>
                                        <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>
                                            {selectedType ? qrTypes.find(t => t.id === selectedType)?.icon : <LayoutGrid />}
                                        </div>
                                        <h3 style={{ color: '#94a3b8' }}>{selectedType ? qrTypes.find(t => t.id === selectedType)?.name : 'Select a type'}</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Continue Button */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        position: 'fixed',
                        bottom: isMobile ? '80px' : '40px',
                        left: 0,
                        right: 0,
                        margin: '0 auto',
                        zIndex: 40,
                        width: '90%',
                        maxWidth: '400px',
                        display: isMobile ? (activeTab === 'generator' ? 'block' : 'none') : 'block'
                    }}
                >
                    <motion.button
                        onClick={handleContinue}
                        disabled={!selectedType}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            width: '100%',
                            background: selectedType ? '#ffa305' : '#334155',
                            border: 'none',
                            padding: '1rem',
                            borderRadius: '20px',
                            cursor: selectedType ? 'pointer' : 'not-allowed',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                            boxShadow: selectedType ? '0 10px 25px -5px rgba(255, 163, 5, 0.5)' : 'none',
                            opacity: selectedType ? 1 : 0.7
                        }}
                    >
                        <span style={{ color: '#000', fontSize: '1.1rem', fontWeight: '700' }}>Continue</span>
                        <div style={{ background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '50%', display: 'flex' }}>
                            <ArrowRight size={20} color="#000" />
                        </div>
                    </motion.button>
                </motion.div>
            </div>

            {/* Mobile Bottom Navigation */}
            {isMobile && (
                <div style={{
                    position: 'fixed', bottom: 0, left: 0, right: 0, height: '70px',
                    background: '#1e293b', display: 'flex', borderTop: '1px solid #334155',
                    zIndex: 1001
                }}>
                    <div
                        onClick={() => setActiveTab('generator')}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', color: activeTab === 'generator' ? '#ffa305' : '#64748b' }}
                    >
                        <Settings size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Generator</span>
                    </div>
                    <div
                        onClick={() => setActiveTab('preview')}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', color: activeTab === 'preview' ? '#ffa305' : '#64748b' }}
                    >
                        <Eye size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Preview</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateSelection;
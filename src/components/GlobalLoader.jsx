import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAxiosLoader } from '../context/AxiosLoaderContext';
import logoLoader from '../assets/logo-loader.jpg';

const GlobalLoader = () => {
    const { isLoading } = useAxiosLoader();

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: 'rgba(15, 23, 42, 0.85)', // Slightly darker for better contrast with image
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }}
                    >
                        {/* Logo Image Loader */}
                        <div style={{ position: 'relative', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Rotating Border Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '50%',
                                    border: '4px solid transparent',
                                    borderTopColor: '#ffa305',
                                    borderRightColor: '#ffa305',
                                    filter: 'drop-shadow(0 0 8px rgba(255, 163, 5, 0.6))'
                                }}
                            />
                            
                            {/* Counter-Rotating Ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                style={{
                                    position: 'absolute',
                                    inset: '8px',
                                    borderRadius: '50%',
                                    border: '2px solid transparent',
                                    borderBottomColor: '#64748b',
                                    borderLeftColor: '#64748b'
                                }}
                            />

                            {/* Logo Container */}
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    ease: "easeInOut" 
                                }}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    background: '#000',
                                    zIndex: 10
                                }}
                            >
                                <img 
                                    src={logoLoader} 
                                    alt="Loading..." 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover' 
                                    }} 
                                />
                            </motion.div>
                        </div>

                        {/* Loading Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                color: '#f8fafc',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                letterSpacing: '0.1em',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                textTransform: 'uppercase'
                            }}
                        >
                            <span style={{ color: '#ffa305' }}>Loading</span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.1 }}
                            >.</motion.span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.2 }}
                            >.</motion.span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.3 }}
                            >.</motion.span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalLoader;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAxiosLoader } from '../context/AxiosLoaderContext';

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
                        background: 'rgba(15, 23, 42, 0.4)', // Slate-900 with lower opacity
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
                        {/* Animated Logo/Spinner */}
                        <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Outer rotating ring */}
                            <motion.span
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    border: '3px solid transparent',
                                    borderTopColor: '#ffa305', // Orange
                                    borderRightColor: 'transparent',
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            
                            {/* Inner counter-rotating ring */}
                            <motion.span
                                style={{
                                    position: 'absolute',
                                    width: '70%',
                                    height: '70%',
                                    borderRadius: '50%',
                                    border: '3px solid transparent',
                                    borderBottomColor: '#ffa305',
                                    borderLeftColor: 'transparent',
                                }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* Center pulsing dot */}
                            <motion.div
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: '#ffa305',
                                }}
                                animate={{ 
                                    scale: [1, 1.5, 1],
                                    opacity: [1, 0.7, 1]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Loading Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                color: '#f8fafc', // Slate-50
                                fontSize: '1rem',
                                fontWeight: '500',
                                letterSpacing: '0.05em',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            <span>Loading</span>
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

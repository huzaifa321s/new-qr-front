import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, BarChart, ChevronLeft, ChevronRight, LayoutGrid, 
    HelpCircle, MessageCircle, X, Zap, Settings, PieChart 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Sidebar = ({ isOpen, onClose, onToggle, collapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [localCollapsed, setLocalCollapsed] = useState(false);
    
    // Use controlled state if provided, otherwise local state
    const isCollapsed = collapsed !== undefined ? collapsed : localCollapsed;
    
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle collapse toggle
    const handleToggle = () => {
        const newState = !isCollapsed;
        if (collapsed === undefined) {
            setLocalCollapsed(newState);
        }
        // Notify parent (send 'expanded' state which is opposite of collapsed)
        if (onToggle) {
            onToggle(!newState);
        }
    };

    const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

    const sidebarVariants = {
        expanded: { width: 260 },
        collapsed: { width: 80 },
        mobileOpen: { x: 0, width: 280 },
        mobileClosed: { x: '-100%', width: 280 }
    };

    const logoVariants = {
        expanded: { opacity: 1, scale: 1, display: 'flex' },
        collapsed: { opacity: 0, scale: 0.8, transition: { duration: 0.2 }, transitionEnd: { display: 'none' } }
    };

    const textVariants = {
        expanded: { opacity: 1, x: 0, display: 'block' },
        collapsed: { opacity: 0, x: -10, transition: { duration: 0.2 }, transitionEnd: { display: 'none' } }
    };

    const NavItem = ({ icon: Icon, label, path, onClick, isAction = false, isComingSoon = false }) => {
        const active = isActive(path);
        
        return (
            <motion.div
                onClick={() => {
                    if (isComingSoon) {
                        toast('Coming Soon', { icon: '🚧', style: { background: '#1e293b', color: '#fff' } });
                        return;
                    }
                    if (onClick) {
                        onClick();
                    } else if (path) {
                        navigate(path);
                        if (isMobile) onClose();
                    }
                }}
                whileHover={{ scale: 1.02, backgroundColor: isAction ? '#e08e00' : 'rgba(255, 163, 5, 0.08)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                    padding: '0.8rem 1rem',
                    margin: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: isAction ? '#ffa305' : (active ? 'rgba(255, 163, 5, 0.1)' : 'transparent'),
                    color: isAction ? '#000' : (active ? '#ffa305' : '#94a3b8'),
                    border: active && !isAction ? '1px solid rgba(255, 163, 5, 0.2)' : '1px solid transparent',
                    transition: 'background-color 0.2s, color 0.2s',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '24px' }}>
                    <Icon size={isAction ? 20 : 22} strokeWidth={isAction ? 2.5 : 2} />
                </div>
                
                <motion.span
                    variants={textVariants}
                    animate={(!isCollapsed || isMobile) ? "expanded" : "collapsed"}
                    style={{ 
                        fontWeight: isAction ? 700 : 500, 
                        fontSize: '0.95rem',
                        whiteSpace: 'nowrap' 
                    }}
                >
                    {label}
                </motion.span>
                
                {active && !isAction && (
                    <motion.div
                        layoutId="activeIndicator"
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '4px',
                            height: '60%',
                            background: '#ffa305',
                            borderTopRightRadius: '4px',
                            borderBottomRightRadius: '4px'
                        }}
                    />
                )}
            </motion.div>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobile && isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 999
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.div
                initial={isMobile ? "mobileClosed" : "expanded"}
                animate={isMobile ? (isOpen ? "mobileOpen" : "mobileClosed") : (isCollapsed ? "collapsed" : "expanded")}
                variants={sidebarVariants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                    height: '100vh',
                    background: '#1e293b',
                    borderRight: '1px solid #334155',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.2)'
                }}
            >
                {/* Header / Logo */}
                <div style={{ 
                    height: '80px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '0 1.5rem',
                    borderBottom: '1px solid #334155',
                    position: 'relative'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem',
                        width: '100%',
                        justifyContent: (!isCollapsed || isMobile) ? 'flex-start' : 'center'
                    }}>
                        <motion.div 
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            style={{
                                width: '40px', height: '40px', 
                                background: 'linear-gradient(135deg, #ffa305 0%, #f59e0b 100%)',
                                borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#000',
                                flexShrink: 0,
                                boxShadow: '0 4px 12px rgba(255, 163, 5, 0.3)'
                            }}
                        >
                            <Zap size={24} fill="currentColor" />
                        </motion.div>
                        
                        <motion.div 
                            variants={logoVariants}
                            animate={(!isCollapsed || isMobile) ? "expanded" : "collapsed"}
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <span style={{ color: '#fff', fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.5px' }}>QR</span>
                            <span style={{ color: '#ffa305', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '2px', marginTop: '-4px' }}>INSIGHT</span>
                        </motion.div>
                    </div>

                    {/* Mobile Close Button */}
                    {isMobile && (
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            style={{
                                position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                                background: 'transparent', border: 'none', color: '#94a3b8'
                            }}
                        >
                            <X size={24} />
                        </motion.button>
                    )}
                </div>

                {/* Desktop Collapse Toggle */}
                {!isMobile && (
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: '#ffa305', color: '#000' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleToggle}
                        style={{
                            position: 'absolute',
                            right: '-14px',
                            top: '90px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#1e293b',
                            border: '1px solid #334155',
                            color: '#94a3b8',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 50,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}
                    >
                        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </motion.button>
                )}

                {/* Navigation Items */}
                <div style={{ flex: 1, padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
                    <NavItem 
                        icon={Plus} 
                        label="Create New QR" 
                        path="/select-template" 
                        isAction={true}
                    />
                    
                    <div style={{ height: '1px', background: '#334155', margin: '1rem 1.5rem' }} />
                    
                    <NavItem icon={LayoutGrid} label="My QR Codes" path="/" />
                    <NavItem icon={PieChart} label="Statistics" isComingSoon={true} />
                    <NavItem icon={Settings} label="Settings" isComingSoon={true} />
                </div>

                {/* Footer / Support */}
                <div style={{ 
                    padding: '1rem', 
                    borderTop: '1px solid #334155',
                    background: isCollapsed && !isMobile ? 'transparent' : 'rgba(15, 23, 42, 0.3)'
                }}>
                     <motion.div 
                        animate={(!isCollapsed || isMobile) ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                     >
                        <p style={{ 
                            fontSize: '0.75rem', fontWeight: '700', color: '#64748b', 
                            textTransform: 'uppercase', marginBottom: '0.5rem', paddingLeft: '0.5rem' 
                        }}>
                            Support
                        </p>
                    </motion.div>
                    
                    <NavItem icon={HelpCircle} label="Help Center" isComingSoon={true} />
                    <NavItem icon={MessageCircle} label="Contact Us" isComingSoon={true} />
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicUrlConfig = ({ config, onChange, error, setError }) => {
    const [isInfoOpen, setIsInfoOpen] = useState(true);

    const url = config.url || '';

    const handleUrlUpdate = (value) => {
        onChange(prev => ({
            ...prev,
            url: value
        }));
        if (setError) setError('');
    };

    return (
        <div>
            {/* ENTER INFORMATION ACCORDION */}
            <div style={{ background: '#1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', marginBottom: '1.5rem', overflow: 'hidden', border: '1px solid #334155' }}>
                <div
                    onClick={() => setIsInfoOpen(!isInfoOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#1e293b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isInfoOpen ? '1px solid #334155' : 'none'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '1rem', letterSpacing: '0.05em' }}>
                            ENTER INFORMATION
                        </div>
                    </div>
                    {isInfoOpen ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
                </div>

                <AnimatePresence>
                    {isInfoOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden', background: '#0f172a' }}
                        >
                            <div style={{ padding: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#ffa305', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                                        WEBSITE OR PAGE LINK*
                                    </label>
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => handleUrlUpdate(e.target.value)}
                                        placeholder="https://www.webiste.com/"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            border: `1px solid ${error ? '#ef4444' : '#334155'}`,
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            background: '#020617',
                                            color: '#e2e8f0',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#ffa305'}
                                        onBlur={(e) => e.target.style.borderColor = error ? '#ef4444' : '#334155'}
                                    />
                                    {error && (
                                        <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: '#ef4444' }}></span>
                                            {error}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DynamicUrlConfig;

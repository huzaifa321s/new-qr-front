import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Globe, Type, Mail, MapPin, Wifi, Phone, MessageSquare, Plus, ChevronDown, ChevronUp, Check, Download, Upload, X, Eye, Loader2 } from 'lucide-react';
import QRRenderer from '../components/QRRenderer';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const qrTabs = [
    { id: 'website', icon: <Globe size={20} />, label: 'Website' },
    { id: 'text', icon: <Type size={20} />, label: 'Text' },
    { id: 'email', icon: <Mail size={20} />, label: 'Email' },
    { id: 'map', icon: <MapPin size={20} />, label: 'Google Map' },
    { id: 'wifi', icon: <Wifi size={20} />, label: 'WIFI' },
    { id: 'phone', icon: <Phone size={20} />, label: 'Phone' },
    { id: 'sms', icon: <MessageSquare size={20} />, label: 'SMS' },
    { id: 'more', icon: <Plus size={20} />, label: 'More' },
];

const patterns = [
    { id: 'square', svg: <rect x="2" y="2" width="46" height="46" fill="currentColor" /> },
    { id: 'dots', svg: <><circle cx="12" cy="12" r="6" fill="currentColor" /><circle cx="38" cy="12" r="6" fill="currentColor" /><circle cx="12" cy="38" r="6" fill="currentColor" /><circle cx="38" cy="38" r="6" fill="currentColor" /></> },
    { id: 'classy', svg: <path d="M25 2L48 25L25 48L2 25Z" fill="currentColor" /> },
    { id: 'rounded', svg: <rect x="2" y="2" width="46" height="46" rx="12" fill="currentColor" /> },
    { id: 'extra-rounded', svg: <rect x="2" y="2" width="46" height="46" rx="23" fill="currentColor" /> },
];

const socialLogos = [
    { id: 'facebook', src: 'https://img.icons8.com/color/96/facebook-new.png', label: 'Facebook' },
    { id: 'instagram', src: 'https://img.icons8.com/fluency/96/instagram-new.png', label: 'Instagram' },
    { id: 'x', src: 'https://img.icons8.com/ios-filled/96/000000/twitterx.png', label: 'X' },
    { id: 'linkedin', src: 'https://img.icons8.com/color/96/linkedin.png', label: 'LinkedIn' },
    { id: 'discord', src: 'https://img.icons8.com/color/96/discord-logo-2.png', label: 'Discord' },
    { id: 'twitch', src: 'https://img.icons8.com/color/96/twitch.png', label: 'Twitch' },
    { id: 'kickstarter', src: 'https://img.icons8.com/color/96/kickstarter.png', label: 'Kickstarter' },
    { id: 'youtube', src: 'https://img.icons8.com/color/96/youtube-play.png', label: 'YouTube' },
    { id: 'whatsapp', src: 'https://img.icons8.com/color/96/whatsapp.png', label: 'WhatsApp' },
    { id: 'snapchat', src: 'https://img.icons8.com/color/96/snapchat-circled.png', label: 'Snapchat' },
    { id: 'tiktok', src: 'https://img.icons8.com/color/96/tiktok.png', label: 'TikTok' },
    { id: 'tumblr', src: 'https://img.icons8.com/color/96/tumblr.png', label: 'Tumblr' },
    { id: 'spotify', src: 'https://img.icons8.com/color/96/spotify.png', label: 'Spotify' },
    { id: 'dribbble', src: 'https://img.icons8.com/color/96/dribbble.png', label: 'Dribbble' },
    { id: 'pinterest', src: 'https://img.icons8.com/color/96/pinterest.png', label: 'Pinterest' },
    { id: 'telegram', src: 'https://img.icons8.com/color/96/telegram-app.png', label: 'Telegram' },
    { id: 'behance', src: 'https://img.icons8.com/color/96/behance.png', label: 'Behance' },
    { id: 'reddit', src: 'https://img.icons8.com/color/96/reddit.png', label: 'Reddit' },
    { id: 'web', src: 'https://img.icons8.com/color/96/internet.png', label: 'Web' },
];

const StaticGenerator = () => {
    const navigate = useNavigate();
    const qrRef = useRef(null);
    const fileInputRef = useRef(null);
    const [activeTab, setActiveTab] = useState('website');
    const [qrName, setQrName] = useState('');
    const [link, setLink] = useState('https://QRinsight.com/');
    const [isHovered, setIsHovered] = useState(false);

    // Accordion states
    const [isInfoOpen, setIsInfoOpen] = useState(true);
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isLogoOpen, setIsLogoOpen] = useState(false);

    // Design states
    const [qrDesign, setQrDesign] = useState({
        dots: { style: 'square', color: '#000000' },
        cornersSquare: { style: 'square', color: '#000000' },
        cornersDot: { style: 'dot', color: '#000000' },
        image: { url: null },
        imageOptions: { hideBackgroundDots: false, imageSize: 0.4 }
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setQrDesign(prev => ({
                    ...prev,
                    image: { ...prev.image, url: reader.result }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSocialLogoSelect = (social) => {
        setQrDesign(prev => ({
            ...prev,
            image: { ...prev.image, url: social.src }
        }));
    };

    const handleSave = async () => {
        if (!link || !qrName) return;
        setIsSaving(true);
        try {
            const payload = {
                type: activeTab,
                name: qrName,
                data: link,
                design: qrDesign
            };

            await axios.post('/api/qr/static', payload);
            toast.success('Static QR Code saved successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error saving static QR:', error);
            toast.error('Failed to save QR Code. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa', paddingBottom: '3rem' }}>
            <style>
                {`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #94a3b8;
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #64748b;
                    }
                `}
            </style>
            <Toaster position="top-right" />

            {/* Top Navbar */}
            <div style={{
                background: '#fff',
                padding: '1rem 4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '32px', height: '32px', background: '#8b5cf6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                            <span style={{ fontWeight: 'bold' }}>QR</span>
                        </div>
                        <span style={{ fontWeight: '800', fontSize: '1.25rem', color: '#1e293b' }}>INSIGHT</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <span onClick={() => navigate('/static-generator')} style={{ color: '#8b5cf6', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>Static QRs</span>
                    <span onClick={() => navigate('/select-template')} style={{ color: '#64748b', cursor: 'pointer', fontSize: '0.9rem' }}>Dynamic QRs</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#6366f1' }}>Dashboard</span>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                {/* Header Title */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#031D36', marginBottom: '0.5rem' }}>
                        QRinsight: Static QR Code Generator
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                        Instantly transform your content into scannable QR codes
                    </p>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '4px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    marginBottom: '2rem',
                    overflowX: 'auto'
                }}>
                    {qrTabs.map(tab => (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '12px 24px',
                                gap: '8px',
                                cursor: 'pointer',
                                borderBottom: activeTab === tab.id ? '2px solid #8b5cf6' : '2px solid transparent',
                                transition: 'all 0.2s',
                                background: activeTab === tab.id ? '#f5f3ff' : 'transparent',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px',
                                minWidth: '100px'
                            }}
                        >
                            <div style={{ color: activeTab === tab.id ? '#8b5cf6' : '#94a3b8' }}>
                                {tab.icon}
                            </div>
                            <span style={{
                                fontSize: '0.8rem',
                                fontWeight: activeTab === tab.id ? '600' : '500',
                                color: activeTab === tab.id ? '#8b5cf6' : '#94a3b8'
                            }}>
                                {tab.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    <div
                        className="custom-scrollbar"
                        style={{
                            flex: 1,
                            height: '500px',
                            overflowY: 'auto',
                            paddingRight: '1rem',
                            paddingBottom: '50px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '0.5rem' }}>

                            {/* Enter Information Accordion */}
                            <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                <div
                                    onClick={() => setIsInfoOpen(!isInfoOpen)}
                                    style={{
                                        padding: '1.25rem 1.5rem',
                                        background: '#f8fafc',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', letterSpacing: '0.02em' }}>ENTER INFORMATION</span>
                                    {isInfoOpen ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                                </div>

                                {isInfoOpen && (
                                    <div style={{ padding: '1.5rem', background: '#fcfaff' }}>
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#8b5cf6', marginBottom: '0.5rem' }}>NAME YOUR QRCODE</label>
                                            <input
                                                type="text"
                                                value={qrName}
                                                onChange={(e) => setQrName(e.target.value)}
                                                placeholder="QR code name"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    borderRadius: '6px',
                                                    border: '1px solid #e2e8f0',
                                                    outline: 'none',
                                                    fontSize: '0.9rem'
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#8b5cf6', marginBottom: '0.5rem' }}>LINK*</label>
                                            <input
                                                type="text"
                                                value={link}
                                                onChange={(e) => setLink(e.target.value)}
                                                placeholder="https://QRinsight.com/"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    borderRadius: '6px',
                                                    border: '1px solid #e2e8f0',
                                                    outline: 'none',
                                                    fontSize: '0.9rem'
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* SHAPE & COLOR Accordion */}
                            <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                <div
                                    onClick={() => setIsDesignOpen(!isDesignOpen)}
                                    style={{
                                        padding: '1.25rem 1.5rem',
                                        background: '#f8fafc',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', letterSpacing: '0.02em' }}>SHAPE & COLOR</span>
                                    {isDesignOpen ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                                </div>

                                {isDesignOpen && (
                                    <div style={{ padding: '1.5rem', background: '#fcfaff', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                        {/* Body Patterns */}
                                        <div>
                                            <label className="label" style={{ marginBottom: '1rem', display: 'block', color: '#0f172a', fontWeight: '600', fontSize: '0.85rem' }}>BODY PATTERNS</label>
                                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                                {patterns.map((p, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => setQrDesign(prev => ({ ...prev, dots: { ...prev.dots, style: p.id } }))}
                                                        style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            border: qrDesign?.dots?.style === p.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: '#fff',
                                                            color: '#000',
                                                            padding: '8px'
                                                        }}
                                                    >
                                                        <svg viewBox="0 0 50 50" width="100%" height="100%">
                                                            {p.svg}
                                                        </svg>
                                                    </div>
                                                ))}
                                            </div>

                                            <div style={{ borderTop: '1px dashed #e2e8f0', margin: '1.5rem 0' }}></div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Pattern Color</label>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '4px',
                                                    padding: '0.5rem',
                                                    background: '#fff',
                                                    width: '100%',
                                                    maxWidth: '200px',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>{qrDesign?.dots?.color || '#000000'}</span>
                                                    <div style={{ position: 'relative', width: '24px', height: '24px', flexShrink: 0 }}>
                                                        <input
                                                            type="color"
                                                            value={qrDesign?.dots?.color || '#000000'}
                                                            onChange={(e) => setQrDesign(prev => ({ ...prev, dots: { ...prev.dots, color: e.target.value } }))}
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                width: '100%',
                                                                height: '100%',
                                                                opacity: 0,
                                                                cursor: 'pointer'
                                                            }}
                                                        />
                                                        <div style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            background: qrDesign?.dots?.color || '#000000',
                                                            borderRadius: '4px',
                                                            border: '1px solid #e2e8f0'
                                                        }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ borderTop: '1px solid #f1f5f9', margin: '0' }}></div>

                                        {/* Eye Frame */}
                                        <div>
                                            <label className="label" style={{ marginBottom: '1rem', display: 'block', color: '#0f172a', fontWeight: '600', fontSize: '0.85rem' }}>EYE FRAME (OUTER SQUARE)</label>
                                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                                {[
                                                    { id: 'circle', svg: <circle cx="25" cy="25" r="21.5" stroke="currentColor" strokeWidth="7" fill="none" /> },
                                                    { id: 'square', svg: <rect x="3.5" y="3.5" width="43" height="43" stroke="currentColor" strokeWidth="7" fill="none" /> },
                                                    {
                                                        id: 'dashed', svg: <>
                                                            <path d="M3.5 3.5 h15 v7 h-8 v8 h-7 v-15 z" fill="currentColor" />
                                                            <path d="M46.5 3.5 h-15 v7 h8 v8 h7 v-15 z" fill="currentColor" />
                                                            <path d="M3.5 46.5 h15 v-7 h-8 v-8 h-7 v15 z" fill="currentColor" />
                                                            <path d="M46.5 46.5 h-15 v-7 h8 v-8 h7 v15 z" fill="currentColor" />
                                                        </>
                                                    },
                                                    { id: 'rounded', svg: <rect x="3.5" y="3.5" width="43" height="43" rx="12" stroke="currentColor" strokeWidth="7" fill="none" /> },
                                                    { id: 'leaf-top-right', svg: <path d="M3.5 23.5 A20 20 0 0 1 23.5 3.5 L46.5 3.5 L46.5 26.5 A20 20 0 0 1 26.5 46.5 L23.5 46.5 A20 20 0 0 1 3.5 26.5 Z" stroke="currentColor" strokeWidth="7" fill="none" /> },
                                                    { id: 'leaf-top-left', svg: <path d="M3.5 3.5 L26.5 3.5 A20 20 0 0 1 46.5 23.5 L46.5 26.5 A20 20 0 0 1 26.5 46.5 L23.5 46.5 A20 20 0 0 1 3.5 26.5 Z" stroke="currentColor" strokeWidth="7" fill="none" /> },
                                                    { id: 'leaf-bottom-right', svg: <path d="M3.5 23.5 A20 20 0 0 1 23.5 3.5 L26.5 3.5 A20 20 0 0 1 46.5 23.5 L46.5 46.5 L23.5 46.5 A20 20 0 0 1 3.5 26.5 Z" stroke="currentColor" strokeWidth="7" fill="none" /> },
                                                    { id: 'leaf-bottom-left', svg: <path d="M23.5 3.5 A20 20 0 0 1 43.5 23.5 L43.5 26.5 A20 20 0 0 1 23.5 46.5 L3.5 46.5 L3.5 23.5 A20 20 0 0 1 23.5 3.5 Z" stroke="currentColor" strokeWidth="7" fill="none" /> },
                                                    { id: 'dot-frame', svg: <><rect x="3.5" y="3.5" width="43" height="43" stroke="currentColor" strokeWidth="7" fill="none" /><circle cx="25" cy="25" r="7" fill="currentColor" /></> },
                                                ].map((f, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => setQrDesign(prev => ({ ...prev, cornersSquare: { ...prev.cornersSquare, style: f.id } }))}
                                                        style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            border: qrDesign?.cornersSquare?.style === f.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: '#fff',
                                                            color: '#000',
                                                            padding: '6px'
                                                        }}
                                                    >
                                                        <svg viewBox="0 0 50 50" width="100%" height="100%">
                                                            {f.svg}
                                                        </svg>
                                                    </div>
                                                ))}
                                            </div>

                                            <div style={{ borderTop: '1px dashed #e2e8f0', margin: '1rem 0' }}></div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Frame Color</label>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '4px',
                                                    padding: '0.5rem',
                                                    background: '#fff',
                                                    width: '100%',
                                                    maxWidth: '200px',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>{qrDesign?.cornersSquare?.color || qrDesign?.dots?.color || '#000000'}</span>
                                                    <div style={{ position: 'relative', width: '24px', height: '24px', flexShrink: 0 }}>
                                                        <input
                                                            type="color"
                                                            value={qrDesign?.cornersSquare?.color || qrDesign?.dots?.color || '#000000'}
                                                            onChange={(e) => setQrDesign(prev => ({ ...prev, cornersSquare: { ...prev.cornersSquare, color: e.target.value } }))}
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                width: '100%',
                                                                height: '100%',
                                                                opacity: 0,
                                                                cursor: 'pointer'
                                                            }}
                                                        />
                                                        <div style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            background: qrDesign?.cornersSquare?.color || qrDesign?.dots?.color || '#000000',
                                                            borderRadius: '4px',
                                                            border: '1px solid #e2e8f0'
                                                        }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ borderTop: '1px solid #f1f5f9', margin: '0' }}></div>

                                        {/* Eye Ball */}
                                        <div>
                                            <label className="label" style={{ marginBottom: '1rem', display: 'block', color: '#0f172a', fontWeight: '600', fontSize: '0.85rem' }}>EYE BALL (INNER DOT)</label>
                                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                                {[
                                                    { id: 'dot', svg: <circle cx="25" cy="25" r="17" fill="currentColor" /> },
                                                    { id: 'square', svg: <rect x="9" y="9" width="32" height="32" fill="currentColor" /> },
                                                    { id: 'rounded', svg: <rect x="9" y="9" width="32" height="32" rx="10" fill="currentColor" /> },
                                                    { id: 'leaf-diag-1', svg: <path d="M25 9 L41 9 L41 25 A16 16 0 0 1 25 41 L9 41 L9 25 A16 16 0 0 1 25 9 Z" fill="currentColor" /> },
                                                    { id: 'leaf-diag-2', svg: <path d="M9 25 L9 9 L25 9 A16 16 0 0 1 41 25 L41 41 L25 41 A16 16 0 0 1 9 25 Z" fill="currentColor" /> },
                                                    { id: 'teardrop-tl', svg: <path d="M9 25 L9 9 L25 9 A16 16 0 0 1 41 25 A16 16 0 0 1 25 41 A16 16 0 0 1 9 25 Z" fill="currentColor" /> },
                                                    { id: 'diamond', svg: <path d="M25 5 L45 25 L25 45 L5 25 Z" fill="currentColor" /> },
                                                    { id: 'star', svg: <path d="M25 8 L30 18 L41 19 L32 26 L35 37 L25 31 L15 37 L18 26 L9 19 L20 18 Z" fill="currentColor" /> },
                                                    { id: 'plus', svg: <path d="M18 5 L32 5 L32 18 L45 18 L45 32 L32 32 L32 45 L18 45 L18 32 L5 32 L5 18 L18 18 Z" fill="currentColor" /> },
                                                    { id: 'cross', svg: <path d="M15 10 L25 5 L35 15 L30 25 L40 35 L35 40 L25 30 L15 40 L10 35 L20 25 L10 15 L15 10 Z" fill="currentColor" /> },
                                                ].map((b, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => setQrDesign(prev => ({ ...prev, cornersDot: { ...prev.cornersDot, style: b.id } }))}
                                                        style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            border: qrDesign?.cornersDot?.style === b.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: '#fff',
                                                            color: '#000',
                                                            padding: '6px'
                                                        }}
                                                    >
                                                        <svg viewBox="0 0 50 50" width="100%" height="100%">
                                                            {b.svg}
                                                        </svg>
                                                    </div>
                                                ))}
                                            </div>

                                            <div style={{ borderTop: '1px dashed #e2e8f0', margin: '1rem 0' }}></div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Ball Color</label>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '4px',
                                                    padding: '0.5rem',
                                                    background: '#fff',
                                                    width: '100%',
                                                    maxWidth: '200px',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>{qrDesign?.cornersDot?.color || qrDesign?.dots?.color || '#000000'}</span>
                                                    <div style={{ position: 'relative', width: '24px', height: '24px', flexShrink: 0 }}>
                                                        <input
                                                            type="color"
                                                            value={qrDesign?.cornersDot?.color || qrDesign?.dots?.color || '#000000'}
                                                            onChange={(e) => setQrDesign(prev => ({ ...prev, cornersDot: { ...prev.cornersDot, color: e.target.value } }))}
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                width: '100%',
                                                                height: '100%',
                                                                opacity: 0,
                                                                cursor: 'pointer'
                                                            }}
                                                        />
                                                        <div style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            background: qrDesign?.cornersDot?.color || qrDesign?.dots?.color || '#000000',
                                                            borderRadius: '4px',
                                                            border: '1px solid #e2e8f0'
                                                        }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>

                            {/* SELECT A LOGO Accordion */}
                            <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                <div
                                    onClick={() => setIsLogoOpen(!isLogoOpen)}
                                    style={{
                                        padding: '1.25rem 1.5rem',
                                        background: '#f8fafc',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', letterSpacing: '0.02em' }}>SELECT A LOGO</span>
                                    {isLogoOpen ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                                </div>

                                {isLogoOpen && (
                                    <div style={{ padding: '1.5rem', background: '#fcfaff', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                        {/* Upload Section */}
                                        <div style={{
                                            border: '2px dashed #cbd5e1',
                                            borderRadius: '12px',
                                            padding: '2rem',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            background: isHovered ? '#f8fafc' : '#ffffff'
                                        }}
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={handleLogoUpload}
                                            />

                                            {qrDesign?.image?.url ? (
                                                <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto' }}>
                                                    <img
                                                        src={qrDesign.image.url}
                                                        alt="Uploaded Logo"
                                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                    />
                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setQrDesign(prev => ({ ...prev, image: { ...prev.image, url: null } }));
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '-10px',
                                                            right: '-10px',
                                                            background: '#ef4444',
                                                            color: '#fff',
                                                            borderRadius: '50%',
                                                            width: '24px',
                                                            height: '24px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                        }}
                                                    >
                                                        <X size={14} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div style={{
                                                        width: '64px',
                                                        height: '64px',
                                                        borderRadius: '50%',
                                                        background: '#eff6ff',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        margin: '0 auto 1rem',
                                                        color: '#3b82f6'
                                                    }}>
                                                        <Upload size={28} />
                                                    </div>
                                                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                                                        Upload your custom logo
                                                    </div>
                                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                                        Supported formats: PNG, JPG, SVG
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Social Logos Grid */}
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                                                OR CHOOSE FROM PRESETS
                                            </label>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '1rem' }}>
                                                {socialLogos.map((social) => (
                                                    <div
                                                        key={social.id}
                                                        onClick={() => handleSocialLogoSelect(social)}
                                                        style={{
                                                            width: '60px',
                                                            height: '60px',
                                                            border: qrDesign?.image?.url === social.src ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                                                            borderRadius: '12px',
                                                            padding: '10px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: '#fff',
                                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                                            transition: 'all 0.2s',
                                                            position: 'relative'
                                                        }}
                                                    >
                                                        <img src={social.src} alt={social.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                        {qrDesign?.image?.url === social.src && (
                                                            <div style={{
                                                                position: 'absolute',
                                                                top: '-6px',
                                                                right: '-6px',
                                                                background: '#3b82f6',
                                                                color: '#fff',
                                                                borderRadius: '50%',
                                                                width: '18px',
                                                                height: '18px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '10px'
                                                            }}>✓</div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Remove Background Toggle */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                                            <div
                                                onClick={() => setQrDesign(prev => ({
                                                    ...prev,
                                                    imageOptions: { ...prev.imageOptions, hideBackgroundDots: !prev.imageOptions?.hideBackgroundDots }
                                                }))}
                                                style={{
                                                    width: '44px',
                                                    height: '24px',
                                                    background: qrDesign?.imageOptions?.hideBackgroundDots ? '#3b82f6' : '#cbd5e1',
                                                    borderRadius: '12px',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.2s'
                                                }}
                                            >
                                                <div style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    background: '#fff',
                                                    borderRadius: '50%',
                                                    position: 'absolute',
                                                    top: '2px',
                                                    left: qrDesign?.imageOptions?.hideBackgroundDots ? '22px' : '2px',
                                                    transition: 'left 0.2s',
                                                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                                }}></div>
                                            </div>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#1e293b' }}>Remove Background Behind Logo</span>
                                        </div>

                                        {/* Logo Size Slider */}
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0f172a' }}>Logo Size</label>
                                                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{Math.round((qrDesign?.imageOptions?.imageSize || 0.4) * 100)}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="0.5"
                                                step="0.05"
                                                value={qrDesign?.imageOptions?.imageSize || 0.4}
                                                onChange={(e) => setQrDesign(prev => ({
                                                    ...prev,
                                                    imageOptions: { ...prev.imageOptions, imageSize: parseFloat(e.target.value) }
                                                }))}
                                                style={{
                                                    width: '100%',
                                                    height: '6px',
                                                    background: '#e2e8f0',
                                                    borderRadius: '3px',
                                                    outline: 'none',
                                                    cursor: 'pointer',
                                                    accentColor: '#3b82f6'
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Preview */}
                    <div style={{
                        width: '380px',
                        background: '#fff',
                        borderRadius: '24px',
                        padding: '2rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'sticky',
                        top: '2rem'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem' }}>QR Code Preview</h3>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '2rem' }}>Your QR code will appear here</p>

                        <div style={{
                            width: '280px',
                            height: '280px',
                            background: '#fff',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 0 1px #f1f5f9',
                            marginBottom: '2rem',
                            padding: '10px'
                        }}>
                            <QRRenderer
                                ref={qrRef}
                                value={link || 'https://QRinsight.com/'}
                                design={qrDesign}
                                size={260}
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={!link || !qrName || isSaving}
                            style={{
                                width: '100%',
                                background: (!link || !qrName || isSaving) ? '#e2e8f0' : '#8b5cf6',
                                color: (!link || !qrName || isSaving) ? '#94a3b8' : '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '1rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: (!link || !qrName || isSaving) ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                opacity: (!link || !qrName || isSaving) ? 0.6 : 1
                            }}
                            onMouseOver={(e) => {
                                if (link && qrName && !isSaving) {
                                    e.currentTarget.style.background = '#7c3aed';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (link && qrName && !isSaving) {
                                    e.currentTarget.style.background = '#8b5cf6';
                                }
                            }}
                        >
                            {isSaving ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <Download size={20} />
                            )}
                            {isSaving ? 'Saving...' : 'Save QR Code'}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default StaticGenerator;

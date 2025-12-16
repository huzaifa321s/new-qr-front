import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Upload, X, ArrowRight } from 'lucide-react';
import FormSection from './FormSection';
import ColorPicker from './ColorPicker';

const DesignQR = ({ design, setDesign, qrData, setQrData, onSave, qrName, setQrName, isGenerating, isEditing }) => {

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setDesign(prev => ({
                    ...prev,
                    image: { ...prev.image, url: reader.result }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSocialLogoSelect = (social) => {
        setDesign(prev => ({
            ...prev,
            image: { ...prev.image, url: social.src }
        }));
    };

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

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>

            {/* QR NAME */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#0f172a' }}>QR Code Name</label>
                <input
                    type="text"
                    value={qrName}
                    onChange={(e) => setQrName(e.target.value)}
                    placeholder="Enter QR name..."
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        outline: 'none'
                    }}
                />
            </div>

            {/* SHAPE & COLOR */}
            <FormSection title="SHAPE & COLOR" defaultOpen={true}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Body Patterns */}
                    <div>
                        <label className="label" style={{ marginBottom: '1rem', display: 'block', color: '#0f172a', fontWeight: '600', fontSize: '0.85rem' }}>BODY PATTERNS</label>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            {[
                                { id: 'square', svg: <rect x="2" y="2" width="46" height="46" fill="currentColor" /> },
                                { id: 'dots', svg: <><circle cx="12" cy="12" r="6" fill="currentColor" /><circle cx="38" cy="12" r="6" fill="currentColor" /><circle cx="12" cy="38" r="6" fill="currentColor" /><circle cx="38" cy="38" r="6" fill="currentColor" /></> },
                                { id: 'classy', svg: <path d="M25 2L48 25L25 48L2 25Z" fill="currentColor" /> },
                                { id: 'rounded', svg: <rect x="2" y="2" width="46" height="46" rx="12" fill="currentColor" /> },
                                { id: 'extra-rounded', svg: <rect x="2" y="2" width="46" height="46" rx="23" fill="currentColor" /> },
                            ].map((p, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setDesign(prev => ({ ...prev, dots: { ...prev.dots, style: p.id } }))}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        border: design?.dots?.style === p.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
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
                                width: '200px',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>{design?.dots?.color || '#000000'}</span>
                                <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                    <input
                                        type="color"
                                        value={design?.dots?.color || '#000000'}
                                        onChange={(e) => setDesign(prev => ({ ...prev, dots: { ...prev.dots, color: e.target.value } }))}
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
                                        background: design?.dots?.color || '#000000',
                                        borderRadius: '4px',
                                        border: '1px solid #e2e8f0'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', margin: '0' }}></div>

                    {/* Eye Frame (Outer Square) */}
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
                                    onClick={() => setDesign(prev => ({ ...prev, cornersSquare: { ...prev.cornersSquare, style: f.id } }))}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        border: design?.cornersSquare?.style === f.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
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
                                width: '200px',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>{design?.cornersSquare?.color || design?.dots?.color || '#000000'}</span>
                                <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                    <input
                                        type="color"
                                        value={design?.cornersSquare?.color || design?.dots?.color || '#000000'}
                                        onChange={(e) => setDesign(prev => ({ ...prev, cornersSquare: { ...prev.cornersSquare, color: e.target.value } }))}
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
                                        background: design?.cornersSquare?.color || design?.dots?.color || '#000000',
                                        borderRadius: '4px',
                                        border: '1px solid #e2e8f0'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', margin: '0' }}></div>

                    {/* Eye Ball (Inner Dot) */}
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
                                    onClick={() => setDesign(prev => ({ ...prev, cornersDot: { ...prev.cornersDot, style: b.id } }))}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        border: design?.cornersDot?.style === b.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
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
                                width: '200px',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>{design?.cornersDot?.color || design?.dots?.color || '#000000'}</span>
                                <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                    <input
                                        type="color"
                                        value={design?.cornersDot?.color || design?.dots?.color || '#000000'}
                                        onChange={(e) => setDesign(prev => ({ ...prev, cornersDot: { ...prev.cornersDot, color: e.target.value } }))}
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
                                        background: design?.cornersDot?.color || design?.dots?.color || '#000000',
                                        borderRadius: '4px',
                                        border: '1px solid #e2e8f0'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', margin: '0' }}></div>

                    {/* Background Color */}
                    <div>
                        <label className="label" style={{ marginBottom: '1rem', display: 'block', color: '#0f172a', fontWeight: '600', fontSize: '0.85rem' }}>BACKGROUND COLOR</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Background Color</label>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                padding: '0.5rem',
                                background: '#fff',
                                width: '200px',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>{design?.background?.color || '#ffffff'}</span>
                                <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                    <input
                                        type="color"
                                        value={design?.background?.color || '#ffffff'}
                                        onChange={(e) => setDesign(prev => ({ ...prev, background: { ...prev.background, color: e.target.value } }))}
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
                                        background: design?.background?.color || '#ffffff',
                                        borderRadius: '4px',
                                        border: '1px solid #e2e8f0'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FormSection>

            {/* SELECT A LOGO */}
            <FormSection title="SELECT A LOGO">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>This will appear at the center of your QR Code</div>

                    {/* Upload Area */}
                    <div
                        onClick={() => document.getElementById('logo-upload').click()}
                        style={{
                            border: '2px dashed #e2e8f0',
                            borderRadius: '8px',
                            padding: '2rem',
                            textAlign: 'center',
                            background: '#f8fafc',
                            cursor: 'pointer'
                        }}
                    >
                        <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleLogoUpload}
                        />
                        <Upload size={24} color="#94a3b8" style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>
                            Drag file here or <span style={{ color: '#8b5cf6' }}>browse</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                            192x192 pixels. 5MB max file size.
                        </div>
                    </div>

                    {/* Remove Background Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                            onClick={() => setDesign(prev => ({
                                ...prev,
                                imageOptions: { ...prev.imageOptions, hideBackgroundDots: !prev.imageOptions?.hideBackgroundDots }
                            }))}
                            style={{
                                width: '44px',
                                height: '24px',
                                background: design?.imageOptions?.hideBackgroundDots ? '#8b5cf6' : '#cbd5e1',
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
                                left: design?.imageOptions?.hideBackgroundDots ? '22px' : '2px',
                                transition: 'left 0.2s',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}></div>
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#1e293b' }}>Remove Background Behind Logo</span>
                    </div>

                    {/* Social Logos */}
                    <div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {socialLogos.map((social) => (
                                <div
                                    key={social.id}
                                    onClick={() => handleSocialLogoSelect(social)}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        padding: '4px',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#fff',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8b5cf6'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                                >
                                    <img src={social.src} alt={social.label} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Logo Size Slider */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>Logo Size</label>
                        <input
                            type="range"
                            min="0.1"
                            max="0.5"
                            step="0.05"
                            value={design?.imageOptions?.imageSize || 0.4}
                            onChange={(e) => setDesign(prev => ({
                                ...prev,
                                imageOptions: { ...prev.imageOptions, imageSize: parseFloat(e.target.value) }
                            }))}
                            style={{
                                width: '100%',
                                height: '4px',
                                background: '#e2e8f0',
                                borderRadius: '2px',
                                outline: 'none',
                                cursor: 'pointer',
                                accentColor: '#8b5cf6'
                            }}
                        />
                    </div>
                </div>
            </FormSection>

            {/* SAVE BUTTON */}
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={onSave}
                    disabled={isGenerating || !qrName.trim()}
                    style={{
                        background: isGenerating || !qrName.trim() ? '#e2e8f0' : 'linear-gradient(to right, #6366f1, #8b5cf6)',
                        color: isGenerating || !qrName.trim() ? '#94a3b8' : '#ffffff',
                        border: 'none',
                        padding: '0.875rem 2rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: isGenerating || !qrName.trim() ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.95rem'
                    }}
                >
                    {isGenerating ? 'Saving...' : (isEditing ? 'Update QR Code' : 'Save QR Code')}
                    {!isGenerating && <ArrowRight size={18} />}
                </button>
            </div>
        </div>
    );
};

export default DesignQR;

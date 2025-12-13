import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check, Globe, Facebook, Instagram, Twitter, Linkedin, Youtube, Music, Ghost, MessageCircle, Send, Dribbble, Github, GripVertical } from 'lucide-react';
import { useState } from 'react';

const RatingConfig = ({ config, onChange }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);

    const design = config.design || {};
    const basicInfo = config.basicInfo || {};
    const rating = config.rating || {
        question: '',
        type: 'thumbs', // thumbs, emoji, stars
        allowComment: false
    };
    const socialLinks = config.socialLinks || [];

    const primaryColor = design.color?.header || '#4EB5E0';
    const secondaryColor = design.color?.light || '#FF5E3B';

    const handleDesignUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            design: { ...prev.design, [key]: value }
        }));
    };

    const handleColorUpdate = (colorKey, value) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                color: { ...prev.design.color, [colorKey]: value }
            }
        }));
    };

    const handleColorPaletteClick = (primary, secondary) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                color: { header: primary, dark: primary, light: secondary }
            }
        }));
    };

    const handleHeaderImageUpdate = (url) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                headerImage: { url }
            }
        }));
    };

    const handleLogoUpdate = (url) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                logo: { url }
            }
        }));
    };

    const handleBasicInfoUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            basicInfo: {
                ...prev.basicInfo,
                [key]: value
            }
        }));
    };

    const handleRatingUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            rating: {
                ...prev.rating,
                [key]: value
            }
        }));
    };

    const handleSocialUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            social: {
                ...prev.social,
                [key]: value
            }
        }));
    };

    // Social Links handlers
    const handleSocialLinkAdd = (platformId) => {
        // Check if platform already exists
        const exists = socialLinks.some(link => link.platform === platformId);
        if (exists) return;
        
        const newLink = { 
            id: Date.now().toString(), 
            platform: platformId, 
            url: '' 
        };
        onChange(prev => ({ 
            ...prev, 
            socialLinks: [...(prev.socialLinks || []), newLink] 
        }));
    };

    const handleSocialLinkUpdate = (id, value) => {
        const newLinks = socialLinks.map(link =>
            link.id === id ? { ...link, url: value } : link
        );
        onChange(prev => ({ ...prev, socialLinks: newLinks }));
    };

    const handleSocialLinkRemove = (id) => {
        const newLinks = socialLinks.filter(link => link.id !== id);
        onChange(prev => ({ ...prev, socialLinks: newLinks }));
    };

    const handleSocialLinkUnselect = (id) => {
        // Remove the social link entirely
        const newLinks = socialLinks.filter(link => link.id !== id);
        onChange(prev => ({ ...prev, socialLinks: newLinks }));
    };

    // Social Media Platforms Configuration
    const socialPlatforms = [
        { id: 'website', name: 'Website', icon: Globe, color: '#6366f1' },
        { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877f2' },
        { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E1306C', gradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' },
        { id: 'twitter', name: 'X', icon: Twitter, color: '#000000' },
        { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0077b5' },
        { id: 'discord', name: 'Discord', icon: MessageCircle, color: '#5865f2' },
        { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#ff0000' },
        { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: '#25d366' },
        { id: 'snapchat', name: 'Snapchat', icon: Ghost, color: '#fffc00', textColor: '#000' },
        { id: 'tiktok', name: 'TikTok', icon: Music, color: '#000000' },
        { id: 'spotify', name: 'Spotify', icon: Music, color: '#1db954' },
        { id: 'behance', name: 'Behance', icon: Dribbble, color: '#1769ff' },
        { id: 'dribbble', name: 'Dribbble', icon: Dribbble, color: '#ea4c89' },
        { id: 'pinterest', name: 'Pinterest', icon: Github, color: '#e60023' },
        { id: 'telegram', name: 'Telegram', icon: Send, color: '#0088cc' },
        { id: 'reddit', name: 'Reddit', icon: Github, color: '#ff4500' },
        { id: 'tumblr', name: 'Tumblr', icon: Github, color: '#35465c' },
    ];

    const palettes = [
        { p: '#0B2D86', s: '#FFA800' },
        { p: '#FACC15', s: '#FEF9C3' },
        { p: '#8B5CF6', s: '#C4B5FD' },
        { p: '#16A34A', s: '#86EFAC' },
        { p: '#06B6D4', s: '#67E8F9' }
    ];

    const headerImageOptions = [
        { id: 'header1', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=267&fit=crop' },
        { id: 'header2', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=267&fit=crop' },
        { id: 'header3', url: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=267&fit=crop' },
        { id: 'header4', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=267&fit=crop' },
        { id: 'header5', url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=267&fit=crop' },
        { id: 'header6', url: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&h=267&fit=crop' }
    ];

    const logoOptions = [
        { id: 'logo1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
        { id: 'logo2', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop' },
        { id: 'logo3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' }
    ];

    return (
        <div>
            {/* DESIGN ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsDesignOpen(!isDesignOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isDesignOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>DESIGN</div>
                    </div>
                    {isDesignOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isDesignOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>

                        {/* COLORS SECTION */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '1rem', textTransform: 'uppercase' }}>
                                COLORS
                            </label>

                            {/* Color Palettes */}
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                {palettes.map((palette, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleColorPaletteClick(palette.p, palette.s)}
                                        style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: (primaryColor === palette.p && secondaryColor === palette.s) ? '3px solid #8b5cf6' : '2px solid #e2e8f0',
                                            position: 'relative',
                                            background: `linear-gradient(180deg, ${palette.p} 50%, ${palette.s} 50%)`
                                        }}
                                    >
                                        {(primaryColor === palette.p && secondaryColor === palette.s) && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '24px',
                                                height: '24px',
                                                background: '#8b5cf6',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px solid #fff'
                                            }}>
                                                <Check size={14} color="#fff" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div style={{
                                position: 'relative',
                                height: '1px',
                                background: 'none',
                                borderTop: '1px dashed #e2e8f0',
                                margin: '2rem 0'
                            }}></div>

                            {/* Primary and Secondary Color Inputs */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
                                {/* Primary Color */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                        Primary Color
                                    </label>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #1e293b',
                                        borderRadius: '4px',
                                        padding: '0.5rem',
                                        height: '44px'
                                    }}>
                                        <input
                                            type="text"
                                            value={primaryColor}
                                            onChange={(e) => handleColorUpdate('header', e.target.value)}
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.9rem',
                                                color: '#000',
                                                fontWeight: '500',
                                                textTransform: 'uppercase'
                                            }}
                                        />
                                        <div style={{
                                            width: '28px',
                                            height: '28px',
                                            background: primaryColor,
                                            borderRadius: '2px',
                                            flexShrink: 0
                                        }}></div>
                                    </div>
                                </div>

                                {/* Swap Icon */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '1.5rem'
                                }}>
                                    <div
                                        onClick={() => handleColorPaletteClick(secondaryColor, primaryColor)}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '4px',
                                            border: '1px solid #e2e8f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            background: '#fff'
                                        }}
                                    >
                                        <RefreshCw size={18} color="#64748b" />
                                    </div>
                                </div>

                                {/* Secondary Color */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                        Secondary Color
                                    </label>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #1e293b',
                                        borderRadius: '4px',
                                        padding: '0.5rem',
                                        height: '44px'
                                    }}>
                                        <input
                                            type="text"
                                            value={secondaryColor}
                                            onChange={(e) => handleColorUpdate('light', e.target.value)}
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.9rem',
                                                color: '#000',
                                                fontWeight: '500',
                                                textTransform: 'uppercase'
                                            }}
                                        />
                                        <div style={{
                                            width: '28px',
                                            height: '28px',
                                            background: secondaryColor,
                                            borderRadius: '2px',
                                            flexShrink: 0
                                        }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* HEADER IMAGE SECTION */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', textTransform: 'uppercase' }}>
                                    HEADER IMAGE
                                </span>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                    Minimum width : 400px, 3:2 Ratio
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                {/* Remove/Clear Option */}
                                <div
                                    onClick={() => handleHeaderImageUpdate('')}
                                    style={{
                                        width: '80px',
                                        height: '53px',
                                        borderRadius: '4px',
                                        border: '1px solid #e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        background: '#fff'
                                    }}
                                >
                                    <X size={24} color="#cbd5e1" />
                                </div>

                                {/* Header Image Options */}
                                {headerImageOptions.map(img => (
                                    <div
                                        key={img.id}
                                        onClick={() => handleHeaderImageUpdate(img.url)}
                                        style={{
                                            width: '80px',
                                            height: '53px',
                                            borderRadius: '4px',
                                            overflow: 'hidden',
                                            border: design.headerImage?.url === img.url ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                            cursor: 'pointer',
                                            position: 'relative'
                                        }}
                                    >
                                        <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        {design.headerImage?.url === img.url && (
                                            <div style={{
                                                position: 'absolute',
                                                top: 2,
                                                right: 2,
                                                width: '20px',
                                                height: '20px',
                                                background: '#8b5cf6',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid #fff'
                                            }}>
                                                <Check size={12} color="#fff" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Upload Option */}
                                <div style={{
                                    width: '80px',
                                    height: '53px',
                                    borderRadius: '4px',
                                    border: '1px dashed #cbd5e1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <UploadCloud size={20} color="#94a3b8" />
                                </div>
                            </div>
                        </div>

                        {/* YOUR LOGO SECTION */}
                        <div style={{ marginBottom: '0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', textTransform: 'uppercase' }}>
                                    YOUR LOGO
                                </span>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                    128x128px, 1:1 Ratio
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                {/* Remove/Clear Option */}
                                <div
                                    onClick={() => handleLogoUpdate('')}
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        border: '1px solid #e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        background: '#fff'
                                    }}
                                >
                                    <X size={24} color="#cbd5e1" />
                                </div>

                                {/* Logo Options */}
                                {logoOptions.map(img => (
                                    <div
                                        key={img.id}
                                        onClick={() => handleLogoUpdate(img.url)}
                                        style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: design.logo?.url === img.url ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                            cursor: 'pointer',
                                            position: 'relative'
                                        }}
                                    >
                                        <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        {design.logo?.url === img.url && (
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                width: '20px',
                                                height: '20px',
                                                background: '#8b5cf6',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid #fff'
                                            }}>
                                                <Check size={12} color="#fff" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Upload Option */}
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    border: '1px dashed #cbd5e1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <UploadCloud size={20} color="#94a3b8" />
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* BASIC INFORMATION ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsBasicInfoOpen(!isBasicInfoOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isBasicInfoOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>BASIC INFORMATION</div>
                    </div>
                    {isBasicInfoOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isBasicInfoOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>

                        {/* NAME FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                NAME*
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                                {/* Name Input */}
                                <input
                                    type="text"
                                    value={basicInfo.name || ''}
                                    onChange={(e) => handleBasicInfoUpdate('name', e.target.value)}
                                    placeholder="Bob's Cafe"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '4px',
                                        border: '1px solid #1e293b',
                                        fontSize: '0.9rem',
                                        outline: 'none'
                                    }}
                                />

                                {/* Text Color */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                        Text Color
                                    </label>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #1e293b',
                                        borderRadius: '4px',
                                        padding: '0.5rem',
                                        height: '44px',
                                        gap: '0.5rem'
                                    }}>
                                        <input
                                            type="text"
                                            value={basicInfo.nameColor || '#FFFFFF'}
                                            onChange={(e) => handleBasicInfoUpdate('nameColor', e.target.value)}
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                flex: 1,
                                                fontSize: '0.85rem',
                                                color: '#000',
                                                fontWeight: '500',
                                                textTransform: 'uppercase'
                                            }}
                                        />
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '4px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            border: '1px solid #e2e8f0',
                                            flexShrink: 0
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: basicInfo.nameColor || '#FFFFFF'
                                            }}></div>
                                            <input
                                                type="color"
                                                value={basicInfo.nameColor || '#FFFFFF'}
                                                onChange={(e) => handleBasicInfoUpdate('nameColor', e.target.value)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '-50%',
                                                    left: '-50%',
                                                    width: '200%',
                                                    height: '200%',
                                                    cursor: 'pointer',
                                                    opacity: 0
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Font */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                        Font
                                    </label>
                                    <select
                                        value={basicInfo.nameFont || 'Lato'}
                                        onChange={(e) => handleBasicInfoUpdate('nameFont', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '4px',
                                            border: '1px solid #1e293b',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            background: '#fff'
                                        }}
                                    >
                                        <option value="Lato">Lato</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Open Sans">Open Sans</option>
                                        <option value="Montserrat">Montserrat</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* WEBSITE FIELD */}
                        <div style={{ marginBottom: '0' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                WEBSITE*
                            </label>
                            <input
                                type="text"
                                value={basicInfo.website || ''}
                                onChange={(e) => handleBasicInfoUpdate('website', e.target.value)}
                                placeholder="https://www.bobscafe.com"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '4px',
                                    border: '1px solid #06b6d4',
                                    fontSize: '0.9rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                    </div>
                )}
            </div>

            {/* RATING ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsRatingOpen(!isRatingOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isRatingOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>RATING</div>
                    </div>
                    {isRatingOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isRatingOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>

                        {/* QUESTION FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                QUESTION*
                            </label>
                            <input
                                type="text"
                                value={rating.question || ''}
                                onChange={(e) => handleRatingUpdate('question', e.target.value)}
                                placeholder="How was your rental experience?"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '4px',
                                    border: '1px solid #1e293b',
                                    fontSize: '0.9rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        {/* RATING TYPE OPTIONS */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>

                            {/* Thumbs Up/Down Option */}
                            <div
                                onClick={() => handleRatingUpdate('type', 'thumbs')}
                                style={{
                                    padding: '2rem 1rem',
                                    border: rating.type === 'thumbs' ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    background: '#fff'
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#8b5cf6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem'
                                }}>
                                    👍
                                </div>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#8b5cf6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem'
                                }}>
                                    👎
                                </div>
                            </div>

                            {/* Emoji Faces Option */}
                            <div
                                onClick={() => handleRatingUpdate('type', 'emoji')}
                                style={{
                                    padding: '2rem 1rem',
                                    border: rating.type === 'emoji' ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    cursor: 'pointer',
                                    background: '#fff'
                                }}
                            >
                                <div style={{ fontSize: '2rem', color: '#94a3b8' }}>☹️</div>
                                <div style={{ fontSize: '2rem', color: '#94a3b8' }}>😐</div>
                                <div style={{ fontSize: '2rem', color: '#94a3b8' }}>😊</div>
                            </div>

                            {/* Stars Option */}
                            <div
                                onClick={() => handleRatingUpdate('type', 'stars')}
                                style={{
                                    padding: '2rem 1rem',
                                    border: rating.type === 'stars' ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    background: '#fff'
                                }}
                            >
                                <div style={{ fontSize: '2rem', color: '#cbd5e1' }}>⭐</div>
                                <div style={{ fontSize: '2rem', color: '#cbd5e1' }}>⭐</div>
                                <div style={{ fontSize: '2rem', color: '#cbd5e1' }}>⭐</div>
                            </div>

                        </div>

                        {/* ADD COMMENT SECTION CHECKBOX */}
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={rating.allowComment || false}
                                onChange={(e) => handleRatingUpdate('allowComment', e.target.checked)}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    cursor: 'pointer'
                                }}
                            />
                            <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>Add a comment section for user after rating.</span>
                        </label>

                    </div>
                )}
            </div>

            {/* SOCIAL MEDIA CHANNELS ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsSocialOpen(!isSocialOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isSocialOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>SOCIAL MEDIA CHANNELS</div>
                    </div>
                    {isSocialOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isSocialOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>

                        {/* Selected Social Media Inputs Grid */}
                        {socialLinks.length > 0 && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                {socialLinks.map((link) => {
                                    const platform = socialPlatforms.find(p => p.id === link.platform);
                                    if (!platform) return null;
                                    const Icon = platform.icon;

                                    return (
                                        <div key={link.id} style={{ position: 'relative' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                                                    {platform.name}*
                                                </label>
                                                <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                                    <div 
                                                        style={{ 
                                                            cursor: 'pointer',
                                                            padding: '0.25rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }} 
                                                        onClick={() => handleSocialLinkUnselect(link.id)}
                                                        title="Unselect"
                                                    >
                                                        <X size={16} color="#cbd5e1" />
                                                    </div>
                                                    <div 
                                                        style={{ 
                                                            cursor: 'grab',
                                                            padding: '0.25rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                        title="Drag to reorder"
                                                    >
                                                        <GripVertical size={16} color="#cbd5e1" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    left: '12px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    width: '24px',
                                                    height: '24px',
                                                    background: platform.gradient || platform.color,
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    zIndex: 1
                                                }}>
                                                    <Icon size={16} color={platform.textColor || "#fff"} />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={link.url || ''}
                                                    onChange={(e) => handleSocialLinkUpdate(link.id, e.target.value)}
                                                    placeholder="https://"
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem 0.75rem 0.75rem 3rem',
                                                        borderRadius: '4px',
                                                        border: '1px solid #1e293b',
                                                        fontSize: '0.9rem',
                                                        outline: 'none'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* ADD MORE Section */}
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                ADD MORE
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                Click on the icon to add a social media profile.
                            </div>

                            {/* Social Media Icons Grid */}
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {socialPlatforms.map((platform) => {
                                    const Icon = platform.icon;
                                    const isAdded = socialLinks.some(link => link.platform === platform.id);
                                    
                                    return (
                                        <div
                                            key={platform.id}
                                            onClick={() => !isAdded && handleSocialLinkAdd(platform.id)}
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                background: platform.gradient || platform.color,
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: isAdded ? 'not-allowed' : 'pointer',
                                                opacity: isAdded ? 0.5 : 1,
                                                transition: 'transform 0.1s',
                                                border: isAdded ? '2px solid #cbd5e1' : 'none'
                                            }}
                                            title={isAdded ? `${platform.name} already added` : `Add ${platform.name}`}
                                            onMouseEnter={(e) => {
                                                if (!isAdded) e.currentTarget.style.transform = 'scale(1.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                        >
                                            <Icon size={24} color={platform.textColor || "#fff"} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default RatingConfig;

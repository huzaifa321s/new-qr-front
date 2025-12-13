import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check, Facebook, Instagram, Twitter, Linkedin, Youtube, Globe, MessageCircle, Music, MessageSquare, Twitch, Send, Ghost, Headphones, Pin, Bot } from 'lucide-react';
import { useState } from 'react';
import ReusableDesignAccordion from './ReusableDesignAccordion';

const SocialMediaConfig = ({ config, onChange }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);
    const [isShareOptionOpen, setIsShareOptionOpen] = useState(false);

    const design = config.design || {};
    const basicInfo = config.basicInfo || {};
    const social = config.social || {};
    const shareOption = config.shareOption || {};

    const primaryColor = design.color?.header || '#0B2D86';
    const secondaryColor = design.color?.light || '#FFA800';

    const handleDesignUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            design: { ...prev.design, [key]: value }
        }));
    };

    const handleDesignSectionUpdate = (key, value) => {
        onChange(prev => {
            const newDesign = { ...prev.design };
            const keys = key.split('.');
            if (keys.length === 1) {
                newDesign[keys[0]] = value;
            } else {
                if (!newDesign[keys[0]]) newDesign[keys[0]] = {};
                newDesign[keys[0]] = { ...newDesign[keys[0]], [keys[1]]: value };
            }
            return { ...prev, design: newDesign };
        });
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

    const handleBackgroundImageUpdate = (url) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                backgroundImage: { url }
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

    const handleSocialUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            social: {
                ...prev.social,
                [key]: value
            }
        }));
    };

    const handleDeleteSocial = (urlKey, textKey) => {
        onChange(prev => {
            const newSocial = { ...prev.social };
            delete newSocial[urlKey];
            delete newSocial[textKey];
            return { ...prev, social: newSocial };
        });
    };

    const handleAddSocial = (urlKey, textKey) => {
        if (social[urlKey] !== undefined) return; // Already active
        onChange(prev => ({
            ...prev,
            social: {
                ...prev.social,
                [urlKey]: '',
                [textKey]: ''
            }
        }));
    };

    const handleShareOptionUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            shareOption: {
                ...prev.shareOption,
                [key]: value
            }
        }));
    };

    const platformConfig = [
        { id: 'website', urlKey: 'websiteUrl', textKey: 'websiteText', name: 'Website', icon: Globe, color: '#6366f1', placeholder: 'https://' },
        { id: 'facebook', urlKey: 'facebookUrl', textKey: 'facebookText', name: 'Facebook', icon: Facebook, color: '#1877f2', placeholder: 'https://facebook.com/...' },
        { id: 'instagram', urlKey: 'instagramUrl', textKey: 'instagramText', name: 'Instagram', icon: Instagram, color: '#E4405F', placeholder: 'https://instagram.com/...' },
        { id: 'twitter', urlKey: 'twitterUrl', textKey: 'twitterText', name: 'X (Twitter)', icon: Twitter, color: '#000000', placeholder: 'https://x.com/...' },
        { id: 'linkedin', urlKey: 'linkedinUrl', textKey: 'linkedinText', name: 'LinkedIn', icon: Linkedin, color: '#0a66c2', placeholder: 'https://linkedin.com/in/...' },
        { id: 'discord', urlKey: 'discordUrl', textKey: 'discordText', name: 'Discord', icon: MessageSquare, color: '#5865f2', placeholder: 'https://discord.gg/...' },
        { id: 'twitch', urlKey: 'twitchUrl', textKey: 'twitchText', name: 'Twitch', icon: Twitch, color: '#9146ff', placeholder: 'https://twitch.tv/...' },
        { id: 'kickstarter', urlKey: 'kickstarterUrl', textKey: 'kickstarterText', name: 'Kickstarter', icon: ({ size }) => <span style={{ fontSize: size, fontWeight: 'bold' }}>K</span>, color: '#05ce78', placeholder: 'https://kickstarter.com/...' },
        { id: 'youtube', urlKey: 'youtubeUrl', textKey: 'youtubeText', name: 'YouTube', icon: Youtube, color: '#ff0000', placeholder: 'https://youtube.com/...' },
        { id: 'whatsapp', urlKey: 'whatsappUrl', textKey: 'whatsappText', name: 'WhatsApp', icon: MessageCircle, color: '#25d366', placeholder: 'https://wa.me/...' },
        { id: 'snapchat', urlKey: 'snapchatUrl', textKey: 'snapchatText', name: 'Snapchat', icon: Ghost, color: '#fffc00', placeholder: 'https://snapchat.com/add/...' },
        { id: 'tiktok', urlKey: 'tiktokUrl', textKey: 'tiktokText', name: 'TikTok', icon: Music, color: '#000000', placeholder: 'https://tiktok.com/@...' },
        { id: 'tumblr', urlKey: 'tumblrUrl', textKey: 'tumblrText', name: 'Tumblr', icon: ({ size }) => <span style={{ fontSize: size, fontWeight: 'bold' }}>t</span>, color: '#35465c', placeholder: 'https://tumblr.com/...' },
        { id: 'spotify', urlKey: 'spotifyUrl', textKey: 'spotifyText', name: 'Spotify', icon: Headphones, color: '#1db954', placeholder: 'https://open.spotify.com/...' },
        { id: 'telegram', urlKey: 'telegramUrl', textKey: 'telegramText', name: 'Telegram', icon: Send, color: '#0088cc', placeholder: 'https://t.me/...' },
        { id: 'behance', urlKey: 'behanceUrl', textKey: 'behanceText', name: 'Behance', icon: ({ size }) => <span style={{ fontSize: Math.max(10, size - 4), fontWeight: 'bold' }}>Bē</span>, color: '#1769ff', placeholder: 'https://behance.net/...' },
        { id: 'pinterest', urlKey: 'pinterestUrl', textKey: 'pinterestText', name: 'Pinterest', icon: Pin, color: '#e60023', placeholder: 'https://pinterest.com/...' },
        { id: 'reddit', urlKey: 'redditUrl', textKey: 'redditText', name: 'Reddit', icon: Bot, color: '#ff4500', placeholder: 'https://reddit.com/user/...' },
    ];

    const palettes = [
        { p: '#0B2D86', s: '#FFA800' },
        { p: '#FACC15', s: '#FEF9C3' },
        { p: '#8B5CF6', s: '#C4B5FD' },
        { p: '#16A34A', s: '#86EFAC' },
        { p: '#06B6D4', s: '#67E8F9' }
    ];

    const backgroundImageOptions = [
        { id: 'bg1', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=267&fit=crop' },
        { id: 'bg2', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=267&fit=crop' },
        { id: 'bg3', url: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=267&fit=crop' },
        { id: 'bg4', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=267&fit=crop' },
        { id: 'bg5', url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=267&fit=crop' }
    ];

    const logoOptions = [
        { id: 'logo1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
        { id: 'logo2', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop' },
        { id: 'logo3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' }
    ];

    return (
        <div>
            {/* DESIGN ACCORDION */}
            <ReusableDesignAccordion
                design={{
                    ...design,
                    color: {
                        ...design.color,
                        header: design.color?.header || '#0B2D86',
                        light: design.color?.light || '#FFA800'
                    }
                }}
                onChange={handleDesignSectionUpdate}
                isOpen={isDesignOpen}
                onToggle={() => setIsDesignOpen(!isDesignOpen)}
                colorKeys={{ primary: 'color.header', secondary: 'color.light' }}
                palettes={palettes}
                showLogo={false}
            >
                {/* BACKGROUND IMAGE SECTION */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', textTransform: 'uppercase' }}>
                            BACKGROUND IMAGE
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                            Minimum width : 400px, 3:2 Ratio
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Remove/Clear Option */}
                        <div
                            onClick={() => handleBackgroundImageUpdate('')}
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

                        {/* Background Image Options */}
                        {backgroundImageOptions.map(img => (
                            <div
                                key={img.id}
                                onClick={() => handleBackgroundImageUpdate(img.url)}
                                style={{
                                    width: '80px',
                                    height: '53px',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    border: design.backgroundImage?.url === img.url ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                            >
                                <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {design.backgroundImage?.url === img.url && (
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

                {/* LOGO SECTION */}
                <div style={{ marginBottom: '0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', textTransform: 'uppercase' }}>
                            LOGO
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
            </ReusableDesignAccordion>

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

                        {/* HEADLINE FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                HEADLINE*
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                                {/* Headline Input */}
                                <input
                                    type="text"
                                    value={basicInfo.headline || ''}
                                    onChange={(e) => handleBasicInfoUpdate('headline', e.target.value)}
                                    placeholder="Connect with us on social media"
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
                                        height: '44px'
                                    }}>
                                        <input
                                            type="text"
                                            value={basicInfo.headlineColor || '#FFFFFF'}
                                            onChange={(e) => handleBasicInfoUpdate('headlineColor', e.target.value)}
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                width: '100%',
                                                fontSize: '0.85rem',
                                                color: '#000',
                                                fontWeight: '500',
                                                textTransform: 'uppercase'
                                            }}
                                        />
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            background: basicInfo.headlineColor || '#FFFFFF',
                                            borderRadius: '2px',
                                            flexShrink: 0,
                                            border: '1px solid #e2e8f0',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            cursor: 'pointer'
                                        }}>
                                            <input
                                                type="color"
                                                value={basicInfo.headlineColor || '#FFFFFF'}
                                                onChange={(e) => handleBasicInfoUpdate('headlineColor', e.target.value)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '-50%',
                                                    left: '-50%',
                                                    width: '200%',
                                                    height: '200%',
                                                    cursor: 'pointer',
                                                    opacity: 0,
                                                    padding: 0,
                                                    margin: 0
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
                                        value={basicInfo.headlineFont || 'Lato'}
                                        onChange={(e) => handleBasicInfoUpdate('headlineFont', e.target.value)}
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

                        {/* ABOUT US FIELD */}
                        <div style={{ marginBottom: '0' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                ABOUT US
                            </label>
                            <textarea
                                value={basicInfo.aboutUs || ''}
                                onChange={(e) => handleBasicInfoUpdate('aboutUs', e.target.value)}
                                placeholder="Follow us and get updates delivered to your favorite social media channel."
                                rows={3}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '4px',
                                    border: '1px solid #1e293b',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

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

                        {/* Dynamic Render of Active Platforms */}
                        {platformConfig.filter(p => social[p.urlKey] !== undefined).map(platform => {
                            const Icon = platform.icon;
                            const isUrlInvalid = social[platform.urlKey] && !social[platform.urlKey].startsWith('http');

                            return (
                                <div key={platform.id} style={{ marginBottom: '2rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        {/* URL Input */}
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                                {platform.name.toUpperCase()}
                                            </label>
                                            <div style={{ marginBottom: '0.25rem' }}>
                                                <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                                    URL
                                                </label>
                                                <div style={{ position: 'relative' }}>
                                                    <div style={{
                                                        position: 'absolute',
                                                        left: '12px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        width: '24px',
                                                        height: '24px',
                                                        background: platform.color,
                                                        borderRadius: '4px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '0.9rem',
                                                        color: platform.color === '#fffc00' ? '#000' : '#fff'
                                                    }}>
                                                        <Icon size={14} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={social[platform.urlKey] || ''}
                                                        onChange={(e) => handleSocialUpdate(platform.urlKey, e.target.value)}
                                                        placeholder={platform.placeholder}
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem 0.75rem 0.75rem 3rem',
                                                            borderRadius: '4px',
                                                            border: isUrlInvalid ? '1px solid #ef4444' : '1px solid #e2e8f0', // Only erroneous if invalid
                                                            fontSize: '0.9rem',
                                                            outline: 'none'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {isUrlInvalid && (
                                                <div style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '0.25rem' }}>
                                                    Please enter a valid URL (starting with http/https).
                                                </div>
                                            )}
                                        </div>

                                        {/* Text Input */}
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem', marginTop: '1.7rem' }}>
                                                Text
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <input
                                                    type="text"
                                                    value={social[platform.textKey] || ''}
                                                    onChange={(e) => handleSocialUpdate(platform.textKey, e.target.value)}
                                                    placeholder={platform.name}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem',
                                                        paddingRight: '3rem',
                                                        borderRadius: '4px',
                                                        border: '1px solid #1e293b',
                                                        fontSize: '0.9rem',
                                                        outline: 'none'
                                                    }}
                                                />
                                                <div
                                                    onClick={() => handleDeleteSocial(platform.urlKey, platform.textKey)}
                                                    style={{
                                                        position: 'absolute',
                                                        right: '12px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        color: '#ef4444'
                                                    }}
                                                    title="Remove Platform"
                                                >
                                                    <X size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* ADD MORE Section */}
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                ADD MORE
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                Click on the icon to add a social media profile.
                            </div>

                            {/* Social Media Icons Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48px, 1fr))', gap: '0.75rem' }}>
                                {platformConfig.map(platform => {
                                    const Icon = platform.icon;
                                    const isActive = social[platform.urlKey] !== undefined;
                                    return (
                                        <div
                                            key={platform.id}
                                            onClick={() => handleAddSocial(platform.urlKey, platform.textKey)}
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                background: platform.color,
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: isActive ? 'default' : 'pointer',
                                                opacity: isActive ? 0.5 : 1, // Dim if active
                                                color: platform.color === '#fffc00' ? '#000' : '#fff'
                                            }}
                                            title={isActive ? "Already added" : `Add ${platform.name}`}
                                        >
                                            <Icon size={24} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* SHARE OPTION ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsShareOptionOpen(!isShareOptionOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isShareOptionOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>SHARE OPTION</div>
                    </div>
                    {isShareOptionOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isShareOptionOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>

                        {/* SHARE MESSAGE FIELD */}
                        <div style={{ marginBottom: '0' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                SHARE MESSAGE
                            </label>
                            <input
                                type="text"
                                value={shareOption.shareMessage || ''}
                                onChange={(e) => handleShareOptionUpdate('shareMessage', e.target.value)}
                                placeholder="ssss"
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

                    </div>
                )}
            </div>
        </div>
    );
};

export default SocialMediaConfig;

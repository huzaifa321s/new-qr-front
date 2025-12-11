import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check, Phone, Mail, Globe } from 'lucide-react';
import { useState } from 'react';
import ReusableDesignAccordion from './ReusableDesignAccordion';

const BioPageConfig = ({ config, onChange }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);

    const design = config.design || {};
    const basicInfo = config.basicInfo || {};
    const contact = config.contact || {};
    const social = config.social || {};

    const primaryColor = design.color?.header || '#7D2AE7';
    const secondaryColor = design.color?.light || '#C291FF';

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

    const handlePictureUpdate = (url) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                picture: { url }
            }
        }));
    };

    const handlePictureFrameUpdate = (frame) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                pictureFrame: frame
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

    const handleContactUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
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

    const palettes = [
        { p: '#0B2D86', s: '#FFA800' },
        { p: '#FACC15', s: '#FEF9C3' },
        { p: '#8B5CF6', s: '#C4B5FD' },
        { p: '#16A34A', s: '#86EFAC' },
        { p: '#06B6D4', s: '#67E8F9' }
    ];

    const pictureOptions = [
        { id: 'pic1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
        { id: 'pic2', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop' },
        { id: 'pic3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
        { id: 'pic4', url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }
    ];

    return (
        <div>
            {/* DESIGN ACCORDION */}
            <ReusableDesignAccordion
                design={{
                    ...design,
                    color: {
                        ...design.color,
                        header: design.color?.header || '#7D2AE7',
                        light: design.color?.light || '#C291FF'
                    },
                    picture: {
                        ...design.picture,
                        url: design.picture?.url
                    }
                }}
                onChange={handleDesignSectionUpdate}
                isOpen={isDesignOpen}
                onToggle={() => setIsDesignOpen(!isDesignOpen)}
                colorKeys={{ primary: 'color.header', secondary: 'color.light' }}
                palettes={palettes}
                logoKey="picture.url"
                logoOptions={pictureOptions}
                logoLabel="YOUR PICTURE"
                logoHelpText="128x128px, 1:1 Ratio"
            >
                {/* PICTURE FRAME SECTION - Passed as Children */}
                <div style={{ marginBottom: '0' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '1rem', textTransform: 'uppercase' }}>
                        PICTURE FRAME
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        {/* Rectangular Option */}
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            color: '#1e293b'
                        }}>
                            <input
                                type="radio"
                                name="pictureFrame"
                                checked={design.pictureFrame === 'rectangular'}
                                onChange={() => handlePictureFrameUpdate('rectangular')}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    accentColor: '#8b5cf6',
                                    cursor: 'pointer'
                                }}
                            />
                            Rectangular
                        </label>

                        {/* Circular Option */}
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            color: '#1e293b'
                        }}>
                            <input
                                type="radio"
                                name="pictureFrame"
                                checked={design.pictureFrame === 'circular' || !design.pictureFrame}
                                onChange={() => handlePictureFrameUpdate('circular')}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    accentColor: '#8b5cf6',
                                    cursor: 'pointer'
                                }}
                            />
                            Circular
                        </label>
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
                                    placeholder="HARRY TAYLOR"
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
                                            value={basicInfo.nameColor || '#7D2AE7'}
                                            onChange={(e) => handleBasicInfoUpdate('nameColor', e.target.value)}
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
                                            background: basicInfo.nameColor || '#7D2AE7',
                                            borderRadius: '2px',
                                            flexShrink: 0
                                        }}></div>
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

                        {/* COMPANY NAME FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                COMPANY NAME
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                                {/* Company Name Input */}
                                <input
                                    type="text"
                                    value={basicInfo.companyName || ''}
                                    onChange={(e) => handleBasicInfoUpdate('companyName', e.target.value)}
                                    placeholder="Designer & Photographer"
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
                                            value={basicInfo.companyNameColor || '#000000'}
                                            onChange={(e) => handleBasicInfoUpdate('companyNameColor', e.target.value)}
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
                                            background: basicInfo.companyNameColor || '#000000',
                                            borderRadius: '2px',
                                            flexShrink: 0
                                        }}></div>
                                    </div>
                                </div>

                                {/* Font */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                        Font
                                    </label>
                                    <select
                                        value={basicInfo.companyNameFont || 'Lato'}
                                        onChange={(e) => handleBasicInfoUpdate('companyNameFont', e.target.value)}
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

                        {/* DESCRIPTION FIELD */}
                        <div style={{ marginBottom: '0' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                DESCRIPTION
                            </label>
                            <textarea
                                value={basicInfo.description || ''}
                                onChange={(e) => handleBasicInfoUpdate('description', e.target.value)}
                                placeholder="I am a designer & photographer working in International company. I am a designer & photographer working in International company."
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

            {/* CONTACT DETAILS ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsContactOpen(!isContactOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isContactOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>CONTACT DETAILS</div>
                    </div>
                    {isContactOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isContactOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>

                        {/* PHONE NUMBER */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: '1rem', alignItems: 'end' }}>
                                {/* Phone Icon Box */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    border: '1px solid #1e293b',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Phone size={20} color="#1e293b" />
                                </div>

                                {/* Phone Number Input */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={contact.phone || ''}
                                        onChange={(e) => handleContactUpdate('phone', e.target.value)}
                                        placeholder="15555551234"
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

                                {/* Button Title */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                                        Button Title
                                    </label>
                                    <input
                                        type="text"
                                        value={contact.phoneButtonTitle || ''}
                                        onChange={(e) => handleContactUpdate('phoneButtonTitle', e.target.value)}
                                        placeholder="Talk to Me"
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
                        </div>

                        {/* EMAIL */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: '1rem', alignItems: 'end' }}>
                                {/* Email Icon Box */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    border: '1px solid #1e293b',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Mail size={20} color="#1e293b" />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={contact.email || ''}
                                        onChange={(e) => handleContactUpdate('email', e.target.value)}
                                        placeholder="Hellen@gmail.com"
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

                                {/* Button Title */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                                        Button Title
                                    </label>
                                    <input
                                        type="text"
                                        value={contact.emailButtonTitle || ''}
                                        onChange={(e) => handleContactUpdate('emailButtonTitle', e.target.value)}
                                        placeholder="Email Me"
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
                        </div>

                        {/* WEBSITE */}
                        <div style={{ marginBottom: '0' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: '1rem', alignItems: 'end' }}>
                                {/* Website Icon Box */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    border: '1px solid #1e293b',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Globe size={20} color="#1e293b" />
                                </div>

                                {/* Website Input */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                                        Website
                                    </label>
                                    <input
                                        type="text"
                                        value={contact.website || ''}
                                        onChange={(e) => handleContactUpdate('website', e.target.value)}
                                        placeholder="https://Hellengrey.com"
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

                                {/* Button Title */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                                        Button Title
                                    </label>
                                    <input
                                        type="text"
                                        value={contact.websiteButtonTitle || ''}
                                        onChange={(e) => handleContactUpdate('websiteButtonTitle', e.target.value)}
                                        placeholder="Visit Us"
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

                        {/* Social Media Inputs Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>

                            {/* Facebook */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                    Facebook*
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        background: '#1877f2',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}>
                                        f
                                    </div>
                                    <input
                                        type="text"
                                        value={social.facebook || ''}
                                        onChange={(e) => handleSocialUpdate('facebook', e.target.value)}
                                        placeholder="https://"
                                        style={{
                                            flex: 1,
                                            padding: '0.5rem',
                                            borderRadius: '4px',
                                            border: '1px solid #1e293b',
                                            fontSize: '0.85rem',
                                            outline: 'none',
                                            color: '#94a3b8'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Instagram */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                    Instagram*
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        fontSize: '18px',
                                        color: '#fff'
                                    }}>
                                        📷
                                    </div>
                                    <input
                                        type="text"
                                        value={social.instagram || ''}
                                        onChange={(e) => handleSocialUpdate('instagram', e.target.value)}
                                        placeholder="https://"
                                        style={{
                                            flex: 1,
                                            padding: '0.5rem',
                                            borderRadius: '4px',
                                            border: '1px solid #1e293b',
                                            fontSize: '0.85rem',
                                            outline: 'none',
                                            color: '#94a3b8'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Website */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                    Website*
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        background: '#6366f1',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Globe size={18} color="#fff" />
                                    </div>
                                    <input
                                        type="text"
                                        value={social.website || ''}
                                        onChange={(e) => handleSocialUpdate('website', e.target.value)}
                                        placeholder="https://"
                                        style={{
                                            flex: 1,
                                            padding: '0.5rem',
                                            borderRadius: '4px',
                                            border: '1px solid #1e293b',
                                            fontSize: '0.85rem',
                                            outline: 'none',
                                            color: '#94a3b8'
                                        }}
                                    />
                                </div>
                            </div>

                        </div>

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
                                {/* Facebook */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#1877f2',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    f
                                </div>

                                {/* Instagram */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    📷
                                </div>

                                {/* X (Twitter) */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#000',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    𝕏
                                </div>

                                {/* LinkedIn */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#0077b5',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    in
                                </div>

                                {/* Discord */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#5865f2',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: '#fff'
                                }}>
                                    💬
                                </div>

                                {/* Twitch */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#9146ff',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: '#fff'
                                }}>
                                    📺
                                </div>

                                {/* Line */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#00b900',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    L
                                </div>

                                {/* YouTube */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#ff0000',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: '#fff'
                                }}>
                                    ▶
                                </div>

                                {/* WhatsApp */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#25d366',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: '#fff'
                                }}>
                                    💬
                                </div>

                                {/* Snapchat */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#fffc00',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: '#000'
                                }}>
                                    👻
                                </div>

                                {/* TikTok */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#000',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: '#fff'
                                }}>
                                    ♪
                                </div>

                                {/* Tumblr */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#35465c',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    t
                                </div>

                                {/* Spotify */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#1db954',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: '#fff'
                                }}>
                                    🎵
                                </div>

                                {/* Dribbble */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#ea4c89',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: '#fff'
                                }}>
                                    🏀
                                </div>

                                {/* Pinterest */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#e60023',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    P
                                </div>

                                {/* Telegram */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#0088cc',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: '#fff'
                                }}>
                                    ✈️
                                </div>

                                {/* Behance */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#1769ff',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    Bē
                                </div>

                                {/* Reddit */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#ff4500',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: '#fff'
                                }}>
                                    👽
                                </div>

                                {/* Website */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#6366f1',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <Globe size={20} color="#fff" />
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default BioPageConfig;

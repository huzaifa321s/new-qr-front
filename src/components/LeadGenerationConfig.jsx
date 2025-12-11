import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check } from 'lucide-react';
import { useState } from 'react';

const LeadGenerationConfig = ({ config, onChange }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isThankYouOpen, setIsThankYouOpen] = useState(false);

    const design = config.design || {};
    const basicInfo = config.basicInfo || {};
    const form = config.form || {
        fullName: true,
        contactNumber: false,
        organizationName: false,
        email: true,
        jobTitle: false,
        website: false
    };
    const thankYou = config.thankYou || {};

    const primaryColor = design.color?.header || '#6F0101';
    const secondaryColor = design.color?.light || '#FFFFFF';

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

    const handleFormFieldToggle = (field) => {
        onChange(prev => ({
            ...prev,
            form: {
                ...prev.form,
                [field]: !prev.form?.[field]
            }
        }));
    };

    const handleThankYouUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            thankYou: {
                ...prev.thankYou,
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

                        {/* COMPANY NAME FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                COMPANY NAME*
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                                {/* Company Name Input */}
                                <input
                                    type="text"
                                    value={basicInfo.companyName || ''}
                                    onChange={(e) => handleBasicInfoUpdate('companyName', e.target.value)}
                                    placeholder="Sterling & Co"
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
                                            value={basicInfo.companyNameColor || '#FFFFFF'}
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
                                            background: basicInfo.companyNameColor || '#FFFFFF',
                                            borderRadius: '2px',
                                            flexShrink: 0,
                                            border: '1px solid #e2e8f0'
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

                        {/* HEADLINE FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                HEADLINE
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                                {/* Headline Input */}
                                <input
                                    type="text"
                                    value={basicInfo.headline || ''}
                                    onChange={(e) => handleBasicInfoUpdate('headline', e.target.value)}
                                    placeholder="Important Document"
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
                                            border: '1px solid #e2e8f0'
                                        }}></div>
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

                        {/* DESCRIPTION FIELD */}
                        <div style={{ marginBottom: '0' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                DESCRIPTION
                            </label>
                            <textarea
                                value={basicInfo.description || ''}
                                onChange={(e) => handleBasicInfoUpdate('description', e.target.value)}
                                placeholder="Download this document today."
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

            {/* CREATE A FORM FOR USER ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isFormOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>CREATE A FORM FOR USER</div>
                    </div>
                    {isFormOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isFormOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>

                        {/* Form Fields Checkboxes */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>

                            {/* Full Name */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.fullName || false}
                                    onChange={() => handleFormFieldToggle('fullName')}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        accentColor: '#06b6d4'
                                    }}
                                />
                                <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>Full Name</span>
                            </label>

                            {/* Contact Number */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.contactNumber || false}
                                    onChange={() => handleFormFieldToggle('contactNumber')}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        accentColor: '#06b6d4'
                                    }}
                                />
                                <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>Contact Number</span>
                            </label>

                            {/* Organization Name */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.organizationName || false}
                                    onChange={() => handleFormFieldToggle('organizationName')}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        accentColor: '#06b6d4'
                                    }}
                                />
                                <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>Organization Name</span>
                            </label>

                            {/* Email */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.email || false}
                                    onChange={() => handleFormFieldToggle('email')}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        accentColor: '#06b6d4'
                                    }}
                                />
                                <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>Email</span>
                            </label>

                            {/* Job Title */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.jobTitle || false}
                                    onChange={() => handleFormFieldToggle('jobTitle')}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        accentColor: '#06b6d4'
                                    }}
                                />
                                <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>Job Title</span>
                            </label>

                            {/* Website */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.website || false}
                                    onChange={() => handleFormFieldToggle('website')}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        accentColor: '#06b6d4'
                                    }}
                                />
                                <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>Website</span>
                            </label>

                        </div>

                        {/* Add Customized Button */}
                        <button
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1rem',
                                background: '#8b5cf6',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>+</span>
                            <span>Add Customized</span>
                        </button>

                    </div>
                )}
            </div>

            {/* THANK YOU BUTTON AFTER SUBMIT ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsThankYouOpen(!isThankYouOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isThankYouOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>THANK YOU BUTTON AFTER SUBMIT</div>
                    </div>
                    {isThankYouOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isThankYouOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>

                        {/* THANKYOU MESSAGE FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                THANKYOU MESSAGE*
                            </label>
                            <textarea
                                value={thankYou.message || ''}
                                onChange={(e) => handleThankYouUpdate('message', e.target.value)}
                                placeholder="Thanks for submitting! You can now download your content, thanks again"
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

                        {/* BUTTON TEXT FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                BUTTON TEXT
                            </label>
                            <input
                                type="text"
                                value={thankYou.buttonText || ''}
                                onChange={(e) => handleThankYouUpdate('buttonText', e.target.value)}
                                placeholder="Download"
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

                        {/* URL FIELD */}
                        <div style={{ marginBottom: '0' }}>
                            <input
                                type="text"
                                value={thankYou.url || ''}
                                onChange={(e) => handleThankYouUpdate('url', e.target.value)}
                                placeholder="Enter the URL to download the content"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '4px',
                                    border: '1px solid #1e293b',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    color: '#94a3b8'
                                }}
                            />
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadGenerationConfig;

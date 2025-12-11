import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check, Clock, Wifi, Baby, Accessibility, Utensils, Plane, PawPrint, Car, Bed, Coffee, Wine, Phone, Mail, Globe } from 'lucide-react';

import { useState } from 'react';
import ReusableDesignAccordion from './ReusableDesignAccordion';

const BusinessPageConfig = ({ config, onChange }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isOpeningHoursOpen, setIsOpeningHoursOpen] = useState(false);
    const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);

    const design = config.design || {};
    const businessInfo = config.businessInfo || {};
    const openingHours = config.openingHours || {
        monday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        tuesday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        wednesday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        thursday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        friday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        saturday: { enabled: true, open: '08:00 AM', close: '08:00 AM' },
        sunday: { enabled: false, open: '08:00 AM', close: '08:00 AM' }
    };
    const facilities = Array.isArray(config.facilities) ? config.facilities : [];
    const contact = config.contact || {};
    const social = config.social || {};

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

    const handlePictureUpdate = (url) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                picture: { url }
            }
        }));
    };

    const handleBusinessInfoUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            businessInfo: {
                ...prev.businessInfo,
                [key]: value
            }
        }));
    };

    const handleOpeningHoursUpdate = (day, field, value) => {
        onChange(prev => ({
            ...prev,
            openingHours: {
                ...prev.openingHours,
                [day]: {
                    ...prev.openingHours?.[day],
                    [field]: value
                }
            }
        }));
    };

    const handleFacilityToggle = (facility) => {
        onChange(prev => {
            const currentFacilities = prev.facilities || [];
            const isSelected = currentFacilities.includes(facility);
            return {
                ...prev,
                facilities: isSelected
                    ? currentFacilities.filter(f => f !== facility)
                    : [...currentFacilities, facility]
            };
        });
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
                        header: design.color?.header || '#0B2D86',
                        light: design.color?.light || '#FFA800'
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
            />

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

                {
                    isBasicInfoOpen && (
                        <div style={{ padding: '2rem', background: '#fff' }}>

                            {/* COMPANY NAME */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                            COMPANY NAME*
                                        </label>
                                        <input
                                            type="text"
                                            value={businessInfo.companyName || ''}
                                            onChange={(e) => handleBusinessInfoUpdate('companyName', e.target.value)}
                                            placeholder="Royal's Cafe"
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

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
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
                                                value={businessInfo.companyNameColor || '#FFFFFF'}
                                                onChange={(e) => handleBusinessInfoUpdate('companyNameColor', e.target.value)}
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
                                                background: businessInfo.companyNameColor || '#FFFFFF',
                                                borderRadius: '2px',
                                                flexShrink: 0,
                                                border: '1px solid #e2e8f0'
                                            }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                            Font
                                        </label>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            border: '1px solid #1e293b',
                                            borderRadius: '4px',
                                            padding: '0.75rem',
                                            height: '44px',
                                            cursor: 'pointer'
                                        }}>
                                            <span style={{ fontSize: '0.9rem', color: '#000' }}>
                                                {businessInfo.companyNameFont || 'Lato'}
                                            </span>
                                            <ChevronDown size={14} color="#94a3b8" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* HEADLINE */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                            HEADLINE
                                        </label>
                                        <input
                                            type="text"
                                            value={businessInfo.headline || ''}
                                            onChange={(e) => handleBusinessInfoUpdate('headline', e.target.value)}
                                            placeholder="Eat. Refresh. Go."
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

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
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
                                                value={businessInfo.headlineColor || '#FFFFFF'}
                                                onChange={(e) => handleBusinessInfoUpdate('headlineColor', e.target.value)}
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
                                                background: businessInfo.headlineColor || '#FFFFFF',
                                                borderRadius: '2px',
                                                flexShrink: 0,
                                                border: '1px solid #e2e8f0'
                                            }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                            Font
                                        </label>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            border: '1px solid #1e293b',
                                            borderRadius: '4px',
                                            padding: '0.75rem',
                                            height: '44px',
                                            cursor: 'pointer'
                                        }}>
                                            <span style={{ fontSize: '0.9rem', color: '#000' }}>
                                                {businessInfo.headlineFont || 'Lato'}
                                            </span>
                                            <ChevronDown size={14} color="#94a3b8" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    DESCRIPTION
                                </label>
                                <textarea
                                    value={businessInfo.description || ''}
                                    onChange={(e) => handleBusinessInfoUpdate('description', e.target.value)}
                                    placeholder="We aim to provide fresh and healthy snacks people on the go."
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

                            {/* BUTTON */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    BUTTON
                                </label>
                                <input
                                    type="text"
                                    value={businessInfo.button || ''}
                                    onChange={(e) => handleBusinessInfoUpdate('button', e.target.value)}
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

                            {/* WEBSITE */}
                            <div style={{ marginBottom: '0' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    WEBSITE
                                </label>
                                <input
                                    type="text"
                                    value={businessInfo.website || ''}
                                    onChange={(e) => handleBusinessInfoUpdate('website', e.target.value)}
                                    placeholder="https://www.abcboutique.henerrival.com"
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
                    )
                }
            </div >

            {/* OPENING HOURS ACCORDION */}
            < div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsOpeningHoursOpen(!isOpeningHoursOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isOpeningHoursOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>OPENING HOURS</div>
                    </div>
                    {isOpeningHoursOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {
                    isOpeningHoursOpen && (
                        <div style={{ padding: '2rem', background: '#fff' }}>

                            {/* Time Format Toggle */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <button style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '4px',
                                    background: '#fff',
                                    color: '#64748b',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}>
                                    24 hrs
                                </button>
                                <button style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #8b5cf6',
                                    borderRadius: '4px',
                                    background: '#fff',
                                    color: '#8b5cf6',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    fontWeight: '500'
                                }}>
                                    AM/PM
                                </button>
                            </div>

                            {/* Days Schedule */}
                            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                                <div key={day} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '40px 150px 1fr 1fr',
                                    gap: '1rem',
                                    alignItems: 'center',
                                    marginBottom: '1rem',
                                    paddingBottom: '1rem',
                                    borderBottom: day !== 'sunday' ? '1px solid #f1f5f9' : 'none'
                                }}>
                                    {/* Checkbox */}
                                    <input
                                        type="checkbox"
                                        checked={openingHours[day]?.enabled !== false}
                                        onChange={(e) => handleOpeningHoursUpdate(day, 'enabled', e.target.checked)}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            accentColor: '#06b6d4',
                                            cursor: 'pointer'
                                        }}
                                    />

                                    {/* Day Name */}
                                    <div style={{
                                        fontSize: '0.9rem',
                                        color: '#1e293b',
                                        textTransform: 'capitalize'
                                    }}>
                                        {day}
                                    </div>

                                    {/* Opening Time */}
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            value={openingHours[day]?.open || '08:00 AM'}
                                            onChange={(e) => handleOpeningHoursUpdate(day, 'open', e.target.value)}
                                            placeholder="08:00 AM"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                paddingRight: '2.5rem',
                                                borderRadius: '4px',
                                                border: '1px solid #e2e8f0',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                color: '#64748b'
                                            }}
                                        />
                                        <Clock size={16} color="#cbd5e1" style={{
                                            position: 'absolute',
                                            right: '0.75rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            pointerEvents: 'none'
                                        }} />
                                    </div>

                                    {/* Closing Time */}
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            value={openingHours[day]?.close || '08:00 AM'}
                                            onChange={(e) => handleOpeningHoursUpdate(day, 'close', e.target.value)}
                                            placeholder="08:00 AM"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                paddingRight: '2.5rem',
                                                borderRadius: '4px',
                                                border: '1px solid #e2e8f0',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                color: '#64748b'
                                            }}
                                        />
                                        <Clock size={16} color="#cbd5e1" style={{
                                            position: 'absolute',
                                            right: '0.75rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            pointerEvents: 'none'
                                        }} />
                                    </div>
                                </div>
                            ))}

                        </div>
                    )
                }
            </div >

            {/* FACILITIES ACCORDION */}
            < div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsFacilitiesOpen(!isFacilitiesOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isFacilitiesOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>FACILITIES</div>
                    </div>
                    {isFacilitiesOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {
                    isFacilitiesOpen && (
                        <div style={{ padding: '2rem', background: '#fff' }}>

                            {/* Facilities Icons */}
                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                {/* WiFi */}
                                <div
                                    onClick={() => handleFacilityToggle('wifi')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('wifi') ? '#3b82f6' : '#94a3b8',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Wifi size={28} />
                                </div>

                                {/* Baby Care */}
                                <div
                                    onClick={() => handleFacilityToggle('baby')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('baby') ? '#3b82f6' : '#94a3b8',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Baby size={28} />
                                </div>

                                {/* Wheelchair Access */}
                                <div
                                    onClick={() => handleFacilityToggle('wheelchair')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('wheelchair') ? '#3b82f6' : '#94a3b8',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Accessibility size={28} />
                                </div>

                                {/* Restaurant */}
                                <div
                                    onClick={() => handleFacilityToggle('restaurant')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('restaurant') ? '#3b82f6' : '#94a3b8',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Utensils size={28} />
                                </div>

                                {/* Smoking Area */}
                                <div
                                    onClick={() => handleFacilityToggle('smoking')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('smoking') ? '#3b82f6' : '#94a3b8',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Plane size={28} />
                                </div>

                                {/* Pet Friendly */}
                                <div
                                    onClick={() => handleFacilityToggle('pets')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('pets') ? '#3b82f6' : '#94a3b8',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <PawPrint size={28} />
                                </div>

                                {/* Parking (P icon - using text) */}
                                <div
                                    onClick={() => handleFacilityToggle('parking')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('parking') ? '#3b82f6' : '#94a3b8',
                                        fontSize: '28px',
                                        fontWeight: 'bold',
                                        width: '28px',
                                        height: '28px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    P
                                </div>

                                {/* Hotel/Accommodation */}
                                <div
                                    onClick={() => handleFacilityToggle('hotel')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('hotel') ? '#3b82f6' : '#94a3b8',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Bed size={28} />
                                </div>

                                {/* Car */}
                                <div
                                    onClick={() => handleFacilityToggle('car')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('car') ? '#3b82f6' : '#94a3b8',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Car size={28} />
                                </div>

                                {/* Coffee */}
                                <div
                                    onClick={() => handleFacilityToggle('coffee')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('coffee') ? '#3b82f6' : '#94a3b8',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Coffee size={28} />
                                </div>

                                {/* Bar/Drinks */}
                                <div
                                    onClick={() => handleFacilityToggle('bar')}
                                    style={{
                                        cursor: 'pointer',
                                        color: facilities.includes('bar') ? '#3b82f6' : '#94a3b8',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <Wine size={28} />
                                </div>
                            </div>

                        </div>
                    )
                }
            </div >

            {/* CONTACT INFORMATION ACCORDION */}
            < div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
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
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>CONTACT INFORMATION</div>
                    </div>
                    {isContactOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {
                    isContactOpen && (
                        <div style={{ padding: '2rem', background: '#fff' }}>

                            {/* NAME OF PERSON */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    NAME OF PERSON
                                </label>
                                <input
                                    type="text"
                                    value={contact.name || ''}
                                    onChange={(e) => handleContactUpdate('name', e.target.value)}
                                    placeholder="Hellegen"
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

                            {/* DESIGNATION IN THE COMPANY */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    DESIGNATION IN THE COMPANY
                                </label>
                                <input
                                    type="text"
                                    value={contact.designation || ''}
                                    onChange={(e) => handleContactUpdate('designation', e.target.value)}
                                    placeholder="Manager"
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

                            {/* LOCATION */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    LOCATION*
                                </label>
                                <input
                                    type="text"
                                    value={contact.location || ''}
                                    onChange={(e) => handleContactUpdate('location', e.target.value)}
                                    placeholder="1000 Marketplace Ave. NY, 10001, United States"
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

                            {/* PHONE */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    {/* Phone Icon Box */}
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Phone size={20} color="#64748b" />
                                    </div>

                                    {/* Phone Input */}
                                    <input
                                        type="text"
                                        value={contact.phone || ''}
                                        onChange={(e) => handleContactUpdate('phone', e.target.value)}
                                        placeholder="15555551234"
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem',
                                            borderRadius: '4px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            color: '#64748b'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    {/* Email Icon Box */}
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Mail size={20} color="#64748b" />
                                    </div>

                                    {/* Email Input */}
                                    <input
                                        type="email"
                                        value={contact.email || ''}
                                        onChange={(e) => handleContactUpdate('email', e.target.value)}
                                        placeholder="Hellen@gmail.com"
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem',
                                            borderRadius: '4px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            color: '#64748b'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* WEBSITE */}
                            <div style={{ marginBottom: '0' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    {/* Website Icon Box */}
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Globe size={20} color="#64748b" />
                                    </div>

                                    {/* Website Input */}
                                    <input
                                        type="text"
                                        value={contact.website || ''}
                                        onChange={(e) => handleContactUpdate('website', e.target.value)}
                                        placeholder="https://Hellengrey.com"
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem',
                                            borderRadius: '4px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            color: '#64748b'
                                        }}
                                    />
                                </div>
                            </div>

                        </div>
                    )
                }
            </div >

            {/* SOCIAL MEDIA CHANNELS ACCORDION */}
            < div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
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

                {
                    isSocialOpen && (
                        <div style={{ padding: '2rem', background: '#fff' }}>

                            {/* Social Media Inputs Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>

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

                                {/* Pinterest */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                        Pinterest*
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: '#e60023',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            color: '#fff'
                                        }}>
                                            P
                                        </div>
                                        <input
                                            type="text"
                                            value={social.pinterest || ''}
                                            onChange={(e) => handleSocialUpdate('pinterest', e.target.value)}
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
                    )
                }
            </div >
        </div >
    );
};

export default BusinessPageConfig;

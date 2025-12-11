import React, { useState } from 'react';
import { Phone, MapPin, Clock, Globe, Instagram, Facebook, Twitter, X, Copy, Mail, Linkedin, MessageCircle, Wifi, Armchair, Accessibility, Calendar, User, Heart } from 'lucide-react';

const MobilePreview = ({ config }) => {
    const { design, businessInfo, menu, timings, social, appLinks, coupon, personalInfo, contact, type, facilities } = config;
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [showExchangeModal, setShowExchangeModal] = useState(false);
    const [ratingStep, setRatingStep] = useState('rating'); // 'rating', 'userInfo', 'thankYou'
    const [leadGenStep, setLeadGenStep] = useState('form'); // 'form', 'thankYou'
    const [surveyStep, setSurveyStep] = useState('language'); // 'language', 'survey', 'thankYou'
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [selectedMenuTab, setSelectedMenuTab] = useState('Burger'); // 'Burger', 'Coffee', 'Juices'
    const [reviewStep, setReviewStep] = useState('main'); // 'main', 'food', 'review', 'thankYou'
    const [selectedReviewCategory, setSelectedReviewCategory] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);
    const [customMenuOpenCat, setCustomMenuOpenCat] = useState(null);

    const images = [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop',
        'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&h=800&fit=crop'
    ];

    const productImages = [
        'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=300&h=300&fit=crop'
    ];

    const [productImageIndex, setProductImageIndex] = useState(0);
    const [openAccordion, setOpenAccordion] = useState(null);
    const [feedback, setFeedback] = useState('');

    const toggleAccordion = (name) => {
        setOpenAccordion(openAccordion === name ? null : name);
    };

    // Auto-slide images
    React.useEffect(() => {
        if (type === 'image') {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [type]);

    // Auto-slide product images
    React.useEffect(() => {
        if (type === 'product-page') {
            const interval = setInterval(() => {
                setProductImageIndex((prev) => (prev + 1) % productImages.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [type]);


    // AFTER – colour independence
    // -------------------------------------
    // 1️⃣ Primary colour (used for the header)
    const primaryColor = design?.color?.dark || '#0f3485';

    // 2️⃣ Secondary colour (used for buttons, etc.)
    const secondaryColor = design?.color?.light || '#06b6d4';

    // 3️⃣ Header colour – you can keep it equal to primary,
    //    or allow an explicit “header” key in the design object.
    const headerColor = design?.color?.header || primaryColor;

    const isAppStore = type === 'app-store';
    const isCoupon = type === 'coupon';
    const isBusinessCard = type === 'business-card';
    const isBusinessPage = type === 'business-page';
    const isBioPage = type === 'bio-page';
    const isSurvey = type === 'survey';
    const isLeadGeneration = type === 'lead-generation';
    const isRating = type === 'rating';
    const isReviews = type === 'reviews';
    const isCustomType = type === 'custom-type';

    if (isCustomType) {
        const logoOptions = {
            'logo1': 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            'logo2': 'https://api.dicebear.com/7.x/bottts/svg?seed=Food',
            'logo3': 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'
        };

        const imageOptions = {
            'img1': 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=150&q=80',
            'img2': 'https://images.unsplash.com/photo-1557683316-973673baf926?w=150&q=80',
            'img3': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=150&q=80',
            'img4': 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=150&q=80',
            'img5': 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=150&q=80'
        };

        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                <div style={{ padding: '2rem 1.5rem', height: '100%', overflowY: 'auto' }}>
                    {config.customComponents?.map(comp => {
                        switch (comp.type) {
                            case 'heading':
                            case 'description':
                                return (
                                    <div key={comp.id} style={{
                                        color: comp.data.color,
                                        fontFamily: comp.data.font,
                                        textAlign: comp.data.align,
                                        fontSize: `${comp.data.size}px`,
                                        fontWeight: comp.type === 'heading' ? 'bold' : 'normal',
                                        marginBottom: '1rem',
                                        wordBreak: 'break-word'
                                    }}>
                                        {comp.data.text}
                                    </div>
                                );
                            case 'button':
                                return (
                                    <div key={comp.id} style={{ display: 'flex', justifyContent: comp.data.position, marginBottom: '1rem' }}>
                                        <a href={comp.data.link} target="_blank" rel="noopener noreferrer" style={{
                                            backgroundColor: comp.data.bgColor,
                                            color: comp.data.textColor,
                                            border: `${comp.data.borderWidth}px solid ${comp.data.borderColor}`,
                                            borderRadius: `${comp.data.borderRadius}px`,
                                            fontFamily: comp.data.fontFamily,
                                            fontSize: `${comp.data.fontSize}px`,
                                            padding: '0.75rem 1.5rem',
                                            textDecoration: 'none',
                                            width: comp.data.width === 'full' ? '100%' : 'auto',
                                            textAlign: 'center',
                                            display: 'inline-block',
                                            cursor: 'pointer',
                                            boxSizing: 'border-box'
                                        }}>
                                            {comp.data.text}
                                        </a>
                                    </div>
                                );
                            case 'logo':
                                const logoSrc = comp.data.url || logoOptions[comp.data.selectedLogo];
                                if (!logoSrc) return null;
                                return (
                                    <div key={comp.id} style={{ display: 'flex', justifyContent: comp.data.position, marginBottom: '1rem' }}>
                                        <img src={logoSrc} alt="Logo" style={{
                                            width: `${comp.data.size}px`,
                                            height: `${comp.data.size}px`,
                                            objectFit: 'cover',
                                            borderRadius: comp.data.frame === 'circle' ? '50%' : comp.data.frame === 'rounded' ? '12px' : '0',
                                            border: `${comp.data.borderWidth}px solid ${comp.data.borderColor}`
                                        }} />
                                    </div>
                                );
                            case 'image':
                                const imgSrc = comp.data.url || imageOptions[comp.data.selectedImage];
                                if (!imgSrc) return null;
                                return (
                                    <div key={comp.id} style={{ marginBottom: '1rem' }}>
                                        <img src={imgSrc} alt="Custom" style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px'
                                        }} />
                                    </div>
                                );
                            case 'slider':
                                if (!comp.data.images || comp.data.images.length === 0) return null;
                                return (
                                    <div key={comp.id} style={{ marginBottom: '1rem', display: 'flex', overflowX: 'auto', gap: '0.5rem', paddingBottom: '0.5rem' }}>
                                        {comp.data.images.map((img, idx) => (
                                            <img key={idx} src={img} alt={`Slide ${idx}`} style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                flex: '0 0 auto'
                                            }} />
                                        ))}
                                    </div>
                                );
                            case 'video':
                                if (!comp.data.url) return null;
                                return (
                                    <div key={comp.id} style={{ marginBottom: '1rem' }}>
                                        <video src={comp.data.url} controls style={{ width: '100%', borderRadius: '8px', background: '#000' }} />
                                        <div style={{ marginTop: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#1e293b' }}>{comp.data.title}</div>
                                    </div>
                                );
                            case 'pdf':
                                if (!comp.data.url) return null;
                                return (
                                    <div key={comp.id} style={{ marginBottom: '1rem' }}>
                                        <a href={comp.data.url} target="_blank" rel="noopener noreferrer" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '1rem',
                                            background: '#f8fafc',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            textDecoration: 'none',
                                            color: '#1e293b'
                                        }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: '#ef4444',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontSize: '0.8rem'
                                            }}>PDF</div>
                                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                                <div style={{ fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{comp.data.fileName}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Click to view</div>
                                            </div>
                                        </a>
                                    </div>
                                );
                            case 'menu':
                                if (!comp.data.categories || comp.data.categories.length === 0) return null;
                                return (
                                    <div key={comp.id} style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {comp.data.categories.map((cat) => (
                                            <div key={cat.id} style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', background: '#f8fafc' }}>
                                                <div
                                                    onClick={() => setCustomMenuOpenCat(customMenuOpenCat === cat.id ? null : cat.id)}
                                                    style={{
                                                        padding: '1rem',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                        background: '#fff'
                                                    }}
                                                >
                                                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#1e293b', textTransform: 'uppercase' }}>
                                                        {cat.name}
                                                    </span>
                                                    {customMenuOpenCat === cat.id ? (
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
                                                    ) : (
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                                    )}
                                                </div>
                                                {customMenuOpenCat === cat.id && (
                                                    <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
                                                        {cat.products.map((prod) => (
                                                            <div key={prod.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed #e2e8f0' }}>
                                                                <div style={{ flex: 1 }}>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                                        <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#334155' }}>{prod.name}</span>
                                                                        <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#8b5cf6' }}>{businessInfo?.currency || '$'}{prod.price}</span>
                                                                    </div>
                                                                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>{prod.description}</p>
                                                                </div>
                                                                {prod.image && (
                                                                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                                                        <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        );
    }

    if (isBioPage) {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                <div style={{ height: '100%', overflowY: 'auto', background: '#fff' }}>
                    {/* Header with Curve */}
                    <div style={{
                        height: '140px',
                        background: headerColor,
                        borderBottomLeftRadius: '50% 20%',
                        borderBottomRightRadius: '50% 20%',
                        position: 'relative',
                        marginBottom: '60px'
                    }}>
                        {/* Profile Image */}
                        <div style={{
                            width: '110px',
                            height: '110px',
                            borderRadius: '50%',
                            background: '#fff',
                            padding: '3px',
                            position: 'absolute',
                            bottom: '-55px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <img
                                src={design?.profile?.url}
                                alt="Profile"
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Name and Title */}
                    <div style={{ textAlign: 'center', padding: '0 1rem', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: headerColor, margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
                            {personalInfo?.name}
                        </h2>
                        <p style={{ fontSize: '0.95rem', color: '#1e293b', margin: 0, fontWeight: '500' }}>
                            {personalInfo?.title}
                        </p>
                    </div>

                    {/* Divider */}
                    <div style={{ width: '80%', height: '2px', background: headerColor, margin: '0 auto 1.5rem' }}></div>

                    {/* Bio Section */}
                    <div style={{ padding: '0 2rem', marginBottom: '2rem' }}>
                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', margin: 0, textAlign: 'center' }}>
                            {personalInfo?.bio}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 1.5rem', marginBottom: '2rem' }}>
                        <button style={{
                            background: '#fff',
                            border: `2px solid ${headerColor}`,
                            color: headerColor,
                            padding: '0.75rem',
                            borderRadius: '50px',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}>
                            <Phone size={18} />
                            Talk to Me
                        </button>
                        <button style={{
                            background: '#fff',
                            border: `2px solid ${headerColor}`,
                            color: headerColor,
                            padding: '0.75rem',
                            borderRadius: '50px',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}>
                            <Mail size={18} />
                            Email Me
                        </button>
                        <button style={{
                            background: '#fff',
                            border: `2px solid ${headerColor}`,
                            color: headerColor,
                            padding: '0.75rem',
                            borderRadius: '50px',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}>
                            <Globe size={18} />
                            Visit Us
                        </button>
                    </div>

                    {/* Bottom Section with Social Icons */}
                    <div style={{ marginTop: 'auto' }}>
                        <div style={{
                            background: headerColor,
                            borderTopLeftRadius: '50% 20%',
                            borderTopRightRadius: '50% 20%',
                            padding: '2rem 1rem 1.5rem',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1.5rem'
                        }}>
                            {social?.facebook && (
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: '#3b82f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}>
                                    <Facebook size={24} />
                                </div>
                            )}
                            {social?.instagram && (
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: '#ec4899',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}>
                                    <Instagram size={24} />
                                </div>
                            )}
                            {social?.website && (
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: '#06b6d4',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}>
                                    <Globe size={24} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isSurvey) {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                {surveyStep === 'language' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                        {/* Logo */}
                        <div style={{ padding: '3rem 1rem 1rem', display: 'flex', justifyContent: 'center' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                background: '#fff',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img
                                    src={design?.logo?.url}
                                    alt="Logo"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>

                        {/* Business Name */}
                        <div style={{ textAlign: 'center', padding: '1rem 1.5rem 0.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
                                {businessInfo?.title}
                            </h2>
                        </div>

                        {/* Description */}
                        <div style={{ textAlign: 'center', padding: '0 2rem 1.5rem' }}>
                            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                                {businessInfo?.description}
                            </p>
                        </div>

                        {/* Language Selector */}
                        <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <div style={{
                                border: '2px solid #e2e8f0',
                                borderRadius: '50px',
                                padding: '0.5rem 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                position: 'relative'
                            }}>
                                <span style={{ fontSize: '1.2rem' }}>🇺🇸</span>
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    style={{
                                        fontSize: '0.95rem',
                                        color: '#1e293b',
                                        fontWeight: '500',
                                        border: 'none',
                                        outline: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="English">English</option>
                                    <option value="Urdu">Urdu</option>
                                </select>
                            </div>
                        </div>

                        {/* Start Button */}
                        <div style={{ padding: '0 1.5rem 1rem', display: 'flex', justifyContent: 'center' }}>
                            <button
                                onClick={() => setSurveyStep('survey')}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: '#10b981',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)'
                                }}
                            >
                                ›
                            </button>
                        </div>

                        {/* Illustration */}
                        <div style={{ marginTop: 'auto', padding: '1rem', position: 'relative' }}>
                            <img
                                src={design?.illustration || 'https://img.freepik.com/free-vector/customer-survey-concept-illustration_114360-5321.jpg'}
                                alt="Survey Illustration"
                                style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '12px' }}
                            />
                        </div>
                    </div>
                )}

                {surveyStep === 'survey' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#fff' }}>
                        {/* Header with Illustration */}
                        <div style={{ padding: '2rem 1.5rem 1rem', background: '#f8fafc' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
                                        Feedback
                                    </h2>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1e293b', margin: '0.25rem 0 0 0' }}>
                                        Questionnaire
                                    </h3>
                                </div>
                                <div style={{ width: '80px', height: '80px' }}>
                                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                                        <circle cx="50" cy="50" r="45" fill="#10b981" opacity="0.2" />
                                        <rect x="30" y="35" width="40" height="30" rx="3" fill="#fff" stroke="#10b981" strokeWidth="2" />
                                        <path d="M35 42 L45 42 M35 48 L45 48" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="60" cy="40" r="3" fill="#fbbf24" />
                                        <circle cx="60" cy="48" r="3" fill="#fbbf24" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Survey Form */}
                        <div style={{ padding: '1.5rem', direction: selectedLanguage === 'Urdu' ? 'rtl' : 'ltr' }}>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {/* Question 1 */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem', textAlign: selectedLanguage === 'Urdu' ? 'right' : 'left' }}>
                                        {selectedLanguage === 'Urdu' ? 'برانچ کا نام 1' : '1 Branch Name'}
                                    </label>
                                    <input
                                        type="text"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            textAlign: selectedLanguage === 'Urdu' ? 'right' : 'left'
                                        }}
                                    />
                                </div>

                                {/* Question 2 */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem', textAlign: selectedLanguage === 'Urdu' ? 'right' : 'left' }}>
                                        {selectedLanguage === 'Urdu' ? 'صارف کا نام 2' : '2 Name of the Customer'}
                                    </label>
                                    <input
                                        type="text"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            textAlign: selectedLanguage === 'Urdu' ? 'right' : 'left'
                                        }}
                                    />
                                </div>

                                {/* Question 3 - Mobile No */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem', textAlign: selectedLanguage === 'Urdu' ? 'right' : 'left' }}>
                                        {selectedLanguage === 'Urdu' ? 'موبائل نمبر 3' : '3 Mobile No'}
                                    </label>
                                    <div style={{ display: 'flex', gap: '0.5rem', direction: 'ltr' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.75rem',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '8px',
                                            background: '#f8fafc'
                                        }}>
                                            <span style={{ fontSize: '1.2rem' }}>🇵🇰</span>
                                            <span style={{ fontSize: '0.9rem', color: '#475569' }}>+92</span>
                                        </div>
                                        <input
                                            type="tel"
                                            style={{
                                                flex: 1,
                                                padding: '0.75rem',
                                                border: '1px solid #cbd5e1',
                                                borderRadius: '8px',
                                                fontSize: '1rem',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Question 4 - Star Rating */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.75rem', textAlign: selectedLanguage === 'Urdu' ? 'right' : 'left', lineHeight: '1.5' }}>
                                        {selectedLanguage === 'Urdu' ? 'آپ ماحول اور دیگر سہولیات سے کتنے مطمئن ہیں؟ 4' : '4 How much are you satisfied with the Environment and other facilities?'}
                                    </label>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: selectedLanguage === 'Urdu' ? 'flex-end' : 'flex-start' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} width="32" height="32" viewBox="0 0 24 24" fill={star === 1 ? '#fbbf24' : '#e5e7eb'} style={{ cursor: 'pointer' }}>
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>

                                {/* Question 5 - Star Rating */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.75rem', textAlign: selectedLanguage === 'Urdu' ? 'right' : 'left', lineHeight: '1.5' }}>
                                        {selectedLanguage === 'Urdu' ? 'آپ اپنے عملے کی خدمات سے متعلق معلوماتی صلاحیت سے مطمئن ہیں؟ 5' : '5 How much are you satisfied with the knowledge capacity of staff regarding different services being offered?'}
                                    </label>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: selectedLanguage === 'Urdu' ? 'flex-end' : 'flex-start' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} width="32" height="32" viewBox="0 0 24 24" fill={star === 1 ? '#fbbf24' : '#e5e7eb'} style={{ cursor: 'pointer' }}>
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>

                                {/* Question 6 - Yes/No */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.75rem', textAlign: selectedLanguage === 'Urdu' ? 'right' : 'left' }}>
                                        {selectedLanguage === 'Urdu' ? 'کیا آپ ہمیں تجویز کریں گے؟ 6' : '6 Will you recommend us?'}
                                    </label>
                                    <div style={{ display: 'flex', gap: '2rem', justifyContent: selectedLanguage === 'Urdu' ? 'flex-end' : 'flex-start' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', flexDirection: selectedLanguage === 'Urdu' ? 'row-reverse' : 'row' }}>
                                            <input type="radio" name="recommend" value="yes" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                                            <span style={{ fontSize: '0.95rem', color: '#1e293b' }}>{selectedLanguage === 'Urdu' ? 'جی ہاں' : 'Yes'}</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', flexDirection: selectedLanguage === 'Urdu' ? 'row-reverse' : 'row' }}>
                                            <input type="radio" name="recommend" value="no" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                                            <span style={{ fontSize: '0.95rem', color: '#1e293b' }}>{selectedLanguage === 'Urdu' ? 'جی نہیں' : 'No'}</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="button"
                                    onClick={() => setSurveyStep('thankYou')}
                                    style={{
                                        width: '100%',
                                        background: '#10b981',
                                        border: 'none',
                                        color: '#fff',
                                        padding: '1rem',
                                        borderRadius: '50px',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        marginTop: '1rem'
                                    }}
                                >
                                    Submit
                                </button>

                                {/* Footer URL */}
                                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                                    https://www.luxerhotels.com
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {surveyStep === 'thankYou' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
                        {/* Logo */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                background: '#5b8fd9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={design?.logo?.url}
                                    alt="Logo"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>

                        {/* Thank You Message */}
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                                We appreciate your
                            </h2>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
                                feedback!
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.75rem 0 0 0' }}>
                                Your response has been recorded.
                            </p>
                        </div>

                        {/* Visit Website Button */}
                        <button style={{
                            background: '#10b981',
                            border: 'none',
                            color: '#fff',
                            padding: '0.875rem 2rem',
                            borderRadius: '50px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '2rem'
                        }}>
                            <Globe size={20} />
                            Visit Our Website
                        </button>

                        {/* Footer Message */}
                        <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                            Thank you for completing the survey! Your feedback helps us improve.
                        </p>

                        {/* Social Icons */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                background: '#5b8fd9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff'
                            }}>
                                <Globe size={22} />
                            </div>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                background: '#3b82f6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff'
                            }}>
                                <Facebook size={22} />
                            </div>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                background: '#ec4899',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff'
                            }}>
                                <Instagram size={22} />
                            </div>
                        </div>

                        {/* Illustration */}
                        <div style={{ marginTop: 'auto', width: '100%' }}>
                            <img
                                src={design?.illustration || 'https://img.freepik.com/free-vector/customer-survey-concept-illustration_114360-5321.jpg'}
                                alt="Survey Illustration"
                                style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '12px' }}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (isLeadGeneration) {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                {leadGenStep === 'form' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#fff' }}>
                        {/* Header Section */}
                        <div style={{
                            background: headerColor,
                            borderBottomLeftRadius: '30px',
                            borderBottomRightRadius: '30px',
                            padding: '2rem 1.5rem 1.5rem',
                            position: 'relative'
                        }}>
                            {/* Logo and Business Name */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    background: '#fff'
                                }}>
                                    <img
                                        src={design?.logo?.url}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>
                                    {businessInfo?.title}
                                </h2>
                            </div>

                            {/* Hero Image */}
                            <div style={{
                                width: '100%',
                                height: '150px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                marginBottom: '1rem'
                            }}>
                                <img
                                    src={design?.heroImage}
                                    alt="Hero"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Title and Description */}
                            <div style={{ color: '#fff' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
                                    {businessInfo?.formTitle}
                                </h3>
                                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.95 }}>
                                    {businessInfo?.formDescription}
                                </p>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div style={{ padding: '1.5rem' }}>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {/* Full Name Field */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder=""
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="button"
                                    onClick={() => setLeadGenStep('thankYou')}
                                    style={{
                                        width: '100%',
                                        background: '#fff',
                                        border: `2px solid ${headerColor}`,
                                        color: headerColor,
                                        padding: '0.875rem',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        marginTop: '0.5rem'
                                    }}
                                >
                                    SUBMIT
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {leadGenStep === 'thankYou' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
                        {/* Header Section */}
                        <div style={{
                            background: headerColor,
                            borderRadius: '20px',
                            padding: '1.5rem',
                            width: '100%',
                            marginBottom: '2rem'
                        }}>
                            {/* Business Name */}
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', margin: '0 0 1rem 0', textAlign: 'center' }}>
                                {businessInfo?.title}
                            </h2>

                            {/* Hero Image */}
                            <div style={{
                                width: '100%',
                                height: '140px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                marginBottom: '1rem'
                            }}>
                                <img
                                    src={design?.heroImage}
                                    alt="Hero"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Title and Description */}
                            <div style={{ color: '#fff', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
                                    {businessInfo?.formTitle}
                                </h3>
                                <p style={{ fontSize: '0.85rem', margin: 0, opacity: 0.95 }}>
                                    {businessInfo?.formDescription}
                                </p>
                            </div>
                        </div>

                        {/* Success Icon */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: '#22c55e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13L9 17L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Thank You Message */}
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '1rem', color: '#1e293b', lineHeight: '1.6', margin: 0 }}>
                                Thanks for submitting! You can now download your content. thanks again
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (isRating) {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                {ratingStep === 'rating' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
                        {/* Header Section */}
                        <div style={{
                            background: headerColor,
                            borderBottomLeftRadius: '30px',
                            borderBottomRightRadius: '30px',
                            padding: '2rem 1.5rem 1.5rem',
                            position: 'relative'
                        }}>
                            {/* Business Name and Logo */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>
                                    {businessInfo?.title}
                                </h2>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={design?.logo?.url}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div style={{
                                width: '100%',
                                height: '180px',
                                borderRadius: '12px',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={design?.heroImage}
                                    alt="Hero"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>

                        {/* Question and Rating Section */}
                        <div style={{ padding: '2rem 1.5rem' }}>
                            {/* Question */}
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
                                    {businessInfo?.question}
                                </h3>
                            </div>

                            {/* Thumbs Up/Down Icons */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
                                {/* Thumbs Up */}
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="#cbd5e1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H16.4262C17.907 22 19.1662 20.9197 19.3914 19.4562L20.4683 12.4562C20.7479 10.6389 19.3418 9 17.5032 9H14C13.4477 9 13 8.55228 13 8V4.46584C13 3.10399 11.896 2 10.5342 2C10.2093 2 9.91498 2.1913 9.78306 2.48812L7.26394 8.40614C7.09895 8.76727 6.74546 9 6.35684 9H4C2.89543 9 2 9.89543 2 11V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                {/* Thumbs Down */}
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="#cbd5e1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 2V13M22 11V4C22 2.89543 21.1046 2 20 2H7.57377C6.09297 2 4.83379 3.08026 4.60859 4.54377L3.53165 11.5438C3.25211 13.3611 4.65824 15 6.49681 15H10C10.5523 15 11 15.4477 11 16V19.5342C11 20.896 12.104 22 13.4658 22C13.7907 22 14.085 21.8087 14.2169 21.5119L16.7361 15.5939C16.901 15.2327 17.2545 15 17.6432 15H20C21.1046 15 22 14.1046 22 13V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={() => setRatingStep('userInfo')}
                                style={{
                                    width: '100%',
                                    background: '#ff6b4a',
                                    border: 'none',
                                    color: '#fff',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Send Rating
                            </button>
                        </div>
                    </div>
                )}

                {ratingStep === 'userInfo' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#fff', padding: '2rem 1.5rem' }}>
                        {/* Title */}
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 2rem 0' }}>
                            User Information
                        </h2>

                        {/* Form */}
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Name Field */}
                            <input
                                type="text"
                                placeholder="Your name"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    color: '#1e293b'
                                }}
                            />

                            {/* Email Field */}
                            <input
                                type="email"
                                placeholder="Your email"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    color: '#1e293b'
                                }}
                            />

                            {/* Number Field */}
                            <input
                                type="tel"
                                placeholder="Your number"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    color: '#1e293b'
                                }}
                            />

                            {/* Submit Button */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setRatingStep('thankYou')}
                                    style={{
                                        background: '#9333ea',
                                        border: 'none',
                                        color: '#fff',
                                        padding: '0.875rem 2.5rem',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {ratingStep === 'thankYou' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: headerColor, display: 'flex', flexDirection: 'column' }}>
                        {/* Header */}
                        <div style={{ padding: '2rem 1.5rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>
                                {businessInfo?.title}
                            </h2>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                background: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={design?.logo?.url}
                                    alt="Logo"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>

                        {/* Thank You Card */}
                        <div style={{
                            margin: '1rem 1.5rem',
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '3rem 2rem',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}>
                            {/* Check Icon */}
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: '#4ade80',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13L9 17L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            {/* Thank You Text */}
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 1rem 0' }}>
                                Thank You!
                            </h2>

                            {/* Description */}
                            <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6', margin: '0 0 2rem 0' }}>
                                Your feedback has been submitted. Thank you for taking the time to share your opinion
                            </p>

                            {/* Rate Again Link */}
                            <button
                                onClick={() => setRatingStep('rating')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#ef4444',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    marginBottom: '2rem'
                                }}
                            >
                                Rate Again
                            </button>

                            {/* Social Icons */}
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: '#5b8fd9',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}>
                                    <Globe size={24} />
                                </div>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: '#3b82f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}>
                                    <Facebook size={24} />
                                </div>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: '#ec4899',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}>
                                    <Instagram size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Footer URL */}
                        <div style={{ padding: '1rem', textAlign: 'center', color: '#fff', fontSize: '0.9rem' }}>
                            https://www.bobscafe.com
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (isBusinessPage) {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                <div style={{ height: '100%', overflowY: 'auto', background: '#fff' }}>
                    {/* Header */}
                    <div style={{
                        background: headerColor,
                        padding: '2rem 1rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: '#fff'
                    }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>{businessInfo?.title}</h2>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '5px'
                        }}>
                            <img src={design?.logo?.url} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div style={{ width: '100%', height: '200px' }}>
                        <img src={design?.heroImage} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Tagline Section */}
                    <div style={{ background: headerColor, padding: '1.5rem', color: '#fff' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{businessInfo?.subtitle}</h2>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.4', margin: '0 0 1.5rem 0', opacity: 0.9 }}>
                            {businessInfo?.description}
                        </p>
                        <button style={{
                            background: '#fbbf24',
                            color: '#1e293b',
                            border: 'none',
                            padding: '0.75rem 2rem',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            Visit Us
                        </button>
                    </div>

                    {/* Opening Hours */}
                    <div style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <Clock size={24} color={headerColor} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: headerColor, margin: 0 }}>OPENING HOURS</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {Object.entries(timings).map(([day, time]) => (
                                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#475569' }}>
                                    <span style={{ fontWeight: '600', width: '100px' }}>{day}</span>
                                    {day === 'Friday' ? (
                                        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '0.8rem' }}>OPEN NOW</span>
                                            <span>{time.open} - {time.close}</span>
                                        </div>
                                    ) : (
                                        <span style={{ color: time.isOpen ? '#475569' : '#ef4444' }}>
                                            {time.isOpen ? `${time.open} - ${time.close}` : 'closed'}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '4px', background: '#fbbf24', margin: '0 1.5rem' }}></div>

                    {/* Facilities */}
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: headerColor, margin: '0 0 1.5rem 0' }}>FACILITIES</h3>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            {facilities?.wifi && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                                    <Wifi size={24} color="#3b82f6" />
                                    <span style={{ fontSize: '0.8rem' }}>wifi</span>
                                </div>
                            )}
                            {facilities?.sofa && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                                    <Armchair size={24} color="#3b82f6" />
                                    <span style={{ fontSize: '0.8rem' }}>sofa</span>
                                </div>
                            )}
                            {facilities?.handicap && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                                    <Accessibility size={24} color="#3b82f6" />
                                    <span style={{ fontSize: '0.8rem' }}>handicap</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '4px', background: '#fbbf24', margin: '0 1.5rem' }}></div>

                    {/* Contact Info */}
                    <div style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Phone size={24} color={headerColor} />
                                <span style={{ fontSize: '1rem', color: '#1e293b' }}>{contact?.phone}</span>
                            </div>
                            <div style={{ width: '100%', height: '1px', background: '#e2e8f0' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Mail size={24} color={headerColor} />
                                <span style={{ fontSize: '1rem', color: '#1e293b' }}>{contact?.email}</span>
                            </div>
                            <div style={{ width: '100%', height: '1px', background: '#e2e8f0' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Globe size={24} color={headerColor} />
                                <span style={{ fontSize: '1rem', color: '#1e293b' }}>{contact?.website}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Curve */}
                    <div style={{ height: '60px', background: headerColor, borderTopLeftRadius: '50% 100%', borderTopRightRadius: '50% 100%', marginTop: 'auto' }}></div>
                </div>
            </div>
        );
    }

    if (isBusinessCard) {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                {showExchangeModal ? (
                    /* Exchange Contact Modal View */
                    <div style={{ height: '100%', overflowY: 'auto', background: '#fff', padding: '2rem 1.5rem', position: 'relative' }}>
                        <button
                            onClick={() => setShowExchangeModal(false)}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#64748b'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{ marginTop: '2rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', lineHeight: '1.4', marginBottom: '2rem' }}>
                                <span style={{ color: headerColor }}>Share</span> your contact information with {personalInfo?.name}
                            </h2>

                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        style={{ width: '100%', padding: '0.75rem 0', border: 'none', borderBottom: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Contact Number"
                                        style={{ width: '100%', padding: '0.75rem 0', border: 'none', borderBottom: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Organization"
                                        style={{ width: '100%', padding: '0.75rem 0', border: 'none', borderBottom: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        style={{ width: '100%', padding: '0.75rem 0', border: 'none', borderBottom: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
                                    />
                                </div>

                                <button
                                    type="button"
                                    style={{
                                        marginTop: '1rem',
                                        background: headerColor,
                                        color: '#fff',
                                        border: 'none',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Exchange Contact
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    /* Main Business Card View */
                    <div style={{ height: '100%', overflowY: 'auto', background: '#fff' }}>
                        {/* Header with Curve */}
                        <div style={{
                            height: '140px',
                            background: headerColor,
                            borderBottomLeftRadius: '50% 20%',
                            borderBottomRightRadius: '50% 20%',
                            position: 'relative',
                            marginBottom: '60px'
                        }}>
                            {/* Profile Image */}
                            <div style={{
                                width: '110px',
                                height: '110px',
                                borderRadius: '50%',
                                background: '#fff',
                                padding: '3px',
                                position: 'absolute',
                                bottom: '-55px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}>
                                <img
                                    src={design?.profile?.url}
                                    alt="Profile"
                                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>

                        {/* Name and Title */}
                        <div style={{ textAlign: 'center', padding: '0 1rem', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
                                {personalInfo?.name}
                            </h2>
                            <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>
                                {personalInfo?.title} <span style={{ color: headerColor }}>at</span> {personalInfo?.company}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', padding: '0 1.5rem', marginBottom: '2rem' }}>
                            <button style={{
                                flex: 1,
                                background: '#fff',
                                border: `1px solid ${headerColor}`,
                                color: headerColor,
                                padding: '0.75rem',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}>
                                Save Contact
                            </button>
                            <button
                                onClick={() => setShowExchangeModal(true)}
                                style={{
                                    flex: 1,
                                    background: headerColor,
                                    border: 'none',
                                    color: '#fff',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}>
                                Exchange Contact
                            </button>
                        </div>

                        {/* About Section */}
                        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.75rem' }}>About</h3>
                            <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6', margin: 0 }}>
                                {personalInfo?.about}
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>Contact Info</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {/* Phone */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: `1px solid ${headerColor}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: headerColor
                                    }}>
                                        <Phone size={20} />
                                    </div>
                                    <span style={{ fontSize: '1rem', color: '#1e293b' }}>{contact?.phone}</span>
                                </div>

                                {/* Email */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: `1px solid ${headerColor}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: headerColor
                                    }}>
                                        <Mail size={20} />
                                    </div>
                                    <span style={{ fontSize: '1rem', color: '#1e293b' }}>{contact?.email}</span>
                                </div>

                                {/* Website */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: `1px solid ${headerColor}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: headerColor
                                    }}>
                                        <Globe size={20} />
                                    </div>
                                    <span style={{ fontSize: '1rem', color: '#1e293b' }}>{contact?.website}</span>
                                </div>

                                {/* Address */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: `1px solid ${headerColor}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: headerColor,
                                        flexShrink: 0
                                    }}>
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '0.25rem' }}>{contact?.address}</div>
                                        <div style={{ color: headerColor, fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' }}>Go to Map</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Networks */}
                        <div style={{ padding: '0 1.5rem 2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>Social Networks</h3>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {social?.website && (
                                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                        <Globe size={20} />
                                    </div>
                                )}
                                {social?.whatsapp && (
                                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                        <MessageCircle size={20} />
                                    </div>
                                )}
                                {social?.facebook && (
                                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                        <Facebook size={20} />
                                    </div>
                                )}
                                {social?.linkedin && (
                                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                        <Linkedin size={20} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (isCoupon) {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: showCouponModal ? primaryColor : '#f3f4f6',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                {/* Coupon Content */}
                {!showCouponModal ? (
                    <div style={{ height: '100%', overflowY: 'auto', background: primaryColor }}>
                        {/* Header */}
                        <div style={{
                            padding: '2rem 1rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            color: '#fff'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: '#fff',
                                padding: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img src={design?.logo?.url} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            </div>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>{businessInfo?.title}</h2>
                        </div>

                        {/* Hero Image */}
                        <div style={{ width: '100%', height: '200px', background: '#fff' }}>
                            <img src={coupon?.image} alt="Sale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        {/* Title Section */}
                        <div style={{ padding: '1.5rem 1rem', textAlign: 'center' }}>
                            <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{coupon?.title}</h1>
                        </div>

                        {/* Coupon Card */}
                        <div style={{
                            margin: '0 1.5rem 2rem',
                            background: '#fff',
                            borderRadius: '12px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', lineHeight: '1.4', margin: 0 }}>
                                    {coupon?.offer}
                                </p>
                            </div>

                            {/* Divider with Cutouts */}
                            <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
                                <div style={{
                                    position: 'absolute',
                                    left: '-10px',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: primaryColor
                                }}></div>
                                <div style={{
                                    width: '100%',
                                    borderTop: '2px dashed #cbd5e1',
                                    margin: '0 15px'
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    right: '-10px',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: primaryColor
                                }}></div>
                            </div>

                            {/* Redeem Button Area */}
                            <div style={{ padding: '1.5rem' }}>
                                <button
                                    onClick={() => setShowCouponModal(true)}
                                    style={{
                                        width: '100%',
                                        background: primaryColor,
                                        color: '#fff',
                                        border: 'none',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Redeem Now
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Redeemed View (Modal) */
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        {/* Header */}
                        <div style={{ padding: '3rem 1rem 1rem', textAlign: 'center' }}>
                            <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{businessInfo?.title}</h2>
                        </div>

                        {/* Modal Card */}
                        <div style={{
                            margin: '1rem 1.5rem',
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            position: 'relative',
                            flex: 1,
                            maxHeight: '450px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <button
                                onClick={() => setShowCouponModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#64748b'
                                }}
                            >
                                <X size={24} />
                            </button>

                            <div style={{ marginTop: '2rem', textAlign: 'center', width: '100%' }}>
                                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>Coupon Code</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#06b6d4', marginBottom: '1.5rem' }}>{coupon?.code}</div>

                                <div style={{
                                    display: 'inline-block',
                                    background: '#06b6d4',
                                    color: '#fff',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '50px',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    marginBottom: '2rem'
                                }}>
                                    <Clock size={14} style={{ display: 'inline', marginRight: '5px' }} />
                                    Expires {coupon?.expiry}
                                </div>

                                <button style={{
                                    width: '100%',
                                    background: '#fff',
                                    border: `2px solid ${primaryColor}`,
                                    color: primaryColor,
                                    padding: '0.75rem',
                                    borderRadius: '50px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1rem',
                                    cursor: 'pointer'
                                }}>
                                    <Copy size={18} />
                                    Copy Code
                                </button>

                                <button style={{
                                    width: '100%',
                                    background: primaryColor,
                                    border: 'none',
                                    color: '#fff',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}>
                                    Redeem Now
                                </button>
                            </div>
                        </div>

                        {/* Footer Address */}
                        <div style={{ padding: '1rem', textAlign: 'center', color: '#fff', fontSize: '0.8rem', marginTop: 'auto', marginBottom: '1rem' }}>
                            {coupon?.location}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (isReviews) {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                {/* Main Categories Page */}
                {reviewStep === 'main' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
                        {/* Header */}
                        <div style={{
                            background: '#2e3192',
                            borderBottomLeftRadius: '30px',
                            borderBottomRightRadius: '30px',
                            padding: '2rem 1.5rem 1.5rem',
                            position: 'relative'
                        }}>
                            {/* Logo and Business Name */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', margin: 0, textTransform: 'uppercase' }}>
                                    {businessInfo?.title || 'LUXURY HOTELS'}
                                </h2>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={design?.logo?.url}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div style={{
                                width: '100%',
                                height: '140px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                marginBottom: '1rem'
                            }}>
                                <img
                                    src={design?.heroImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'}
                                    alt="Hero"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div style={{ padding: '1.5rem' }}>
                            {/* Title */}
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                                Give us your feedback
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.5rem 0', lineHeight: '1.5' }}>
                                We aim to provide fresh and healthy snacks people on the go.
                            </p>

                            {/* Category Buttons */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <button
                                    onClick={() => setReviewStep('food')}
                                    style={{
                                        background: '#bfdbdb',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '1rem 1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#2e3192' }}>Food</span>
                                    <span style={{ fontSize: '1.2rem', color: '#2e3192' }}>›</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedReviewCategory('Drink');
                                        setReviewStep('review');
                                    }}
                                    style={{
                                        background: '#bfdbdb',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '1rem 1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#2e3192' }}>Drink</span>
                                    <span style={{ fontSize: '1.2rem', color: '#2e3192' }}>›</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedReviewCategory('Parking');
                                        setReviewStep('review');
                                    }}
                                    style={{
                                        background: '#bfdbdb',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '1rem 1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#2e3192' }}>Parking</span>
                                    <span style={{ fontSize: '1.2rem', color: '#2e3192' }}>›</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Food Subcategories Page */}
                {reviewStep === 'food' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
                        {/* Header */}
                        <div style={{
                            background: '#2e3192',
                            borderBottomLeftRadius: '50% 30%',
                            padding: '2rem 1.5rem 3rem',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', margin: 0, textTransform: 'uppercase' }}>
                                    {businessInfo?.title || 'LUXURY HOTELS'}
                                </h2>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={design?.logo?.url}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div style={{ padding: '1.5rem' }}>
                            {/* Title */}
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2e3192', margin: '0 0 0.5rem 0', textAlign: 'center' }}>
                                Food
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.5rem 0', textAlign: 'center' }}>
                                Please select to review a category.
                            </p>

                            {/* Subcategory Buttons */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <button
                                    onClick={() => {
                                        setSelectedReviewCategory('Staff');
                                        setReviewStep('review');
                                    }}
                                    style={{
                                        background: '#bfdbdb',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '1rem 1.5rem',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#2e3192',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    Staff
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedReviewCategory('Quantity');
                                        setReviewStep('review');
                                    }}
                                    style={{
                                        background: '#bfdbdb',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '1rem 1.5rem',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#2e3192',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    Quantity
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedReviewCategory('Taste');
                                        setReviewStep('review');
                                    }}
                                    style={{
                                        background: '#bfdbdb',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '1rem 1.5rem',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#2e3192',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    Taste
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Review Form Page */}
                {reviewStep === 'review' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
                        {/* Header */}
                        <div style={{
                            background: '#2e3192',
                            borderBottomLeftRadius: '50% 30%',
                            padding: '2rem 1.5rem 3rem',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', margin: 0, textTransform: 'uppercase' }}>
                                    {businessInfo?.title || 'LUXURY HOTELS'}
                                </h2>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={design?.logo?.url}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div style={{ padding: '1.5rem' }}>
                            {/* Title */}
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2e3192', margin: '0 0 0.5rem 0', textAlign: 'center' }}>
                                {selectedReviewCategory}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.5rem 0', textAlign: 'center' }}>
                                Please evaluate using the stars.
                            </p>

                            {/* Star Rating */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} width="40" height="40" viewBox="0 0 24 24" fill="#cbd5e1" style={{ cursor: 'pointer' }}>
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Comment Box */}
                            <textarea
                                placeholder="Add a comment (optional)"
                                style={{
                                    width: '100%',
                                    minHeight: '120px',
                                    padding: '1rem',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '8px',
                                    fontSize: '0.95rem',
                                    resize: 'vertical',
                                    marginBottom: '1.5rem',
                                    fontFamily: 'inherit'
                                }}
                            />

                            {/* Buttons */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <button
                                    onClick={() => setReviewStep('main')}
                                    style={{
                                        background: '#bfdbdb',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#2e3192',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    SAVE & RATE MORE
                                </button>

                                <button
                                    onClick={() => setReviewStep('thankYou')}
                                    style={{
                                        background: '#2e3192',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    SEND FEEDBACK
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Thank You Page */}
                {reviewStep === 'thankYou' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#2e3192', display: 'flex', flexDirection: 'column' }}>
                        {/* Header */}
                        <div style={{
                            background: '#2e3192',
                            padding: '2rem 1.5rem 1rem',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>
                                    {businessInfo?.title || 'Luxury Hotels'}
                                </h2>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={design?.logo?.url}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* White Card */}
                        <div style={{
                            background: '#fff',
                            margin: '1rem 1.5rem',
                            borderRadius: '12px',
                            padding: '2rem 1.5rem',
                            textAlign: 'center',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* Success Icon */}
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: '#4d7c0f',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13L9 17L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            {/* Thank You Message */}
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 1rem 0' }}>
                                Thank You!
                            </h2>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>
                                Your feedback has been submitted. Thank you for taking the time to share your opinion
                            </p>

                            {/* Rate Again Link */}
                            <button
                                onClick={() => setReviewStep('main')}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#dc2626',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    marginBottom: '1.5rem'
                                }}
                            >
                                Rate Again
                            </button>

                            {/* Social Icons */}
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '8px',
                                    background: '#2e3192',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}>
                                    <Globe size={24} />
                                </div>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '8px',
                                    background: '#3b82f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}>
                                    <Facebook size={24} />
                                </div>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '8px',
                                    background: '#ec4899',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}>
                                    <Instagram size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Footer URL */}
                        <div style={{
                            background: '#2e3192',
                            padding: '1rem 1.5rem 2rem',
                            textAlign: 'center'
                        }}>
                            <a href="https://www.hotelparadise.com" style={{
                                color: '#fff',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                textDecoration: 'none'
                            }}>
                                https://www.hotelparadise.com
                            </a>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (type === 'social-media') {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
                    {/* Decorative Header */}
                    <div style={{
                        background: '#fff',
                        padding: '2rem 1.5rem 1rem',
                        position: 'relative'
                    }}>
                        {/* Decorative Icons Pattern */}
                        <div style={{
                            position: 'relative',
                            textAlign: 'center',
                            marginBottom: '1rem'
                        }}>
                            {/* SOCIAL MEDIA Text */}
                            <h1 style={{
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                color: '#3b82f6',
                                margin: '0 0 1.5rem 0',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontFamily: 'Arial, sans-serif'
                            }}>
                                SOCIAL<br />MEDIA
                            </h1>

                            {/* Profile Image */}
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                background: '#fff',
                                border: '4px solid #fff',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                margin: '0 auto',
                                overflow: 'hidden',
                                position: 'relative',
                                zIndex: 2
                            }}>
                                <img
                                    src={design?.profile?.url || 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg'}
                                    alt="Profile"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>

                        {/* Blue Section */}
                        <div style={{
                            background: '#3b82f6',
                            borderRadius: '12px',
                            padding: '2rem 1.5rem',
                            textAlign: 'center',
                            color: '#fff',
                            marginTop: '-50px',
                            paddingTop: '60px'
                        }}>
                            <h2 style={{
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                                margin: '0 0 1rem 0',
                                lineHeight: '1.3'
                            }}>
                                Connect With Us On<br />Social Media
                            </h2>
                            <p style={{
                                fontSize: '0.9rem',
                                margin: 0,
                                lineHeight: '1.5',
                                opacity: 0.95
                            }}>
                                Follow us and get updates delivered to your favorite social media channel.
                            </p>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div style={{ padding: '1rem 1.5rem' }}>
                        {/* Visit Us Online */}
                        <button style={{
                            width: '100%',
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '1rem 1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            cursor: 'pointer',
                            marginBottom: '0.75rem',
                            transition: 'all 0.2s'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: '#6366f1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                flexShrink: 0
                            }}>
                                <Globe size={22} />
                            </div>
                            <span style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#1e293b',
                                flex: 1,
                                textAlign: 'left'
                            }}>
                                Visit Us Online
                            </span>
                        </button>

                        {/* Facebook */}
                        <button style={{
                            width: '100%',
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '1rem 1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            cursor: 'pointer',
                            marginBottom: '0.75rem',
                            transition: 'all 0.2s'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: '#3b82f6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                flexShrink: 0
                            }}>
                                <Facebook size={22} />
                            </div>
                            <span style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#1e293b',
                                flex: 1,
                                textAlign: 'left'
                            }}>
                                Facebook
                            </span>
                        </button>

                        {/* Youtube */}
                        <button style={{
                            width: '100%',
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '1rem 1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            cursor: 'pointer',
                            marginBottom: '0.75rem',
                            transition: 'all 0.2s'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: '#ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                flexShrink: 0
                            }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </div>
                            <span style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#1e293b',
                                flex: 1,
                                textAlign: 'left'
                            }}>
                                Youtube
                            </span>
                        </button>
                    </div>

                    {/* Share Button */}
                    <div style={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        zIndex: 10
                    }}>
                        <button style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: '#1e293b',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'pdf') {
        // Using a CORS-friendly PDF URL
        const pdfUrl = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

        const handleDownloadPDF = (e) => {
            e.preventDefault();
            // Download PDF without navigation
            fetch(pdfUrl)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'company-profile.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })
                .catch(err => console.error('Download failed:', err));
        };

        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
                    {/* Header Section */}
                    <div style={{
                        background: '#1e3a8a',
                        borderBottomLeftRadius: '30px',
                        borderBottomRightRadius: '30px',
                        padding: '2rem 1.5rem 1.5rem',
                        position: 'relative'
                    }}>
                        {/* Logo and Company Name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: '#f59e0b',
                                border: '3px solid #f59e0b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={design?.logo?.url || 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg'}
                                    alt="Logo"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <h2 style={{
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                color: '#fff',
                                margin: 0
                            }}>
                                {businessInfo?.title || 'Software Company'}
                            </h2>
                        </div>

                        {/* Title */}
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#f59e0b',
                            margin: '0 0 0.75rem 0',
                            lineHeight: '1.2'
                        }}>
                            See Our Company Profile
                        </h1>

                        {/* Description */}
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#fff',
                            margin: 0,
                            lineHeight: '1.5',
                            opacity: 0.95
                        }}>
                            We aim to provide fresh and healthy snacks people on the go.
                        </p>
                    </div>

                    {/* PDF Viewer Section */}
                    <div style={{ padding: '1.5rem' }}>
                        {/* PDF Iframe with Scrollbars */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            marginBottom: '1.5rem',
                            border: '2px solid #e2e8f0',
                            height: '300px'
                        }}>
                            <iframe
                                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none'
                                }}
                                title="PDF Preview"
                            />
                        </div>

                        {/* Download Button */}
                        <button
                            onClick={handleDownloadPDF}
                            style={{
                                width: '100%',
                                background: '#f59e0b',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '1rem',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                color: '#fff',
                                cursor: 'pointer',
                                marginBottom: '1rem',
                                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                            }}
                        >
                            Download Now
                        </button>
                    </div>

                    {/* Share Button */}
                    <div style={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        zIndex: 10
                    }}>
                        <button style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: '#1e3a8a',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'multiple-links') {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
                    {/* Header Section with Curved Bottom */}
                    <div style={{
                        background: '#4db8a8',
                        borderBottomLeftRadius: '50% 30px',
                        borderBottomRightRadius: '50% 30px',
                        padding: '2.5rem 1.5rem 2rem',
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        {/* Logo/Icon */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 auto 1rem',
                            background: '#fff',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}>
                            <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
                                <path d="M30 20 L50 10 L70 20 L70 50 L50 60 L30 50 Z" stroke="#3730a3" strokeWidth="4" fill="none" />
                                <path d="M50 10 L50 60" stroke="#3730a3" strokeWidth="4" />
                                <path d="M30 50 L70 50" stroke="#3730a3" strokeWidth="4" />
                                <path d="M30 20 L70 50" stroke="#3730a3" strokeWidth="4" />
                                <path d="M70 20 L30 50" stroke="#3730a3" strokeWidth="4" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h1 style={{
                            fontSize: '1.75rem',
                            fontWeight: 'bold',
                            color: '#1e293b',
                            margin: '0 0 0.75rem 0'
                        }}>
                            {businessInfo?.title || 'Techoid'}
                        </h1>

                        {/* Description */}
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#1e293b',
                            margin: 0,
                            lineHeight: '1.5',
                            opacity: 0.9
                        }}>
                            Follow us and get updates delivered to your favorite social media channel.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div style={{
                        padding: '2rem 1.5rem',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                    }}>
                        {/* Visit Us Online */}
                        <button style={{
                            width: '100%',
                            background: '#3730a3',
                            border: 'none',
                            borderRadius: '25px',
                            padding: '1rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#fff',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(55, 48, 163, 0.3)',
                            transition: 'all 0.2s'
                        }}>
                            Visit Us Online
                        </button>

                        {/* Talk to Us */}
                        <button style={{
                            width: '100%',
                            background: '#3730a3',
                            border: 'none',
                            borderRadius: '25px',
                            padding: '1rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#fff',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(55, 48, 163, 0.3)',
                            transition: 'all 0.2s'
                        }}>
                            Talk to Us
                        </button>

                        {/* Instagram */}
                        <button style={{
                            width: '100%',
                            background: '#3730a3',
                            border: 'none',
                            borderRadius: '25px',
                            padding: '1rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#fff',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(55, 48, 163, 0.3)',
                            transition: 'all 0.2s'
                        }}>
                            Instagram
                        </button>

                        {/* Youtube */}
                        <button style={{
                            width: '100%',
                            background: '#3730a3',
                            border: 'none',
                            borderRadius: '25px',
                            padding: '1rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#fff',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(55, 48, 163, 0.3)',
                            transition: 'all 0.2s'
                        }}>
                            Youtube
                        </button>
                    </div>

                    {/* Footer with Social Icons */}
                    <div style={{
                        background: '#4db8a8',
                        borderTopLeftRadius: '30px',
                        borderTopRightRadius: '30px',
                        padding: '1.5rem',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1.5rem',
                        marginTop: 'auto'
                    }}>
                        {/* Globe Icon */}
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: '#3730a3',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                            <Globe size={24} color="#fff" />
                        </div>

                        {/* Instagram Icon */}
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: '#e1306c',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                            <Instagram size={24} color="#fff" />
                        </div>

                        {/* Facebook Icon */}
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: '#1877f2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                            <Facebook size={24} color="#fff" />
                        </div>
                    </div>

                    {/* Share Button */}
                    <div style={{
                        position: 'fixed',
                        bottom: '7rem',
                        right: '2rem',
                        zIndex: 10
                    }}>
                        <button style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: '#3730a3',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'password-protected') {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                <div style={{
                    height: '100%',
                    overflowY: 'auto',
                    background: '#0a3d3d',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Hero Image */}
                    <div style={{
                        position: 'relative',
                        height: '180px',
                        overflow: 'hidden'
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop"
                            alt="Security"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    {/* Information Cards */}
                    <div style={{
                        padding: '1.5rem',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        {/* Name */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            padding: '1rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#fff',
                                marginBottom: '0.25rem',
                                opacity: 0.8
                            }}>
                                Name:
                            </div>
                            <div style={{
                                fontSize: '1rem',
                                color: '#fff',
                                fontWeight: '600'
                            }}>
                                Hellen Grey
                            </div>
                        </div>

                        {/* Address */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            padding: '1rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#fff',
                                marginBottom: '0.25rem',
                                opacity: 0.8
                            }}>
                                Address:
                            </div>
                            <div style={{
                                fontSize: '1rem',
                                color: '#fff',
                                fontWeight: '600',
                                lineHeight: '1.4'
                            }}>
                                4059 Carling Avenue<br />
                                Ottawa Ontario
                            </div>
                        </div>

                        {/* Contact */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            padding: '1rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#fff',
                                marginBottom: '0.25rem',
                                opacity: 0.8
                            }}>
                                Contact:
                            </div>
                            <div style={{
                                fontSize: '1rem',
                                color: '#fff',
                                fontWeight: '600'
                            }}>
                                703-701-9964
                            </div>
                        </div>

                        {/* Bank Account */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            padding: '1rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#fff',
                                marginBottom: '0.25rem',
                                opacity: 0.8
                            }}>
                                Bank Account:
                            </div>
                            <div style={{
                                fontSize: '1rem',
                                color: '#fff',
                                fontWeight: '600'
                            }}>
                                9647037019964
                            </div>
                        </div>
                    </div>

                    {/* Password Protected Notice */}
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        padding: '1rem 1.5rem',
                        textAlign: 'center',
                        marginTop: 'auto'
                    }}>
                        <div style={{
                            fontSize: '0.85rem',
                            color: '#fff',
                            fontWeight: '500'
                        }}>
                            This information is password-protected
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'event') {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                <div style={{ height: '100%', overflowY: 'auto', background: '#fff' }}>
                    {/* Event Image */}
                    <div style={{
                        height: '140px',
                        overflow: 'hidden'
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=150&fit=crop"
                            alt="Event"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    {/* Event Header - Teal */}
                    <div style={{
                        background: '#0d9488',
                        padding: '1.5rem',
                        textAlign: 'center',
                        color: '#fff'
                    }}>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            margin: '0 0 0.75rem 0',
                            lineHeight: '1.3'
                        }}>
                            4th Annual Company Meetup
                        </h1>
                        <p style={{
                            fontSize: '0.875rem',
                            margin: 0,
                            lineHeight: '1.5',
                            opacity: 0.95
                        }}>
                            We aim to provide fresh and healthy snacks people on the go.
                        </p>
                    </div>

                    {/* Event Details */}
                    <div style={{ padding: '1.5rem' }}>
                        {/* Day 1 */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                color: '#0d9488',
                                marginBottom: '0.5rem',
                                letterSpacing: '0.5px'
                            }}>
                                DAY 1
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <Calendar size={20} color="#0d9488" />
                                <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '600' }}>
                                    Friday, 03 Mar 2023
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Clock size={20} color="#0d9488" />
                                <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '600' }}>
                                    04:00 PM - 08:00 PM
                                </span>
                            </div>
                        </div>

                        {/* Day 2 */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                color: '#0d9488',
                                marginBottom: '0.5rem',
                                letterSpacing: '0.5px'
                            }}>
                                DAY 2
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <Calendar size={20} color="#0d9488" />
                                <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '600' }}>
                                    Saturday, 04 Mar 2023
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Clock size={20} color="#0d9488" />
                                <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '600' }}>
                                    04:00 PM - 08:00 PM
                                </span>
                            </div>
                        </div>

                        {/* Location */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <MapPin size={20} color="#0d9488" style={{ marginTop: '2px' }} />
                                <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '600', lineHeight: '1.5' }}>
                                    NY, 10001, United States
                                </span>
                            </div>
                        </div>

                        {/* Yellow Divider */}
                        <div style={{
                            height: '4px',
                            background: '#fbbf24',
                            margin: '1.5rem 0',
                            borderRadius: '2px'
                        }}></div>

                        {/* Facilities */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{
                                fontSize: '1rem',
                                fontWeight: '700',
                                color: '#0d9488',
                                margin: '0 0 1rem 0'
                            }}>
                                FACILITIES
                            </h3>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                gap: '1rem'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Wifi size={32} color="#3b82f6" />
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Wifi</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                                        <rect x="2" y="7" width="20" height="14" rx="2" />
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                    </svg>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Sofa</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Handicap</div>
                                </div>
                            </div>
                        </div>

                        {/* Yellow Divider */}
                        <div style={{
                            height: '4px',
                            background: '#fbbf24',
                            margin: '1.5rem 0',
                            borderRadius: '2px'
                        }}></div>

                        {/* Event Manager */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: '#0d9488',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold'
                                }}>
                                    <User size={24} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>
                                        Hellen Grey
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#0d9488', fontWeight: '600' }}>
                                        Event Manager
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Phone size={18} color="#0d9488" />
                                    <span style={{ fontSize: '0.95rem', color: '#1e293b' }}>15555551234</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Mail size={18} color="#0d9488" />
                                    <span style={{ fontSize: '0.95rem', color: '#1e293b' }}>Hellen@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer - Teal */}
                    <div style={{
                        background: '#0d9488',
                        padding: '1.5rem',
                        textAlign: 'center',
                        color: '#fff'
                    }}>
                        <div style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '1rem'
                        }}>
                            You can find me on:
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: '#3b82f6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Globe size={24} color="#fff" />
                            </div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: '#f59e0b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Instagram size={24} color="#fff" />
                            </div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: '#8b5cf6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Facebook size={24} color="#fff" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'product-page') {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                <div style={{ height: '100%', overflowY: 'auto', background: '#fbbf24' }}>
                    {/* Header */}
                    <div style={{
                        background: '#fbbf24',
                        padding: '2rem 1.5rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <div style={{
                            background: '#000',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '8px'
                        }}>
                            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>DayFresh</span>
                        </div>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#000',
                            margin: 0
                        }}>
                            Dairyland
                        </h1>
                    </div>

                    {/* Image Carousel */}
                    <div style={{
                        position: 'relative',
                        height: '200px',
                        background: '#fbbf24',
                        padding: '0 1.5rem 1.5rem'
                    }}>
                        <div style={{
                            position: 'relative',
                            height: '100%',
                            overflow: 'hidden',
                            borderRadius: '12px'
                        }}>
                            {productImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Product ${index + 1}`}
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: productImageIndex === index ? 1 : 0,
                                        transition: 'opacity 0.5s ease-in-out'
                                    }}
                                />
                            ))}
                        </div>
                        {/* Dots */}
                        <div style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '0.5rem'
                        }}>
                            {productImages.map((_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: index === productImageIndex ? '24px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        background: index === productImageIndex ? '#fbbf24' : 'rgba(255,255,255,0.5)',
                                        transition: 'all 0.3s'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div style={{
                        background: '#fbbf24',
                        padding: '0 1.5rem 1.5rem'
                    }}>
                        <div style={{
                            background: '#fbbf24',
                            borderRadius: '12px',
                            padding: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h2 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    color: '#000',
                                    margin: '0 0 0.25rem 0'
                                }}>
                                    Chocolate Flavored Milk
                                </h2>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: '#000',
                                    margin: 0,
                                    opacity: 0.8
                                }}>
                                    325 ml
                                </p>
                            </div>
                            <div style={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                color: '#000'
                            }}>
                                Rs 95
                            </div>
                        </div>
                    </div>

                    {/* Accordions */}
                    <div style={{ padding: '0 1.5rem 1rem' }}>
                        {/* Description */}
                        <div style={{ marginBottom: '0.75rem' }}>
                            <button
                                onClick={() => toggleAccordion('description')}
                                style={{
                                    width: '100%',
                                    background: '#0a2540',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: '#fff',
                                    fontWeight: '600',
                                    fontSize: '1rem'
                                }}
                            >
                                Description
                                <span style={{ transform: openAccordion === 'description' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                            </button>
                            {openAccordion === 'description' && (
                                <div style={{
                                    background: '#fcd34d',
                                    padding: '1rem',
                                    borderBottomLeftRadius: '8px',
                                    borderBottomRightRadius: '8px',
                                    fontSize: '0.875rem',
                                    color: '#000',
                                    lineHeight: '1.6'
                                }}>
                                    The Dark, Smooth, Creaminess Of Chocolate Romances The Wholesome Goodness Of Real Cow'S Milk.
                                </div>
                            )}
                        </div>

                        {/* Ingredients */}
                        <div style={{ marginBottom: '0.75rem' }}>
                            <button
                                onClick={() => toggleAccordion('ingredients')}
                                style={{
                                    width: '100%',
                                    background: '#0a2540',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: '#fff',
                                    fontWeight: '600',
                                    fontSize: '1rem'
                                }}
                            >
                                Ingredient
                                <span style={{ transform: openAccordion === 'ingredients' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                            </button>
                            {openAccordion === 'ingredients' && (
                                <div style={{
                                    background: '#fcd34d',
                                    padding: '1rem',
                                    borderBottomLeftRadius: '8px',
                                    borderBottomRightRadius: '8px',
                                    fontSize: '0.875rem',
                                    color: '#000',
                                    lineHeight: '1.6'
                                }}>
                                    Reduced Fat Milk<br />
                                    Milk Solids<br />
                                    Cocoa Powder<br />
                                    Sugar<br />
                                    Emulsifier: Vegetable Oil Origin (E471)<br />
                                    Stabilizer (E407) & Chocolate Flavor
                                </div>
                            )}
                        </div>

                        {/* Nutrition facts */}
                        <div style={{ marginBottom: '0.75rem' }}>
                            <button
                                onClick={() => toggleAccordion('nutrition')}
                                style={{
                                    width: '100%',
                                    background: '#0a2540',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: '#fff',
                                    fontWeight: '600',
                                    fontSize: '1rem'
                                }}
                            >
                                Nutrition facts
                                <span style={{ transform: openAccordion === 'nutrition' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                            </button>
                            {openAccordion === 'nutrition' && (
                                <div style={{
                                    background: '#fcd34d',
                                    padding: '1rem',
                                    borderBottomLeftRadius: '8px',
                                    borderBottomRightRadius: '8px',
                                    fontSize: '0.875rem',
                                    color: '#000',
                                    lineHeight: '1.6'
                                }}>
                                    Nutrient Measurement Precision Exact,<br />
                                    Energy 84Cal,<br />
                                    Carbohydrates 13.3g<br />
                                    Fat 2.15g
                                </div>
                            )}
                        </div>

                        {/* Allergens */}
                        <div style={{ marginBottom: '0.75rem' }}>
                            <button
                                onClick={() => toggleAccordion('allergens')}
                                style={{
                                    width: '100%',
                                    background: '#0a2540',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: '#fff',
                                    fontWeight: '600',
                                    fontSize: '1rem'
                                }}
                            >
                                Allergens
                                <span style={{ transform: openAccordion === 'allergens' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                            </button>
                            {openAccordion === 'allergens' && (
                                <div style={{
                                    background: '#fcd34d',
                                    padding: '1rem',
                                    borderBottomLeftRadius: '8px',
                                    borderBottomRightRadius: '8px',
                                    fontSize: '0.875rem',
                                    color: '#000',
                                    lineHeight: '1.6'
                                }}>
                                    Egg<br />
                                    Milk
                                </div>
                            )}
                        </div>

                        {/* Certificates */}
                        <div style={{ marginBottom: '1rem' }}>
                            <button
                                style={{
                                    width: '100%',
                                    background: '#0a2540',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    color: '#fff',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Certificates
                            </button>
                        </div>

                        {/* Buy Product Button */}
                        <button style={{
                            width: '100%',
                            background: '#0a2540',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '1rem',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            marginBottom: '1rem'
                        }}>
                            Buy Product
                        </button>
                    </div>

                    {/* Video Section */}
                    <div style={{ padding: '0 1.5rem 1rem' }}>
                        <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            color: '#000',
                            margin: '0 0 1rem 0',
                            textAlign: 'center'
                        }}>
                            Video
                        </h3>
                        <div style={{
                            borderRadius: '12px',
                            overflow: 'hidden',
                            background: '#000'
                        }}>
                            <iframe
                                width="100%"
                                height="180"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="Product Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ display: 'block' }}
                            />
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div style={{ padding: '0 1.5rem 1rem' }}>
                        <button style={{
                            width: '100%',
                            background: '#0a2540',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '1rem',
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}>
                            <MessageCircle size={20} />
                            Add Your Feedback
                        </button>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Write your feedback here..."
                            style={{
                                width: '100%',
                                minHeight: '80px',
                                background: '#fcd34d',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '1rem',
                                fontSize: '0.875rem',
                                color: '#000',
                                resize: 'vertical',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    {/* Contact Us */}
                    <div style={{ padding: '0 1.5rem 1rem' }}>
                        <div style={{
                            background: '#fff',
                            borderRadius: '12px',
                            padding: '1.5rem'
                        }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                color: '#000',
                                margin: '0 0 1rem 0'
                            }}>
                                Contact Us
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Phone size={20} color="#000" />
                                    <span style={{ fontSize: '0.95rem', color: '#000' }}>111337374</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Mail size={20} color="#000" />
                                    <span style={{ fontSize: '0.95rem', color: '#000' }}>info@dairylandltd.com</span>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '1rem',
                                marginTop: '1.5rem'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#e1306c',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Instagram size={24} color="#fff" />
                                </div>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#1877f2',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Facebook size={24} color="#fff" />
                                </div>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#25d366',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <MessageCircle size={24} color="#fff" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* See Product Rating Button */}
                    <div style={{ padding: '0 1.5rem 1.5rem' }}>
                        <button style={{
                            width: '100%',
                            background: '#0a2540',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '1rem',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            cursor: 'pointer'
                        }}>
                            See Product Rating
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'dynamic-url') {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#fff'
                }}>
                    {/* Yellow Curved Top Section */}
                    <div style={{
                        background: '#eab308',
                        borderBottomLeftRadius: '50% 40px',
                        borderBottomRightRadius: '50% 40px',
                        padding: '3rem 2rem 3rem',
                        textAlign: 'center',
                        position: 'relative',
                        minHeight: '180px'
                    }}>
                    </div>

                    {/* Main Content */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        {/* Text Message */}
                        <p style={{
                            fontSize: '1rem',
                            color: '#1e293b',
                            textAlign: 'center',
                            lineHeight: '1.6',
                            margin: '0 0 2rem 0',
                            fontWeight: '500'
                        }}>
                            Some QR Codes types will show a live preview here but not this one. View and test your QR Code in the next step!
                        </p>

                        {/* QR Code Characters */}
                        <div style={{
                            display: 'flex',
                            gap: '1.5rem',
                            alignItems: 'flex-end',
                            marginBottom: '2rem'
                        }}>
                            {/* Purple QR Character */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                                    position: 'relative',
                                    boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)'
                                }}>
                                    {/* QR Pattern */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(5, 1fr)',
                                        gap: '3px',
                                        width: '50px',
                                        height: '50px'
                                    }}>
                                        {[...Array(25)].map((_, i) => (
                                            <div key={i} style={{
                                                background: Math.random() > 0.5 ? '#fff' : 'transparent',
                                                borderRadius: '2px'
                                            }} />
                                        ))}
                                    </div>
                                    {/* Eyes */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        left: '20px',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#fff'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#fff'
                                    }} />
                                    {/* Smile */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '18px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '30px',
                                        height: '15px',
                                        borderBottom: '3px solid #fff',
                                        borderRadius: '0 0 15px 15px'
                                    }} />
                                </div>
                                {/* Legs */}
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginTop: '4px'
                                }}>
                                    <div style={{
                                        width: '3px',
                                        height: '30px',
                                        background: '#a855f7',
                                        borderRadius: '2px'
                                    }} />
                                    <div style={{
                                        width: '3px',
                                        height: '30px',
                                        background: '#a855f7',
                                        borderRadius: '2px'
                                    }} />
                                </div>
                            </div>

                            {/* Cyan QR Character */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
                                    position: 'relative',
                                    boxShadow: '0 4px 12px rgba(34, 211, 238, 0.3)'
                                }}>
                                    {/* QR Pattern */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(5, 1fr)',
                                        gap: '3px',
                                        width: '50px',
                                        height: '50px'
                                    }}>
                                        {[...Array(25)].map((_, i) => (
                                            <div key={i} style={{
                                                background: Math.random() > 0.5 ? '#fff' : 'transparent',
                                                borderRadius: '2px'
                                            }} />
                                        ))}
                                    </div>
                                    {/* Eyes */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        left: '20px',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#fff'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#fff'
                                    }} />
                                    {/* Smile */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '18px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '30px',
                                        height: '15px',
                                        borderBottom: '3px solid #fff',
                                        borderRadius: '0 0 15px 15px'
                                    }} />
                                </div>
                                {/* Legs */}
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginTop: '4px'
                                }}>
                                    <div style={{
                                        width: '3px',
                                        height: '30px',
                                        background: '#22d3ee',
                                        borderRadius: '2px'
                                    }} />
                                    <div style={{
                                        width: '3px',
                                        height: '30px',
                                        background: '#22d3ee',
                                        borderRadius: '2px'
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Purple Curved Bottom Section */}
                    <div style={{
                        background: '#7c3aed',
                        borderTopLeftRadius: '50% 40px',
                        borderTopRightRadius: '50% 40px',
                        minHeight: '180px',
                        marginTop: 'auto'
                    }}>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'video') {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#000',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                {/* Video Container */}
                <div style={{
                    height: '100%',
                    background: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem 0'
                }}>
                    <video
                        controls
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                        poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop"
                    >
                        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        );
    }

    if (type === 'image') {
        const nextImage = () => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        };

        const prevImage = () => {
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        };

        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                {/* Top White Space */}
                <div style={{ height: '80px', background: '#f8fafc' }}></div>

                {/* Image Carousel */}
                <div style={{
                    flex: 1,
                    background: '#f8fafc',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Images */}
                    <div
                        onClick={() => setShowImageModal(true)}
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer'
                        }}
                    >
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Image ${index + 1}`}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    opacity: currentImageIndex === index ? 1 : 0,
                                    transition: 'opacity 0.5s ease-in-out'
                                }}
                            />
                        ))}
                    </div>

                    {/* Left Arrow */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                        }}
                        style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: 'none',
                            color: '#fff',
                            fontSize: '1.25rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10
                        }}
                    >
                        ‹
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: 'none',
                            color: '#fff',
                            fontSize: '1.25rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10
                        }}
                    >
                        ›
                    </button>
                </div>

                {/* Bottom White Space */}
                <div style={{ height: '80px', background: '#f8fafc' }}></div>

                {/* Image Modal */}
                {showImageModal && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.95)',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Close Button */}
                        <button
                            onClick={() => setShowImageModal(false)}
                            style={{
                                position: 'absolute',
                                top: '2rem',
                                right: '1rem',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.2)',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 101
                            }}
                        >
                            ×
                        </button>

                        {/* Full Image */}
                        <img
                            src={images[currentImageIndex]}
                            alt="Full preview"
                            style={{
                                maxWidth: '90%',
                                maxHeight: '90%',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                )}
            </div>
        );
    }

    if (isAppStore) {
        return (
            <div style={{
                width: '320px',
                height: '640px',
                background: '#fff',
                borderRadius: '40px',
                border: '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

                <div style={{ height: '100%', overflowY: 'auto', background: '#fff' }}>
                    {/* Header / Cover */}
                    <div style={{
                        height: '220px',
                        background: primaryColor,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                        borderBottomLeftRadius: '50% 20%',
                        borderBottomRightRadius: '50% 20%',
                        textAlign: 'center'
                    }}>
                        <div style={{ marginTop: '10px' }}>
                            <h2 style={{ margin: '0', fontSize: '1.5rem', fontWeight: '800', color: businessInfo?.titleColor || '#fff' }}>{businessInfo?.title}</h2>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.8, color: businessInfo?.subtitleColor || '#fff' }}>{businessInfo?.subtitle}</p>
                        </div>

                        {design?.logo?.url && (
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: '#fff',
                                position: 'absolute',
                                bottom: '-60px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                border: '4px solid #fff',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                            }}>
                                <img src={design.logo.url} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>

                    {/* App Store Body */}
                    <div style={{ marginTop: '80px', textAlign: 'center', padding: '0 1.5rem' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '800', color: businessInfo?.ctaColor || '#1e293b' }}>DOWNLOAD NOW</h3>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
                            {businessInfo?.description}
                        </p>

                        {/* Store Buttons */}
                        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {appLinks?.buttonType === 'circular' ? (
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                                    {appLinks?.google && (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                                background: secondaryColor,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}>
                                                <svg viewBox="0 0 24 24" fill="#fff" style={{ width: '32px', height: '32px' }}>
                                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                                </svg>
                                            </div>
                                            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>Google Play</span>
                                        </div>
                                    )}
                                    {appLinks?.apple && (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                                background: secondaryColor,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}>
                                                <svg viewBox="0 0 24 24" fill="#fff" style={{ width: '32px', height: '32px' }}>
                                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.9,7.75 14.37,6.65 15.97,6.84C16.63,6.87 18.5,7.1 19.72,8.9C19.66,8.94 17.55,10.18 17.59,12.73C17.63,15.32 19.81,16.26 19.82,16.26C19.81,16.28 19.46,17.5 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
                                                </svg>
                                            </div>
                                            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>App Store</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {appLinks?.google && (
                                        <div style={{
                                            background: secondaryColor,
                                            borderRadius: '12px',
                                            padding: '0.5rem 1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            textAlign: 'left'
                                        }}>
                                            <div style={{ width: '32px', height: '32px' }}>
                                                {/* Google Play Icon SVG */}
                                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
                                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>Get it on</div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Google Play</div>
                                            </div>
                                        </div>
                                    )}
                                    {appLinks?.apple && (
                                        <div style={{
                                            background: secondaryColor,
                                            borderRadius: '12px',
                                            padding: '0.5rem 1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            textAlign: 'left'
                                        }}>
                                            <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {/* Apple Icon SVG */}
                                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
                                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.9,7.75 14.37,6.65 15.97,6.84C16.63,6.87 18.5,7.1 19.72,8.9C19.66,8.94 17.55,10.18 17.59,12.73C17.63,15.32 19.81,16.26 19.82,16.26C19.81,16.28 19.46,17.5 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>Get it on</div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>App Store</div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Website Footer */}
                        {businessInfo?.website && (
                            <div style={{ marginTop: '2rem', textAlign: 'center', paddingBottom: '1rem' }}>
                                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, wordBreak: 'break-all' }}>
                                    {businessInfo.website}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            width: '320px',
            height: '640px',
            background: '#fff',
            borderRadius: '40px',
            border: '12px solid #1e293b',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            margin: '0 auto'
        }}>
            {/* Notch */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

            {/* Content Scrollable Area */}
            <div style={{ height: '100%', overflowY: 'auto', paddingBottom: '2rem', background: '#f5f6f8' }}>

                {/* Header / Cover + Hero */}
                <div style={{
                    background: headerColor || '#7f1d1d',
                    color: '#fff',
                    padding: '1rem 1rem 1.25rem',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.12)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '-0.01em' }}>
                            {businessInfo?.title || "Bob's Cafe"}
                        </div>
                        <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            background: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
                        }}>
                            <Heart size={18} color={headerColor || '#b42318'} fill={headerColor || '#b42318'} />
                        </div>
                    </div>

                    <div style={{
                        marginTop: '0.9rem',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.18)'
                    }}>
                        <img
                            src={businessInfo?.coverImage || businessInfo?.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop'}
                            alt={businessInfo?.title || 'Cafe'}
                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        />
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.01em' }}>
                            {businessInfo?.headline || 'Eat.Refresh.Go'}
                        </h2>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            {businessInfo?.subtitle || businessInfo?.description || 'We aim to provide fresh and healthy snacks people on the go.'}
                        </p>
                        <div style={{ marginTop: '0.25rem' }}>
                            <button style={{
                                background: '#fff',
                                color: headerColor || '#7f1d1d',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '0.5rem 0.9rem',
                                fontWeight: '800',
                                fontSize: '0.85rem',
                                letterSpacing: '0.02em',
                                cursor: 'pointer',
                                boxShadow: '0 4px 10px rgba(255,255,255,0.18)'
                            }}>
                                TIMINGS
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Section */}
                {menu && menu.length > 0 && (
                    <div style={{
                        background: '#fff',
                        marginTop: '0.6rem',
                        padding: '1rem',
                        borderRadius: '16px 16px 0 0',
                        boxShadow: '0 -2px 12px rgba(0,0,0,0.06)'
                    }}>
                        {/* Menu Tabs */}
                        <div style={{
                            display: 'flex',
                            gap: '1.25rem',
                            borderBottom: '2px solid #f1f5f9',
                            marginBottom: '1rem',
                            paddingBottom: '0.5rem'
                        }}>
                            {['Burger', 'Coffee', 'Juices'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setSelectedMenuTab(tab)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        fontSize: '0.95rem',
                                        fontWeight: selectedMenuTab === tab ? '800' : '600',
                                        color: selectedMenuTab === tab ? (headerColor || '#7f1d1d') : '#8b95a5',
                                        cursor: 'pointer',
                                        padding: '0.4rem 0',
                                        borderBottom: selectedMenuTab === tab ? `3px solid ${headerColor || '#7f1d1d'}` : 'none',
                                        marginBottom: selectedMenuTab === tab ? '-2px' : '0',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Menu Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {selectedMenuTab === 'Burger' && (
                                <>
                                    {/* Burger Item 1 */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        padding: '0.75rem 0',
                                        borderBottom: '1px solid #f1f5f9'
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{
                                                fontSize: '1rem',
                                                fontWeight: '700',
                                                color: '#1e293b',
                                                margin: '0 0 0.25rem 0',
                                                textTransform: 'uppercase'
                                            }}>
                                                ZINGER BURGER
                                            </h4>
                                            <p style={{
                                                fontSize: '0.8rem',
                                                color: '#64748b',
                                                margin: '0 0 0.5rem 0',
                                                lineHeight: '1.3'
                                            }}>
                                                Jalapeno + cheese
                                            </p>
                                            <p style={{
                                                fontSize: '1rem',
                                                fontWeight: '700',
                                                color: headerColor || '#7f1d1d',
                                                margin: 0
                                            }}>
                                                10.00 $
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '1rem' }}>
                                            <button style={{
                                                width: '35px',
                                                height: '35px',
                                                borderRadius: '50%',
                                                background: headerColor || '#7f1d1d',
                                                border: 'none',
                                                color: '#fff',
                                                fontSize: '1.25rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '300'
                                            }}>
                                                +
                                            </button>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                flexShrink: 0
                                            }}>
                                                <img
                                                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop"
                                                    alt="Burger"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Burger Item 2 */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        padding: '0.75rem 0',
                                        borderBottom: '1px solid #f1f5f9'
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{
                                                fontSize: '1rem',
                                                fontWeight: '700',
                                                color: '#1e293b',
                                                margin: '0 0 0.25rem 0',
                                                textTransform: 'uppercase'
                                            }}>
                                                CHICKEN BURGER
                                            </h4>
                                            <p style={{
                                                fontSize: '0.8rem',
                                                color: '#64748b',
                                                margin: '0 0 0.5rem 0',
                                                lineHeight: '1.3'
                                            }}>
                                                Jalapeno + cheese + grilled chicken
                                            </p>
                                            <p style={{
                                                fontSize: '1rem',
                                                fontWeight: '700',
                                                color: headerColor || '#7f1d1d',
                                                margin: 0
                                            }}>
                                                12.00 $
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '1rem' }}>
                                            <button style={{
                                                width: '35px',
                                                height: '35px',
                                                borderRadius: '50%',
                                                background: headerColor || '#7f1d1d',
                                                border: 'none',
                                                color: '#fff',
                                                fontSize: '1.25rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '300'
                                            }}>
                                                +
                                            </button>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                flexShrink: 0
                                            }}>
                                                <img
                                                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop"
                                                    alt="Burger"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {selectedMenuTab === 'Coffee' && (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '3rem 1rem',
                                    color: headerColor || '#7f1d1d'
                                }}>
                                    <p style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        margin: 0
                                    }}>
                                        No Item available in this category!
                                    </p>
                                </div>
                            )}

                            {selectedMenuTab === 'Juices' && (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '3rem 1rem',
                                    color: headerColor || '#7f1d1d'
                                }}>
                                    <p style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        margin: 0
                                    }}>
                                        No Item available in this category!
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Timings Section */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '12px',
                            padding: '1rem',
                            marginTop: '1.5rem',
                            border: '1px solid #f1f5f9'
                        }}>
                            <h3 style={{
                                fontSize: '0.95rem',
                                fontWeight: '700',
                                color: '#1e293b',
                                margin: '0 0 1rem 0',
                                textTransform: 'uppercase'
                            }}>
                                TIMINGS
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Clock size={18} color="#64748b" />
                                    <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '600' }}>
                                        MONDAY - SATURDAY
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Clock size={18} color="#64748b" />
                                    <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '600' }}>
                                        12 pm to 11 pm
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Clock size={18} color="#64748b" />
                                    <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '600' }}>
                                        SUNDAY CLOSED
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Social Media */}
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        {social?.instagram && <Instagram size={20} color={primaryColor} />}
                        {social?.facebook && <Facebook size={20} color={primaryColor} />}
                        {social?.twitter && <Twitter size={20} color={primaryColor} />}
                        {social?.website && <Globe size={20} color={primaryColor} />}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MobilePreview;

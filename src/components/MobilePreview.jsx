import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Phone, MapPin, Clock, Globe, Instagram, Facebook, Twitter, X, Copy, Mail, Linkedin, MessageCircle, Wifi, Armchair, Accessibility, Calendar, User, Heart, Briefcase, Youtube, Twitch, Music, Ghost, Gamepad2, Dribbble, MessageSquare, Video, PenTool, Github, Send, Headphones, Pin, Bot, ChevronRight, Users, Baby, PawPrint, Plug, ParkingCircle, Bus, Car, Bed, Coffee, Martini, Utensils, Download, File, Wine, Plane, Star, ThumbsUp, ThumbsDown, Frown, Meh, Smile, Laugh } from 'lucide-react';
import { FaWhatsapp, FaDiscord, FaTwitch, FaSnapchat, FaTiktok, FaSpotify, FaPinterest, FaTelegram, FaReddit, FaBehance, FaTumblr } from 'react-icons/fa';
import { SiKick } from 'react-icons/si';

const AutoSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) return null;

    return (
        <div style={{
            width: '100%',
            overflow: 'hidden',
            borderRadius: '8px',
            marginBottom: '1rem',
            position: 'relative'
        }}>
            <div style={{
                display: 'flex',
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(-${currentIndex * 100}%)`,
                width: '100%'
            }}>
                {images.map((img, idx) => (
                    <img key={idx} src={img} alt={`Slide ${idx}`} style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        flexShrink: 0,
                        display: 'block'
                    }} />
                ))}
            </div>
        </div>
    );
};

const socialIconsMap = [
    { id: 'website', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', color: '#4B5563', name: 'Website' },
    { id: 'facebook', icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', color: '#1877F2', name: 'Facebook' },
    { id: 'instagram', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', color: '#E4405F', name: 'Instagram' },
    { id: 'twitter', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670151.png', color: '#000000', name: 'X' },
    { id: 'linkedin', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', color: '#0A66C2', name: 'LinkedIn' },
    { id: 'discord', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670157.png', color: '#5865F2', name: 'Discord' },
    { id: 'twitch', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111668.png', color: '#9146FF', name: 'Twitch' },
    { id: 'youtube', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', color: '#FF0000', name: 'YouTube' },
    { id: 'whatsapp', icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png', color: '#25D366', name: 'WhatsApp' },
    { id: 'snapchat', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png', color: '#FFFC00', name: 'Snapchat' },
    { id: 'tiktok', icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', color: '#000000', name: 'TikTok' },
    { id: 'tumblr', icon: 'https://cdn-icons-png.flaticon.com/512/100/100611.png', color: '#35465C', name: 'Tumblr' },
    { id: 'spotify', icon: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', color: '#1DB954', name: 'Spotify' },
    { id: 'telegram', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png', color: '#0088CC', name: 'Telegram' },
    { id: 'behance', icon: 'https://cdn-icons-png.flaticon.com/512/733/733541.png', color: '#1769FF', name: 'Behance' },
    { id: 'pinterest', icon: 'https://cdn-icons-png.flaticon.com/512/145/145808.png', color: '#BD081C', name: 'Pinterest' },
    { id: 'reddit', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670154.png', color: '#FF4500', name: 'Reddit' },
    { id: 'line', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111491.png', color: '#00B900', name: 'Line' },
    { id: 'globe', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', color: '#4B5563', name: 'Website' },
];

const MobilePreview = ({ config, isLiveView = false }) => {
    const { design, businessInfo, menu, timings, openingHours, social, appLinks, coupon, personalInfo, basicInfo, contact, exchange, type, facilities, socialLinks, form, customFields, thankYou, rating, uploadPdf, content, video, feedback, images } = config;
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [showExchangeModal, setShowExchangeModal] = useState(false);
    const [ratingStep, setRatingStep] = useState('rating'); // 'rating', 'userInfo', 'thankYou'
    const [leadGenStep, setLeadGenStep] = useState('form'); // 'form', 'thankYou'
    const [surveyStep, setSurveyStep] = useState('language'); // 'language', 'survey', 'thankYou'
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [selectedMenuTab, setSelectedMenuTab] = useState('');

    const defaultCategories = [
        {
            id: 'burger',
            name: 'Burger',
            products: [
                {
                    id: 'p1',
                    name: 'Zinger Burger',
                    price: '10',
                    description: 'jalapeno + cheese',
                    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=100&q=80'
                },
                {
                    id: 'p2',
                    name: 'Chicken Burger',
                    price: '12',
                    description: 'Jalapeno + cheese + grilled chicken',
                    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=100&q=80'
                }
            ]
        },
        {
            id: 'coffee',
            name: 'Coffee',
            products: []
        },
        {
            id: 'juices',
            name: 'Juices',
            products: []
        }
    ];

    const activeCategories = menu?.categories?.length > 0 ? menu.categories : defaultCategories;

    useEffect(() => {
        if (activeCategories.length > 0 && !selectedMenuTab) {
            setSelectedMenuTab(activeCategories[0].id);
        } else if (activeCategories.length > 0 && !activeCategories.find(c => c.id === selectedMenuTab)) {
            setSelectedMenuTab(activeCategories[0].id);
        }
    }, [activeCategories, selectedMenuTab]); // 'Burger', 'Coffee', 'Juices'
    const [reviewStep, setReviewStep] = useState('main'); // 'main', 'food', 'review', 'thankYou'
    const [selectedReviewCategory, setSelectedReviewCategory] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);
    const [customMenuOpenCat, setCustomMenuOpenCat] = useState(null);
    const [customMenuSelectedTab, setCustomMenuSelectedTab] = useState({});

    // Image QR Logic
    const defaultImages = [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop',
        'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&h=800&fit=crop'
    ];
    // Normalize images (handle objects from config or fallback to defaults)
    const displayImages = (images && images.length > 0)
        ? images.map(img => typeof img === 'string' ? img : img.url)
        : defaultImages;



    const productImages = [
        'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=300&h=300&fit=crop'
    ];

    const [productImageIndex, setProductImageIndex] = useState(0);
    const [openAccordion, setOpenAccordion] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [exchangeFormData, setExchangeFormData] = useState({});
    const [exchangeErrors, setExchangeErrors] = useState({});
    const [selectedRating, setSelectedRating] = useState(null);

    const handleExchangeChange = (e) => {
        const { name, value } = e.target;
        setExchangeFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (exchangeErrors[name]) {
            setExchangeErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleExchangeSubmit = () => {
        const errors = {};
        const configExchange = exchange || {}; // from props

        // Helper to check if field is enabled in config
        const isEnabled = (key) => configExchange[key] !== false;

        if (isEnabled('fullName') && !exchangeFormData.fullName?.trim()) {
            errors.fullName = 'Full Name is required';
        }
        if (isEnabled('contactNumber') && !exchangeFormData.contactNumber?.trim()) {
            errors.contactNumber = 'Contact Number is required';
        }
        if (isEnabled('organization') && !exchangeFormData.organization?.trim()) {
            errors.organization = 'Organization is required';
        }
        if (isEnabled('email')) {
            if (!exchangeFormData.email?.trim()) {
                errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(exchangeFormData.email)) {
                errors.email = 'Invalid email address';
            }
        }
        if (isEnabled('jobTitle') && !exchangeFormData.jobTitle?.trim()) {
            errors.jobTitle = 'Job Title is required';
        }
        if (isEnabled('website') && !exchangeFormData.website?.trim()) {
            errors.website = 'Website is required';
        }

        if (Object.keys(errors).length > 0) {
            setExchangeErrors(errors);
            return;
        }

        toast.success("This is only for preview");
    };

    const toggleAccordion = (name) => {
        setOpenAccordion(openAccordion === name ? null : name);
    };

    // Auto-slide images
    React.useEffect(() => {
        if (type === 'image' && displayImages.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [type, displayImages.length]);


    // Auto-slide product images
    React.useEffect(() => {
        if (type === 'product-page') {
            const interval = setInterval(() => {
                setProductImageIndex((prev) => (prev + 1) % productImages.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [type]);

    // Reset rating selection when type changes
    useEffect(() => {
        setSelectedRating(null);
    }, [rating?.type]);


    // AFTER – colour independence
    // -------------------------------------
    // 1️⃣ Primary colour (used for the header)
    const primaryColor = design?.primaryColor || design?.color?.dark || '#0f3485';

    // 2️⃣ Secondary colour (used for buttons, etc.)
    const secondaryColor = design?.secondaryColor || design?.color?.light || '#06b6d4';

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
    const isSocial = type === 'social-media' || type === 'social'; // Added isSocial flag
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
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                <div style={{ padding: '2rem 1.5rem', height: '100%', overflowY: 'auto' }}>
                    {(!config.customComponents || config.customComponents.length === 0) ? (
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '2rem'
                        }}>
                            <h3 style={{
                                color: '#8b5cf6',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                lineHeight: '1.4'
                            }}>
                                Add components and create<br />your custom type
                            </h3>
                        </div>
                    ) : (
                        <>
                            {/* Render all components except social_links */}
                            {config.customComponents.filter(comp => comp.type !== 'social_links').map(comp => {
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
                                        return <AutoSlider key={comp.id} images={comp.data.images} />;
                                    case 'video':
                                        if (!comp.data.url) return null;
                                        return (
                                            <div key={comp.id} style={{ marginBottom: '1rem' }}>
                                                <video src={comp.data.url} controls style={{ width: '100%', borderRadius: '8px', background: '#000' }} />
                                            </div>
                                        );
                                    case 'pdf':
                                        if (!comp.data.url) return null;
                                        return (
                                            <div key={comp.id} style={{
                                                marginBottom: '1.5rem',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                border: '1px solid #e2e8f0',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                background: '#fff'
                                            }}>
                                                {/* PDF Preview Area */}
                                                <div style={{
                                                    height: '250px',
                                                    width: '100%',
                                                    overflow: 'auto',
                                                    position: 'relative',
                                                    background: '#f8fafc'
                                                }}>
                                                    <iframe
                                                        src={comp.data.url}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            border: 'none',
                                                            display: 'block'
                                                        }}
                                                        title="PDF Preview"
                                                    />
                                                </div>
                                                {/* Bottom info section */}
                                                <div style={{
                                                    padding: '0.75rem 1rem',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    background: '#fff'
                                                }}>
                                                    <div style={{
                                                        fontWeight: '700',
                                                        fontSize: '1rem',
                                                        color: '#1e293b',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '85%'
                                                    }}>
                                                        {comp.data.fileName || 'Qr Insight Presentation'}
                                                    </div>
                                                    <a
                                                        href={comp.data.url}
                                                        download={comp.data.fileName}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            color: '#475569',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            transition: 'color 0.2s',
                                                            padding: '4px',
                                                            textDecoration: 'none'
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.color = '#1e293b'}
                                                        onMouseOut={(e) => e.currentTarget.style.color = '#475569'}
                                                    >
                                                        <Download size={20} strokeWidth={2} />
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    case 'menu':
                                        if (!comp.data.categories || comp.data.categories.length === 0) return null;

                                        // Set default selected tab for this component if not set
                                        const activeTab = customMenuSelectedTab[comp.id] || comp.data.categories[0].id;
                                        const activeCategory = comp.data.categories.find(c => c.id === activeTab) || comp.data.categories[0];

                                        return (
                                            <div key={comp.id} style={{ marginBottom: '1rem' }}>
                                                {/* Categories Tabs */}
                                                <div style={{
                                                    display: 'flex',
                                                    overflowX: 'auto',
                                                    gap: '1rem',
                                                    paddingBottom: '0.5rem',
                                                    marginBottom: '1rem',
                                                    borderBottom: '1px solid #e2e8f0'
                                                }}>
                                                    {comp.data.categories.map((cat) => (
                                                        <button
                                                            key={cat.id}
                                                            onClick={() => setCustomMenuSelectedTab(prev => ({ ...prev, [comp.id]: cat.id }))}
                                                            style={{
                                                                border: 'none',
                                                                background: 'none',
                                                                padding: '0.5rem 0',
                                                                fontSize: '0.9rem',
                                                                fontWeight: activeTab === cat.id ? 'bold' : '500',
                                                                color: activeTab === cat.id ? '#8b5cf6' : '#64748b',
                                                                cursor: 'pointer',
                                                                position: 'relative',
                                                                whiteSpace: 'nowrap'
                                                            }}
                                                        >
                                                            {cat.name}
                                                            {activeTab === cat.id && (
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    bottom: '-1px',
                                                                    left: 0,
                                                                    width: '100%',
                                                                    height: '2px',
                                                                    background: '#8b5cf6'
                                                                }} />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Products List */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    {activeCategory.products && activeCategory.products.length > 0 ? (
                                                        activeCategory.products.map((prod) => (
                                                            <div key={prod.id} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed #e2e8f0' }}>
                                                                <div style={{ flex: 1 }}>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                                        <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1e293b' }}>{prod.name}</span>
                                                                        <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#8b5cf6' }}>
                                                                            {comp.data.currency === 'PKR' ? 'Rs.' : (comp.data.currency === 'USD' ? '$' : (businessInfo?.currency || '$'))}
                                                                            {prod.price}
                                                                        </span>
                                                                    </div>
                                                                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>{prod.description}</p>
                                                                </div>
                                                                {prod.image && (
                                                                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                                                        <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.9rem' }}>No products in this category</div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    case 'weekly_schedule':
                                        if (!comp.data.timings || comp.data.timings.length === 0) return null;

                                        return (
                                            <div key={comp.id} style={{ marginBottom: '1.5rem' }}>
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>OPENING HOURS</h3>
                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                    {comp.data.timings.map((dayInfo) => (
                                                        <div key={dayInfo.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                                                            <span style={{ fontWeight: '500', color: '#64748b' }}>{dayInfo.day}</span>
                                                            <span style={{
                                                                color: dayInfo.isOpen ? '#64748b' : '#ef4444',
                                                                fontWeight: '400'
                                                            }}>
                                                                {dayInfo.isOpen ? `${dayInfo.start} - ${dayInfo.end}` : 'closed'}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    case 'days_scheduler':
                                        if (!comp.data.days || comp.data.days.length === 0) return null;

                                        return (
                                            <div key={comp.id} style={{ marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                                    {comp.data.days.map((dayItem, index) => (
                                                        <div key={dayItem.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fbbf24', marginBottom: '0.25rem' }}>
                                                                DAY {index + 1}
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                                <Calendar size={18} color="#64748b" />
                                                                <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#1e293b' }}>
                                                                    {new Date(dayItem.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                                                                </span>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                                <Clock size={18} color="#64748b" />
                                                                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
                                                                    {dayItem.beginsAt} - {dayItem.endsAt} (GMT+5)
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    case 'contacts':
                                        return (
                                            <div key={comp.id} style={{ marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0rem' }}>
                                                    {comp.data.phone && typeof comp.data.phone === 'string' && comp.data.phone.trim().length > 0 && (
                                                        <>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
                                                                <div style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    borderRadius: '50%',
                                                                    border: '2px solid #3b82f6',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    flexShrink: 0
                                                                }}>
                                                                    <Phone size={20} color="#ef4444" />
                                                                </div>
                                                                <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '400' }}>
                                                                    {comp.data.phone}
                                                                </span>
                                                            </div>
                                                            <div style={{ height: '1px', background: '#e2e8f0', margin: '0' }}></div>
                                                        </>
                                                    )}
                                                    {comp.data.email && comp.data.email.trim() !== '' && (
                                                        <>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
                                                                <div style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    borderRadius: '50%',
                                                                    border: '2px solid #3b82f6',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    flexShrink: 0
                                                                }}>
                                                                    <Mail size={20} color="#3b82f6" />
                                                                </div>
                                                                <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '400' }}>
                                                                    {comp.data.email}
                                                                </span>
                                                            </div>
                                                            <div style={{ height: '1px', background: '#e2e8f0', margin: '0' }}></div>
                                                        </>
                                                    )}
                                                    {comp.data.website && comp.data.website.trim() !== '' && (
                                                        <>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
                                                                <div style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    borderRadius: '50%',
                                                                    border: '2px solid #3b82f6',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    flexShrink: 0
                                                                }}>
                                                                    <Globe size={20} color="#3b82f6" />
                                                                </div>
                                                                <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '400' }}>
                                                                    {comp.data.website}
                                                                </span>
                                                            </div>
                                                            <div style={{ height: '1px', background: '#e2e8f0', margin: '0' }}></div>
                                                        </>
                                                    )}
                                                    {comp.data.address && comp.data.address.trim() !== '' && (
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
                                                            <div style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                borderRadius: '50%',
                                                                border: '2px solid #3b82f6',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0
                                                            }}>
                                                                <MapPin size={20} color="#3b82f6" />
                                                            </div>
                                                            <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '400' }}>
                                                                {comp.data.address}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    case 'companies':
                                        if (!comp.data.companies || comp.data.companies.length === 0) return null;

                                        return (
                                            <div key={comp.id} style={{ marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0rem' }}>
                                                    {comp.data.companies.map((company, index) => (
                                                        <React.Fragment key={company.id}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
                                                                <div style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    borderRadius: '50%',
                                                                    border: '2px solid #fbbf24',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    flexShrink: 0
                                                                }}>
                                                                    <Briefcase size={20} color="#fbbf24" />
                                                                </div>
                                                                <div style={{ flex: 1 }}>
                                                                    <div style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '500' }}>
                                                                        {company.name}
                                                                    </div>
                                                                    <div style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: '400' }}>
                                                                        {company.profession}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {index < comp.data.companies.length - 1 && (
                                                                <div style={{ height: '1px', background: '#e2e8f0', margin: '0' }}></div>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    case 'multiple_links':
                                        if (!comp.data.links || comp.data.links.length === 0) return null;

                                        return (
                                            <div key={comp.id} style={{ marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                    {comp.data.links.map((link) => (
                                                        <a
                                                            key={link.id}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                display: 'block',
                                                                background: '#fbbf24',
                                                                color: '#fff',
                                                                padding: '1rem',
                                                                borderRadius: '24px',
                                                                textAlign: 'center',
                                                                fontSize: '0.95rem',
                                                                fontWeight: '600',
                                                                textDecoration: 'none',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            {link.title}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    case 'facilities':
                                        if (!comp.data.selectedFacilities || comp.data.selectedFacilities.length === 0) return null;

                                        const facilityIcons = {
                                            'WiFi': <Wifi size={24} />,
                                            'Parking': '🅿️',
                                            'Wheelchair': '♿',
                                            'Restrooms': '🚻',
                                            'Pets': '🐾',
                                            'Parking_P': 'P',
                                            'Bus': '🚌',
                                            'Car_Parking': '🚗',
                                            'Hotel': '🏨',
                                            'Coffee': '☕',
                                            'Bar': '🍷',
                                            'Restaurant': '🍴'
                                        };

                                        const facilityLabels = {
                                            'WiFi': 'wifi',
                                            'Parking': 'parking',
                                            'Wheelchair': 'handicap',
                                            'Restrooms': 'restrooms',
                                            'Pets': 'pets',
                                            'Parking_P': 'parking',
                                            'Bus': 'bus',
                                            'Car_Parking': 'car',
                                            'Hotel': 'hotel',
                                            'Coffee': 'coffee',
                                            'Bar': 'bar',
                                            'Restaurant': 'restaurant'
                                        };

                                        return (
                                            <div key={comp.id} style={{ marginBottom: '1.5rem' }}>
                                                <div style={{
                                                    background: '#fff',
                                                    padding: '1rem 0',
                                                    borderRadius: '8px'
                                                }}>
                                                    <h3 style={{
                                                        fontSize: '0.9rem',
                                                        fontWeight: 'bold',
                                                        color: '#1e3a8a',
                                                        margin: '0 0 1rem 0',
                                                        paddingLeft: '1rem'
                                                    }}>
                                                        FACILITIES
                                                    </h3>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        justifyContent: 'center',
                                                        gap: '1.5rem',
                                                        padding: '0 1rem 1rem'
                                                    }}>
                                                        {comp.data.selectedFacilities.map((facilityName) => (
                                                            <div key={facilityName} style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                gap: '0.5rem',
                                                                minWidth: '60px'
                                                            }}>
                                                                <div style={{
                                                                    width: '50px',
                                                                    height: '50px',
                                                                    borderRadius: '8px',
                                                                    background: '#fff',
                                                                    border: '2px solid #3b82f6',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: typeof facilityIcons[facilityName] === 'string' ? '1.5rem' : '1rem',
                                                                    color: '#3b82f6'
                                                                }}>
                                                                    {facilityIcons[facilityName] || '📍'}
                                                                </div>
                                                                <span style={{
                                                                    fontSize: '0.75rem',
                                                                    color: '#64748b',
                                                                    textAlign: 'center'
                                                                }}>
                                                                    {facilityLabels[facilityName] || facilityName.toLowerCase()}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
                            })}

                            {/* Render social_links at the bottom as footer */}
                            {config.customComponents.filter(comp => comp.type === 'social_links').map(comp => {
                                if (!comp.data.selectedPlatforms || comp.data.selectedPlatforms.length === 0) return null;

                                const platformIcons = {
                                    'Facebook': '📘',
                                    'Instagram': '📷',
                                    'X': '✖️',
                                    'LinkedIn': '💼',
                                    'Discord': '🎮',
                                    'Twitch': '🎬',
                                    'Kick': '⚡',
                                    'YouTube': '▶️',
                                    'WhatsApp': '💬',
                                    'Snapchat': '👻',
                                    'TikTok': '🎵',
                                    'Tumblr': '📝',
                                    'Spotify': '🎧',
                                    'Dribbble': '🏀',
                                    'Pinterest': '📌',
                                    'Telegram': '✈️',
                                    'Behance': '🎨',
                                    'Reddit': '🤖',
                                    'Website': '🌐'
                                };

                                return (
                                    <div key={comp.id} style={{ marginBottom: '1.5rem' }}>
                                        <div style={{
                                            background: comp.data.bgColor || '#0B2D86',
                                            borderRadius: '50% 50% 12px 12px / 25px 25px 0 0',
                                            padding: '2rem 1.5rem',
                                            textAlign: 'center',
                                            marginTop: '2rem'
                                        }}>
                                            <h3 style={{
                                                color: comp.data.textColor || '#FFFFFF',
                                                fontSize: '0.95rem',
                                                fontWeight: '500',
                                                margin: '0 0 1.5rem 0',
                                                fontFamily: comp.data.font || 'Lato'
                                            }}>
                                                {comp.data.heading || 'Follow us on'}
                                            </h3>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                flexWrap: 'wrap'
                                            }}>
                                                {comp.data.selectedPlatforms.map((platform) => (
                                                    <a
                                                        key={platform.name}
                                                        href={platform.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            fontSize: '2rem',
                                                            textDecoration: 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        {platformIcons[platform.name] || '🌐'}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        );
    }

    if (isBioPage) {
        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                <div style={{ height: '100%', overflowY: 'auto', background: '#fff' }}>
                    {/* Header with Curve */}
                    {(() => {
                        const isLogoRemoved = design?.logo?.url === null || design?.logo?.url === '';
                        const logoSource = isLogoRemoved ? null : (design?.logo?.url || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop');

                        return (
                            <div style={{
                                height: '140px',
                                background: headerColor,
                                borderBottomLeftRadius: '50% 20%',
                                borderBottomRightRadius: '50% 20%',
                                position: 'relative',
                                marginBottom: logoSource ? '60px' : '2rem'
                            }}>
                                {/* Profile Image */}
                                {logoSource && (
                                    <div style={{
                                        width: '110px',
                                        height: '110px',
                                        borderRadius: (design?.pictureFrame === 'rectangular' || design?.profile?.shape === 'rectangular') ? '12px' : '50%',
                                        background: '#fff',
                                        padding: '3px',
                                        position: 'absolute',
                                        bottom: '-55px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <img
                                            src={logoSource}
                                            alt="Profile"
                                            style={{ width: '100%', height: '100%', borderRadius: (design?.pictureFrame === 'rectangular' || design?.profile?.shape === 'rectangular') ? '12px' : '50%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })()}

                    {/* Name and Title */}
                    <div style={{ textAlign: 'center', padding: '0 1rem', marginBottom: '1rem' }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: basicInfo?.nameColor || headerColor,
                            fontFamily: basicInfo?.nameFont || 'Lato',
                            margin: '0 0 0.5rem 0',
                            textTransform: 'uppercase'
                        }}>
                            {basicInfo?.name || personalInfo?.name}
                        </h2>
                        <p style={{
                            fontSize: '0.95rem',
                            color: basicInfo?.companyNameColor || '#1e293b',
                            fontFamily: basicInfo?.companyNameFont || 'Lato',
                            margin: 0,
                            fontWeight: '500'
                        }}>
                            {basicInfo?.companyName || personalInfo?.title}
                        </p>
                    </div>

                    {/* Divider */}
                    <div style={{ width: '80%', height: '2px', background: headerColor, margin: '0 auto 1.5rem' }}></div>

                    {/* Bio Section */}
                    <div style={{ padding: '0 2rem', marginBottom: '2rem' }}>
                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', margin: 0, textAlign: 'center' }}>
                            {basicInfo?.description || personalInfo?.bio}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 1.5rem', marginBottom: '2rem' }}>
                        {contact?.phone !== null && (
                            <a
                                href={`tel:${contact?.phone}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <button style={{
                                    width: '100%',
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
                                    {contact?.phoneButtonTitle || 'Talk to Me'}
                                </button>
                            </a>
                        )}

                        {contact?.email !== null && (
                            <a
                                href={`mailto:${contact?.email}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <button style={{
                                    width: '100%',
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
                                    {contact?.emailButtonTitle || 'Email Me'}
                                </button>
                            </a>
                        )}

                        {contact?.website !== null && (
                            <a
                                href={contact?.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none' }}
                            >
                                <button style={{
                                    width: '100%',
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
                                    {contact?.websiteButtonTitle || 'Visit Us'}
                                </button>
                            </a>
                        )}
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
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            {[
                                { id: 'facebook', icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', color: '#3b82f6' },
                                { id: 'instagram', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', color: '#ec4899' },
                                { id: 'twitter', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670151.png', color: '#000000' },
                                { id: 'linkedin', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', color: '#0a66c2' },
                                { id: 'youtube', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', color: '#ef4444' },
                                { id: 'whatsapp', icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png', color: '#22c55e' },
                                { id: 'spotify', icon: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', color: '#1db954' },
                                { id: 'website', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', color: '#06b6d4' },
                                { id: 'twitch', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111668.png', color: '#9146ff' },
                                { id: 'github', icon: 'https://cdn-icons-png.flaticon.com/512/733/733553.png', color: '#333333' },
                                { id: 'snapchat', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png', color: '#FFFC00', textColor: '#000' },
                                { id: 'dribbble', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111388.png', color: '#ea4c89' },
                                { id: 'discord', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670157.png', color: '#5865F2' },
                                { id: 'pinterest', icon: 'https://cdn-icons-png.flaticon.com/512/145/145808.png', color: '#bd081c' },
                                { id: 'tiktok', icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', color: '#000000' },
                                { id: 'reddit', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111589.png', color: '#ff4500' }
                            ].map((platform) => {
                                if (social?.[platform.id]) {
                                    return (
                                        <a
                                            key={platform.id}
                                            href={social[platform.id]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div style={{
                                                width: '45px',
                                                height: '45px',
                                                borderRadius: '12px',
                                                background: '#fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s ease',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                                overflow: 'hidden',
                                                border: '1px solid #e2e8f0'
                                            }}
                                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                <img src={platform.icon} alt={platform.id} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                                            </div>
                                        </a>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isSurvey) {
        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                {surveyStep === 'language' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                        {/* Logo */}
                        {design?.logo?.url && (
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
                                        src={design.logo.url}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Business Name */}
                        <div style={{ textAlign: 'center', padding: '1rem 1.5rem 0.5rem' }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: basicInfo?.organizationNameColor || '#1e293b',
                                margin: 0,
                                fontFamily: basicInfo?.organizationNameFont || 'Lato'
                            }}>
                                {basicInfo?.organizationName || 'Organization Name'}
                            </h2>
                        </div>

                        {/* Description */}
                        <div style={{ textAlign: 'center', padding: '0 2rem 1.5rem' }}>
                            <p style={{
                                fontSize: '0.9rem',
                                color: basicInfo?.descriptionColor || '#475569',
                                lineHeight: '1.5',
                                margin: 0,
                                fontFamily: basicInfo?.descriptionFont || 'Lato'
                            }}>
                                {basicInfo?.description || 'We aim to provide fresh and healthy snacks for people on the go.'}
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
                                {(() => {
                                    const languageData = [
                                        { name: 'English', code: 'us' },
                                        { name: 'Urdu', code: 'pk' },
                                        { name: 'Arabic', code: 'sa' },
                                        { name: 'Spanish', code: 'es' },
                                        { name: 'French', code: 'fr' },
                                        { name: 'German', code: 'de' },
                                        { name: 'Chinese', code: 'cn' },
                                        { name: 'Japanese', code: 'jp' },
                                        { name: 'Korean', code: 'kr' },
                                        { name: 'Russian', code: 'ru' },
                                        { name: 'Portuguese', code: 'pt' },
                                        { name: 'Italian', code: 'it' },
                                        { name: 'Dutch', code: 'nl' },
                                        { name: 'Turkish', code: 'tr' },
                                        { name: 'Hindi', code: 'in' },
                                        { name: 'Bengali', code: 'bd' },
                                        { name: 'Vietnamese', code: 'vn' },
                                        { name: 'Thai', code: 'th' },
                                        { name: 'Indonesian', code: 'id' },
                                        { name: 'Malay', code: 'my' }
                                    ].find(l => l.name === selectedLanguage);

                                    return languageData ? (
                                        <img
                                            src={`https://flagcdn.com/w20/${languageData.code}.png`}
                                            alt={selectedLanguage}
                                            style={{ width: '20px', height: '15px', objectFit: 'cover', borderRadius: '2px' }}
                                        />
                                    ) : null;
                                })()}
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
                                        cursor: 'pointer',
                                        paddingRight: '1.5rem'
                                    }}>
                                    {config.survey?.languages && config.survey.languages.length > 0 ? (
                                        config.survey.languages.map((lang, idx) => (
                                            <option key={idx} value={lang}>{lang}</option>
                                        ))
                                    ) : (
                                        <>
                                            <option value="English">English</option>
                                            <option value="Urdu">اردو</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Next Button */}
                        <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setSurveyStep('survey')}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: design?.color?.header || '#10b981',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 4px 6px -1px ${design?.color?.header || '#10b981'}40`
                                }}
                            >
                                ›
                            </button>
                        </div>

                        {/* Illustration with Background */}
                        <div style={{
                            marginTop: 'auto',
                            padding: '2rem 1rem 1rem',
                            position: 'relative',
                            background: design?.color?.light || '#68D87F',
                            borderTopLeftRadius: '30px',
                            borderTopRightRadius: '30px'
                        }}>
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
                        {design?.logo?.url && (
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
                                        src={design.logo.url}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Thank You Message */}
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: config.thankYou?.titleColor || '#1e293b',
                                margin: '0 0 0.5rem 0',
                                fontFamily: config.thankYou?.titleFont || 'Lato'
                            }}>
                                {config.thankYou?.title || 'We appreciate your feedback!'}
                            </h2>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.75rem 0 0 0', lineHeight: '1.5' }}>
                                {config.thankYou?.message || 'Thank you for completing the survey! Your feedback helps us improve.'}
                            </p>
                        </div>

                        {/* Visit Website Button */}
                        <button
                            onClick={() => window.open(config.thankYou?.redirectUrl || config.basicInfo?.website, '_blank')}
                            style={{
                                background: design?.color?.header || '#10b981',
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

                        {/* Footer Message - Removed duplicate */}

                        {/* Social Icons - Only show selected ones with URLs */}
                        {socialLinks && socialLinks.length > 0 && socialLinks.some(link => link.url && link.url.trim() !== '') && (
                            <div style={{
                                display: 'flex',
                                gap: '0.75rem',
                                marginBottom: '2rem',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                alignItems: 'center'
                            }}>
                                {socialLinks
                                    .filter(link => link.url && link.url.trim() !== '')
                                    .map((link) => {
                                        // Social media platform mapping
                                        const platformConfig = {
                                            website: { icon: Globe, color: '#6366f1', name: 'Website' },
                                            facebook: { icon: Facebook, color: '#1877f2', name: 'Facebook' },
                                            instagram: { icon: Instagram, color: '#E1306C', gradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', name: 'Instagram' },
                                            twitter: { icon: Twitter, color: '#000000', name: 'X' },
                                            linkedin: { icon: Linkedin, color: '#0077b5', name: 'LinkedIn' },
                                            youtube: { icon: Youtube, color: '#ff0000', name: 'YouTube' },
                                            snapchat: { icon: Ghost, color: '#fffc00', name: 'Snapchat', textColor: '#000' },
                                            tiktok: { icon: Music, color: '#000000', name: 'TikTok' },
                                            spotify: { icon: Music, color: '#1db954', name: 'Spotify' },
                                            behance: { icon: Dribbble, color: '#1769ff', name: 'Behance' },
                                        };

                                        const platform = platformConfig[link.platform];
                                        if (!platform) return null;

                                        const Icon = platform.icon;
                                        const url = link.url.startsWith('http') ? link.url : `https://${link.url}`;

                                        return (
                                            <div
                                                key={link.id}
                                                onClick={() => window.open(url, '_blank')}
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    borderRadius: '50%',
                                                    background: platform.gradient || platform.color,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: platform.textColor || '#fff',
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.2s',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'scale(1.1)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'scale(1)';
                                                }}
                                                title={platform.name}
                                            >
                                                <Icon size={22} color={platform.textColor || "#fff"} />
                                            </div>
                                        );
                                    })}
                            </div>
                        )}

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
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                {leadGenStep === 'form' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#fff' }}>
                        {/* Header Section */}
                        <div style={{
                            background: config?.basicInfo?.headerColor || design?.color?.header || '#2131AE',
                            borderBottomLeftRadius: '30px',
                            borderBottomRightRadius: '30px',
                            padding: '2rem 1.5rem 1.5rem',
                            position: 'relative'
                        }}>
                            {/* Logo and Business Name */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                {design?.logo?.url && (
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        background: '#fff'
                                    }}>
                                        <img
                                            src={design.logo.url}
                                            alt="Logo"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                                <h2 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    color: basicInfo?.companyNameColor || '#fff',
                                    margin: 0,
                                    fontFamily: basicInfo?.companyNameFont || 'Lato'
                                }}>
                                    {basicInfo?.companyName || businessInfo?.title}
                                </h2>
                            </div>

                            {/* Header Image */}
                            {design?.headerImage?.url && (
                                <div style={{
                                    width: '100%',
                                    height: '150px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    marginBottom: '1rem'
                                }}>
                                    <img
                                        src={design.headerImage.url}
                                        alt="Header"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            {/* Title and Description */}
                            <div style={{ color: '#fff' }}>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    margin: '0 0 0.5rem 0',
                                    color: basicInfo?.headlineColor || '#fff',
                                    fontFamily: basicInfo?.headlineFont || 'Lato'
                                }}>
                                    {basicInfo?.headline || businessInfo?.formTitle || 'Important Document'}
                                </h3>
                                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.95 }}>
                                    {basicInfo?.description || businessInfo?.formDescription || 'Download this document today.'}
                                </p>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div style={{ padding: '1.5rem' }}>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {/* Standard Form Fields - Only show checked ones */}
                                {form?.fullName && (
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
                                )}

                                {form?.contactNumber && (
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                                            Contact Number
                                        </label>
                                        <input
                                            type="tel"
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
                                )}

                                {form?.organizationName && (
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                                            Organization Name
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
                                )}

                                {form?.email && (
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
                                )}

                                {form?.jobTitle && (
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                                            Job Title
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
                                )}

                                {form?.website && (
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                                            Website
                                        </label>
                                        <input
                                            type="url"
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
                                )}

                                {/* Custom Fields */}
                                {customFields && customFields.length > 0 && customFields.map((field) => {
                                    const fieldTypeOptions = {
                                        text: { label: 'Text', type: 'text' },
                                        fullName: { label: 'Full Name', type: 'text' },
                                        contactNumber: { label: 'Contact Number', type: 'tel' },
                                        organizationName: { label: 'Organization Name', type: 'text' },
                                        email: { label: 'Email', type: 'email' },
                                        jobTitle: { label: 'Job Title', type: 'text' },
                                        website: { label: 'Website', type: 'url' }
                                    };
                                    const fieldConfig = fieldTypeOptions[field.type] || { label: 'Text', type: 'text' };
                                    const displayLabel = field.label || fieldConfig.label;

                                    return (
                                        <div key={field.id}>
                                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                                                {displayLabel}
                                            </label>
                                            <input
                                                type={fieldConfig.type}
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
                                    );
                                })}

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
                            <h2 style={{
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                                color: basicInfo?.companyNameColor || '#fff',
                                margin: '0 0 1rem 0',
                                textAlign: 'center',
                                fontFamily: basicInfo?.companyNameFont || 'Lato'
                            }}>
                                {basicInfo?.companyName || businessInfo?.title}
                            </h2>

                            {/* Header Image */}
                            {design?.headerImage?.url && (
                                <div style={{
                                    width: '100%',
                                    height: '140px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    marginBottom: '1rem'
                                }}>
                                    <img
                                        src={design.headerImage.url}
                                        alt="Header"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            {/* Title and Description */}
                            <div style={{ color: '#fff', textAlign: 'center' }}>
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    margin: '0 0 0.5rem 0',
                                    color: basicInfo?.headlineColor || '#fff',
                                    fontFamily: basicInfo?.headlineFont || 'Lato'
                                }}>
                                    {basicInfo?.headline || businessInfo?.formTitle || 'Important Document'}
                                </h3>
                                <p style={{ fontSize: '0.85rem', margin: 0, opacity: 0.95 }}>
                                    {basicInfo?.description || businessInfo?.formDescription || 'Download this document today.'}
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
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '1rem', color: '#1e293b', lineHeight: '1.6', margin: 0 }}>
                                {thankYou?.message || 'Thanks for submitting! You can now download your content, thanks again'}
                            </p>
                        </div>

                        {/* Download Button */}
                        {thankYou?.buttonText && thankYou?.url && (
                            <button
                                onClick={() => window.open(thankYou.url, '_blank')}
                                style={{
                                    width: '100%',
                                    background: headerColor,
                                    color: '#fff',
                                    border: 'none',
                                    padding: '0.875rem',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    marginTop: '0.5rem'
                                }}
                            >
                                {thankYou.buttonText}
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    }

    if (isRating) {
        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                {ratingStep === 'rating' && (
                    <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
                        {/* Header Section */}
                        <div style={{
                            background: config?.basicInfo?.headerColor || design?.color?.header || '#2131AE',
                            borderBottomLeftRadius: '30px',
                            borderBottomRightRadius: '30px',
                            padding: '2rem 1.5rem 1.5rem',
                            position: 'relative'
                        }}>
                            {/* Business Name and Logo */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: basicInfo?.nameColor || '#fff',
                                    margin: 0,
                                    fontFamily: basicInfo?.nameFont || 'Lato'
                                }}>
                                    {basicInfo?.name || businessInfo?.title}
                                </h2>
                                {design?.logo?.url && (
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
                                            src={design.logo.url}
                                            alt="Logo"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Header Image */}
                            {design?.headerImage?.url && (
                                <div style={{
                                    width: '100%',
                                    height: '180px',
                                    borderRadius: '12px',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={design.headerImage.url}
                                        alt="Header"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Question and Rating Section */}
                        <div style={{ padding: '2rem 1.5rem' }}>
                            {/* Question */}
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
                                    {rating?.question || businessInfo?.question}
                                </h3>
                            </div>

                            {/* Rating Buttons - Based on Selected Type */}
                            {rating?.type === 'thumbs' && (
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
                                    {/* Thumbs Up */}
                                    <div
                                        onClick={() => setSelectedRating('like')}
                                        style={{
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <ThumbsUp
                                            size={60}
                                            fill={selectedRating === 'like' ? secondaryColor : '#e2e8f0'}
                                            color={selectedRating === 'like' ? secondaryColor : '#cbd5e1'}
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    {/* Thumbs Down */}
                                    <div
                                        onClick={() => setSelectedRating('dislike')}
                                        style={{
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <ThumbsDown
                                            size={60}
                                            fill={selectedRating === 'dislike' ? secondaryColor : '#e2e8f0'}
                                            color={selectedRating === 'dislike' ? secondaryColor : '#cbd5e1'}
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                </div>
                            )}

                            {rating?.type === 'emoji' && (
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                                    {[Laugh, Smile, Meh, Frown, Frown].map((Icon, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedRating(index)}
                                            style={{
                                                width: '54px',
                                                height: '54px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                border: `2px solid ${selectedRating === index ? secondaryColor : '#e2e8f0'}`,
                                                borderRadius: '50%',
                                                transition: 'all 0.2s ease',
                                                transform: selectedRating === index ? 'scale(1.1)' : 'scale(1)'
                                            }}
                                        >
                                            <Icon
                                                size={32}
                                                color={selectedRating === index ? secondaryColor : '#cbd5e1'}
                                                strokeWidth={2}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {(!rating?.type || rating?.type === 'stars') && (
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '3rem' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <div
                                            key={star}
                                            onClick={() => setSelectedRating(star)}
                                            style={{
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                transform: selectedRating === star ? 'scale(1.2)' : 'scale(1)'
                                            }}
                                        >
                                            <Star
                                                size={50}
                                                fill={(selectedRating >= star) ? secondaryColor : '#e2e8f0'}
                                                color={(selectedRating >= star) ? secondaryColor : '#cbd5e1'}
                                                strokeWidth={1}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Comment Section - Show if allowComment is true */}
                            {rating?.allowComment && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <textarea
                                        placeholder="Add your comment..."
                                        rows={4}
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>
                            )}

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
                            {design?.logo?.url && (
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
                                        src={design.logo.url}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
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

                            {/* Social Icons - Grid Layout (3 rows, 4 columns) */}
                            {socialLinks && socialLinks.length > 0 && socialLinks.some(link => link.url && link.url.trim() !== '') && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '0.75rem',
                                    width: '100%',
                                    maxWidth: '280px',
                                    margin: '0 auto'
                                }}>
                                    {socialLinks
                                        .filter(link => link.url && link.url.trim() !== '')
                                        .map((link) => {
                                            // Social media platform mapping
                                            const platformConfig = {
                                                website: { icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', color: '#4B5563', name: 'Website' },
                                                facebook: { icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', color: '#1877F2', name: 'Facebook' },
                                                instagram: { icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', color: '#E4405F', name: 'Instagram' },
                                                twitter: { icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670151.png', color: '#000000', name: 'X' },
                                                linkedin: { icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', color: '#0A66C2', name: 'LinkedIn' },
                                                discord: { icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670157.png', color: '#5865F2', name: 'Discord' },
                                                twitch: { icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111668.png', color: '#9146FF', name: 'Twitch' },
                                                youtube: { icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', color: '#FF0000', name: 'YouTube' },
                                                whatsapp: { icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png', color: '#25D366', name: 'WhatsApp' },
                                                snapchat: { icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png', color: '#FFFC00', name: 'Snapchat', textColor: '#000' },
                                                tiktok: { icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', color: '#000000', name: 'TikTok' },
                                                tumblr: { icon: 'https://cdn-icons-png.flaticon.com/512/100/100611.png', color: '#35465C', name: 'Tumblr' },
                                                spotify: { icon: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', color: '#1DB954', name: 'Spotify' },
                                                telegram: { icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png', color: '#0088CC', name: 'Telegram' },
                                                behance: { icon: 'https://cdn-icons-png.flaticon.com/512/733/733541.png', color: '#1769FF', name: 'Behance' },
                                                pinterest: { icon: 'https://cdn-icons-png.flaticon.com/512/145/145808.png', color: '#BD081C', name: 'Pinterest' },
                                                reddit: { icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670154.png', color: '#FF4500', name: 'Reddit' },
                                                line: { id: 'line', name: 'Line', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111491.png', color: '#00B900' }
                                            };

                                            const platform = platformConfig[link.platform];
                                            if (!platform) return null;

                                            const Icon = platform.icon;
                                            const url = link.url.startsWith('http') ? link.url : `https://${link.url}`;

                                            return (
                                                <div
                                                    key={link.id}
                                                    onClick={() => window.open(url, '_blank')}
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                        background: platform.gradient || platform.color,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: platform.textColor || '#fff',
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.2s',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                        margin: '0 auto'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1.1)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                    }}
                                                    title={platform.name}
                                                >
                                                    {typeof platform.icon === 'string' ? (
                                                        <img src={platform.icon} alt={platform.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                                                    ) : (
                                                        <Icon size={24} color={platform.textColor || "#fff"} />
                                                    )}
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </div>

                        {/* Footer URL */}
                        {basicInfo?.website && (
                            <div style={{ padding: '1rem', textAlign: 'center', color: '#fff', fontSize: '0.9rem' }}>
                                {basicInfo.website}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    if (isSocial) {
        // Default values for social media preview
        const defaultBg = "https://img.freepik.com/free-vector/social-media-doodle-set-vector-illustration_53876-155819.jpg?size=626&ext=jpg";
        const defaultLogo = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop"; // Avatar placeholder
        const primaryColor = design?.color?.header || '#0B2D86'; // Deep Blue

        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                <div style={{ height: '100%', overflowY: 'auto', background: '#fff', display: 'flex', flexDirection: 'column' }}>

                    {/* Header Image Section */}
                    <div style={{
                        height: '220px',
                        position: 'relative',
                        backgroundImage: `url(${design?.backgroundImage?.url || defaultBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0 // Ensure it stays behind
                    }}>

                    </div>

                    {/* Overlapping Logo - Moved OUTSIDE the clipped container */}
                    {(design?.logo?.url || defaultLogo) && (
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: '#fff',
                            position: 'absolute',
                            top: '170px', // Header is 220px, Logo is 100px. Centered at line: 220 - 50 = 170px
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 50, // High z-index to sit on top of everything
                            padding: '5px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}>
                            <img
                                src={design?.logo?.url || defaultLogo}
                                alt="Logo"
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    {/* Curved Blue Section */}
                    <div style={{
                        flex: 1,
                        background: primaryColor,
                        position: 'relative',
                        padding: '4rem 1.5rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '-40px',
                        clipPath: 'ellipse(150% 100% at 50% 100%)', // Bottom curve
                        zIndex: 10 // Ensure content stays on top of header image
                    }}>
                        {/* White curve at top simulation */}
                        <div style={{
                            position: 'absolute',
                            top: '-50px', // Pull up
                            left: '0',
                            width: '100%',
                            height: '100px',
                            background: '#fff',
                            borderRadius: '0 0 50% 50%', // Convex curve downwards
                            zIndex: 1,
                            display: 'none' // Hidden for now as clipPath handles the shape better or simpler
                        }}></div>

                        {/* Text Content */}
                        <div style={{ textAlign: 'center', color: '#fff', marginTop: '1rem', zIndex: 2 }}>
                            <h3 style={{
                                margin: '0 0 0.5rem 0',
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                fontFamily: basicInfo?.headlineFont || 'Lato',
                                color: basicInfo?.headlineColor || '#ffffff'
                            }}>
                                {basicInfo?.headline || "Connect With Us On Social Media"}
                            </h3>
                            <p style={{
                                margin: 0,
                                fontSize: '0.9rem',
                                opacity: 0.9,
                                lineHeight: '1.4',
                                maxWidth: '280px'
                            }}>
                                {basicInfo?.aboutUs || "Follow us and get updates delivered to your favorite social media channel."}
                            </p>
                        </div>
                    </div>

                    {/* Social Buttons List */}
                    <div style={{ background: '#fff', padding: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>


                            {/* Dynamic Social Links */}
                            {(() => {
                                // Platform configuration consistent with SocialMediaConfig.jsx
                                // Platform configuration consistent with SocialMediaConfig.jsx
                                const platformConfig = [
                                    { id: 'website', urlKey: 'websiteUrl', textKey: 'websiteText', name: 'Website', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', color: '#4B5563' },
                                    { id: 'facebook', urlKey: 'facebookUrl', textKey: 'facebookText', name: 'Facebook', icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', color: '#1877F2' },
                                    { id: 'instagram', urlKey: 'instagramUrl', textKey: 'instagramText', name: 'Instagram', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', color: '#E4405F' },
                                    { id: 'twitter', urlKey: 'twitterUrl', textKey: 'twitterText', name: 'X', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670151.png', color: '#000000' },
                                    { id: 'linkedin', urlKey: 'linkedinUrl', textKey: 'linkedinText', name: 'LinkedIn', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', color: '#0A66C2' },
                                    { id: 'discord', urlKey: 'discordUrl', textKey: 'discordText', name: 'Discord', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670157.png', color: '#5865F2' },
                                    { id: 'twitch', urlKey: 'twitchUrl', textKey: 'twitchText', name: 'Twitch', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111668.png', color: '#9146FF' },
                                    { id: 'youtube', urlKey: 'youtubeUrl', textKey: 'youtubeText', name: 'YouTube', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', color: '#FF0000' },
                                    { id: 'whatsapp', urlKey: 'whatsappUrl', textKey: 'whatsappText', name: 'WhatsApp', icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png', color: '#25D366' },
                                    { id: 'snapchat', urlKey: 'snapchatUrl', textKey: 'snapchatText', name: 'Snapchat', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png', color: '#FFFC00' },
                                    { id: 'tiktok', urlKey: 'tiktokUrl', textKey: 'tiktokText', name: 'TikTok', icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', color: '#000000' },
                                    { id: 'tumblr', urlKey: 'tumblrUrl', textKey: 'tumblrText', name: 'Tumblr', icon: 'https://cdn-icons-png.flaticon.com/512/100/100611.png', color: '#35465C' },
                                    { id: 'spotify', urlKey: 'spotifyUrl', textKey: 'spotifyText', name: 'Spotify', icon: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', color: '#1DB954' },
                                    { id: 'telegram', urlKey: 'telegramUrl', textKey: 'telegramText', name: 'Telegram', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png', color: '#0088CC' },
                                    { id: 'behance', urlKey: 'behanceUrl', textKey: 'behanceText', name: 'Behance', icon: 'https://cdn-icons-png.flaticon.com/512/733/733541.png', color: '#1769FF' },
                                    { id: 'pinterest', urlKey: 'pinterestUrl', textKey: 'pinterestText', name: 'Pinterest', icon: 'https://cdn-icons-png.flaticon.com/512/145/145808.png', color: '#BD081C' },
                                    { id: 'reddit', urlKey: 'redditUrl', textKey: 'redditText', name: 'Reddit', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670154.png', color: '#FF4500' },
                                    { id: 'line', urlKey: 'lineUrl', textKey: 'lineText', name: 'Line', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111491.png', color: '#00B900' },
                                ];

                                // Filter active platforms (present in social config)
                                let activePlatforms = platformConfig.filter(p => social?.[p.urlKey] !== undefined);

                                // Default Fallback if no platforms configured (User request: show defaults like image)
                                if (activePlatforms.length === 0) {
                                    activePlatforms = [
                                        { id: 'default-visit', urlKey: 'websiteUrl', textKey: 'websiteText', name: 'Visit Us Online', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', color: '#6366f1', isDefault: true },
                                        { id: 'default-fb', urlKey: 'facebookUrl', textKey: 'facebookText', name: 'Facebook', icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', color: '#1877f2', isDefault: true },
                                        { id: 'default-yt', urlKey: 'youtubeUrl', textKey: 'youtubeText', name: 'Youtube', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', color: '#ff0000', isDefault: true }
                                    ];
                                }

                                return activePlatforms.map((platform) => {
                                    const Icon = platform.icon;
                                    // Use configured text or platform name; use configured URL or # for defaults
                                    const text = social?.[platform.textKey] || platform.name;
                                    const url = social?.[platform.urlKey];

                                    // Render Item
                                    return (
                                        <div
                                            key={platform.id}
                                            onClick={() => url && window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '1rem',
                                                borderBottom: '1px solid #f1f5f9',
                                                gap: '1rem',
                                                cursor: 'pointer',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: platform.color,
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: platform.color === '#fffc00' ? '#000' : '#fff', // Handle bright colors
                                                flexShrink: 0
                                            }}>
                                                {typeof Icon === 'string' ? (
                                                    <img
                                                        src={Icon}
                                                        alt={platform.name}
                                                        style={{
                                                            width: '24px',
                                                            height: '24px',
                                                            objectFit: 'contain',
                                                            filter: platform.id === 'snapchat' || platform.color === '#fffc00' ? 'none' : 'brightness(0) invert(1)'
                                                        }}
                                                    />
                                                ) : (
                                                    <Icon size={24} color={platform.color === '#fffc00' ? '#000' : '#fff'} />
                                                )}
                                            </div>
                                            <span style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '600' }}>{text}</span>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </div>

                {/* Floating Share Button */}
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    width: '50px',
                    height: '50px',
                    background: '#F59E0B', // Orange
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    zIndex: 10
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        );
    }

    if (isBusinessPage) {
        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

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
                        <h2 style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            margin: 0,
                            color: businessInfo?.companyNameColor || '#fff',
                            fontFamily: businessInfo?.companyNameFont || 'Work Sans'
                        }}>
                            {businessInfo?.companyName || "Royal's Cafe"}
                        </h2>
                        {design?.logo?.url && (
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
                                <img src={design.logo.url} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                        )}
                    </div>

                    {/* Hero Image */}
                    {design?.heroImage && (
                        <div style={{ width: '100%', height: '200px' }}>
                            <img src={design.heroImage} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}

                    {/* Tagline Section */}
                    <div style={{ background: headerColor, padding: '1.5rem', color: '#fff' }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            margin: '0 0 0.5rem 0',
                            color: businessInfo?.headlineColor || '#fff',
                            fontFamily: businessInfo?.headlineFont || 'Work Sans'
                        }}>
                            {businessInfo?.headline || 'Eat. Refresh. Go.'}
                        </h2>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.4', margin: '0 0 1.5rem 0', opacity: 0.9 }}>
                            {businessInfo?.description || 'We aim to provide fresh and healthy snacks people on the go.'}
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
                            {businessInfo?.button || 'Visit Us'}
                        </button>
                    </div>

                    {/* Weekly Schedule */}
                    <div style={{ padding: '1.5rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>OPENING HOURS</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                                const dayKey = day.toLowerCase();
                                const info = openingHours?.[dayKey] || {
                                    enabled: dayKey !== 'sunday',
                                    open: '08:00 AM',
                                    close: '08:00 AM'
                                };
                                return (
                                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                                        <span style={{ fontWeight: '500', color: '#64748b' }}>{day}</span>
                                        <span style={{
                                            color: info.enabled !== false ? '#64748b' : '#ef4444',
                                            fontWeight: '400'
                                        }}>
                                            {info.enabled !== false
                                                ? `${info.open || '08:00 AM'} - ${info.close || '08:00 AM'}`
                                                : 'closed'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '4px', background: '#fbbf24', margin: '0 1.5rem' }}></div>

                    {/* Facilities */}
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: headerColor, margin: '0 0 1.5rem 0' }}>FACILITIES</h3>
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                            {(() => {
                                const facilityMap = {
                                    wifi: { icon: Wifi, label: 'wifi' },
                                    baby: { icon: Baby, label: 'baby care' },
                                    wheelchair: { icon: Accessibility, label: 'wheelchair access' },
                                    restaurant: { icon: Utensils, label: 'restaurant' },
                                    smoking: { icon: Plane, label: 'smoking area' },
                                    pets: { icon: PawPrint, label: 'pet friendly' },
                                    parking: { icon: null, text: 'P', label: 'parking' },
                                    hotel: { icon: Bed, label: 'hotel' },
                                    car: { icon: Car, label: 'car' },
                                    coffee: { icon: Coffee, label: 'coffee' },
                                    bar: { icon: Wine, label: 'bar' }
                                };

                                const selectedFacilities = Array.isArray(facilities) && facilities.length > 0
                                    ? facilities
                                    : ['wifi', 'parking', 'restaurant']; // Default facilities

                                return selectedFacilities.map(id => {
                                    const config = facilityMap[id];
                                    if (!config) return null;
                                    return (
                                        <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#64748b', minWidth: '60px' }}>
                                            {config.icon ? (
                                                <config.icon size={24} color="#3b82f6" />
                                            ) : (
                                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', height: '24px', display: 'flex', alignItems: 'center' }}>
                                                    {config.text}
                                                </div>
                                            )}
                                            <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>{config.label}</span>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '4px', background: '#fbbf24', margin: '0 1.5rem' }}></div>

                    {/* Contact Info */}
                    <div style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {(contact?.location || !contact) && (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <MapPin size={24} color={headerColor} />
                                        <span style={{ fontSize: '1rem', color: '#1e293b' }}>
                                            {contact?.location || '123 Restaurant Street, City'}
                                        </span>
                                    </div>
                                    <div style={{ width: '100%', height: '1px', background: '#e2e8f0' }}></div>
                                </>
                            )}

                            {(contact?.phone || !contact) && (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <Phone size={24} color={headerColor} />
                                        <span style={{ fontSize: '1rem', color: '#1e293b' }}>
                                            {contact?.phone || '+1 234 567 890'}
                                        </span>
                                    </div>
                                    <div style={{ width: '100%', height: '1px', background: '#e2e8f0' }}></div>
                                </>
                            )}

                            {(contact?.email || !contact) && (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <Mail size={24} color={headerColor} />
                                        <span style={{ fontSize: '1rem', color: '#1e293b' }}>
                                            {contact?.email || 'hello@restaurant.com'}
                                        </span>
                                    </div>
                                    <div style={{ width: '100%', height: '1px', background: '#e2e8f0' }}></div>
                                </>
                            )}

                            {(contact?.website || businessInfo?.website || !contact) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Globe size={24} color={headerColor} />
                                    <span style={{ fontSize: '1rem', color: '#1e293b' }}>
                                        {contact?.website || businessInfo?.website || 'https://www.abcboutique.henerrival.com'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Social Media Footer */}
                    <div style={{
                        background: '#0B2D86',
                        borderRadius: '50% 50% 0 0 / 20px 20px 0 0',
                        padding: '3rem 1.5rem 2rem',
                        marginTop: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        {(() => {
                            const platforms = [
                                { id: 'website', icon: Globe, color: '#6366f1' },
                                { id: 'facebook', icon: Facebook, color: '#1877f2' },
                                { id: 'instagram', icon: Instagram, color: '#E1306C' },
                                { id: 'twitter', icon: Twitter, color: '#000000' },
                                { id: 'linkedin', icon: Linkedin, color: '#0077b5' },
                                { id: 'discord', icon: Gamepad2, color: '#5865f2' },
                                { id: 'twitch', icon: Twitch, color: '#9146ff' },
                                { id: 'youtube', icon: Youtube, color: '#ff0000' },
                                { id: 'whatsapp', icon: MessageCircle, color: '#25d366' },
                                { id: 'snapchat', icon: Ghost, color: '#fffc00', textColor: '#000' },
                                { id: 'tiktok', icon: Music, color: '#000000' },
                                { id: 'pinterest', icon: Github, color: '#e60023' },
                                { id: 'dribbble', icon: Dribbble, color: '#ea4c89' },
                                { id: 'telegram', icon: MessageSquare, color: '#0088cc' },
                                { id: 'reddit', icon: Github, color: '#ff4500' },
                                { id: 'spotify', icon: Music, color: '#1DB954' },
                            ];

                            const socialLinks = (social && Object.values(social).some(v => v && v.trim() !== ''))
                                ? social
                                : {
                                    facebook: 'https://facebook.com',
                                    instagram: 'https://instagram.com',
                                    twitter: 'https://twitter.com',
                                    whatsapp: 'https://whatsapp.com'
                                };

                            return platforms.map(p => {
                                if (socialLinks[p.id]) {
                                    return (
                                        <a key={p.id} href={socialLinks[p.id]} target="_blank" rel="noopener noreferrer" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '40px',
                                            height: '40px',
                                            background: p.color,
                                            borderRadius: '8px',
                                            color: p.textColor || '#fff',
                                            textDecoration: 'none'
                                        }}>
                                            <p.icon size={20} />
                                        </a>
                                    );
                                }
                                return null;
                            });
                        })()}
                    </div>

                    {/* Bottom Curve */}
                    <div style={{ height: '60px', background: headerColor, borderTopLeftRadius: '50% 100%', borderTopRightRadius: '50% 100%', marginTop: 'auto', display: 'none' }}></div>
                </div >
            </div >
        );
    }

    if (isBusinessCard) {
        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

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

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {(exchange?.fullName !== false) && (
                                    <div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Full Name"
                                            value={exchangeFormData.fullName || ''}
                                            onChange={handleExchangeChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 0',
                                                border: 'none',
                                                borderBottom: exchangeErrors.fullName ? '1px solid #ef4444' : '1px solid #cbd5e1',
                                                fontSize: '1rem',
                                                outline: 'none'
                                            }}
                                        />
                                        {exchangeErrors.fullName && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{exchangeErrors.fullName}</span>}
                                    </div>
                                )}
                                {(exchange?.contactNumber !== false) && (
                                    <div>
                                        <input
                                            type="tel"
                                            name="contactNumber"
                                            placeholder="Contact Number"
                                            value={exchangeFormData.contactNumber || ''}
                                            onChange={handleExchangeChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 0',
                                                border: 'none',
                                                borderBottom: exchangeErrors.contactNumber ? '1px solid #ef4444' : '1px solid #cbd5e1',
                                                fontSize: '1rem',
                                                outline: 'none'
                                            }}
                                        />
                                        {exchangeErrors.contactNumber && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{exchangeErrors.contactNumber}</span>}
                                    </div>
                                )}
                                {(exchange?.organization !== false) && (
                                    <div>
                                        <input
                                            type="text"
                                            name="organization"
                                            placeholder="Organization"
                                            value={exchangeFormData.organization || ''}
                                            onChange={handleExchangeChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 0',
                                                border: 'none',
                                                borderBottom: exchangeErrors.organization ? '1px solid #ef4444' : '1px solid #cbd5e1',
                                                fontSize: '1rem',
                                                outline: 'none'
                                            }}
                                        />
                                        {exchangeErrors.organization && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{exchangeErrors.organization}</span>}
                                    </div>
                                )}
                                {(exchange?.email !== false) && (
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={exchangeFormData.email || ''}
                                            onChange={handleExchangeChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 0',
                                                border: 'none',
                                                borderBottom: exchangeErrors.email ? '1px solid #ef4444' : '1px solid #cbd5e1',
                                                fontSize: '1rem',
                                                outline: 'none'
                                            }}
                                        />
                                        {exchangeErrors.email && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{exchangeErrors.email}</span>}
                                    </div>
                                )}
                                {(exchange?.jobTitle) && (
                                    <div>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            placeholder="Job Title"
                                            value={exchangeFormData.jobTitle || ''}
                                            onChange={handleExchangeChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 0',
                                                border: 'none',
                                                borderBottom: exchangeErrors.jobTitle ? '1px solid #ef4444' : '1px solid #cbd5e1',
                                                fontSize: '1rem',
                                                outline: 'none'
                                            }}
                                        />
                                        {exchangeErrors.jobTitle && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{exchangeErrors.jobTitle}</span>}
                                    </div>
                                )}
                                {(exchange?.website) && (
                                    <div>
                                        <input
                                            type="text"
                                            name="website"
                                            placeholder="Website"
                                            value={exchangeFormData.website || ''}
                                            onChange={handleExchangeChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 0',
                                                border: 'none',
                                                borderBottom: exchangeErrors.website ? '1px solid #ef4444' : '1px solid #cbd5e1',
                                                fontSize: '1rem',
                                                outline: 'none'
                                            }}
                                        />
                                        {exchangeErrors.website && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{exchangeErrors.website}</span>}
                                    </div>
                                )}

                                {/* Custom Fields */}
                                {exchange?.customFields && exchange.customFields.length > 0 && exchange.customFields.map((field) => {
                                    if (!field.label) return null;

                                    return (
                                        <div key={field.id} style={{ marginTop: '1rem' }}>
                                            {field.type === 'text' && (
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder={field.label}
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem 0',
                                                            border: 'none',
                                                            borderBottom: '1px solid #cbd5e1',
                                                            fontSize: '1rem',
                                                            outline: 'none'
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {field.type === 'options' && field.options && field.options.length > 0 && (
                                                <div>
                                                    <label style={{
                                                        display: 'block',
                                                        fontSize: '0.85rem',
                                                        color: '#64748b',
                                                        marginBottom: '0.5rem',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {field.label}
                                                    </label>
                                                    <select
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem',
                                                            border: '1px solid #cbd5e1',
                                                            borderRadius: '4px',
                                                            fontSize: '1rem',
                                                            outline: 'none',
                                                            background: '#fff',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <option value="">Select an option</option>
                                                        {field.options.filter(opt => opt.trim()).map((option, idx) => (
                                                            <option key={idx} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}

                                            {field.type === 'radio' && field.options && field.options.length > 0 && (
                                                <div>
                                                    <label style={{
                                                        display: 'block',
                                                        fontSize: '0.85rem',
                                                        color: '#64748b',
                                                        marginBottom: '0.75rem',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {field.label}
                                                    </label>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                        {field.options.filter(opt => opt.trim()).map((option, idx) => (
                                                            <label
                                                                key={idx}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '0.75rem',
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.95rem'
                                                                }}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name={`custom_field_${field.id}`}
                                                                    value={option}
                                                                    style={{
                                                                        width: '18px',
                                                                        height: '18px',
                                                                        cursor: 'pointer',
                                                                        accentColor: headerColor
                                                                    }}
                                                                />
                                                                <span style={{ color: '#000' }}>{option}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={handleExchangeSubmit}
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
                            </div>
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
                            marginBottom: design?.profile?.url ? '60px' : '2rem'
                        }}>
                            {/* Profile Image */}
                            {design?.profile?.url && (
                                <div style={{
                                    width: '110px',
                                    height: '110px',
                                    borderRadius: design?.profile?.shape === 'rectangular' ? '12px' : '50%',
                                    background: '#fff',
                                    padding: '3px',
                                    position: 'absolute',
                                    bottom: '-55px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <img
                                        src={design.profile.url}
                                        alt="Profile"
                                        style={{ width: '100%', height: '100%', borderRadius: design?.profile?.shape === 'rectangular' ? '12px' : '50%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Name and Title */}
                        <div style={{ textAlign: 'center', padding: '0 1rem', marginBottom: '1.5rem' }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: personalInfo?.nameColor || '#1e293b',
                                margin: '0 0 0.5rem 0',
                                textTransform: 'uppercase',
                                fontFamily: personalInfo?.nameFont || 'Lato'
                            }}>
                                {personalInfo?.name}
                            </h2>
                            <p style={{
                                fontSize: '0.95rem',
                                color: personalInfo?.titleColor || '#64748b',
                                margin: 0,
                                fontFamily: personalInfo?.titleFont || 'Lato'
                            }}>
                                {personalInfo?.title} <span style={{ color: headerColor }}>at</span> <span style={{ color: personalInfo?.companyColor || '#64748b', fontFamily: personalInfo?.companyFont || 'Lato' }}>{personalInfo?.company}</span>
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
                                {contact?.phone && contact.phone.trim() && (
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
                                )}

                                {/* Email */}
                                {contact?.email && contact.email.trim() && (
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
                                )}

                                {/* Website */}
                                {contact?.website && contact.website.trim() && (
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
                                )}

                                {/* Address */}
                                {contact?.address && contact.address.trim() && (
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
                                )}
                            </div>
                        </div>

                        <div style={{ padding: '0 1.5rem 2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>Social Networks</h3>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {[
                                    { key: 'website', icon: Globe, color: '#4f46e5' },
                                    { key: 'whatsapp', icon: MessageCircle, color: '#22c55e' },
                                    { key: 'facebook', icon: Facebook, color: '#3b82f6' },
                                    { key: 'instagram', icon: Instagram, color: '#ec4899' },
                                    { key: 'twitter', icon: Twitter, color: '#0ea5e9' },
                                    { key: 'linkedin', icon: Linkedin, color: '#0ea5e9' },
                                    { key: 'tiktok', icon: Video, color: '#000000' },
                                    { key: 'discord', icon: Gamepad2, color: '#6366f1' },
                                    { key: 'youtube', icon: Youtube, color: '#ef4444' },
                                    { key: 'twitch', icon: Twitch, color: '#a855f7' },
                                    { key: 'line', icon: MessageSquare, color: '#22c55e' },
                                    { key: 'snapchat', icon: Ghost, color: '#eab308' },
                                    { key: 'tumblr', icon: PenTool, color: '#0f172a' },
                                    { key: 'spotify', icon: Music, color: '#22c55e' },
                                    { key: 'dribbble', icon: Dribbble, color: '#ea4c89' }
                                ].map(({ key, icon: Icon, color }) => social?.[key] && (
                                    <div key={key} style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        background: color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        flexShrink: 0
                                    }}>
                                        <Icon size={20} />
                                    </div>
                                ))}
                            </div>
                        </div>



                    </div>
                )
                }
            </div >
        );
    }

    if (isCoupon) {
        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: showCouponModal ? primaryColor : '#f3f4f6',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

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
                            {design?.logo?.url && (
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
                                    <img src={design.logo.url} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                </div>
                            )}
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, color: businessInfo?.titleColor || '#fff', fontFamily: businessInfo?.titleFont || 'Lato' }}>{businessInfo?.title}</h2>
                        </div>

                        {/* Hero Image */}
                        {coupon?.image && (
                            <div style={{ width: '100%', height: '200px', background: '#fff' }}>
                                <img src={coupon.image} alt="Sale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}

                        {/* Title Section */}
                        <div style={{ padding: '1.5rem 1rem', textAlign: 'center' }}>
                            <h1 style={{ color: coupon?.titleColor || '#fff', fontSize: '2rem', fontWeight: 'bold', margin: 0, fontFamily: coupon?.titleFont || 'Lato' }}>{coupon?.title}</h1>
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
                                    {coupon?.buttonTitle || 'Redeem Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Redeemed View (Modal) */
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        {/* Header */}
                        <div style={{ padding: '3rem 1rem 1rem', textAlign: 'center' }}>
                            <h2 style={{ color: businessInfo?.titleColor || '#fff', fontSize: '1.5rem', fontWeight: 'bold', margin: 0, fontFamily: businessInfo?.titleFont || 'Lato' }}>{businessInfo?.title}</h2>
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

                                <button
                                    onClick={() => coupon?.callToAction && window.open(coupon.callToAction, '_blank')}
                                    style={{
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
                                    {coupon?.buttonTitle || 'Redeem Now'}
                                </button>
                                {coupon?.terms && (
                                    <div style={{
                                        marginTop: '1.5rem',
                                        fontSize: '0.75rem',
                                        color: '#64748b',
                                        textAlign: 'center',
                                        fontStyle: 'italic',
                                        padding: '0 1rem'
                                    }}>
                                        {coupon.terms}
                                    </div>
                                )}
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
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                {/* Main Categories Page */}
                {reviewStep === 'main' && (
                    <div style={{ height: '100%', overflowY: 'auto' }}>
                        {/* Header */}
                        <div style={{
                            background: config?.basicInfo?.headerColor || design?.color?.header || '#2131AE',
                            borderBottomLeftRadius: '30px',
                            borderBottomRightRadius: '30px',
                            padding: '2rem 1.5rem 1.5rem',
                            position: 'relative'
                        }}>
                            {/* Logo and Business Name */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h2 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: 'bold',
                                    color: config?.basicInfo?.organizationNameColor || '#fff',
                                    margin: 0,
                                    textTransform: 'uppercase',
                                    fontFamily: config?.basicInfo?.organizationNameFont || 'sans-serif'
                                }}>
                                    {config?.basicInfo?.organizationName || businessInfo?.title || 'LUXURY HOTELS'}
                                </h2>
                                {design?.logo?.url && (
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
                                            src={design.logo.url}
                                            alt="Logo"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Header Image */}
                            {design?.headerImage?.url && (
                                <div style={{
                                    width: '100%',
                                    height: '140px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    marginBottom: '1rem'
                                }}>
                                    <img
                                        src={design.headerImage.url}
                                        alt="Header"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div style={{ padding: '1.5rem' }}>
                            {/* Title */}
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: config?.basicInfo?.titleColor || '#1e293b',
                                margin: '0 0 0.5rem 0',
                                fontFamily: config?.basicInfo?.titleFont || 'sans-serif',
                                textAlign: 'center'
                            }}>
                                {config?.basicInfo?.title || 'Give us your feedback'}
                            </h3>
                            {config?.basicInfo?.description && (
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#64748b',
                                    margin: '0 0 1.5rem 0',
                                    lineHeight: '1.5',
                                    fontFamily: config?.basicInfo?.titleFont || 'sans-serif',
                                    textAlign: 'center'
                                }}>
                                    {config.basicInfo.description}
                                </p>
                            )}

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
                    <div style={{ height: '100%', overflowY: 'auto' }}>
                        {/* Header */}
                        <div style={{
                            background: config?.basicInfo?.headerColor || design?.color?.header || '#2131AE',
                            borderBottomLeftRadius: '50% 30%',
                            padding: '2rem 1.5rem 3rem',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h2 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: 'bold',
                                    color: config?.basicInfo?.organizationNameColor || '#fff',
                                    margin: 0,
                                    textTransform: 'uppercase',
                                    fontFamily: config?.basicInfo?.organizationNameFont || 'sans-serif'
                                }}>
                                    {config?.basicInfo?.organizationName || businessInfo?.title || 'LUXURY HOTELS'}
                                </h2>
                                {design?.logo?.url && (
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
                                            src={design.logo.url}
                                            alt="Logo"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
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
                    <div style={{ height: '100%', overflowY: 'auto' }}>
                        {/* Header */}
                        <div style={{
                            background: config?.basicInfo?.headerColor || design?.color?.header || '#2131AE',
                            borderBottomLeftRadius: '50% 30%',
                            padding: '2rem 1.5rem 3rem',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h2 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: 'bold',
                                    color: config?.basicInfo?.organizationNameColor || '#fff',
                                    margin: 0,
                                    textTransform: 'uppercase',
                                    fontFamily: config?.basicInfo?.organizationNameFont || 'sans-serif'
                                }}>
                                    {config?.basicInfo?.organizationName || businessInfo?.title || 'LUXURY HOTELS'}
                                </h2>
                                {design?.logo?.url && (
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
                                            src={design.logo.url}
                                            alt="Logo"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
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
                    <div style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                        {/* Header */}
                        <div style={{
                            background: config?.basicInfo?.headerColor || design?.color?.header || '#2131AE',
                            padding: '2rem 1.5rem 1rem',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h2 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: config?.basicInfo?.organizationNameColor || '#fff',
                                    margin: 0,
                                    fontFamily: config?.basicInfo?.organizationNameFont || 'sans-serif',
                                    textTransform: 'uppercase'
                                }}>
                                    {config?.basicInfo?.organizationName || businessInfo?.title || 'LUXURY HOTELS'}
                                </h2>
                                {design?.logo?.url && (
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
                                            src={design.logo.url}
                                            alt="Logo"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
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
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {(() => {
                                    const activePlatforms = Object.entries(social || {}).filter(([key, val]) => val && typeof val === 'string' && val.trim() !== '');

                                    if (activePlatforms.length === 0) {
                                        // Default fallback icons
                                        return [
                                            { id: 'website', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', color: '#4B5563', name: 'Website' },
                                            { id: 'facebook', icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', color: '#1877F2', name: 'Facebook' },
                                            { id: 'instagram', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', color: '#E4405F', name: 'Instagram' }
                                        ].map(platform => (
                                            <div key={platform.id} style={{
                                                width: '45px',
                                                height: '45px',
                                                borderRadius: '8px',
                                                background: platform.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                opacity: 0.8
                                            }}>
                                                <img
                                                    src={platform.icon}
                                                    alt={platform.name}
                                                    style={{ width: '24px', height: '24px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                                                />
                                            </div>
                                        ));
                                    }

                                    return activePlatforms.map(([key, value]) => {
                                        const platform = socialIconsMap.find(p => p.id === key) || socialIconsMap.find(p => p.id === 'globe');
                                        if (!platform) return null;

                                        return (
                                            <div
                                                key={key}
                                                onClick={() => window.open(value.startsWith('http') ? value : `https://${value}`, '_blank')}
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    borderRadius: '8px',
                                                    background: platform.color,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#fff',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <img
                                                    src={platform.icon}
                                                    alt={platform.name}
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        objectFit: 'contain',
                                                        filter: platform.id === 'snapchat' || platform.id === 'line' ? 'none' : 'brightness(0) invert(1)'
                                                    }}
                                                />
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        </div>

                        {/* Footer URL */}
                        <div style={{
                            background: headerColor,
                            padding: '1rem 1.5rem 2rem',
                            textAlign: 'center'
                        }}>
                            <a href={config?.basicInfo?.website || social?.website || "#"} target="_blank" rel="noopener noreferrer" style={{
                                color: '#fff',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                textDecoration: 'none'
                            }}>
                                {config?.basicInfo?.website || social?.website || 'Visit Us Online'}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        );
    }



    const isPdf = type === 'pdf';

    // ... existing code ...

    if (isPdf) { // Changed directly using the type check variable locally or just type since I'm editing the block
        // Using a CORS-friendly PDF URL
        const pdfUrl = uploadPdf?.pdfUrl || 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

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
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
                    {/* Header Section */}
                    <div style={{
                        background: design?.color?.header || '#0B2D86',
                        borderBottomLeftRadius: '30px',
                        borderBottomRightRadius: '30px',
                        padding: '2rem 1.5rem 1.5rem',
                        position: 'relative'
                    }}>
                        {/* Logo and Company Name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            {design?.logo?.url && (
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: design?.color?.light || '#FFA800',
                                    border: `3px solid ${design?.color?.light || '#FFA800'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={design.logo.url}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                            <h2 style={{
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                color: basicInfo?.companyNameColor || '#fff',
                                margin: 0,
                                fontFamily: basicInfo?.companyNameFont || 'inherit'
                            }}>
                                {basicInfo?.companyName || businessInfo?.title || 'Software Company'}
                            </h2>
                        </div>

                        {/* Title */}
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: basicInfo?.pdfTitleColor || '#FFA800',
                            margin: '0 0 0.75rem 0',
                            lineHeight: '1.2',
                            fontFamily: basicInfo?.pdfTitleFont || 'inherit'
                        }}>
                            {basicInfo?.pdfTitle || 'See Our Company Profile'}
                        </h1>

                        {/* Description */}
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#fff',
                            margin: 0,
                            lineHeight: '1.5',
                            opacity: 0.95,
                            whiteSpace: 'pre-wrap'
                        }}>
                            {basicInfo?.description || 'We aim to provide fresh and healthy snacks people on the go.'}
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
                                background: design?.color?.light || '#FFA800',
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
                            {uploadPdf?.buttonTitle || 'Download Now'}
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
        const headerBg = design?.color?.header || '#4db8a8';
        const footerBg = design?.color?.light || '#3730a3';
        const isLogoRemoved = design?.logo?.url === null || design?.logo?.url === '';
        const logoSource = isLogoRemoved ? null : (design?.logo?.url || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop');

        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
                    {/* Header Section with Curved Bottom */}
                    <div style={{
                        background: headerBg,
                        borderBottomLeftRadius: '50% 30px',
                        borderBottomRightRadius: '50% 30px',
                        padding: '2.5rem 1.5rem 2rem',
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        {/* Logo/Icon */}
                        {logoSource && (
                            <div style={{
                                width: '80px',
                                height: '80px',
                                margin: '0 auto 1rem',
                                background: '#fff',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={logoSource}
                                    alt="Logo"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        )}

                        {/* Title */}
                        <h1 style={{
                            fontSize: '1.75rem',
                            fontWeight: 'bold',
                            color: basicInfo?.headlineColor || '#1e293b',
                            margin: '0 0 0.75rem 0'
                        }}>
                            {basicInfo?.headline || businessInfo?.title || 'Techoid'}
                        </h1>

                        {/* Description */}
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#1e293b',
                            margin: 0,
                            lineHeight: '1.5',
                            opacity: 0.9,
                            whiteSpace: 'pre-wrap'
                        }}>
                            {basicInfo?.aboutUs || 'Follow us and get updates delivered to your favorite social media channel.'}
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
                        {(() => {
                            // Now relying on config.links to have defaults from MultipleLinksConfig
                            const linksToRender = (config.links && config.links.length > 0)
                                ? config.links
                                : [
                                    { id: '1', title: 'Visit Us Online', url: '#' },
                                    { id: '2', title: 'Talk to Us', url: '#' },
                                    { id: '3', title: 'Instagram', url: '#' },
                                    { id: '4', title: 'Youtube', url: '#' }
                                ];

                            const validLinks = linksToRender.filter(link => link.title && link.title.trim() !== '');

                            return validLinks.map((link, index) => (
                                <button key={link.id || index} style={{
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
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'all 0.2s'
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Globe size={20} />
                                        {link.title}
                                    </span>
                                    <ChevronRight size={20} />
                                </button>
                            ));
                        })()}
                    </div>

                    {/* Social Media Footer */}
                    {(socialLinks && socialLinks.length > 0) ? (
                        <div style={{
                            background: footerBg,
                            borderTopLeftRadius: '30px',
                            borderTopRightRadius: '30px',
                            padding: '1.5rem',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                            marginTop: 'auto',
                            flexWrap: 'wrap'
                        }}>
                            {socialLinks.map((link) => {
                                const platformId = link.platform;
                                // Mapping logic to get icon and color
                                // You might need to import these icons or reuse the mapping logic if it's not passed down.
                                // Since icons are Lucide icons imported at the top, we need to map them here or pass the icon components.
                                // Re-creating the mapping map inside render or reusing a helper is fine.

                                const socialPlatformsMap = {
                                    'facebook': { icon: Facebook, color: '#1877F2' },
                                    'instagram': { icon: Instagram, color: '#E4405F' },
                                    'twitter': { icon: Twitter, color: '#000000' },
                                    'linkedin': { icon: Linkedin, color: '#0A66C2' },
                                    'discord': { icon: Globe, color: '#5865F2' },
                                    'youtube': { icon: Youtube, color: '#FF0000' },
                                    'whatsapp': { icon: Globe, color: '#25D366' },
                                    'snapchat': { icon: Globe, color: '#FFFC00' },
                                    'tiktok': { icon: Globe, color: '#000000' },
                                    'spotify': { icon: Globe, color: '#1DB954' },
                                    'website': { icon: Globe, color: '#2B1E99' }
                                };

                                const platform = socialPlatformsMap[platformId] || { icon: Globe, color: '#3730a3' };
                                const Icon = platform.icon;

                                return (
                                    <div key={link.id} style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        background: platform.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}>
                                        <Icon size={24} color="#fff" />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        // Default Fallback if no social links
                        <div style={{
                            background: footerBg,
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
                    )}

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
            </div >
        );
    }

    if (type === 'password-protected') {
        const primaryColor = design?.color?.header || '#0a3d3d';
        const headerImageUrl = design?.headerImage?.url || 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop';

        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                <div style={{
                    height: '100%',
                    overflowY: 'auto',
                    background: primaryColor,
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
                            src={headerImageUrl}
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
                        {(config.infoFields && config.infoFields.length > 0 ? config.infoFields : [
                            { id: '1', name: 'Name', value: 'Hellen Grey' },
                            { id: '2', name: 'Address', value: '4059 Carling Avenue Ottawa Ontario' },
                            { id: '3', name: 'Contact', value: '703-701-9964' }
                        ]).map((field) => (
                            <div key={field.id} style={{
                                background: 'rgba(255, 255, 255, 0.08)',
                                borderRadius: '8px',
                                padding: '1rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: '#fff',
                                    marginBottom: '0.25rem',
                                    opacity: 0.8,
                                    textTransform: 'uppercase'
                                }}>
                                    {field.name}:
                                </div>
                                <div style={{
                                    fontSize: '1rem',
                                    color: '#fff',
                                    fontWeight: '600',
                                    lineHeight: '1.4',
                                    wordBreak: 'break-word'
                                }}>
                                    {field.value}
                                </div>
                            </div>
                        ))}

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
                </div >
            </div >
        );
    }

    if (type === 'event') {
        const primaryColor = design?.color?.header || '#0d9488';
        const secondaryColor = design?.color?.light || '#0d9488';
        const isHeaderImageRemoved = design?.headerImage?.url === null || design?.headerImage?.url === '';
        const headerImageSource = isHeaderImageRemoved ? null : (design?.headerImage?.url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=150&fit=crop');

        // Basic Info
        const companyName = config.businessInfo?.companyName || 'Sterling & Co.';
        const companyNameColor = config.businessInfo?.companyNameColor || '#FFC700';
        const companyNameFont = config.businessInfo?.companyNameFont || 'Lato';

        const headline = config.businessInfo?.headline || '4th Annual Company Meetup';
        const headlineColor = config.businessInfo?.headlineColor || '#FFFFFF';
        const headlineFont = config.businessInfo?.headlineFont || 'Lato';

        const description = config.businessInfo?.description || 'We aim to provide fresh and healthy snacks people on the go.';

        const isLogoRemoved = design?.logo?.url === null || design?.logo?.url === '';
        const logoSource = isLogoRemoved ? null : (design?.logo?.url || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop');

        // Helper to format date
        const formatEventDate = (dateLocal) => {
            if (!dateLocal) return '';
            const date = new Date(dateLocal);
            // Verify if date is valid
            if (isNaN(date.getTime())) return dateLocal;

            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const weekday = days[date.getDay()];
            const day = date.getDate().toString().padStart(2, '0');
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            return `${weekday}, ${day} ${month} ${year}`;
        };

        // Facility Icons Map
        const facilityIcons = [
            { id: 'wifi', icon: Wifi, label: 'Wifi' },
            { id: 'plug', icon: Plug, label: 'Power' },
            { id: 'wheelchair', icon: Accessibility, label: 'Accessibility' },
            { id: 'restroom', icon: Users, label: 'Restroom' },
            { id: 'baby', icon: Baby, label: 'Baby Station' },
            { id: 'pet', icon: PawPrint, label: 'Pet Friendly' },
            { id: 'parking', icon: ParkingCircle, label: 'Parking' },
            { id: 'bus', icon: Bus, label: 'Bus' },
            { id: 'car', icon: Car, label: 'Car' },
            { id: 'bed', icon: Bed, label: 'Accommodation' },
            { id: 'coffee', icon: Coffee, label: 'Coffee' },
            { id: 'drink', icon: Martini, label: 'Bar' },
            { id: 'food', icon: Utensils, label: 'Food' }
        ];

        // Social Platform Icons Map
        const socialPlatforms = [
            { id: 'facebook', icon: Facebook, color: '#1877F2' },
            { id: 'instagram', icon: Instagram, color: '#E4405F' },
            { id: 'twitter', icon: Twitter, color: '#1DA1F2' },
            { id: 'linkedin', icon: Linkedin, color: '#0A66C2' },
            { id: 'youtube', icon: Youtube, color: '#FF0000' },
            { id: 'twitch', icon: Twitch, color: '#9146FF' },
            { id: 'whatsapp', icon: MessageCircle, color: '#25D366' },
            { id: 'spotify', icon: Music, color: '#1DB954' },
            { id: 'telegram', icon: Send, color: '#0088cc' },
            { id: 'website', icon: Globe, color: '#4b5563' }
        ];

        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                <div style={{ height: '100%', overflowY: 'auto', background: '#fff' }}>
                    {/* Branding Header */}
                    <div style={{
                        background: primaryColor,
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomLeftRadius: '24px',
                    }}>
                        <div style={{
                            color: companyNameColor,
                            fontFamily: companyNameFont,
                            fontWeight: 'bold',
                            fontSize: '1.1rem'
                        }}>
                            {companyName}
                        </div>
                        {logoSource && (
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: '#fff',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img src={logoSource} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                            </div>
                        )}
                    </div>

                    {/* Event Image */}
                    {headerImageSource && (
                        <div style={{
                            height: '140px',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={headerImageSource}
                                alt="Event"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    )}

                    {/* Event Header - Teal */}
                    <div style={{
                        background: primaryColor,
                        padding: '1.5rem',
                        textAlign: 'center',
                        color: '#fff'
                    }}>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            margin: '0 0 0.75rem 0',
                            lineHeight: '1.3',
                            color: headlineColor,
                            fontFamily: headlineFont
                        }}>
                            {headline}
                        </h1>
                        <p style={{
                            fontSize: '0.875rem',
                            margin: 0,
                            lineHeight: '1.5',
                            opacity: 0.95
                        }}>
                            {description}
                        </p>
                    </div>

                    {/* Event Details */}
                    <div style={{ padding: '1.5rem' }}>
                        {(config.eventSchedule?.days || [
                            { id: 1, date: '2023-03-03', begins: '04:00 AM', ends: '08:00 AM' },
                            { id: 2, date: '2023-03-04', begins: '04:00 AM', ends: '08:00 AM' }
                        ]).map((day, index) => (
                            <div key={day.id} style={{ marginBottom: '1.5rem' }}>
                                <div style={{
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    color: '#0d9488',
                                    marginBottom: '0.5rem',
                                    letterSpacing: '0.5px',
                                    textTransform: 'uppercase'
                                }}>
                                    DAY {index + 1}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <Calendar size={20} color="#0d9488" />
                                    <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '600' }}>
                                        {formatEventDate(day.date)}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Clock size={20} color="#0d9488" />
                                    <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '600' }}>
                                        {day.begins} - {day.ends}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Location */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <MapPin size={20} color="#0d9488" style={{ marginTop: '2px' }} />
                                <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '600', lineHeight: '1.5' }}>
                                    {config.venue?.location || '1000 Marketplace Ave. NY, 10001, United States'}
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
                                justifyContent: 'center',
                                gap: '1rem',
                                flexWrap: 'wrap'
                            }}>
                                {(config.facilities || ['wifi', 'plug', 'wheelchair']).map((facilityId) => {
                                    const facility = facilityIcons.find(f => f.id === facilityId);
                                    if (!facility) return null;
                                    const Icon = facility.icon;
                                    return (
                                        <div key={facilityId} style={{ textAlign: 'center' }}>
                                            <Icon size={32} color="#3b82f6" />
                                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>{facility.label}</div>
                                        </div>
                                    );
                                })}
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
                                        {config.contactInfo?.personName || 'Hellen Grey'}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#0d9488', fontWeight: '600' }}>
                                        {config.contactInfo?.designation || 'Event Manager'}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {(config.contactInfo?.channels || [
                                    { id: 1, type: 'phone', value: '15555551234' },
                                    { id: 2, type: 'email', value: 'Hellen@gmail.com' }
                                ]).map((channel) => {
                                    const getIcon = (type) => {
                                        switch (type) {
                                            case 'phone': return <Phone size={18} color="#0d9488" />;
                                            case 'email': return <Mail size={18} color="#0d9488" />;
                                            case 'website': return <Globe size={18} color="#0d9488" />;
                                            default: return <Globe size={18} color="#0d9488" />;
                                        }
                                    };

                                    return (
                                        <div key={channel.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            {getIcon(channel.type)}
                                            <span style={{ fontSize: '0.95rem', color: '#1e293b' }}>{channel.value}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Footer - Teal */}
                    <div style={{
                        background: secondaryColor,
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
                            gap: '1rem',
                            flexWrap: 'wrap'
                        }}>
                            {(config.socialLinks || [
                                { id: 1, platform: 'website', url: '' },
                                { id: 2, platform: 'instagram', url: '' },
                                { id: 3, platform: 'facebook', url: '' }
                            ]).map((link) => {
                                const platform = socialPlatforms.find(p => p.id === link.platform);
                                if (!platform) return null;
                                const Icon = platform.icon;
                                return (
                                    <div key={link.id} style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: platform.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon size={24} color="#fff" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'product-page') {
        const primaryColor = design?.color?.header || '#FFB03E';
        const secondaryColor = design?.color?.light || '#031D36';

        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

                <div style={{ height: '100%', overflowY: 'auto', background: primaryColor }}>
                    {/* Header */}
                    <div style={{
                        background: primaryColor,
                        padding: '2rem 1.5rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        {design?.logo?.url && (
                            <div style={{
                                background: '#000',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '8px',
                                overflow: 'hidden'
                            }}>
                                <img src={design.logo.url} alt="Logo" style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
                            </div>
                        )}
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: basicInfo?.companyTextColor || '#000',
                            margin: 0,
                            fontFamily: basicInfo?.companyFont || 'sans-serif'
                        }}>
                            {basicInfo?.companyName || 'Dairyland'}
                        </h1>
                    </div>

                    {/* Image Carousel */}
                    <div style={{
                        position: 'relative',
                        height: '200px',
                        background: primaryColor,
                        padding: '0 1.5rem 1.5rem'
                    }}>
                        <div style={{
                            position: 'relative',
                            height: '100%',
                            overflow: 'hidden',
                            borderRadius: '12px'
                        }}>
                            {(basicInfo?.productImages && basicInfo.productImages.length > 0 ? basicInfo.productImages.map(img => img.url) : [
                                'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
                                'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'
                            ]).map((img, index) => (
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
                            {(basicInfo?.productImages && basicInfo.productImages.length > 0 ? basicInfo.productImages : [
                                { url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' },
                                { url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' }
                            ]).map((_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: index === productImageIndex ? '24px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        background: index === productImageIndex ? primaryColor : 'rgba(255,255,255,0.5)',
                                        transition: 'all 0.3s'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div style={{
                        background: primaryColor,
                        padding: '0 1.5rem 1.5rem'
                    }}>
                        <div style={{
                            background: primaryColor,
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
                                    color: basicInfo?.titleTextColor || '#000',
                                    margin: '0 0 0.25rem 0',
                                    fontFamily: basicInfo?.titleFont || 'sans-serif'
                                }}>
                                    {basicInfo?.productTitle || 'Chocolate Flavored Milk'}
                                </h2>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: '#000',
                                    margin: 0,
                                    opacity: 0.8
                                }}>
                                    {basicInfo?.headline || '325 ml'}
                                </p>
                            </div>
                            <div style={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                color: '#000'
                            }}>
                                {basicInfo?.currency || 'Rs'} {basicInfo?.price || '95'}
                            </div>
                        </div>
                    </div>

                    {/* Accordions */}
                    <div style={{ padding: '0 1.5rem 1rem' }}>
                        {(content?.items || [
                            { id: '1', title: 'Description', text: 'The Dark, Smooth, Creaminess Of Chocolate Romances The Wholesome Goodness Of Real Cow\'S Milk.' },
                            { id: '2', title: 'Ingredient', text: '• Reduced Fat Milk\n• Milk Solids\nCocoa Powder\n• Sugar\n• Emulsifier: Vegetable Oil Origin (E471)\n• Stabilizer (E470) & Chocolate Flavor' }
                        ]).map((item) => (
                            <div key={item.id} style={{ marginBottom: '0.75rem' }}>
                                <button
                                    onClick={() => toggleAccordion(item.id)}
                                    style={{
                                        width: '100%',
                                        background: secondaryColor,
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
                                    {item.title}
                                    <span style={{ transform: openAccordion === item.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                                </button>
                                {openAccordion === item.id && (
                                    <div style={{
                                        background: '#fcd34d',
                                        padding: '1rem',
                                        borderBottomLeftRadius: '8px',
                                        borderBottomRightRadius: '8px',
                                        fontSize: '0.875rem',
                                        color: '#000',
                                        lineHeight: '1.6',
                                        whiteSpace: 'pre-wrap'
                                    }}>
                                        {item.text}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Certificates */}
                        <div style={{ marginBottom: '1rem' }}>
                            <button
                                style={{
                                    width: '100%',
                                    background: secondaryColor,
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
                            background: secondaryColor,
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
                            {video?.title || 'Video'}
                        </h3>
                        <div style={{
                            borderRadius: '12px',
                            overflow: 'hidden',
                            background: '#000'
                        }}>
                            {video?.url ? (
                                video.url.startsWith('blob:') ? (
                                    <video
                                        width="100%"
                                        height="180"
                                        controls
                                        style={{ display: 'block' }}
                                    >
                                        <source src={video.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <iframe
                                        width="100%"
                                        height="180"
                                        src={video.url.includes('youtube.com') || video.url.includes('youtu.be')
                                            ? video.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
                                            : video.url}
                                        title={video.title || 'Product Video'}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ display: 'block' }}
                                    />
                                )
                            ) : (
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
                            )}
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div style={{ padding: '0 1.5rem 1rem' }}>
                        <button style={{
                            width: '100%',
                            background: secondaryColor,
                            border: 'none',
                            borderRadius: '8px',
                            padding: '1rem',
                            color: feedback?.textColor || '#fff',
                            fontWeight: '600',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            fontFamily: feedback?.font || 'sans-serif'
                        }}>
                            <MessageCircle size={20} />
                            {feedback?.title || 'Add Your Feedback'}
                        </button>
                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
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
                            padding: '1.5rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
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
                                {contact?.phone && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '4px', background: '#031D36', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Phone size={18} color="#fff" />
                                        </div>
                                        <span style={{ fontSize: '0.95rem', color: '#000' }}>{contact.phone}</span>
                                    </div>
                                )}
                                {contact?.email && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '4px', background: '#031D36', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Mail size={18} color="#fff" />
                                        </div>
                                        <span style={{ fontSize: '0.95rem', color: '#000' }}>{contact.email}</span>
                                    </div>
                                )}
                                {contact?.website && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '4px', background: '#031D36', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Globe size={18} color="#fff" />
                                        </div>
                                        <span style={{ fontSize: '0.95rem', color: '#000' }}>{contact.website}</span>
                                    </div>
                                )}
                            </div>

                            {/* Social Media */}
                            {contact?.socials && contact.socials.length > 0 && (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    marginTop: '1.5rem',
                                    flexWrap: 'wrap'
                                }}>
                                    {contact.socials.map((social, idx) => {
                                        const iconObj = socialIconsMap.find(i => i.id === social.platform);
                                        if (!iconObj) return null;
                                        return (
                                            <a
                                                key={idx}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '50%',
                                                    background: '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                                }}
                                            >
                                                {typeof iconObj.icon === 'string' ? (
                                                    <img
                                                        src={iconObj.icon}
                                                        alt={iconObj.name}
                                                        style={{
                                                            width: '24px',
                                                            height: '24px',
                                                            objectFit: 'contain',
                                                            // Since the background is white (#fff), we don't invert the colored icons from Flaticon
                                                            // unless it's a specific requirement.
                                                        }}
                                                    />
                                                ) : (
                                                    React.cloneElement(iconObj.icon, { color: iconObj.color, size: 24 })
                                                )}
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* See Product Rating Button */}
                    <div style={{ padding: '0 1.5rem 1.5rem' }}>
                        <button style={{
                            width: '100%',
                            background: 'secondaryColor',
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
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

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
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#000',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

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
                        src={video?.url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        );
    }

    if (type === 'image') {


        const nextImage = () => {
            if (displayImages.length === 0) return;
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        };

        const prevImage = () => {
            if (displayImages.length === 0) return;
            setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
        };

        return (
            <div style={{
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

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
                        {displayImages.length > 0 ? (
                            displayImages.map((img, index) => (
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
                            ))
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                No images uploaded
                            </div>
                        )}
                    </div>

                    {/* Left Arrow */}
                    {displayImages.length > 1 && (
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
                    )}

                    {/* Right Arrow */}
                    {displayImages.length > 1 && (
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
                    )}
                </div>

                {/* Bottom White Space */}
                <div style={{ height: '80px', background: '#f8fafc' }}></div>

                {/* Image Modal */}
                {showImageModal && displayImages.length > 0 && (
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
                            src={displayImages[currentImageIndex]}
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
                width: isLiveView ? '100%' : '320px',
                maxWidth: isLiveView ? '480px' : 'none',
                height: isLiveView ? '100vh' : '640px',
                background: '#fff',
                borderRadius: isLiveView ? '0' : '40px',
                border: isLiveView ? 'none' : '12px solid #1e293b',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: isLiveView ? '0 auto' : '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Notch */}
                {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

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
                        {design?.logo?.url && (
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: '#fff',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem'
                            }}>
                                <img src={design.logo.url} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            </div>
                        )}
                        <div style={{ marginTop: '10px' }}>
                            <h2 style={{
                                margin: '0',
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                color: personalInfo?.nameColor || businessInfo?.titleColor || '#fff',
                                fontFamily: businessInfo?.titleFont || 'Lato'
                            }}>
                                {personalInfo?.name || businessInfo?.title}
                            </h2>
                            <p style={{
                                margin: '0.25rem 0 0 0',
                                fontSize: '0.9rem',
                                opacity: 0.8,
                                fontFamily: businessInfo?.subtitleFont || 'Lato'
                            }}>
                                <span style={{ color: businessInfo?.subtitleColor || '#fff' }}>
                                    {businessInfo?.subtitle || 'Technician name'}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: design?.logo?.url ? '80px' : '2rem', textAlign: 'center', padding: '0 1.5rem' }}>
                        <h3 style={{
                            margin: '0 0 0.5rem 0',
                            fontSize: '1.25rem',
                            fontWeight: '800',
                            color: businessInfo?.ctaColor || '#1e293b',
                            fontFamily: businessInfo?.ctaFont || 'Lato'
                        }}>DOWNLOAD NOW</h3>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
                            {businessInfo?.description}
                        </p>

                        {/* Store Buttons */}
                        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {appLinks?.buttonType === 'circular' ? (
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                                    {appLinks?.google && (
                                        <a
                                            href={appLinks.google}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                                        >
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
                                        </a>
                                    )}
                                    {appLinks?.apple && (
                                        <a
                                            href={appLinks.apple}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                                        >
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
                                        </a>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {appLinks?.google && (
                                        <a
                                            href={appLinks.google}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none' }}
                                        >
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
                                        </a>
                                    )}
                                    {appLinks?.apple && (
                                        <a
                                            href={appLinks.apple}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none' }}
                                        >
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
                                        </a>
                                    )}
                                </>
                            )}
                        </div>

                        {/* App Status Media (Image/Video) */}
                        {config.appStatus?.fileUrl && (
                            <div style={{ marginTop: '2rem', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                {config.appStatus.type === 'video' ? (
                                    <video
                                        controls
                                        src={config.appStatus.fileUrl}
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                ) : (
                                    <img
                                        src={config.appStatus.fileUrl}
                                        alt="App Screenshot"
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                )}
                                {config.appStatus.launchDate && (
                                    <div style={{
                                        padding: '0.75rem',
                                        background: '#f1f5f9',
                                        fontSize: '0.85rem',
                                        color: '#64748b',
                                        textAlign: 'center',
                                        fontWeight: '500'
                                    }}>
                                        Launching: {config.appStatus.launchDate}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Social Networks */}
                        {social && Object.entries(social).some(([key, val]) => val && typeof val === 'string' && val.trim() !== '') && (
                            <div style={{ marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>Social Networks</h3>
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', maxHeight: '200px', overflowY: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'thin' }}>
                                    {[
                                        { key: 'facebook', bg: '#1877F2', icon: <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>f</span> },
                                        { key: 'instagram', bg: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', icon: <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>📷</span> },
                                        { key: 'twitter', bg: '#000', icon: <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>𝕏</span> },
                                        { key: 'linkedin', bg: '#0A66C2', icon: <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>in</span> },
                                        { key: 'discord', bg: '#5865F2', icon: <span style={{ color: '#fff', fontSize: '16px' }}>💬</span> },
                                        { key: 'twitch', bg: '#9146FF', icon: <span style={{ color: '#fff', fontSize: '16px' }}>📺</span> },
                                        { key: 'line', bg: '#00B900', icon: <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>💬</span> },
                                        { key: 'youtube', bg: '#FF0000', icon: <span style={{ color: '#fff', fontSize: '16px' }}>▶</span> },
                                        { key: 'whatsapp', bg: '#25D366', icon: <Phone size={18} color="#fff" /> },
                                        { key: 'snapchat', bg: '#FFFC00', icon: <span style={{ fontSize: '18px' }}>👻</span> },
                                        { key: 'tiktok', bg: '#000', icon: <span style={{ color: '#fff', fontSize: '18px' }}>♪</span> },
                                        { key: 'tumblr', bg: '#35465C', icon: <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>t</span> },
                                        { key: 'spotify', bg: '#1DB954', icon: <span style={{ color: '#fff', fontSize: '16px' }}>🎵</span> },
                                        { key: 'dribbble', bg: '#EA4C89', icon: <span style={{ color: '#fff', fontSize: '16px' }}>🏀</span> },
                                        { key: 'pinterest', bg: '#E60023', icon: <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>P</span> },
                                        { key: 'telegram', bg: '#0088cc', icon: <span style={{ color: '#fff', fontSize: '16px' }}>✈️</span> },
                                        { key: 'behance', bg: '#1769FF', icon: <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>Be</span> },
                                        { key: 'reddit', bg: '#FF4500', icon: <span style={{ color: '#fff', fontSize: '16px' }}>👽</span> },
                                        { key: 'website', bg: '#6366f1', icon: <Globe size={18} color="#fff" /> },
                                    ].map(platform => {
                                        const url = social[platform.key];
                                        if (!url || typeof url !== 'string' || url.trim() === '') return null;

                                        // Handle special case for whatsapp where input might be number only, but link usually requires protocol or just number for API
                                        // For now assume user enters what they want.

                                        // Fix link protocol if missing
                                        let href = url.trim();
                                        if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                                            // Don't auto-add https for everything, but for social links usually safe. 
                                            // Keeping it as is if user wants just text, but usually these are links.
                                            // For preview visual, we just need the item.
                                        }

                                        return (
                                            <a
                                                key={platform.key}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    background: platform.bg,
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textDecoration: 'none',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                    flexShrink: 0
                                                }}
                                            >
                                                {platform.icon}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

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
            width: isLiveView ? '100%' : '320px',
            maxWidth: isLiveView ? '480px' : 'none',
            height: isLiveView ? '100vh' : '640px',
            background: '#fff',
            borderRadius: isLiveView ? '0' : '40px',
            border: isLiveView ? 'none' : '12px solid #1e293b',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: isLiveView ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            margin: isLiveView ? '0 auto' : '0 auto'
        }}>
            {/* Notch */}
            {!isLiveView && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '24px', background: '#1e293b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>}

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
                        {(design?.logo?.url || typeof design?.logo === 'string') && (
                            <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                background: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={design?.logo?.url || design?.logo}
                                    alt="Logo"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </div>

                    {(() => {
                        // Priority: heroImage (from config) -> backgroundImage (legacy) -> businessInfo -> Default
                        // explicitly check for empty string or null (user removed image)

                        const isRemoved = (design?.heroImage === '' || design?.heroImage === null) || (design?.backgroundImage === '' || design?.backgroundImage === null);
                        const imageSource = isRemoved ? null : (design?.heroImage || design?.backgroundImage || businessInfo?.coverImage || businessInfo?.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop');

                        return (
                            <>
                                {imageSource && (
                                    <div style={{
                                        marginTop: '0.9rem',
                                        borderRadius: '14px',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.18)'
                                    }}>
                                        <img
                                            src={imageSource}
                                            alt={businessInfo?.title || 'Cafe'}
                                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}

                                <div style={{ marginTop: imageSource ? '1rem' : '0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.01em' }}>
                                        {businessInfo?.headline || 'Eat.Refresh.Go'}
                                    </h2>
                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                        {businessInfo?.description || 'We aim to provide fresh and healthy snacks people on the go.'}
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
                            </>
                        );
                    })()}
                </div>

                {/* Menu Section */}
                {activeCategories && activeCategories.length > 0 && (
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
                            paddingBottom: '0.5rem',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap'
                        }}>
                            {activeCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedMenuTab(category.id)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        fontSize: '0.95rem',
                                        fontWeight: selectedMenuTab === category.id ? '800' : '600',
                                        color: selectedMenuTab === category.id ? (headerColor || '#7f1d1d') : '#8b95a5',
                                        cursor: 'pointer',
                                        padding: '0.4rem 0',
                                        borderBottom: selectedMenuTab === category.id ? `3px solid ${headerColor || '#7f1d1d'}` : 'none',
                                        marginBottom: selectedMenuTab === category.id ? '-2px' : '0',
                                        transition: 'all 0.2s ease',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0
                                    }}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {/* Menu Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {activeCategories.find(c => c.id === selectedMenuTab)?.products?.map((product) => (
                                <div key={product.id} style={{
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
                                            {product.name}
                                        </h4>
                                        <p style={{
                                            fontSize: '0.8rem',
                                            color: '#64748b',
                                            margin: '0 0 0.5rem 0',
                                            lineHeight: '1.3'
                                        }}>
                                            {product.description}
                                        </p>
                                        <p style={{
                                            fontSize: '1rem',
                                            fontWeight: '700',
                                            color: headerColor || '#7f1d1d',
                                            margin: 0
                                        }}>
                                            {product.price} {businessInfo?.currency || '$'}
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
                                        {product.image && (
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                                position: 'relative'
                                            }}>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'opacity 0.3s ease-in-out'
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>

                )}

                {/* Timings Section */}
                <div style={{
                    background: '#fff',
                    padding: '1rem',
                    marginTop: '1.5rem',
                }}>
                    <h3 style={{
                        fontSize: '0.8rem',
                        fontWeight: '800',
                        color: headerColor || '#7f1d1d',
                        margin: '0 0 1rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        TIMINGS
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {(() => {
                            const availableTimings = businessInfo?.timings?.filter(t => t.isOpen);
                            // Use default if no timings (or empty array)
                            const displayTimings = (availableTimings && availableTimings.length > 0) ? availableTimings : [
                                { day: 'Monday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
                                { day: 'Saturday', isOpen: true, start: '08:00 AM', end: '08:00 AM' }
                            ];

                            // If we are using defaults, we want to simulate Monday-Saturday
                            const isDefault = (!availableTimings || availableTimings.length === 0);

                            let dayRange = '';
                            let timeString = '';

                            if (isDefault) {
                                dayRange = 'MONDAY - SATURDAY';
                                timeString = '08:00 AM - 08:00 AM';
                            } else {
                                const firstDay = displayTimings[0];
                                const lastDay = displayTimings[displayTimings.length - 1];
                                timeString = firstDay.start && firstDay.end ? `${firstDay.start} - ${firstDay.end}` : '';
                                dayRange = displayTimings.length === 1 ? firstDay.day.toUpperCase() : `${firstDay.day.toUpperCase()} - ${lastDay.day.toUpperCase()}`;
                            }

                            return (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                        <Calendar size={20} color={headerColor || '#7f1d1d'} />
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.9rem', color: '#1e293b', fontWeight: '700' }}>
                                                {dayRange}
                                            </span>
                                        </div>
                                    </div>
                                    {timeString && (
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                            <Clock size={20} color={headerColor || '#7f1d1d'} />
                                            <div>
                                                <span style={{ display: 'block', fontSize: '0.9rem', color: '#1e293b', fontWeight: '600' }}>
                                                    {timeString} (GMT +5)
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            </div>


            {/* Social Media */}
            <div style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    {social?.instagram && <Instagram size={20} color={primaryColor} />}
                    {social?.facebook && <Facebook size={20} color={primaryColor} />}
                    {social?.twitter && <Twitter size={20} color={primaryColor} />}
                    {social?.website && <Globe size={20} color={primaryColor} />}
                </div>
            </div>

            {/* Website Footer */}
            <div style={{
                padding: '3rem 1rem 2rem 1rem',
                textAlign: 'center',
                background: headerColor || '#7f1d1d',
                borderRadius: '50% 50% 0 0',
                marginTop: '2rem',
                marginBottom: '-2rem',
                position: 'relative',
                zIndex: 1
            }}>
                <a
                    href={businessInfo?.website || 'https://www.bobscafe.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontSize: '0.9rem',
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: '500',
                        wordBreak: 'break-all',
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '50px'
                    }}
                >
                    {businessInfo?.website || 'https://www.bobscafe.com'}
                </a>
            </div>

        </div >

    );
};

export default MobilePreview;

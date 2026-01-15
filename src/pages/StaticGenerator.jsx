import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { 
    Globe, Type, Mail, MapPin, Wifi, Phone, MessageSquare, Plus, ChevronDown, 
    ChevronUp, Check, Download, Upload, X, Eye, Loader2, Settings, ArrowLeft,
    Share2, Layout, Image as ImageIcon, Palette, MousePointer2
} from 'lucide-react';
import QRRenderer from '../components/QRRenderer';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const qrTabs = [
    { id: 'website', icon: <Globe size={20} />, label: 'Website' },
    { id: 'text', icon: <Type size={20} />, label: 'Text' },
    { id: 'email', icon: <Mail size={20} />, label: 'Email' },
    { id: 'map', icon: <MapPin size={20} />, label: 'Google Map' },
    { id: 'wifi', icon: <Wifi size={20} />, label: 'WIFI', isIncomplete: true },
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

const moreMenuOptions = [
    { id: 'reddit', icon: 'https://img.icons8.com/color/48/reddit.png', label: 'Reddit', placeholder: 'https://www.reddit.com/user/username' },
    { id: 'tiktok', icon: 'https://img.icons8.com/color/48/tiktok.png', label: 'TikTok', placeholder: 'https://www.tiktok.com/@username' },
    { id: 'snapchat', icon: 'https://img.icons8.com/color/48/snapchat-circled.png', label: 'Snapchat', placeholder: 'https://www.snapchat.com/add/username' },
    { id: 'telegram', icon: 'https://img.icons8.com/color/48/telegram-app.png', label: 'Telegram', placeholder: 'https://t.me/username' },
    { id: 'facebook', icon: 'https://img.icons8.com/color/48/facebook-new.png', label: 'Facebook', placeholder: 'https://www.facebook.com/username' },
    { id: 'instagram', icon: 'https://img.icons8.com/fluency/48/instagram-new.png', label: 'Instagram', placeholder: 'https://www.instagram.com/username' },
    { id: 'x', icon: 'https://img.icons8.com/ios-filled/48/000000/twitterx.png', label: 'X (Twitter)', placeholder: 'https://twitter.com/username' },
    { id: 'youtube', icon: 'https://img.icons8.com/color/48/youtube-play.png', label: 'Youtube', placeholder: 'https://www.youtube.com/@username' },
    { id: 'skype', icon: 'https://img.icons8.com/color/48/skype.png', label: 'Skype', placeholder: 'skype:username?chat' },
    { id: 'bitcoin', icon: 'https://img.icons8.com/color/48/bitcoin.png', label: 'Bitcoin', placeholder: 'bitcoin:address' },
    { id: 'zoom', icon: 'https://img.icons8.com/color/48/zoom.png', label: 'Zoom', placeholder: 'https://zoom.us/j/meetingId' },
    { id: 'whatsapp', icon: 'https://img.icons8.com/color/48/whatsapp.png', label: 'Whatsapp', placeholder: 'https://wa.me/1234567890' },
];

const Accordion = ({ title, icon: Icon, isOpen, setIsOpen, children }) => (
    <motion.div 
        style={{ 
            background: '#1e293b', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            border: '1px solid #334155',
            marginBottom: '1rem'
        }}
        initial={false}
    >
        <div 
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
                padding: '1.25rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                cursor: 'pointer',
                background: isOpen ? 'rgba(255, 255, 255, 0.03)' : 'transparent'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255, 163, 5, 0.1)', color: '#ffa305' }}>
                    <Icon size={20} />
                </div>
                <span style={{ fontWeight: '600', color: '#f8fafc' }}>{title}</span>
            </div>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown color="#94a3b8" />
            </motion.div>
        </div>
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <div style={{ padding: '1.25rem', borderTop: '1px solid #334155' }}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

const StaticGenerator = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editingQr = location.state?.editingQr;
    const isEditing = !!editingQr;
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
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [selectedMoreOption, setSelectedMoreOption] = useState(null);
    const [viewMode, setViewMode] = useState('generator');

    // Design states
    const [qrDesign, setQrDesign] = useState({
        dots: { style: 'square', color: '#000000' },
        cornersSquare: { style: 'square', color: '#000000' },
        cornersDot: { style: 'dot', color: '#000000' },
        background: { color: '#ffffff' },
        image: { url: null },
        imageOptions: { hideBackgroundDots: false, imageSize: 0.2 }
    });
    const [scannability, setScannability] = useState({
        score: 100,
        text: 'EXCELLENT',
        color: '#166534',
        bgColor: '#dcfce7'
    });
    const [isSaving, setIsSaving] = useState(false);

    // Email states
    const [emailRecipient, setEmailRecipient] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');

    // Phone states
    const [phoneNumber, setPhoneNumber] = useState('');

    // SMS states
    const [smsMessage, setSmsMessage] = useState('');

    // Bitcoin states
    const [bitcoinAddress, setBitcoinAddress] = useState('');
    const [bitcoinMessage, setBitcoinMessage] = useState('');

    // WhatsApp states
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [whatsappMessage, setWhatsappMessage] = useState('');

    // WiFi states
    const [wifiSSID, setWifiSSID] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [wifiType, setWifiType] = useState('WPA');
    const [wifiHidden, setWifiHidden] = useState(false);

    // Window size tracking for responsiveness
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
    const [mobileTab, setMobileTab] = useState('config'); // 'config' or 'preview'

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setIsMobile(window.innerWidth < 1100);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Populate state if editing
    useEffect(() => {
        if (editingQr) {
            setQrName(editingQr.name || '');
            setActiveTab(editingQr.type || 'website');
            setLink(editingQr.data || '');
            if (editingQr.design) {
                setQrDesign(prev => ({
                    ...prev,
                    ...editingQr.design,
                    dots: { ...prev.dots, ...(editingQr.design.dots || {}) },
                    cornersSquare: { ...prev.cornersSquare, ...(editingQr.design.cornersSquare || {}) },
                    cornersDot: { ...prev.cornersDot, ...(editingQr.design.cornersDot || {}) },
                    image: { ...prev.image, ...(editingQr.design.image || {}) },
                    imageOptions: { ...prev.imageOptions, ...(editingQr.design.imageOptions || {}) }
                }));
            }

            // Specific parsing for complex fields
            const data = editingQr.data || '';
            if (editingQr.type === 'email' && data.startsWith('mailto:')) {
                const url = new URL(data);
                setEmailRecipient(url.pathname);
                setEmailSubject(url.searchParams.get('subject') || '');
                setEmailBody(url.searchParams.get('body') || '');
            } else if (editingQr.type === 'phone' && data.startsWith('tel:')) {
                setPhoneNumber(data.replace('tel:', ''));
            } else if (editingQr.type === 'sms' && data.startsWith('smsto:')) {
                const parts = data.split(':');
                if (parts.length >= 3) {
                    setPhoneNumber(parts[1]);
                    setSmsMessage(parts.slice(2).join(':'));
                } else if (parts.length === 2) {
                    setPhoneNumber(parts[1]);
                }
            } else if (editingQr.type === 'wifi' && data.startsWith('WIFI:')) {
                const ssidMatch = data.match(/S:([^;]+);/);
                const passMatch = data.match(/P:([^;]+);/);
                const typeMatch = data.match(/T:([^;]+);/);
                const hiddenMatch = data.match(/H:([^;]+);/);
                if (ssidMatch) setWifiSSID(ssidMatch[1]);
                if (passMatch) setWifiPassword(passMatch[1]);
                if (typeMatch) setWifiType(typeMatch[1]);
                if (hiddenMatch) setWifiHidden(hiddenMatch[1] === 'true');
            } else if (editingQr.type === 'more') {
                if (data.startsWith('bitcoin:')) {
                    const url = new URL(data);
                    setBitcoinAddress(url.pathname);
                    setBitcoinMessage(url.searchParams.get('message') || '');
                    const option = moreMenuOptions.find(opt => opt.id === 'bitcoin');
                    setSelectedMoreOption(option);
                } else if (data.startsWith('https://wa.me/')) {
                    const url = new URL(data);
                    setWhatsappNumber(url.pathname.replace('/', ''));
                    setWhatsappMessage(url.searchParams.get('text') || '');
                    const option = moreMenuOptions.find(opt => opt.id === 'whatsapp');
                    setSelectedMoreOption(option);
                } else {
                    const option = moreMenuOptions.find(opt => {
                        if (opt.placeholder === data) return true;
                        try {
                            const optUrl = new URL(opt.placeholder);
                            const dataUrl = new URL(data);
                            return optUrl.hostname === dataUrl.hostname;
                        } catch (e) {
                            return false;
                        }
                    });
                    if (option) {
                        setSelectedMoreOption(option);
                    }
                }
            }
        }
    }, [editingQr]);

    useEffect(() => {
        if (activeTab === 'email') {
            const mailto = `mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            setLink(mailto);
        } else if (activeTab === 'phone') {
            setLink(`tel:${phoneNumber}`);
        } else if (activeTab === 'sms') {
            setLink(`smsto:${phoneNumber}:${smsMessage}`);
        } else if (activeTab === 'wifi') {
            setLink(`WIFI:S:${wifiSSID};T:${wifiType};P:${wifiPassword};H:${wifiHidden};;`);
        } else if (activeTab === 'more' && selectedMoreOption?.id === 'bitcoin') {
            setLink(`bitcoin:${bitcoinAddress}?message=${encodeURIComponent(bitcoinMessage)}`);
        } else if (activeTab === 'more' && selectedMoreOption?.id === 'whatsapp') {
            const cleanedNumber = whatsappNumber.replace(/\D/g, '');
            setLink(`https://wa.me/${cleanedNumber}?text=${encodeURIComponent(whatsappMessage)}`);
        }
    }, [emailRecipient, emailSubject, emailBody, phoneNumber, smsMessage, activeTab, bitcoinAddress, bitcoinMessage, selectedMoreOption, whatsappNumber, whatsappMessage, wifiSSID, wifiPassword, wifiType, wifiHidden]);

    // Scannability Engine
    const getRelativeLuminance = (hex) => {
        if (!hex) return 0;
        let c = hex.replace(/^#/, '');
        if (c.length === 3) {
            c = c.split('').map(x => x + x).join('');
        }
        const rgb = c.match(/.{2}/g).map(x => parseInt(x, 16) / 255);
        const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const getContrastRatio = (color1, color2) => {
        const L1 = getRelativeLuminance(color1);
        const L2 = getRelativeLuminance(color2);
        return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    };

    const calculateScannability = (design, qrValue) => {
        let score = 100;
        const bgColor = design.background?.color || '#ffffff';
        const contrast = getContrastRatio(design.dots.color, bgColor);

        if (contrast < 2.5) score -= 60;
        else if (contrast < 4.5) score -= 30;

        if (design.image?.url) {
            const size = design.imageOptions?.imageSize || 0.2;
            if (size >= 0.4) score -= 50;
            else if (size >= 0.3) score -= 30;
            else if (size > 0.2) score -= 10;
        }

        const len = (qrValue || '').length;
        if (len > 200) score -= 20;
        else if (len > 100) score -= 10;

        if (score >= 90) return { score, text: 'EXCELLENT', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' };
        if (score >= 60) return { score, text: 'GOOD', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' };
        return { score, text: 'CRITICAL', color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)' };
    };

    useEffect(() => {
        const result = calculateScannability(qrDesign, link || '');
        setScannability(result);
    }, [qrDesign, link]);

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
        if (!link || !qrName) return toast.error('Please enter a name and data/link');
        setIsSaving(true);
        try {
            const payload = {
                type: activeTab,
                name: qrName,
                data: link,
                design: qrDesign
            };

            if (isEditing) {
                await axios.put(`/api/qr/${editingQr._id}`, payload);
                toast.success('Static QR Code updated successfully!');
            } else {
                await axios.post('/api/qr/static', payload);
                toast.success('Static QR Code saved successfully!');
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving static QR:', error);
            toast.error('Failed to save QR Code. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const renderInputFields = () => {
        const inputStyle = {
            width: '100%',
            padding: '1rem',
            borderRadius: '12px',
            background: '#1e293b',
            border: '1px solid #334155',
            color: '#f8fafc',
            outline: 'none',
            fontSize: '1rem',
            transition: 'border-color 0.2s'
        };

        const labelStyle = {
            display: 'block',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#94a3b8',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        };

        const sectionVariant = {
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
        };

        switch (activeTab) {
            case 'email':
                return (
                    <motion.div variants={sectionVariant} initial="hidden" animate="visible" className="space-y-4">
                        <div>
                            <label style={labelStyle}>E-mail Recipient</label>
                            <input type="email" value={emailRecipient} onChange={(e) => setEmailRecipient(e.target.value)} placeholder="recipient@example.com" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Subject</label>
                            <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Email subject" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Body Text</label>
                            <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder="Enter your message" style={{ ...inputStyle, minHeight: '120px' }} />
                        </div>
                    </motion.div>
                );
            case 'text':
            case 'sms':
                return (
                    <motion.div variants={sectionVariant} initial="hidden" animate="visible" className="space-y-4">
                        {activeTab === 'sms' && (
                            <div>
                                <label style={labelStyle}>Phone Number</label>
                                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+1234567890" style={inputStyle} />
                            </div>
                        )}
                        <div>
                            <label style={labelStyle}>{activeTab === 'text' ? 'Your Text' : 'Message'}</label>
                            <textarea 
                                value={activeTab === 'text' ? link : smsMessage} 
                                onChange={(e) => activeTab === 'text' ? setLink(e.target.value) : setSmsMessage(e.target.value)} 
                                placeholder="Enter text here..." 
                                style={{ ...inputStyle, minHeight: '120px' }} 
                            />
                        </div>
                    </motion.div>
                );
            case 'wifi':
                 return (
                    <motion.div variants={sectionVariant} initial="hidden" animate="visible" className="space-y-4">
                        <div>
                            <label style={labelStyle}>Network Name (SSID)</label>
                            <input type="text" value={wifiSSID} onChange={(e) => setWifiSSID(e.target.value)} placeholder="WiFi Name" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Password</label>
                            <input type="text" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder="WiFi Password" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Encryption</label>
                            <select value={wifiType} onChange={(e) => setWifiType(e.target.value)} style={inputStyle}>
                                <option value="WPA">WPA/WPA2</option>
                                <option value="WEP">WEP</option>
                                <option value="nopass">No Encryption</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input type="checkbox" checked={wifiHidden} onChange={(e) => setWifiHidden(e.target.checked)} id="wifi-hidden" />
                            <label htmlFor="wifi-hidden" style={{ color: '#f8fafc', fontSize: '0.9rem' }}>Hidden Network</label>
                        </div>
                    </motion.div>
                );
            case 'phone':
                 return (
                    <motion.div variants={sectionVariant} initial="hidden" animate="visible">
                        <label style={labelStyle}>Phone Number</label>
                        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+1234567890" style={inputStyle} />
                    </motion.div>
                );
            case 'more':
                if (selectedMoreOption?.id === 'bitcoin') {
                    return (
                        <motion.div variants={sectionVariant} initial="hidden" animate="visible" className="space-y-4">
                            <div>
                                <label style={labelStyle}>Bitcoin Address</label>
                                <input type="text" value={bitcoinAddress} onChange={(e) => setBitcoinAddress(e.target.value)} placeholder="Bitcoin Wallet Address" style={inputStyle} />
                            </div>
                             <div>
                                <label style={labelStyle}>Message</label>
                                <input type="text" value={bitcoinMessage} onChange={(e) => setBitcoinMessage(e.target.value)} placeholder="Transaction message (optional)" style={inputStyle} />
                            </div>
                        </motion.div>
                    );
                }
                if (selectedMoreOption?.id === 'whatsapp') {
                    return (
                         <motion.div variants={sectionVariant} initial="hidden" animate="visible" className="space-y-4">
                            <div>
                                <label style={labelStyle}>WhatsApp Number</label>
                                <input type="tel" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} placeholder="+1234567890" style={inputStyle} />
                            </div>
                             <div>
                                <label style={labelStyle}>Pre-filled Message</label>
                                <textarea value={whatsappMessage} onChange={(e) => setWhatsappMessage(e.target.value)} placeholder="Hello..." style={{ ...inputStyle, minHeight: '100px' }} />
                            </div>
                        </motion.div>
                    );
                }
                // Fallthrough for generic 'more' options
            default:
                return (
                    <motion.div variants={sectionVariant} initial="hidden" animate="visible">
                        <label style={labelStyle}>{activeTab === 'more' && selectedMoreOption ? selectedMoreOption.label : 'Website URL'}</label>
                        <input 
                            type="text" 
                            value={link} 
                            onChange={(e) => setLink(e.target.value)} 
                            placeholder={activeTab === 'more' && selectedMoreOption ? selectedMoreOption.placeholder : 'https://example.com'} 
                            style={inputStyle} 
                        />
                    </motion.div>
                );
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
            
            {/* Top Navigation */}
            <header style={{ 
                padding: '1rem 2rem', 
                borderBottom: '1px solid #1e293b', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        style={{ 
                            background: '#1e293b', 
                            border: '1px solid #334155', 
                            borderRadius: '12px', 
                            width: '40px', 
                            height: '40px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            color: '#94a3b8',
                            cursor: 'pointer'
                        }}
                    >
                        <ArrowLeft size={20} />
                    </motion.button>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f8fafc' }}>Static Generator</h1>
                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Create permanent, non-trackable QR codes</p>
                    </div>
                </div>
            </header>

            <main style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '1.5rem' : '2rem', display: 'flex', gap: '2rem', flexDirection: isMobile ? 'column' : 'row', paddingBottom: isMobile ? '100px' : '2rem' }}>
                
                {/* Left Sidebar - Types */}
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    style={{ 
                        width: isMobile ? '100%' : '260px', 
                        flexShrink: 0,
                        display: isMobile && mobileTab !== 'config' ? 'none' : 'block'
                    }}
                >
                    <div style={{ 
                        background: '#1e293b', 
                        borderRadius: '16px', 
                        border: '1px solid #334155', 
                        padding: '1rem',
                        position: 'sticky',
                        top: '100px'
                    }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '1rem', paddingLeft: '0.5rem', textTransform: 'uppercase' }}>QR Type</h3>
                        <div style={{ display: 'flex', flexDirection: windowWidth <= 1024 ? 'row' : 'column', gap: '0.5rem', overflowX: windowWidth <= 1024 ? 'auto' : 'visible', paddingBottom: windowWidth <= 1024 ? '0.5rem' : 0 }}>
                            {qrTabs.map(tab => (
                                <motion.div
                                    key={tab.id}
                                    onClick={() => {
                                        if (tab.id === 'more') {
                                            setShowMoreMenu(!showMoreMenu);
                                        } else {
                                            setActiveTab(tab.id);
                                            if (tab.id === 'website') setLink('https://QRinsight.com/');
                                            else setLink('');
                                            setShowMoreMenu(false);
                                            if (tab.id !== 'more') setSelectedMoreOption(null);
                                        }
                                    }}
                                    whileHover={{ x: 4 }}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        background: activeTab === tab.id ? 'linear-gradient(135deg, #ffa305 0%, #ffbf47 100%)' : 'transparent',
                                        color: activeTab === tab.id ? '#000' : '#94a3b8',
                                        fontWeight: activeTab === tab.id ? '600' : '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        transition: 'all 0.2s',
                                        position: 'relative'
                                    }}
                                >
                                    {tab.id === 'more' && selectedMoreOption ? (
                                        <>
                                            <img src={selectedMoreOption.icon} alt={selectedMoreOption.label} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80px' }}>{selectedMoreOption.label}</span>
                                        </>
                                    ) : (
                                        <>
                                            {tab.icon}
                                            <span>{tab.label}</span>
                                        </>
                                    )}
                                    {tab.isIncomplete && (
                                        <span style={{ 
                                            position: 'absolute', right: '10px', top: '10px', 
                                            width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' 
                                        }} />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* More Menu Dropdown */}
                        <AnimatePresence>
                            {showMoreMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    style={{
                                        marginTop: '1rem',
                                        background: '#0f172a',
                                        borderRadius: '12px',
                                        border: '1px solid #334155',
                                        padding: '0.5rem',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {moreMenuOptions.map((option) => (
                                        <div
                                            key={option.id}
                                            onClick={() => {
                                                setActiveTab('more');
                                                setSelectedMoreOption(option);
                                                setQrName(option.label);
                                                setLink(option.placeholder);
                                                setShowMoreMenu(false);
                                            }}
                                            style={{
                                                padding: '0.5rem',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: '#f8fafc',
                                                fontSize: '0.8rem',
                                                background: selectedMoreOption?.id === option.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                                            }}
                                        >
                                            <img src={option.icon} alt={option.label} style={{ width: '16px', height: '16px' }} />
                                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{option.label}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Center Content - Inputs */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{ 
                        flex: 1, 
                        maxWidth: '800px',
                        display: isMobile && mobileTab !== 'config' ? 'none' : 'block'
                    }}
                >
                    {/* Content Configuration */}
                    <Accordion title="Enter Content" icon={Layout} isOpen={isInfoOpen} setIsOpen={setIsInfoOpen}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name your QR Code</label>
                                <input
                                    type="text"
                                    value={qrName}
                                    onChange={(e) => setQrName(e.target.value)}
                                    placeholder="e.g. Summer Campaign"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        background: '#1e293b',
                                        border: '1px solid #334155',
                                        color: '#f8fafc',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            
                            <div style={{ height: '1px', background: '#334155' }} />
                            
                            {renderInputFields()}
                        </div>
                    </Accordion>

                    {/* Design Customization */}
                    <Accordion title="Design & Colors" icon={Palette} isOpen={isDesignOpen} setIsOpen={setIsDesignOpen}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Patterns */}
                            <div>
                                <label style={{ display: 'block', color: '#f8fafc', fontWeight: '600', marginBottom: '1rem' }}>Pattern Style</label>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    {patterns.map(p => (
                                        <div
                                            key={p.id}
                                            onClick={() => setQrDesign(prev => ({ ...prev, dots: { ...prev.dots, style: p.id } }))}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                background: qrDesign?.dots?.style === p.id ? 'rgba(255, 163, 5, 0.2)' : '#0f172a',
                                                border: qrDesign?.dots?.style === p.id ? '2px solid #ffa305' : '1px solid #334155',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                color: qrDesign?.dots?.style === p.id ? '#ffa305' : '#64748b'
                                            }}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 50 50">{p.svg}</svg>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Foreground Color (under Pattern Style) */}
                            <div>
                                <label style={{ display: 'block', color: '#f8fafc', fontWeight: '600', marginBottom: '0.5rem' }}>Foreground Color</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#0f172a', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid #334155', maxWidth: '260px' }}>
                                    <input 
                                        type="color" 
                                        value={qrDesign?.dots?.color || '#000000'}
                                        onChange={(e) => setQrDesign(prev => ({ 
                                            ...prev, 
                                            dots: { ...prev.dots, color: e.target.value },
                                            cornersSquare: { ...prev.cornersSquare, color: e.target.value },
                                            cornersDot: { ...prev.cornersDot, color: e.target.value }
                                        }))}
                                        style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }} 
                                    />
                                    <span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{qrDesign?.dots?.color || '#000000'}</span>
                                </div>
                            </div>
                            {/* Eye Frame (Outer Square) */}
                            <div>
                                <label style={{ display: 'block', color: '#f8fafc', fontWeight: '600', marginBottom: '1rem' }}>Eye Frame Style</label>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
                                        { id: 'leaf-bottom-right', svg: <path d="M3.5 3.5 L26.5 3.5 A20 20 0 0 1 46.5 23.5 L46.5 46.5 L23.5 46.5 A20 20 0 0 1 3.5 26.5 Z" stroke="currentColor" strokeWidth="7" fill="none" /> },
                                        { id: 'leaf-bottom-left', svg: <path d="M3.5 23.5 A20 20 0 0 1 23.5 3.5 L46.5 3.5 L46.5 26.5 A20 20 0 0 1 26.5 46.5 L3.5 46.5 Z" stroke="currentColor" strokeWidth="7" fill="none" /> },
                                    ].map((f) => (
                                        <div
                                            key={f.id}
                                            onClick={() => setQrDesign(prev => ({ ...prev, cornersSquare: { ...prev.cornersSquare, style: f.id } }))}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                background: qrDesign?.cornersSquare?.style === f.id ? 'rgba(255, 163, 5, 0.2)' : '#0f172a',
                                                border: qrDesign?.cornersSquare?.style === f.id ? '2px solid #ffa305' : '1px solid #334155',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                color: qrDesign?.cornersSquare?.style === f.id ? '#ffa305' : '#64748b'
                                            }}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 50 50">{f.svg}</svg>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', color: '#f8fafc', fontWeight: '600', marginBottom: '0.5rem' }}>Frame Color</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#0f172a', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid #334155', maxWidth: '260px' }}>
                                    <input
                                        type="color"
                                        value={qrDesign?.cornersSquare?.color || qrDesign?.dots?.color || '#000000'}
                                        onChange={(e) => setQrDesign(prev => ({ ...prev, cornersSquare: { ...prev.cornersSquare, color: e.target.value } }))}
                                        style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                    />
                                    <span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{qrDesign?.cornersSquare?.color || qrDesign?.dots?.color || '#000000'}</span>
                                </div>
                            </div>

                            {/* Eye Ball (Inner Dot) */}
                            <div>
                                <label style={{ display: 'block', color: '#f8fafc', fontWeight: '600', marginBottom: '1rem' }}>Eye Ball Style</label>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    {[
                                        { id: 'dot', svg: <circle cx="25" cy="25" r="17" fill="currentColor" /> },
                                        { id: 'square', svg: <rect x="9" y="9" width="32" height="32" fill="currentColor" /> },
                                        { id: 'rounded', svg: <rect x="9" y="9" width="32" height="32" rx="10" fill="currentColor" /> },
                                        { id: 'leaf-diag-1', svg: <path d="M25 9 L41 9 L41 25 A16 16 0 0 1 25 41 L9 41 L9 25 A16 16 0 0 1 25 9 Z" fill="currentColor" /> },
                                        { id: 'leaf-diag-2', svg: <path d="M9 25 L9 9 L25 9 A16 16 0 0 1 41 25 L41 41 L25 41 A16 16 0 0 1 9 25 Z" fill="currentColor" /> },
                                        { id: 'teardrop-tl', svg: <path d="M9 25 L9 9 L25 9 A16 16 0 0 1 41 25 A16 16 0 0 1 25 41 A16 16 0 0 1 9 25 Z" fill="currentColor" /> },
                                        { id: 'diamond', svg: <path d="M25 5 L45 25 L25 45 L5 25 Z" fill="currentColor" /> },
                                        { id: 'star', svg: <path d="M25 8 L30 18 L41 19 L32 26 L35 37 L25 31 L15 37 L18 26 L9 19 L20 18 Z" fill="currentColor" /> },
                                        { id: 'plus', svg: <path d="M22 12 L28 12 L28 22 L38 22 L38 28 L28 28 L28 38 L22 38 L22 28 L12 28 L12 22 L22 22 Z" fill="currentColor" /> },
                                        { id: 'cross', svg: <path d="M16 10 L25 19 L34 10 L40 16 L31 25 L40 34 L34 40 L25 31 L16 40 L10 34 L19 25 L10 16 Z" fill="currentColor" /> },
                                    ].map((b) => (
                                        <div
                                            key={b.id}
                                            onClick={() => setQrDesign(prev => ({ ...prev, cornersDot: { ...prev.cornersDot, style: b.id } }))}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                background: qrDesign?.cornersDot?.style === b.id ? 'rgba(255, 163, 5, 0.2)' : '#0f172a',
                                                border: qrDesign?.cornersDot?.style === b.id ? '2px solid #ffa305' : '1px solid #334155',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                color: qrDesign?.cornersDot?.style === b.id ? '#ffa305' : '#64748b'
                                            }}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 50 50">{b.svg}</svg>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', color: '#f8fafc', fontWeight: '600', marginBottom: '0.5rem' }}>Ball Color</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#0f172a', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid #334155', maxWidth: '260px' }}>
                                    <input
                                        type="color"
                                        value={qrDesign?.cornersDot?.color || qrDesign?.dots?.color || '#000000'}
                                        onChange={(e) => setQrDesign(prev => ({ ...prev, cornersDot: { ...prev.cornersDot, color: e.target.value } }))}
                                        style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                    />
                                    <span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{qrDesign?.cornersDot?.color || qrDesign?.dots?.color || '#000000'}</span>
                                </div>
                            </div>

                            
                        </div>
                    </Accordion>

                    {/* Logo */}
                    <Accordion title="Add Logo" icon={ImageIcon} isOpen={isLogoOpen} setIsOpen={setIsLogoOpen}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                             <div 
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                    border: '2px dashed #334155',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: isHovered ? 'rgba(255,255,255,0.05)' : 'transparent',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} />
                                {qrDesign?.image?.url ? (
                                    <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto' }}>
                                        <img src={qrDesign.image.url} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        <div 
                                            onClick={(e) => { e.stopPropagation(); setQrDesign(prev => ({ ...prev, image: { ...prev.image, url: null } })); }}
                                            style={{ position: 'absolute', top: -10, right: -10, background: '#ef4444', borderRadius: '50%', padding: '4px', color: '#fff' }}
                                        >
                                            <X size={14} />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload size={32} color="#64748b" style={{ marginBottom: '1rem' }} />
                                        <p style={{ color: '#94a3b8', fontWeight: '500' }}>Click to upload your logo</p>
                                    </>
                                )}
                            </div>

                            <div>
                                <label style={{ display: 'block', color: '#f8fafc', fontWeight: '600', marginBottom: '1rem' }}>Or choose from presets</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))', gap: '1rem' }}>
                                    {socialLogos.map((social) => (
                                        <div
                                            key={social.id}
                                            onClick={() => handleSocialLogoSelect(social)}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                background: '#fff',
                                                borderRadius: '12px',
                                                padding: '8px',
                                                cursor: 'pointer',
                                                border: qrDesign?.image?.url === social.src ? '2px solid #3b82f6' : 'none',
                                                opacity: qrDesign?.image?.url === social.src ? 1 : 0.8
                                            }}
                                        >
                                            <img src={social.src} alt={social.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: '#f8fafc', fontWeight: '600', marginBottom: '0.5rem' }}>Logo Size</label>
                                    <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '0.75rem 1rem' }}>
                                        <input
                                            type="range"
                                            min="0.1"
                                            max="0.6"
                                            step="0.05"
                                            value={qrDesign?.imageOptions?.imageSize ?? 0.2}
                                            onChange={(e) => setQrDesign(prev => ({ ...prev, imageOptions: { ...prev.imageOptions, imageSize: parseFloat(e.target.value) } }))}
                                            style={{ width: '100%' }}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', alignItems: 'center' }}>
                                            <span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{(qrDesign?.imageOptions?.imageSize ?? 0.2).toFixed(2)}</span>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => setQrDesign(prev => ({ ...prev, imageOptions: { ...prev.imageOptions, imageSize: 0.2 } }))}
                                                    style={{ padding: '0.25rem 0.5rem', borderRadius: '8px', background: 'rgba(255,163,5,0.15)', border: '1px solid #ffa305', color: '#f8fafc', cursor: 'pointer' }}
                                                >
                                                    Small
                                                </button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: '#f8fafc', fontWeight: '600', marginBottom: '0.5rem' }}>Remove Background</label>
                                    <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#94a3b8' }}>Hide dots behind logo</span>
                                        <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                                            <input
                                                type="checkbox"
                                                checked={qrDesign?.imageOptions?.hideBackgroundDots || false}
                                                onChange={(e) => setQrDesign(prev => ({ ...prev, imageOptions: { ...prev.imageOptions, hideBackgroundDots: e.target.checked } }))}
                                                style={{ width: '0', height: '0', opacity: 0, position: 'absolute' }}
                                            />
                                            <div style={{
                                                width: '42px',
                                                height: '24px',
                                                background: (qrDesign?.imageOptions?.hideBackgroundDots || false) ? '#ffa305' : '#334155',
                                                borderRadius: '999px',
                                                position: 'relative',
                                                transition: 'background 0.2s'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '3px',
                                                    left: (qrDesign?.imageOptions?.hideBackgroundDots || false) ? '22px' : '3px',
                                                    width: '18px',
                                                    height: '18px',
                                                    borderRadius: '50%',
                                                    background: '#f8fafc',
                                                    transition: 'left 0.2s'
                                                }} />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Accordion>
                </motion.div>

                {/* Right Panel - Preview */}
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ 
                        width: isMobile ? '100%' : '380px', 
                        flexShrink: 0,
                        display: isMobile && mobileTab !== 'preview' ? 'none' : 'block'
                    }}
                >
                    <div style={{ position: isMobile ? 'relative' : 'sticky', top: isMobile ? '0' : '100px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Preview Card */}
                        <div style={{ 
                            background: '#1e293b', 
                            borderRadius: '24px', 
                            padding: '2rem',
                            border: '1px solid #334155',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                        }}>
                             <div style={{ marginBottom: '1.5rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <div ref={qrRef} style={{ background: '#fff', padding: '1rem', borderRadius: '16px' }}>
                                    <QRRenderer 
                                        value={link} 
                                        design={qrDesign} 
                                        size={220}
                                    />
                                </div>
                            </div>
                            
                            {/* Scannability Badge */}
                            <div style={{ 
                                width: '100%', 
                                padding: '1rem', 
                                background: scannability.bgColor, 
                                borderRadius: '12px', 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1.5rem',
                                border: `1px solid ${scannability.color}`
                            }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: scannability.color }}>Scannability</span>
                                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: scannability.color }}>{scannability.text}</span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSave}
                                disabled={isSaving}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #ffa305 0%, #ffbf47 100%)',
                                    color: '#000',
                                    border: 'none',
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                {isSaving ? <Loader2 className="animate-spin" /> : <Download size={20} />}
                                {isEditing ? 'Update QR Code' : 'Save QR Code'}
                            </motion.button>
                        </div>

                        {/* Info Card */}
                        <div style={{ 
                            padding: '1.5rem', 
                            background: 'rgba(51, 65, 85, 0.5)', 
                            borderRadius: '16px',
                            border: '1px solid #334155'
                        }}>
                            <h4 style={{ color: '#f8fafc', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Settings size={16} color="#ffa305" />
                                Static QR Code
                            </h4>
                            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5' }}>
                                Static QR codes are permanent and cannot be edited after creation. They don't provide scan analytics.
                            </p>
                        </div>
                    </div>
                </motion.div>

            </main>

            {/* Mobile Bottom Navigation */}
            {isMobile && (
                <div style={{
                    position: 'fixed', bottom: 0, left: 0, right: 0, height: '70px',
                    background: '#1e293b', display: 'flex', borderTop: '1px solid #334155',
                    zIndex: 1001
                }}>
                    <div
                        onClick={() => setMobileTab('config')}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', color: mobileTab === 'config' ? '#ffa305' : '#64748b' }}
                    >
                        <Settings size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Generator</span>
                    </div>
                    <div
                        onClick={() => setMobileTab('preview')}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', color: mobileTab === 'preview' ? '#ffa305' : '#64748b' }}
                    >
                        <Eye size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Preview</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaticGenerator;

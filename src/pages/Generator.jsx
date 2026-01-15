import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DesignQR from '../components/DesignQR';
import QRRenderer from '../components/QRRenderer';
import AppStoreConfig from '../components/AppStoreConfig';
import MenuConfig from '../components/MenuConfig';
import CustomConfig from '../components/CustomConfig';
import CouponConfig from '../components/CouponConfig';
import BusinessCardConfig from '../components/BusinessCardConfig';
import BusinessPageConfig from '../components/BusinessPageConfig';
import BioPageConfig from '../components/BioPageConfig';
import SurveyConfig from '../components/SurveyConfig';
import LeadGenerationConfig from '../components/LeadGenerationConfig';
import RatingConfig from '../components/RatingConfig';
import ReviewsConfig from '../components/ReviewsConfig';
import SocialMediaConfig from '../components/SocialMediaConfig';
import PDFConfig from '../components/PDFConfig';
import MultipleLinksConfig from '../components/MultipleLinksConfig';
import PasswordProtectedConfig from '../components/PasswordProtectedConfig';
import EventConfig from '../components/EventConfig';
import MobilePreview from '../components/MobilePreview';
import DynamicUrlConfig from '../components/DynamicUrlConfig';
import VideoConfig from '../components/VideoConfig';
import ImageConfig from '../components/ImageConfig';
import ProductPageConfig from '../components/ProductPageConfig';
import { qrTypes } from '../utils/qrTypes';
import { getPreviewConfig } from '../utils/previewConfigs';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Generator = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const typeFromQuery = params.get('type');
    const editingQr = location.state?.editingQr;
    // Derive selectedType from state, editingQr, or query param
    const selectedType = location.state?.selectedType || editingQr?.type || typeFromQuery || 'website';
    const isEditing = !!editingQr;
    const qrRef = useRef(null);

    const [activeStep, setActiveStep] = useState('content'); // 'content' | 'design'
    const [qrName, setQrName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordExpiry, setPasswordExpiry] = useState('');
    const [scanLimitEnabled, setScanLimitEnabled] = useState(false);
    const [scanLimit, setScanLimit] = useState('');
    const [qrNameError, setQrNameError] = useState('');
    const qrNameRef = useRef(null);
    const [dynamicUrlError, setDynamicUrlError] = useState('');
    const [couponErrors, setCouponErrors] = useState({});
    const [businessCardErrors, setBusinessCardErrors] = useState({});
    const [businessPageErrors, setBusinessPageErrors] = useState({});
    const [bioPageErrors, setBioPageErrors] = useState({});
    const [leadGenErrors, setLeadGenErrors] = useState({});
    const [reviewsErrors, setReviewsErrors] = useState({});
    const [ratingErrors, setRatingErrors] = useState({});
    const [socialMediaErrors, setSocialMediaErrors] = useState({});
    const [pdfErrors, setPdfErrors] = useState({});
    const [multipleLinksErrors, setMultipleLinksErrors] = useState({});
    const [passwordProtectedErrors, setPasswordProtectedErrors] = useState({});
    const [eventErrors, setEventErrors] = useState({});
    const [productErrors, setProductErrors] = useState({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedShortId, setGeneratedShortId] = useState(null); // Store shortId after creation
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [showUnsavedModal, setShowUnsavedModal] = useState(false);
    const [activeTab, setActiveTab] = useState('generator');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [initialState, setInitialState] = useState({ pageConfig: {}, qrDesign: {}, qrName: '' });
    const [scannability, setScannability] = useState({
        score: 100,
        text: 'EXCELLENT',
        color: '#166534',
        bgColor: '#dcfce7'
    });
    const [loadingHash, setLoadingHash] = useState(0);

    // Shuffle QR pattern during loading state
    useEffect(() => {
        let interval;
        if (isGenerating) {
            interval = setInterval(() => {
                setLoadingHash(prev => prev + 1);
            }, 100);
        } else {
            setLoadingHash(0);
        }
        return () => clearInterval(interval);
    }, [isGenerating]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Helper to generate a simple hash of an object for live preview updates
    const getHash = (obj) => {
        try {
            const str = JSON.stringify(obj);
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return Math.abs(hash).toString(36);
        } catch (e) {
            return 'default';
        }
    };

    // Helper function to generate QR value URL for preview/display
    const getQRValue = () => {
        const baseUrl = (import.meta.env.VITE_FRONTEND_URL || window.location.origin).replace(/\/$/, '');

        // Priority: generatedShortId (after creation) > editingQr.shortId (edit mode) > preview
        const id = generatedShortId || (isEditing ? editingQr?.shortId : null);

        if (!id) {
            // For preview during creation
            let previewUrl = '';
            if ((selectedType === 'dynamic-url' || selectedType === 'website') && pageConfig.url) {
                previewUrl = pageConfig.url;
            } else if (['app-store', 'menu', 'business-page', 'custom-type', 'coupon', 'business-card', 'bio-page', 'lead-generation', 'rating', 'reviews', 'social-media', 'pdf', 'multiple-links', 'password-protected', 'event', 'product-page', 'video', 'image'].includes(selectedType)) {
                previewUrl = `${baseUrl}/view/preview`;
            } else {
                const backendUrl = import.meta.env.VITE_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:3000' : window.location.origin.replace(':5173', ':3000'));
                previewUrl = `${backendUrl}/preview`;
            }

            // Append config hash to ensure QR pattern updates in real-time as content changes
            const configHash = getHash(pageConfig);
            const extraHash = isGenerating ? `&loading=${loadingHash}` : '';
            return previewUrl.includes('?') ? `${previewUrl}&v=${configHash}${extraHash}` : `${previewUrl}?v=${configHash}${extraHash}`;
        }

        // Generate actual URL based on type
        // While generating, we still want the preview to animate
        const extraHash = isGenerating ? `?loading=${loadingHash}` : '';

        if (['app-store', 'menu', 'business-page', 'custom-type', 'coupon', 'business-card', 'bio-page', 'lead-generation', 'rating', 'reviews', 'social-media', 'pdf', 'multiple-links', 'password-protected', 'event', 'product-page', 'video', 'image', 'dynamic-url'].includes(selectedType)) {
            const backendUrl = import.meta.env.VITE_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:3000' : window.location.origin.replace(':5173', ':3000'));
            return `${backendUrl}/${id}${extraHash}`;
        } else {
            const backendUrl = import.meta.env.VITE_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:3000' : window.location.origin.replace(':5173', ':3000'));
            return `${backendUrl}/${id}${extraHash}`;
        }
    };

    // --- SCANNABILITY ENGINE ---
    const getRelativeLuminance = (hex) => {
        // Handle cases where hex might be null or undefined
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

        const dotsContrast = getContrastRatio(design.dots.color, bgColor);
        const eyeFrameContrast = getContrastRatio(design.cornersSquare?.color || design.dots.color, bgColor);
        const eyeBallContrast = getContrastRatio(design.cornersDot?.color || design.dots.color, bgColor);
        
        // Use the worst contrast to ensure overall scannability
        const contrast = Math.min(dotsContrast, eyeFrameContrast, eyeBallContrast);

        // 1. Contrast Check (Weight: 60%)
        if (contrast < 2.5) score -= 60;
        else if (contrast < 4.5) score -= 30;

        // 2. Logo Check (Weight: 20%)
        if (design.image?.url) {
            const size = design.imageOptions?.imageSize || 0.2;

            // If logo covers > 40% (0.4), it's critical blocking risk
            if (size >= 0.4) {
                score -= 50;
            }
            // If logo covers > 30% (0.3), it's high risk
            else if (size >= 0.3) {
                score -= 30;
            }
            // If logo covers > 20% (0.2), it's moderate impact
            else if (size > 0.2) {
                score -= 10;
            }
        }

        // 3. Data Density (Weight: 20%)
        if (qrValue.length > 200) score -= 20;
        else if (qrValue.length > 100) score -= 10;

        // Final result mapping
        if (score >= 90) return { score, text: 'EXCELLENT', color: '#166534', bgColor: '#dcfce7' };
        if (score >= 60) return { score, text: 'GOOD', color: '#1e40af', bgColor: '#dbeafe' };
        return { score, text: 'CRITICAL', color: '#991b1b', bgColor: '#fee2e2' };
    };
    // ---------------------------

    // QR Code Design State (Visuals)
    const [qrDesign, setQrDesign] = useState({
        dots: { style: 'square', color: '#000000' },
        cornersSquare: { style: 'square', color: '#000000' },
        cornersDot: { style: 'dot', color: '#000000' },
        background: { color: '#ffffff' },
        image: { url: '' },
        imageOptions: { hideBackgroundDots: false, imageSize: 0.4 }
    });

    // Page Configuration State (Content + Page Theme)
    const [pageConfig, setPageConfig] = useState({});

    // Populating state if editing
    useEffect(() => {
        const defaultConfig = getPreviewConfig(selectedType) || {};
        console.log('defaultconfig', defaultConfig)
        if (editingQr) {
            setQrName(editingQr.name || '');
            setPassword(editingQr.password || '');
            setPasswordExpiry(editingQr.passwordExpiry ? new Date(editingQr.passwordExpiry).toISOString().split('T')[0] : '');
            setScanLimitEnabled(editingQr.scanLimitEnabled || false);
            setScanLimit(editingQr.scanLimit || '');

            // Properly merge design with defaults to ensure all fields are populated
            const defaultDesign = {
                dots: { style: 'square', color: '#000000' },
                cornersSquare: { style: 'square', color: '#000000' },
                cornersDot: { style: 'dot', color: '#000000' },
                background: { color: '#ffffff' },
                image: { url: '' },
                imageOptions: { hideBackgroundDots: false, imageSize: 0.4 }
            };

            setQrDesign({
                dots: { ...defaultDesign.dots, ...(editingQr.design?.dots || {}) },
                cornersSquare: { ...defaultDesign.cornersSquare, ...(editingQr.design?.cornersSquare || {}) },
                cornersDot: { ...defaultDesign.cornersDot, ...(editingQr.design?.cornersDot || {}) },
                background: { ...defaultDesign.background, ...(editingQr.design?.background || {}) },
                image: { ...defaultDesign.image, ...(editingQr.design?.image || {}) },
                imageOptions: { ...defaultDesign.imageOptions, ...(editingQr.design?.imageOptions || {}) }
            });

            // Populate content - ensure all saved data is loaded
            const loadedConfig = {
                ...defaultConfig,
                businessInfo: editingQr.businessInfo ? { ...defaultConfig.businessInfo, ...editingQr.businessInfo } : defaultConfig.businessInfo,
                basicInfo: editingQr.basicInfo || defaultConfig.basicInfo,
                appLinks: editingQr.appLinks ? { ...defaultConfig.appLinks, ...editingQr.appLinks } : defaultConfig.appLinks,
                appStatus: editingQr.appStatus ? { ...defaultConfig.appStatus, ...editingQr.appStatus } : defaultConfig.appStatus,
                menu: editingQr.menu || defaultConfig.menu,
                timings: editingQr.timings || defaultConfig.timings,
                social: editingQr.social ? { ...defaultConfig.social, ...editingQr.social } : defaultConfig.social,
                coupon: editingQr.coupon || defaultConfig.coupon,
                customComponents: editingQr.customComponents || defaultConfig.customComponents,
                personalInfo: editingQr.personalInfo || defaultConfig.personalInfo,
                contact: editingQr.contact || defaultConfig.contact,
                facilities: editingQr.facilities || defaultConfig.facilities,
                exchange: editingQr.exchange || defaultConfig.exchange,
                openingHours: editingQr.openingHours || defaultConfig.openingHours,
                form: editingQr.form || defaultConfig.form,
                customFields: editingQr.customFields || defaultConfig.customFields,
                thankYou: editingQr.thankYou || defaultConfig.thankYou,
                rating: editingQr.rating || defaultConfig.rating,
                reviews: editingQr.reviews || defaultConfig.reviews,
                shareOption: editingQr.shareOption || defaultConfig.shareOption,
                uploadPdf: editingQr.pdf || defaultConfig.uploadPdf,
                links: editingQr.links || defaultConfig.links,
                categories: editingQr.categories || defaultConfig.categories,
                socialLinks: editingQr.socialLinks || defaultConfig.socialLinks,
                infoFields: editingQr.infoFields || defaultConfig.infoFields,
                eventSchedule: editingQr.eventSchedule || defaultConfig.eventSchedule,
                venue: editingQr.venue || defaultConfig.venue,
                contactInfo: editingQr.contactInfo || defaultConfig.contactInfo,
                content: editingQr.productContent || defaultConfig.content,
                video: editingQr.video || defaultConfig.video,
                feedback: editingQr.feedback || defaultConfig.feedback,
                url: editingQr.dynamicUrl || defaultConfig.url,
                images: editingQr.images || defaultConfig.images,
                // Re-merge design to include page styles (like colors) and QR design
                design: {
                    ...defaultConfig.design,
                    ...editingQr.design,
                    // Ensure QR design fields are preserved
                    dots: editingQr.design?.dots || defaultConfig.design?.dots,
                    cornersSquare: editingQr.design?.cornersSquare || defaultConfig.design?.cornersSquare,
                    cornersDot: editingQr.design?.cornersDot || defaultConfig.design?.cornersDot,
                    background: editingQr.design?.background || defaultConfig.design?.background,
                    image: editingQr.design?.image || defaultConfig.design?.image,
                    imageOptions: editingQr.design?.imageOptions || defaultConfig.design?.imageOptions
                }
            };

            setPageConfig(loadedConfig);

            // Also update qrDesign state with saved design
            if (editingQr.design) {
                const defaultDesign = {
                    dots: { style: 'square', color: '#000000' },
                    cornersSquare: { style: 'square', color: '#000000' },
                    cornersDot: { style: 'dot', color: '#000000' },
                    background: { color: '#ffffff' },
                    image: { url: '' },
                    imageOptions: { hideBackgroundDots: false, imageSize: 0.4 }
                };
                const loadedDesign = {
                    dots: { ...defaultDesign.dots, ...(editingQr.design.dots || {}) },
                    cornersSquare: { ...defaultDesign.cornersSquare, ...(editingQr.design.cornersSquare || {}) },
                    cornersDot: { ...defaultDesign.cornersDot, ...(editingQr.design.cornersDot || {}) },
                    background: { ...defaultDesign.background, ...(editingQr.design.background || {}) },
                    image: { ...defaultDesign.image, ...(editingQr.design.image || {}) },
                    imageOptions: { ...defaultDesign.imageOptions, ...(editingQr.design.imageOptions || {}) }
                };
                setQrDesign(loadedDesign);

                // Store initial state for change detection
                setInitialState({
                    pageConfig: JSON.parse(JSON.stringify(loadedConfig)),
                    qrDesign: JSON.parse(JSON.stringify(loadedDesign)),
                    qrName: editingQr.name || ''
                });
            }
        } else {
            const newConfig = { ...defaultConfig, type: selectedType };
            setPageConfig(newConfig);

            // Store initial state for new QR
            const defaultDesign = {
                dots: { style: 'square', color: '#000000' },
                cornersSquare: { style: 'square', color: '#000000' },
                cornersDot: { style: 'dot', color: '#000000' },
                background: { color: '#ffffff' },
                image: { url: '' },
                imageOptions: { hideBackgroundDots: false, imageSize: 0.4 }
            };
            setInitialState({
                pageConfig: JSON.parse(JSON.stringify(newConfig)),
                qrDesign: JSON.parse(JSON.stringify(defaultDesign)),
                qrName: ''
            });
        }
    }, [selectedType, editingQr]);

    // Detect changes
    useEffect(() => {
        if (!initialState.pageConfig || Object.keys(initialState.pageConfig).length === 0) return;

        const currentStateStr = JSON.stringify({ pageConfig, qrDesign, qrName });
        const initialStateStr = JSON.stringify(initialState);

        setHasUnsavedChanges(currentStateStr !== initialStateStr);
    }, [pageConfig, qrDesign, qrName, initialState]);

    // Prevent accidental reload if unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    useEffect(() => {
        if (!qrDesign || !getQRValue()) return;
        const result = calculateScannability(qrDesign, getQRValue());
        setScannability(result);
    }, [qrDesign, pageConfig, generatedShortId, selectedType]);

    const handleSave = async () => {
        if (!qrName.trim()) {
            setQrNameError('QR name is required');
            if (qrNameRef.current) {
                qrNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                qrNameRef.current.focus();
            }
            return;
        }

        setQrNameError('');

        setIsGenerating(true);

        try {
            // Capture client-side image to ensure WYSIWYG
            let qrImageBase64 = null;
            if (qrRef.current && qrRef.current.getDataURL) {
                qrImageBase64 = qrRef.current.getDataURL();
            }

            // Generate actual QR URL based on type
            // For new QRs, backend will generate the correct URL, so we can send a placeholder
            // For editing, use existing shortId to generate correct URL
            let qrDataUrl = 'https://placeholder.com';

            if (isEditing) {
                const backendUrl = import.meta.env.VITE_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:3000' : window.location.origin.replace(':5173', ':3000'));
                qrDataUrl = `${backendUrl}/${editingQr.shortId}`;
            }
            // For new QRs, backend will generate correct URL in createDynamicQR

            const payload = {
                type: selectedType,
                qrImage: qrImageBase64,
                data: qrDataUrl,
                design: {
                    ...(pageConfig.design || {}),
                    ...qrDesign,          // QR design (includes image.url for QR embedding)
                },
                businessInfo: pageConfig.businessInfo,
                menu: pageConfig.menu,
                timings: pageConfig.timings,
                social: pageConfig.social,
                isBusinessPage: ['business-page', 'app-store'].includes(selectedType),
                appLinks: pageConfig.appLinks,
                appStatus: pageConfig.appStatus,
                facilities: pageConfig.facilities,
                contact: pageConfig.contact,
                personalInfo: pageConfig.personalInfo,
                coupon: pageConfig.coupon,
                customComponents: pageConfig.customComponents,
                exchange: pageConfig.exchange,
                openingHours: pageConfig.openingHours,
                basicInfo: pageConfig.basicInfo,
                form: pageConfig.form,
                customFields: pageConfig.customFields,
                thankYou: pageConfig.thankYou,
                rating: pageConfig.rating,
                reviews: pageConfig.reviews,
                shareOption: pageConfig.shareOption,
                pdf: pageConfig.uploadPdf, // Map frontend 'uploadPdf' to backend 'pdf'
                links: pageConfig.links,
                socialLinks: pageConfig.socialLinks,
                infoFields: pageConfig.infoFields,
                eventSchedule: pageConfig.eventSchedule,
                venue: pageConfig.venue,
                contactInfo: pageConfig.contactInfo,
                productContent: pageConfig.content,
                video: pageConfig.video,
                feedback: pageConfig.feedback,
                images: pageConfig.images,
                dynamicUrl: pageConfig.url,
                name: qrName,
                password,
                passwordExpiry,
                scanLimitEnabled,
                categories: pageConfig.categories,
                scanLimit: scanLimit ? Number(scanLimit) : null
            };

            if (isEditing) {
                await axios.put(`/api/qr/${editingQr._id}`, payload);
            } else {
                const response = await axios.post('/api/qr/dynamic', payload);
                // Store the generated shortId for immediate use
                if (response.data?.shortId) {
                    setGeneratedShortId(response.data.shortId);
                }
            }

            navigate('/');

        } catch (error) {
            console.error('Error generating QR:', error);
            alert('Failed to generate/update QR Code. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleContinue = () => {
        if (selectedType === 'app-store') {
            const googleUrl = (pageConfig?.appLinks?.google || '').trim();
            const appleUrl = (pageConfig?.appLinks?.apple || '').trim();

            const isGooglePresent = googleUrl !== '' && googleUrl !== 'https://';
            const isApplePresent = appleUrl !== '' && appleUrl !== 'https://';

            // 1. Check if at least one is present
            if (!isGooglePresent && !isApplePresent) {
                toast.error('Please provide at least one valid Play Store or App Store link');
                return;
            }

            // 2. If Google is present, validate it
            if (isGooglePresent) {
                const isValidGoogle = googleUrl.includes('play.google.com');
                if (!isValidGoogle) {
                    toast.error('Please enter a valid Play Store URL (e.g., play.google.com/...)');
                    return;
                }
            }

            // 3. If Apple is present, validate it
            if (isApplePresent) {
                const isValidApple = appleUrl.includes('apps.apple.com') || appleUrl.includes('itunes.apple.com');
                if (!isValidApple) {
                    toast.error('Please enter a valid App Store URL (e.g., apps.apple.com/...)');
                    return;
                }
            }
        }

        if (selectedType === 'dynamic-url') {
            const url = (pageConfig?.url || '').trim();
            if (!url) {
                setDynamicUrlError('URL is required');
                return;
            }
            // Basic URL validation
            try {
                new URL(url);
            } catch (_) {
                setDynamicUrlError('Please enter a valid URL');
                return;
            }
            // Clear error if valid
            setDynamicUrlError('');
        }

        if (selectedType === 'coupon') {
            const errors = {};
            const businessInfo = pageConfig?.businessInfo || {};
            const coupon = pageConfig?.coupon || {};

            // Validate Company Name
            if (!businessInfo.title?.trim()) {
                errors.companyName = 'Company name is required';
            }

            // Validate Headline
            if (!coupon.title?.trim()) {
                errors.headline = 'Headline is required';
            }

            // Validate Description
            if (!coupon.offer?.trim()) {
                errors.description = 'Description is required';
            }

            // Validate Coupon Code
            if (!coupon.code?.trim()) {
                errors.couponCode = 'Coupon code is required';
            }

            // Validate Effective Date
            if (!coupon.expiry?.trim()) {
                errors.effectiveDate = 'Effective date is required';
            }

            // Validate Button Title
            if (!coupon.buttonTitle?.trim()) {
                errors.buttonTitle = 'Button title is required';
            }

            // Validate Call to Action
            const callToAction = (coupon.callToAction || '').trim();
            if (!callToAction) {
                errors.callToAction = 'Call to action is required';
            } else {
                // Validate URL format
                try {
                    new URL(callToAction);
                } catch (_) {
                    errors.callToAction = 'Please enter a valid URL';
                }
            }

            // If there are errors, set them and prevent navigation
            if (Object.keys(errors).length > 0) {
                setCouponErrors(errors);
                toast.error('Please fill in all required fields');
                return;
            }

            // Clear errors if valid
            setCouponErrors({});
        }


        if (selectedType === 'business-card') {
            const social = pageConfig?.social || {};
            const errors = {};

            // Check if at least one social media channel has a value
            const filledChannels = Object.entries(social).filter(([key, value]) => value && value.trim() !== '');

            if (filledChannels.length === 0) {
                setBusinessCardErrors({ general: 'At least one social media channel is required' });
                toast.error('Please add at least one social media channel');
                return;
            }

            // Validate each filled channel's URL
            const channelNames = {
                website: 'Website',
                whatsapp: 'WhatsApp',
                facebook: 'Facebook',
                instagram: 'Instagram',
                linkedin: 'LinkedIn',
                twitter: 'Twitter',
                youtube: 'YouTube',
                snapchat: 'Snapchat',
                tiktok: 'TikTok',
                pinterest: 'Pinterest',
                telegram: 'Telegram',
                reddit: 'Reddit',
                behance: 'Behance',
                dribbble: 'Dribbble',
                spotify: 'Spotify',
                twitch: 'Twitch',
                discord: 'Discord',
                line: 'Line',
                tumblr: 'Tumblr'
            };

            filledChannels.forEach(([key, value]) => {
                try {
                    new URL(value.trim());
                } catch (_) {
                    const channelName = channelNames[key] || key;
                    errors[key] = `${channelName} URL is not valid`;
                }
            });

            // Validate Exchange Contact fields
            const exchange = pageConfig?.exchange || {};
            const standardFields = ['fullName', 'contactNumber', 'organization', 'email', 'jobTitle', 'website'];
            const hasSelectedStandardField = standardFields.some(field => exchange[field] === true);
            const hasCustomFields = exchange.customFields && exchange.customFields.length > 0;

            if (!hasSelectedStandardField && !hasCustomFields) {
                errors.exchange = 'At least one contact field is required in Exchange Contact';
            }

            // If there are URL validation errors or exchange errors, prevent navigation
            if (Object.keys(errors).length > 0) {
                setBusinessCardErrors(errors);
                if (errors.exchange) {
                    toast.error(errors.exchange);
                } else {
                    toast.error('Please fix invalid URLs in social media channels');
                }
                return;
            }

            // Clear errors if valid
            setBusinessCardErrors({});
        }


        if (selectedType === 'business-page') {
            const social = pageConfig?.social || {};
            const errors = {};

            // Check if at least one social media channel has a value
            const filledChannels = Object.entries(social).filter(([key, value]) => value && value.trim() !== '');

            if (filledChannels.length === 0) {
                setBusinessPageErrors({ general: 'At least one social media channel is required' });
                toast.error('Please add at least one social media channel');
                return;
            }

            // Validate each filled channel's URL
            const channelNames = {
                facebook: 'Facebook',
                instagram: 'Instagram',
                twitter: 'X',
                linkedin: 'LinkedIn',
                discord: 'Discord',
                twitch: 'Twitch',
                youtube: 'YouTube',
                whatsapp: 'WhatsApp',
                snapchat: 'Snapchat',
                tiktok: 'TikTok',
                pinterest: 'Pinterest',
                dribbble: 'Dribbble',
                telegram: 'Telegram',
                reddit: 'Reddit',
                spotify: 'Spotify'
            };

            filledChannels.forEach(([key, value]) => {
                try {
                    new URL(value.trim());
                } catch (_) {
                    const channelName = channelNames[key] || key;
                    errors[key] = `${channelName} URL is not valid`;
                }
            });

            // If there are URL validation errors, prevent navigation
            if (Object.keys(errors).length > 0) {
                setBusinessPageErrors(errors);
                toast.error('Please fix invalid URLs in social media channels');
                return;
            }

            // Clear errors if valid
            setBusinessPageErrors({});
        }

        if (selectedType === 'bio-page') {
            const basicInfo = pageConfig?.basicInfo || {};
            const social = pageConfig?.social || {};
            const errors = {};

            if (!basicInfo.name || !basicInfo.name.trim()) {
                errors.name = 'Name is required';
            } else if (basicInfo.name.length > 20) {
                errors.name = 'Name must be 20 characters or less';
            }

            if (!basicInfo.companyName || !basicInfo.companyName.trim()) {
                errors.companyName = 'Company name is required';
            }

            // Validate social media URLs
            const channelNames = {
                facebook: 'Facebook',
                instagram: 'Instagram',
                twitter: 'X (Twitter)',
                linkedin: 'LinkedIn',
                youtube: 'YouTube',
                whatsapp: 'WhatsApp',
                spotify: 'Spotify',
                website: 'Website',
                twitch: 'Twitch',
                github: 'GitHub',
                snapchat: 'Snapchat',
                dribbble: 'Dribbble',
                discord: 'Discord',
                pinterest: 'Pinterest',
                tiktok: 'TikTok',
                reddit: 'Reddit'
            };

            const filledChannels = Object.entries(social).filter(([key, value]) => value && value.trim() !== '');

            if (filledChannels.length === 0) {
                errors.general = 'At least one social media channel is required';
            }

            filledChannels.forEach(([key, value]) => {
                try {
                    new URL(value.trim());
                } catch (_) {
                    const channelName = channelNames[key] || key;
                    errors[key] = `${channelName} URL is not valid`;
                }
            });

            if (Object.keys(errors).length > 0) {
                setBioPageErrors(errors);
                if (errors.name) {
                    toast.error(errors.name);
                } else if (errors.companyName) {
                    toast.error(errors.companyName);
                } else if (errors.general) {
                    toast.error(errors.general);
                } else {
                    toast.error('Please fix invalid URLs in social media channels');
                }
                return;
            }

            setBioPageErrors({});
        }

        if (selectedType === 'lead-generation') {
            const basicInfo = pageConfig?.basicInfo || {};
            const thankYou = pageConfig?.thankYou || {};
            const errors = {};

            if (!basicInfo.companyName || !basicInfo.companyName.trim()) {
                errors.companyName = 'Company name is required';
            }

            if (!thankYou.message || !thankYou.message.trim()) {
                errors.message = 'Thank you message is required';
            }

            const form = pageConfig?.form || {};
            const customFields = pageConfig?.customFields || [];
            const hasAnyField = Object.values(form).some(v => v === true) || customFields.length > 0;

            if (!hasAnyField) {
                errors.form = 'At least one form field is required';
            }

            if (Object.keys(errors).length > 0) {
                setLeadGenErrors(errors);
                const firstError = errors.companyName || errors.message || errors.form;
                toast.error(firstError);
                return;
            }

            setLeadGenErrors({});
        }

        if (selectedType === 'rating') {
            const basicInfo = pageConfig?.basicInfo || {};
            const rating = pageConfig?.rating || {};
            const errors = {};

            if (!basicInfo.name || !basicInfo.name.trim()) {
                errors.name = 'Name is required';
            }

            if (!basicInfo.website || !basicInfo.website.trim()) {
                errors.website = 'Website is required';
            } else {
                const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                if (!urlPattern.test(basicInfo.website)) {
                    errors.website = 'Invalid URL format';
                }
            }

            if (!rating.question || !rating.question.trim()) {
                errors.question = 'Question is required';
            }

            const socialLinks = pageConfig?.socialLinks || [];
            if (socialLinks.length === 0) {
                errors.socialLinks = 'At least one social media channel is required';
            } else {
                socialLinks.forEach(link => {
                    if (link.url && link.url.trim() !== '') {
                        try {
                            new URL(link.url.trim());
                        } catch (_) {
                            errors[link.id] = 'Please enter a valid URL';
                        }
                    } else if (!link.url || link.url.trim() === '') {
                        errors[link.id] = 'URL is required';
                    }
                });
            }

            if (Object.keys(errors).length > 0) {
                setRatingErrors(errors);
                const hasUrlErrors = socialLinks.some(link => errors[link.id]);
                const firstError = errors.name || errors.website || errors.question || errors.socialLinks || (hasUrlErrors ? 'Please fix invalid URLs in social media channels' : null);
                toast.error(firstError);
                return;
            }

            setRatingErrors({});
        }

        if (selectedType === 'reviews') {
            const basicInfo = pageConfig?.basicInfo || {};
            const errors = {};

            if (!basicInfo.organizationName || !basicInfo.organizationName.trim()) {
                errors.organizationName = 'Organization name is required';
            }

            if (!basicInfo.title || !basicInfo.title.trim()) {
                errors.title = 'Title is required';
            }

            if (!basicInfo.website || !basicInfo.website.trim()) {
                errors.website = 'Website is required';
            } else {
                const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                if (!urlPattern.test(basicInfo.website)) {
                    errors.website = 'Invalid URL format';
                }
            }

            const social = pageConfig?.social || {};
            const filledChannels = Object.entries(social).filter(([key, value]) => value && value.trim() !== '');

            if (filledChannels.length === 0) {
                errors.socialLinks = 'At least one social media channel is required';
            }

            // Validate individual social media URLs
            const channelNames = {
                website: 'Website',
                facebook: 'Facebook',
                instagram: 'Instagram',
                twitter: 'X',
                linkedin: 'LinkedIn',
                tiktok: 'TikTok',
                youtube: 'YouTube',
                whatsapp: 'WhatsApp',
                snapchat: 'Snapchat',
                discord: 'Discord',
                twitch: 'Twitch',
                telegram: 'Telegram',
                pinterest: 'Pinterest',
                reddit: 'Reddit',
                spotify: 'Spotify',
                behance: 'Behance',
                line: 'Line'
            };

            filledChannels.forEach(([key, value]) => {
                try {
                    new URL(value.trim());
                } catch (_) {
                    const channelName = channelNames[key] || key;
                    errors[key] = `${channelName} URL is not valid`;
                }
            });

            const categories = pageConfig?.categories || [];
            categories.forEach((cat) => {
                if (!cat.name || !cat.name.trim()) {
                    errors[`category_${cat.id}`] = 'Category name is required';
                }

                if (!cat.subcategories || cat.subcategories.length === 0) {
                    errors[`category_${cat.id}_subcategories`] = 'At least one subcategory is required';
                } else {
                    cat.subcategories.forEach((sub, subIndex) => {
                        if (!sub || !sub.trim()) {
                            errors[`subcategory_${cat.id}_${subIndex}`] = 'Subcategory name is required';
                        }
                    });
                }
            });

            if (Object.keys(errors).length > 0) {
                setReviewsErrors(errors);
                const hasUrlErrors = filledChannels.some(([key]) => errors[key]);
                const hasCategoryErrors = categories.some(cat => errors[`category_${cat.id}`]);
                const hasSubcategoryErrors = categories.some(cat => (cat.subcategories || []).some((_, i) => errors[`subcategory_${cat.id}_${i}`]));
                const hasNoSubcategoryErrors = categories.some(cat => errors[`category_${cat.id}_subcategories`]);

                const firstError = errors.organizationName ||
                    errors.title ||
                    errors.website ||
                    errors.socialLinks ||
                    (hasUrlErrors ? 'Please fix invalid URLs in social media channels' : null) ||
                    (hasCategoryErrors ? 'Category name is required' : null) ||
                    (hasNoSubcategoryErrors ? 'Each category must have at least one subcategory' : null) ||
                    (hasSubcategoryErrors ? 'Subcategory name is required' : null);

                toast.error(firstError);
                return;
            }

            setReviewsErrors({});
        }

        if (selectedType === 'social-media') {
            const errors = {};
            const basicInfo = pageConfig?.basicInfo || {};

            if (!basicInfo.headline || !basicInfo.headline.trim()) {
                errors.headline = 'Headline is required';
            }

            const social = pageConfig?.social || {};
            const filledChannels = Object.entries(social).filter(([key, value]) => value !== undefined && value !== null);

            if (filledChannels.length === 0) {
                errors.general = 'At least one social media profile is required';
            } else {
                // Validate each individual channel's URL
                filledChannels.forEach(([key, value]) => {
                    // Only validate if it's a URL key (e.g., websiteUrl, facebookUrl)
                    if (key.endsWith('Url')) {
                        if (!value || value.trim() === '') {
                            errors[key] = 'URL is required';
                        } else {
                            try {
                                const url = new URL(value.trim());
                                if (!['http:', 'https:'].includes(url.protocol)) {
                                    errors[key] = 'Please enter a valid URL (starting with http/https)';
                                }
                            } catch (_) {
                                errors[key] = 'Please enter a valid URL';
                            }
                        }
                    }
                });
            }

            if (Object.keys(errors).length > 0) {
                setSocialMediaErrors(errors);
                const hasUrlErrors = filledChannels.some(([key]) => errors[key]);
                const firstError = errors.headline || errors.general || (hasUrlErrors ? 'Please fix invalid URLs in social media channels' : null);
                if (firstError) toast.error(firstError);
                return;
            }

            setSocialMediaErrors({});
        }

        if (selectedType === 'pdf') {
            const errors = {};
            const basicInfo = pageConfig?.basicInfo || {};
            const uploadPdf = pageConfig?.uploadPdf || {};

            if (!basicInfo.companyName || !basicInfo.companyName.trim()) {
                errors.companyName = 'Company name is required';
            }

            if (!basicInfo.pdfTitle || !basicInfo.pdfTitle.trim()) {
                errors.pdfTitle = 'PDF Title is required';
            }

            if (!uploadPdf.pdfTitle || !uploadPdf.pdfTitle.trim()) {
                errors.uploadPdfTitle = 'PDF Title is required';
            }

            if (!uploadPdf.pdfUrl && !uploadPdf.uploadedFile) {
                errors.pdfSource = 'Please provide a PDF URL or upload a file';
            }

            if (!uploadPdf.buttonTitle || !uploadPdf.buttonTitle.trim()) {
                errors.buttonTitle = 'Button Title is required';
            }

            if (Object.keys(errors).length > 0) {
                setPdfErrors(errors);
                const firstError = errors.companyName || errors.pdfTitle || errors.uploadPdfTitle || errors.pdfSource || errors.buttonTitle;
                toast.error(firstError);
                return;
            }

            setPdfErrors({});
        }

        if (selectedType === 'multiple-links') {
            const errors = {};
            const basicInfo = pageConfig?.basicInfo || {};
            const socialLinks = pageConfig?.socialLinks || [];

            if (!basicInfo.headline || !basicInfo.headline.trim()) {
                errors.headline = 'Headline is required';
            }

            if (socialLinks.length === 0) {
                errors.socialLinks = 'At least one social media channel is required';
            } else {
                const socialErrors = {};
                socialLinks.forEach(link => {
                    if (!link.url || !link.url.trim()) {
                        const platformName = link.platform ? link.platform.charAt(0).toUpperCase() + link.platform.slice(1) : 'Social Media';
                        socialErrors[link.id] = `${platformName} URL is required`;
                    } else {
                        try {
                            const url = new URL(link.url);
                            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                                socialErrors[link.id] = 'URL must start with http:// or https://';
                            }
                        } catch (e) {
                            socialErrors[link.id] = 'Please enter a valid URL';
                        }
                    }
                });
                if (Object.keys(socialErrors).length > 0) {
                    errors.socialLinks = socialErrors;
                }
            }

            const links = pageConfig?.links || [];
            if (links.length === 0) {
                errors.links = 'At least one link is required';
            } else {
                const linkErrors = {};
                links.forEach(link => {
                    const itemErrors = {};
                    if (!link.title || !link.title.trim()) {
                        itemErrors.title = 'Title is required';
                    }
                    if (!link.url || !link.url.trim()) {
                        const linkName = link.title && link.title.trim() ? link.title : 'Link';
                        itemErrors.url = `${linkName} URL is required`;
                    } else {
                        try {
                            const url = new URL(link.url);
                            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                                itemErrors.url = 'URL must start with http:// or https://';
                            }
                        } catch (e) {
                            itemErrors.url = 'Please enter a valid URL';
                        }
                    }
                    if (Object.keys(itemErrors).length > 0) {
                        linkErrors[link.id] = itemErrors;
                    }
                });
                if (Object.keys(linkErrors).length > 0) {
                    errors.links = linkErrors;
                }
            }

            if (Object.keys(errors).length > 0) {
                setMultipleLinksErrors(errors);

                let toastMessage = '';
                if (errors.headline) {
                    toastMessage = `Basic Info: ${errors.headline}`;
                } else if (errors.links) {
                    if (typeof errors.links === 'string') {
                        toastMessage = `Links: ${errors.links}`;
                    } else {
                        const firstLinkErrorObj = Object.values(errors.links)[0];
                        const firstLinkMsg = Object.values(firstLinkErrorObj)[0];
                        toastMessage = `Links: ${firstLinkMsg}`;
                    }
                } else if (errors.socialLinks) {
                    if (typeof errors.socialLinks === 'string') {
                        toastMessage = `Social Media: ${errors.socialLinks}`;
                    } else {
                        const firstSocialMsg = Object.values(errors.socialLinks)[0];
                        toastMessage = `Social Media: ${firstSocialMsg}`;
                    }
                }

                toast.error(toastMessage || 'Please fix the errors');
                return;
            }

            setMultipleLinksErrors({});
        }

        if (selectedType === 'event') {
            const errors = {};
            if (!pageConfig.businessInfo?.companyName) {
                errors.businessInfo = { ...errors.businessInfo, companyName: 'Organization Name is required' };
            }
            if (!pageConfig.businessInfo?.headline) {
                errors.businessInfo = { ...errors.businessInfo, headline: 'Event Name is required' };
            }
            if (!pageConfig.venue?.location) {
                errors.venue = { ...errors.venue, location: 'Location is required' };
            }
            if (!pageConfig.facilities || pageConfig.facilities.length === 0) {
                errors.facilities = 'At least one facility must be selected';
            }

            const socialLinks = pageConfig?.socialLinks || [];
            if (socialLinks.length === 0) {
                errors.socialLinks = 'At least one social media channel is required';
            } else {
                const socialErrors = {};
                socialLinks.forEach(link => {
                    if (!link.url || !link.url.trim()) {
                        socialErrors[link.id] = 'URL is required';
                    } else {
                        try {
                            const url = new URL(link.url);
                            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                                socialErrors[link.id] = 'URL must start with http:// or https://';
                            }
                        } catch (e) {
                            socialErrors[link.id] = 'Please enter a valid URL';
                        }
                    }
                });
                if (Object.keys(socialErrors).length > 0) {
                    errors.socialLinks = socialErrors;
                }
            }

            if (Object.keys(errors).length > 0) {
                setEventErrors(errors);
                const firstError = errors.businessInfo?.companyName ||
                    errors.businessInfo?.headline ||
                    errors.venue?.location ||
                    errors.facilities ||
                    (typeof errors.socialLinks === 'string' ? errors.socialLinks : (errors.socialLinks ? Object.values(errors.socialLinks)[0] : null));
                toast.error(firstError);
                return;
            }
            setEventErrors({});
        }

        if (selectedType === 'password-protected') {
            const errors = {};
            const infoFields = pageConfig?.infoFields || [];

            if (infoFields.length === 0) {
                errors.infoFields = 'At least one information field is required';
            } else {
                const fieldErrors = {};
                infoFields.forEach(field => {
                    const itemErrors = {};
                    if (!field.name || !field.name.trim()) {
                        itemErrors.name = 'Field Name is required';
                    }
                    if (!field.value || !field.value.trim()) {
                        itemErrors.value = 'Field Information is required';
                    }
                    if (Object.keys(itemErrors).length > 0) {
                        fieldErrors[field.id] = itemErrors;
                    }
                });
                if (Object.keys(fieldErrors).length > 0) {
                    errors.infoFields = fieldErrors;
                }
            }

            if (Object.keys(errors).length > 0) {
                setPasswordProtectedErrors(errors);
                const firstError = typeof errors.infoFields === 'string'
                    ? errors.infoFields
                    : Object.values(Object.values(errors.infoFields)[0])[0];
                toast.error(firstError);
                return;
            }

            setPasswordProtectedErrors({});
        }

        if (selectedType === 'product-page') {
            const errors = {};
            if (!pageConfig.basicInfo?.companyName || !pageConfig.basicInfo.companyName.trim()) {
                errors.companyName = 'Company Name is required';
            }
            if (!pageConfig.basicInfo?.productTitle || !pageConfig.basicInfo.productTitle.trim()) {
                errors.productTitle = 'Product Title is required';
            }
            if (!pageConfig.basicInfo?.price || !pageConfig.basicInfo.price.trim()) {
                errors.price = 'Price is required';
            }
            if (!pageConfig.basicInfo?.currency || !pageConfig.basicInfo.currency.trim()) {
                errors.currency = 'Currency is required';
            }

            const items = pageConfig.content?.items || [];
            const itemErrors = {};
            items.forEach(item => {
                if (!item.title || !item.title.trim()) {
                    itemErrors[item.id] = 'Title is required';
                }
            });

            if (Object.keys(itemErrors).length > 0) {
                errors.content = itemErrors;
            }

            if (!pageConfig.content?.buttonText || !pageConfig.content.buttonText.trim()) {
                errors.buttonText = 'Button Text is required';
            }

            if (!pageConfig.content?.buttonLink || !pageConfig.content.buttonLink.trim()) {
                errors.buttonLink = 'Button Link is required';
            } else {
                try {
                    new URL(pageConfig.content.buttonLink.trim());
                } catch (_) {
                    errors.buttonLink = 'Please enter a valid URL (starting with http/https)';
                }
            }

            if (!pageConfig.video?.title || !pageConfig.video.title.trim()) {
                errors.videoTitle = 'Video Title is required';
            }

            if (!pageConfig.video?.url || !pageConfig.video.url.trim()) {
                errors.videoUrl = 'Video Link or Upload is required';
            }

            if (!pageConfig.feedback?.title || !pageConfig.feedback.title.trim()) {
                errors.feedbackTitle = 'Feedback Title is required';
            }

            // Contact Validation
            const contact = pageConfig.contact || {};
            console.log('DEBUG: Contact Object:', JSON.stringify(contact, null, 2));

            const contactErrors = {};
            let hasAtLeastOneContact = false;

            // Helper for URL validation
            const isValidUrl = (string) => {
                try {
                    new URL(string);
                    return true;
                } catch (_) {
                    return false;
                }
            };

            // Helper for Email validation
            const isValidEmail = (email) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            };

            // Check Phone
            if (contact.phone !== null && contact.phone !== undefined) {
                console.log('DEBUG: Checking Phone:', contact.phone);
                hasAtLeastOneContact = true;
                if (!String(contact.phone).trim()) {
                    contactErrors.phone = 'Phone number cannot be empty';
                }
            }

            // Check Email
            if (contact.email !== null && contact.email !== undefined) {
                console.log('DEBUG: Checking Email:', contact.email);
                hasAtLeastOneContact = true;
                if (!String(contact.email).trim()) {
                    contactErrors.email = 'Email cannot be empty';
                } else if (!isValidEmail(contact.email)) {
                    contactErrors.email = 'Please enter a valid email address';
                }
            }

            // Check Website
            if (contact.website !== null && contact.website !== undefined) {
                console.log('DEBUG: Checking Website:', contact.website);
                hasAtLeastOneContact = true;
                if (!String(contact.website).trim()) {
                    contactErrors.website = 'Website URL cannot be empty';
                } else if (!isValidUrl(contact.website)) {
                    contactErrors.website = 'Please enter a valid URL (starting with http/https)';
                }
            }

            // Check Socials
            if (contact.socials && Array.isArray(contact.socials) && contact.socials.length > 0) {
                hasAtLeastOneContact = true;
                contact.socials.forEach(social => {
                    if (!social.url || !String(social.url).trim()) {
                        contactErrors[`social_${social.platform}`] = (`${social.platform} URL cannot be empty`);
                    } else if (!isValidUrl(social.url)) {
                        contactErrors[`social_${social.platform}`] = (`Please enter a valid URL for ${social.platform}`);
                    }
                });
            }

            if (!hasAtLeastOneContact) {
                errors.contactGeneral = 'Please add at least one contact method';
            }

            if (Object.keys(contactErrors).length > 0) {
                errors.contact = contactErrors;
            }

            if (Object.keys(errors).length > 0) {
                setProductErrors(errors);
                const firstError = errors.companyName ||
                    errors.productTitle ||
                    errors.currency ||
                    errors.price ||
                    (errors.content ? Object.values(errors.content)[0] : null) ||
                    errors.buttonText ||
                    errors.buttonLink ||
                    errors.videoTitle ||
                    errors.videoUrl ||
                    errors.feedbackTitle ||
                    errors.contactGeneral ||
                    (errors.contact ? Object.values(errors.contact)[0] : null);
                toast.error(firstError);
                return;
            }
            setProductErrors({});
        }

        setActiveStep('design');
    };

    const typeInfo = qrTypes.find(t => t.id === selectedType) || qrTypes[0];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', color: '#f8fafc' }}>
            
            {/* Left Panel */}
            <div style={{
                flex: 1,
                padding: isMobile ? '1rem' : '2rem',
                overflowY: isMobile ? 'visible' : 'auto',
                height: isMobile ? 'auto' : '100vh',
                display: isMobile && activeTab !== 'generator' ? 'none' : 'block',
                marginBottom: isMobile ? '80px' : '0'
            }}>
                <div style={{ maxWidth: '100%', margin: '0 auto' }}>

                    {/* Header / Nav */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                if (activeStep === 'design') {
                                    setActiveStep('content');
                                } else {
                                    // Check for unsaved changes before navigating back
                                    if (hasUnsavedChanges) {
                                        setShowUnsavedModal(true);
                                    } else {
                                        navigate(-1);
                                    }
                                }
                            }}
                            style={{
                                background: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '12px',
                                width: '44px',
                                height: '44px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#f8fafc'
                            }}
                        >
                            <ChevronLeft size={20} />
                        </motion.button>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ color: '#ffa305', fontWeight: '600', fontSize: '0.9rem' }}>
                                {activeStep === 'content' ? 'Content Configuration' : 'Design QR Code'}
                            </span>
                            <div style={{ width: '150px', height: '4px', background: '#334155', borderRadius: '2px', marginTop: '0.5rem', position: 'relative' }}>
                                <div style={{
                                    width: activeStep === 'content' ? '70px' : '100%',
                                    height: '100%',
                                    background: '#ffa305',
                                    borderRadius: '2px',
                                    position: 'absolute',
                                    left: 0,
                                    top: 0
                                }}></div>
                            </div>
                        </div>

                        <div style={{ width: '40px' }}></div>
                    </div>

                    {/* Step Content */}
                    {activeStep === 'content' ? (
                        <>
                            {selectedType === 'app-store' && (
                                <AppStoreConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'menu' && (
                                <MenuConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'coupon' && (
                                <CouponConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={couponErrors}
                                    setErrors={setCouponErrors}
                                />
                            )}

                            {selectedType === 'business-card' && (
                                <BusinessCardConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={businessCardErrors}
                                    setErrors={setBusinessCardErrors}
                                />
                            )}

                            {selectedType === 'business-page' && (
                                <BusinessPageConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={businessPageErrors}
                                    setErrors={setBusinessPageErrors}
                                />
                            )}

                            {selectedType === 'bio-page' && (
                                <BioPageConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={bioPageErrors}
                                    setErrors={setBioPageErrors}
                                />
                            )}

                            {selectedType === 'survey' && (
                                <SurveyConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'lead-generation' && (
                                <LeadGenerationConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={leadGenErrors}
                                    setErrors={setLeadGenErrors}
                                />
                            )}

                            {selectedType === 'rating' && (
                                <RatingConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={ratingErrors}
                                    setErrors={setRatingErrors}
                                />
                            )}

                            {selectedType === 'reviews' && (
                                <ReviewsConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={reviewsErrors}
                                    setErrors={setReviewsErrors}
                                />
                            )}

                            {selectedType === 'social-media' && (
                                <SocialMediaConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={socialMediaErrors}
                                    setErrors={setSocialMediaErrors}
                                />
                            )}

                            {selectedType === 'pdf' && (
                                <PDFConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={pdfErrors}
                                    setErrors={setPdfErrors}
                                />
                            )}

                            {selectedType === 'multiple-links' && (
                                <MultipleLinksConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={multipleLinksErrors}
                                    setErrors={setMultipleLinksErrors}
                                />
                            )}

                            {selectedType === 'custom-type' && (
                                <CustomConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'password-protected' && (
                                <PasswordProtectedConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={passwordProtectedErrors}
                                    setErrors={setPasswordProtectedErrors}
                                />
                            )}

                            {selectedType === 'event' && (
                                <EventConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={eventErrors}
                                    setErrors={setEventErrors}
                                />
                            )}

                            {selectedType === 'dynamic-url' && (
                                <DynamicUrlConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    error={dynamicUrlError}
                                    setError={setDynamicUrlError}
                                />
                            )}

                            {selectedType === 'video' && (
                                <VideoConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'image' && (
                                <ImageConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'product-page' && (
                                <ProductPageConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                    errors={productErrors}
                                    setErrors={setProductErrors}
                                />
                            )}

                            {selectedType !== 'app-store' && selectedType !== 'menu' && selectedType !== 'coupon' && selectedType !== 'business-card' && selectedType !== 'business-page' && selectedType !== 'bio-page' && selectedType !== 'survey' && selectedType !== 'lead-generation' && selectedType !== 'rating' && selectedType !== 'reviews' && selectedType !== 'social-media' && selectedType !== 'pdf' && selectedType !== 'multiple-links' && selectedType !== 'custom-type' && selectedType !== 'password-protected' && selectedType !== 'event' && selectedType !== 'dynamic-url' && selectedType !== 'video' && selectedType !== 'image' && selectedType !== 'product-page' && (

                                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                                    Configuration for {typeInfo.name} is coming soon.
                                </div>
                            )}

                            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleContinue}
                                    style={{
                                        background: '#ffa305',
                                        border: 'none',
                                        padding: '0.9rem 2rem',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.2s ease',
                                        color: '#000',
                                        borderRadius: '12px',
                                        fontWeight: '700'
                                    }}
                                >
                                    Continue <ArrowRight size={18} />
                                </motion.button>
                            </div>
                        </>
                    ) : (
                        <DesignQR
                            design={qrDesign}
                            setDesign={setQrDesign}
                            qrName={qrName}
                            setQrName={setQrName}
                            qrNameRef={qrNameRef}
                            qrNameError={qrNameError}
                            setQrNameError={setQrNameError}
                            onSave={handleSave}
                            isGenerating={isGenerating}
                            isEditing={isEditing}
                            password={password}
                            setPassword={setPassword}
                            passwordExpiry={passwordExpiry}
                            setPasswordExpiry={setPasswordExpiry}
                            scanLimitEnabled={scanLimitEnabled}
                            setScanLimitEnabled={setScanLimitEnabled}
                            scanLimit={scanLimit}
                            setScanLimit={setScanLimit}
                        />
                    )}
                </div>
            </div>

            {/* Right Panel - Preview */}
            <div style={{
                width: isMobile ? '100%' : '400px',
                background: '#1e293b',
                borderLeft: isMobile ? 'none' : '1px solid #334155',
                display: isMobile ? (activeTab === 'preview' ? 'flex' : 'none') : 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: isMobile ? '1rem' : '2rem',
                position: isMobile ? 'relative' : 'sticky',
                top: 0,
                height: isMobile ? 'auto' : '100vh',
                overflowY: isMobile ? 'visible' : 'hidden',
                marginBottom: isMobile ? '80px' : '0'
            }}>
                <div style={{ marginBottom: '2rem' }}></div>

                {activeStep === 'content' ? (
                    <>
                        <div style={{
                            transform: 'scale(0.85)',
                            transformOrigin: 'top center',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            zIndex: 2
                        }}>
                            <MobilePreview
                                config={pageConfig}
                                qrDesign={qrDesign}
                                qrValue={getQRValue()}
                                isEditor={true}
                            />
                        </div>
                        {/* Background QR for Content Step */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            opacity: 0.1,
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}>
                            <QRRenderer
                                value={getQRValue()}
                                design={{
                                    ...pageConfig.design,
                                    ...qrDesign
                                }}
                                size={350}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ position: 'relative', width: '100%', marginTop: '2rem' }}>
                            <div style={{
                                position: 'absolute',
                                top: '-12px',
                                left: '20px',
                                background: '#1e293b',
                                border: '1px solid #334155',
                                color: '#ffa305',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                padding: '2px 8px',
                                borderRadius: '8px',
                                zIndex: 10,
                                textTransform: 'uppercase'
                            }}>
                                {typeInfo.name}
                            </div>

                            <div style={{
                                background: '#1e293b',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid #334155',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                <QRRenderer
                                    ref={qrRef}
                                    value={getQRValue()}
                                    design={{
                                        ...pageConfig.design,
                                        ...qrDesign
                                    }}
                                    size={240}
                                />
                            </div>
                        </div>

                        <div style={{
                            width: '90%',
                            marginTop: '1rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.5rem'
                            }}>
                                <div style={{
                                    background: scannability.bgColor,
                                    color: scannability.color,
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    border: `1px solid ${scannability.color}33`,
                                    textTransform: 'uppercase'
                                }}>
                                    {scannability.text}
                                </div>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8' }}>Scanability</span>
                            </div>

                            <div style={{
                                width: '100%',
                                height: '8px',
                                background: '#0f172a',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: '1px solid #334155'
                            }}>
                                <div style={{
                                    width: `${scannability.score}%`,
                                    height: '100%',
                                    background: scannability.color,
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease'
                                }}></div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Mobile Bottom Navigation */}
            {isMobile && (
                <div style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '70px',
                    background: '#0f172a',
                    display: 'flex',
                    borderTop: '1px solid #334155',
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.3)',
                    zIndex: 1000
                }}>
                    <div
                        onClick={() => setActiveTab('generator')}
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            color: activeTab === 'generator' ? '#ffa305' : '#94a3b8',
                            cursor: 'pointer'
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                        <span style={{ fontSize: '0.75rem', fontWeight: activeTab === 'generator' ? '600' : '400' }}>Generator</span>
                    </div>
                    <div
                        onClick={() => setActiveTab('preview')}
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            color: activeTab === 'preview' ? '#ffa305' : '#94a3b8',
                            cursor: 'pointer'
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" /><circle cx="12" cy="12" r="3" /></svg>
                        <span style={{ fontSize: '0.75rem', fontWeight: activeTab === 'preview' ? '600' : '400' }}>Preview</span>
                    </div>
                </div>
            )}

            {/* Unsaved Changes Modal */}
            {showUnsavedModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div
                        className="modal-entry-animation"
                        style={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '16px',
                            padding: '2rem',
                            maxWidth: '500px',
                            width: '90%',
                            position: 'relative',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setShowUnsavedModal(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.5rem',
                                color: '#94a3b8',
                                cursor: 'pointer',
                                padding: '0',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ×
                        </button>

                        {/* Modal content */}
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                color: '#fff',
                                marginBottom: '1rem',
                                marginTop: '0'
                            }}>
                                Are you sure?
                            </h2>
                            <p style={{
                                fontSize: '1rem',
                                color: '#94a3b8',
                                marginBottom: '2rem',
                                lineHeight: '1.5'
                            }}>
                                Are you sure to discard this page? This will lose all the change you made.
                            </p>

                            {/* Buttons */}
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'center'
                            }}>
                                <button
                                    onClick={() => setShowUnsavedModal(false)}
                                    style={{
                                        padding: '0.75rem 2.5rem',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        color: '#fff',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#0f172a';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    No
                                </button>
                                <button
                                    onClick={() => {
                                        setShowUnsavedModal(false);
                                        navigate('/select-template');
                                    }}
                                    style={{
                                        padding: '0.75rem 2.5rem',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#000',
                                        backgroundColor: '#ffa305',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#ffb53a';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#ffa305';
                                    }}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Generator;

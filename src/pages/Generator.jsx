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
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedShortId, setGeneratedShortId] = useState(null); // Store shortId after creation

    // Helper function to generate QR value URL for preview/display
    const getQRValue = () => {
        const baseUrl = window.location.origin.includes('localhost')
            ? 'http://localhost:5173'
            : window.location.origin;

        // Priority: generatedShortId (after creation) > editingQr.shortId (edit mode) > preview
        const id = generatedShortId || (isEditing ? editingQr?.shortId : null);

        if (!id) {
            // For preview during creation, use a preview URL that matches the pattern
            if (selectedType === 'app-store') {
                return `${baseUrl}/app/preview`;
            } else if (selectedType === 'menu' || selectedType === 'business-page' || selectedType === 'custom-type' || selectedType === 'coupon' || selectedType === 'business-card') {
                return `${baseUrl}/view/preview`;
            } else {
                const backendUrl = window.location.origin.includes('localhost')
                    ? 'http://localhost:3000'
                    : window.location.origin.replace(':5173', ':3000');
                return `${backendUrl}/preview`;
            }
        }

        // Generate actual URL based on type
        if (selectedType === 'app-store') {
            return `${baseUrl}/app/${id}`;
        } else if (selectedType === 'menu' || selectedType === 'business-page' || selectedType === 'custom-type' || selectedType === 'coupon' || selectedType === 'business-card') {
            return `${baseUrl}/view/${id}`;
        } else {
            const backendUrl = window.location.origin.includes('localhost')
                ? 'http://localhost:3000'
                : window.location.origin.replace(':5173', ':3000');
            return `${backendUrl}/${id}`;
        }
    };

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

        if (editingQr) {
            setQrName(editingQr.name || '');

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
            setPageConfig(prev => ({
                ...defaultConfig,
                ...prev,
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
                basicInfo: editingQr.basicInfo || defaultConfig.basicInfo,
                form: editingQr.form || defaultConfig.form,
                customFields: editingQr.customFields || defaultConfig.customFields,
                thankYou: editingQr.thankYou || defaultConfig.thankYou,
                rating: editingQr.rating || defaultConfig.rating,
                reviews: editingQr.reviews || defaultConfig.reviews,
                shareOption: editingQr.shareOption || defaultConfig.shareOption,
                uploadPdf: editingQr.pdf || defaultConfig.uploadPdf,
                links: editingQr.links || defaultConfig.links,
                socialLinks: editingQr.socialLinks || defaultConfig.socialLinks,
                infoFields: editingQr.infoFields || defaultConfig.infoFields,
                eventSchedule: editingQr.eventSchedule || defaultConfig.eventSchedule,
                venue: editingQr.venue || defaultConfig.venue,
                facilities: editingQr.facilities || defaultConfig.facilities,
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
            }));

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
                setQrDesign({
                    dots: { ...defaultDesign.dots, ...(editingQr.design.dots || {}) },
                    cornersSquare: { ...defaultDesign.cornersSquare, ...(editingQr.design.cornersSquare || {}) },
                    cornersDot: { ...defaultDesign.cornersDot, ...(editingQr.design.cornersDot || {}) },
                    background: { ...defaultDesign.background, ...(editingQr.design.background || {}) },
                    image: { ...defaultDesign.image, ...(editingQr.design.image || {}) },
                    imageOptions: { ...defaultDesign.imageOptions, ...(editingQr.design.imageOptions || {}) }
                });
            }
        } else {
            setPageConfig({ ...defaultConfig, type: selectedType });
        }
    }, [selectedType, editingQr]);

    const handleSave = async () => {
        if (!qrName.trim()) {
            alert('Please name your QR Code');
            return;
        }

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
                const baseUrl = window.location.origin.includes('localhost')
                    ? 'http://localhost:5173'
                    : window.location.origin;

                if (selectedType === 'app-store') {
                    qrDataUrl = `${baseUrl}/app/${editingQr.shortId}`;
                } else if (selectedType === 'menu' || selectedType === 'business-page' || selectedType === 'custom-type' || selectedType === 'coupon' || selectedType === 'business-card' || selectedType === 'bio-page' || selectedType === 'lead-generation' || selectedType === 'rating' || selectedType === 'reviews' || selectedType === 'social-media' || selectedType === 'pdf' || selectedType === 'multiple-links' || selectedType === 'password-protected' || selectedType === 'event' || selectedType === 'product-page' || selectedType === 'video' || selectedType === 'image') {
                    qrDataUrl = `${baseUrl}/view/${editingQr.shortId}`;
                } else {
                    const backendUrl = window.location.origin.includes('localhost')
                        ? 'http://localhost:3000'
                        : window.location.origin.replace(':5173', ':3000');
                    qrDataUrl = `${backendUrl}/${editingQr.shortId}`;
                }
            }
            // For new QRs, backend will generate correct URL in createDynamicQR

            const payload = {
                type: selectedType,
                qrImage: qrImageBase64,
                data: qrDataUrl,
                design: {
                    ...pageConfig.design,
                    ...qrDesign,
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
                facilities: pageConfig.facilities,
                contactInfo: pageConfig.contactInfo,
                productContent: pageConfig.content,
                video: pageConfig.video,
                feedback: pageConfig.feedback,
                images: pageConfig.images,
                dynamicUrl: pageConfig.url,
                name: qrName
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

    const typeInfo = qrTypes.find(t => t.id === selectedType) || qrTypes[0];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            {/* Left Panel */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', height: '100vh' }}>
                <div style={{ maxWidth: '100%', margin: '0 auto' }}>

                    {/* Header / Nav */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <button
                            onClick={() => {
                                if (activeStep === 'design') setActiveStep('content');
                                else navigate(-1);
                            }}
                            style={{
                                background: '#e0f2fe',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#0ea5e9'
                            }}
                        >
                            ←
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ color: '#8b5cf6', fontWeight: '600', fontSize: '0.9rem' }}>
                                {activeStep === 'content' ? 'Content Configuration' : 'Design QR Code'}
                            </span>
                            <div style={{ width: '150px', height: '4px', background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)', borderRadius: '2px', marginTop: '0.5rem' }}></div>
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
                                />
                            )}

                            {selectedType === 'business-card' && (
                                <BusinessCardConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'business-page' && (
                                <BusinessPageConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'bio-page' && (
                                <BioPageConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
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
                                />
                            )}

                            {selectedType === 'rating' && (
                                <RatingConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'reviews' && (
                                <ReviewsConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'social-media' && (
                                <SocialMediaConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'pdf' && (
                                <PDFConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'multiple-links' && (
                                <MultipleLinksConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
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
                                />
                            )}

                            {selectedType === 'event' && (
                                <EventConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
                                />
                            )}

                            {selectedType === 'dynamic-url' && (
                                <DynamicUrlConfig
                                    config={pageConfig}
                                    onChange={setPageConfig}
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
                                />
                            )}

                            {selectedType !== 'app-store' && selectedType !== 'menu' && selectedType !== 'coupon' && selectedType !== 'business-card' && selectedType !== 'business-page' && selectedType !== 'bio-page' && selectedType !== 'survey' && selectedType !== 'lead-generation' && selectedType !== 'rating' && selectedType !== 'reviews' && selectedType !== 'social-media' && selectedType !== 'pdf' && selectedType !== 'multiple-links' && selectedType !== 'custom-type' && selectedType !== 'password-protected' && selectedType !== 'event' && selectedType !== 'dynamic-url' && selectedType !== 'video' && selectedType !== 'image' && selectedType !== 'product-page' && (

                                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                                    Configuration for {typeInfo.name} is coming soon.
                                </div>
                            )}

                            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                                <button
                                    onClick={() => setActiveStep('design')}
                                    style={{
                                        background: '#8b5cf6',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '0.75rem 3rem',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                                    }}
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    ) : (
                        <DesignQR
                            design={qrDesign}
                            setDesign={setQrDesign}
                            qrName={qrName}
                            setQrName={setQrName}
                            onSave={handleSave}
                            isGenerating={isGenerating}
                            isEditing={isEditing}
                        />
                    )}
                </div>
            </div>

            {/* Right Panel - Preview */}
            <div style={{
                width: '400px',
                background: 'linear-gradient(180deg, #eef2ff 0%, #f3e8ff 100%)',
                borderLeft: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem',
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflowY: 'hidden'
            }}>
                <div style={{ alignSelf: 'flex-end', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', padding: '0.25rem 0.75rem 0.25rem 0.25rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <div style={{ width: '32px', height: '32px', background: '#06b6d4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>H</div>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>Dashboard</span>
                    </div>
                </div>

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
                                background: '#fff',
                                border: '1px solid #8b5cf6',
                                color: '#8b5cf6',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                zIndex: 10,
                                textTransform: 'uppercase'
                            }}>
                                {typeInfo.name}
                            </div>

                            <div style={{
                                background: '#fff',
                                padding: '2rem',
                                borderRadius: '4px',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
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
                            background: '#dcfce7',
                            color: '#166534',
                            padding: '0.25rem 1rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            border: '1px solid #bbf7d0'
                        }}>
                            Scannability: EXCELLENT
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};


export default Generator;

import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReusableDesignAccordion from './ReusableDesignAccordion';
import ImageUploadModal from './ImageUploadModal';

const LeadGenerationConfig = ({ config, onChange, errors = {}, setErrors }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isThankYouOpen, setIsThankYouOpen] = useState(false);

    // Reusable Upload Modal State
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadModalTempImage, setUploadModalTempImage] = useState(null);
    const [uploadModalFileName, setUploadModalFileName] = useState('');
    const [isHoveringUpload, setIsHoveringUpload] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

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
    const customFields = config.customFields || [];
    const thankYou = config.thankYou || {};

    const primaryColor = design.color?.header || '#6F0101';
    const secondaryColor = design.color?.light || '#FFFFFF';

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

    const handleHeaderImageUpdate = (url) => {
        onChange(prev => ({
            ...prev,
            design: {
                ...prev.design,
                headerImage: { url }
            }
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setUploadModalTempImage(reader.result);
            setUploadModalFileName(file.name);
            setIsUploadModalOpen(true);
        };
        reader.readAsDataURL(file);
        e.target.value = null;
    };

    const handleUploadModalSave = (url) => {
        handleHeaderImageUpdate(url);
        setIsUploadModalOpen(false);
        setUploadModalTempImage(null);
        setUploadModalFileName('');
    };

    const handleBasicInfoUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            basicInfo: {
                ...prev.basicInfo,
                [key]: value
            }
        }));
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[key];
                return newErrors;
            });
        }
    };

    const handleFormFieldToggle = (field) => {
        onChange(prev => ({
            ...prev,
            form: {
                ...prev.form,
                [field]: !prev.form?.[field]
            }
        }));
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.form;
                return newErrors;
            });
        }
    };

    const handleThankYouUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            thankYou: {
                ...prev.thankYou,
                [key]: value
            }
        }));
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[key === 'message' ? 'message' : key];
                return newErrors;
            });
        }
    };

    const handleAddCustomField = () => {
        const newField = {
            id: Date.now().toString(),
            type: 'text',
            label: ''
        };
        onChange(prev => ({
            ...prev,
            customFields: [...(prev.customFields || []), newField]
        }));
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.form;
                return newErrors;
            });
        }
    };

    const handleCustomFieldUpdate = (id, field, value) => {
        const updatedFields = customFields.map(f =>
            f.id === id ? { ...f, [field]: value } : f
        );
        onChange(prev => ({
            ...prev,
            customFields: updatedFields
        }));
    };

    const handleCustomFieldRemove = (id) => {
        const updatedFields = customFields.filter(f => f.id !== id);
        onChange(prev => ({
            ...prev,
            customFields: updatedFields
        }));
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.form;
                return newErrors;
            });
        }
    };

    const fieldTypeOptions = [
        { value: 'text', label: 'Text' },
        { value: 'fullName', label: 'Full Name' },
        { value: 'contactNumber', label: 'Contact Number' },
        { value: 'organizationName', label: 'Organization Name' },
        { value: 'email', label: 'Email' },
        { value: 'jobTitle', label: 'Job Title' },
        { value: 'website', label: 'Website' }
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
            {/* DESIGN ACCORDION */}
            <ReusableDesignAccordion
                design={{
                    ...design,
                    color: {
                        ...design.color,
                        header: design.color?.header || '#6F0101',
                        light: design.color?.light || '#FFFFFF'
                    },
                    logo: {
                        ...design.logo,
                        url: design.logo?.url
                    }
                }}
                onChange={handleDesignSectionUpdate}
                isOpen={isDesignOpen}
                onToggle={() => setIsDesignOpen(!isDesignOpen)}
                colorKeys={{ primary: 'color.header', secondary: 'color.light' }}
                palettes={palettes}
                logoKey="logo.url"
                logoOptions={logoOptions}
                logoLabel="YOUR LOGO"
                logoHelpText="128x128px, 1:1 Ratio"
            >
                {/* HEADER IMAGE SECTION */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#ffa305', textTransform: 'uppercase' }}>
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
                                border: '1px solid #334155',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                background: '#020617'
                            }}
                        >
                            <X size={24} color="#94a3b8" />
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
                                border: design.headerImage?.url === img.url ? '2px solid #ffa305' : '1px solid #334155',
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
                                        background: '#ffa305',
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

                        {/* Custom Uploaded Image */}
                        {design.headerImage?.url && !headerImageOptions.find(img => img.url === design.headerImage.url) && (
                            <div
                                onClick={() => setShowPreviewModal(true)}
                                onMouseEnter={() => setIsHoveringUpload(true)}
                                onMouseLeave={() => setIsHoveringUpload(false)}
                                style={{
                                    width: '80px',
                                    height: '53px',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    border: '2px solid #ffa305',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                            >
                                <img src={design.headerImage.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {isHoveringUpload && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'rgba(0,0,0,0.5)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 10
                                    }}>
                                        <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>Preview</span>
                                    </div>
                                )}
                                <div style={{
                                    position: 'absolute',
                                    top: 2,
                                    right: 2,
                                    width: '20px',
                                    height: '20px',
                                    background: '#ffa305',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid #fff',
                                    zIndex: 5
                                }}>
                                    <Check size={12} color="#fff" />
                                </div>
                            </div>
                        )}

                        {/* Upload Option */}
                        <label style={{
                            width: '80px',
                            height: '53px',
                            borderRadius: '4px',
                            border: '1px dashed #cbd5e1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                            <UploadCloud size={20} color="#94a3b8" />
                        </label>
                    </div>
                </div>
            </ReusableDesignAccordion>

            {/* BASIC INFORMATION ACCORDION */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsBasicInfoOpen(!isBasicInfoOpen)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem' }}>Basic Information</div>
                    <motion.div animate={{ rotate: isBasicInfoOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {isBasicInfoOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#020617' }}
                        >
                            <div style={{ padding: '1.25rem' }}>

                        {/* COMPANY NAME FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                COMPANY NAME*
                            </label>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {/* Company Name Input */}
                                <div style={{ flex: '2 1 200px' }}>
                                    <input
                                        type="text"
                                        value={basicInfo.companyName || ''}
                                        onChange={(e) => handleBasicInfoUpdate('companyName', e.target.value)}
                                        placeholder="Sterling & Co"
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: `1px solid ${errors.companyName ? '#ef4444' : '#334155'}`, background: '#020617', color: '#e5e7eb', fontSize: '0.9rem', outline: 'none' }}
                                    />
                                    {errors.companyName && (
                                        <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                            {errors.companyName}
                                        </p>
                                    )}
                                </div>

                                {/* Text Color */}
                                <div style={{ flex: '1 1 120px' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Text Color
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #334155', borderRadius: '10px', padding: '0.5rem 0.6rem', height: '44px', gap: '0.5rem', background: '#020617' }}>
                                        <input
                                            type="text"
                                            value={basicInfo.companyNameColor || '#FFFFFF'}
                                            onChange={(e) => handleBasicInfoUpdate('companyNameColor', e.target.value)}
                                            style={{ border: 'none', outline: 'none', flex: 1, fontSize: '0.85rem', color: '#e5e7eb', fontWeight: '500', textTransform: 'uppercase', background: 'transparent' }}
                                        />
                                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid #334155', flexShrink: 0, background: '#020617' }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: basicInfo.companyNameColor || '#FFFFFF'
                                            }}></div>
                                            <input
                                                type="color"
                                                value={basicInfo.companyNameColor || '#FFFFFF'}
                                                onChange={(e) => handleBasicInfoUpdate('companyNameColor', e.target.value)}
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
                                <div style={{ flex: '1 1 100px' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Font
                                    </label>
                                    <select
                                        value={basicInfo.companyNameFont || 'Lato'}
                                        onChange={(e) => handleBasicInfoUpdate('companyNameFont', e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#e5e7eb', fontSize: '0.9rem', outline: 'none', cursor: 'pointer', height: '44px' }}
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
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                HEADLINE
                            </label>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {/* Headline Input */}
                                <div style={{ flex: '2 1 200px' }}>
                                    <input
                                        type="text"
                                        value={basicInfo.headline || ''}
                                        onChange={(e) => handleBasicInfoUpdate('headline', e.target.value)}
                                        placeholder="Important Document"
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#e5e7eb', fontSize: '0.9rem', outline: 'none' }}
                                    />
                                </div>

                                {/* Text Color */}
                                <div style={{ flex: '1 1 120px' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Text Color
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #334155', borderRadius: '10px', padding: '0.5rem 0.6rem', height: '44px', gap: '0.5rem', background: '#020617' }}>
                                        <input
                                            type="text"
                                            value={basicInfo.headlineColor || '#FFFFFF'}
                                            onChange={(e) => handleBasicInfoUpdate('headlineColor', e.target.value)}
                                            style={{ border: 'none', outline: 'none', flex: 1, fontSize: '0.85rem', color: '#e5e7eb', fontWeight: '500', textTransform: 'uppercase', background: 'transparent' }}
                                        />
                                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid #334155', flexShrink: 0, background: '#020617' }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: basicInfo.headlineColor || '#FFFFFF'
                                            }}></div>
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
                                                    opacity: 0
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Font */}
                                <div style={{ flex: '1 1 100px' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Font
                                    </label>
                                    <select
                                        value={basicInfo.headlineFont || 'Lato'}
                                        onChange={(e) => handleBasicInfoUpdate('headlineFont', e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#e5e7eb', fontSize: '0.9rem', outline: 'none', cursor: 'pointer', height: '44px' }}
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
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
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
                                    border: '1px solid #334155',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit',
                                    background: '#020617',
                                    color: '#e5e7eb'
                                }}
                            />
                        </div>

                        </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* CREATE A FORM FOR USER ACCORDION */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem' }}>CREATE A FORM FOR USER</div>
                    <motion.div animate={{ rotate: isFormOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>

                {
                    isFormOpen && (
                        <div style={{ padding: '1rem', background: '#0f172a' }}>

                            {/* Form Fields Checkboxes */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>

                                {/* Full Name */}
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={form.fullName || false}
                                        onChange={() => handleFormFieldToggle('fullName')}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#ffa305' }}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: '#e5e7eb' }}>Full Name</span>
                                </label>

                                {/* Contact Number */}
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={form.contactNumber || false}
                                        onChange={() => handleFormFieldToggle('contactNumber')}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#ffa305' }}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: '#e5e7eb' }}>Contact Number</span>
                                </label>

                                {/* Organization Name */}
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={form.organizationName || false}
                                        onChange={() => handleFormFieldToggle('organizationName')}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#ffa305' }}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: '#e5e7eb' }}>Organization Name</span>
                                </label>

                                {/* Email */}
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={form.email || false}
                                        onChange={() => handleFormFieldToggle('email')}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#ffa305' }}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: '#e5e7eb' }}>Email</span>
                                </label>

                                {/* Job Title */}
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={form.jobTitle || false}
                                        onChange={() => handleFormFieldToggle('jobTitle')}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#ffa305' }}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: '#e5e7eb' }}>Job Title</span>
                                </label>

                                {/* Website */}
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={form.website || false}
                                        onChange={() => handleFormFieldToggle('website')}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#ffa305' }}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: '#e5e7eb' }}>Website</span>
                                </label>

                            </div>

                            {/* Custom Fields */}
                            {customFields.length > 0 && (
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '1rem', textTransform: 'uppercase' }}>
                                        ASK THEM A PERSONALIZED QUESTION
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                        Type your question and options
                                    </div>
                                    {customFields.map((field) => (
                                        <div key={field.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                            <div style={{ flex: '1 1 150px' }}>
                                                <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                                    Type
                                                </label>
                                                <select
                                                    value={field.type || 'fullName'}
                                                    onChange={(e) => handleCustomFieldUpdate(field.id, 'type', e.target.value)}
                                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#e5e7eb', fontSize: '0.9rem', outline: 'none', cursor: 'pointer', height: '44px' }}
                                                >
                                                    {fieldTypeOptions.map(option => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div style={{ flex: '2 1 200px' }}>
                                                <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                                    Label
                                                </label>
                                                <input
                                                    type="text"
                                                    value={field.label || ''}
                                                    onChange={(e) => handleCustomFieldUpdate(field.id, 'label', e.target.value)}
                                                    placeholder="Type label"
                                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#e5e7eb', fontSize: '0.9rem', outline: 'none' }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.5rem' }}>
                                                <button
                                                    onClick={() => handleCustomFieldRemove(field.id)}
                                                    style={{ width: '32px', height: '32px', borderRadius: '999px', border: '1px solid #334155', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, color: '#94a3b8' }}
                                                >
                                                    <X size={16} color="#64748b" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {errors.form && (
                                <div style={{ marginBottom: '1.5rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px' }}>
                                    <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', margin: 0, fontWeight: '600' }}>
                                        {errors.form}
                                    </p>
                                </div>
                            )}

                            {/* Add Customized Button */}
                            <button
                                onClick={handleAddCustomField}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.2rem', background: '#ffa305', color: '#0f172a', border: 'none', borderRadius: '999px', fontSize: '0.9rem', cursor: 'pointer', fontWeight: '700' }}
                            >
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>+</span>
                                <span>Add Customized</span>
                            </button>

                        </div>
                    )
                }
            </motion.div>

            {/* THANK YOU BUTTON AFTER SUBMIT ACCORDION */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsThankYouOpen(!isThankYouOpen)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem' }}>THANK YOU BUTTON AFTER SUBMIT</div>
                    <motion.div animate={{ rotate: isThankYouOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>

                {
                    isThankYouOpen && (
                        <div style={{ padding: '2rem', background: '#0f172a' }}>

                            {/* THANKYOU MESSAGE FIELD */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
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
                                        border: `1px solid ${errors.message ? '#ef4444' : '#334155'}`,
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        background: '#020617',
                                        color: '#e5e7eb'
                                    }}
                                />
                                {errors.message && (
                                    <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            {/* BUTTON TEXT FIELD */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
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
                                        border: '1px solid #334155',
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        background: '#020617',
                                        color: '#e5e7eb'
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
                                        border: '1px solid #334155',
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        background: '#020617',
                                        color: '#e5e7eb'
                                    }}
                                />
                            </div>

                        </div>
                    )
                }
            </motion.div>

            <ImageUploadModal
                isOpen={isUploadModalOpen}
                onClose={() => {
                    setIsUploadModalOpen(false);
                    setUploadModalTempImage(null);
                }}
                tempImage={uploadModalTempImage}
                onSave={handleUploadModalSave}
                fileName={uploadModalFileName}
                type="image"
            />

            {/* Simple Preview Modal */}
            {
                showPreviewModal && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 10000,
                            background: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                        onClick={() => setShowPreviewModal(false)}
                    >
                        <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }} onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setShowPreviewModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '-40px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#fff'
                                }}
                            >
                                <X size={32} />
                            </button>
                            <img
                                src={design.headerImage?.url}
                                alt="Header Preview"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                                }}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default LeadGenerationConfig;

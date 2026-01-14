import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check, FileText, Edit2, Trash2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReusableDesignAccordion from './ReusableDesignAccordion';

const PDFConfig = ({ config, onChange, errors = {}, setErrors }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isUploadPdfOpen, setIsUploadPdfOpen] = useState(false);

    const design = config.design || {};
    const basicInfo = config.basicInfo || {};
    const uploadPdf = config.uploadPdf || {};
    const fileInputRef = useRef(null);

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
        // Clear error when user updates a basic info field
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[key];
                return newErrors;
            });
        }
    };

    const handleUploadPdfUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            uploadPdf: {
                ...prev.uploadPdf,
                [key]: value
            }
        }));
        // Clear error when user updates an upload pdf field
        if (setErrors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                if (key === 'pdfTitle') {
                    delete newErrors.uploadPdfTitle;
                } else if (key === 'pdfUrl') {
                    delete newErrors.pdfSource;
                } else if (key === 'buttonTitle') {
                    delete newErrors.buttonTitle;
                }
                return newErrors;
            });
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onChange(prev => ({
                ...prev,
                uploadPdf: {
                    ...prev.uploadPdf,
                    pdfUrl: url,
                    uploadedFile: {
                        name: file.name,
                        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
                    }
                }
            }));
            // Clear error when user uploads a file
            if (setErrors) {
                setErrors(prev => ({ ...prev, pdfSource: undefined }));
            }
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileDelete = () => {
        onChange(prev => ({
            ...prev,
            uploadPdf: {
                ...prev.uploadPdf,
                uploadedFile: null,
                pdfUrl: ''
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
                logoLabel="LOGO"
                logoHelpText="128x128px, 1:1 Ratio"
            />

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
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>BASIC INFORMATION</div>
                    <motion.div
                        animate={{ rotate: isBasicInfoOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 999,
                            border: '1px solid #334155',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#020617'
                        }}
                    >
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isBasicInfoOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ padding: '1rem', background: '#0f172a', borderTop: '1px solid #334155' }}
                        >
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    COMPANY NAME*
                                </label>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '2 1 200px' }}>
                                        <input
                                            type="text"
                                            value={basicInfo.companyName || ''}
                                            onChange={(e) => handleBasicInfoUpdate('companyName', e.target.value)}
                                            placeholder="Software Company"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '10px',
                                                border: `1px solid ${errors.companyName ? '#ef4444' : '#334155'}`,
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                background: '#020617',
                                                color: '#e5e7eb'
                                            }}
                                        />
                                        {errors.companyName && (
                                            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                                {errors.companyName}
                                            </p>
                                        )}
                                    </div>

                                    <div style={{ flex: '1 1 120px' }}>
                                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                            Text Color
                                        </label>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: '1px solid #334155',
                                                borderRadius: '10px',
                                                padding: '0.5rem',
                                                height: '44px',
                                                background: '#020617'
                                            }}
                                        >
                                            <input
                                                type="text"
                                                value={basicInfo.companyNameColor || '#FFFFFF'}
                                                onChange={(e) => handleBasicInfoUpdate('companyNameColor', e.target.value)}
                                                style={{
                                                    border: 'none',
                                                    outline: 'none',
                                                    width: '100%',
                                                    fontSize: '0.85rem',
                                                    color: '#e5e7eb',
                                                    fontWeight: '500',
                                                    textTransform: 'uppercase',
                                                    background: 'transparent'
                                                }}
                                            />
                                            <div
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    background: basicInfo.companyNameColor || '#FFFFFF',
                                                    borderRadius: '4px',
                                                    flexShrink: 0,
                                                    border: '1px solid #334155',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer'
                                                }}
                                            >
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

                                    <div style={{ flex: '1 1 100px' }}>
                                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                            Font
                                        </label>
                                        <select
                                            value={basicInfo.companyNameFont || 'Lato'}
                                            onChange={(e) => handleBasicInfoUpdate('companyNameFont', e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '10px',
                                                border: '1px solid #334155',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                cursor: 'pointer',
                                                background: '#020617',
                                                color: '#e5e7eb',
                                                height: '44px'
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

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    PDF TITLE*
                                </label>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '2 1 200px' }}>
                                        <input
                                            type="text"
                                            value={basicInfo.pdfTitle || ''}
                                            onChange={(e) => handleBasicInfoUpdate('pdfTitle', e.target.value)}
                                            placeholder="See Our Company Profile"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '10px',
                                                border: `1px solid ${errors.pdfTitle ? '#ef4444' : '#334155'}`,
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                background: '#020617',
                                                color: '#e5e7eb'
                                            }}
                                        />
                                        {errors.pdfTitle && (
                                            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                                {errors.pdfTitle}
                                            </p>
                                        )}
                                    </div>

                                    <div style={{ flex: '1 1 120px' }}>
                                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                            Text Color
                                        </label>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: '1px solid #334155',
                                                borderRadius: '10px',
                                                padding: '0.5rem',
                                                height: '44px',
                                                background: '#020617'
                                            }}
                                        >
                                            <input
                                                type="text"
                                                value={basicInfo.pdfTitleColor || '#FFA800'}
                                                onChange={(e) => handleBasicInfoUpdate('pdfTitleColor', e.target.value)}
                                                style={{
                                                    border: 'none',
                                                    outline: 'none',
                                                    width: '100%',
                                                    fontSize: '0.85rem',
                                                    color: '#e5e7eb',
                                                    fontWeight: '500',
                                                    textTransform: 'uppercase',
                                                    background: 'transparent'
                                                }}
                                            />
                                            <div
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    background: basicInfo.pdfTitleColor || '#FFA800',
                                                    borderRadius: '4px',
                                                    flexShrink: 0,
                                                    border: '1px solid #334155',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <input
                                                    type="color"
                                                    value={basicInfo.pdfTitleColor || '#FFA800'}
                                                    onChange={(e) => handleBasicInfoUpdate('pdfTitleColor', e.target.value)}
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

                                    <div style={{ flex: '1 1 100px' }}>
                                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                            Font
                                        </label>
                                        <select
                                            value={basicInfo.pdfTitleFont || 'Lato'}
                                            onChange={(e) => handleBasicInfoUpdate('pdfTitleFont', e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '10px',
                                                border: '1px solid #334155',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                cursor: 'pointer',
                                                background: '#020617',
                                                color: '#e5e7eb',
                                                height: '44px'
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

                            <div style={{ marginBottom: '0' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    DESCRIPTION
                                </label>
                                <textarea
                                    value={basicInfo.description || ''}
                                    onChange={(e) => handleBasicInfoUpdate('description', e.target.value)}
                                    placeholder="We aim to provide fresh and healthy snacks people on the go."
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '10px',
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* UPLOAD PDF ACCORDION */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsUploadPdfOpen(!isUploadPdfOpen)}
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
                    <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'uppercase' }}>UPLOAD PDF</div>
                    <motion.div
                        animate={{ rotate: isUploadPdfOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 999,
                            border: '1px solid #334155',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#020617'
                        }}
                    >
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isUploadPdfOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ padding: '1rem', background: '#0f172a', borderTop: '1px solid #334155' }}
                        >
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    PDF TITLE*
                                </label>
                                <input
                                    type="text"
                                    value={uploadPdf.pdfTitle || ''}
                                    onChange={(e) => handleUploadPdfUpdate('pdfTitle', e.target.value)}
                                    placeholder="Qr Insight Presentation"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '10px',
                                        border: `1px solid ${errors.uploadPdfTitle ? '#ef4444' : '#334155'}`,
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        background: '#020617',
                                        color: '#e5e7eb'
                                    }}
                                />
                                {errors.uploadPdfTitle && (
                                    <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                        {errors.uploadPdfTitle}
                                    </p>
                                )}
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    UPLOAD PDF*
                                </label>

                                <input
                                    type="text"
                                    value={uploadPdf.pdfUrl || ''}
                                    onChange={(e) => handleUploadPdfUpdate('pdfUrl', e.target.value)}
                                    placeholder="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '10px',
                                        border: `1px solid ${errors.pdfSource ? '#ef4444' : '#334155'}`,
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        marginBottom: '1rem',
                                        background: '#020617',
                                        color: '#e5e7eb'
                                    }}
                                />
                                {errors.pdfSource && (
                                    <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', marginBottom: '1rem' }}>
                                        {errors.pdfSource}
                                    </p>
                                )}

                                <div
                                    style={{
                                        textAlign: 'center',
                                        margin: '0.5rem 0 1rem 0',
                                        color: '#ffa305',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    OR
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="application/pdf"
                                    style={{ display: 'none' }}
                                />

                                <button
                                    onClick={handleUploadButtonClick}
                                    disabled={!!uploadPdf.pdfUrl}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '999px',
                                        border: '1px solid #334155',
                                        background: uploadPdf.pdfUrl ? '#020617' : '#ffa305',
                                        color: uploadPdf.pdfUrl ? '#64748b' : '#0f172a',
                                        fontSize: '0.9rem',
                                        cursor: uploadPdf.pdfUrl ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    <UploadCloud size={20} />
                                    Upload/ Choose File from your Computer
                                </button>
                                <div style={{ textAlign: 'right', fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.5rem' }}>10MB max file size</div>

                                {(uploadPdf.uploadedFile || uploadPdf.pdfUrl) && (
                                    <div
                                        style={{
                                            marginTop: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            paddingBottom: '1rem',
                                            borderBottom: '1px solid #1e293b'
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                background: '#334155',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <FileText size={20} color="#e5e7eb" />
                                        </div>
                                        <div
                                            style={{
                                                flex: 1,
                                                fontWeight: 'bold',
                                                fontSize: '0.9rem',
                                                color: '#e5e7eb',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {uploadPdf.uploadedFile ? uploadPdf.uploadedFile.name : 'Custom PDF URL'}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleFileDelete();
                                                }}
                                                style={{
                                                    background: 'rgba(248,113,113,0.12)',
                                                    border: 'none',
                                                    borderRadius: '999px',
                                                    padding: '0.5rem 1rem',
                                                    cursor: 'pointer',
                                                    color: '#fca5a5',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                <Trash2 size={16} />
                                                Delete PDF
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div style={{ marginBottom: '0' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    BUTTON TITLE*
                                </label>
                                <input
                                    type="text"
                                    value={uploadPdf.buttonTitle || ''}
                                    onChange={(e) => handleUploadPdfUpdate('buttonTitle', e.target.value)}
                                    placeholder="Download Now"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '10px',
                                        border: `1px solid ${errors.buttonTitle ? '#ef4444' : '#334155'}`,
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        background: '#020617',
                                        color: '#e5e7eb'
                                    }}
                                />
                                {errors.buttonTitle && (
                                    <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                        {errors.buttonTitle}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </div>
    );
};

export default PDFConfig;

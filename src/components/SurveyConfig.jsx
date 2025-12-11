import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check, Trash2, Globe } from 'lucide-react';
import { useState } from 'react';

const SurveyConfig = ({ config, onChange }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isSurveyQuestionsOpen, setIsSurveyQuestionsOpen] = useState(false);
    const [isThankYouOpen, setIsThankYouOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);

    const design = config.design || {};
    const basicInfo = config.basicInfo || {};
    const survey = config.survey || {
        languages: ['English', 'Urdu'],
        defaultLanguage: 'English',
        questions: [
            {
                id: 1,
                type: 'Options',
                questions: {
                    'English': 'Branch Name',
                    'Urdu': 'برانچ کا نام'
                },
                options: [
                    {
                        id: 101,
                        labels: {
                            'English': 'Digital',
                            'Urdu': 'ڈیجیٹل'
                        }
                    }
                ]
            },
            {
                id: 2,
                type: 'Text',
                questions: {
                    'English': 'Name of the Customer',
                    'Urdu': 'صارف کا نام'
                },
                options: []
            },
            {
                id: 3,
                type: 'Phone Number',
                questions: {
                    'English': 'Mobile No',
                    'Urdu': 'موبائل نمبر'
                },
                options: []
            },
            {
                id: 4,
                type: 'Rating',
                questions: {
                    'English': 'How much are you satisfied with the Environment and other facilities?',
                    'Urdu': 'کیا آپ ماحول اور دیگر سہولیات سے کتنے مطمئن ہیں؟'
                },
                options: []
            },
            {
                id: 5,
                type: 'Rating',
                questions: {
                    'English': 'How much are you satisfied with the knowledge capacity of staff regarding different services being offered?',
                    'Urdu': 'کیا آپ عملہ کی جانب سے پیش کی جانے والی مختلف خدمات سے متعلق معلومات فراہمی سے کتنے مطمئن ہیں؟'
                },
                options: []
            },
            {
                id: 6,
                type: 'Radio',
                questions: {
                    'English': 'Will you recommend us?',
                    'Urdu': 'کیا آپ ہمیں تجویز کریں گے؟'
                },
                options: [
                    {
                        id: 601,
                        labels: {
                            'English': 'Yes',
                            'Urdu': 'جی ہاں'
                        }
                    },
                    {
                        id: 602,
                        labels: {
                            'English': 'No',
                            'Urdu': 'جی نہیں'
                        }
                    }
                ]
            }
        ]
    };
    const thankYou = config.thankYou || {};
    const social = config.social || {};

    const primaryColor = design.color?.header || '#2B853E';
    const secondaryColor = design.color?.light || '#68D87F';

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

    // Survey handlers
    const handleAddLanguage = (language) => {
        if (!survey.languages.includes(language)) {
            onChange(prev => ({
                ...prev,
                survey: {
                    ...prev.survey,
                    languages: [...(prev.survey?.languages || []), language]
                }
            }));
        }
    };

    const handleRemoveLanguage = (language) => {
        onChange(prev => ({
            ...prev,
            survey: {
                ...prev.survey,
                languages: (prev.survey?.languages || []).filter(l => l !== language)
            }
        }));
    };

    const handleDefaultLanguageChange = (language) => {
        onChange(prev => ({
            ...prev,
            survey: {
                ...prev.survey,
                defaultLanguage: language
            }
        }));
    };

    const handleAddQuestion = () => {
        const newQuestion = {
            id: Date.now(),
            type: 'Options',
            questions: {},
            options: []
        };
        onChange(prev => ({
            ...prev,
            survey: {
                ...prev.survey,
                questions: [...(prev.survey?.questions || []), newQuestion]
            }
        }));
    };

    const handleRemoveQuestion = (questionId) => {
        onChange(prev => ({
            ...prev,
            survey: {
                ...prev.survey,
                questions: (prev.survey?.questions || []).filter(q => q.id !== questionId)
            }
        }));
    };

    const handleQuestionTypeChange = (questionId, type) => {
        onChange(prev => ({
            ...prev,
            survey: {
                ...prev.survey,
                questions: (prev.survey?.questions || []).map(q =>
                    q.id === questionId ? { ...q, type } : q
                )
            }
        }));
    };

    const handleQuestionTextChange = (questionId, language, text) => {
        onChange(prev => ({
            ...prev,
            survey: {
                ...prev.survey,
                questions: (prev.survey?.questions || []).map(q =>
                    q.id === questionId ? {
                        ...q,
                        questions: { ...q.questions, [language]: text }
                    } : q
                )
            }
        }));
    };

    const handleAddOption = (questionId) => {
        onChange(prev => ({
            ...prev,
            survey: {
                ...prev.survey,
                questions: (prev.survey?.questions || []).map(q =>
                    q.id === questionId ? {
                        ...q,
                        options: [...(q.options || []), { id: Date.now(), labels: {} }]
                    } : q
                )
            }
        }));
    };

    const handleRemoveOption = (questionId, optionId) => {
        onChange(prev => ({
            ...prev,
            survey: {
                ...prev.survey,
                questions: (prev.survey?.questions || []).map(q =>
                    q.id === questionId ? {
                        ...q,
                        options: (q.options || []).filter(o => o.id !== optionId)
                    } : q
                )
            }
        }));
    };

    const handleOptionLabelChange = (questionId, optionId, language, label) => {
        onChange(prev => ({
            ...prev,
            survey: {
                ...prev.survey,
                questions: (prev.survey?.questions || []).map(q =>
                    q.id === questionId ? {
                        ...q,
                        options: (q.options || []).map(o =>
                            o.id === optionId ? {
                                ...o,
                                labels: { ...o.labels, [language]: label }
                            } : o
                        )
                    } : q
                )
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

    const logoOptions = [
        { id: 'logo1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
        { id: 'logo2', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop' },
        { id: 'logo3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
        { id: 'logo4', url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }
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

                        {/* ORGANIZATION NAME FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                ORGANIZATION NAME*
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                                {/* Organization Name Input */}
                                <input
                                    type="text"
                                    value={basicInfo.organizationName || ''}
                                    onChange={(e) => handleBasicInfoUpdate('organizationName', e.target.value)}
                                    placeholder="Luxury Hotels"
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
                                            value={basicInfo.organizationNameColor || '#000000'}
                                            onChange={(e) => handleBasicInfoUpdate('organizationNameColor', e.target.value)}
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
                                            background: basicInfo.organizationNameColor || '#000000',
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
                                        value={basicInfo.organizationNameFont || 'Lato'}
                                        onChange={(e) => handleBasicInfoUpdate('organizationNameFont', e.target.value)}
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
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
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
                                    borderRadius: '4px',
                                    border: '1px solid #1e293b',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        {/* WEBSITE FIELD */}
                        <div style={{ marginBottom: '0' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                WEBSITE*
                            </label>
                            <input
                                type="text"
                                value={basicInfo.website || ''}
                                onChange={(e) => handleBasicInfoUpdate('website', e.target.value)}
                                placeholder="https://www.luxerhotels.com"
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
                )}
            </div>

            {/* SURVEY QUESTIONS ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsSurveyQuestionsOpen(!isSurveyQuestionsOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isSurveyQuestionsOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>SURVEY QUESTIONS</div>
                    </div>
                    {isSurveyQuestionsOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isSurveyQuestionsOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>

                        {/* LANGUAGES */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                LANGUAGES
                            </label>
                            <div style={{
                                display: 'flex',
                                gap: '0.5rem',
                                flexWrap: 'wrap',
                                padding: '0.75rem',
                                borderRadius: '4px',
                                border: '1px solid #1e293b',
                                minHeight: '44px',
                                alignItems: 'center'
                            }}>
                                {survey.languages.map((lang, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: '#f1f5f9',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem'
                                    }}>
                                        <span>🇺🇸</span>
                                        <span>{lang}</span>
                                        <X
                                            size={14}
                                            color="#64748b"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleRemoveLanguage(lang)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DEFAULT LANGUAGE */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                DEFAULT LANGUAGE*
                            </label>
                            <select
                                value={survey.defaultLanguage || 'English'}
                                onChange={(e) => handleDefaultLanguageChange(e.target.value)}
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
                                {survey.languages.map((lang, idx) => (
                                    <option key={idx} value={lang}>{lang}</option>
                                ))}
                            </select>
                        </div>

                        {/* QUESTIONS SECTION */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#1e293b', textTransform: 'uppercase' }}>
                                    QUESTIONS
                                </div>
                                <button
                                    onClick={handleAddQuestion}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: '#fff',
                                        color: '#8b5cf6',
                                        border: '1px solid #8b5cf6',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        fontWeight: '500'
                                    }}
                                >
                                    Add Question
                                </button>
                            </div>

                            {/* Questions List */}
                            {survey.questions.map((question, qIdx) => (
                                <div key={question.id} style={{
                                    marginBottom: '2rem',
                                    padding: '1.5rem',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    background: '#fafafa'
                                }}>
                                    {/* Question Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#8b5cf6', textTransform: 'uppercase' }}>
                                            QUESTION {qIdx + 1}
                                        </div>
                                        <Trash2
                                            size={18}
                                            color="#ef4444"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleRemoveQuestion(question.id)}
                                        />
                                    </div>

                                    {/* Question Type */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                            Question Type
                                        </label>
                                        <select
                                            value={question.type || 'Options'}
                                            onChange={(e) => handleQuestionTypeChange(question.id, e.target.value)}
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
                                            <option value="Options">Options</option>
                                            <option value="Text">Text</option>
                                            <option value="Phone Number">Phone Number</option>
                                            <option value="Rating">Rating</option>
                                            <option value="Radio">Radio</option>
                                        </select>
                                    </div>

                                    {/* Question Inputs for each language */}
                                    {survey.languages.map((lang, langIdx) => (
                                        <div key={langIdx} style={{ marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                                                    {lang === 'English' ? 'en' : 'ur'}
                                                </span>
                                                <label style={{ fontSize: '0.7rem', color: '#64748b' }}>
                                                    Question
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                value={question.questions?.[lang] || ''}
                                                onChange={(e) => handleQuestionTextChange(question.id, lang, e.target.value)}
                                                placeholder={lang === 'English' ? 'Branch Name' : 'برانچ کا نام'}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    borderRadius: '4px',
                                                    border: '1px solid #1e293b',
                                                    fontSize: '0.9rem',
                                                    outline: 'none',
                                                    background: '#fff'
                                                }}
                                            />
                                        </div>
                                    ))}

                                    {/* OPTIONS Section (only for Options and Radio types) */}
                                    {(question.type === 'Options' || question.type === 'Radio') && (
                                        <div style={{ marginTop: '1.5rem' }}>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem', textTransform: 'uppercase' }}>
                                                OPTIONS
                                            </div>

                                            {question.options?.map((option, optIdx) => (
                                                <div key={option.id} style={{ marginBottom: '1.5rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                        <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', textTransform: 'uppercase' }}>
                                                            Option {optIdx + 1}
                                                        </div>
                                                        <Trash2
                                                            size={16}
                                                            color="#ef4444"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleRemoveOption(question.id, option.id)}
                                                        />
                                                    </div>

                                                    {survey.languages.map((lang, langIdx) => (
                                                        <div key={langIdx} style={{ marginBottom: '0.75rem' }}>
                                                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.25rem' }}>
                                                                Option Label ({lang === 'English' ? 'en' : 'ur'})
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={option.labels?.[lang] || ''}
                                                                onChange={(e) => handleOptionLabelChange(question.id, option.id, lang, e.target.value)}
                                                                placeholder={lang === 'English' ? 'Digital' : 'ڈیجیٹل'}
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '0.5rem',
                                                                    borderRadius: '4px',
                                                                    border: option.labels?.[lang] ? '1px solid #1e293b' : '1px solid #ef4444',
                                                                    fontSize: '0.85rem',
                                                                    outline: 'none',
                                                                    background: '#fff'
                                                                }}
                                                            />
                                                            {!option.labels?.[lang] && (
                                                                <div style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '0.25rem' }}>
                                                                    Option is required
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}

                                            {/* Add Option Button */}
                                            <div
                                                onClick={() => handleAddOption(question.id)}
                                                style={{
                                                    padding: '1rem',
                                                    border: '2px dashed #8b5cf6',
                                                    borderRadius: '4px',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    color: '#8b5cf6',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Add Option
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                )}
            </div>

            {/* THANK YOU AFTER SUBMIT ACCORDION */}
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
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>THANK YOU AFTER SUBMIT</div>
                    </div>
                    {isThankYouOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isThankYouOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>

                        {/* THANKYOU TITLE FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                THANKYOU TITLE*
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                                {/* Title Input */}
                                <input
                                    type="text"
                                    value={thankYou.title || ''}
                                    onChange={(e) => handleThankYouUpdate('title', e.target.value)}
                                    placeholder="We appreciate your feedback!"
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
                                            value={thankYou.titleColor || '#000000'}
                                            onChange={(e) => handleThankYouUpdate('titleColor', e.target.value)}
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
                                            background: thankYou.titleColor || '#000000',
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
                                        value={thankYou.titleFont || 'Lato'}
                                        onChange={(e) => handleThankYouUpdate('titleFont', e.target.value)}
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

                        {/* THANKYOU MESSAGE FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                THANKYOU MESSAGE*
                            </label>
                            <textarea
                                value={thankYou.message || ''}
                                onChange={(e) => handleThankYouUpdate('message', e.target.value)}
                                placeholder="Thank you for completing the survey! Your feedback helps us improve."
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

                        {/* REDIRECT URL FIELD */}
                        <div style={{ marginBottom: '0' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                REDIRECT URL*
                            </label>
                            <input
                                type="text"
                                value={thankYou.redirectUrl || ''}
                                onChange={(e) => handleThankYouUpdate('redirectUrl', e.target.value)}
                                placeholder="https://www.luxerhotels.com"
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

                            {/* Website */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                    Website*
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: '#6366f1',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Globe size={20} color="#fff" />
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
                                        width: '40px',
                                        height: '40px',
                                        background: '#1877f2',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        fontSize: '22px',
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
                                        width: '40px',
                                        height: '40px',
                                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        fontSize: '22px',
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
                                    width: '48px',
                                    height: '48px',
                                    background: '#1877f2',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    f
                                </div>

                                {/* Instagram */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    📷
                                </div>

                                {/* X (Twitter) */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#000',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '22px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    𝕏
                                </div>

                                {/* LinkedIn */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#0077b5',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '22px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    in
                                </div>

                                {/* Discord */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#5865f2',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#fff'
                                }}>
                                    💬
                                </div>

                                {/* Twitch */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#9146ff',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#fff'
                                }}>
                                    📺
                                </div>

                                {/* WeChat */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#09b83e',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#fff'
                                }}>
                                    💬
                                </div>

                                {/* YouTube */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#ff0000',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#fff'
                                }}>
                                    ▶
                                </div>

                                {/* WhatsApp */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#25d366',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#fff'
                                }}>
                                    💬
                                </div>

                                {/* Snapchat */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#fffc00',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#000'
                                }}>
                                    👻
                                </div>

                                {/* TikTok */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#000',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#fff'
                                }}>
                                    ♪
                                </div>

                                {/* Tumblr */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#35465c',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '22px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    t
                                </div>

                                {/* Spotify */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#1db954',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#fff'
                                }}>
                                    🎵
                                </div>

                                {/* Dribbble */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#ea4c89',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#fff'
                                }}>
                                    🏀
                                </div>

                                {/* Pinterest */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#e60023',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '22px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    P
                                </div>

                                {/* Telegram */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#0088cc',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#fff'
                                }}>
                                    ✈️
                                </div>

                                {/* Behance */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#1769ff',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    Bē
                                </div>

                                {/* Reddit */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#ff4500',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#fff'
                                }}>
                                    👽
                                </div>

                                {/* Website */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#6366f1',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <Globe size={24} color="#fff" />
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default SurveyConfig;

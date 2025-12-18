import { ChevronDown, ChevronUp, RefreshCw, UploadCloud, X, Check } from 'lucide-react';
import { useState } from 'react';
import ReusableDesignAccordion from './ReusableDesignAccordion';

const ReviewsConfig = ({ config, onChange }) => {
    const [isDesignOpen, setIsDesignOpen] = useState(true);
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);

    const design = config.design || {};
    const basicInfo = config.basicInfo || {};
    const categories = config.categories || [
        { id: 1, name: '', subcategories: [''] }
    ];
    const social = config.social || {};

    const primaryColor = design.color?.header || '#2131AE';
    const secondaryColor = design.color?.light || '#C0E1DD';

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

    const handleCategoryUpdate = (categoryId, field, value) => {
        onChange(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === categoryId ? { ...cat, [field]: value } : cat
            )
        }));
    };

    const handleSubcategoryUpdate = (categoryId, subcategoryIndex, value) => {
        onChange(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === categoryId
                    ? {
                        ...cat,
                        subcategories: cat.subcategories.map((sub, idx) =>
                            idx === subcategoryIndex ? value : sub
                        )
                    }
                    : cat
            )
        }));
    };

    const handleAddSubcategory = (categoryId) => {
        onChange(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === categoryId
                    ? { ...cat, subcategories: [...cat.subcategories, ''] }
                    : cat
            )
        }));
    };

    const handleAddCategory = () => {
        onChange(prev => ({
            ...prev,
            categories: [
                ...prev.categories,
                { id: Date.now(), name: '', subcategories: [''] }
            ]
        }));
    };

    const handleDeleteCategory = (categoryId) => {
        onChange(prev => ({
            ...prev,
            categories: prev.categories.filter(cat => cat.id !== categoryId)
        }));
    };

    const handleDeleteSubcategory = (categoryId, subcategoryIndex) => {
        onChange(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === categoryId
                    ? {
                        ...cat,
                        subcategories: cat.subcategories.filter((_, idx) => idx !== subcategoryIndex)
                    }
                    : cat
            )
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
        { id: 'logo3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
        { id: 'logo4', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' }
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
                        header: design.color?.header || '#2131AE',
                        light: design.color?.light || '#C0E1DD'
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
            >
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
            </ReusableDesignAccordion>

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
                                        padding: '0.25rem',
                                        height: '44px',
                                        gap: '0.5rem'
                                    }}>
                                        <input
                                            type="color"
                                            value={basicInfo.organizationNameColor || '#FFFFFF'}
                                            onChange={(e) => handleBasicInfoUpdate('organizationNameColor', e.target.value)}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                border: 'none',
                                                background: 'none',
                                                padding: 0,
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <input
                                            type="text"
                                            value={basicInfo.organizationNameColor || '#FFFFFF'}
                                            onChange={(e) => handleBasicInfoUpdate('organizationNameColor', e.target.value)}
                                            style={{
                                                flex: 1,
                                                border: 'none',
                                                outline: 'none',
                                                fontSize: '0.85rem',
                                                color: '#000',
                                                fontWeight: '500',
                                                textTransform: 'uppercase',
                                                minWidth: 0
                                            }}
                                        />
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

                        {/* TITLE FIELD */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                TITLE*
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                                {/* Title Input */}
                                <input
                                    type="text"
                                    value={basicInfo.title || ''}
                                    onChange={(e) => handleBasicInfoUpdate('title', e.target.value)}
                                    placeholder="Give us your feedback"
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
                                        padding: '0.25rem',
                                        height: '44px',
                                        gap: '0.5rem'
                                    }}>
                                        <input
                                            type="color"
                                            value={basicInfo.titleColor || '#1e293b'}
                                            onChange={(e) => handleBasicInfoUpdate('titleColor', e.target.value)}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                border: 'none',
                                                background: 'none',
                                                padding: 0,
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <input
                                            type="text"
                                            value={basicInfo.titleColor || '#1e293b'}
                                            onChange={(e) => handleBasicInfoUpdate('titleColor', e.target.value)}
                                            style={{
                                                flex: 1,
                                                border: 'none',
                                                outline: 'none',
                                                fontSize: '0.85rem',
                                                color: '#000',
                                                fontWeight: '500',
                                                textTransform: 'uppercase',
                                                minWidth: 0
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Font */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                        Font
                                    </label>
                                    <select
                                        value={basicInfo.titleFont || 'Lato'}
                                        onChange={(e) => handleBasicInfoUpdate('titleFont', e.target.value)}
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
                                placeholder="https://www.hotelparadise.com"
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

            {/* CATEGORY ACCORDION */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    style={{
                        padding: '1.5rem',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: isCategoryOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', textTransform: 'uppercase' }}>CATEGORY</div>
                    </div>
                    {isCategoryOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>

                {isCategoryOpen && (
                    <div style={{ padding: '2rem', background: '#fff' }}>

                        {/* Categories List */}
                        {categories.map((category, categoryIndex) => (
                            <div key={category.id} style={{ marginBottom: '2rem', position: 'relative' }}>

                                {/* Category Name */}
                                <div style={{ marginBottom: '1rem', position: 'relative' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                        CATEGORY NAME*
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            value={category.name || ''}
                                            onChange={(e) => handleCategoryUpdate(category.id, 'name', e.target.value)}
                                            placeholder="Food"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                paddingRight: '3rem',
                                                borderRadius: '4px',
                                                border: '1px solid #1e293b',
                                                fontSize: '0.9rem',
                                                outline: 'none'
                                            }}
                                        />
                                        {/* Delete Category Icon */}
                                        {categories.length > 1 && (
                                            <div
                                                onClick={() => handleDeleteCategory(category.id)}
                                                style={{
                                                    position: 'absolute',
                                                    right: '12px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer',
                                                    color: '#cbd5e1',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <X size={20} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Subcategories */}
                                {category.subcategories && category.subcategories.length > 0 && (
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                            SUBCATEGORIES:
                                        </label>

                                        {category.subcategories.map((subcategory, subIndex) => (
                                            <div key={subIndex} style={{ marginBottom: '0.75rem', position: 'relative' }}>
                                                <input
                                                    type="text"
                                                    value={subcategory || ''}
                                                    onChange={(e) => handleSubcategoryUpdate(category.id, subIndex, e.target.value)}
                                                    placeholder="Staff"
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem',
                                                        paddingRight: '3rem',
                                                        borderRadius: '4px',
                                                        border: '1px solid #1e293b',
                                                        fontSize: '0.9rem',
                                                        outline: 'none'
                                                    }}
                                                />
                                                {/* Delete Subcategory Icon */}
                                                {category.subcategories.length > 1 && (
                                                    <div
                                                        onClick={() => handleDeleteSubcategory(category.id, subIndex)}
                                                        style={{
                                                            position: 'absolute',
                                                            right: '12px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            cursor: 'pointer',
                                                            color: '#cbd5e1',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <X size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add Subcategory Button */}
                                <div style={{ textAlign: 'right', marginBottom: categoryIndex < categories.length - 1 ? '2rem' : '0' }}>
                                    <button
                                        onClick={() => handleAddSubcategory(category.id)}
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid #8b5cf6',
                                            color: '#8b5cf6',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            fontWeight: '500',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        + Add Subcategory
                                    </button>
                                </div>

                            </div>
                        ))}

                        {/* Add Category Button */}
                        <div style={{ marginTop: '1.5rem' }}>
                            <button
                                onClick={handleAddCategory}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #1e293b',
                                    color: '#1e293b',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '500',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                + Add Category
                            </button>
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

                        {/* Social Media Input Fields - 2 Column Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>

                            {/* Website */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    Website*
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '24px',
                                        height: '24px',
                                        background: '#6366f1',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.9rem',
                                        color: '#fff'
                                    }}>
                                        🌐
                                    </div>
                                    <input
                                        type="text"
                                        value={social.website || ''}
                                        onChange={(e) => handleSocialUpdate('website', e.target.value)}
                                        placeholder="https://"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 0.75rem 0.75rem 3rem',
                                            borderRadius: '4px',
                                            border: '1px solid #1e293b',
                                            fontSize: '0.9rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Facebook */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    Facebook*
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '24px',
                                        height: '24px',
                                        background: '#1877f2',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }}>
                                        f
                                    </div>
                                    <input
                                        type="text"
                                        value={social.facebook || ''}
                                        onChange={(e) => handleSocialUpdate('facebook', e.target.value)}
                                        placeholder="https://"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 0.75rem 0.75rem 3rem',
                                            borderRadius: '4px',
                                            border: '1px solid #1e293b',
                                            fontSize: '0.9rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Instagram */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    Instagram*
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '24px',
                                        height: '24px',
                                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.9rem',
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
                                            width: '100%',
                                            padding: '0.75rem 0.75rem 0.75rem 3rem',
                                            borderRadius: '4px',
                                            border: '1px solid #1e293b',
                                            fontSize: '0.9rem',
                                            outline: 'none'
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
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48px, 1fr))', gap: '0.75rem' }}>
                                {/* Facebook */}
                                <div style={{ width: '48px', height: '48px', background: '#1877f2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.5rem', color: '#fff' }}>f</div>

                                {/* Instagram */}
                                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>📷</div>

                                {/* X (Twitter) */}
                                <div style={{ width: '48px', height: '48px', background: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>𝕏</div>

                                {/* LinkedIn */}
                                <div style={{ width: '48px', height: '48px', background: '#0a66c2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>in</div>

                                {/* Discord */}
                                <div style={{ width: '48px', height: '48px', background: '#5865f2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>💬</div>

                                {/* Twitch */}
                                <div style={{ width: '48px', height: '48px', background: '#9146ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>📺</div>

                                {/* Kickstarter */}
                                <div style={{ width: '48px', height: '48px', background: '#05ce78', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>K</div>

                                {/* YouTube */}
                                <div style={{ width: '48px', height: '48px', background: '#ff0000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>▶</div>

                                {/* WhatsApp */}
                                <div style={{ width: '48px', height: '48px', background: '#25d366', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>💬</div>

                                {/* Snapchat */}
                                <div style={{ width: '48px', height: '48px', background: '#fffc00', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#000' }}>👻</div>

                                {/* TikTok */}
                                <div style={{ width: '48px', height: '48px', background: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>🎵</div>

                                {/* Tumblr */}
                                <div style={{ width: '48px', height: '48px', background: '#35465c', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>t</div>

                                {/* Spotify */}
                                <div style={{ width: '48px', height: '48px', background: '#1db954', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>🎵</div>

                                {/* Telegram */}
                                <div style={{ width: '48px', height: '48px', background: '#0088cc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>✈️</div>

                                {/* Behance */}
                                <div style={{ width: '48px', height: '48px', background: '#1769ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>Bē</div>

                                {/* Pinterest */}
                                <div style={{ width: '48px', height: '48px', background: '#e60023', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>📌</div>

                                {/* Reddit */}
                                <div style={{ width: '48px', height: '48px', background: '#ff4500', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>🤖</div>

                                {/* Website */}
                                <div style={{ width: '48px', height: '48px', background: '#6366f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#fff' }}>🌐</div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewsConfig;

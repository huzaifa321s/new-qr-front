import { ChevronDown, ChevronUp, Plus, Type, FileText, MousePointer, Image as ImageIcon, Film, File, Menu as MenuIcon, Calendar, User, Building2, Link, Share2, Star, Check, Trash2, AlignLeft, AlignCenter, AlignRight, UploadCloud, X, Minus, RefreshCw, PenLine, ArrowUpDown, Clock, Phone, Mail, Globe, Wifi, Car, Bed, Coffee, Utensils } from 'lucide-react';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/canvasUtils';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReusableDesignAccordion from './ReusableDesignAccordion';
import ImageUploadModal from './ImageUploadModal';

const CustomConfig = ({ config, onChange }) => {
    // Accordion States
    const [isComponentsOpen, setIsComponentsOpen] = useState(true);
    const [isDesignOpen, setIsDesignOpen] = useState(false);

    const design = config.design || {};

    // Added Components State
    const [addedComponents, setAddedComponents] = useState(config.customComponents || []);
    const [openComponentId, setOpenComponentId] = useState(null);

    // Menu Sub-accordion State
    const [openMenuCategoryId, setOpenMenuCategoryId] = useState(null);

    // Modal State for Slider Upload
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempImage, setTempImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [activePdfCompId, setActivePdfCompId] = useState(null);
    const [activeMenuProduct, setActiveMenuProduct] = useState(null); // { compId, catId, prodId }
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [currentSliderId, setCurrentSliderId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [isImageHovered, setIsImageHovered] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const logoFileInputRef = useRef(null);
    const imageFileInputRef = useRef(null);
    const pdfFileInputRef = useRef(null);
    const menuImageInputRef = useRef(null);

    // Reusable Upload Modal State
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadModalTempImage, setUploadModalTempImage] = useState(null);
    const [uploadModalFileName, setUploadModalFileName] = useState('');
    const [uploadModalContext, setUploadModalContext] = useState(null); // { type: 'image' | 'slider', id: number }

    // Sync addedComponents with parent config
    useEffect(() => {
        onChange(prev => ({
            ...prev,
            customComponents: addedComponents
        }));
    }, [addedComponents, onChange]);

    // Initialize/Sync from config if provided (for edit mode)
    useEffect(() => {
        if (config.customComponents && config.customComponents.length > 0) {
            // Only update if state is empty (initial load) or if we want to force sync?
            // Simple check: if state is empty but config is not, load it.
            // But we must check if we already loaded it to avoid overwriting user clearing all components.
            // A better way is comparing IDs or json stringify, but for now let's trust initialization + this check for delayed load.
            setAddedComponents(prev => {
                if (prev.length === 0) return config.customComponents;
                return prev;
            });
        }
    }, [config.customComponents]);

    // Available Components List
    const components = [
        { id: 'heading', name: 'Heading', icon: <Type size={16} /> },
        { id: 'description', name: 'Description', icon: <FileText size={16} /> },
        { id: 'button', name: 'Button', icon: <MousePointer size={16} /> },
        { id: 'logo', name: 'Logo', icon: <Star size={16} /> },
        { id: 'image', name: 'Image', icon: <ImageIcon size={16} /> },
        { id: 'slider', name: 'Slider', icon: <Film size={16} /> },
        { id: 'video', name: 'Video', icon: <Film size={16} /> },
        { id: 'pdf', name: 'PDF', icon: <File size={16} /> },
        { id: 'menu', name: 'Menu', icon: <MenuIcon size={16} /> },
        { id: 'weekly_schedule', name: 'Weekly Schedule', icon: <Calendar size={16} /> },
        { id: 'days_scheduler', name: 'Days Scheduler', icon: <Calendar size={16} /> },
        { id: 'contacts', name: 'Contacts', icon: <User size={16} /> },
        { id: 'companies', name: 'Companies', icon: <Building2 size={16} /> },
        { id: 'multiple_links', name: 'Multiple Links', icon: <Link size={16} /> },
        { id: 'social_links', name: 'Social Links', icon: <Share2 size={16} /> },
        { id: 'facilities', name: 'Facilities', icon: <Star size={16} /> },
    ];

    const hasLogo = addedComponents.some(c => c.type === 'logo');
    const hasImage = addedComponents.some(c => c.type === 'image');
    const hasSlider = addedComponents.some(c => c.type === 'slider');
    const hasVideo = addedComponents.some(c => c.type === 'video');
    const hasPdf = addedComponents.some(c => c.type === 'pdf');
    const hasMenu = addedComponents.some(c => c.type === 'menu');
    const hasWeeklySchedule = addedComponents.some(c => c.type === 'weekly_schedule');
    const hasDaysScheduler = addedComponents.some(c => c.type === 'days_scheduler');
    const hasContacts = addedComponents.some(c => c.type === 'contacts');
    const hasCompanies = addedComponents.some(c => c.type === 'companies');
    const hasMultipleLinks = addedComponents.some(c => c.type === 'multiple_links');
    const hasSocialLinks = addedComponents.some(c => c.type === 'social_links');
    const hasFacilities = addedComponents.some(c => c.type === 'facilities');

    const handleaddComponent = (type) => {
        if (type === 'logo' && hasLogo) return;
        if (type === 'image' && hasImage) return;
        if (type === 'slider' && hasSlider) return;
        if (type === 'video' && hasVideo) return;
        if (type === 'pdf' && hasPdf) return;
        if (type === 'menu' && hasMenu) return;
        if (type === 'weekly_schedule' && hasWeeklySchedule) return;
        if (type === 'days_scheduler' && hasDaysScheduler) return;
        if (type === 'contacts' && hasContacts) return;
        if (type === 'companies' && hasCompanies) return;
        if (type === 'multiple_links' && hasMultipleLinks) return;
        if (type === 'social_links' && hasSocialLinks) return;
        if (type === 'facilities' && hasFacilities) return;

        const newId = Date.now();
        let initialData = {};

        if (type === 'heading' || type === 'description') {
            initialData = {
                text: type === 'heading' ? 'Heading' : 'Description',
                color: '#831717',
                font: 'Lato',
                align: 'right',
                size: '16'
            };
        } else if (type === 'button') {
            initialData = {
                text: 'Click here',
                link: '',
                fontSize: '14',
                fontFamily: 'Lato',
                textColor: '#ffa305',
                bgColor: '#ffd89a',
                borderWidth: '1',
                borderColor: '#ffa305',
                borderRadius: '4',
                width: 'auto',
                position: 'center'
            };
        } else if (type === 'logo') {
            initialData = {
                selectedLogo: 'logo1',
                size: '80',
                position: 'center',
                borderWidth: '4',
                borderColor: '#ffa305',
                frame: 'circle'
            };
        } else if (type === 'image') {
            initialData = {
                selectedImage: 'img1',
                size: '160'
            };
        } else if (type === 'slider') {
            initialData = {
                images: []
            };
        } else if (type === 'video') {
            initialData = {
                title: 'Jacket Video',
                url: ''
            };
        } else if (type === 'pdf') {
            initialData = {
                fileName: 'Qr Insight Presentation',
                url: ''
            };
        } else if (type === 'menu') {
            initialData = {
                currency: 'USD',
                categories: [
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
                            }
                        ]
                    },
                    {
                        id: 'coffee',
                        name: 'Coffee',
                        products: [
                            { id: 'c1', name: '', price: '', description: '', image: '' }
                        ]
                    },
                    {
                        id: 'juices',
                        name: 'Juices',
                        products: [
                            { id: 'j1', name: '', price: '', description: '', image: '' }
                        ]
                    }
                ]
            };
            setOpenMenuCategoryId('burger');
        } else if (type === 'weekly_schedule') {
            initialData = {
                timeFormat: 'AM/PM',
                timings: [
                    { day: 'Monday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
                    { day: 'Tuesday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
                    { day: 'Wednesday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
                    { day: 'Thursday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
                    { day: 'Friday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
                    { day: 'Saturday', isOpen: true, start: '08:00 AM', end: '08:00 AM' },
                    { day: 'Sunday', isOpen: false, start: '08:00 AM', end: '08:00 AM' },
                ]
            };
        } else if (type === 'days_scheduler') {
            initialData = {
                timeFormat: 'AM/PM',
                days: [
                    { id: Date.now(), date: '2023-03-03', beginsAt: '04:00 AM', endsAt: '06:00 AM' },
                    { id: Date.now() + 1, date: '2023-03-04', beginsAt: '04:00 AM', endsAt: '06:00 AM' }
                ]
            };
        } else if (type === 'contacts') {
            initialData = {
                phone: '+1 555 555 1234',
                email: 'Hellen@gmail.com',
                website: 'https://Hellengrey.com'
            };
        } else if (type === 'companies') {
            initialData = {
                companies: [
                    { id: Date.now(), name: 'Techoid', profession: 'Designer' },
                    { id: Date.now() + 1, name: 'Barcodes Pakistan', profession: 'Creative Designer' }
                ]
            };
        } else if (type === 'multiple_links') {
            initialData = {
                links: [
                    { id: Date.now(), url: '', title: 'Visit Us Online' },
                    { id: Date.now() + 1, url: '', title: 'Talk to Us' },
                    { id: Date.now() + 2, url: '', title: 'Instagram' },
                    { id: Date.now() + 3, url: '', title: 'Youtube' }
                ]
            };
        } else if (type === 'social_links') {
            initialData = {
                heading: 'Follow us on',
                textColor: '#FFFFFF',
                font: 'Lato',
                bgColor: '#0B2D86',
                selectedPlatforms: []
            };
        } else if (type === 'facilities') {
            initialData = {
                selectedFacilities: []
            };
        }

        if (Object.keys(initialData).length > 0) {
            const newComp = {
                id: newId,
                type: type,
                isOpen: true,
                data: initialData
            };
            setAddedComponents([...addedComponents, newComp]);
            setOpenComponentId(newId);
        }
    };

    const removeComponent = (id) => {
        setAddedComponents(addedComponents.filter(c => c.id !== id));
    };

    const toggleComponent = (id) => {
        if (openComponentId === id) setOpenComponentId(null);
        else setOpenComponentId(id);
    };

    const updateComponentData = (id, fieldOrObject, value) => {
        setAddedComponents(prev => prev.map(c => {
            if (c.id !== id) return c;
            if (typeof fieldOrObject === 'object' && fieldOrObject !== null) {
                return { ...c, data: { ...c.data, ...fieldOrObject } };
            }
            return { ...c, data: { ...c.data, [fieldOrObject]: value } };
        }));
    };

    // --- Menu Helpers ---
    const toggleMenuCategory = (catId) => {
        if (openMenuCategoryId === catId) setOpenMenuCategoryId(null);
        else setOpenMenuCategoryId(catId);
    };

    const updateMenuCategories = (compId, newCategories) => {
        updateComponentData(compId, 'categories', newCategories);
    };

    const addMenuCategory = (compId) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newId = `cat-${Date.now()}`;
        const newCat = { id: newId, name: '', products: [] };
        const newCategories = [...comp.data.categories, newCat];
        updateMenuCategories(compId, newCategories);
        setOpenMenuCategoryId(newId);
    };

    const handleMenuCategoryNameChange = (compId, catId, newName) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newCategories = comp.data.categories.map(c => c.id === catId ? { ...c, name: newName } : c);
        updateMenuCategories(compId, newCategories);
    };

    const handleMenuProductChange = (compId, catId, prodId, field, value) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newCategories = comp.data.categories.map(c => {
            if (c.id !== catId) return c;
            const newProds = c.products.map(p => p.id === prodId ? { ...p, [field]: value } : p);
            return { ...c, products: newProds };
        });
        updateMenuCategories(compId, newCategories);
    };

    const addMenuProduct = (compId, catId) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newCategories = comp.data.categories.map(c => {
            if (c.id !== catId) return c;
            return {
                ...c,
                products: [...c.products, { id: Date.now(), name: '', price: '', description: '', image: '' }]
            };
        });
        updateMenuCategories(compId, newCategories);
    };

    // --- Weekly Schedule Helpers ---
    const handleWeeklyScheduleTimingChange = (compId, index, field, value) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newTimings = [...comp.data.timings];
        newTimings[index][field] = value;
        updateComponentData(compId, 'timings', newTimings);
    };

    // --- Days Scheduler Helpers ---
    const handleDaysSchedulerChange = (compId, dayId, field, value) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newDays = comp.data.days.map(d => d.id === dayId ? { ...d, [field]: value } : d);
        updateComponentData(compId, 'days', newDays);
    };

    const addSchedulerDay = (compId) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newDay = { id: Date.now(), date: '', beginsAt: '04:00 AM', endsAt: '06:00 AM' };
        const newDays = [...comp.data.days, newDay];
        updateComponentData(compId, 'days', newDays);
    };

    const removeSchedulerDay = (compId, dayId) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newDays = comp.data.days.filter(d => d.id !== dayId);
        updateComponentData(compId, 'days', newDays);
    };

    // --- Contacts Helpers ---
    const handleContactChange = (compId, field, value) => {
        updateComponentData(compId, field, value);
    };

    const deleteContactField = (compId, field) => {
        updateComponentData(compId, field, '');
    };

    // --- Companies Helpers ---
    const handleCompanyChange = (compId, companyId, field, value) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newCompanies = comp.data.companies.map(company =>
            company.id === companyId ? { ...company, [field]: value } : company
        );
        updateComponentData(compId, 'companies', newCompanies);
    };

    const addCompany = (compId) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newCompany = { id: Date.now(), name: '', profession: '' };
        const newCompanies = [...comp.data.companies, newCompany];
        updateComponentData(compId, 'companies', newCompanies);
    };

    const removeCompany = (compId, companyId) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newCompanies = comp.data.companies.filter(company => company.id !== companyId);
        updateComponentData(compId, 'companies', newCompanies);
    };

    // --- Multiple Links Helpers ---
    const handleLinkChange = (compId, linkId, field, value) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newLinks = comp.data.links.map(link =>
            link.id === linkId ? { ...link, [field]: value } : link
        );
        updateComponentData(compId, 'links', newLinks);
    };

    const addLink = (compId) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newLink = { id: Date.now(), url: '', title: '' };
        const newLinks = [...comp.data.links, newLink];
        updateComponentData(compId, 'links', newLinks);
    };

    const removeLink = (compId, linkId) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newLinks = comp.data.links.filter(link => link.id !== linkId);
        updateComponentData(compId, 'links', newLinks);
    };

    // --- Social Links Helpers ---
    const toggleSocialPlatform = (compId, platform) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const exists = comp.data.selectedPlatforms.find(p => p.name === platform);
        let newPlatforms;
        if (exists) {
            newPlatforms = comp.data.selectedPlatforms.filter(p => p.name !== platform);
        } else {
            newPlatforms = [...comp.data.selectedPlatforms, { name: platform, url: '' }];
        }
        updateComponentData(compId, 'selectedPlatforms', newPlatforms);
    };

    const handleSocialUrlChange = (compId, platform, url) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const newPlatforms = comp.data.selectedPlatforms.map(p =>
            p.name === platform ? { ...p, url } : p
        );
        updateComponentData(compId, 'selectedPlatforms', newPlatforms);
    };

    // --- Facilities Helpers ---
    const toggleFacility = (compId, facilityName) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (!comp) return;
        const exists = comp.data.selectedFacilities.includes(facilityName);
        let newFacilities;
        if (exists) {
            newFacilities = comp.data.selectedFacilities.filter(f => f !== facilityName);
        } else {
            newFacilities = [...comp.data.selectedFacilities, facilityName];
        }
        updateComponentData(compId, 'selectedFacilities', newFacilities);
    };

    // --- Slider Modal Handlers ---
    const handleFileChange = (e, compId) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setUploadModalTempImage(reader.result);
            setUploadModalFileName(file.name);
            setUploadModalContext({ type: 'slider', id: compId });
            setIsUploadModalOpen(true);
        };
        reader.readAsDataURL(file);
        e.target.value = null;
    };

    const handleUploadModalSave = (url) => {
        if (!uploadModalContext) return;
        const { type, id } = uploadModalContext;

        if (type === 'slider') {
            const comp = addedComponents.find(c => c.id === id);
            if (comp) {
                const newImages = [...comp.data.images, url];
                updateComponentData(id, 'images', newImages);
            }
        } else if (type === 'image') {
            updateComponentData(id, {
                url: url,
                selectedImage: 'custom'
            });
        } else if (type === 'menu_product') {
            const { compId, catId, prodId } = uploadModalContext;
            setAddedComponents(prev => prev.map(comp => {
                if (comp.id !== compId) return comp;
                const newCategories = comp.data.categories.map(cat => {
                    if (cat.id !== catId) return cat;
                    const newProducts = cat.products.map(prod => {
                        if (prod.id !== prodId) return prod;
                        return { ...prod, image: url };
                    });
                    return { ...cat, products: newProducts };
                });
                return { ...comp, data: { ...comp.data, categories: newCategories } };
            }));
        }

        setIsUploadModalOpen(false);
        setUploadModalTempImage(null);
        setUploadModalFileName('');
        setUploadModalContext(null);
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setTempImage(null);
        setCurrentSliderId(null);
    };

    const handleModalSave = async () => {
        if (!currentSliderId) return;
        try {
            setUploading(true);
            const croppedImageBlob = await getCroppedImg(
                tempImage,
                croppedAreaPixels,
                rotation
            );

            const formData = new FormData();
            formData.append('image', croppedImageBlob, "slider-image.jpg");

            const res = await axios.post(`http://localhost:3000/api/upload/image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Add image to slider
            const comp = addedComponents.find(c => c.id === currentSliderId);
            if (comp) {
                const newImages = [...comp.data.images, res.data.url];
                updateComponentData(currentSliderId, 'images', newImages);
            }

            setIsModalOpen(false);
            setTempImage(null);
            setCurrentSliderId(null);
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const removeSliderImage = (compId, index) => {
        const comp = addedComponents.find(c => c.id === compId);
        if (comp) {
            const newImages = comp.data.images.filter((_, i) => i !== index);
            updateComponentData(compId, 'images', newImages);
        }
    };

    // --- Logo Upload Handler ---
    const handleLogoUpload = async (e, compId) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('image', file);

            const res = await axios.post(`http://localhost:3000/api/upload/image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Update both fields in one go to avoid race conditions
            updateComponentData(compId, {
                url: res.data.url,
                selectedLogo: 'custom'
            });
        } catch (err) {
            console.error('Logo upload failed:', err);
            alert('Logo upload failed');
        } finally {
            setUploading(false);
            e.target.value = null;
        }
    };

    const triggerLogoUpload = () => {
        if (logoFileInputRef.current) {
            logoFileInputRef.current.click();
        }
    };

    // --- Image Upload Handlers ---
    const triggerImageUpload = () => {
        if (imageFileInputRef.current) imageFileInputRef.current.click();
    };

    const handleImageUpload = (e, compId) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setUploadModalTempImage(reader.result);
            setUploadModalFileName(file.name);
            setUploadModalContext({ type: 'image', id: compId });
            setIsUploadModalOpen(true);
        };
        reader.readAsDataURL(file);
        e.target.value = null;
    };

    // --- Video Upload Handler ---
    const handleVideoUpload = async (e, compId) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('video', file);

            const res = await axios.post(`http://localhost:3000/api/upload/video`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            updateComponentData(compId, 'url', res.data.url);
        } catch (err) {
            console.error('Video upload failed:', err);
            alert('Video upload failed');
        } finally {
            setUploading(false);
            e.target.value = null;
        }
    };

    // --- PDF Upload Handler ---
    const handlePdfUpload = async (e, forcedCompId = null) => {
        const file = e.target.files[0];
        if (!file) return;

        const targetId = forcedCompId || activePdfCompId;
        if (!targetId) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('pdf', file);

            const res = await axios.post(`http://localhost:3000/api/upload/pdf`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            updateComponentData(targetId, {
                url: res.data.url,
                fileName: file.name
            });
        } catch (err) {
            console.error('PDF upload failed:', err);
            alert('PDF upload failed');
        } finally {
            setUploading(false);
            e.target.value = null;
            setActivePdfCompId(null);
        }
    };

    const triggerPdfUpload = (compId) => {
        setActivePdfCompId(compId);
        if (pdfFileInputRef.current) {
            pdfFileInputRef.current.click();
        }
    };

    // --- Menu Product Handlers ---
    const handleMenuProductImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file || !activeMenuProduct) return;

        const reader = new FileReader();
        reader.onload = () => {
            const { compId, catId, prodId } = activeMenuProduct;
            setUploadModalTempImage(reader.result);
            setUploadModalFileName(file.name);
            setUploadModalContext({ type: 'menu_product', compId, catId, prodId, id: compId });
            setIsUploadModalOpen(true);
        };
        reader.readAsDataURL(file);
        e.target.value = null;
    };

    const triggerMenuProductImageUpload = (compId, catId, prodId) => {
        setActiveMenuProduct({ compId, catId, prodId });
        if (menuImageInputRef.current) {
            menuImageInputRef.current.click();
        }
    };

    const removeMenuProduct = (compId, catId, prodId) => {
        setAddedComponents(prev => prev.map(comp => {
            if (comp.id !== compId) return comp;

            const newCategories = comp.data.categories.map(cat => {
                if (cat.id !== catId) return cat;
                return { ...cat, products: cat.products.filter(p => p.id !== prodId) };
            });

            return { ...comp, data: { ...comp.data, categories: newCategories } };
        }));
    };

    const primaryColor = design.primaryColor || '#1e293b';
    const secondaryColor = design.secondaryColor || '#ffa305';

    const handleDesignUpdate = (key, value) => {
        onChange(prev => ({
            ...prev,
            design: { ...prev.design, [key]: value }
        }));
    };

    const handleColorPaletteClick = (primary, secondary) => {
        onChange(prev => ({
            ...prev,
            design: { ...prev.design, primaryColor: primary, secondaryColor: secondary }
        }));
    };

    const palettes = [
        { p: '#1e293b', s: '#ffa305' },
        { p: '#0f172a', s: '#334155' },
        { p: '#0f766e', s: '#22c55e' },
        { p: '#4c1d95', s: '#ffa305' },
        { p: '#0369a1', s: '#38bdf8' }
    ];

    const logoOptions = [
        { id: 'logo1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
        { id: 'logo2', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Food' },
        { id: 'logo3', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' }
    ];

    const imageOptions = [
        { id: 'img1', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=150&q=80' },
        { id: 'img2', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=150&q=80' },
        { id: 'img3', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=150&q=80' },
        { id: 'img4', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=150&q=80' },
        { id: 'img5', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=150&q=80' },
    ];

    return (
        <div>
            <ReusableDesignAccordion
                design={{
                    ...design,
                    primaryColor,
                    secondaryColor
                }}
                onChange={handleDesignUpdate}
                isOpen={isDesignOpen}
                onToggle={() => setIsDesignOpen(!isDesignOpen)}
                colorKeys={{ primary: 'primaryColor', secondary: 'secondaryColor' }}
                palettes={palettes}
                logoKey="logo.url"
                showLogo={true}
                logoLabel="LOGO"
                logoOptions={logoOptions}
            />

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #334155', overflow: 'hidden' }}
            >
                <button
                    type="button"
                    onClick={() => setIsComponentsOpen(!isComponentsOpen)}
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
                    <div>
                        <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'none' }}>Available Components</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>Add components below and make your custom type</div>
                    </div>
                    <motion.div animate={{ rotate: isComponentsOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                        <ChevronDown size={18} color="#94a3b8" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {isComponentsOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ borderTop: '1px solid #334155', background: '#020617' }}
                        >
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    {components.map((comp) => {
                                        const isAdded = (comp.id === 'logo' && hasLogo) ||
                                            (comp.id === 'image' && hasImage) ||
                                            (comp.id === 'slider' && hasSlider) ||
                                            (comp.id === 'video' && hasVideo) ||
                                            (comp.id === 'pdf' && hasPdf) ||
                                            (comp.id === 'menu' && hasMenu) ||
                                            (comp.id === 'weekly_schedule' && hasWeeklySchedule) ||
                                            (comp.id === 'days_scheduler' && hasDaysScheduler) ||
                                            (comp.id === 'contacts' && hasContacts) ||
                                            (comp.id === 'companies' && hasCompanies) ||
                                            (comp.id === 'multiple_links' && hasMultipleLinks) ||
                                            (comp.id === 'social_links' && hasSocialLinks) ||
                                            (comp.id === 'facilities' && hasFacilities);
                                        return (
                                            <button
                                                key={comp.id}
                                                onClick={() => handleaddComponent(comp.id)}
                                                disabled={isAdded}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    background: isAdded ? 'rgba(15,23,42,0.9)' : '#ffa305',
                                                    color: isAdded ? '#64748b' : '#0f172a',
                                                    border: 'none',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '999px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600',
                                                    cursor: isAdded ? 'default' : 'pointer'
                                                }}
                                            >
                                                {isAdded ? <Check size={14} /> : <Plus size={14} />}
                                                {comp.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
                {addedComponents.map((comp) => (
                    <div key={comp.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <div style={{ flex: 1, background: '#0f172a', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden' }}>
                            <div
                                onClick={() => toggleComponent(comp.id)}
                                style={{
                                    padding: '1rem 1.25rem',
                                    background: 'rgba(15,23,42,0.9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    borderBottom: openComponentId === comp.id ? '1px solid #334155' : 'none'
                                }}
                            >
                                <div style={{ fontWeight: '600', color: '#f8fafc', fontSize: '0.95rem', textTransform: 'none' }}>
                                    {comp.type === 'weekly_schedule' ? 'Weekly Scheduler' : comp.type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                </div>
                                <div style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                                    {openComponentId === comp.id ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {openComponentId === comp.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                        style={{ borderTop: '1px solid #334155', background: '#020617' }}
                                    >
                                        <div style={{ padding: '1.25rem' }}>

                                    {/* HEADING / DESCRIPTION UI */}
                                    {(comp.type === 'heading' || comp.type === 'description') && (
                                        <>
                                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{comp.type}*</label><input type="text" value={comp.data.text} onChange={(e) => updateComponentData(comp.id, 'text', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }} /></div>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Text Color</label><div style={{ display: 'flex', alignItems: 'center', border: '1px solid #334155', borderRadius: '10px', padding: '0.5rem 0.75rem', height: '44px', background: '#020617' }}><input type="text" value={comp.data.color} onChange={(e) => updateComponentData(comp.id, 'color', e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#e5e7eb', fontWeight: '500', background: 'transparent' }} /><div style={{ width: '28px', height: '28px', borderRadius: '6px', position: 'relative', overflow: 'hidden', border: '1px solid #334155', flexShrink: 0 }}><div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: comp.data.color }}></div><input type="color" value={comp.data.color} onChange={(e) => updateComponentData(comp.id, 'color', e.target.value)} style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', cursor: 'pointer', opacity: 0 }} /></div></div></div>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Font</label>
                                                    <select
                                                        value={comp.data.font || 'Inter'}
                                                        onChange={(e) => updateComponentData(comp.id, 'font', e.target.value)}
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem 1rem',
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
                                                        <option value="Inter">Inter</option>
                                                        <option value="Lato">Lato</option>
                                                        <option value="Work Sans">Work Sans</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div style={{ position: 'relative', height: '1px', background: 'none', borderTop: '1px dashed #334155', margin: '2rem 0' }}><span style={{ position: 'absolute', top: '-10px', left: '2rem', background: '#020617', padding: '0 1rem', fontSize: '0.85rem', fontWeight: '600', color: '#f8fafc' }}>Formatting</span></div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Text Align</label>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        {['left', 'center', 'right'].map(align => (
                                                            <div key={align} onClick={() => updateComponentData(comp.id, 'align', align)} style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: comp.data.align === align ? 'rgba(148,163,184,0.15)' : 'transparent', color: comp.data.align === align ? '#ffa305' : '#94a3b8' }}>
                                                                {align === 'left' ? <AlignLeft size={20} /> : align === 'center' ? <AlignCenter size={20} /> : <AlignRight size={20} />}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Font Size</label><input type="text" value={comp.data.size} onChange={(e) => updateComponentData(comp.id, 'size', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }} /></div>
                                            </div>
                                        </>
                                    )}

                                    {/* BUTTON UI */}
                                    {comp.type === 'button' && (
                                        <>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>BUTTON</label><input type="text" value={comp.data.text} onChange={(e) => updateComponentData(comp.id, 'text', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }} /></div>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>LINK</label><input type="text" value={comp.data.link} placeholder="enter here link..." onChange={(e) => updateComponentData(comp.id, 'link', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }} /></div>
                                            </div>
                                            <div style={{ position: 'relative', height: '1px', background: 'none', borderTop: '1px dashed #334155', margin: '2rem 0' }}><span style={{ position: 'absolute', top: '-10px', left: '2rem', background: '#020617', padding: '0 1rem', fontSize: '0.85rem', fontWeight: '600', color: '#f8fafc' }}>Formatting</span></div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Font Size</label><input type="text" value={comp.data.fontSize} onChange={(e) => updateComponentData(comp.id, 'fontSize', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }} /></div>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Font Family</label>
                                                    <select
                                                        value={comp.data.fontFamily || 'Inter'}
                                                        onChange={(e) => updateComponentData(comp.id, 'fontFamily', e.target.value)}
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem 1rem',
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
                                                        <option value="Inter">Inter</option>
                                                        <option value="Lato">Lato</option>
                                                        <option value="Work Sans">Work Sans</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Text Color</label><div style={{ display: 'flex', alignItems: 'center', border: '1px solid #334155', borderRadius: '10px', padding: '0.5rem 0.75rem', height: '44px', background: '#020617' }}><input type="text" value={comp.data.textColor} onChange={(e) => updateComponentData(comp.id, 'textColor', e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#e5e7eb', fontWeight: '500', background: 'transparent' }} /><div style={{ width: '28px', height: '28px', borderRadius: '6px', position: 'relative', overflow: 'hidden', border: '1px solid #334155' }}><div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: comp.data.textColor }}></div><input type="color" value={comp.data.textColor} onChange={(e) => updateComponentData(comp.id, 'textColor', e.target.value)} style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', cursor: 'pointer', opacity: 0 }} /></div></div></div>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Background Color</label><div style={{ display: 'flex', alignItems: 'center', border: '1px solid #334155', borderRadius: '10px', padding: '0.5rem 0.75rem', height: '44px', background: '#020617' }}><input type="text" value={comp.data.bgColor} onChange={(e) => updateComponentData(comp.id, 'bgColor', e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#e5e7eb', fontWeight: '500', background: 'transparent' }} /><div style={{ width: '28px', height: '28px', borderRadius: '6px', position: 'relative', overflow: 'hidden', border: '1px solid #334155' }}><div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: comp.data.bgColor }}></div><input type="color" value={comp.data.bgColor} onChange={(e) => updateComponentData(comp.id, 'bgColor', e.target.value)} style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', cursor: 'pointer', opacity: 0 }} /></div></div></div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Border Width</label><input type="text" value={comp.data.borderWidth} onChange={(e) => updateComponentData(comp.id, 'borderWidth', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }} /></div>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Border Color</label><div style={{ display: 'flex', alignItems: 'center', border: '1px solid #334155', borderRadius: '10px', padding: '0.5rem 0.75rem', height: '44px', background: '#020617' }}><input type="text" value={comp.data.borderColor} onChange={(e) => updateComponentData(comp.id, 'borderColor', e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#e5e7eb', fontWeight: '500', background: 'transparent' }} /><div style={{ width: '28px', height: '28px', borderRadius: '6px', position: 'relative', overflow: 'hidden', border: '1px solid #334155' }}><div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: comp.data.borderColor }}></div><input type="color" value={comp.data.borderColor} onChange={(e) => updateComponentData(comp.id, 'borderColor', e.target.value)} style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', cursor: 'pointer', opacity: 0 }} /></div></div></div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Border Radius</label><input type="text" value={comp.data.borderRadius} onChange={(e) => updateComponentData(comp.id, 'borderRadius', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }} /></div>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Width</label><div style={{ display: 'flex', gap: '2rem', alignItems: 'center', height: '44px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => updateComponentData(comp.id, 'width', 'full')}><div style={{ width: '20px', height: '20px', borderRadius: '50%', border: comp.data.width === 'full' ? '6px solid #ffa305' : '1px solid #334155', background: '#020617' }}></div><span style={{ fontSize: '0.9rem', fontWeight: comp.data.width === 'full' ? 'bold' : 'normal', color: '#f8fafc' }}>Full</span></div><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => updateComponentData(comp.id, 'width', 'auto')}><div style={{ width: '20px', height: '20px', borderRadius: '50%', border: comp.data.width === 'auto' ? '6px solid #ffa305' : '1px solid #334155', background: '#020617' }}></div><span style={{ fontSize: '0.9rem', fontWeight: comp.data.width === 'auto' ? 'bold' : 'normal', color: '#f8fafc' }}>Auto</span></div></div></div>
                                            </div>
                                            <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Position</label><div style={{ display: 'flex', gap: '0.5rem' }}>{['left', 'center', 'right'].map(pos => (<div key={pos} onClick={() => updateComponentData(comp.id, 'position', pos)} style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: comp.data.position === pos ? 'rgba(148,163,184,0.15)' : 'transparent', color: comp.data.position === pos ? '#ffa305' : '#94a3b8' }}>{pos === 'left' ? <AlignLeft size={20} /> : pos === 'center' ? <AlignCenter size={20} /> : <AlignRight size={20} />}</div>))}</div></div>
                                        </>
                                    )}

                                    {/* LOGO UI */}
                                    {comp.type === 'logo' && (
                                        <>
                                            <div style={{ marginBottom: '2rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#ffa305', textTransform: 'uppercase' }}>LOGO</span>
                                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>128x128px, 1:1 Ratio</span>
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                    <div onClick={() => updateComponentData(comp.id, 'selectedLogo', '')} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#020617' }}><X size={24} color="#94a3b8" /></div>
                                                    {logoOptions.map(l => (
                                                        <div key={l.id} onClick={() => updateComponentData(comp.id, 'selectedLogo', l.id)} style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: comp.data.selectedLogo === l.id ? '2px solid #ffa305' : '1px solid #334155', cursor: 'pointer', position: 'relative' }}>
                                                            <img src={l.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            {comp.data.selectedLogo === l.id && (<div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', background: '#ffa305', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}><Check size={12} color="#fff" /></div>)}
                                                        </div>
                                                    ))}
                                                    {comp.data.url && (
                                                        <div
                                                            onClick={() => {
                                                                updateComponentData(comp.id, 'selectedLogo', 'custom');
                                                                setPreviewImage(comp.data.url);
                                                                setIsPreviewModalOpen(true);
                                                            }}
                                                            onMouseEnter={() => setIsLogoHovered(true)}
                                                            onMouseLeave={() => setIsLogoHovered(false)}
                                                            style={{
                                                                width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden',
                                                                border: comp.data.selectedLogo === 'custom' ? '2px solid #ffa305' : '1px solid #334155',
                                                                cursor: 'pointer', position: 'relative'
                                                            }}
                                                        >
                                                            <img src={comp.data.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            {comp.data.selectedLogo === 'custom' && (<div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', background: '#ffa305', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #334155' }}><Check size={12} color="#fff" /></div>)}
                                                            {isLogoHovered && (
                                                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                                                                    <Eye size={18} color="#fff" />
                                                                    <span style={{ color: '#fff', fontSize: '8px' }}>Preview</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    <div onClick={triggerLogoUpload} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1px dashed #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', background: '#020617' }}>
                                                        <input
                                                            type="file"
                                                            ref={logoFileInputRef}
                                                            onChange={(e) => handleLogoUpload(e, comp.id)}
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                        />
                                                        <UploadCloud size={20} color="#94a3b8" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ position: 'relative', height: '1px', background: 'none', borderTop: '1px dashed #334155', margin: '2rem 0' }}><span style={{ position: 'absolute', top: '-10px', left: '2rem', background: '#020617', padding: '0 1rem', fontSize: '0.85rem', fontWeight: '600', color: '#f8fafc' }}>Formatting</span></div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', marginBottom: '1.5rem' }}>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Position</label><div style={{ display: 'flex', gap: '0.5rem' }}>{['left', 'center', 'right'].map(pos => (<div key={pos} onClick={() => updateComponentData(comp.id, 'position', pos)} style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: comp.data.position === pos ? 'rgba(148,163,184,0.15)' : 'transparent', color: comp.data.position === pos ? '#ffa305' : '#94a3b8' }}>{pos === 'left' ? <AlignLeft size={20} /> : pos === 'center' ? <AlignCenter size={20} /> : <AlignRight size={20} />}</div>))}</div></div>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Size</label><input type="text" value={comp.data.size} onChange={(e) => updateComponentData(comp.id, 'size', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }} /></div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Border Width</label><input type="text" value={comp.data.borderWidth} onChange={(e) => updateComponentData(comp.id, 'borderWidth', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }} /></div>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Border Color</label><div style={{ display: 'flex', alignItems: 'center', border: '1px solid #334155', borderRadius: '10px', padding: '0.5rem 0.75rem', height: '44px', background: '#020617' }}><input type="text" value={comp.data.borderColor} onChange={(e) => updateComponentData(comp.id, 'borderColor', e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#e5e7eb', fontWeight: '500', background: 'transparent' }} /><div style={{ width: '28px', height: '28px', borderRadius: '6px', position: 'relative', overflow: 'hidden', border: '1px solid #334155' }}><div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: comp.data.borderColor }}></div><input type="color" value={comp.data.borderColor} onChange={(e) => updateComponentData(comp.id, 'borderColor', e.target.value)} style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', cursor: 'pointer', opacity: 0 }} /></div></div></div>
                                            </div>
                                                <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Frame</label><div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>{['circle', 'square', 'rounded'].map(f => (<div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => updateComponentData(comp.id, 'frame', f)}><div style={{ width: '20px', height: '20px', borderRadius: '50%', border: comp.data.frame === f ? '6px solid #ffa305' : '1px solid #334155', background: '#020617' }}></div><span style={{ fontSize: '0.9rem', fontWeight: comp.data.frame === f ? 'bold' : 'normal', color: '#f8fafc', textTransform: 'capitalize' }}>{f}</span></div>))}</div></div>
                                        </>
                                    )}

                                    {/* IMAGE UI */}
                                    {comp.type === 'image' && (
                                        <>
                                            <div style={{ marginBottom: '2rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#ffa305', textTransform: 'uppercase' }}>IMAGE</span>
                                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Minimum width: 400px, 3:2 Ratio</span>
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                                    <div onClick={() => updateComponentData(comp.id, 'selectedImage', '')} style={{ width: '64px', height: '64px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#020617' }}><X size={24} color="#94a3b8" /></div>
                                                    {imageOptions.map(l => (
                                                        <div key={l.id} onClick={() => updateComponentData(comp.id, 'selectedImage', l.id)} style={{ width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden', border: comp.data.selectedImage === l.id ? '2px solid #ffa305' : '1px solid #334155', cursor: 'pointer', position: 'relative' }}>
                                                            <img src={l.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            {comp.data.selectedImage === l.id && (<div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', background: '#ffa305', borderBottomRightRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={12} color="#0f172a" /></div>)}
                                                        </div>
                                                    ))}
                                                    {comp.data.url && (
                                                        <div
                                                            onClick={() => {
                                                                updateComponentData(comp.id, 'selectedImage', 'custom');
                                                                setPreviewImage(comp.data.url);
                                                                setIsPreviewModalOpen(true);
                                                            }}
                                                            onMouseEnter={() => setIsImageHovered(true)}
                                                            onMouseLeave={() => setIsImageHovered(false)}
                                                            style={{
                                                                width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden',
                                                                border: comp.data.selectedImage === 'custom' ? '2px solid #ffa305' : '1px solid #334155',
                                                                cursor: 'pointer', position: 'relative', background: '#020617'
                                                            }}
                                                        >
                                                            <img src={comp.data.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            {comp.data.selectedImage === 'custom' && (<div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', background: '#ffa305', borderBottomRightRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={12} color="#0f172a" /></div>)}
                                                            {isImageHovered && (
                                                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                                                                    <Eye size={18} color="#fff" />
                                                                    <span style={{ color: '#fff', fontSize: '8px' }}>Preview</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    <div onClick={triggerImageUpload} style={{ width: '64px', height: '64px', borderRadius: '10px', border: '1px dashed #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', background: '#020617' }}>
                                                        <input
                                                            type="file"
                                                            ref={imageFileInputRef}
                                                            onChange={(e) => handleImageUpload(e, comp.id)}
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                        />
                                                        <UploadCloud size={20} color="#94a3b8" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ position: 'relative', height: '1px', background: 'none', borderTop: '1px dashed #334155', margin: '2rem 0' }}><span style={{ position: 'absolute', top: '-10px', left: '2rem', background: '#020617', padding: '0 1rem', fontSize: '0.85rem', fontWeight: '600', color: '#f8fafc' }}>Formatting</span></div>
                                            <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Size</label><input type="text" value={comp.data.size} onChange={(e) => updateComponentData(comp.id, 'size', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }} /></div>
                                        </>
                                    )}

                                    {/* SLIDER UI */}
                                    {comp.type === 'slider' && (
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                            {/* Uploaded Images */}
                                            {comp.data.images.map((img, idx) => (
                                                <div key={idx} style={{ width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #334155', position: 'relative', background: '#020617' }}>
                                                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    <div
                                                        onClick={() => removeSliderImage(comp.id, idx)}
                                                        style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', background: '#ffa305', borderBottomRightRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                                    >
                                                        <X size={12} color="#fff" />
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Upload Button */}
                                                    <label style={{
                                                        width: '64px', height: '64px', borderRadius: '10px',
                                                        border: '1px dashed #334155', display: 'flex',
                                                        alignItems: 'center', justifyContent: 'center',
                                                        cursor: 'pointer', background: '#020617'
                                                    }}>
                                                <UploadCloud size={20} color="#94a3b8" />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, comp.id)}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>
                                        </div>
                                    )}

                                    {/* VIDEO UI */}
                                    {comp.type === 'video' && (
                                        <div style={{ maxWidth: '100%' }}>
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>VIDEO TITLE*</label>
                                                <input
                                                    type="text"
                                                    value={comp.data.title}
                                                    onChange={(e) => updateComponentData(comp.id, 'title', e.target.value)}
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }}
                                                />
                                            </div>

                                            <div style={{ marginBottom: '1rem' }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>UPLOAD VIDEO</label>
                                                <input
                                                    type="text"
                                                    value={comp.data.url}
                                                    onChange={(e) => updateComponentData(comp.id, 'url', e.target.value)}
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }}
                                                />
                                            </div>

                                            <div style={{ textAlign: 'center', margin: '1rem 0', color: '#ffa305', fontSize: '0.8rem', fontWeight: 'bold' }}>OR</div>

                                            <label style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '10px',
                                                background: '#020617',
                                                border: '1px solid #334155',
                                                cursor: 'pointer',
                                                color: '#e5e7eb',
                                                fontSize: '0.9rem',
                                                fontWeight: '500'
                                            }}>
                                                <UploadCloud size={20} color="#94a3b8" />
                                                Upload/ Choose Video from your Computer
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => handleVideoUpload(e, comp.id)}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>

                                            <div style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.7rem', color: '#64748b' }}>
                                                10MB max Video size
                                            </div>
                                        </div>
                                    )}

                                    {/* PDF UI */}
                                    {comp.type === 'pdf' && (
                                        <div style={{ maxWidth: '100%' }}>
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>PDF TITLE*</label>
                                                <input
                                                    type="text"
                                                    value={comp.data.fileName}
                                                    onChange={(e) => updateComponentData(comp.id, 'fileName', e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem 1rem',
                                                        borderRadius: '10px',
                                                        border: '1px solid #334155',
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        background: '#020617',
                                                        color: '#e5e7eb'
                                                    }}
                                                />
                                            </div>

                                            <div style={{ marginBottom: '1rem' }}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>UPLOAD PDF*</label>
                                                <input
                                                    type="text"
                                                    value={comp.data.url}
                                                    onChange={(e) => updateComponentData(comp.id, 'url', e.target.value)}
                                                    placeholder="https://"
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem 1rem',
                                                        borderRadius: '10px',
                                                        border: '1px solid #334155',
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        background: '#020617',
                                                        color: '#e5e7eb'
                                                    }}
                                                />
                                            </div>

                                            <div style={{ textAlign: 'center', margin: '1rem 0', color: '#ffa305', fontSize: '0.8rem', fontWeight: 'bold' }}>OR</div>

                                            <label
                                                onClick={() => setActivePdfCompId(comp.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem',
                                                    width: '100%',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '10px',
                                                    background: '#020617',
                                                    border: '1px solid #334155',
                                                    cursor: 'pointer',
                                                    color: '#e5e7eb',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '500'
                                                }}>
                                                <UploadCloud size={20} color="#94a3b8" />
                                                Upload/ Choose File from your Computer
                                                <input
                                                    type="file"
                                                    accept="application/pdf"
                                                    ref={pdfFileInputRef}
                                                    onChange={(e) => handlePdfUpload(e)}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>

                                            {comp.data.url && (
                                                <div style={{
                                                    marginTop: '1.5rem',
                                                    padding: '1rem 1.1rem',
                                                    background: '#020617',
                                                    border: '1px solid #334155',
                                                    borderRadius: '12px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden' }}>
                                                        <div style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            background: '#ef4444',
                                                            borderRadius: '8px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: '#fff',
                                                            fontSize: '0.6rem',
                                                            fontWeight: 'bold',
                                                            flexShrink: 0
                                                        }}>PDF</div>
                                                        <span style={{ fontSize: '0.9rem', color: '#e5e7eb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                            {comp.data.fileName}
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <div
                                                            onClick={() => triggerPdfUpload(comp.id)}
                                                            style={{ cursor: 'pointer', color: '#e5e7eb', opacity: 0.9 }}
                                                        >
                                                            <PenLine size={18} />
                                                        </div>
                                                        <div
                                                            onClick={() => updateComponentData(comp.id, { url: '', fileName: '' })}
                                                            style={{ cursor: 'pointer', color: '#fca5a5' }}
                                                        >
                                                            <Trash2 size={18} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* MENU UI */}
                                    {comp.type === 'menu' && (
                                        <div style={{ padding: '0.5rem 0' }}>
                                            <div style={{ borderTop: '1px solid #334155', margin: '0 0 1rem 0' }}></div>

                                            {/* Currency Radio Group */}
                                            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ffa305', textTransform: 'uppercase' }}>Currency:</label>
                                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#e5e7eb' }}>
                                                        <input
                                                            type="radio"
                                                            name={`currency-${comp.id}`}
                                                            value="PKR"
                                                            checked={comp.data.currency === 'PKR'}
                                                            onChange={() => updateComponentData(comp.id, 'currency', 'PKR')}
                                                            style={{ accentColor: '#ffa305' }}
                                                        />
                                                        PKR
                                                    </label>
                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#e5e7eb' }}>
                                                        <input
                                                            type="radio"
                                                            name={`currency-${comp.id}`}
                                                            value="USD"
                                                            checked={comp.data.currency !== 'PKR'} // Default to USD
                                                            onChange={() => updateComponentData(comp.id, 'currency', 'USD')}
                                                            style={{ accentColor: '#ffa305' }}
                                                        />
                                                        USD
                                                    </label>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                                {comp.data.categories?.map((cat) => (
                                                    <div key={cat.id} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #334155', background: '#020617' }}>
                                                        <div
                                                            onClick={() => toggleMenuCategory(cat.id)}
                                                            style={{
                                                                background: 'rgba(15,23,42,0.9)',
                                                                padding: '1rem 1.5rem',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                cursor: 'pointer',
                                                                fontWeight: '600',
                                                                color: '#f8fafc',
                                                                fontSize: '0.95rem',
                                                                textTransform: 'uppercase',
                                                                borderBottom: openMenuCategoryId === cat.id ? '1px solid #334155' : 'none'
                                                            }}
                                                        >
                                                            {cat.name || 'New Category'}
                                                            {openMenuCategoryId === cat.id ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
                                                        </div>

                                                        {openMenuCategoryId === cat.id && (
                                                            <div style={{ background: '#020617', padding: '1.5rem' }}>
                                                                <div style={{ marginBottom: '2rem', position: 'relative' }}>
                                                                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Category Name*</label>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                                        <input type="text" value={cat.name} onChange={(e) => handleMenuCategoryNameChange(comp.id, cat.id, e.target.value)} style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }} />
                                                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#020617' }}><X size={16} color="#94a3b8" /></div>
                                                                            <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#cbd5e1' }}><ArrowUpDown size={20} color="#cbd5e1" /></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {cat.products.map((prod, idx) => (
                                                                    <div key={prod.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                                                                        <div style={{ width: '80px', paddingTop: '1rem' }}><span style={{ color: '#ffa305', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>PRODUCT {idx + 1}:</span></div>
                                                                        <div style={{ flex: '0 1 85%', background: '#0b1222', padding: '1.25rem', borderRadius: '12px', position: 'relative', border: '1px solid #334155' }}>
                                                                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                                                                <div>
                                                                                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Product Name*</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        value={prod.name}
                                                                                        placeholder="Zinger Burger"
                                                                                        onChange={(e) => handleMenuProductChange(comp.id, cat.id, prod.id, 'name', e.target.value)}
                                                                                        style={{ width: '100%', padding: '0.6rem 0.9rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }}
                                                                                    />
                                                                                </div>
                                                                                <div>
                                                                                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Price*</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        value={prod.price}
                                                                                        placeholder="10"
                                                                                        onChange={(e) => handleMenuProductChange(comp.id, cat.id, prod.id, 'price', e.target.value)}
                                                                                        style={{ width: '100%', padding: '0.6rem 0.9rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb' }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                                                <div style={{ flex: 1 }}>
                                                                                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Description</label>
                                                                                    <textarea
                                                                                        value={prod.description}
                                                                                        placeholder="jalapeno + cheese"
                                                                                        onChange={(e) => handleMenuProductChange(comp.id, cat.id, prod.id, 'description', e.target.value)}
                                                                                        rows={3}
                                                                                        style={{ width: '100%', padding: '0.6rem 0.9rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', background: '#020617', color: '#e5e7eb', resize: 'none' }}
                                                                                    />
                                                                                </div>
                                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignSelf: 'flex-end', paddingBottom: '2px' }}>
                                                                                    <div
                                                                                        onClick={() => triggerMenuProductImageUpload(comp.id, cat.id, prod.id)}
                                                                                        style={{
                                                                                            width: '50px',
                                                                                            height: '50px',
                                                                                            borderRadius: '10px',
                                                                                            border: '1px dashed #334155',
                                                                                            display: 'flex',
                                                                                            alignItems: 'center',
                                                                                            justifyContent: 'center',
                                                                                            cursor: 'pointer',
                                                                                            background: prod.image ? 'none' : '#020617',
                                                                                            overflow: 'hidden',
                                                                                            transition: 'all 0.2s'
                                                                                        }}
                                                                                    >
                                                                                        {prod.image ? (
                                                                                            <img src={prod.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                                        ) : (
                                                                                            <UploadCloud size={20} color="#94a3b8" />
                                                                                        )}
                                                                                    </div>
                                                                                    <label style={{ fontSize: '0.6rem', color: '#64748b', textAlign: 'center', fontWeight: 'bold' }}>IMAGE</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: '1rem 0', flexShrink: 0 }}>
                                                                                <div
                                                                                    onClick={() => removeMenuProduct(comp.id, cat.id, prod.id)}
                                                                                    style={{
                                                                                        width: '32px',
                                                                                        height: '32px',
                                                                                        borderRadius: '999px',
                                                                                        border: '1px solid #334155',
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center',
                                                                                        cursor: 'pointer',
                                                                                        background: '#020617',
                                                                                        color: '#fca5a5',
                                                                                        transition: 'all 0.2s'
                                                                                    }}
                                                                                >
                                                                                <Trash2 size={16} color="#ef4444" />
                                                                                </div>
                                                                            <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                                                <ArrowUpDown size={20} color="#cbd5e1" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <button onClick={() => addMenuProduct(comp.id, cat.id)} style={{ borderRadius: '999px', padding: '0.6rem 1.1rem', border: 'none', background: 'rgba(255,163,5,0.15)', color: '#ffd89a', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', marginTop: '1rem' }}><Plus size={16} /> Add More Product</button>

                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    ref={menuImageInputRef}
                                                                    onChange={handleMenuProductImageUpload}
                                                                    style={{ display: 'none' }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                                <button onClick={() => addMenuCategory(comp.id)} style={{ borderRadius: '999px', padding: '0.7rem 1.2rem', border: 'none', background: '#ffa305', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' }}><Plus size={16} /> Add Category</button>
                                            </div>
                                        </div>
                                    )}

                                    {/* WEEKLY SCHEDULE UI */}
                                    {comp.type === 'weekly_schedule' && (
                                        <div style={{ background: '#020617', borderRadius: '16px', padding: '1.25rem', border: '1px solid #334155' }}>
                                            <div style={{ background: '#020617', padding: '1.25rem', borderRadius: '12px', border: '1px solid #334155' }}>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
                                                    {['24 hrs', 'AM/PM'].map(f => (
                                                        <button
                                                            key={f}
                                                            onClick={() => updateComponentData(comp.id, 'timeFormat', f)}
                                                            style={{ padding: '0.55rem 1.25rem', borderRadius: '999px', border: comp.data.timeFormat === f ? '1px solid rgba(255,163,5,0.8)' : '1px solid #334155', background: comp.data.timeFormat === f ? 'rgba(255,163,5,0.1)' : '#020617', color: comp.data.timeFormat === f ? '#ffa305' : '#94a3b8', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}
                                                        >
                                                            {f}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                                    {comp.data.timings.map((day, ix) => (
                                                        <div key={day.day} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: '1.25rem', alignItems: 'center' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleWeeklyScheduleTimingChange(comp.id, ix, 'isOpen', !day.isOpen)}
                                                                    style={{ width: 26, height: 26, borderRadius: 999, border: `2px solid ${day.isOpen ? '#22c55e' : '#334155'}`, background: day.isOpen ? '#22c55e' : '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                                                >
                                                                    {day.isOpen && <Check size={16} color="#022c22" strokeWidth={4} />}
                                                                </button>
                                                                <span style={{ color: '#e5e7eb', fontSize: '0.9rem', fontWeight: '600' }}>{day.day}</span>
                                                            </div>
                                                            <div style={{ position: 'relative' }}><input type="text" value={day.start} onChange={(e) => handleWeeklyScheduleTimingChange(comp.id, ix, 'start', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', paddingRight: '2.5rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: day.isOpen ? '#e5e7eb' : '#6b7280', background: '#020617' }} /><div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><Clock size={16} color="#64748b" /></div></div>
                                                            <div style={{ position: 'relative' }}><input type="text" value={day.end} onChange={(e) => handleWeeklyScheduleTimingChange(comp.id, ix, 'end', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', paddingRight: '2.5rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: day.isOpen ? '#e5e7eb' : '#6b7280', background: '#020617' }} /><div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><Clock size={16} color="#64748b" /></div></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* DAYS SCHEDULER UI */}
                                    {comp.type === 'days_scheduler' && (
                                        <div style={{ background: '#020617', borderRadius: '16px', padding: '1.25rem', border: '1px solid #334155' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
                                                {['24 hrs', 'AM/PM'].map(f => (
                                                    <button key={f} onClick={() => updateComponentData(comp.id, 'timeFormat', f)} style={{ padding: '0.55rem 1.25rem', borderRadius: '999px', border: comp.data.timeFormat === f ? '1px solid rgba(255,163,5,0.8)' : '1px solid #334155', color: comp.data.timeFormat === f ? '#ffa305' : '#94a3b8', background: comp.data.timeFormat === f ? 'rgba(255,163,5,0.1)' : '#020617', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}>{f}</button>
                                                ))}
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                                {comp.data.days.map((day, idx) => (
                                                    <div key={day.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                                                        <div>
                                                            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Day {idx + 1}*</label>
                                                            <input
                                                                type="date"
                                                                value={day.date}
                                                                onChange={(e) => handleDaysSchedulerChange(comp.id, day.id, 'date', e.target.value)}
                                                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>BEGINS AT*</label>
                                                            <div style={{ position: 'relative' }}>
                                                                <input
                                                                    type="text"
                                                                    value={day.beginsAt}
                                                                    onChange={(e) => handleDaysSchedulerChange(comp.id, day.id, 'beginsAt', e.target.value)}
                                                                    style={{ width: '100%', padding: '0.75rem 1rem', paddingRight: '2.5rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                                />
                                                                <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                                                                    <Clock size={16} color="#cbd5e1" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.5rem', textTransform: 'uppercase' }}>ENDS AT*</label>
                                                            <div style={{ position: 'relative' }}>
                                                                <input
                                                                    type="text"
                                                                    value={day.endsAt}
                                                                    onChange={(e) => handleDaysSchedulerChange(comp.id, day.id, 'endsAt', e.target.value)}
                                                                    style={{ width: '100%', padding: '0.75rem 1rem', paddingRight: '2.5rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                                />
                                                                <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                                                                    <Clock size={16} color="#cbd5e1" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ paddingBottom: '0.25rem' }}>
                                                            <div
                                                                onClick={() => removeSchedulerDay(comp.id, day.id)}
                                                                style={{ width: '40px', height: '40px', borderRadius: '999px', border: '1px solid #334155', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fca5a5' }}
                                                            >
                                                                <X size={18} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => addSchedulerDay(comp.id)}
                                                style={{
                                                    marginTop: '1.5rem',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: '#ffa305',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                <Plus size={16} /> Add Days
                                            </button>
                                        </div>
                                    )}

                                    {/* CONTACTS UI */}
                                    {comp.type === 'contacts' && (
                                        <div style={{ background: '#020617', borderRadius: '16px', padding: '1.25rem', border: '1px solid #334155' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                {/* Phone */}
                                                {comp.data.phone ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ width: '48px', height: '48px', borderRadius: '10px', border: '1px solid #334155', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                            <Phone size={20} color="#64748b" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={comp.data.phone}
                                                            onChange={(e) => handleContactChange(comp.id, 'phone', e.target.value)}
                                                            placeholder="+1 555 555 1234"
                                                            style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                        />
                                                        <div
                                                            onClick={() => deleteContactField(comp.id, 'phone')}
                                                            style={{ width: '32px', height: '32px', borderRadius: '999px', border: '1px solid #334155', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, color: '#fca5a5' }}
                                                        >
                                                            <X size={16} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleContactChange(comp.id, 'phone', '+1 555 555 1234')}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: '#ffa305',
                                                            fontSize: '0.9rem',
                                                            fontWeight: '600',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            padding: '0.5rem'
                                                        }}
                                                    >
                                                        <Plus size={16} /> Add Phone
                                                    </button>
                                                )}

                                                {/* Email */}
                                                {comp.data.email ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ width: '48px', height: '48px', borderRadius: '10px', border: '1px solid #334155', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                            <Mail size={20} color="#64748b" />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            value={comp.data.email}
                                                            onChange={(e) => handleContactChange(comp.id, 'email', e.target.value)}
                                                            placeholder="Hellen@gmail.com"
                                                            style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                        />
                                                        <div
                                                            onClick={() => deleteContactField(comp.id, 'email')}
                                                            style={{ width: '32px', height: '32px', borderRadius: '999px', border: '1px solid #334155', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, color: '#fca5a5' }}
                                                        >
                                                            <X size={16} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleContactChange(comp.id, 'email', 'example@gmail.com')}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: '#ffa305',
                                                            fontSize: '0.9rem',
                                                            fontWeight: '600',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            padding: '0.5rem'
                                                        }}
                                                    >
                                                        <Plus size={16} /> Add Email
                                                    </button>
                                                )}

                                                {/* Website */}
                                                {comp.data.website ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ width: '48px', height: '48px', borderRadius: '10px', border: '1px solid #334155', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                            <Globe size={20} color="#64748b" />
                                                        </div>
                                                        <input
                                                            type="url"
                                                            value={comp.data.website}
                                                            onChange={(e) => handleContactChange(comp.id, 'website', e.target.value)}
                                                            placeholder="https://example.com"
                                                            style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                        />
                                                        <div
                                                            onClick={() => deleteContactField(comp.id, 'website')}
                                                            style={{ width: '32px', height: '32px', borderRadius: '999px', border: '1px solid #334155', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, color: '#fca5a5' }}
                                                        >
                                                            <X size={16} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleContactChange(comp.id, 'website', 'https://example.com')}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: '#ffa305',
                                                            fontSize: '0.9rem',
                                                            fontWeight: '600',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            padding: '0.5rem'
                                                        }}
                                                    >
                                                        <Plus size={16} /> Add Website
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* COMPANIES UI */}
                                    {comp.type === 'companies' && (
                                        <div style={{ background: '#020617', borderRadius: '16px', padding: '1.25rem', border: '1px solid #334155' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#e5e7eb', textTransform: 'uppercase' }}>COMPANY</div>
                                                <button
                                                    onClick={() => addCompany(comp.id)}
                                                    style={{
                                                        background: 'rgba(255,163,5,0.1)',
                                                        border: '1px solid rgba(255,163,5,0.8)',
                                                        color: '#ffa305',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '999px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                >
                                                    <Plus size={14} /> Add Company
                                                </button>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                                {comp.data.companies.map((company, idx) => (
                                                    <div key={company.id} style={{ background: '#020617', borderRadius: '12px', padding: '1.25rem', position: 'relative', border: '1px solid #334155' }}>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#94a3b8', marginBottom: '1rem', textTransform: 'uppercase' }}>
                                                            COMPANY {idx + 1}
                                                        </div>

                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                            <div>
                                                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                                                    Company Name*
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={company.name}
                                                                    onChange={(e) => handleCompanyChange(comp.id, company.id, 'name', e.target.value)}
                                                                    placeholder="Techoid"
                                                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                                                    Profession*
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={company.profession}
                                                                    onChange={(e) => handleCompanyChange(comp.id, company.id, 'profession', e.target.value)}
                                                                    placeholder="Designer"
                                                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div
                                                            onClick={() => removeCompany(comp.id, company.id)}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '1rem',
                                                                right: '1rem',
                                                                width: '32px',
                                                                height: '32px',
                                                                borderRadius: '999px',
                                                                border: '1px solid #334155',
                                                                background: '#020617',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                cursor: 'pointer',
                                                                color: '#fca5a5'
                                                            }}
                                                        >
                                                            <X size={16} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* MULTIPLE LINKS UI */}
                                    {comp.type === 'multiple_links' && (
                                        <div style={{ background: '#020617', borderRadius: '16px', padding: '1.25rem', border: '1px solid #334155' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                                {comp.data.links.map((link) => (
                                                    <div key={link.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                                                        <div>
                                                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                                                URL
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={link.url}
                                                                onChange={(e) => handleLinkChange(comp.id, link.id, 'url', e.target.value)}
                                                                placeholder="https://"
                                                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                                                LINK TITLE
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={link.title}
                                                                onChange={(e) => handleLinkChange(comp.id, link.id, 'title', e.target.value)}
                                                                placeholder="Link Title"
                                                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                            />
                                                        </div>
                                                        <div style={{ paddingBottom: '0.25rem' }}>
                                                            <div
                                                                onClick={() => removeLink(comp.id, link.id)}
                                                                style={{ width: '32px', height: '32px', borderRadius: '999px', border: '1px solid #334155', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fca5a5' }}
                                                            >
                                                                <X size={16} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => addLink(comp.id)}
                                                style={{ marginTop: '1.5rem', background: 'rgba(255,163,5,0.1)', border: '1px solid rgba(255,163,5,0.8)', color: '#ffa305', padding: '0.55rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                            >
                                                <Plus size={14} /> Add More Links
                                            </button>
                                        </div>
                                    )}

                                    {/* SOCIAL LINKS UI */}
                                    {comp.type === 'social_links' && (
                                        <div style={{ background: '#020617', borderRadius: '16px', padding: '1.25rem', border: '1px solid #334155' }}>
                                            {/* Heading, Text Color, Font */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                                        HEADING
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={comp.data.heading}
                                                        onChange={(e) => updateComponentData(comp.id, 'heading', e.target.value)}
                                                        placeholder="Follow us on"
                                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '500', color: '#64748b', marginBottom: '0.5rem' }}>
                                                        Text Color
                                                    </label>
                                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #334155', borderRadius: '10px', padding: '0.5rem 0.75rem', height: '44px', background: '#020617' }}>
                                                        <input
                                                            type="text"
                                                            value={comp.data.textColor}
                                                            onChange={(e) => updateComponentData(comp.id, 'textColor', e.target.value)}
                                                            placeholder="#FFFFFF"
                                                            style={{
                                                                flex: 1, border: 'none', outline: 'none', fontSize: '0.9rem', color: '#e5e7eb', background: 'transparent'
                                                            }}
                                                        />
                                                        <div style={{ width: '28px', height: '28px', borderRadius: '6px', position: 'relative', overflow: 'hidden', border: '1px solid #334155', flexShrink: 0 }}>
                                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: comp.data.textColor || '#000' }}></div>
                                                            <input type="color" value={comp.data.textColor || '#000000'} onChange={(e) => updateComponentData(comp.id, 'textColor', e.target.value)} style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', cursor: 'pointer', opacity: 0 }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '500', color: '#64748b', marginBottom: '0.5rem' }}>
                                                        Font
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={comp.data.font}
                                                        onChange={(e) => updateComponentData(comp.id, 'font', e.target.value)}
                                                        placeholder="Lato"
                                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Background Color */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '500', color: '#64748b', marginBottom: '0.5rem' }}>
                                                    Background Color
                                                </label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <input
                                                        type="text"
                                                        value={comp.data.bgColor}
                                                        onChange={(e) => updateComponentData(comp.id, 'bgColor', e.target.value)}
                                                        placeholder="#0B2D86"
                                                        style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                    />
                                                    <div style={{ width: '44px', height: '44px', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid #334155' }}>
                                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: comp.data.bgColor }}></div>
                                                        <input type="color" value={comp.data.bgColor} onChange={(e) => updateComponentData(comp.id, 'bgColor', e.target.value)} style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', cursor: 'pointer', opacity: 0 }} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ADD MORE Section */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ffa305', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                                                    ADD MORE
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                                    Click on the icon to add a social media profile.
                                                </div>

                                                {/* Social Media Icons Grid */}
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: '0.75rem' }}>
                                                    {[
                                                        { name: 'Facebook', icon: 'https://cdn-icons-png.flaticon.com/512/124/124010.png', color: '#1877F2' },
                                                        { name: 'Instagram', icon: 'https://cdn-icons-png.flaticon.com/512/174/174855.png', color: '#E4405F' },
                                                        { name: 'X', icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png', color: '#000000' },
                                                        { name: 'LinkedIn', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', color: '#0A66C2' },
                                                        { name: 'Discord', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968756.png', color: '#5865F2' },
                                                        { name: 'Twitch', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968819.png', color: '#9146FF' },
                                                        { name: 'Kick', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/kick.png', color: '#53FC18' },
                                                        { name: 'YouTube', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', color: '#FF0000' },
                                                        { name: 'WhatsApp', icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png', color: '#25D366' },
                                                        { name: 'Snapchat', icon: 'https://cdn-icons-png.flaticon.com/512/174/174870.png', color: '#FFFC00' },
                                                        { name: 'TikTok', icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', color: '#000000' },
                                                        { name: 'Tumblr', icon: 'https://cdn-icons-png.flaticon.com/512/174/174872.png', color: '#35465C' },
                                                        { name: 'Spotify', icon: 'https://cdn-icons-png.flaticon.com/512/174/174868.png', color: '#1DB954' },
                                                        { name: 'Dribbble', icon: 'https://cdn-icons-png.flaticon.com/512/174/174844.png', color: '#EA4C89' },
                                                        { name: 'Pinterest', icon: 'https://cdn-icons-png.flaticon.com/512/174/174863.png', color: '#E60023' },
                                                        { name: 'Telegram', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png', color: '#26A5E4' },
                                                        { name: 'Behance', icon: 'https://cdn-icons-png.flaticon.com/512/174/174837.png', color: '#1769FF' },
                                                        { name: 'Reddit', icon: 'https://cdn-icons-png.flaticon.com/512/174/174866.png', color: '#FF4500' },
                                                        { name: 'Website', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', color: '#ffa305' }
                                                    ].map(platform => {
                                                        const isSelected = comp.data.selectedPlatforms.some(p => p.name === platform.name);
                                                        return (
                                                            <div
                                                                key={platform.name}
                                                                onClick={() => toggleSocialPlatform(comp.id, platform.name)}
                                                                style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#0b1222', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', border: isSelected ? '2px solid #ffa305' : '1px solid #334155', transition: 'all 0.2s' }}
                                                                title={platform.name}
                                                            >
                                                                <img src={platform.icon} alt={platform.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Selected Platforms with URL Inputs */}
                                            {comp.data.selectedPlatforms.length > 0 && (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                                                    {comp.data.selectedPlatforms.map(platform => {
                                                        const platformInfo = [
                                                            { name: 'Facebook', icon: 'https://cdn-icons-png.flaticon.com/512/124/124010.png' },
                                                            { name: 'Instagram', icon: 'https://cdn-icons-png.flaticon.com/512/174/174855.png' },
                                                            { name: 'X', icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png' },
                                                            { name: 'LinkedIn', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
                                                            { name: 'Discord', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968756.png' },
                                                            { name: 'Twitch', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968819.png' },
                                                            { name: 'Kick', icon: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/kick.png' },
                                                            { name: 'YouTube', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png' },
                                                            { name: 'WhatsApp', icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png' },
                                                            { name: 'Snapchat', icon: 'https://cdn-icons-png.flaticon.com/512/174/174870.png' },
                                                            { name: 'TikTok', icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png' },
                                                            { name: 'Tumblr', icon: 'https://cdn-icons-png.flaticon.com/512/174/174872.png' },
                                                            { name: 'Spotify', icon: 'https://cdn-icons-png.flaticon.com/512/174/174868.png' },
                                                            { name: 'Dribbble', icon: 'https://cdn-icons-png.flaticon.com/512/174/174844.png' },
                                                            { name: 'Pinterest', icon: 'https://cdn-icons-png.flaticon.com/512/174/174863.png' },
                                                            { name: 'Telegram', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png' },
                                                            { name: 'Behance', icon: 'https://cdn-icons-png.flaticon.com/512/174/174837.png' },
                                                            { name: 'Reddit', icon: 'https://cdn-icons-png.flaticon.com/512/174/174866.png' },
                                                            { name: 'Website', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png' }
                                                        ].find(p => p.name === platform.name);

                                                        return (
                                                            <div key={platform.name}>
                                                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '500', color: '#64748b', marginBottom: '0.5rem' }}>
                                                                    {platform.name}*
                                                                </label>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                                    <div style={{
                                                                        width: '48px',
                                                                        height: '48px',
                                                                        borderRadius: '8px',
                                                                        background: platformInfo?.color || '#ffa305',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: '1.5rem',
                                                                        flexShrink: 0
                                                                    }}>
                                                                        {platformInfo?.icon ? (
                                                                            <img src={platformInfo.icon} alt={platform.name} style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                                                                        ) : '🌐'}
                                                                    </div>
                                                                <input
                                                                    type="url"
                                                                    value={platform.url}
                                                                    onChange={(e) => handleSocialUrlChange(comp.id, platform.name, e.target.value)}
                                                                    placeholder="https://"
                                                                    style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.9rem', outline: 'none', color: '#e5e7eb', background: '#020617' }}
                                                                />
                                                                <div
                                                                    onClick={() => toggleSocialPlatform(comp.id, platform.name)}
                                                                    style={{ width: '32px', height: '32px', borderRadius: '999px', border: '1px solid #334155', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fca5a5', flexShrink: 0 }}
                                                                >
                                                                    <X size={16} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* FACILITIES UI */}
                                    {comp.type === 'facilities' && (
                                        <div style={{ background: '#020617', borderRadius: '16px', padding: '1.25rem', border: '1px solid #334155' }}>
                                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                                {[
                                                    { name: 'WiFi', icon: <Wifi size={24} />, color: '#ffa305' },
                                                    { name: 'Parking', icon: <Car size={24} />, color: '#ffa305' },
                                                    { name: 'Wheelchair', icon: '♿', color: '#ffa305' },
                                                    { name: 'Restrooms', icon: '🚻', color: '#ffa305' },
                                                    { name: 'Pets', icon: '🐾', color: '#ffa305' },
                                                    { name: 'Parking_P', icon: 'P', color: '#ffa305' },
                                                    { name: 'Bus', icon: '🚌', color: '#ffa305' },
                                                    { name: 'Car_Parking', icon: <Car size={24} />, color: '#ffa305' },
                                                    { name: 'Hotel', icon: <Bed size={24} />, color: '#ffa305' },
                                                    { name: 'Coffee', icon: <Coffee size={24} />, color: '#ffa305' },
                                                    { name: 'Bar', icon: '🍷', color: '#ffa305' },
                                                    { name: 'Restaurant', icon: <Utensils size={24} />, color: '#ffa305' }
                                                ].map(facility => {
                                                    const isSelected = comp.data.selectedFacilities.includes(facility.name);
                                                    return (
                                                        <div
                                                            key={facility.name}
                                                            onClick={() => toggleFacility(comp.id, facility.name)}
                                                            style={{ width: '60px', height: '60px', borderRadius: '12px', background: isSelected ? '#ffa305' : '#020617', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: typeof facility.icon === 'string' ? '1.5rem' : '1rem', color: isSelected ? '#022c22' : '#94a3b8', transition: 'all 0.2s', boxShadow: isSelected ? '0 2px 8px rgba(255, 163, 5, 0.3)' : 'none' }}
                                                            title={facility.name}
                                                        >
                                                            {facility.icon}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div onClick={() => removeComponent(comp.id)} style={{ padding: '1rem 0', cursor: 'pointer', color: '#ef4444', flexShrink: 0 }}>
                            <Trash2 size={20} />
                        </div>
                    </div>
                ))}
            </div>

            

            {/* Slider Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{
                        background: '#0f172a', borderRadius: '16px', width: '600px', maxWidth: '95%',
                        maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
                        border: '1px solid #334155', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                    }}>
                        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700', color: '#e5e7eb' }}>Edit image</h3>
                            <button onClick={handleModalCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={24} /></button>
                        </div>

                        <div style={{ position: 'relative', height: '400px', background: '#333' }}>
                            <Cropper
                                image={tempImage}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={1} // Assuming 1:1 for now, or free? Image showed sqaure.
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                onRotationChange={setRotation}
                            />
                        </div>

                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Minus size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setZoom(Math.max(1, zoom - 0.1))} />
                                <input type="range" value={zoom} min={1} max={3} step={0.1} aria-labelledby="Zoom" onChange={(e) => setZoom(Number(e.target.value))} style={{ flex: 1, accentColor: '#ffa305', height: '4px', background: '#334155', borderRadius: '2px', appearance: 'none' }} />
                                <Plus size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setZoom(Math.min(3, zoom + 0.1))} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <RefreshCw size={20} color="#94a3b8" style={{ cursor: 'pointer', transform: 'scaleX(-1)' }} onClick={() => setRotation(rotation - 90)} />
                                <input type="range" value={rotation} min={0} max={360} step={1} aria-labelledby="Rotation" onChange={(e) => setRotation(Number(e.target.value))} style={{ flex: 1, accentColor: '#ffa305', height: '4px', background: '#334155', borderRadius: '2px', appearance: 'none' }} />
                                <RefreshCw size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setRotation(rotation + 90)} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button onClick={handleModalCancel} style={{ padding: '0.5rem 1.5rem', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#e5e7eb', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                                <button onClick={handleModalSave} style={{ padding: '0.5rem 1.5rem', borderRadius: '10px', border: 'none', background: '#ffa305', color: '#0f172a', fontWeight: '600', cursor: 'pointer' }}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Logo Preview Modal */}
            {isPreviewModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000,
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '2rem'
                }} onClick={() => setIsPreviewModalOpen(false)}>
                    <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }} onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setIsPreviewModalOpen(false)}
                            style={{ position: 'absolute', top: '-40px', right: '-40px', background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
                        >
                            <X size={32} />
                        </button>
                        <img src={previewImage} alt="Logo Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }} />
                    </div>
                </div>
            )}

            {/* Reusable Upload Modal */}
            <ImageUploadModal
                isOpen={isUploadModalOpen}
                onClose={() => {
                    setIsUploadModalOpen(false);
                    setUploadModalTempImage(null);
                    setUploadModalContext(null);
                }}
                tempImage={uploadModalTempImage}
                onSave={handleUploadModalSave}
                fileName={uploadModalFileName}
                type="image"
            />
        </div>
    );
};

export default CustomConfig;

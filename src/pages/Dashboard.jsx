import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Plus, Search, Download, Edit, Trash2, BarChart, ChevronDown,
    MoreVertical, Link, Copy, Globe, Calendar, Star, Folder, AlertTriangle, Check, X,
    Image as ImageIcon, FileText, PenTool, ChevronLeft, ChevronRight, Menu, Sliders, Loader2,
    Sparkles, Filter, ExternalLink, Share2, Eye, Clock, ArrowUpRight, Grid, List as ListIcon,
    Zap, Activity, PieChart as PieIcon
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import QRRenderer from '../components/QRRenderer';
import Sidebar from '../components/Sidebar';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { io } from 'socket.io-client';
import MobilePreview from '../components/MobilePreview';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// --- Constants & Helpers ---
const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#ffa305'];

const DateCustomInput = React.forwardRef(({ value, onClick, startDate, endDate, onClear }, ref) => (
    <div
        onClick={onClick}
        ref={ref}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1rem',
            border: '1px solid #334155',
            borderRadius: '12px',
            background: '#1e293b',
            cursor: 'pointer',
            fontSize: '0.875rem',
            color: '#f8fafc',
            minWidth: '260px',
            justifyContent: 'space-between',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease'
        }}
        className="hover:border-indigo-500"
    >
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: startDate ? '#ffa305' : '#94a3b8', fontWeight: startDate ? '600' : '400' }}>
                {startDate ? startDate.toLocaleDateString('en-CA') : 'Start date'}
            </span>
            <span style={{ margin: '0 0.75rem', color: '#64748b' }}>→</span>
            <span style={{ color: endDate ? '#ffa305' : '#94a3b8', fontWeight: endDate ? '600' : '400' }}>
                {endDate ? endDate.toLocaleDateString('en-CA') : 'End date'}
            </span>
        </div>
        {startDate || endDate ? (
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onClear && onClear();
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', borderRadius: '50%', background: '#334155' }}
            >
                <X size={14} color="#94a3b8" />
            </div>
        ) : (
            <Calendar size={16} color="#64748b" />
        )}
    </div>
));

const Dashboard = () => {
    const navigate = useNavigate();
    const staticTypes = ['text', 'email', 'sms', 'wifi', 'vcard', 'static', 'website', 'map', 'phone', 'more'];
    
    // --- State ---
    const [qrs, setQrs] = useState([]);
    const qrRefs = useRef({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const [editingUrlQr, setEditingUrlQr] = useState(null);
    const [tempShortId, setTempShortId] = useState('');
    const [isUpdatingUrl, setIsUpdatingUrl] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [renamingQr, setRenamingQr] = useState(null);
    const [tempName, setTempName] = useState('');
    const [isRenaming, setIsRenaming] = useState(false);
    const [activeTab, setActiveTab] = useState('All');
    
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [downloadingQr, setDownloadingQr] = useState(null);
    const [downloadFormat, setDownloadFormat] = useState('png');
    const [sortOption, setSortOption] = useState('Last Created');
    const [selectedTypeFilter, setSelectedTypeFilter] = useState('All types');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
    const typeFilterRef = useRef(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [totalQRs, setTotalQRs] = useState(0);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Use slightly larger breakpoint for mobile check or dynamic width adjustment
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [sidebarExpanded, setSidebarExpanded] = useState(true); // Track sidebar state

    const baseUrl = (import.meta.env.VITE_FRONTEND_URL || window.location.origin).replace(/\/$/, '');

    // --- Effects ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (typeFilterRef.current && !typeFilterRef.current.contains(event.target)) {
                setIsTypeFilterOpen(false);
            }
            if (activeMenuId && !event.target.closest('.qr-menu-container')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenuId]);

    useEffect(() => {
        const handleResize = () => {
             const mobile = window.innerWidth <= 768;
             setIsMobile(mobile);
             if (mobile) setSidebarExpanded(false);
             else setSidebarExpanded(true); // Or maintain previous state if preferred
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchQRs();
    }, [currentPage, pageLimit, selectedTypeFilter, activeTab, searchTerm, startDate, endDate, sortOption]);

    useEffect(() => {
        const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const socket = io(socketUrl);

        socket.on('scan-updated', (data) => {
            setQrs(prevQrs => prevQrs.map(qr => {
                if (qr.shortId === data.shortId) {
                    const currentScans = qr.scans || [];
                    return {
                        ...qr,
                        scanCount: data.scanCount,
                        scans: [...currentScans, { timestamp: new Date() }]
                    };
                }
                return qr;
            }));
        });

        return () => socket.disconnect();
    }, []);

    // --- Data Fetching ---
    const fetchQRs = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiUrl = window.location.hostname === 'localhost'
                ? 'http://localhost:3000/api/qr/list'
                : '/api/qr/list';

            const params = {
                page: currentPage,
                limit: pageLimit
            };

            if (selectedTypeFilter && selectedTypeFilter !== 'All types') params.type = selectedTypeFilter;
            if (activeTab && activeTab !== 'All') params.tab = activeTab;
            if (searchTerm) params.search = searchTerm;
            if (startDate) params.startDate = startDate.toISOString();
            if (endDate) params.endDate = endDate.toISOString();
            if (sortOption) params.sort = sortOption;

            const res = await axios.get(apiUrl, { params });
            setQrs(res.data.qrs || res.data);
            if (res.data.pagination) {
                setTotalPages(res.data.pagination.totalPages);
                setTotalQRs(res.data.pagination.total);
            }
            setLastUpdated(Date.now());
        } catch (err) {
            console.error('Error fetching QRs:', err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch QRs');
        } finally {
            setLoading(false);
        }
    };

    // --- Helpers ---
    const getQRValue = (qr) => {
        if (!qr) return '';
        const staticTypes = ['text', 'email', 'sms', 'wifi', 'vcard', 'static', 'website', 'map', 'phone', 'more'];
        const isStatic = staticTypes.includes(qr.type) || isMatchingMoreType(qr.data, qr.type);

        if (isStatic) return qr.data;
        if (qr.type === 'dynamic-url') {
            return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/${qr.shortId}`;
        }
        return `${baseUrl}/view/${qr.shortId}`;
    };

    const isMatchingMoreType = (data, type) => {
        if (!data) return false;
        const lowData = data.toLowerCase();
        switch (type) {
            case 'reddit': return lowData.includes('reddit.com');
            case 'tiktok': return lowData.includes('tiktok.com');
            case 'snapchat': return lowData.includes('snapchat.com');
            case 'telegram': return lowData.includes('t.me') || lowData.includes('telegram.org');
            case 'facebook': return lowData.includes('facebook.com');
            case 'instagram': return lowData.includes('instagram.com');
            case 'x': return lowData.includes('twitter.com') || lowData.includes('x.com');
            case 'youtube': return lowData.includes('youtube.com') || lowData.includes('youtu.be');
            case 'skype': return lowData.startsWith('skype:');
            case 'bitcoin': return lowData.startsWith('bitcoin:');
            case 'zoom': return lowData.includes('zoom.us');
            case 'whatsapp': return lowData.includes('wa.me') || lowData.includes('whatsapp.com');
            default: return false;
        }
    };

    const getChartData = () => {
        const scanMap = {};
        // Initialize last 7 days with 0
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            scanMap[d.toLocaleDateString('en-CA')] = 0;
        }

        qrs.forEach(qr => {
            if (qr.scans && Array.isArray(qr.scans)) {
                qr.scans.forEach(scan => {
                    const date = new Date(scan.timestamp).toLocaleDateString('en-CA');
                    if (scanMap.hasOwnProperty(date)) {
                        scanMap[date]++;
                    }
                });
            }
        });

        return Object.entries(scanMap).map(([date, scans]) => ({
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            scans
        }));
    };

    // --- Actions ---
    const handleDownloadClick = (qr) => {
        setDownloadingQr(qr);
        setDownloadFormat('png');
        setIsDownloadModalOpen(true);
    };

    const handleRunDownload = async () => {
        if (!downloadingQr) {
            setIsDownloadModalOpen(false);
            return;
        }

        const format = downloadFormat || 'png';
        const filename = `${downloadingQr.name || 'qr-code'}.${format}`;

        if (['svg', 'pdf', 'png', 'jpeg', 'jpg'].includes(format)) {
            try {
                await downloadClientSide();
                toast.success('QR code downloaded successfully!');
                setIsDownloadModalOpen(false);
            } catch (error) {
                console.error('Client-side download error:', error);
                toast.error('Failed to download QR code');
            }
            return;
        }
    };

    const downloadClientSide = async () => {
        let qrElement = document.querySelector(`#hidden-qr-${downloadingQr._id} canvas`);
        if (!qrElement) qrElement = document.getElementById(`hidden-qr-${downloadingQr._id}`)?.querySelector('canvas');
        
        if (!qrElement) {
             qrElement = document.querySelector(`#qr-${downloadingQr._id} canvas`);
        }

        if (!qrElement) throw new Error('QR element not found');

        const filename = `${downloadingQr.name || 'qr-code'}.${downloadFormat}`;

        if (downloadFormat === 'pdf') {
            const dataUrl = await toPng(qrElement);
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            const x = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
            pdf.addImage(dataUrl, 'PNG', x, 10, pdfWidth, pdfHeight);
            pdf.save(filename);
        } else if (downloadFormat === 'svg') {
            const svgDataUrl = await toSvg(qrElement);
            const link = document.createElement('a');
            link.download = filename;
            link.href = svgDataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            const dataUrl = downloadFormat === 'jpeg' ? await toJpeg(qrElement, { quality: 0.95 }) : await toPng(qrElement);
            const link = document.createElement('a');
            link.download = filename;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleEditUrlClick = (qr) => {
        setEditingUrlQr(qr);
        setTempShortId(qr.shortId);
        setIsUrlModalOpen(true);
    };

    const handleUpdateUrl = async () => {
        if (!editingUrlQr) return;
        if (!tempShortId.trim()) return toast.error('Short ID cannot be empty');
        if (tempShortId.includes(' ')) return toast.error('Short ID cannot contain spaces');

        setIsUpdatingUrl(true);
        try {
            const res = await axios.put(`/api/qr/${editingUrlQr._id}`, { shortId: tempShortId });
            setQrs(prev => prev.map(q => q._id === editingUrlQr._id ? res.data : q));
            toast.success('QR Code Short ID updated successfully');
            setIsUrlModalOpen(false);
            setEditingUrlQr(null);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error updating QR Code');
        } finally {
            setIsUpdatingUrl(false);
        }
    };

    const handleRenameClick = (qr) => {
        setRenamingQr(qr);
        setTempName(qr.name || '');
        setIsRenameModalOpen(true);
        setActiveMenuId(null);
    };

    const handleUpdateName = async () => {
        if (!renamingQr) return;
        if (!tempName.trim()) return toast.error('Name cannot be empty');

        setIsRenaming(true);
        try {
            await axios.put(`/api/qr/${renamingQr._id}`, { name: tempName });
            setQrs(prev => prev.map(q => q._id === renamingQr._id ? { ...q, name: tempName } : q));
            toast.success('QR Code renamed successfully');
            setIsRenameModalOpen(false);
            setRenamingQr(null);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Error renaming QR Code');
        } finally {
            setIsRenaming(false);
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteConfirmationId(id);
        setActiveMenuId(null);
    };

    const confirmDelete = async () => {
        if (!deleteConfirmationId) return;
        setIsDeleting(true);
        try {
            await axios.delete(`/api/qr/${deleteConfirmationId}`);
            setQrs(prev => prev.filter(q => q._id !== deleteConfirmationId));
            toast.success('QR deleted successfully');
            setDeleteConfirmationId(null);
        } catch (err) {
            toast.error('Server error');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEditQR = (qr) => {
        const staticTypes = ['text', 'email', 'sms', 'wifi', 'vcard', 'static', 'website', 'map', 'phone', 'more'];
        navigate(staticTypes.includes(qr.type) ? '/static-generator' : '/generator', { state: { editingQr: qr, selectedType: qr.type } });
    };

    // --- Configuration ---
    const qrTypes = [
        { value: 'url', label: 'URL' }, { value: 'custom-type', label: 'Custom Type' }, { value: 'business-card', label: 'Business Card' },
        { value: 'business-page', label: 'Business Page' }, { value: 'bio-page', label: 'Bio Page' }, { value: 'social-media', label: 'Social Media' },
        { value: 'image', label: 'Image' }, { value: 'pdf', label: 'PDF' }, { value: 'app-store', label: 'App Store' },
        { value: 'menu', label: 'Menu' }, { value: 'video', label: 'Video' }, { value: 'coupon', label: 'Coupon' },
        { value: 'event', label: 'Event' }, { value: 'product-page', label: 'Product Page' }, { value: 'lead-generation', label: 'Lead Generation' },
        { value: 'rating', label: 'Rating' }, { value: 'reviews', label: 'Reviews' }, { value: 'password-protected', label: 'Password Protected' },
        { value: 'multiple-links', label: 'Multiple Links' }, { value: 'dynamic-url', label: 'Dynamic URL' },
        { value: 'website', label: 'Website', isStatic: true }, { value: 'text', label: 'Text', isStatic: true },
        { value: 'email', label: 'Email', isStatic: true }, { value: 'sms', label: 'SMS', isStatic: true },
        { value: 'wifi', label: 'WiFi', isStatic: true }, { value: 'vcard', label: 'vCard', isStatic: true },
        { value: 'phone', label: 'Phone', isStatic: true }, { value: 'map', label: 'Map', isStatic: true },
        { value: 'static', label: 'Static', isStatic: true }
    ].sort((a, b) => a.label.localeCompare(b.label));

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
        exit: { opacity: 0, scale: 0.95 }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: '"Inter", sans-serif' }}>
            
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
                onToggle={(expanded) => setSidebarExpanded(expanded)} 
                collapsed={!sidebarExpanded}
            />

            <div style={{ 
                flex: 1, 
                padding: isMobile ? '1rem' : '2rem 3rem', 
                overflowY: 'auto', 
                maxHeight: '100vh',
                marginLeft: isMobile ? 0 : (sidebarExpanded ? '260px' : '80px'), // Adjust margin based on sidebar state
                transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' // Smooth transition matching sidebar animation
            }}>
                
                {/* Mobile Header */}
                {isMobile && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard</h1>
                        <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'transparent', border: 'none', color: '#fff' }}>
                            <Menu size={24} />
                        </button>
                    </div>
                )}

                {/* Header & Stats */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                My QR Codes
                            </h1>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Manage your campaigns and track performance.</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 163, 5, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/select-template')}
                            style={{
                                background: '#ffa305', color: '#000', border: 'none', padding: '1rem 2rem',
                                borderRadius: '16px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 4px 6px rgba(255, 163, 5, 0.2)'
                            }}
                        >
                            <Plus size={22} strokeWidth={3} /> Create New QR
                        </motion.button>
                    </div>

                    {/* Quick Stats & Chart Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '300px 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                        {/* Stats Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { label: 'Total QRs', value: totalQRs, icon: Grid, color: '#3b82f6' },
                                { label: 'Total Scans', value: qrs.reduce((acc, qr) => acc + (qr.scanCount || 0), 0), icon: BarChart, color: '#10b981' },
                                { label: 'Active Campaigns', value: qrs.filter(q => !['text', 'wifi'].includes(q.type)).length, icon: Sparkles, color: '#ffa305' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        background: '#1e293b', padding: '1.5rem', borderRadius: '20px',
                                        border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '1.5rem',
                                        flex: 1
                                    }}
                                >
                                    <div style={{ padding: '1rem', borderRadius: '14px', background: `${stat.color}20`, color: stat.color }}>
                                        <stat.icon size={28} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.25rem' }}>{stat.label}</div>
                                        <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{stat.value}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Chart Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{
                                background: '#1e293b', padding: '1.5rem', borderRadius: '24px',
                                border: '1px solid #334155', minHeight: '300px', display: 'flex', flexDirection: 'column'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <Activity size={20} color="#ffa305" />
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>Scan Performance (Last 7 Days)</h3>
                            </div>
                            <div style={{ flex: 1, width: '100%', minHeight: '250px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={getChartData()}>
                                        <defs>
                                            <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ffa305" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#ffa305" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                        <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                                            itemStyle={{ color: '#ffa305' }}
                                        />
                                        <Area type="monotone" dataKey="scans" stroke="#ffa305" strokeWidth={3} fillOpacity={1} fill="url(#colorScans)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Filters & Controls */}
                <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '20px', marginBottom: '2rem', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
                            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                            <input
                                type="text"
                                placeholder="Search by name, type or URL..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%', padding: '1rem 1rem 1rem 3.5rem', background: '#0f172a',
                                    border: '1px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none'
                                }}
                            />
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                             {/* Type Filter */}
                            <div style={{ position: 'relative' }} ref={typeFilterRef}>
                                <button
                                    onClick={() => setIsTypeFilterOpen(!isTypeFilterOpen)}
                                    style={{
                                        padding: '1rem 1.5rem', background: '#0f172a', border: '1px solid #334155',
                                        borderRadius: '12px', color: '#fff', cursor: 'pointer', display: 'flex',
                                        alignItems: 'center', gap: '0.75rem', minWidth: '180px', justifyContent: 'space-between'
                                    }}
                                >
                                    <span style={{ fontSize: '0.95rem' }}>
                                        {selectedTypeFilter === 'All types' ? 'All Types' : (qrTypes.find(t => t.value === selectedTypeFilter)?.label || selectedTypeFilter)}
                                    </span>
                                    <ChevronDown size={16} color="#94a3b8" />
                                </button>
                                <AnimatePresence>
                                    {isTypeFilterOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                            style={{
                                                position: 'absolute', top: '120%', left: 0, width: '240px', maxHeight: '300px',
                                                overflowY: 'auto', background: '#1e293b', border: '1px solid #334155',
                                                borderRadius: '16px', padding: '0.5rem', zIndex: 50, boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                            }}
                                        >
                                            <div
                                                onClick={() => { setSelectedTypeFilter('All types'); setIsTypeFilterOpen(false); }}
                                                style={{ padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer', color: selectedTypeFilter === 'All types' ? '#ffa305' : '#94a3b8', background: selectedTypeFilter === 'All types' ? '#ffa30510' : 'transparent' }}
                                            >
                                                All Types
                                            </div>
                                            {qrTypes.map(t => (
                                                <div
                                                    key={t.value}
                                                    onClick={() => { setSelectedTypeFilter(t.value); setIsTypeFilterOpen(false); }}
                                                    style={{ padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer', color: selectedTypeFilter === t.value ? '#ffa305' : '#94a3b8', background: selectedTypeFilter === t.value ? '#ffa30510' : 'transparent', fontSize: '0.9rem' }}
                                                >
                                                    {t.label}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <DatePicker
                                selected={startDate}
                                onChange={(dates) => {
                                    const [start, end] = dates;
                                    setStartDate(start);
                                    setEndDate(end);
                                }}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                customInput={
                                    <DateCustomInput
                                        startDate={startDate}
                                        endDate={endDate}
                                        onClear={() => {
                                            setStartDate(null);
                                            setEndDate(null);
                                        }}
                                    />
                                }
                            />
                            {(searchTerm !== '' || activeTab !== 'All' || sortOption !== 'Last Created' || selectedTypeFilter !== 'All types' || startDate !== null || endDate !== null) && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setActiveTab('All');
                                        setSortOption('Last Created');
                                        setSelectedTypeFilter('All types');
                                        setStartDate(null);
                                        setEndDate(null);
                                        toast.success('All filters cleared');
                                    }}
                                    style={{
                                        padding: '1rem 1.5rem',
                                        background: '#ffa305',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: '#000000',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        height: '58px', // Match height of other inputs
                                        boxShadow: '0 4px 6px -1px rgba(255, 163, 5, 0.5)'
                                    }}
                                    className="hover:opacity-90 transition-opacity"
                                >
                                    <X size={18} />
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: '#1e293b',
                    borderRadius: '12px',
                    gap: '1rem',
                    border: '1px solid #334155'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Show:</span>
                        <select
                            value={pageLimit}
                            onChange={(e) => {
                                setPageLimit(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            style={{
                                padding: '0.5rem',
                                border: '1px solid #334155',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                background: '#0f172a',
                                color: '#fff'
                            }}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>per page</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: isMobile ? '100%' : 'auto', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', order: isMobile ? 2 : 1 }}>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '0.5rem 0.75rem',
                                    border: '1px solid #334155',
                                    borderRadius: '6px',
                                    background: currentPage === 1 ? '#1e293b' : '#0f172a',
                                    color: currentPage === 1 ? '#64748b' : '#fff',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8', display: 'flex', alignItems: 'center', px: '0.5rem' }}>
                                {currentPage} / {totalPages}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: '0.5rem 0.75rem',
                                    border: '1px solid #334155',
                                    borderRadius: '6px',
                                    background: currentPage === totalPages ? '#1e293b' : '#0f172a',
                                    color: currentPage === totalPages ? '#64748b' : '#fff',
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                        <span style={{ fontSize: '0.875rem', color: '#94a3b8', order: isMobile ? 1 : 2 }}>
                            {totalQRs} total
                        </span>
                    </div>
                </div>

                {/* QR Grid */}
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                        <Loader2 size={40} className="animate-spin" color="#ffa305" />
                    </div>
                ) : qrs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4rem',
                            background: '#1e293b',
                            borderRadius: '24px',
                            border: '1px solid #334155',
                            textAlign: 'center',
                            color: '#94a3b8'
                        }}
                    >
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%', background: '#334155',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
                        }}>
                            <Search size={40} color="#64748b" />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>No Result Found</h3>
                        <p style={{ maxWidth: '400px', margin: '0 auto' }}>
                            We couldn't find any QR codes matching your filters. Try adjusting your search or create a new one.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '1.5rem'
                        }}
                    >
                        <AnimatePresence>
                            {qrs.map((qr) => (
                                <motion.div
                                    key={qr._id}
                                    variants={itemVariants}
                                    layout
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                    style={{
                                        background: '#1e293b',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        border: '1px solid #334155',
                                        position: 'relative',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
                                    }}
                                >
                                    {/* Card Header */}
                                    <div style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem' }}>
                                        <div style={{
                                            width: '80px', height: '80px', background: '#fff', borderRadius: '16px',
                                            padding: '8px', flexShrink: 0, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                        }}>
                                            <div id={`qr-${qr._id}`} style={{ width: '100%', height: '100%' }}>
                                                <QRRenderer value={getQRValue(qr)} design={qr.design || {}} size={64} />
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <span style={{
                                                    fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase',
                                                    color: '#ffa305', letterSpacing: '0.5px', marginBottom: '0.25rem', display: 'block'
                                                }}>
                                                    {qr.type}
                                                </span>
                                                <div style={{ position: 'relative' }} className="qr-menu-container">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === qr._id ? null : qr._id); }}
                                                        style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                                                    >
                                                        <MoreVertical size={20} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {activeMenuId === qr._id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                                                style={{
                                                                    position: 'absolute', right: 0, top: '100%', width: '160px',
                                                                    background: '#334155', borderRadius: '12px', padding: '0.5rem',
                                                                    zIndex: 10, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                                                                    border: '1px solid #475569'
                                                                }}
                                                            >
                                                                {/* Protected IDs Check */}
                                                                {!(String(qr._id) === '6954c3238ed008ead9300b3c' || String(qr._id) === '6954c3818ed008ead9300c25') && !staticTypes.includes(qr.type) && (
                                                            <button onClick={() => navigate(`/statistics/${qr._id}`)} style={{ width: '100%', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', borderRadius: '6px' }} className="hover:bg-slate-600">
                                                                <BarChart size={16} /> Statistics
                                                            </button>
                                                        )}
                                                        <button onClick={() => handleRenameClick(qr)} style={{ width: '100%', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', borderRadius: '6px' }} className="hover:bg-slate-600">
                                                            <PenTool size={16} /> Rename
                                                        </button>
                                                        {!(String(qr._id) === '6954c3238ed008ead9300b3c' || String(qr._id) === '6954c3818ed008ead9300c25') && !staticTypes.includes(qr.type) && (
                                                            <button onClick={() => handleEditQR(qr)} style={{ width: '100%', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', borderRadius: '6px' }} className="hover:bg-slate-600">
                                                                <Edit size={16} /> Edit
                                                            </button>
                                                        )}
                                                                <button 
                                                                    onClick={() => {
                                                                        if (String(qr._id) === '6954c3238ed008ead9300b3c' || String(qr._id) === '6954c3818ed008ead9300c25') {
                                                                            toast.error('This QR code cannot be deleted');
                                                                            return;
                                                                        }
                                                                        handleDeleteClick(qr._id);
                                                                    }} 
                                                                    style={{ 
                                                                        width: '100%', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', 
                                                                        color: (String(qr._id) === '6954c3238ed008ead9300b3c' || String(qr._id) === '6954c3818ed008ead9300c25') ? '#94a3b8' : '#ef4444', 
                                                                        background: 'transparent', border: 'none', 
                                                                        cursor: (String(qr._id) === '6954c3238ed008ead9300b3c' || String(qr._id) === '6954c3818ed008ead9300c25') ? 'not-allowed' : 'pointer', 
                                                                        fontSize: '0.9rem', borderRadius: '6px',
                                                                        opacity: (String(qr._id) === '6954c3238ed008ead9300b3c' || String(qr._id) === '6954c3818ed008ead9300c25') ? 0.5 : 1
                                                                    }} 
                                                                    className={(String(qr._id) === '6954c3238ed008ead9300b3c' || String(qr._id) === '6954c3818ed008ead9300c25') ? "" : "hover:bg-red-900/20"}
                                                                >
                                                                    <Trash2 size={16} /> Delete
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', margin: '0.25rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {qr.name || 'Untitled QR'}
                                            </h3>
                                            {/* Mobile Preview URL */}
                                            <div style={{ marginBottom: '0.5rem' }}>
                                                <a 
                                                    href={`${baseUrl}/view/${qr.shortId}`} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    style={{ 
                                                        fontSize: '0.8rem', 
                                                        color: '#ffa305', 
                                                        textDecoration: 'none', 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        gap: '0.25rem' 
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ExternalLink size={12} />
                                                    {`${baseUrl}/view/${qr.shortId}`}
                                                </a>
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>

                                                <Clock size={14} />
                                                {new Date(qr.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Strip */}
                                    <div style={{
                                        background: '#0f172a', padding: '1rem 1.5rem', borderTop: '1px solid #334155',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                    }}>
                                        {!staticTypes.includes(qr.type) ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <BarChart size={18} color="#ffa305" />
                                                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{qr.scanCount || 0}</span>
                                                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>scans</span>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }}></div>
                                                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Static</span>
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <motion.button
                                                whileHover={{ scale: 1.1, background: '#334155' }}
                                                onClick={() => handleDownloadClick(qr)}
                                                style={{ padding: '0.5rem', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                                            >
                                                <Download size={18} />
                                            </motion.button>
                                            {!staticTypes.includes(qr.type) && (
                                                <motion.button
                                                    whileHover={{ scale: 1.1, background: '#334155' }}
                                                    onClick={() => handleEditUrlClick(qr)}
                                                    style={{ padding: '0.5rem', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                                                >
                                                    <Link size={18} />
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem', alignItems: 'center' }}>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            style={{
                                padding: '0.75rem', borderRadius: '12px', background: '#1e293b', border: '1px solid #334155',
                                color: currentPage === 1 ? '#475569' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span style={{ fontWeight: '600', color: '#94a3b8' }}>Page {currentPage} of {totalPages}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            style={{
                                padding: '0.75rem', borderRadius: '12px', background: '#1e293b', border: '1px solid #334155',
                                color: currentPage === totalPages ? '#475569' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* Hidden Elements for Downloads */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0 }}>
                {downloadingQr && (
                    <div id={`hidden-qr-${downloadingQr._id}`} style={{ width: '1024px', height: '1024px' }}>
                        <QRRenderer
                            value={getQRValue(downloadingQr)}
                            design={downloadingQr.design || {}}
                            size={1024}
                            margin={downloadingQr.design?.margin || 20}
                        />
                    </div>
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isDownloadModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: '#1e293b', padding: '2rem', borderRadius: '24px', border: '1px solid #334155', width: '90%', maxWidth: '500px' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Download QR</h2>
                                <button onClick={() => setIsDownloadModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                                {['png', 'jpeg', 'svg', 'pdf'].map(fmt => (
                                    <button
                                        key={fmt}
                                        onClick={() => setDownloadFormat(fmt)}
                                        style={{
                                            padding: '1rem', borderRadius: '12px', border: `2px solid ${downloadFormat === fmt ? '#ffa305' : '#334155'}`,
                                            background: downloadFormat === fmt ? '#ffa30520' : 'transparent', color: '#fff', cursor: 'pointer',
                                            textTransform: 'uppercase', fontWeight: '700'
                                        }}
                                    >
                                        {fmt}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleRunDownload}
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '12px', background: '#ffa305',
                                    color: '#000', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer'
                                }}
                            >
                                Download File
                            </button>
                        </motion.div>
                    </motion.div>
                )}

                {isUrlModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: '#1e293b', padding: '2rem', borderRadius: '24px', border: '1px solid #334155', width: '90%', maxWidth: '500px' }}
                        >
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Edit Short Link</h2>
                            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', border: '1px solid #334155', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <span style={{ color: '#94a3b8' }}>{baseUrl.replace(/^https?:\/\//, '')}/view/</span>
                                <input
                                    value={tempShortId}
                                    onChange={(e) => setTempShortId(e.target.value.replace(/[^a-z0-9-]/g, ''))}
                                    style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1rem', outline: 'none', flex: 1, fontWeight: '600' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={() => setIsUrlModalOpen(false)} style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: 'transparent', border: '1px solid #334155', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                                <button onClick={handleUpdateUrl} disabled={isUpdatingUrl} style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: '#ffa305', color: '#000', border: 'none', cursor: 'pointer', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                    {isUpdatingUrl && <Loader2 size={18} className="animate-spin" />} Update
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {isRenameModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: '#1e293b', padding: '2rem', borderRadius: '24px', border: '1px solid #334155', width: '90%', maxWidth: '500px' }}
                        >
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Rename QR Code</h2>
                            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', border: '1px solid #334155', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <input
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    placeholder="Enter new name"
                                    style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1rem', outline: 'none', flex: 1, fontWeight: '600' }}
                                    autoFocus
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={() => setIsRenameModalOpen(false)} style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: 'transparent', border: '1px solid #334155', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                                <button onClick={handleUpdateName} disabled={isRenaming} style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: '#ffa305', color: '#000', border: 'none', cursor: 'pointer', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                    {isRenaming && <Loader2 size={18} className="animate-spin" />} Save
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {deleteConfirmationId && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(8px)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: '#1e293b', padding: '2rem', borderRadius: '24px', border: '1px solid #ef4444', width: '90%', maxWidth: '400px', textAlign: 'center' }}
                        >
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ef444420', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Trash2 size={30} color="#ef4444" />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Delete QR Code?</h2>
                            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>This action cannot be undone. The QR code will stop working immediately.</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={() => setDeleteConfirmationId(null)} style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: 'transparent', border: '1px solid #334155', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                                <button onClick={confirmDelete} disabled={isDeleting} style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                    {isDeleting && <Loader2 size={18} className="animate-spin" />} Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;

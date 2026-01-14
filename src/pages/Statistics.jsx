import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Download, Edit, Trash2, ArrowLeft, Link as LinkIcon, Calendar, Folder, Star, Globe, Copy, Check,
    Plus, BarChart, FileText, ChevronLeft, Bell, X, Image as ImageIcon, PenTool, Home, Smartphone, Menu,
    Share2, MapPin, Clock, Activity, Monitor, Chrome, Fingerprint
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
import MobilePreview from '../components/MobilePreview';
import QRRenderer from '../components/QRRenderer';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart as RechartsBarChart, Bar
} from 'recharts';

const COLORS = ['#ffa305', '#3b82f6', '#10b981', '#ef4444', '#ffa305', '#ec4899', '#6366f1'];
const CHART_GRADIENT = {
    start: '#ffa305',
    end: 'rgba(255, 163, 5, 0.1)'
};

const Statistics = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [qr, setQr] = useState(null);
    const [loading, setLoading] = useState(true);
    const qrRefs = useRef({});
    const baseUrl = (import.meta.env.VITE_FRONTEND_URL || window.location.origin).replace(/\/$/, '');

    // Download Modal State
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [downloadFormat, setDownloadFormat] = useState('png');
    
    // Preview Modal State
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    // Delete Modal State
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Responsive State
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

    // Tab State for Demographics
    const [activeDemographicTab, setActiveDemographicTab] = useState('device');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 768);
            setIsTablet(width <= 1024);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchQR = async () => {
            try {
                const res = await axios.get(`/api/qr/detail/${id}`);
                setQr(res.data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load QR statistics');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchQR();

        const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000');
        socket.on('scan-updated', (data) => {
            if (data._id === id) {
                fetchQR();
            }
        });

        return () => socket.disconnect();
    }, [id, navigate]);

    const handleCopyLink = (shortId) => {
        const frontendUrl = (import.meta.env.VITE_FRONTEND_URL || window.location.origin).replace(/\/$/, '');
        const backendUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
        const link = qr.type === 'dynamic-url' ? `${backendUrl}/${shortId}` : `${frontendUrl}/view/${shortId}`;
        navigator.clipboard.writeText(link);
        toast.success('Link copied to clipboard');
    };

    // --- Download Logic ---
    const handleDownloadClick = () => {
        setDownloadFormat('png');
        setIsDownloadModalOpen(true);
    };

    const handleCloseDownloadModal = () => {
        setIsDownloadModalOpen(false);
    };

    const handleRunDownload = async () => {
        if (!qr) {
            handleCloseDownloadModal();
            return;
        }

        try {
            await downloadClientSide();
            toast.success('QR code downloaded successfully!');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Failed to download QR code');
        }
        handleCloseDownloadModal();
    };

    const downloadClientSide = async () => {
        let qrElement = document.querySelector(`#hidden-qr-${qr._id} canvas`);

        if (!qrElement) {
            const wrapper = document.getElementById(`hidden-qr-${qr._id}`);
            if (wrapper) {
                qrElement = wrapper.querySelector('canvas');
            }
        }

        if (!qrElement) {
            qrElement = document.querySelector(`#qr-render-${qr._id} canvas, #qr-render-${qr._id} svg, #qr-render-${qr._id} img`) ||
                document.querySelector(`#qr-${qr._id} canvas, #qr-${qr._id} svg, #qr-${qr._id} img`);

            if (!qrElement) {
                qrElement = document.getElementById(`qr-render-${qr._id}`) || document.getElementById(`qr-${qr._id}`);
            }
        }

        if (!qrElement) {
            throw new Error('QR element not found');
        }

        const filename = `${qr.name || 'qr-code'}.${downloadFormat}`;

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
            let dataUrl;
            if (qrElement instanceof HTMLCanvasElement) {
                dataUrl = qrElement.toDataURL('image/png');
            } else {
                dataUrl = await toPng(qrElement);
            }

            const size = 512;
            const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <image href="${dataUrl}" x="0" y="0" width="${size}" height="${size}" />
</svg>`;

            const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.download = filename;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else {
            const dataUrl = downloadFormat === 'jpg' || downloadFormat === 'jpeg'
                ? await toJpeg(qrElement, { quality: 0.95 })
                : await toPng(qrElement);

            const link = document.createElement('a');
            link.download = filename;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`/api/qr/${qr._id}`);
            toast.success("QR deleted successfully");
            navigate('/');
        } catch (e) {
            console.error(e);
            toast.error("Server error");
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="loader" style={{ width: '40px', height: '40px', border: '3px solid #1e293b', borderTopColor: '#ffa305', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
    );
    
    if (!qr) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#94a3b8' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>QR Code Not Found</h2>
            <p>The requested QR code statistics could not be loaded.</p>
            <button onClick={() => navigate('/')} style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', background: '#ffa305', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                Go to Dashboard
            </button>
        </div>
    );

    // --- Data Processing ---
    const scansByDate = {};
    (qr.scans || []).forEach(scan => {
        const date = new Date(scan.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        scansByDate[date] = (scansByDate[date] || 0) + 1;
    });
    const scanActivityData = Object.keys(scansByDate).map(date => ({ name: date, scans: scansByDate[date] })).sort((a, b) => new Date(a.name) - new Date(b.name));
    
    // Fill in missing dates for better chart visualization (optional, but good for "Area" chart)
    if (scanActivityData.length > 0) {
        // Simple logic to ensure we have at least start and end
    }

    const uniqueIPs = new Set((qr.scans || []).map(s => s.ip));
    const uniqueScans = uniqueIPs.size;

    const getStats = (key) => {
        const counts = {};
        (qr.scans || []).forEach(s => {
            const k = key(s) || 'Unknown';
            counts[k] = (counts[k] || 0) + 1;
        });
        const d = Object.entries(counts).map(([k, v]) => ({ name: k, value: v }));
        const t = d.reduce((a, b) => a + b.value, 0);
        return { data: d.sort((a, b) => b.value - a.value), total: t };
    }
    
    const deviceStats = getStats(s => s.device || 'Mobile');
    const countryStats = getStats(s => (s.location || 'Unknown').split(',')[1]?.trim());
    const cityStats = getStats(s => (s.location || 'Unknown').split(',')[0]?.trim());
    const browserStats = getStats(s => s.browser || 'Chrome'); // Assuming browser data might be available or fallback

    // Heatmap
    const heatmapData = Array(7).fill(0).map(() => Array(24).fill(0));
    (qr.scans || []).forEach(s => {
        const d = new Date(s.timestamp);
        const dayIndex = (d.getDay() + 6) % 7; // Mon=0
        heatmapData[dayIndex][d.getHours()]++;
    });
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const demChartHeight = isMobile ? 240 : (isTablet ? 280 : 320);
    const pieInnerRadius = isMobile ? 50 : (isTablet ? 60 : 70);
    const pieOuterRadius = isMobile ? 80 : (isTablet ? 90 : 110);
    const hoursLabels = Array.from({ length: 24 }, (_, i) => `${i}h`);
    const tileHeight = isMobile ? 16 : (isTablet ? 20 : 24);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{label}</p>
                    <p style={{ color: '#ffa305', fontSize: '1rem', fontWeight: 'bold' }}>{Math.round(payload[0].value)} Scans</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: '"Inter", sans-serif' }}>
            
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                style={{ 
                    flex: 1, 
                    padding: isMobile ? '1rem' : '2rem 3rem', 
                    overflowY: 'auto', 
                    maxHeight: '100vh'
                }}
            >
                {/* Header */}
                <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button 
                            onClick={() => navigate('/')} 
                            style={{ 
                                display: 'flex', alignItems: 'center', gap: '0.5rem', 
                                color: '#94a3b8', background: 'transparent', border: 'none', 
                                fontSize: '0.9rem', cursor: 'pointer', transition: 'color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                        >
                            <ChevronLeft size={20} /> Back to Dashboard
                        </button>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(`/generator`, { state: { editingQr: qr, selectedType: qr.type } })}
                            style={{ background: '#334155', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
                        >
                            <Edit size={16} /> <span style={{ display: isMobile ? 'none' : 'inline' }}>Edit</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: '#ef4444' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowDeleteConfirm(true)}
                            style={{ background: '#334155', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
                        >
                            <Trash2 size={16} /> <span style={{ display: isMobile ? 'none' : 'inline' }}>Delete</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Top Section: QR Card & Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '350px 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* QR Info Card */}
                    <motion.div variants={itemVariants} style={{ background: '#1e293b', borderRadius: '16px', padding: '1.5rem', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div id={`qr-render-${qr._id}`} style={{ background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                {qr.qrImageUrl ? (
                                    <img src={`${qr.qrImageUrl}?t=${Date.now()}`} alt="QR Code" style={{ width: '180px', height: '180px', objectFit: 'contain' }} />
                                ) : (
                                    <QRRenderer
                                        value={qr.type === 'dynamic-url' ? `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/${qr.shortId}` : `${baseUrl}/view/${qr.shortId}`}
                                        design={qr.design || {}}
                                        size={180}
                                        id={`qr-${qr._id}`}
                                    />
                                )}
                            </div>
                        </div>
                        
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem', textAlign: 'center' }}>{qr.name || 'Untitled QR'}</h2>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                                <span style={{ textTransform: 'capitalize' }}>{qr.type.replace('-', ' ')}</span>
                                <span>•</span>
                                <span>{new Date(qr.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #334155', gap: '0.5rem' }}>
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#ffa305', fontSize: '0.85rem', flex: 1 }}>
                                {qr.type === 'dynamic-url' ? `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/${qr.shortId}` : `${baseUrl}/view/${qr.shortId}`}
                            </div>
                            <button onClick={() => handleCopyLink(qr.shortId)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem' }}>
                                <Copy size={18} />
                            </button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDownloadClick}
                            style={{ background: '#ffa305', color: '#000', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
                        >
                            <Download size={20} /> Download QR Code
                        </motion.button>
                    </motion.div>

                    {/* Embedded Mobile Preview */}
                    {qr.type !== 'dynamic-url' && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <MobilePreview config={qr} />
                        </div>
                    )}
                    </div>

                    {/* Stats & Charts Area */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Summary Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                            <motion.div variants={itemVariants} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#94a3b8' }}>
                                    <Activity size={20} color="#ffa305" />
                                    <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Total Scans</span>
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>{(qr.scans || []).length}</div>
                            </motion.div>
                            <motion.div variants={itemVariants} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#94a3b8' }}>
                                    <Fingerprint size={20} color="#10b981" />
                                    <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Unique Scans</span>
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>{uniqueScans}</div>
                            </motion.div>
                            <motion.div variants={itemVariants} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#94a3b8' }}>
                                    <Smartphone size={20} color="#3b82f6" />
                                    <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Top Device</span>
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {deviceStats.data[0]?.name || 'N/A'}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{deviceStats.data[0]?.value || 0} scans</div>
                            </motion.div>
                        </div>

                        {/* Main Chart */}
                        <motion.div variants={itemVariants} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>Scan Performance</h3>
                            <div style={{ height: '300px', width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={scanActivityData}>
                                        <defs>
                                            <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ffa305" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#ffa305" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} dy={10} />
                                        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} allowDecimals={false} domain={[0, 'dataMax']} />
                                        <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: '#475569', strokeWidth: 1 }} />
                                        <Area type="monotone" dataKey="scans" stroke="#ffa305" strokeWidth={3} fillOpacity={1} fill="url(#colorScans)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Section: Demographics & Heatmap */}
                <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                    
                    {/* Demographics */}
                    <motion.div variants={itemVariants} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>Demographics</h3>
                            <div style={{ display: 'flex', background: '#0f172a', padding: '0.25rem', borderRadius: '8px', border: '1px solid #334155' }}>
                                {['device', 'country', 'city'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveDemographicTab(tab)}
                                        style={{
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '6px',
                                            background: activeDemographicTab === tab ? '#334155' : 'transparent',
                                            color: activeDemographicTab === tab ? '#fff' : '#94a3b8',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            fontWeight: '500',
                                            textTransform: 'capitalize',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: '2rem', height: demChartHeight }}>
                            <div style={{ flex: 1, height: demChartHeight, width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={activeDemographicTab === 'device' ? deviceStats.data : activeDemographicTab === 'country' ? countryStats.data : cityStats.data}
                                            innerRadius={pieInnerRadius}
                                            outerRadius={pieOuterRadius}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {(activeDemographicTab === 'device' ? deviceStats.data : activeDemographicTab === 'country' ? countryStats.data : cityStats.data).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip 
                                            contentStyle={{ background: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: demChartHeight, width: '100%' }}>
                                {(activeDemographicTab === 'device' ? deviceStats.data : activeDemographicTab === 'country' ? countryStats.data : cityStats.data).map((entry, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS[index % COLORS.length] }}></div>
                                            <span style={{ color: '#f8fafc' }}>{entry.name}</span>
                                        </div>
                                        <span style={{ color: '#94a3b8', fontWeight: '600' }}>{Math.round((entry.value / (activeDemographicTab === 'device' ? deviceStats.total : activeDemographicTab === 'country' ? countryStats.total : cityStats.total)) * 100)}%</span>
                                    </div>
                                ))}
                                {(activeDemographicTab === 'device' ? deviceStats.data : activeDemographicTab === 'country' ? countryStats.data : cityStats.data).length === 0 && (
                                    <div style={{ color: '#64748b', textAlign: 'center', marginTop: '2rem' }}>No data available</div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Heatmap */}
                    <motion.div variants={itemVariants} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>Activity Heatmap</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <div>
                                <div style={{ display: 'grid', gridTemplateColumns: `40px repeat(24, 1fr)`, gap: '2px', marginBottom: '0.5rem' }}>
                                    <div style={{ width: '40px' }}></div>
                                    {hoursLabels.map((label, i) => (
                                        <div key={i} style={{ fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center' }}>
                                            {(isMobile && i % 3 !== 0) ? '' : label}
                                        </div>
                                    ))}
                                </div>
                                {days.map((day, dIndex) => (
                                    <div key={day} style={{ display: 'grid', gridTemplateColumns: `40px repeat(24, 1fr)`, alignItems: 'center', marginBottom: '0.25rem', gap: '2px' }}>
                                        <div style={{ width: '40px', fontSize: '0.75rem', color: '#94a3b8' }}>{day}</div>
                                        {heatmapData[dIndex].map((val, hIndex) => {
                                            const opacity = val > 0 ? Math.min(0.2 + (val * 0.15), 1) : 0.05;
                                            return (
                                                <motion.div
                                                    key={hIndex}
                                                    whileHover={{ scale: 1.2, zIndex: 10 }}
                                                    title={`${val} scans at ${hIndex}:00`}
                                                    style={{
                                                        height: `${tileHeight}px`,
                                                        background: '#ffa305',
                                                        opacity: opacity,
                                                        borderRadius: '2px',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile Preview Overlay (Hidden on Desktop by default, maybe add a toggle?) */}
                {/* For this design, I've removed the Mobile Preview from the main flow to focus on stats. 
                    I'll add a button to show it or place it differently?
                    The original design had it next to the QR card.
                    Let's add it as a Modal or a Toggle for "Preview".
                */}

            </motion.div>

            {/* Download Modal */}
            <AnimatePresence>
                {isDownloadModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
                        onClick={handleCloseDownloadModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            style={{ background: '#1e293b', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '400px', border: '1px solid #334155' }}
                        >
                            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>Download QR Code</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                {['png', 'jpg', 'svg', 'pdf'].map(fmt => (
                                    <button
                                        key={fmt}
                                        onClick={() => setDownloadFormat(fmt)}
                                        style={{
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            border: downloadFormat === fmt ? '2px solid #ffa305' : '2px solid #334155',
                                            background: downloadFormat === fmt ? 'rgba(255, 163, 5, 0.1)' : 'transparent',
                                            color: downloadFormat === fmt ? '#ffa305' : '#94a3b8',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {fmt}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleRunDownload}
                                style={{ width: '100%', padding: '1rem', background: '#ffa305', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Download
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}
                        onClick={() => setShowDeleteConfirm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={e => e.stopPropagation()}
                            style={{ background: '#1e293b', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '400px', border: '1px solid #334155' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
                                <div style={{ width: '50px', height: '50px', background: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                    <Trash2 size={24} />
                                </div>
                                <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 'bold' }}>Delete QR Code?</h3>
                                <p style={{ color: '#94a3b8' }}>This action cannot be undone. All scan data will be permanently lost.</p>
                                <div style={{ display: 'flex', gap: '1rem', width: '100%', marginTop: '1rem' }}>
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1px solid #334155', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        disabled={isDeleting}
                                        style={{ flex: 1, padding: '0.75rem', background: '#ef4444', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', opacity: isDeleting ? 0.7 : 1 }}
                                    >
                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>



            {/* Hidden Container for High-Res Generation */}
            <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                 <div id={`hidden-qr-${qr._id}`}>
                     <QRRenderer
                        value={qr.type === 'dynamic-url' ? `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/${qr.shortId}` : `${baseUrl}/view/${qr.shortId}`}
                        design={qr.design || {}}
                        size={1024} // High Res for Download
                    />
                 </div>
            </div>
        </div>
    );
};

// Helper Icon Component
const FingerprintIcon = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c0-3 2.5-5.5 5.5-5.5S23 9 23 12M12 12c0 3-2.5 5.5-5.5 5.5S1 15 1 12M12 12V2M12 12v10M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
    </svg>
); // Placeholder, using Lucide Fingerprint if available, else this custom one or just Lucide Activity

export default Statistics;

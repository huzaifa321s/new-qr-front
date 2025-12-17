
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Download, Edit, Trash2, ArrowLeft, Link as LinkIcon, Calendar, Folder, Star, Globe, Copy, Check,
    Plus, BarChart, FileText, ChevronLeft, Bell, X, Image as ImageIcon, PenTool, Home
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
import MobilePreview from '../components/MobilePreview';
import QRRenderer from '../components/QRRenderer';
import Sidebar from '../components/Sidebar';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const Statistics = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [qr, setQr] = useState(null);
    const [loading, setLoading] = useState(true);
    const qrRefs = useRef({}); // For download renderer

    // Download Modal State
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [downloadFormat, setDownloadFormat] = useState('png');

    // Delete Modal State
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchQR = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/qr/detail/${id}`);
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

        const socket = io('http://localhost:3000');
        socket.on('scan-updated', (data) => {
            if (data._id === id) {
                fetchQR();
            }
        });

        return () => socket.disconnect();
    }, [id, navigate]);

    const handleCopyLink = (shortId) => {
        const link = `${window.location.origin}/view/${shortId}`;
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
            const filename = `${qr.name || 'qr-code'}.${downloadFormat}`;
            // Use Backend API
            const downloadUrl = `http://localhost:3000/api/qr/download/${qr.shortId}?format=${downloadFormat}`;
            console.log('📥 Downloading from:', downloadUrl);
            const response = await fetch(downloadUrl);
            if (!response.ok) throw new Error('Download failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = filename;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);
            toast.success('QR code downloaded successfully!');
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback Client Side
            try {
                await fallbackClientDownload();
            } catch (e) {
                console.error(e);
                toast.error('Failed to download QR code');
            }
        }
        handleCloseDownloadModal();
    };

    const fallbackClientDownload = async () => {
        const element = document.getElementById(`qr-render-${qr._id}`)?.querySelector('canvas');
        if (!element) throw new Error('QR element not found');

        const filename = `${qr.name || 'qr-code'}.${downloadFormat}`;
        if (downloadFormat === 'pdf') {
            const dataUrl = element.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(dataUrl, 'PNG', 10, 10, pdfWidth, pdfHeight);
            pdf.save(filename);
        } else {
            const dataUrl = element.toDataURL(downloadFormat === 'jpg' ? 'image/jpeg' : 'image/png');
            const link = document.createElement('a');
            link.download = filename;
            link.href = dataUrl;
            link.click();
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


    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    if (!qr) return null;

    // Data Processing (Same as before)
    const scansByDate = {};
    (qr.scans || []).forEach(scan => {
        const date = new Date(scan.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        scansByDate[date] = (scansByDate[date] || 0) + 1;
    });
    const scanActivityData = Object.keys(scansByDate).map(date => ({ name: date, scans: scansByDate[date] })).sort((a, b) => new Date(a.name) - new Date(b.name));
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
        return { data: d, total: t };
    }
    const deviceStats = getStats(s => s.device || 'Mobile');
    const countryStats = getStats(s => (s.location || 'Unknown').split(',')[1]?.trim());
    const cityStats = getStats(s => (s.location || 'Unknown').split(',')[0]?.trim());

    // Heatmap
    const heatmapData = Array(7).fill(0).map(() => Array(24).fill(0));
    (qr.scans || []).forEach(s => { const d = new Date(s.timestamp); heatmapData[d.getDay()][d.getHours()]++; });
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fa', fontFamily: 'sans-serif' }}>
            <Toaster position="top-right" />

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7c3aed', background: 'transparent', border: 'none', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', marginBottom: '1.5rem' }}><ChevronLeft size={16} /> Back</button>

                    {/* Top Stats & Preview Card */}
                    <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                            {/* Left Info */}
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111827', lineHeight: 1, marginBottom: '0.5rem' }}>{qr.scanCount || 0} <span style={{ fontSize: '1rem', color: '#9ca3af', fontWeight: 'normal' }}>Scans</span></div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '2rem' }}>{qr.folder ? <Folder size={16} /> : null} {qr.folder || 'No Folder'}</div>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div><div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>QR LINK</div><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><a href={`${window.location.origin}/view/${qr.shortId}`} target="_blank" rel="noreferrer" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: '500' }}>{window.location.origin}/view/{qr.shortId}</a><Copy size={14} color="#9ca3af" onClick={() => handleCopyLink(qr.shortId)} style={{ cursor: 'pointer' }} /></div></div>
                                    <div><div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>CREATED</div><div style={{ color: '#1f2937', fontSize: '0.875rem' }}>{new Date(qr.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div></div>
                                    <div><div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>TYPE</div><div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: '#f3e8ff', color: '#7c3aed', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'capitalize' }}>{qr.type.replace('-', ' ')}</div></div>
                                </div>
                            </div>

                            {/* Right: QR Card + Mobile Preview */}
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                                {/* QR Card */}
                                <div style={{ padding: '1rem', borderRadius: '12px', background: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    <div id={`qr-render-${qr._id}`} style={{ background: '#fff', padding: '0.5rem', borderRadius: '8px' }}>
                                        {qr.qrImageUrl ? (
                                            <img
                                                src={`${qr.qrImageUrl}?t=${Date.now()}`}
                                                alt="QR Code"
                                                style={{ width: '140px', height: '140px', objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <QRRenderer
                                                value={`${window.location.origin}/view/${qr.shortId}`}
                                                design={qr.design || {}}
                                                size={140}
                                                id={`qr-${qr._id}`}
                                            />
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                                        <button onClick={handleDownloadClick} title="Download" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e5e5', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4b5563' }}><Download size={14} /></button>
                                        <button onClick={() => navigate(`/generator`, { state: { editingQr: qr, selectedType: qr.type } })} title="Edit" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e5e5', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4b5563' }}><Edit size={14} /></button>

                                        {/* Delete Button Container */}
                                        <div style={{ position: 'relative' }}>
                                            <button
                                                onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                                                title="Delete"
                                                style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e5e5', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444' }}
                                            >
                                                <Trash2 size={14} />
                                            </button>

                                            {/* Delete Tooltip Modal */}
                                            {showDeleteConfirm && (
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: 'calc(100% + 15px)', // Position above
                                                    right: '-8px',
                                                    width: '280px',
                                                    background: '#ffffff',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                                    border: '1px solid #e5e5e5',
                                                    padding: '1.25rem',
                                                    zIndex: 50,
                                                    cursor: 'default',
                                                    textAlign: 'left'
                                                }} onClick={e => e.stopPropagation()}>
                                                    {/* Arrow */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: '-6px',
                                                        right: '20px',
                                                        width: '12px',
                                                        height: '12px',
                                                        background: '#ffffff',
                                                        transform: 'rotate(45deg)',
                                                        borderRight: '1px solid #e5e5e5',
                                                        borderBottom: '1px solid #e5e5e5',
                                                    }}></div>

                                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
                                                        <div style={{
                                                            minWidth: '20px', height: '20px', background: '#fbbf24', borderRadius: '50%',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px'
                                                        }}>
                                                            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>!</span>
                                                        </div>
                                                        <div>
                                                            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '700', color: '#000' }}>Delete the QR Code</h4>
                                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>Are you sure to delete this QR Code?</p>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                        <button
                                                            onClick={() => setShowDeleteConfirm(false)}
                                                            disabled={isDeleting}
                                                            style={{
                                                                padding: '0.4rem 1rem', borderRadius: '6px', border: '1px solid #e5e5e5',
                                                                background: '#fff', color: '#666', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500'
                                                            }}>
                                                            No
                                                        </button>
                                                        <button
                                                            onClick={confirmDelete}
                                                            disabled={isDeleting}
                                                            style={{
                                                                padding: '0.4rem 1rem', borderRadius: '6px', border: 'none', background: '#7c3aed',
                                                                color: '#fff', fontSize: '0.85rem', cursor: isDeleting ? 'not-allowed' : 'pointer', fontWeight: '500',
                                                                minWidth: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                opacity: isDeleting ? 0.8 : 1
                                                            }}>
                                                            {isDeleting ? (
                                                                <div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                                            ) : 'Yes'}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <button title="Notifications" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e5e5', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4b5563' }}><Bell size={14} /></button>
                                    </div>
                                </div>
                                {/* Mobile Preview (Small) */}
                                <div style={{ width: '150px', height: '300px', border: '3px solid #1f2937', borderRadius: '16px', overflow: 'hidden', background: '#111827', position: 'relative' }}>
                                    <div style={{ transform: 'scale(0.45)', transformOrigin: 'top left', width: '222%', height: '222%' }}>
                                        <MobilePreview config={qr} type={qr.type} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scan Activity */}
                    <div style={{ marginBottom: '2rem' }}>
                        {/* Overview Tab */}
                        <div style={{ borderBottom: '1px solid #e5e5e5', marginBottom: '1.5rem', display: 'flex', gap: '2rem' }}>
                            <div style={{ paddingBottom: '0.75rem', borderBottom: '2px solid #3b82f6', color: '#3b82f6', fontWeight: 'bold', fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: 6, height: 6, background: '#3b82f6', borderRadius: '50%' }}></div> Overview
                            </div>
                        </div>

                        <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.5rem 0' }}>Scan Activity</h4>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Track your QR code performance over time</p>
                            </div>

                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                {/* Left: Chart */}
                                <div style={{ flex: 2, minWidth: '400px', height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={scanActivityData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} allowDecimals={false} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                            <Line type="monotone" dataKey="scans" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Right: Stats Cards */}
                                <div style={{ flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {/* Total Scans Card */}
                                    <div style={{ background: '#f3e8ff', borderRadius: '12px', padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7c3aed' }}></div>
                                            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>Total Scans</span>
                                        </div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#7c3aed', lineHeight: 1, marginBottom: '0.5rem' }}>
                                            {qr.scanCount || 0}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                            Dec 17, 2025 to Dec 17, 2025
                                        </div>
                                    </div>

                                    {/* Unique Scans Card */}
                                    <div style={{ background: '#ccfbf1', borderRadius: '12px', padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0d9488' }}></div>
                                            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>Unique Scans</span>
                                        </div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0d9488', lineHeight: 1, marginBottom: '0.5rem' }}>
                                            {uniqueScans}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                            Dec 17, 2025 to Dec 17, 2025
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        {/* Demographics */}
                        <div style={{ flex: 1, minWidth: '300px', background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                            <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginBottom: '2rem' }}>Demographics</h4>
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                {[{ title: 'Device', stats: deviceStats, color: '#10b981' }, { title: 'Country', stats: countryStats, color: '#3b82f6' }, { title: 'City', stats: cityStats, color: '#ef4444' }].map((cat, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><div style={{ width: '6px', height: '6px', background: '#8b5cf6', borderRadius: '50%' }}></div><div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Scans by {cat.title}</div></div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                            <div style={{ width: '100px', height: '100px' }}><ResponsiveContainer><PieChart><Pie data={cat.stats.data} innerRadius={30} outerRadius={45} paddingAngle={0} dataKey="value" stroke="none">{cat.stats.data.map((_, idx) => <Cell key={idx} fill={idx === 0 ? cat.color : '#f3f4f6'} />)}</Pie></PieChart></ResponsiveContainer></div>
                                            <div style={{ flex: 1 }}>{cat.stats.data.slice(0, 1).map((d, idx) => <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: '#f9fafb', padding: '0.5rem', borderRadius: '8px' }}><span style={{ fontSize: '0.875rem', color: '#374151' }}>{d.name}</span><span style={{ fontWeight: '600', color: '#6b7280' }}>{Math.round((d.value / cat.stats.total) * 100)}%</span></div>)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Heatmap */}
                        <div style={{ flex: 1, minWidth: '300px', background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                            <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginBottom: '2rem' }}>Activity Heatmap</h4>
                            <div style={{ overflowX: 'auto' }}>
                                <div style={{ minWidth: '300px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(7, 1fr)', gap: '4px' }}>
                                        <div />{days.map(d => <div key={d} style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center' }}>{d.slice(0, 3)}</div>)}
                                        {Array.from({ length: 24 }).map((_, h) => (
                                            <React.Fragment key={h}>
                                                <div style={{ fontSize: '0.65rem', color: '#9ca3af', textAlign: 'right', paddingRight: '0.5rem', alignSelf: 'center' }}>{h === 0 ? '12am' : h === 12 ? '12pm' : h > 12 ? `${h - 12}pm` : `${h}am`}</div>
                                                {days.map((_, d) => <div key={`${d}-${h}`} style={{ height: '24px', background: heatmapData[d][h] > 0 ? '#7c3aed' : '#f3f4f6', opacity: heatmapData[d][h] > 0 ? Math.min(0.4 + (heatmapData[d][h] * 0.1), 1) : 1, borderRadius: '4px' }} title={`${days[d]} ${h}:00 - ${heatmapData[d][h]} scans`} />)}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Modal - Copied from Dashboard */}
            {isDownloadModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#ffffff', borderRadius: '12px', width: '600px', padding: '1.5rem', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                        <button onClick={handleCloseDownloadModal} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#999" /></button>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000', marginBottom: '1.5rem', borderBottom: '1px solid #e5e5e5', paddingBottom: '1rem' }}>Save as...</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                            {[{ id: 'jpeg', label: 'JPEG', icon: ImageIcon, desc: 'Standard Image' }, { id: 'png', label: 'PNG', icon: ImageIcon, desc: 'Transparent' }, { id: 'svg', label: 'SVG', icon: PenTool, desc: 'Vector File' }, { id: 'pdf', label: 'PDF', icon: FileText, desc: 'Universal' }].map((fmt) => (
                                <div key={fmt.id} onClick={() => setDownloadFormat(fmt.id)} style={{ border: `2px solid ${downloadFormat === fmt.id ? '#7c3aed' : '#e5e5e5'}`, borderRadius: '8px', padding: '1.5rem 0.5rem', textAlign: 'center', cursor: 'pointer', background: downloadFormat === fmt.id ? '#faf5ff' : '#fff' }}>
                                    <div style={{ color: '#7c3aed', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><fmt.icon size={32} /></div>
                                    <div style={{ color: '#7c3aed', fontWeight: 'bold', textTransform: 'uppercase' }}>{fmt.label}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}><button onClick={handleRunDownload} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>DOWNLOAD QR <Download size={18} /></button></div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Statistics;

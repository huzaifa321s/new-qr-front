import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Plus, Search, Download, Edit, Trash2, BarChart, ChevronDown,
    MoreVertical, Link, Copy, Globe, Calendar, Star, Folder, AlertTriangle, Check, X,
    Image as ImageIcon, FileText, PenTool, ChevronLeft, ChevronRight
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import QRRenderer from '../components/QRRenderer';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';

const Dashboard = () => {
    const navigate = useNavigate();
    const [qrs, setQrs] = useState([]);
    const qrRefs = useRef({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const [renamingId, setRenamingId] = useState(null);
    const [tempName, setTempName] = useState('');
    const [copiedId, setCopiedId] = useState(null);
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const [editingUrlQr, setEditingUrlQr] = useState(null);
    const [tempShortId, setTempShortId] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [downloadingQr, setDownloadingQr] = useState(null);
    const [downloadFormat, setDownloadFormat] = useState('png');

    const baseUrl = window.location.origin;

    const handleDownloadClick = (qr) => {
        setDownloadingQr(qr);
        setDownloadFormat('png');
        setIsDownloadModalOpen(true);
    };

    const handleCloseDownloadModal = () => {
        setIsDownloadModalOpen(false);
        setDownloadingQr(null);
    };

const handleRunDownload = async () => {
    if (!downloadingQr) {
        handleCloseDownloadModal();
        return;
    }

    try {
        // Try to find the QR element
        let qrElement = document.querySelector(`#modal-qr-${downloadingQr._id} canvas, #modal-qr-${downloadingQr._id} svg`) || 
                       document.querySelector(`#qr-${downloadingQr._id} canvas, #qr-${downloadingQr._id} svg`);

        const filename = `${downloadingQr.name || 'qr-code'}.${downloadFormat}`;

        // If we can't find the element but have a qrImageUrl, use that
        if (!qrElement && downloadingQr.qrImageUrl) {
            const response = await fetch(downloadingQr.qrImageUrl);
            if (!response.ok) throw new Error('Failed to fetch QR code');
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = filename;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            handleCloseDownloadModal();
            return;
        } else if (!qrElement) {
            throw new Error('QR code element not found');
        }

        // Handle different download formats
        if (downloadFormat === 'pdf') {
            const dataUrl = await toPng(qrElement);
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            const x = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
            
            pdf.addImage(dataUrl, 'PNG', x, 10, pdfWidth, pdfHeight);
            pdf.save(filename);
        } 
      else if (downloadFormat === 'svg') {
    // Get the canvas or create one from SVG
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 512; // Fixed size for better quality
    canvas.width = size;
    canvas.height = size;
    
    // Get the actual QR code element
    const qrCanvas = qrElement.tagName === 'CANVAS' ? 
        qrElement : 
        qrElement.querySelector('canvas');
    
    // Draw the QR code to our canvas
    if (qrCanvas) {
        // If we have a canvas, draw it directly
        ctx.drawImage(qrCanvas, 0, 0, size, size);
    } else {
        // If it's an SVG, convert it to canvas first
        const svgData = new XMLSerializer().serializeToString(qrElement);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
        
        await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
            // Set a timeout in case the image fails to load
            setTimeout(resolve, 1000);
        });
        
        // Draw the image to canvas
        ctx.drawImage(img, 0, 0, size, size);
    }
    
    // Get the data URL from canvas
    const pngDataUrl = canvas.toDataURL('image/png', 1.0);
    
    // Create a proper SVG with the image embedded
    const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" 
         xmlns="http://www.w3.org/2000/svg" 
         xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>QR Code</title>
        <desc>Generated QR Code</desc>
        <image width="${size}" height="${size}" xlink:href="${pngDataUrl}"/>
    </svg>`;
    
    // Create a blob and download
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);
}
        else {
            // For PNG/JPG
            const dataUrl = downloadFormat === 'jpg' || downloadFormat === 'jpeg' 
                ? await toJpeg(qrElement, { 
                    quality: 0.95,
                    width: qrElement.offsetWidth * 2,
                    height: qrElement.offsetHeight * 2
                  }) 
                : await toPng(qrElement, {
                    width: qrElement.offsetWidth * 2,
                    height: qrElement.offsetHeight * 2
                  });
            
            const link = document.createElement('a');
            link.download = filename;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        console.error('Download failed:', error);
        toast.error('Failed to download QR code');
        
        // Final fallback
        if (downloadingQr?.qrImageUrl) {
            window.open(downloadingQr.qrImageUrl, '_blank');
        }
    }
    
    handleCloseDownloadModal();
};


    const handleEditUrlClick = (qr) => {
        setEditingUrlQr(qr);
        setTempShortId(qr.shortId);
        setIsUrlModalOpen(true);
    };

    const handleCloseUrlModal = () => {
        setIsUrlModalOpen(false);
        setEditingUrlQr(null);
        setTempShortId('');
    };

    const handleUpdateUrl = () => {
        console.log("Update URL clicked");
    };

    const handleCopyUrl = (qr) => {
        // Always use the original QR data URL from database
        const url = qr.data || `http://localhost:3000/${qr.shortId}`;
        navigator.clipboard.writeText(url);
        setCopiedId(qr._id);
        toast.success('URL Copied!');
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleStartRename = (qr) => {
        setRenamingId(qr._id);
        setTempName(qr.name || 'Untitled QR');
    };

    const handleCancelRename = () => {
        setRenamingId(null);
        setTempName('');
    };

    const handleSaveRename = async (id) => {
        if (!tempName.trim()) return;
        try {
            await axios.put(`/api/qr/${id}`, { name: tempName });
            setQrs(prev => prev.map(q => q._id === id ? { ...q, name: tempName } : q));
            setRenamingId(null);
        } catch (err) {
            console.error(err);
            alert('Failed to update name');
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
            setDeleteConfirmationId(null);
        } catch (err) {
            console.error(err);
            alert('Failed to delete QR code');
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeMenuId && !event.target.closest('.qr-menu-container')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenuId]);

    useEffect(() => {
        fetchQRs();
    }, []);

    const fetchQRs = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiUrl = window.location.hostname === 'localhost'
                ? 'http://localhost:3000/api/qr/list'
                : '/api/qr/list';
            const res = await axios.get(apiUrl);
            setQrs(res.data);
            setLastUpdated(Date.now());
            setLoading(false);
        } catch (err) {
            console.error('Error fetching QRs:', err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch QRs');
            setLoading(false);
        }
    };

    const handleDownloadQR = (qr) => {
        try {
            // Get the QRRenderer component's ref
            const qrRef = qrRefs.current[qr._id];
            if (qrRef && qrRef.current) {
                // Use the QRRenderer's download method with the same design
                qrRef.current.download('png', qr.name || 'qr-code');
            } else {
                // Fallback to the server-side download
                window.location.href = `/api/qr/${qr.shortId}/download?format=png`;
            }
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Failed to download QR code');
        }
    };

    const handleEditQR = (qr) => {
        navigate('/generator', { state: { editingQr: qr, selectedType: qr.type } });
    };

    const toggleMenu = (e, id) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f7' }}>
            {/* Sidebar */}
            <div style={{
                width: '210px',
                background: '#ffffff',
                borderRight: '1px solid #e5e5e5',
                padding: '1.5rem 0',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    padding: '0 1.5rem'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                    }}>
                        Q
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#000', lineHeight: 1 }}>QR</div>
                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#000', lineHeight: 1 }}>INSIGHT</div>
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '0 0.75rem' }}>
                    <button
                        onClick={() => navigate('/select-template')}
                        style={{
                            width: '100%',
                            background: '#000',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.625rem',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                            fontSize: '0.875rem'
                        }}
                    >
                        <Plus size={16} /> Create New QR
                    </button>

                    <div style={{
                        padding: '0.625rem 1rem',
                        background: '#7c3aed',
                        color: '#fff',
                        borderRadius: '6px',
                        marginBottom: '0.5rem',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%' }}></div>
                        My QR Codes
                    </div>
                    <div style={{
                        padding: '0.625rem 1rem',
                        borderRadius: '6px',
                        marginBottom: '0.5rem',
                        cursor: 'pointer',
                        color: '#666',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <BarChart size={16} />
                        Statistics
                    </div>
                    <div style={{
                        padding: '0.625rem 1rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: '#666',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <FileText size={16} />
                        Billing & Plans
                    </div>
                </nav>

                <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '1rem', padding: '1rem 1.5rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#999', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Support</div>
                    <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ fontSize: '1rem' }}>?</div>
                        Help Center
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ fontSize: '1rem' }}>💬</div>
                        Contact Us
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '1.5rem 2rem', overflowY: 'auto' }}>
                {/* Red Banner */}
                <div style={{
                    background: '#ff4757',
                    color: '#ffffff',
                    padding: '0.875rem 1.5rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '20px', height: '20px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: '#ff4757' }}>!</div>
                        <span style={{ fontSize: '0.875rem' }}>You have 6 days left on your Free Trial. Keep your QR codes active!</span>
                    </div>
                    <button style={{ background: 'transparent', color: '#ffffff', border: '2px solid #fff', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', fontSize: '0.8rem' }}>Upgrade Now</button>
                </div>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#000', margin: 0 }}>My QR Codes</h1>
                    <button
                        onClick={() => navigate('/select-template')}
                        style={{
                            background: '#7c3aed',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.625rem 1.25rem',
                            borderRadius: '6px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem'
                        }}
                    >
                        <Plus size={16} /> CREATE NEW QR
                    </button>
                </div>

                {/* Filters Row */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative' }}>
                        <select style={{
                            padding: '0.5rem 2rem 0.5rem 0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            color: '#666',
                            background: '#fff',
                            cursor: 'pointer',
                            appearance: 'none'
                        }}>
                            <option>All types</option>
                        </select>
                        <ChevronDown size={14} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#666', pointerEvents: 'none' }} />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <select style={{
                            padding: '0.5rem 2rem 0.5rem 0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            color: '#666',
                            background: '#fff',
                            cursor: 'pointer',
                            appearance: 'none'
                        }}>
                            <option>Last Created</option>
                        </select>
                        <ChevronDown size={14} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#666', pointerEvents: 'none' }} />
                    </div>

                    <input
                        type="text"
                        placeholder="Start date"
                        style={{
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            color: '#999',
                            background: '#fff',
                            width: '120px'
                        }}
                    />
                    <span style={{ color: '#999' }}>→</span>
                    <input
                        type="text"
                        placeholder="End date"
                        style={{
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            color: '#999',
                            background: '#fff',
                            width: '120px'
                        }}
                    />

                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#7c3aed',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}>
                            Clear Filters
                        </button>
                        <div style={{ position: 'relative', width: '220px' }}>
                            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem 0.75rem 0.5rem 2.25rem',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '0.875rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid #e5e5e5', marginBottom: '1.5rem' }}>
                    {['All', 'Dynamic', 'Static', 'Favourite'].map(tab => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '0.75rem 0',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: activeTab === tab ? '#7c3aed' : '#999',
                                borderBottom: activeTab === tab ? '3px solid #7c3aed' : 'none',
                                marginBottom: '-2px',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                {/* QR Codes List */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#666', fontWeight: '500' }}>
                        Loading QR Codes...
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#ef4444' }}>
                        <div style={{ marginBottom: '1rem' }}>⚠️ Error: {error}</div>
                        <button
                            onClick={fetchQRs}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#fff',
                                border: '1px solid #ef4444',
                                color: '#ef4444',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            Retry
                        </button>
                    </div>
                ) : qrs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#999' }}>No QR codes yet.</div>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {qrs.map((qr, index) => {
                                const isMenuOpen = activeMenuId === qr._id;
                                const expiryDate = new Date(qr.createdAt);
                                expiryDate.setFullYear(expiryDate.getFullYear() + 1);

                                return (
                                    <div
                                        key={qr._id}
                                        style={{
                                            position: 'relative',
                                            background: '#ffffff',
                                            border: '1px solid #e5e5e5',
                                            borderRadius: '8px',
                                            padding: '1.25rem 1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '2rem'
                                        }}
                                    >
                                        {/* FREE TRIAL Badge */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '0',
                                            background: '#fbbf24',
                                            color: '#000',
                                            fontSize: '0.65rem',
                                            fontWeight: '800',
                                            padding: '3px 10px',
                                            borderTopLeftRadius: '8px',
                                            borderBottomLeftRadius: '8px',
                                            letterSpacing: '0.5px'
                                        }}>
                                            FREE TRIAL
                                        </div>

                                        {/* QR Code + Info */}
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', minWidth: '280px' }}>
                                            <div style={{
                                                width: '70px',
                                                height: '70px',
                                                background: '#fff',
                                                padding: '6px',
                                                border: '1px solid #e5e5e5',
                                                borderRadius: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {qr.qrImageUrl ? (
                                                    <img
                                                        src={`${qr.qrImageUrl}?t=${lastUpdated}`}
                                                        alt="QR Code"
                                                        style={{
                                                            width: '58px',
                                                            height: '58px',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                ) : (
                                                    <QRRenderer
                                                        value={`http://localhost:3000/${qr.shortId}`}
                                                        design={qr.design || {}}
                                                        size={58}
                                                         id={`qr-${qr._id}`}  // Add this I
                                                        margin={5}
                                                    />
                                                )}
                                            </div>

                                            <div>
                                                <div style={{ color: '#7c3aed', fontWeight: '600', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                                                    {qr.type === 'app-store' ? 'App Store' : qr.type.charAt(0).toUpperCase() + qr.type.slice(1)}
                                                </div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#000', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                    {renamingId === qr._id ? (
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <input
                                                                value={tempName}
                                                                onChange={(e) => setTempName(e.target.value)}
                                                                autoFocus
                                                                style={{
                                                                    fontSize: '1.1rem',
                                                                    fontWeight: '700',
                                                                    color: '#000',
                                                                    border: 'none',
                                                                    borderBottom: '2px solid #7c3aed',
                                                                    background: 'transparent',
                                                                    outline: 'none',
                                                                    width: '150px',
                                                                    padding: '0 0 2px 0'
                                                                }}
                                                            />
                                                            <button
                                                                onClick={handleCancelRename}
                                                                style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '50%', cursor: 'pointer', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                                                            >
                                                                <X size={12} color="#ef4444" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleSaveRename(qr._id)}
                                                                style={{ background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '50%', cursor: 'pointer', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                                                            >
                                                                <Check size={12} color="#16a34a" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {qr.name || 'Untitled QR'}
                                                            <Edit
                                                                size={12}
                                                                color="#999"
                                                                style={{ cursor: 'pointer', opacity: 0.6 }}
                                                                onMouseOver={(e) => e.target.style.opacity = 1}
                                                                onMouseOut={(e) => e.target.style.opacity = 0.6}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleStartRename(qr);
                                                                }}
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#999', fontSize: '0.75rem' }}>
                                                    <Calendar size={12} />
                                                    <span>Expires At: {expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* URLs Section */}
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid #f0f0f0' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Link size={14} color="#999" />
                                                <a
                                                    href={qr.data || `http://localhost:3000/${qr.shortId}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{ color: '#000', fontSize: '0.875rem', textDecoration: 'none', fontWeight: '500' }}
                                                >
                                                    {qr.data || `http://localhost:3000/${qr.shortId}`}
                                                </a>
                                                {copiedId === qr._id ? (
                                                    <Check size={12} color="#16a34a" />
                                                ) : (
                                                    <Copy
                                                        size={12}
                                                        color="#7c3aed"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleCopyUrl(qr)}
                                                    />
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Globe size={14} color="#999" />
                                                <span style={{ color: '#999', fontSize: '0.875rem' }}>
                                                    {qr.shortId}
                                                </span>
                                                <Edit
                                                    size={12}
                                                    color="#7c3aed"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleEditUrlClick(qr)}
                                                />
                                            </div>
                                        </div>

                                        {/* Scans + Actions */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                minWidth: '60px'
                                            }}>
                                                <div style={{
                                                    fontSize: '1.75rem',
                                                    fontWeight: '700',
                                                    color: '#000',
                                                    lineHeight: 1
                                                }}>
                                                    {qr.scanCount || 0}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.75rem',
                                                    color: '#999',
                                                    fontWeight: '500',
                                                    marginTop: '2px'
                                                }}>
                                                    Scans
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDownloadClick(qr)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    background: '#fff',
                                                    border: '2px solid #7c3aed',
                                                    color: '#7c3aed',
                                                    borderRadius: '20px',
                                                    padding: '0.5rem 1rem',
                                                    fontWeight: '700',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer',
                                                    letterSpacing: '0.3px'
                                                }}
                                            >
                                                DOWNLOAD <Download size={14} />
                                            </button>

                                            <div className="qr-menu-container" style={{ position: 'relative' }}>
                                                {deleteConfirmationId === qr._id && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: 'calc(100% + 15px)',
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
                                                                minWidth: '20px',
                                                                height: '20px',
                                                                background: '#fbbf24',
                                                                borderRadius: '50%',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                marginTop: '2px'
                                                            }}>
                                                                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>!</span>
                                                            </div>
                                                            <div>
                                                                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '700', color: '#000' }}>Delete the QR Code</h4>
                                                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>
                                                                    Are you sure to delete this QR Code?
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                            <button
                                                                onClick={() => setDeleteConfirmationId(null)}
                                                                disabled={isDeleting}
                                                                style={{
                                                                    padding: '0.4rem 1rem',
                                                                    borderRadius: '6px',
                                                                    border: '1px solid #e5e5e5',
                                                                    background: '#fff',
                                                                    color: '#666',
                                                                    fontSize: '0.85rem',
                                                                    cursor: 'pointer',
                                                                    fontWeight: '500'
                                                                }}>
                                                                No
                                                            </button>
                                                            <button
                                                                onClick={confirmDelete}
                                                                disabled={isDeleting}
                                                                style={{
                                                                    padding: '0.4rem 1rem',
                                                                    borderRadius: '6px',
                                                                    border: 'none',
                                                                    background: '#7c3aed',
                                                                    color: '#fff',
                                                                    fontSize: '0.85rem',
                                                                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                                                                    fontWeight: '500',
                                                                    minWidth: '60px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    opacity: isDeleting ? 0.8 : 1
                                                                }}>
                                                                {isDeleting ? (
                                                                    <div style={{
                                                                        width: '14px',
                                                                        height: '14px',
                                                                        border: '2px solid rgba(255,255,255,0.3)',
                                                                        borderTopColor: '#fff',
                                                                        borderRadius: '50%',
                                                                        animation: 'spin 1s linear infinite'
                                                                    }}></div>
                                                                ) : 'Yes'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={(e) => toggleMenu(e, qr._id)}
                                                    style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        borderRadius: '50%',
                                                        border: '1px solid #e5e5e5',
                                                        background: '#fff',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer',
                                                        color: '#666'
                                                    }}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                {isMenuOpen && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '40px',
                                                        right: '0',
                                                        width: '180px',
                                                        background: '#ffffff',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                                        border: '1px solid #e5e5e5',
                                                        zIndex: 100,
                                                        overflow: 'hidden'
                                                    }}>
                                                        <div style={{ padding: '0.5rem 0' }}>
                                                            {[
                                                                { icon: Edit, label: 'Edit', color: '#666', action: () => handleEditQR(qr) },
                                                                { icon: Star, label: 'Add to favourites', color: '#666' },
                                                                { icon: Folder, label: 'Move to folder', color: '#666' },
                                                                { icon: BarChart, label: 'Statistics', color: '#666' },
                                                                { icon: Trash2, label: 'Delete', color: '#ef4444', action: () => handleDeleteClick(qr._id) }
                                                            ].map((item, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        if (item.action) item.action();
                                                                        toggleMenu(e, qr._id);
                                                                    }}
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '0.75rem',
                                                                        width: '100%',
                                                                        padding: '0.625rem 1rem',
                                                                        border: 'none',
                                                                        background: '#fff',
                                                                        cursor: 'pointer',
                                                                        color: item.color,
                                                                        fontSize: '0.875rem',
                                                                        transition: 'background 0.2s',
                                                                        textAlign: 'left',
                                                                        fontWeight: '400'
                                                                    }}
                                                                    onMouseEnter={(e) => e.target.style.background = '#f8f8f8'}
                                                                    onMouseLeave={(e) => e.target.style.background = '#fff'}
                                                                >
                                                                    <item.icon size={15} />
                                                                    {item.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                            <button style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '4px',
                                border: '1px solid #e5e5e5',
                                background: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#666'
                            }}>
                                <ChevronLeft size={16} />
                            </button>
                            <span style={{ fontSize: '0.875rem', color: '#666' }}>1 of 1</span>
                            <button style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '4px',
                                border: '1px solid #e5e5e5',
                                background: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#666'
                            }}>
                                <ChevronRight size={16} />
                            </button>
                            <div style={{ position: 'relative' }}>
                                <select style={{
                                    padding: '0.375rem 1.75rem 0.375rem 0.625rem',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '4px',
                                    fontSize: '0.875rem',
                                    color: '#666',
                                    background: '#fff',
                                    cursor: 'pointer',
                                    appearance: 'none'
                                }}>
                                    <option>20</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                                <ChevronDown size={12} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#666', pointerEvents: 'none' }} />
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Edit URL Modal */}
            {isUrlModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: '#ffffff', borderRadius: '12px', width: '500px', padding: '1.5rem',
                        position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <button
                            onClick={handleCloseUrlModal}
                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <X size={20} color="#999" />
                        </button>

                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#000', marginBottom: '1.5rem' }}>
                            Edit URL Destination
                        </h2>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#7c3aed', marginBottom: '0.5rem' }}>
                                URL*
                            </label>
                            <input
                                value={tempShortId}
                                onChange={(e) => setTempShortId(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd',
                                    fontSize: '1rem', color: '#000', outline: 'none'
                                }}
                            />
                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#7c3aed' }}>
                                Preview URL: <span style={{ color: '#999', fontWeight: 'normal' }}>{`${baseUrl}/${tempShortId}`}</span>
                            </div>
                        </div>

                        <div style={{
                            background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem'
                        }}>
                            <p style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: '1.5', margin: 0 }}>
                                <span style={{ fontWeight: 'bold' }}>Warning:</span> Updating your QR Code URL or ID will deactivate any
                                previously printed or shared QR codes. Please make sure to update and redistribute the new QR code if needed.
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={handleUpdateUrl}
                                style={{
                                    background: '#fff', border: '2px solid #7c3aed', color: '#7c3aed',
                                    padding: '0.5rem 2rem', borderRadius: '24px', fontWeight: '700', cursor: 'pointer',
                                    fontSize: '0.875rem'
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Download Modal */}
            {isDownloadModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: '#ffffff', borderRadius: '12px', width: '600px', padding: '1.5rem',
                        position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <button
                            onClick={handleCloseDownloadModal}
                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <X size={20} color="#999" />
                        </button>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000', marginBottom: '1.5rem', borderBottom: '1px solid #e5e5e5', paddingBottom: '1rem' }}>
                            Save as...
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                            {[
                                { id: 'jpeg', label: 'JPEG', icon: ImageIcon, desc: 'Standard Image File' },
                                { id: 'png', label: 'PNG', icon: ImageIcon, desc: 'Image format with transparency.' },
                                { id: 'svg', label: 'SVG', icon: PenTool, desc: 'Vector File' },
                                { id: 'pdf', label: 'PDF', icon: FileText, desc: 'Universal file format.' }
                            ].map((fmt) => (
                                <div
                                    key={fmt.id}
                                    onClick={() => setDownloadFormat(fmt.id)}
                                    style={{
                                        border: `2px solid ${downloadFormat === fmt.id ? '#7c3aed' : '#e5e5e5'}`,
                                        borderRadius: '8px',
                                        padding: '1.5rem 0.5rem',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        background: downloadFormat === fmt.id ? '#faf5ff' : '#fff'
                                    }}
                                >
                                    <div style={{ color: '#7c3aed', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                                        <fmt.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <div style={{ color: '#7c3aed', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                        {fmt.label}
                                    </div>
                                    <div style={{ borderTop: '1px solid #e5e5e5', margin: '0.5rem auto', width: '20px' }} />
                                    <div style={{ fontSize: '0.7rem', color: '#999' }}>
                                        {fmt.desc}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {downloadFormat && (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    onClick={handleRunDownload}
                                    style={{
                                        background: '#7c3aed',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '0.75rem 2rem',
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 4px 6px -1px rgba(124, 58, 237, 0.5)'
                                    }}
                                >
                                    DOWNLOAD QR
                                    <Download size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Toaster position="top-center" />
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
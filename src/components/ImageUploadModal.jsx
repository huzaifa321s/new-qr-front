import React, { useState, useCallback } from 'react';
import { X, Minus, Plus, RefreshCw, Check, Loader2, Image as ImageIcon, ZoomIn, RotateCw } from 'lucide-react';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/canvasUtils';
import { motion, AnimatePresence } from 'framer-motion';

const ImageUploadModal = ({ isOpen, onClose, onSave, tempImage, fileName, type = 'logo', aspect = 1 }) => {
    const [uploading, setUploading] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        try {
            setUploading(true);
            const croppedImageBlob = await getCroppedImg(
                tempImage,
                croppedAreaPixels,
                rotation
            );

            const formData = new FormData();
            const name = (fileName || 'image').replace(/\.[^/.]+$/, "") + ".jpg";
            formData.append('image', croppedImageBlob, name);
            
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/';
            const res = await axios.post(`${baseUrl}api/upload/${type}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            onSave(res.data.url);
            onClose();
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!uploading ? onClose : undefined}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            background: 'rgba(0, 0, 0, 0.75)',
                            backdropFilter: 'blur(4px)'
                        }}
                    />

                    {/* Modal Container Wrapper for positioning */}
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 10000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                    }}>
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            style={{
                                pointerEvents: 'auto',
                                background: '#1e293b',
                                borderRadius: '24px',
                                width: '600px',
                                maxWidth: '95%',
                                maxHeight: '90vh',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                border: '1px solid #334155',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            {/* Header */}
                            <div style={{
                                padding: '1.25rem 1.5rem',
                                borderBottom: '1px solid #334155',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: '#0f172a'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '8px',
                                        background: 'rgba(255, 163, 5, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <ImageIcon size={18} color="#ffa305" />
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' }}>
                                        {uploading ? 'Uploading Image...' : 'Edit Image'}
                                    </h3>
                                </div>
                                <button
                                    onClick={onClose}
                                    disabled={uploading}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: uploading ? 'not-allowed' : 'pointer',
                                        color: '#64748b',
                                        padding: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => { if(!uploading) { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; } }}
                                    onMouseLeave={(e) => { if(!uploading) { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent'; } }}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Crop Area */}
                            <div style={{
                                position: 'relative',
                                height: '400px',
                                background: '#020617',
                                borderBottom: '1px solid #334155'
                            }}>
                                <Cropper
                                    image={tempImage}
                                    crop={crop}
                                    zoom={zoom}
                                    rotation={rotation}
                                    aspect={aspect}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                    onRotationChange={setRotation}
                                />
                            </div>

                            {/* Controls */}
                            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#1e293b' }}>
                                
                                {/* Sliders Container */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {/* Zoom Control */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '85px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>
                                            <ZoomIn size={16} color="#ffa305" />
                                            <span>Zoom</span>
                                        </div>
                                        <Minus size={16} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => setZoom(Math.max(1, zoom - 0.1))} />
                                        <input
                                            type="range"
                                            value={zoom}
                                            min={1}
                                            max={3}
                                            step={0.1}
                                            onChange={(e) => setZoom(Number(e.target.value))}
                                            style={{
                                                flex: 1,
                                                accentColor: '#ffa305',
                                                height: '4px',
                                                background: '#334155',
                                                borderRadius: '2px',
                                                outline: 'none',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <Plus size={16} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => setZoom(Math.min(3, zoom + 0.1))} />
                                        <span style={{ minWidth: '36px', textAlign: 'right', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>{Math.round(zoom * 100)}%</span>
                                    </div>

                                    {/* Rotation Control */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '85px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>
                                            <RotateCw size={16} color="#ffa305" />
                                            <span>Rotate</span>
                                        </div>
                                        <RefreshCw size={16} color="#64748b" style={{ cursor: 'pointer', transform: 'scaleX(-1)' }} onClick={() => setRotation(rotation - 90)} />
                                        <input
                                            type="range"
                                            value={rotation}
                                            min={0}
                                            max={360}
                                            step={1}
                                            onChange={(e) => setRotation(Number(e.target.value))}
                                            style={{
                                                flex: 1,
                                                accentColor: '#ffa305',
                                                height: '4px',
                                                background: '#334155',
                                                borderRadius: '2px',
                                                outline: 'none',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <RefreshCw size={16} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => setRotation(rotation + 90)} />
                                        <span style={{ minWidth: '36px', textAlign: 'right', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>{rotation}°</span>
                                    </div>
                                </div>

                                {/* Footer Buttons */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #334155' }}>
                                    <button
                                        onClick={onClose}
                                        disabled={uploading}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            borderRadius: '12px',
                                            border: '1px solid #334155',
                                            background: 'transparent',
                                            color: '#94a3b8',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => { if(!uploading) { e.currentTarget.style.borderColor = '#64748b'; e.currentTarget.style.color = '#f8fafc'; } }}
                                        onMouseLeave={(e) => { if(!uploading) { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#94a3b8'; } }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={uploading}
                                        style={{
                                            padding: '0.75rem 2rem',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: '#ffa305',
                                            color: '#000000',
                                            fontWeight: '700',
                                            cursor: uploading ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.9rem',
                                            boxShadow: '0 4px 6px -1px rgba(255, 163, 5, 0.3)',
                                            transition: 'all 0.2s',
                                            opacity: uploading ? 0.7 : 1
                                        }}
                                        onMouseEnter={(e) => { if(!uploading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                        onMouseLeave={(e) => { if(!uploading) e.currentTarget.style.transform = 'translateY(0)'; }}
                                    >
                                        {uploading ? (
                                            <>
                                                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Check size={18} strokeWidth={3} />
                                                <span>Save Image</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <style>{`
                        @keyframes spin {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </>
            )}
        </AnimatePresence>
    );
};

export default ImageUploadModal;
import React, { useState, useCallback, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Trash2, RotateCw, ZoomIn, ZoomOut, Minus, Plus, RefreshCw } from 'lucide-react';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/canvasUtils';

const FileUploader = ({ label, type = 'logo', onUpload, currentFile }) => {
    const [uploading, setUploading] = useState(false);

    // Modal & Editing State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempImage, setTempImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [fileName, setFileName] = useState('');

    // Update filename if currentFile changes (e.g. from parent)
    useEffect(() => {
        if (currentFile && !fileName) {
            // Try to extract filename from URL or default
            const extractedName = currentFile.split('/').pop();
            setFileName(extractedName || 'Uploaded Image');
        } else if (!currentFile) {
            setFileName('');
        }
    }, [currentFile]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = () => {
            setTempImage(reader.result);
            setIsModalOpen(true);
            setZoom(1);
            setRotation(0);
        };
        reader.readAsDataURL(file);
        // Reset file input
        e.target.value = null;
    };

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
            // Use original filename but with .jpg extension as canvas exports jpeg
            const name = (fileName || 'image').replace(/\.[^/.]+$/, "") + ".jpg";
            formData.append(type, croppedImageBlob, name);

            const res = await axios.post(`http://localhost:3000/api/upload/${type}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            onUpload(res.data.url);
            setIsModalOpen(false);
            setTempImage(null);
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTempImage(null);
        if (!currentFile) setFileName(''); // Reset filename if we cancelled a new upload and no previous file existed
    };

    const handleRemove = () => {
        onUpload('');
        setFileName('');
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#64748b', marginBottom: '0.5rem' }}>
                {label}
            </label>

            {/* Upload Area */}
            <label style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                border: '2px dashed #cbd5e1',
                borderRadius: '12px',
                cursor: 'pointer',
                background: '#f8fafc',
                transition: 'all 0.2s',
                marginBottom: currentFile ? '1rem' : '0'
            }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    disabled={uploading}
                />
                {uploading ? (
                    <>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid #e2e8f0',
                            borderTop: '3px solid #6366f1',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <span style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>Uploading...</span>
                    </>
                ) : (
                    <>
                        <Upload size={32} color="#94a3b8" />
                        <span style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
                            Click to upload or drag and drop
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                            PNG, JPG, SVG up to 5MB
                        </span>
                    </>
                )}
            </label>

            {/* File List Item (if file exists) */}
            {currentFile && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    background: '#fff'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            border: '1px solid #e2e8f0',
                            background: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img src={currentFile} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontSize: '0.875rem', color: '#334155', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {fileName || 'Uploaded Image'}
                        </span>
                    </div>
                    <button
                        onClick={handleRemove}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#94a3b8',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )}

            {/* Edit Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9999,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '12px',
                        width: '600px',
                        maxWidth: '95%',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        {/* Header */}
                        <div style={{
                            padding: '1rem 1.5rem',
                            borderBottom: '1px solid #e2e8f0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Edit image</h3>
                            <button onClick={handleCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Crop Area */}
                        <div style={{ position: 'relative', height: '400px', background: '#333' }}>
                            <Cropper
                                image={tempImage}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                onRotationChange={setRotation}
                            />
                        </div>

                        {/* Controls */}
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Zoom Control */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Minus size={20} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => setZoom(Math.max(1, zoom - 0.1))} />
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    style={{
                                        flex: 1,
                                        accentColor: '#8b5cf6',
                                        height: '4px',
                                        background: '#e2e8f0',
                                        borderRadius: '2px',
                                        appearance: 'none'
                                    }}
                                />
                                <Plus size={20} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => setZoom(Math.min(3, zoom + 0.1))} />
                            </div>

                            {/* Rotation Control */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <RefreshCw size={20} color="#64748b" style={{ cursor: 'pointer', transform: 'scaleX(-1)' }} onClick={() => setRotation(rotation - 90)} />
                                <input
                                    type="range"
                                    value={rotation}
                                    min={0}
                                    max={360}
                                    step={1}
                                    aria-labelledby="Rotation"
                                    onChange={(e) => setRotation(Number(e.target.value))}
                                    style={{
                                        flex: 1,
                                        accentColor: '#8b5cf6',
                                        height: '4px',
                                        background: '#e2e8f0',
                                        borderRadius: '2px',
                                        appearance: 'none'
                                    }}
                                />
                                <RefreshCw size={20} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => setRotation(rotation + 90)} />
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button
                                    onClick={handleCancel}
                                    style={{
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: '6px',
                                        border: '1px solid #e2e8f0',
                                        background: '#fff',
                                        color: '#64748b',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    style={{
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: '#8b5cf6',
                                        color: '#fff',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploader;

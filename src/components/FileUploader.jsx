import React, { useState, useEffect } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import ImageUploadModal from './ImageUploadModal';

const FileUploader = ({ label, type = 'logo', onUpload, currentFile }) => {
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempImage, setTempImage] = useState(null);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (currentFile && !fileName) {
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
        };
        reader.readAsDataURL(file);
        e.target.value = null;
    };

    const handleRemove = () => {
        onUpload('');
        setFileName('');
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {label}
            </label>

            <label style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                border: '2px dashed #334155',
                borderRadius: '12px',
                cursor: 'pointer',
                background: '#020617',
                transition: 'all 0.2s',
                marginBottom: currentFile ? '1rem' : '0'
            }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <Upload size={32} color="#94a3b8" />
                <span style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#94a3b8', fontWeight: '500' }}>
                    Click to upload or drag and drop
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                    PNG, JPG, SVG up to 5MB
                </span>
            </label>

            {currentFile && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    background: '#0f172a'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            border: '1px solid #334155',
                            background: '#020617',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img src={currentFile} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontSize: '0.875rem', color: '#e5e7eb', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {fileName || 'Uploaded Image'}
                        </span>
                    </div>
                    <button
                        onClick={handleRemove}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )}

            <ImageUploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={onUpload}
                tempImage={tempImage}
                fileName={fileName}
                type={type}
            />
        </div>
    );
};

export default FileUploader;

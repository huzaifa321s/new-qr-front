import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import axios from 'axios';

const QRRenderer = forwardRef(({ value, design, size = 280, margin = 20, id }, ref) => {
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        download: (format = 'png', name = 'qr-code') => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const link = document.createElement('a');
            link.download = `${name}.${format}`;
            link.href = canvas.toDataURL(`image/${format}`);
            link.click();
        },
        getDataURL: (format = 'png') => {
            const canvas = canvasRef.current;
            if (!canvas) return null;
            return canvas.toDataURL(`image/${format}`);
        }
    }));

    useEffect(() => {
        let active = true;
        
        const fetchAndRenderQR = async () => {
            const canvas = canvasRef.current;
            if (!canvas || !value) return;
            
            const ctx = canvas.getContext('2d');
            
            // Only set loading if it takes a bit of time, to avoid flashing
            const loadingTimeout = setTimeout(() => {
                if (active) setLoading(true);
            }, 200);

            try {
                const response = await axios.post('/api/qr/preview', {
                    content: value,
                    design: design
                }, {
                    skipGlobalLoader: true // Skip global loader for preview updates to avoid flickering
                });

                clearTimeout(loadingTimeout);

                if (active && response.data.success && response.data.image) {
                    const img = new Image();
                    img.onload = () => {
                        if (!active) return;
                        canvas.width = size;
                        canvas.height = size;
                        ctx.clearRect(0, 0, size, size);
                        // Draw image to fit canvas
                        ctx.drawImage(img, 0, 0, size, size);
                        setLoading(false);
                    };
                    img.src = response.data.image;
                }
            } catch (error) {
                clearTimeout(loadingTimeout);
                console.error('Error fetching QR preview:', error);
                if (active) setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchAndRenderQR();
        }, 300); // 300ms debounce

        return () => {
            active = false;
            clearTimeout(timeoutId);
        };
    }, [value, design, size]);

    return (
        <div style={{ position: 'relative', width: 'fit-content', margin: '0 auto' }}>
            <canvas id={id} ref={canvasRef} style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '8px',
                    color: '#666',
                    fontSize: '14px',
                    fontWeight: '500'
                }}>
                    Generating...
                </div>
            )}
        </div>
    );
});

export default QRRenderer;

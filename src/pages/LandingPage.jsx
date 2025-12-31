import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import MobilePreview from '../components/MobilePreview';

const LandingPage = () => {
    const { shortId } = useParams();
    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(true);
    const scanTracked = React.useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch QR Data
                const res = await axios.get(`/api/qr/${shortId}`);
                const data = res.data;
                setQrData(data);

                // Track Scan if not redirected (no ?scanned=true) and not already tracked
                const searchParams = new URLSearchParams(location.search);
                if (!searchParams.get('scanned') && !scanTracked.current) {
                    scanTracked.current = true;
                    await axios.post(`/api/qr/scan/${shortId}`);
                }

                // Handle direct redirection for dynamic-url type (for legacy QRs)
                if (data.type === 'dynamic-url' && data.dynamicUrl) {
                    let target = data.dynamicUrl;
                    if (!target.startsWith('http')) {
                        target = `https://${target}`;
                    }
                    window.location.href = target;
                    return;
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [shortId]);

    if (loading) return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f8fafc',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div className="loader-container" style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    border: '4px solid #e2e8f0',
                    borderRadius: '50%'
                }}></div>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    border: '4px solid #8b5cf6',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
            </div>
         <h2 style={{ color: '#1e293b', fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>Loading...</h2>
            <p style={{ color: '#64748b', fontSize: '0.975rem' }}>Preparing your experience</p>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );

    if (!qrData) return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f8fafc',
            fontFamily: "'Inter', sans-serif",
            textAlign: 'center',
            padding: '2rem'
        }}>
            <div style={{ color: '#ef4444', marginBottom: '1rem' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <h2 style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>QR Code Not Found</h2>
            <p style={{ color: '#64748b' }}>The link you followed may be broken or the QR code has been deleted.</p>
        </div>
    );

    // If it's a dynamic-url, we keep showing the loader while redirecting
    if (qrData.type === 'dynamic-url' && qrData.dynamicUrl) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#f8fafc',
                fontFamily: "'Inter', sans-serif"
            }}>
                <div className="loader-container" style={{
                    position: 'relative',
                    width: '60px',
                    height: '60px',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '3px solid #e2e8f0',
                        borderRadius: '50%'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '3px solid #8b5cf6',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 1.2s linear infinite'
                    }}></div>
                </div>
                <h2 style={{ color: '#1e293b', fontSize: '1.125rem', fontWeight: '600' }}>Redirecting you...</h2>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.5rem' }}>Please wait a moment</p>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f1f5f9',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ width: '100%', height: '100vh', background: '#fff', overflow: 'hidden' }}>
                <MobilePreview config={qrData} isLiveView={true} />
            </div>
        </div>
    );
};

export default LandingPage;


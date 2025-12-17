import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import MobilePreview from '../components/MobilePreview';

const LandingPage = () => {
    const { shortId } = useParams();
    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch QR Data
                const res = await axios.get(`http://localhost:3000/api/qr/${shortId}`);
                setQrData(res.data);

                // Track Scan if not redirected (no ?scanned=true)
                const searchParams = new URLSearchParams(location.search);
                if (!searchParams.get('scanned')) {
                    await axios.post(`http://localhost:3000/api/qr/scan/${shortId}`);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [shortId, location.search]);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
    if (!qrData) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>QR Code Not Found</div>;

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f1f5f9',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* 
                We reuse MobilePreview directly. 
                Users viewing on mobile will see the preview content.
                If MobilePreview has a fixed width/border, it's acceptable as "Mobile Preview" on desktop.
                On actual mobile, it might look like a phone-in-phone, which implies we might need to update MobilePreview later to be responsive,
                but for now, consistency ("whi mobile preview") is the priority.
            */}
            <div style={{ width: '100%', height: '100vh', background: '#fff', overflow: 'hidden' }}>
                <MobilePreview config={qrData} isLiveView={true} />
            </div>
        </div>
    );
};

export default LandingPage;

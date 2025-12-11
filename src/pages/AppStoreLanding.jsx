import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MobilePreview from '../components/MobilePreview';

const AppStoreLanding = () => {
    const { shortId } = useParams();
    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/qr/${shortId}`);
                setQrData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [shortId]);

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
            <div style={{ width: '100%', maxWidth: '480px', height: '100vh', background: '#fff', overflowY: 'auto' }}>
                <MobilePreview config={qrData} />
            </div>
        </div>
    );
};

export default AppStoreLanding;

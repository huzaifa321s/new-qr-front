import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, QrCode, Shield, Activity, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminStats = () => {
    const [stats, setStats] = useState({
        totalQRs: 0,
        totalScans: 0,
        totalUsers: 0,
        recentQRs: []
    });
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10; // Items per page for the table

    const fetchStats = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/';
            
            // Fetch System Stats & Recent QRs in parallel
            // Note: We only need to fetch general stats once, but for simplicity we can fetch together or separate.
            // Let's separate list fetching to support pagination without re-fetching counts every time.
            
            // 1. Fetch Counts (only on mount or refresh)
            const statsRes = await axios.get(`${apiUrl}api/admin/stats`);
            
            // 2. Fetch QRs for current page
            const qrsRes = await axios.get(`${apiUrl}api/qr/list`, {
                params: {
                    page: currentPage,
                    limit: limit,
                    sort: 'Last Created' // Ensure consistent sorting
                }
            });

            setStats({
                totalQRs: statsRes.data.qrs,
                totalScans: statsRes.data.scans,
                totalUsers: statsRes.data.users,
                recentQRs: qrsRes.data.qrs
            });
            
            if (qrsRes.data.pagination) {
                setTotalPages(qrsRes.data.pagination.totalPages);
            }

        } catch (err) {
            console.error('Error fetching admin stats', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchStats();
    }, [currentPage]); // Re-fetch when page changes

    const statCards = [
        { title: 'Total QR Codes', value: stats.totalQRs, icon: QrCode, color: '#ffa305' },
        { title: 'Total Scans', value: stats.totalScans, icon: Activity, color: '#10b981' },
        { title: 'Admin Access', value: 'Granted', icon: Shield, color: '#3b82f6' },
        { title: 'Total Users', value: stats.totalUsers, icon: Users, color: '#f472b6' }
    ];

    if (loading) return <div style={{ padding: '2rem', color: '#fff' }}>Loading stats...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Inter", sans-serif' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', color: '#fff' }}>Admin Dashboard</h1>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>System overview and analytics</p>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            background: '#1e293b',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            border: '1px solid #334155'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ padding: '10px', background: `${stat.color}20`, borderRadius: '12px' }}>
                                <stat.icon size={24} color={stat.color} />
                            </div>
                        </div>
                        <h3 style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', marginBottom: '0.25rem' }}>{stat.value}</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{stat.title}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity */}
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '1.5rem' }}>Recent QR Codes</h2>
            <div style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1' }}>
                    <thead style={{ background: '#0f172a', borderBottom: '1px solid #334155' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase' }}>Name</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase' }}>Type</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase' }}>Created By</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase' }}>Scans</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase' }}>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.recentQRs.map((qr) => (
                            <tr key={qr._id} style={{ borderBottom: '1px solid #334155' }}>
                                <td style={{ padding: '1rem', fontWeight: '500', color: '#fff' }}>{qr.name || 'Untitled'}</td>
                                <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{qr.type}</td>
                                <td style={{ padding: '1rem', color: '#ffa305' }}>{qr.user?.name || qr.user?.email || 'Unknown'}</td>
                                <td style={{ padding: '1rem' }}>{qr.scanCount}</td>
                                <td style={{ padding: '1rem' }}>{new Date(qr.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', alignItems: 'center' }}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    style={{
                        padding: '0.75rem', borderRadius: '12px', background: '#1e293b', border: '1px solid #334155',
                        color: currentPage === 1 ? '#475569' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    <ChevronLeft size={20} />
                </button>
                <span style={{ fontWeight: '600', color: '#94a3b8' }}>Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    style={{
                        padding: '0.75rem', borderRadius: '12px', background: '#1e293b', border: '1px solid #334155',
                        color: currentPage === totalPages ? '#475569' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default AdminStats;

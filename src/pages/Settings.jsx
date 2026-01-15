import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Save, Settings as SettingsIcon, Shield, Mail, Type, Activity, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
    const [settings, setSettings] = useState({
        allowRegistration: true,
        maintenanceMode: false,
        defaultScanLimit: 0,
        supportEmail: '',
        appName: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/';
                const res = await axios.get(`${apiUrl}api/admin/settings`);
                setSettings(res.data);
            } catch (err) {
                console.error('Error fetching settings', err);
                toast.error('Failed to load settings');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/';
            await axios.put(`${apiUrl}api/admin/settings`, settings);
            toast.success('Settings updated successfully');
        } catch (err) {
            console.error('Error updating settings', err);
            toast.error('Failed to update settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem', color: '#fff' }}>Loading settings...</div>;

    const Section = ({ title, icon: Icon, children }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: '#1e293b',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid #334155',
                marginBottom: '1.5rem'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
                <Icon color="#ffa305" size={24} />
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', margin: 0 }}>{title}</h2>
            </div>
            {children}
        </motion.div>
    );

    const Toggle = ({ label, name, checked, onChange, description }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
                <label style={{ display: 'block', color: '#fff', fontWeight: '600', marginBottom: '0.25rem' }}>{label}</label>
                {description && <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>{description}</p>}
            </div>
            <div 
                onClick={() => onChange({ target: { name, type: 'checkbox', checked: !checked } })}
                style={{ cursor: 'pointer', color: checked ? '#10b981' : '#64748b' }}
            >
                {checked ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
            </div>
        </div>
    );

    const Input = ({ label, name, value, onChange, type = 'text', icon: Icon }) => (
        <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '500' }}>{label}</label>
            <div style={{ position: 'relative' }}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                        background: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
                {Icon && <Icon size={18} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />}
            </div>
        </div>
    );

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: '"Inter", sans-serif', paddingBottom: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '12px', background: 'rgba(255, 163, 5, 0.1)', borderRadius: '12px' }}>
                    <SettingsIcon size={32} color="#ffa305" />
                </div>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', margin: 0 }}>System Settings</h1>
                    <p style={{ color: '#94a3b8', marginTop: '0.25rem' }}>Configure global application settings</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Section title="General Configuration" icon={Type}>
                    <Input 
                        label="Application Name" 
                        name="appName" 
                        value={settings.appName} 
                        onChange={handleChange} 
                        icon={Type}
                    />
                    <Input 
                        label="Support Email" 
                        name="supportEmail" 
                        value={settings.supportEmail} 
                        onChange={handleChange} 
                        type="email"
                        icon={Mail}
                    />
                </Section>

                <Section title="System Controls" icon={Shield}>
                    <Toggle 
                        label="Allow User Registration" 
                        name="allowRegistration" 
                        checked={settings.allowRegistration} 
                        onChange={handleChange}
                        description="If disabled, new users cannot sign up."
                    />
                    <Toggle 
                        label="Maintenance Mode" 
                        name="maintenanceMode" 
                        checked={settings.maintenanceMode} 
                        onChange={handleChange}
                        description="If enabled, only admins can access the system."
                    />
                </Section>

                <Section title="Limits & Defaults" icon={Activity}>
                    <Input 
                        label="Default Scan Limit (0 = Unlimited)" 
                        name="defaultScanLimit" 
                        value={settings.defaultScanLimit} 
                        onChange={handleChange} 
                        type="number"
                        icon={Activity}
                    />
                </Section>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={saving}
                    style={{
                        background: '#ffa305',
                        color: '#000',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: '700',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        opacity: saving ? 0.7 : 1
                    }}
                >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save Changes'}
                </motion.button>
            </form>
        </div>
    );
};

export default Settings;

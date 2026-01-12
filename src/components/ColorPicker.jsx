import React from 'react';
import { SketchPicker } from 'react-color';

const PRESETS = ['#000000', '#4F46E5', '#DC2626', '#16A34A', '#D97706', '#9333EA'];

const ColorPicker = ({ label, color, onChange }) => {
    const [showPicker, setShowPicker] = React.useState(false);

    return (
        <div style={{ marginBottom: '1rem', position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#94a3b8', marginBottom: '0.5rem' }}>
                {label}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div
                    onClick={() => setShowPicker(!showPicker)}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: color,
                        border: '2px solid #475569',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                        flexShrink: 0
                    }}
                />
                <input
                    type="text"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        padding: '0.5rem',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        width: '100px',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace',
                        background: '#0f172a',
                        color: '#f8fafc'
                    }}
                />
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {PRESETS.map(preset => (
                        <div
                            key={preset}
                            onClick={() => onChange(preset)}
                            style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '8px',
                                background: preset,
                                cursor: 'pointer',
                                border: color === preset ? '2px solid #f8fafc' : '1px solid #334155'
                            }}
                        />
                    ))}
                </div>
            </div>
            {showPicker && (
                <div style={{ position: 'absolute', zIndex: 10, marginTop: '0.5rem' }}>
                    <div
                        style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}
                        onClick={() => setShowPicker(false)}
                    />
                    <SketchPicker color={color} onChange={(c) => onChange(c.hex)} />
                </div>
            )}
        </div>
    );
};

export default ColorPicker;

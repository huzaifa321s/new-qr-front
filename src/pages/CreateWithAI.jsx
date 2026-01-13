import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Loader2, Zap, MessageCircle, Send, X } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import MobilePreview from '../components/MobilePreview';

const PREDEFINED_PROMPTS = [
    {
        id: 1,
        title: "Sushi Restaurant Menu",
        prompt: "Create a Japanese sushi restaurant menu with elegant black and red theme. Include appetizers, sushi rolls, and drinks. Use minimalist design.",
        type: "menu"
    },
    {
        id: 2,
        title: "Customer Rating Form",
        prompt: "Generate a customer satisfaction rating form for a car rental service. Use blue and orange colors. Include star ratings and comment section.",
        type: "rating"
    },
    {
        id: 3,
        title: "Hotel Review Collection",
        prompt: "Design a review collection page for a luxury hotel. Use royal purple and gold colors. Include categories for room, service, and amenities.",
        type: "reviews"
    },
    {
        id: 4,
        title: "Music Festival Event",
        prompt: "Create an event page for a summer music festival. Use vibrant pink and yellow colors. Include lineup, venue map, and ticket purchase button.",
        type: "event"
    },
    {
        id: 5,
        title: "Black Friday Coupon",
        prompt: "Generate a Black Friday discount coupon for electronics store. Use black and red theme. Offer 70% off with expiry date.",
        type: "coupon"
    },
    {
        id: 6,
        title: "Real Estate Agent Card",
        prompt: "Design a business card for a luxury real estate agent. Use professional navy blue and gold. Include contact details and property listings link.",
        type: "business-card"
    },
    {
        id: 7,
        title: "Coffee Shop Business Page",
        prompt: "Create a business page for an artisan coffee shop. Use warm brown and cream colors. Include opening hours, location, and WiFi availability.",
        type: "business-page"
    },
    {
        id: 8,
        title: "Organic Juice Product",
        prompt: "Generate a product showcase for organic cold-pressed juice. Use fresh green and orange colors. Include ingredients, benefits, and buy now button.",
        type: "product-page"
    }
];

const CreateWithAI = () => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedConfig, setGeneratedConfig] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const detectQRType = (promptText) => {
        const lowerPrompt = promptText.toLowerCase();

        // Type detection based on keywords
        if (lowerPrompt.includes('review') || lowerPrompt.includes('feedback') || lowerPrompt.includes('rating') || lowerPrompt.includes('star') || lowerPrompt.includes('satisfaction')) {
            if (lowerPrompt.includes('rating') || lowerPrompt.includes('star') || (lowerPrompt.includes('feedback') && !lowerPrompt.includes('review'))) {
                return 'rating';
            }
            return 'reviews';
        }
        if (lowerPrompt.includes('event') || lowerPrompt.includes('festival') || lowerPrompt.includes('conference') || lowerPrompt.includes('party') || lowerPrompt.includes('meetup')) {
            return 'event';
        }
        if (lowerPrompt.includes('coupon') || lowerPrompt.includes('discount') || lowerPrompt.includes('sale') || lowerPrompt.includes('offer') || lowerPrompt.includes('promo')) {
            return 'coupon';
        }
        if (lowerPrompt.includes('business card') || lowerPrompt.includes('contact card') || lowerPrompt.includes('vcard') || lowerPrompt.includes('professional card')) {
            return 'business-card';
        }
        if (lowerPrompt.includes('business page') || lowerPrompt.includes('company page') || lowerPrompt.includes('about us')) {
            return 'business-page';
        }
        if (lowerPrompt.includes('product') || lowerPrompt.includes('item') || lowerPrompt.includes('showcase')) {
            return 'product-page';
        }
        if (lowerPrompt.includes('bio') || lowerPrompt.includes('profile') || lowerPrompt.includes('personal page')) {
            return 'bio-page';
        }
        if (lowerPrompt.includes('menu') || lowerPrompt.includes('restaurant') || lowerPrompt.includes('cafe') || lowerPrompt.includes('food') || lowerPrompt.includes('dish')) {
            return 'menu';
        }

        // Default to menu if no match
        return 'menu';
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast.error('Please enter a prompt');
            return;
        }

        setIsGenerating(true);
        setGeneratedConfig(null);
        setShowChat(false);
        setChatMessages([]);

        try {
            // Check if there's a predefined type (from clicking a predefined prompt)
            let detectedType = window.__predefinedType || detectQRType(prompt);

            // Clear the predefined type after using it
            if (window.__predefinedType) {
                delete window.__predefinedType;
            }

            console.log('Detected Type:', detectedType, 'for prompt:', prompt);

            const response = await axios.post('/api/ai/generate', {
                prompt,
                type: detectedType // Explicitly pass detected type
            });

            if (response.data.success) {
                setGeneratedConfig(response.data.data);
                toast.success('Design generated successfully!');
            }
        } catch (error) {
            console.error('Generation failed:', error);
            toast.error('Failed to generate design. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleChatSubmit = async () => {
        if (!chatInput.trim() || !generatedConfig) return;

        const userMessage = { role: 'user', content: chatInput };
        setChatMessages(prev => [...prev, userMessage]);
        setChatInput('');
        setIsChatLoading(true);

        try {
            const conversationHistory = [
                { role: 'system', content: `Current configuration: ${JSON.stringify(generatedConfig)}. User wants to modify this. Apply their requested changes and return the updated JSON.` },
                ...chatMessages,
                userMessage
            ];

            const response = await axios.post('/api/ai/generate', {
                prompt: chatInput,
                type: generatedConfig.type,
                conversationHistory
            });

            if (response.data.success) {
                setGeneratedConfig(response.data.data);
                setChatMessages(prev => [...prev, { role: 'assistant', content: 'Updated the design based on your request!' }]);
                toast.success('Design updated!');
            }
        } catch (error) {
            console.error('Chat failed:', error);
            setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I couldn\'t process that request. Please try again.' }]);
            toast.error('Failed to update design.');
        } finally {
            setIsChatLoading(false);
        }
    };

    const handleCustomize = () => {
        if (!generatedConfig) return;

        const mockQr = {
            ...generatedConfig.pageConfig,
            design: generatedConfig.qrDesign,
            name: generatedConfig.qrName,
            _id: 'ai-temp-' + Date.now(),
            isAiGenerated: true
        };

        navigate('/generator', {
            state: {
                editingQr: mockQr,
                selectedType: generatedConfig.type
            }
        });
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex' }}>
            
            {/* Left Panel - Input */}
            <div style={{ flex: 1, padding: '3rem', maxWidth: '800px', margin: '0 auto', overflowY: 'auto' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', padding: '0.5rem', borderRadius: '12px', display: 'flex' }}>
                            <Sparkles color="white" size={24} />
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Create with AI</h1>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Describe what you want to create, and our AI will generate a complete QR code campaign for you, including design, content, and landing page.
                    </p>
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
                            Your Prompt
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A menu for a sushi restaurant with a blue theme..."
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '2px solid #e2e8f0',
                                fontSize: '1rem',
                                color: '#334155',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                resize: 'vertical'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                        />
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: isGenerating ? '#cbd5e1' : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: isGenerating ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'transform 0.1s'
                        }}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="spin" size={20} />
                                Generating Magic...
                            </>
                        ) : (
                            <>
                                <Zap size={20} fill="currentColor" />
                                Generate Design
                            </>
                        )}
                    </button>
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                        Try these examples
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                        {PREDEFINED_PROMPTS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setPrompt(item.prompt);
                                    // Store the predefined type for later use
                                    if (item.type) {
                                        window.__predefinedType = item.type;
                                    }
                                }}
                                style={{
                                    textAlign: 'left',
                                    padding: '1rem',
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>{item.title}</span>
                                <span style={{ fontSize: '0.75rem', color: '#64748b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {item.prompt}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Preview */}
            <div style={{
                width: '450px',
                background: '#e0e7ff',
                borderLeft: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                padding: '2rem'
            }}>
                {generatedConfig ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '1rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <h3 style={{ color: '#4338ca', fontWeight: '600', marginBottom: '1rem' }}>AI Preview</h3>
                        </div>

                        <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                            <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
                                <MobilePreview
                                    config={generatedConfig.pageConfig}
                                    qrDesign={generatedConfig.qrDesign}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', width: '100%', display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => setShowChat(!showChat)}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: showChat ? '#6366f1' : 'white',
                                    color: showChat ? 'white' : '#6366f1',
                                    border: '2px solid #6366f1',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <MessageCircle size={20} />
                                Chat with AI
                            </button>
                            <button
                                onClick={handleCustomize}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: '#4f46e5',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)'
                                }}
                            >
                                Save
                                <ArrowRight size={20} />
                            </button>
                        </div>

                        {/* Chat Interface */}
                        {showChat && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'white',
                                zIndex: 10,
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '1.5rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '2px solid #e2e8f0' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Customize with AI</h3>
                                    <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                                        <X size={24} />
                                    </button>
                                </div>

                                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {chatMessages.length === 0 ? (
                                        <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
                                            <MessageCircle size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                            <p>Ask me to change colors, add items, modify text, or anything else!</p>
                                        </div>
                                    ) : (
                                        chatMessages.map((msg, idx) => (
                                            <div key={idx} style={{
                                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                                maxWidth: '80%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '12px',
                                                background: msg.role === 'user' ? '#6366f1' : '#f1f5f9',
                                                color: msg.role === 'user' ? 'white' : '#1e293b',
                                                fontSize: '0.875rem'
                                            }}>
                                                {msg.content}
                                            </div>
                                        ))
                                    )}
                                    {isChatLoading && (
                                        <div style={{ alignSelf: 'flex-start', padding: '0.75rem 1rem', borderRadius: '12px', background: '#f1f5f9' }}>
                                            <Loader2 className="spin" size={16} />
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                                        placeholder="e.g., Change header to blue..."
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem 1rem',
                                            borderRadius: '12px',
                                            border: '2px solid #e2e8f0',
                                            fontSize: '0.875rem',
                                            outline: 'none'
                                        }}
                                    />
                                    <button
                                        onClick={handleChatSubmit}
                                        disabled={!chatInput.trim() || isChatLoading}
                                        style={{
                                            padding: '0.75rem 1rem',
                                            background: '#6366f1',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            cursor: chatInput.trim() && !isChatLoading ? 'pointer' : 'not-allowed',
                                            opacity: chatInput.trim() && !isChatLoading ? 1 : 0.5
                                        }}
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', color: '#6366f1', opacity: 0.7 }}>
                        <div style={{ background: '#eef2ff', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                            <Sparkles size={48} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Ready to Create</h3>
                        <p style={{ maxWidth: '250px', margin: '0 auto' }}>Enter a prompt to see the magic happen here.</p>
                    </div>
                )}
            </div>

            <style>{`
                .spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default CreateWithAI;

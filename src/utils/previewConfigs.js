export const menuPreviewConfig = {
    type: 'menu',
    design: {
        color: { dark: '#7f1d1d', light: '#ffffff' }, // Deep Red
        logo: { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' } // Coffee/Cafe logo
    },
    businessInfo: {
        title: "Bob's Cafe",
        subtitle: "Eat.Refresh.Go",
        description: "We aim to provide fresh and healthy snacks people on the go.",
        website: "https://www.techoid.com"
    },
    menu: [
        {
            name: "ZINGER BURGER",
            price: "10.00 $",
            description: "jalapeno + cheese",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "CHICKEN BURGER",
            price: "12.00 $",
            description: "jalapeno + cheese + grilled chicken",
            image: "https://images.unsplash.com/photo-1512152272829-e3139601d179?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        }
    ],
    timings: {
        "Mon-Sun": { isOpen: true, open: "08:00 AM", close: "08:00 PM" }
    },
    social: {
        website: true
    }
};

export const appStorePreviewConfig = {
    type: 'app-store',
    design: {
        color: { dark: '#0f3485', light: '#ff9500' },
        logo: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }
    },
    businessInfo: {
        title: "Techoid Bank",
        subtitle: "Technician name",
        description: "Control all your finances easily and quickly.",
        cta: "DOWNLOAD NOW",
        website: "https://www.techoid.com"
    },
    appLinks: {
        google: 'https://play.google.com/store/apps',
        apple: 'https://apps.apple.com/us/app',
        buttonType: 'rectangular'
    }
};

export const couponPreviewConfig = {
    type: 'coupon',
    design: {
        color: { dark: '#7c3aed', light: '#08B8CE' }, // Violet/Purple
        logo: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' } // High-quality boutique logo
    },
    businessInfo: {
        title: "ABC Boutique"
    },
    coupon: {
        title: "Winter Sale",
        image: "https://img.freepik.com/free-vector/flat-winter-sale-background_23-2149121770.jpg", // Winter sale placeholder
        offer: "Copy the Coupon and get 50% OFF on your next purchase",
        code: "SALE20",
        expiry: "---",
        location: "1000 Marketplace Ave. NY, 10001",
        buttonTitle: "GET COUPON",
        callToAction: "https://www.abcbotique.com",
        terms: "This coupon is only valid for online purchases."
    }
};

export const businessCardPreviewConfig = {
    type: 'business-card',
    design: {
        color: { header: '#0f3485', dark: '#0f3485', light: '#ffffff' }, // Dark Blue
        profile: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' } // Using same avatar as example
    },
    personalInfo: {
        name: "HELLEN GREY",
        title: "Creative Lead",
        company: "Techoid",
        about: "I am a designer & photographer working in International company. I am a designer & photographer working in International company."
    },
    contact: {
        phone: "15555555234",
        email: "Hellen@gmail.com",
        website: "https://Hellengrey.com",
        address: "1000 Marketplace Ave. NY, 10001, United States",
        mapUrl: "#"
    },
    social: {
        website: '',
        whatsapp: '',
        facebook: '',
        linkedin: ''
    },
    exchange: {
        fullName: true,
        contactNumber: true,
        organization: true,
        email: true,
        jobTitle: false,
        website: false,
        customFields: []
    }
};

export const businessPagePreviewConfig = {
    type: 'business-page',
    design: {
        color: { header: '#0f3485', dark: '#0f3485', light: '#ffffff' }, // Dark Blue
        logo: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }, // Quality restaurant logo
        heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // New working cafe image
    },
    businessInfo: {
        title: "Royal's Cafe",
        subtitle: "Eat. Refresh. Go.",
        description: "We aim to provide fresh and healthy snacks people on the go."
    },
    timings: {
        "Monday": { isOpen: true, open: "08:00 AM", close: "08:00 PM" },
        "Tuesday": { isOpen: true, open: "08:00 AM", close: "08:00 PM" },
        "Wednesday": { isOpen: true, open: "08:00 AM", close: "08:00 PM" },
        "Thursday": { isOpen: true, open: "08:00 AM", close: "08:00 PM" },
        "Friday": { isOpen: true, open: "08:00 AM", close: "08:00 PM" },
        "Saturday": { isOpen: true, open: "08:00 AM", close: "08:00 PM" },
        "Sunday": { isOpen: false, open: "", close: "" }
    },
    facilities: {
        wifi: true,
        sofa: true,
        handicap: true
    },
    contact: {
        phone: "15555551234",
        email: "Hellen@gmail.com",
        website: "https://Hellengrey.com"
    },
    social: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        whatsapp: 'https://whatsapp.com'
    }
};

export const bioPagePreviewConfig = {
    type: 'bio-page',
    design: {
        color: { header: '#8b5cf6', dark: '#8b5cf6', light: '#ffffff' }, // Purple/Violet
        profile: { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' } // Professional woman photo
    },
    basicInfo: {
        name: "HARRY TAYLOR",
        companyName: "Designer & Photographer",
        description: "I am a designer & photographer working in International company. I am a designer & photographer working in International company."
    },
    contact: {
        phone: '15555551234',
        phoneButtonTitle: 'Talk to Me',
        email: 'Hellen@gmail.com',
        emailButtonTitle: 'Email Me',
        website: 'https://Hellengrey.com',
        websiteButtonTitle: 'Visit Us'
    },
    social: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        website: 'https://techoid.com'
    }
};

export const surveyPreviewConfig = {
    type: 'survey',
    design: {
        logo: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }, // Professional logo
        illustration: 'https://img.freepik.com/free-vector/customer-survey-concept-illustration_114360-5321.jpg' // Survey illustration
    },
    businessInfo: {
        title: "Luxury Hotels",
        description: "We aim to provide fresh and healthy snacks people on the go."
    }
};

export const leadGenerationPreviewConfig = {
    type: 'lead-generation',
    design: {
        color: { header: '#7f1d1d', dark: '#7f1d1d', light: '#ffffff' }, // Dark Red/Maroon
        logo: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }, // Professional logo
        headerImage: { url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=267&fit=crop' } // Default header image
    },
    basicInfo: {
        companyName: "Sterling & Co",
        headline: "Important Document",
        description: "Download this document today."
    },
    form: {
        fullName: true,
        contactNumber: false,
        organizationName: false,
        email: true,
        jobTitle: false,
        website: false
    },
    thankYou: {
        message: "Thanks for submitting! You can now download your content, thanks again"
    }
};

export const ratingPreviewConfig = {
    type: 'rating',
    design: {
        color: { header: '#5b8fd9', dark: '#5b8fd9', light: '#FF5E3B' }, // Blue header, Orange buttons
        logo: { url: 'https://img.freepik.com/premium-vector/heart-with-pulse-icon-healthcare-medical-symbol_116137-7857.jpg' }, // Heart logo
        headerImage: { url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=267&fit=crop' } // Default header image
    },
    socialLinks: [
        { id: '1', platform: 'facebook', url: 'https://facebook.com' },
        { id: '2', platform: 'instagram', url: 'https://instagram.com' },
        { id: '3', platform: 'whatsapp', url: 'https://whatsapp.com' }
    ],
    basicInfo: {
        name: "Bob's Cafe",
        website: "https://www.bobscafe.com"
    },
    rating: {
        question: "How was your rental experience?",
        type: 'stars',
        allowComment: false
    }
};

export const reviewsPreviewConfig = {
    type: 'reviews',
    design: {
        color: { header: '#2e3192', dark: '#2e3192', light: '#C0E1DD' },
        logo: { url: 'https://img.freepik.com/premium-vector/luxury-hotel-logo-design-template_7492-63.jpg' },
        headerImage: { url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=267&fit=crop' }
    },
    basicInfo: {
        organizationName: "LUXURY HOTELS",
        title: "Give us your feedback",
        description: "We aim to provide fresh and healthy snacks people on the go.",
        website: "https://www.hotelparadise.com",
        organizationNameColor: "#FFFFFF",
        organizationNameFont: "Lato",
        titleColor: "#1e293b",
        titleFont: "Lato"
    },
    categories: [
        { id: 1, name: 'Food', subcategories: ['Staff', 'Quantity', 'Taste'] },
        { id: 2, name: 'Drink', subcategories: ['Quality', 'Variety'] },
        { id: 3, name: 'Parking', subcategories: ['Availability', 'Security'] }
    ],
    social: {
        website: "https://www.hotelparadise.com",
        facebook: "https://facebook.com/hotelparadise",
        instagram: "https://instagram.com/hotelparadise"
    }
};

export const socialMediaPreviewConfig = {
    type: 'social-media',
    design: {
        logo: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }, // Professional logo
        backgroundImage: { url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=267&fit=crop' }
    },
    basicInfo: {
        headline: "Connect With Us",
        aboutUs: "Follow us for the latest updates on our social channels."
    },
    social: {
        websiteUrl: '',
        websiteText: 'Visit Us Online',
        facebookUrl: '',
        facebookText: 'Facebook',
        youtubeUrl: '',
        youtubeText: 'YouTube'
    }
};

export const pdfPreviewConfig = {
    type: 'pdf',
    design: {
        logo: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' },
        color: { header: '#0B2D86', light: '#FFA800' }
    },
    basicInfo: {
        companyName: 'Software Company',
        pdfTitle: 'See Our Company Profile',
        description: 'We aim to provide fresh and healthy snacks people on the go.',
        companyNameColor: '#FFFFFF',
        companyNameFont: 'Lato',
        pdfTitleColor: '#FFA800',
        pdfTitleFont: 'Lato'
    },
    uploadPdf: {
        pdfTitle: 'Qr Insight Presentation',
        pdfUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
        buttonTitle: 'Download Now'
    }
};

export const multipleLinksPreviewConfig = {
    type: 'multiple-links',
    design: {
        logo: { url: 'https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=150&h=150&fit=crop' },
        color: { header: '#52BDA3', light: '#2B1E99' }
    },
    basicInfo: {
        headline: 'Techoid',
        aboutUs: 'Follow us and get updates delivered to your favorite social media channel.',
        headlineColor: '#2B1E99',
        headlineFont: 'Lato'
    },
    links: [
        { id: '1', url: '', title: 'Visit Us Online' },
        { id: '2', url: '', title: 'Talk to Us' },
        { id: '3', url: '', title: 'Instagram' },
        { id: '4', url: '', title: 'Youtube' }
    ],
    socialLinks: [
        { id: 's1', platform: 'website', url: '' },
        { id: 's2', platform: 'facebook', url: '' },
        { id: 's3', platform: 'instagram', url: '' }
    ]
};

export const passwordProtectedPreviewConfig = {
    type: 'password-protected',
    design: {
        headerImage: {
            url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=200&fit=crop'
        }
    },
    infoFields: [
        { id: '1', name: 'Name', value: 'Hellen Grey' },
        { id: '2', name: 'Address', value: '4059 Carling Avenue Ottawa Ontario' },
        { id: '3', name: 'Contact', value: '703-701-9964' },
        { id: '4', name: 'Bank Account', value: '9647037019964' }
    ]
};

export const eventPreviewConfig = {
    type: 'event',
    businessInfo: {
        companyName: 'Sterling & Co.',
        companyNameColor: '#FFC700',
        companyNameFont: 'Lato',
        headline: '4th Annual Company Meetup',
        headlineColor: '#FFFFFF',
        headlineFont: 'Lato',
        description: 'We aim to provide fresh and healthy snacks people on the go.',
        button: 'Get Tickets',
        website: 'http://www.sterlingco.com/tickets'
    },
    socialLinks: [
        { id: 1, platform: 'website', url: 'https://www.sterlingco.com' },
        { id: 2, platform: 'instagram', url: 'https://instagram.com/sterlingco' },
        { id: 3, platform: 'facebook', url: 'https://facebook.com/sterlingco' }
    ],
    venue: {
        location: '1000 Marketplace Ave. NY, 10001, United States'
    },
    contactInfo: {
        personName: 'Hellen Grey',
        designation: 'Event Manager',
        channels: [
            { id: 1, type: 'phone', value: '15555551234' },
            { id: 2, type: 'email', value: 'Hellen@gmail.com' }
        ]
    },
    facilities: ['wifi', 'plug', 'wheelchair'],
    design: {
        color: {
            header: '#097D6A',
            light: '#FFC700'
        }
    }
};

export const productPagePreviewConfig = {
    type: 'product-page',
    basicInfo: {
        companyName: 'Dairyland',
        companyTextColor: '#000000',
        companyFont: 'Lato',
        productTitle: 'Chocolate Flavored Milk',
        titleTextColor: '#000000',
        titleFont: 'Lato',
        headline: '325 ml',
        price: '95',
        currency: '₨',
        productImages: [
            { id: 'def-1', url: 'https://picsum.photos/seed/product1/600/600' },
            { id: 'def-2', url: 'https://picsum.photos/seed/product2/600/600' },
            { id: 'def-3', url: 'https://picsum.photos/seed/product3/600/600' }
        ]
    },
    content: {
        items: [
            { id: '1', title: 'Description', text: "The Dark, Smooth, Creaminess Of Chocolate Romances The Wholesome Goodness Of Real Cow's Milk, Reigniting For The Love For A Healthy, Tasty Beverage." },
            { id: '2', title: 'Ingredient', text: '• Reduced Fat Milk\n• Milk Solids\nCocoa Powder\n• Sugar\n• Emulsifier: Vegetable Oil Origin (E471)\n• Stabilizer (E470) & Chocolate Flavor' }
        ],
        certificates: [
            { id: 'def-cert-1', url: 'data:image/jpeg;base64,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' },
            { id: 'def-cert-2', url: 'data:image/jpeg;base64,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' }
        ],
        buttonText: 'Buy Product',
        buttonLink: 'https://www.dairylandltd.com/'
    },
    video: {
        title: 'Product Introduction',
        url: 'https://www.youtube.com/watch?v=EngW7tLk6R8'
    },
    feedback: {
        title: 'Add Your Feedback',
        ratingUrl: 'https://www.dairylandltd.com/floveredmilk/rating',
        textColor: '#FFFFFF',
        font: 'Lato'
    },
    contact: {
        phone: '+1 234 567 890',
        email: 'contact@dairyland.com',
        website: 'https://www.dairylandltd.com',
        socials: [
            { platform: 'facebook', url: 'https://facebook.com/dairyland' },
            { platform: 'instagram', url: 'https://instagram.com/dairyland' },
            { platform: 'twitter', url: 'https://twitter.com/dairyland' }
        ]
    },
    design: {
        color: {
            header: '#FFB03E',
            light: '#031D36',
            dark: '#FFB03E'
        },
        logo: {
            url: 'https://res.cloudinary.com/date1bmhd/image/upload/v1759743320/comapny-logo_xy3fqg.png'
        }
    }
};

export const dynamicUrlPreviewConfig = {
    type: 'dynamic-url'
};

export const videoPreviewConfig = {
    type: 'video'
};

export const imagePreviewConfig = {
    type: 'image'
};

export const customTypePreviewConfig = {
    type: 'custom-type',
    customComponents: []
};

export const getPreviewConfig = (type) => {
    switch (type) {
        case 'menu': return menuPreviewConfig;
        case 'app-store': return appStorePreviewConfig;
        case 'coupon': return couponPreviewConfig;
        case 'business-card': return businessCardPreviewConfig;
        case 'business-page': return businessPagePreviewConfig;
        case 'bio-page': return bioPagePreviewConfig;
        case 'survey': return surveyPreviewConfig;
        case 'lead-generation': return leadGenerationPreviewConfig;
        case 'rating': return ratingPreviewConfig;
        case 'reviews': return reviewsPreviewConfig;
        case 'social-media': return socialMediaPreviewConfig;
        case 'pdf': return pdfPreviewConfig;
        case 'multiple-links': return multipleLinksPreviewConfig;
        case 'password-protected': return passwordProtectedPreviewConfig;
        case 'event': return eventPreviewConfig;
        case 'product-page': return productPagePreviewConfig;
        case 'dynamic-url': return dynamicUrlPreviewConfig;
        case 'video': return videoPreviewConfig;
        case 'image': return imagePreviewConfig;
        case 'custom-type': return customTypePreviewConfig;
        default: return null;
    }
};

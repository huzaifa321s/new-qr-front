export const menuPreviewConfig = {
    type: 'menu',
    design: {
        color: { dark: '#7f1d1d', light: '#ffffff' }, // Deep Red
        logo: { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' } // Coffee/Cafe logo
    },
    businessInfo: {
        title: "Bob's Cafe",
        subtitle: "Eat.Refresh.Go",
        description: "We aim to provide fresh and healthy snacks people on the go."
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
        color: { dark: '#0f3485', light: '#06b6d4' },
        logo: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }
    },
    businessInfo: {
        title: "Techoid Bank",
        subtitle: "Technician name",
        description: "Control all your finances easily and quickly."
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
        color: { dark: '#7c3aed', light: '#ffffff' }, // Violet/Purple
        logo: { url: 'https://img.freepik.com/premium-vector/luxury-letter-b-logo-design_101354-756.jpg' } // Boutique logo placeholder
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
        location: "1000 Marketplace Ave. NY, 10001"
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
        website: true,
        whatsapp: true,
        facebook: true,
        linkedin: true
    }
};

export const businessPagePreviewConfig = {
    type: 'business-page',
    design: {
        color: { header: '#0f3485', dark: '#0f3485', light: '#ffffff' }, // Dark Blue
        logo: { url: 'https://img.freepik.com/premium-vector/restaurant-logo-design-template_79169-56.jpg' }, // Restaurant logo
        heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Restaurant interior
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
    }
};

export const bioPagePreviewConfig = {
    type: 'bio-page',
    design: {
        color: { header: '#8b5cf6', dark: '#8b5cf6', light: '#ffffff' }, // Purple/Violet
        profile: { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' } // Professional woman photo
    },
    personalInfo: {
        name: "HARRY TAYLOR",
        title: "Designer & Photographer",
        bio: "I am a designer & photographer working in International company. I am a designer & photographer working in International company."
    },
    social: {
        facebook: true,
        instagram: true,
        website: true
    }
};

export const surveyPreviewConfig = {
    type: 'survey',
    design: {
        logo: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }, // 3D character
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
        logo: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }, // 3D character
        heroImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Business meeting
    },
    businessInfo: {
        title: "Sterling & Co",
        formTitle: "Important Document",
        formDescription: "Download this document today."
    }
};

export const ratingPreviewConfig = {
    type: 'rating',
    design: {
        color: { header: '#5b8fd9', dark: '#5b8fd9', light: '#ffffff' }, // Blue
        logo: { url: 'https://img.freepik.com/premium-vector/heart-with-pulse-icon-healthcare-medical-symbol_116137-7857.jpg' }, // Heart logo
        heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Food/cafe
    },
    businessInfo: {
        title: "Bob's Cafe",
        question: "How was your rental experience?"
    }
};

export const reviewsPreviewConfig = {
    type: 'reviews',
    design: {
        color: { header: '#2e3192', dark: '#2e3192', light: '#ffffff' },
        logo: { url: 'https://img.freepik.com/premium-vector/luxury-hotel-logo-design-template_7492-63.jpg' },
        heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'
    },
    businessInfo: {
        title: "Luxury Hotels"
    }
};

export const socialMediaPreviewConfig = {
    type: 'social-media',
    design: {
        profile: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }
    }
};

export const pdfPreviewConfig = {
    type: 'pdf',
    design: {
        logo: { url: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg' }
    },
    businessInfo: {
        title: 'Software Company'
    }
};

export const multipleLinksPreviewConfig = {
    type: 'multiple-links',
    businessInfo: {
        title: 'Techoid'
    }
};

export const passwordProtectedPreviewConfig = {
    type: 'password-protected'
};

export const eventPreviewConfig = {
    type: 'event'
};

export const productPagePreviewConfig = {
    type: 'product-page'
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

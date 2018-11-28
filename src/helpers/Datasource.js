const loremipsum = `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure ther`;

export const brand = [
    {
        id: 0,
        brandName: 'Suzuki'
    }
];

export const branch = [
    {
        id: 0,
        branchName: 'Car',
        industryId: 0
    }
];

export const category = [
    {
        id: 0,
        categoryName: 'Sport car',
        branchId: 1
    },
    {
        id: 1,
        categoryName: 'topshop',
        branchId: 0
    }
];

export const industry = [
    {
        id: 0,
        industryName: 'Electronics',
        branches: [
            {
                ...branch[0],
                categories: [
                    category[0],
                    category[1],
                ]
            },
            {
                ...branch[0],
                categories: [
                    category[0],
                    category[1],
                    category[1],
                    category[1],
                ]
            }
        ]
    },
    {
        id: 1,
        industryName: 'Foods & Drinks',
        branches: [
            {
                ...branch[0],
                categories: [
                    category[0],
                    category[1],
                ]
            },
        ]
    }
];


export const accounts = [
    {
        id: 0,
        username: 'user1',
        passwords: '123456789',
        permission: 'admin',
        email: 'admin@vng.com.vn',
        fullName: 'Nguyen Van V',
        dateOfBirth: '12/9/1878',
        phone: '09123889',
        gender: 'Nam',
        address: '78 VNG Streeet',
        isVerified: true
    }
];

export const verification_email = [
    {
        id: 0,
        userId: 0,
        code: 'IEUFDJEO',
        expiredDate: new Date(2018, 10, 27),
        type: 1 || 2 || 3
    }
];

let prds = [
    {
        id: 0,
        productName: 'T-Shirt X3432',
        industryId: 0,
        branchId: 0,
        categoryId: 0,
        brandId: 0,
        category: category[0],
        brand: brand[0],
        branch: branch[0],
        industry: industry[0],
        price: 1200,
        images: [
            'https://images.bewakoof.com/original/up-in-smoke-typography-half-sleeve-t-shirt-men-s-printed-t-shirts-1513764488.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/81vL0zMgUzL._UL1500_.jpg'
        ],
        description: loremipsum,
        discPercent: 0.1,
        amount: 102,
        active: 1,
    },
    {
        id: 1,
        productName: 'Knot Front Mini Dress',
        industryId: 0,
        branchId: 0,
        categoryId: 1,
        brandId: 0,
        industry: industry[0],
        branch: branch[0],
        category: category[1],
        brand: brand[0],
        price: 1299000,
        images: [
            '/img/product-img/product-5.jpg',
            '/img/product-img/product-3.jpg',
            '/img/product-img/product-2.jpg',
            '/img/product-img/product-4.jpg'
        ],
        description: loremipsum,
        discPercent: 0.3,
        amount: 102,
        active: 1,
    },
    {
        id: 2,
        productName: 'Knot Front Mini Dress',
        industryId: 0,
        branchId: 0,
        categoryId: 1,
        brandId: 0,
        industry: industry[0],
        branch: branch[0],
        category: category[1],
        brand: brand[0],
        price: 999000,
        images: [
            '/img/product-img/product-7.jpg',
            '/img/product-img/product-6.jpg'
        ],
        description: loremipsum,
        discPercent: 0.1,
        amount: 102,
        active: 1,
    },
    {
        id: 3,
        productName: 'Knot Front Mini Dress',
        industryId: 0,
        branchId: 0,
        categoryId: 1,
        brandId: 0,
        industry: industry[0],
        branch: branch[0],
        category: category[1],
        brand: brand[0],
        price: 1299000,
        images: [
            '/img/product-img/product-1.jpg',
            '/img/product-img/product-6.jpg'
        ],
        description: loremipsum,
        discPercent: 0.3,
        amount: 102,
        active: 1,
    },
    {
        id: 4,
        productName: 'Knot Front Mini Dress',
        industryId: 0,
        branchId: 0,
        categoryId: 1,
        brandId: 0,
        industry: industry[0],
        branch: branch[0],
        category: category[1],
        brand: brand[0],
        price: 1299000,
        images: [
            '/img/product-img/product-2.jpg',
            '/img/product-img/product-4.jpg',
            '/img/product-img/product-3.jpg',
            '/img/product-img/product-1.jpg'
        ],
        description: loremipsum,
        discPercent: 0.3,
        amount: 102,
        active: 1,
    },
    {
        id: 5,
        productName: 'Knot Front Mini Dress',
        industryId: 0,
        branchId: 0,
        categoryId: 1,
        brandId: 0,
        industry: industry[0],
        branch: branch[0],
        category: category[1],
        brand: brand[0],
        price: 1299000,
        images: [
            '/img/product-img/product-5.jpg',
            '/img/product-img/product-3.jpg'
        ],
        description: loremipsum,
        discPercent: 0.3,
        amount: 102,
        active: 1,
    },
    {
        id: 6,
        productName: 'Knot Front Mini Dress',
        industryId: 0,
        branchId: 0,
        categoryId: 1,
        brandId: 0,
        industry: industry[0],
        branch: branch[0],
        category: category[1],
        brand: brand[0],
        price: 1299000,
        images: [
            '/img/product-img/product-4.jpg',
            '/img/product-img/product-6.jpg'
        ],
        description: loremipsum,
        discPercent: 0.3,
        amount: 102,
        active: 1,
    },
];
prds = [...prds, ...prds, ...prds, ...prds];
prds = [...prds, ...prds, ...prds, ...prds];
export const product = prds;

export const cart = [
    {
        id: 0,
        userId: 0,
        productId: 0,
        amount: 2,
        active: 1
    }
];

export const orders = [
    {
        id: 0,
        total: 100000,
        couponId: 0,
        note: 'Ship asap for me please!',
        status: 'CHECKED' || 'PENDING' || 'SHIPPING' || 'COMPLETED',
        active: 1
    }
];

export const history = [
    {
        id: 0,
        orderId: 0,
        total: 1000,
        couponId: 0,
        status: 'CHECKED',
        date_time: new Date()
    }
];

export const ordersdetail = [
    {
        id: 0,
        orderId: 0,
        productId: 0,
        amount: 2,
        final_price: 200000,
        original_price: 10000
    }
];

export const coupon = [
    {
        id: 0,
        couponCode: 'NEWYEAR2019',
        percent: 0.49,
        money: null,
        threshold: null,
        all_product: true
    }
];

export const cou_pro = [
    {
        id: 0,
        couponId: 0,
        productId: 0
    }
];



const loremipsum = `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`;


export const accounts = [
    {
        id: 0,
        username: 'user1',
        passwords: '123456789',
        permission: 'admin',
        email: 'admin@vng.com.vn',
        full_name: 'Nguyen Van V',
        date_of_birth: '12/9/1878',
        phone: '09123889',
        gender: 'Nam',
        address: '78 VNG Streeet',
        is_verified: true
    }
];

export const verification_email = [
    {
        id: 0,
        user_id: 0,
        code: 'IEUFDJEO',
        expire_date: new Date(2018, 10, 27),
        type: 1 || 2 || 3
    }
];

let prds = [
    {
        id: 0,
        product_name: 'T-Shirt X3432',
        industry_id: 0,
        branch_id: 0,
        category_id: 0,
        brand_id: 0,
        price: 1200,
        images: [
            'https://images.bewakoof.com/original/up-in-smoke-typography-half-sleeve-t-shirt-men-s-printed-t-shirts-1513764488.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/81vL0zMgUzL._UL1500_.jpg'
        ],
        description: loremipsum,
        disc_percent: 0.1,
        amount: 102,
        active: 1,
    },
    {
        id: 1,
        product_name: 'Knot Front Mini Dress',
        industry_id: 0,
        branch_id: 0,
        category_id: 1,
        brand_id: 0,
        price: 1299000,
        images: [
            'img/product-img/product-5.jpg',
            'img/product-img/product-6.jpg'
        ],
        description: loremipsum,
        disc_percent: 0.3,
        amount: 102,
        active: 1,
    },
    {
        id: 2,
        product_name: 'Knot Front Mini Dress',
        industry_id: 0,
        branch_id: 0,
        category_id: 1,
        brand_id: 0,
        price: 999000,
        images: [
            'img/product-img/product-7.jpg',
            'img/product-img/product-6.jpg'
        ],
        description: loremipsum,
        disc_percent: 0.1,
        amount: 102,
        active: 1,
    },
    {
        id: 3,
        product_name: 'Knot Front Mini Dress',
        industry_id: 0,
        branch_id: 0,
        category_id: 1,
        brand_id: 0,
        price: 1299000,
        images: [
            'img/product-img/product-5.jpg',
            'img/product-img/product-6.jpg'
        ],
        description: loremipsum,
        disc_percent: 0.3,
        amount: 102,
        active: 1,
    },
    {
        id: 4,
        product_name: 'Knot Front Mini Dress',
        industry_id: 0,
        branch_id: 0,
        category_id: 1,
        brand_id: 0,
        price: 1299000,
        images: [
            'img/product-img/product-5.jpg',
            'img/product-img/product-6.jpg'
        ],
        description: loremipsum,
        disc_percent: 0.3,
        amount: 102,
        active: 1,
    },
    {
        id: 5,
        product_name: 'Knot Front Mini Dress',
        industry_id: 0,
        branch_id: 0,
        category_id: 1,
        brand_id: 0,
        price: 1299000,
        images: [
            'img/product-img/product-5.jpg',
            'img/product-img/product-6.jpg'
        ],
        description: loremipsum,
        disc_percent: 0.3,
        amount: 102,
        active: 1,
    },
    {
        id: 6,
        product_name: 'Knot Front Mini Dress',
        industry_id: 0,
        branch_id: 0,
        category_id: 1,
        brand_id: 0,
        price: 1299000,
        images: [
            'img/product-img/product-5.jpg',
            'img/product-img/product-6.jpg'
        ],
        description: loremipsum,
        disc_percent: 0.3,
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
        user_id: 0,
        product_id: 0,
        amount: 2,
        active: 1
    }
];

export const orders = [
    {
        id: 0,
        total: 100000,
        coupon_id: 0,
        note: 'Ship asap for me please!',
        status: 'CHECKED' || 'PENDING' || 'SHIPPING' || 'COMPLETED',
        active: 1
    }
];

export const history = [
    {
        id: 0,
        order_id: 0,
        total: 1000,
        coupon_id: 0,
        status: 'CHECKED',
        date_time: new Date()
    }
];

export const ordersdetail = [
    {
        id: 0,
        order_id: 0,
        product_id: 0,
        amount: 2,
        final_price: 200000,
        original_price: 10000
    }
];

export const coupon = [
    {
        id: 0,
        coupon_code: 'NEWYEAR2019',
        percent: 0.49,
        money: null,
        threshold: null,
        all_product: true
    }
];

export const cou_pro = [
    {
        id: 0,
        coupon_id: 0,
        product_id: 0
    }
];

export const brand = [
    {
        id: 0,
        name: 'Suzuki'
    }
];

export const industry = [
    {
        id: 0,
        name: 'Electronics'
    }
];

export const branch = [
    {
        id: 0,
        name: 'Car',
        industry_id: 0
    }
];

export const category = [
    {
        id: 0,
        name: 'Sport car',
        branch_id: 1
    },
    {
        id: 1,
        name: 'topshop',
        branch_id: 0
    }
];

// O'yinchoq mahsulotlari ro'yxati
const TOY_PRODUCTS = [
    {
        id: 1,
        name: "Lego City Politsiya Stansiyasi",
        category: "lego",
        price: 285000,
        salePrice: 199000,
        description: "1000+ qismli, 6+ yosh uchun",
        image: "https://images.unsplash.com/photo-1587654780298-8c6d6b2c8b1a?w=400&h=300&fit=crop",
        rating: 4.8,
        stock: 15,
        tags: ["bestseller", "educational", "constructor"],
        features: ["1000+ qism", "6+ yosh", "Batteries yo'q"]
    },
    {
        id: 2,
        name: "Smart Robot O'quvchisi",
        category: "robots",
        price: 450000,
        salePrice: 315000,
        description: "AI bilan, 50+ o'quv dasturi",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
        rating: 4.9,
        stock: 8,
        tags: ["smart", "educational", "bestseller"],
        features: ["AI bilan", "50+ dastur", "Bluetooth"]
    },
    {
        id: 3,
        name: "Barbie Oqim qatori",
        category: "dolls",
        price: 125000,
        salePrice: 89000,
        description: "3 qo'shimcha kiymlar bilan",
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop",
        rating: 4.7,
        stock: 25,
        tags: ["fashion", "girls", "popular"],
        features: ["3 ta kiym", "Aksessuarlar", "Yugurish aravachasi"]
    },
    {
        id: 4,
        name: "Hot Wheels 20 ta mashina to'plami",
        category: "cars",
        price: 180000,
        salePrice: 126000,
        description: "20 xil sport mashinalari",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop",
        rating: 4.6,
        stock: 30,
        tags: ["cars", "collection", "boys"],
        features: ["20 ta mashina", "Kolleksiya", "3+ yosh"]
    },
    {
        id: 5,
        name: "Magnetic Pazllar",
        category: "puzzles",
        price: 75000,
        salePrice: 52500,
        description: "200 qismli, magnitli",
        image: "https://images.unsplash.com/photo-1612860600398-5a5c73b37626?w=400&h=300&fit=crop",
        rating: 4.5,
        stock: 40,
        tags: ["educational", "family", "magnetic"],
        features: ["200 qism", "Magnitli", "O'quv"]
    },
    {
        id: 6,
        name: "Yugurish velosipedi",
        category: "outdoor",
        price: 320000,
        salePrice: 256000,
        description: "12 dyuym, 3-5 yosh uchun",
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=300&fit=crop",
        rating: 4.8,
        stock: 12,
        tags: ["outdoor", "sports", "bestseller"],
        features: ["12 dyuym", "3-5 yosh", "Qo'shimcha g'ildiraklar"]
    },
    {
        id: 7,
        name: "Plush Ayiqcha",
        category: "soft",
        price: 65000,
        salePrice: 45500,
        description: "35 sm, yumshoq material",
        image: "https://images.unsplash.com/photo-1589874186480-ecd085096d68?w=400&h=300&fit=crop",
        rating: 4.9,
        stock: 50,
        tags: ["soft", "cute", "popular"],
        features: ["35 sm", "Yumshoq", "Yuviladi"]
    },
    {
        id: 8,
        name: "O'quv tablet",
        category: "educational",
        price: 220000,
        salePrice: 176000,
        description: "100+ o'yin, ingliz tili",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
        rating: 4.7,
        stock: 18,
        tags: ["educational", "smart", "tablet"],
        features: ["100+ o'yin", "Ingliz tili", "Rechargeable"]
    },
    {
        id: 9,
        name: "Lego Technic Sport Mashina",
        category: "lego",
        price: 380000,
        salePrice: 304000,
        description: "2000+ qismli, 12+ yosh",
        image: "https://images.unsplash.com/photo-1587654780298-8c6d6b2c8b1a?w=400&h=300&fit=crop",
        rating: 4.9,
        stock: 10,
        tags: ["constructor", "advanced", "boys"],
        features: ["2000+ qism", "12+ yosh", "Motorli"]
    },
    {
        id: 10,
        name: "O'yin patefoni",
        category: "educational",
        price: 95000,
        salePrice: 66500,
        description: "10 ta o'yin disk, 3+ yosh",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
        rating: 4.4,
        stock: 22,
        tags: ["music", "educational", "toddler"],
        features: ["10 ta disk", "3+ yosh", "Batteries"]
    },
    {
        id: 11,
        name: "Transformers Optimus Prime",
        category: "cars",
        price: 195000,
        salePrice: 156000,
        description: "Transformatsiya qiladi, 25 sm",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop",
        rating: 4.8,
        stock: 14,
        tags: ["transformer", "action", "boys"],
        features: ["Transformatsiya", "25 sm", "Detallar"]
    },
    {
        id: 12,
        name: "Qurilish o'yinchoqlari to'plami",
        category: "educational",
        price: 145000,
        salePrice: 101500,
        description: "120 qismli, 5+ yosh",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
        rating: 4.6,
        stock: 28,
        tags: ["constructor", "educational", "unisex"],
        features: ["120 qism", "5+ yosh", "Plastik"]
    }
];

// Kategoriyalar
const CATEGORIES = [
    { id: "all", name: "Hammasi", icon: "fas fa-th-large", color: "#ff6b6b" },
    { id: "lego", name: "Lego", icon: "fas fa-cubes", color: "#36d1dc" },
    { id: "cars", name: "Mashinalar", icon: "fas fa-car", color: "#5b86e5" },
    { id: "dolls", name: "Qo'g'irchoqlar", icon: "fas fa-female", color: "#ff8e53" },
    { id: "educational", name: "Rivojlantiruvchi", icon: "fas fa-brain", color: "#a8e6cf" },
    { id: "robots", name: "Robotlar", icon: "fas fa-robot", color: "#ffd166" },
    { id: "puzzles", name: "Pazllar", icon: "fas fa-puzzle-piece", color: "#e0bbe4" },
    { id: "outdoor", name: "Ochiq havoda", icon: "fas fa-bicycle", color: "#4facfe" },
    { id: "soft", name: "Yumshoq", icon: "fas fa-hippo", color: "#ff9a9e" }
];

// Filtirlash funksiyasi
function filterProducts(category = "all", search = "", sort = "popular") {
    let filtered = TOY_PRODUCTS;
    
    // Kategoriya bo'yicha filtrlash
    if (category !== "all") {
        filtered = filtered.filter(product => product.category === category);
    }
    
    // Qidiruv bo'yicha filtrlash
    if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }
    
    // Saralash
    switch (sort) {
        case "new":
            filtered.sort((a, b) => b.id - a.id);
            break;
        case "price-low":
            filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
            break;
        case "price-high":
            filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
            break;
        case "popular":
        default:
            filtered.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    return filtered;
}

// Aksiya mahsulotlari
function getFeaturedProducts() {
    return TOY_PRODUCTS.filter(product => product.salePrice).slice(0, 5);
}

// Mahsulot kartasini yaratish
function createProductCard(product, type = "grid") {
    const isOnSale = product.salePrice && product.salePrice < product.price;
    const currentPrice = isOnSale ? product.salePrice : product.price;
    const discountPercent = isOnSale 
        ? Math.round((1 - product.salePrice / product.price) * 100)
        : 0;
    
    if (type === "scroll") {
        return `
            <div class="product-card-scroll" data-id="${product.id}">
                <div class="product-image">
                    ${isOnSale ? `<div class="sale-badge">-${discountPercent}%</div>` : ''}
                    <i class="fas fa-${product.category === 'lego' ? 'cubes' : 
                                      product.category === 'cars' ? 'car' : 
                                      product.category === 'dolls' ? 'female' : 
                                      product.category === 'robots' ? 'robot' : 'gift'}"></i>
                </div>
                <div class="product-info-scroll">
                    <h3 class="product-title-scroll">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price-scroll">
                        <span class="current-price">${formatPrice(currentPrice)}</span>
                        ${isOnSale ? `<span class="old-price">${formatPrice(product.price)}</span>` : ''}
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    // Oddiy grid karta
    return `
        <div class="product-card" data-id="${product.id}">
            ${isOnSale ? `<div class="sale-flag">-${discountPercent}%</div>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-img" 
                 onerror="this.src='https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop'">
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">${formatPrice(currentPrice)}</div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Kategoriya kartasini yaratish
function createCategoryCard(category) {
    return `
        <div class="category-card" data-category="${category.id}">
            <div class="category-icon" style="background: ${category.color}">
                <i class="${category.icon}"></i>
            </div>
            <span>${category.name}</span>
        </div>
    `;
}

// Savat elementi yaratish
function createCartItem(product, quantity) {
    const total = (product.salePrice || product.price) * quantity;
    
    return `
        <div class="cart-item" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="cart-item-img"
                 onerror="this.src='https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=200&h=200&fit=crop'">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${product.name}</h4>
                <div class="cart-item-price">${formatPrice(product.salePrice || product.price)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                    <span class="quantity">${quantity}</span>
                    <button class="quantity-btn increase" data-id="${product.id}">+</button>
                    <button class="remove-item" data-id="${product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Mahsulotni ID bo'yicha topish
function getProductById(id) {
    return TOY_PRODUCTS.find(product => product.id === id);
}
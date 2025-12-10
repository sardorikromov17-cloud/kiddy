// Asosiy o'zgaruvchilar
let cart = loadFromStorage('cart') || [];
let wishlist = loadFromStorage('wishlist') || [];
let currentCategory = 'all';
let currentSort = 'popular';
let currentSearch = '';
let currentSlide = 0;
let isLoading = false;

// DOM elementlari
const DOM = {
    productsGrid: document.getElementById('products-grid'),
    featuredProducts: document.getElementById('featured-products'),
    cartBtn: document.getElementById('cart-btn'),
    cartModal: document.getElementById('cart-modal'),
    orderModal: document.getElementById('order-modal'),
    profileModal: document.getElementById('profile-modal'),
    cartItems: document.getElementById('cart-items'),
    cartEmpty: document.getElementById('cart-empty'),
    cartSummary: document.getElementById('cart-summary'),
    cartCount: document.getElementById('cart-count'),
    searchInput: document.getElementById('search-input'),
    searchClear: document.getElementById('search-clear'),
    sortSelect: document.getElementById('sort-select'),
    loadMoreBtn: document.getElementById('load-more-btn'),
    categoriesLink: document.getElementById('categories-link'),
    wishlistFooter: document.getElementById('wishlist-footer'),
    profileLink: document.getElementById('profile-link'),
    clearCartBtn: document.getElementById('clear-cart-btn'),
    checkoutBtn: document.getElementById('checkout-btn'),
    orderForm: document.getElementById('order-form'),
    submitOrderBtn: document.getElementById('submit-order-btn'),
    shopNowBtn: document.getElementById('shop-now-btn'),
    menuBtn: document.getElementById('menu-btn'),
    wishlistBtn: document.getElementById('wishlist-btn'),
    voiceBtn: document.getElementById('voice-btn'),
    themeToggle: document.getElementById('theme-toggle'),
    sliderContainer: document.querySelector('.slider-container'),
    sliderDots: document.querySelectorAll('.dot'),
    quickTags: document.querySelectorAll('.quick-tag'),
    categoryCards: document.querySelectorAll('.category-card')
};

// Dasturni ishga tushirish
function initApp() {
    // Preloader ni yashirish
    setTimeout(() => {
        document.getElementById('preloader')?.classList.add('hidden');
    }, 1500);
    
    // Mahsulotlarni yuklash
    loadProducts();
    loadFeaturedProducts();
    loadCategories();
    updateCart();
    startSaleTimer();
    
    // Slider boshlash
    startSlider();
    
    // Event listener'lar
    setupEventListeners();
    
    // Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    }
}

// Event listener'lar
function setupEventListeners() {
    // Savat tugmasi
    DOM.cartBtn?.addEventListener('click', showCartModal);
    
    // Modal yopish
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Modal tashqarisi
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Qidiruv
    DOM.searchInput?.addEventListener('input', handleSearch);
    DOM.searchClear?.addEventListener('click', clearSearch);
    
    // Saralash
    DOM.sortSelect?.addEventListener('change', handleSortChange);
    
    // Yuklash tugmasi
    DOM.loadMoreBtn?.addEventListener('click', loadMoreProducts);
    
    // Kategoriyalar
    DOM.categoriesLink?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.categories-section')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Profil
    DOM.profileLink?.addEventListener('click', (e) => {
        e.preventDefault();
        DOM.profileModal?.classList.add('active');
    });
    
    // Savatni tozalash
    DOM.clearCartBtn?.addEventListener('click', clearCart);
    
    // Buyurtma berish
    DOM.checkoutBtn?.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification("Savat bo'sh!", "error");
            return;
        }
        DOM.cartModal?.classList.remove('active');
        DOM.orderModal?.classList.add('active');
        updateOrderSummary();
    });
    
    // Hozir xarid qilish
    DOM.shopNowBtn?.addEventListener('click', () => {
        DOM.cartModal?.classList.remove('active');
        document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Buyurtma formasi
    DOM.orderForm?.addEventListener('submit', handleOrderSubmit);
    
    // Mavzuni o'zgartirish
    DOM.themeToggle?.addEventListener('click', CONFIG.toggleTheme);
    
    // Ovozli qidiruv
    DOM.voiceBtn?.addEventListener('click', startVoiceSearch);
    
    // Tezkor teglar
    DOM.quickTags?.forEach(tag => {
        tag.addEventListener('click', () => {
            const searchTerm = tag.dataset.tag;
            DOM.searchInput.value = searchTerm;
            handleSearch();
        });
    });
    
    // Kategoriya kartalari
    DOM.categoryCards?.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterByCategory(category);
        });
    });
    
    // Slider nuqtalari
    DOM.sliderDots?.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
}

// Mahsulotlarni yuklash
function loadProducts() {
    const filtered = filterProducts(currentCategory, currentSearch, currentSort);
    const productsToShow = filtered.slice(0, 8); // Faqat birinchi 8 tasi
    
    if (DOM.productsGrid) {
        if (filtered.length === 0) {
            DOM.productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>Mahsulot topilmadi</h3>
                    <p>Boshqa so'z yoki kategoriya bilan qidiring</p>
                </div>
            `;
            DOM.loadMoreBtn?.classList.add('hidden');
            return;
        }
        
        DOM.productsGrid.innerHTML = productsToShow.map(product => 
            createProductCard(product, 'grid')
        ).join('');
        
        // Savatga qo'shish tugmalari
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.id);
                addToCart(productId);
                e.stopPropagation();
            });
        });
        
        // Mahsulot kartalariga click
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.add-to-cart-btn')) {
                    const productId = parseInt(card.dataset.id);
                    showProductDetails(productId);
                }
            });
        });
        
        // Yuklash tugmasini ko'rsatish
        DOM.loadMoreBtn?.classList.toggle('hidden', filtered.length <= 8);
    }
}

// Aksiya mahsulotlarini yuklash
function loadFeaturedProducts() {
    const featured = getFeaturedProducts();
    
    if (DOM.featuredProducts && featured.length > 0) {
        DOM.featuredProducts.innerHTML = featured.map(product => 
            createProductCard(product, 'scroll')
        ).join('');
        
        // Aksiya mahsulotlariga ham event listener qo'shish
        document.querySelectorAll('.product-card-scroll .add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.id);
                addToCart(productId);
                e.stopPropagation();
            });
        });
    }
}

// Kategoriyalarni yuklash
function loadCategories() {
    // Kategoriyalar allaqachon HTML da mavjud
    // Faqat event listener'lar ishga tushiriladi
}

// Savatga qo'shish
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showNotification("Bu mahsulotdan ko'proq qolmagan!", "warning");
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.salePrice || product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveToStorage('cart', cart);
    updateCart();
    showNotification(`${product.name} savatga qo'shildi!`);
    
    // Tugma animatsiyasi
    const btn = document.querySelector(`.add-to-cart-btn[data-id="${productId}"]`);
    if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.background = '#4cd964';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-cart-plus"></i>';
            btn.style.background = '';
        }, 1000);
    }
}

// Savatni yangilash
function updateCart() {
    // Mahsulotlar soni
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (DOM.cartCount) {
        DOM.cartCount.textContent = totalItems;
    }
    
    // Jami narx
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + CONFIG.DELIVERY_PRICE;
    
    if (DOM.cartSummary) {
        document.getElementById('cart-subtotal')?.textContent = formatPrice(subtotal);
        document.getElementById('cart-total')?.textContent = formatPrice(total);
    }
    
    // Savat bo'shligini tekshirish
    const isEmpty = cart.length === 0;
    if (DOM.cartEmpty) DOM.cartEmpty.style.display = isEmpty ? 'block' : 'none';
    if (DOM.cartItems) DOM.cartItems.style.display = isEmpty ? 'none' : 'block';
    if (DOM.cartSummary) DOM.cartSummary.style.display = isEmpty ? 'none' : 'block';
    
    // Savatdagi mahsulotlarni ko'rsatish
    if (!isEmpty && DOM.cartItems) {
        DOM.cartItems.innerHTML = cart.map(item => 
            createCartItem(getProductById(item.id), item.quantity)
        ).join('');
        
        // Miqdor tugmalari
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.id);
                if (e.currentTarget.classList.contains('increase')) {
                    updateCartQuantity(productId, 1);
                } else {
                    updateCartQuantity(productId, -1);
                }
            });
        });
        
        // O'chirish tugmalari
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.id);
                removeFromCart(productId);
            });
        });
    }
}

// Savat miqdorini yangilash
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    const product = getProductById(productId);
    if (!product) return;
    
    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    if (newQuantity > product.stock) {
        showNotification(`Faqat ${product.stock} ta qolgan!`, "warning");
        return;
    }
    
    item.quantity = newQuantity;
    saveToStorage('cart', cart);
    updateCart();
}

// Savatdan o'chirish
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveToStorage('cart', cart);
    updateCart();
    showNotification("Mahsulot savatdan o'chirildi", "warning");
}

// Savatni tozalash
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm("Savatni tozalashni istaysizmi?")) {
        cart = [];
        saveToStorage('cart', cart);
        updateCart();
        showNotification("Savat tozalandi", "success");
    }
}

// Savat modali
function showCartModal() {
    updateCart();
    DOM.cartModal?.classList.add('active');
}

// Qidiruv
function handleSearch() {
    currentSearch = DOM.searchInput?.value || '';
    DOM.searchClear?.style.display = currentSearch ? 'block' : 'none';
    
    // 500ms debounce
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        loadProducts();
    }, 500);
}

// Qidiruvni tozalash
function clearSearch() {
    if (DOM.searchInput) {
        DOM.searchInput.value = '';
        DOM.searchClear.style.display = 'none';
        currentSearch = '';
        loadProducts();
    }
}

// Saralash
function handleSortChange() {
    currentSort = DOM.sortSelect?.value || 'popular';
    loadProducts();
}

// Kategoriya bo'yicha filtrlash
function filterByCategory(category) {
    currentCategory = category;
    
    // Kategoriya tugmalarini yangilash
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.toggle('active', card.dataset.category === category);
    });
    
    loadProducts();
    
    // Kategoriya bo'limiga scroll
    document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' });
}

// Ko'proq mahsulot yuklash
function loadMoreProducts() {
    if (isLoading) return;
    
    isLoading = true;
    const filtered = filterProducts(currentCategory, currentSearch, currentSort);
    const currentlyShowing = DOM.productsGrid?.children.length || 0;
    const nextProducts = filtered.slice(currentlyShowing, currentlyShowing + 4);
    
    if (nextProducts.length === 0) {
        DOM.loadMoreBtn?.classList.add('hidden');
        isLoading = false;
        return;
    }
    
    // Yuklash animatsiyasi
    DOM.loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuklanmoqda...';
    
    setTimeout(() => {
        nextProducts.forEach(product => {
            const card = createProductCard(product, 'grid');
            DOM.productsGrid?.insertAdjacentHTML('beforeend', card);
        });
        
        // Yangi kartalarga event listener qo'shish
        document.querySelectorAll('.product-card .add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.id);
                addToCart(productId);
                e.stopPropagation();
            });
        });
        
        DOM.loadMoreBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Ko\'proq ko\'rsatish';
        isLoading = false;
        
        // Agar barcha mahsulotlar ko'rsatilgan bo'lsa
        if (currentlyShowing + nextProducts.length >= filtered.length) {
            DOM.loadMoreBtn?.classList.add('hidden');
        }
    }, 1000);
}

// Ovozli qidiruv
function startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showNotification("Ovozli qidiruv brauzeringizda qo'llab-quvvatlanmaydi", "error");
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'uz-UZ';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.start();
    
    DOM.voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
    DOM.voiceBtn.style.background = '#ff6b6b';
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (DOM.searchInput) {
            DOM.searchInput.value = transcript;
            handleSearch();
        }
    };
    
    recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
        showNotification("Ovozni taniy olmadim", "error");
    };
    
    recognition.onend = () => {
        DOM.voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        DOM.voiceBtn.style.background = '';
    };
}

// Slider
function startSlider() {
    setInterval(() => {
        nextSlide();
    }, 5000);
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide]?.classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
    
    if (DOM.sliderContainer) {
        DOM.sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide]?.classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
    
    if (DOM.sliderContainer) {
        DOM.sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// Aksiya vaqtini hisoblash
function startSaleTimer() {
    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999);
    
    function updateTimer() {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            document.getElementById('sale-timer')?.textContent = "00:00:00";
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const timerString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const timerElement = document.getElementById('sale-timer');
        if (timerElement) {
            timerElement.textContent = timerString;
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Buyurtma xulosasini yangilash
function updateOrderSummary() {
    const itemsElement = document.getElementById('order-summary-items');
    const totalElement = document.getElementById('order-total-price');
    
    if (!itemsElement || !totalElement) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + CONFIG.DELIVERY_PRICE;
    
    itemsElement.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} x${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    itemsElement.innerHTML += `
        <div class="summary-item">
            <span>Yetkazib berish</span>
            <span>${formatPrice(CONFIG.DELIVERY_PRICE)}</span>
        </div>
    `;
    
    totalElement.textContent = formatPrice(total);
}

// Buyurtmani yuborish
async function handleOrderSubmit(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        showNotification("Savat bo'sh!", "error");
        return;
    }
    
    const orderData = {
        name: document.getElementById('order-name')?.value || '',
        phone: document.getElementById('order-phone')?.value || '',
        address: document.getElementById('order-address')?.value || '',
        city: document.getElementById('order-city')?.value || '',
        deliveryTime: document.getElementById('order-time')?.value || '',
        payment: document.querySelector('input[name="payment"]:checked')?.value || 'cash',
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        delivery: CONFIG.DELIVERY_PRICE,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + CONFIG.DELIVERY_PRICE
    };
    
    // Ma'lumotlarni tekshirish
    if (!orderData.name || !orderData.phone || !orderData.address) {
        showNotification("Iltimos, barcha maydonlarni to'ldiring", "error");
        return;
    }
    
    // Telefon raqamini tekshirish
    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(orderData.phone)) {
        showNotification("Iltimos, to'g'ri telefon raqamini kiriting (+998XXXXXXXXX)", "error");
        return;
    }
    
    // Buyurtmani yuborish
    DOM.submitOrderBtn.disabled = true;
    DOM.submitOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
    
    const success = await submitOrder(orderData);
    
    if (success) {
        DOM.orderModal.classList.remove('active');
        cart = [];
        saveToStorage('cart', cart);
        updateCart();
        
        // Formani tozalash
        DOM.orderForm.reset();
        
        showNotification("Buyurtma muvaffaqiyatli qabul qilindi!", "success");
    }
    
    DOM.submitOrderBtn.disabled = false;
    DOM.submitOrderBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Buyurtmani tasdiqlash';
}

// Mahsulot tafsilotlari
function showProductDetails(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    // Bu yerda mahsulot tafsilotlari modalini ochish kerak
    // Soddaligi uchun alert qo'lladik
    const message = `
        🎮 ${product.name}
        
        💰 Narx: ${formatPrice(product.salePrice || product.price)}
        ${product.salePrice ? `~~${formatPrice(product.price)}~~ (${Math.round((1 - product.salePrice/product.price)*100)}% chegirma)` : ''}
        
        📝 Tavsif: ${product.description}
        
        ⭐ Reyting: ${product.rating}/5
        📦 Omborda: ${product.stock} ta
        🏷️ Teglar: ${product.tags.join(', ')}
        
        ✨ Xususiyatlar:
        ${product.features.map(f => `• ${f}`).join('\n')}
    `;
    
    alert(message);
}

// Dasturni ishga tushirish
document.addEventListener('DOMContentLoaded', initApp);
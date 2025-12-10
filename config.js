// Telegram Web App sozlamalari
const tg = window.Telegram.WebApp;

// App konfiguratsiyasi
const CONFIG = {
    APP_NAME: "KIDDY TOYS",
    CURRENCY: "so'm",
    DELIVERY_PRICE: 15000,
    MIN_ORDER: 50000,
    TAX_RATE: 0.12,
    
    // Telegram sozlamalari
    BOT_TOKEN: "", // BotFather bergan token
    ADMIN_ID: "", // Admin Telegram ID raqami
    
    // API endpoints
    API_BASE_URL: "https://api.example.com",
    
    // Rasmlar
    IMAGE_BASE_URL: "https://images.unsplash.com/photo-",
    
    // Mavzular
    THEMES: {
        light: {
            primary: '#ff6b6b',
            secondary: '#36d1dc',
            bg: '#ffffff',
            text: '#2c3e50'
        },
        dark: {
            primary: '#ff8e53',
            secondary: '#5b86e5',
            bg: '#1a1d28',
            text: '#ffffff'
        }
    },
    
    // Telegram Web App ni ishga tushirish
    initTelegram: function() {
        if (!tg) {
            console.warn("Telegram Web App not detected");
            return;
        }
        
        tg.expand();
        tg.MainButton.hide();
        tg.BackButton.hide();
        
        // Foydalanuvchi ma'lumotlarini olish
        const user = tg.initDataUnsafe.user;
        if (user) {
            console.log("Telegram user:", user);
            
            // Foydalanuvchi ma'lumotlarini saqlash
            this.saveUserData(user);
            
            // Formani avtomatik to'ldirish
            this.autoFillUserData(user);
        }
        
        // Mavzuni sozlash
        this.setThemeFromStorage();
    },
    
    // Foydalanuvchi ma'lumotlarini saqlash
    saveUserData: function(user) {
        const userData = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            languageCode: user.language_code
        };
        
        localStorage.setItem('kiddy_user', JSON.stringify(userData));
    },
    
    // Formani avtomatik to'ldirish
    autoFillUserData: function(user) {
        setTimeout(() => {
            const nameField = document.getElementById('order-name');
            if (nameField) {
                nameField.value = `${user.first_name || ''} ${user.last_name || ''}`.trim();
            }
            
            // Profil ma'lumotlarini yangilash
            this.updateProfileInfo(user);
        }, 1000);
    },
    
    // Profil ma'lumotlarini yangilash
    updateProfileInfo: function(user) {
        const userName = document.getElementById('user-name');
        if (userName && user.first_name) {
            userName.textContent = `${user.first_name} ${user.last_name || ''}`.trim();
        }
    },
    
    // Mavzuni localStorage dan o'qish
    setThemeFromStorage: function() {
        const savedTheme = localStorage.getItem('kiddy_theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Tugma ikonkasini o'zgartirish
        const themeIcon = document.getElementById('theme-toggle');
        if (themeIcon) {
            themeIcon.innerHTML = savedTheme === 'dark' 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
    },
    
    // Mavzuni o'zgartirish
    toggleTheme: function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('kiddy_theme', newTheme);
        
        // Tugma ikonkasini yangilash
        const themeIcon = document.getElementById('theme-toggle');
        if (themeIcon) {
            themeIcon.innerHTML = newTheme === 'dark' 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
    }
};

// Formatlash funksiyalari
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + CONFIG.CURRENCY;
}

function formatPhone(phone) {
    return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
}

// Xabar ko'rsatish
function showNotification(message, type = "success") {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notification-text');
    const icon = notification.querySelector('i');
    
    // Ikonka va rangni o'zgartirish
    if (type === "error") {
        notification.style.background = CONFIG.THEMES[document.documentElement.getAttribute('data-theme') || 'light'].primary;
        icon.className = "fas fa-exclamation-circle";
    } else if (type === "warning") {
        notification.style.background = "#ffcc00";
        icon.className = "fas fa-exclamation-triangle";
    } else {
        notification.style.background = "#4cd964";
        icon.className = "fas fa-check-circle";
    }
    
    text.textContent = message;
    notification.classList.add('show');
    
    // Ovozli bildirishnoma
    const sound = document.getElementById('notification-sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Xabarni yashirish
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Yuklash ko'rsatkichi
function showLoader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.remove('hidden');
    }
}

function hideLoader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    }
}

// Saqlash funksiyalari
function saveToStorage(key, data) {
    try {
        localStorage.setItem(`kiddy_${key}`, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error("LocalStorage error:", e);
        return false;
    }
}

function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(`kiddy_${key}`);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("LocalStorage error:", e);
        return null;
    }
}

// Telegram orqali xabar yuborish
async function sendToTelegram(message, chatId = CONFIG.ADMIN_ID) {
    if (!CONFIG.BOT_TOKEN || !chatId) {
        console.log("Telegram message (simulated):", message);
        return true;
    }
    
    try {
        const url = `https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error("Telegram API error:", error);
        return false;
    }
}

// Buyurtmani yuborish
async function submitOrder(orderData) {
    showLoader();
    
    try {
        // Ma'lumotlarni tayyorlash
        const orderSummary = {
            ...orderData,
            timestamp: new Date().toISOString(),
            orderId: 'ORD-' + Date.now()
        };
        
        // LocalStorage ga saqlash
        const orders = loadFromStorage('orders') || [];
        orders.push(orderSummary);
        saveToStorage('orders', orders);
        
        // Telegramga xabar yuborish
        const message = `🛍️ <b>YANGI BUYURTMA #${orderSummary.orderId}</b>\n\n` +
                       `👤 <b>Mijoz:</b> ${orderData.name}\n` +
                       `📞 <b>Telefon:</b> ${orderData.phone}\n` +
                       `📍 <b>Manzil:</b> ${orderData.address}, ${orderData.city}\n` +
                       `⏰ <b>Vaqt:</b> ${orderData.deliveryTime}\n` +
                       `💳 <b>To'lov:</b> ${orderData.payment}\n\n` +
                       `🛒 <b>Mahsulotlar:</b>\n${orderData.items.map(item => 
                           `  • ${item.name} x${item.quantity} - ${formatPrice(item.total)}\n`).join('')}\n` +
                       `🚚 <b>Yetkazish:</b> ${formatPrice(CONFIG.DELIVERY_PRICE)}\n` +
                       `💰 <b>Jami:</b> ${formatPrice(orderData.total)}\n`;
        
        const sent = await sendToTelegram(message);
        
        if (sent) {
            showNotification("Buyurtma qabul qilindi! Operator tez orada aloqaga chiqadi.", "success");
            
            // Savatni tozalash
            saveToStorage('cart', []);
            
            // Buyurtmalar sonini yangilash
            updateOrdersCount();
            
            return true;
        } else {
            throw new Error("Telegram API error");
        }
        
    } catch (error) {
        console.error("Order submission error:", error);
        showNotification("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.", "error");
        return false;
    } finally {
        hideLoader();
    }
}

// Buyurtmalar sonini yangilash
function updateOrdersCount() {
    const orders = loadFromStorage('orders') || [];
    const countElement = document.getElementById('orders-count');
    if (countElement) {
        countElement.textContent = orders.length;
    }
}

// DOM yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    // Telegram Web App ni ishga tushirish
    CONFIG.initTelegram();
    
    // Preloader ni yashirish
    setTimeout(hideLoader, 2000);
    
    // Buyurtmalar sonini ko'rsatish
    updateOrdersCount();
});
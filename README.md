# 🎮 KIDDY O'yinchoq Do'koni - Telegram Web Bot

Zamonaviy, to'liq funksionallikli o'yinchoq do'koni uchun Telegram Web Application.

## 🚀 O'rnatish

### 1. Fayllarni yuklab olish
Yuqoridagi 5 ta faylni yuklab oling:
- `index.html`
- `style.css`
- `config.js`
- `products.js`
- `script.js`

### 2. Hosting ga joylashtirish
**Variant A: GitHub Pages (Tavsiya etiladi)**
1. GitHub da yangi repository oching
2. Barcha fayllarni yuklang
3. Settings > Pages > Source: `main` branch ni tanlang
4. URL manzilingiz: `https://[username].github.io/[repository]`

**Variant B: Netlify (Eng oson)**
1. [netlify.com](https://netlify.com) oching
2. "Drag and drop" bilan fayllarni yuklang
3. URL manzilingiz: `https://[random-name].netlify.app`

### 3. Telegram Bot yaratish
1. Telegramda @BotFather ni oching
2. `/newbot` buyrug'ini yuboring
3. Bot uchun nom va username kiriting
4. Token ni saqlab qo'ying

### 4. Botni Web App ga ulash
BotFather da:
1. `/mybots` buyrug'ini yuboring
2. Botingizni tanlang
3. "Bot Settings" > "Menu Button"
4. URL manziliga hosting manzilingizni kiriting

## ⚙️ Sozlash

`config.js` faylida:
```javascript
BOT_TOKEN: "1234567890:AAHdLx...", // BotFather bergan token
ADMIN_ID: "123456789", // Admin Telegram ID raqami
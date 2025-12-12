# Deployment Instructions

## Production build tayyor!

Build muvaffaqiyatli yaratildi: `dist` papkada

## Deploy qilish uchun 3 ta oson usul:

### 1. Netlify Drop (ENG OSON - 2 daqiqa!) ⚡

1. https://app.netlify.com/drop ga o'ting
2. `dist` papkani drag & drop qiling
3. Tayyor! Link olasiz (masalan: https://your-site-name.netlify.app)

### 2. Netlify CLI orqali:

```bash
cd C:\Users\hhabi\OneDrive\Desktop\mini-marketplacev1
netlify deploy --prod --dir=dist
```

### 3. Vercel CLI orqali:

```bash
npm install -g vercel
cd C:\Users\hhabi\OneDrive\Desktop\mini-marketplacev1
vercel --prod
```

### 4. GitHub + Vercel/Netlify (davomiy deploy):

1. GitHub'ga loyihani push qiling:
```bash
git init
git add .
git commit -m "Initial commit: Mini Marketplace React app"
git remote add origin https://github.com/username/mini-marketplace.git
git push -u origin main
```

2. Vercel yoki Netlify'da:
   - "Import from GitHub" tugmasini bosing
   - Repository'ni tanlang
   - Avtomatik deploy boshlandi!

---

## Tayyor fayllar:

✅ `dist/` - Production build
✅ `vercel.json` - Vercel konfiguratsiya
✅ `netlify.toml` - Netlify konfiguratsiya
✅ `.gitignore` - Git uchun

---

## Demo URL:

Deploy qilganingizdan keyin, shu yerga link qo'ying:

**Live Demo:** [Coming soon...]

---

## Local preview:

```bash
npm run preview
```

Bu local'da production versiyani ko'rsatadi: http://localhost:4173

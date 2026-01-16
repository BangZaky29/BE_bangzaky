# 📦 Installation Steps - BE_bangzaky

Ikuti langkah-langkah ini secara berurutan untuk setup backend API.

## ✅ Checklist Installation

### Step 1: Persiapan Folder
```bash
cd C:\codingVibes\myPortfolio
mkdir BE_bangzaky
cd BE_bangzaky
```
- [ ] Folder `BE_bangzaky` sudah dibuat

### Step 2: Initialize npm
```bash
npm init -y
```
- [ ] File `package.json` terbentuk

### Step 3: Install Dependencies
```bash
npm install express mysql2 dotenv cors body-parser
npm install --save-dev nodemon
```
- [ ] Dependencies terinstall
- [ ] Folder `node_modules` terbentuk

### Step 4: Buat Struktur Folder
```bash
mkdir src
cd src
mkdir config controllers routes middleware
cd ..
```

Struktur yang harus terbentuk:
```
BE_bangzaky/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   └── middleware/
├── node_modules/
└── package.json
```
- [ ] Semua folder terbentuk

### Step 5: Buat File `.env`
Buat file `.env` di root folder (`BE_bangzaky/.env`):

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=myPortfolio
DB_PORT=3306

CORS_ORIGIN=http://localhost:3000
```

**⚠️ PENTING:** Sesuaikan `DB_USER` dan `DB_PASSWORD` dengan konfigurasi MySQL Anda!

- [ ] File `.env` sudah dibuat
- [ ] Credentials database sudah benar

### Step 6: Buat File `.gitignore`
Buat file `.gitignore` di root folder:

```
node_modules/
.env
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.vscode/
.idea/
```
- [ ] File `.gitignore` sudah dibuat

### Step 7: Copy File-file Project

#### 7.1 File di Root
Copy file-file ini ke folder `BE_bangzaky/`:
- [ ] `server.js` (entry point)
- [ ] `package.json` (update dengan scripts)
- [ ] `README.md` (dokumentasi)
- [ ] `api.test.http` (untuk testing, optional)

#### 7.2 File di `src/config/`
- [ ] `database.js`

#### 7.3 File di `src/controllers/`
- [ ] `templateController.js`
- [ ] `userController.js`
- [ ] `purchaseController.js`
- [ ] `bankInfoController.js`

#### 7.4 File di `src/routes/`
- [ ] `templateRoutes.js`
- [ ] `userRoutes.js`
- [ ] `purchaseRoutes.js`
- [ ] `bankInfoRoutes.js`

#### 7.5 File di `src/middleware/`
- [ ] `errorHandler.js`

#### 7.6 File di `src/`
- [ ] `app.js`

### Step 8: Update package.json
Pastikan `package.json` memiliki scripts ini:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```
- [ ] Scripts sudah ditambahkan

### Step 9: Verifikasi Database
Pastikan:
- [ ] MySQL/MariaDB sudah berjalan
- [ ] Database `myPortfolio` sudah ada
- [ ] Tables sudah dibuat (users, templates, purchases, dll)
- [ ] Ada sample data di database

Cek dengan query:
```sql
USE myPortfolio;
SHOW TABLES;
SELECT * FROM templates;
```

### Step 10: Test Run Server

#### Development Mode (dengan auto-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

Cek output console:
```
✅ Database connected successfully
🚀 Server is running on port 5000
📍 Environment: development
🌐 API Base URL: http://localhost:5000/api
```

- [ ] Server berjalan tanpa error
- [ ] Database connected successfully
- [ ] Port 5000 terbuka

### Step 11: Test API Endpoints

#### Test dengan Browser:
Buka browser dan akses:
```
http://localhost:5000
```
Harus return JSON response dengan daftar endpoints.

```
http://localhost:5000/api/templates
```
Harus return semua templates dari database.

- [ ] Health check endpoint works
- [ ] Templates endpoint returns data

#### Test dengan curl:
```bash
# Get all templates
curl http://localhost:5000/api/templates

# Get all users
curl http://localhost:5000/api/users

# Get all purchases
curl http://localhost:5000/api/purchases
```
- [ ] All GET endpoints working

#### Test POST request:
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"testuser@example.com"}'
```
- [ ] POST endpoint working

### Step 12: Install REST Client (Optional)
Jika menggunakan VS Code:

1. Install extension "REST Client" 
2. Buka file `api.test.http`
3. Click "Send Request" di atas setiap request
4. Lihat response di panel sebelah

- [ ] REST Client terinstall (optional)
- [ ] Bisa test API lewat VS Code

---

## 🎉 Installation Complete!

Jika semua checklist ✅, maka backend API sudah siap digunakan!

## 🧪 Quick Tests

Test semua endpoint utama:

```bash
# 1. Templates
curl http://localhost:5000/api/templates

# 2. Users
curl http://localhost:5000/api/users

# 3. Purchases
curl http://localhost:5000/api/purchases

# 4. Bank Info
curl http://localhost:5000/api/bank-info

# 5. Get specific template
curl http://localhost:5000/api/templates/1

# 6. Create user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"New User","email":"newuser@example.com"}'
```

## 🐛 Troubleshooting

### Port 5000 already in use
Ubah port di `.env`:
```env
PORT=3001
```

### Database connection failed
1. Check MySQL/MariaDB running
2. Verify credentials di `.env`
3. Check database `myPortfolio` exists
4. Check user permissions

### Module not found
```bash
rm -rf node_modules
npm install
```

### EACCES permission denied
Windows: Run CMD as Administrator
Linux/Mac:
```bash
sudo npm install
```

---

## 📚 Next Steps

1. ✅ Backend API running
2. 🔄 Integrate dengan Frontend
3. 🔐 Add Authentication (JWT)
4. 📝 Add Input Validation
5. 📸 Implement File Upload
6. 🔍 Add Search & Pagination
7. 🚀 Deploy to Production

---

## 🆘 Need Help?

Jika ada masalah:
1. Check console output untuk error messages
2. Verify semua file sudah di-copy dengan benar
3. Check database connection
4. Review `.env` configuration
5. Restart server setelah perubahan

**Happy Coding! 🚀**
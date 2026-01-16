# BE_bangzaky - Backend API

Backend API untuk BangZaky Portfolio Template Store menggunakan Node.js, Express, dan MySQL (MariaDB).

## 📋 Prerequisites

- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- MySQL/MariaDB
- Database `myPortfolio` sudah dibuat dan berisi data

## 🚀 Quick Start

### 1. Clone/Setup Project

```bash
cd C:\codingVibes\myPortfolio
mkdir BE_bangzaky
cd BE_bangzaky
```

### 2. Initialize Project

```bash
npm init -y
```

### 3. Install Dependencies

```bash
npm install express mysql2 dotenv cors body-parser
npm install --save-dev nodemon
```

### 4. Buat Struktur Folder

```bash
mkdir src
cd src
mkdir config controllers routes middleware
cd ..
```

### 5. Setup Environment Variables

Buat file `.env` di root folder dengan isi:

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

**Sesuaikan DB_USER dan DB_PASSWORD dengan konfigurasi MySQL Anda!**

### 6. Copy Semua File

Copy semua file yang sudah saya berikan ke dalam folder yang sesuai:

```
BE_bangzaky/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── bankInfoController.js
│   │   ├── purchaseController.js
│   │   ├── templateController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── bankInfoRoutes.js
│   │   ├── purchaseRoutes.js
│   │   ├── templateRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

### 7. Update package.json

Tambahkan scripts di `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### 8. Run Server

**Development mode dengan auto-reload:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server akan berjalan di `http://localhost:5000`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Available Endpoints

#### Templates
- `GET /api/templates` - Get all templates (with filters)
- `GET /api/templates/:id` - Get template by ID
- `POST /api/templates` - Create new template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template

#### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID (with purchases)
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### Purchases
- `GET /api/purchases` - Get all purchases
- `GET /api/purchases/:id` - Get purchase by ID
- `GET /api/purchases/user/:userId` - Get purchases by user
- `POST /api/purchases` - Create new purchase
- `DELETE /api/purchases/:id` - Delete purchase

#### Bank Info
- `GET /api/bank-info` - Get all bank info
- `GET /api/bank-info/:id` - Get bank info by ID
- `POST /api/bank-info` - Create bank info
- `PUT /api/bank-info/:id` - Update bank info
- `DELETE /api/bank-info/:id` - Delete bank info

## 🧪 Testing

### Menggunakan curl

```bash
# Get all templates
curl http://localhost:5000/api/templates

# Get template by ID
curl http://localhost:5000/api/templates/1

# Create user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

### Menggunakan Postman/Thunder Client

1. Import collection atau buat request baru
2. Set base URL: `http://localhost:5000/api`
3. Untuk POST/PUT, set header `Content-Type: application/json`
4. Test semua endpoint

## 📂 Project Structure

```
BE_bangzaky/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── app.js          # Express app setup
├── server.js           # Entry point
├── .env               # Environment variables
└── package.json       # Dependencies
```

## 🔧 Configuration

### Database Connection

Edit `src/config/database.js` jika perlu custom configuration.

### CORS Settings

Edit di `.env` untuk mengatur allowed origins:

```env
CORS_ORIGIN=http://localhost:3000
```

Atau set `*` untuk allow all origins (development only):

```env
CORS_ORIGIN=*
```

## 🐛 Troubleshooting

### Port Already in Use

Jika port 5000 sudah digunakan, ubah di `.env`:

```env
PORT=3001
```

### Database Connection Failed

1. Pastikan MySQL/MariaDB berjalan
2. Check credentials di `.env`
3. Pastikan database `myPortfolio` sudah dibuat
4. Pastikan user punya akses ke database

### Module Not Found

Install ulang dependencies:

```bash
rm -rf node_modules
npm install
```

## 📝 Development Notes

- Gunakan `npm run dev` untuk development dengan auto-reload
- Semua response menggunakan format JSON
- Error handling sudah diimplementasi
- Database transaction digunakan untuk operasi kompleks
- CORS enabled untuk frontend integration

## 🎯 Next Steps

1. Integrate dengan frontend
2. Tambah authentication (JWT)
3. Tambah validation middleware
4. Implement file upload untuk images
5. Add pagination untuk list endpoints
6. Add search functionality
7. Implement rate limiting

## 👨‍💻 Author

**Zaky Aulia Qolbi**
- Email: admin@bangzaky.dev

## 📄 License

ISC"# BE_bangzaky" 

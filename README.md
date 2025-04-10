# 🎸 Rockin' Records

Rockin' Records is a full-stack music collection manager where users can browse, search, and contribute to a growing digital vinyl archive. Built collaboratively with Express, PostgreSQL, and Sequelize, the app helps music lovers keep track of artists, albums, and more.

## 🚀 Features

- 🧠 View and search vinyl records by artist, album, merchant, or year
- ➕ Add new records to the collection
- 🔎 Search records with instant filtering
- 🌐 API integration (e.g., tour dates - optional/coming soon)
- 📦 Persistent backend using PostgreSQL and Sequelize ORM

## 🛠️ Tech Stack

- **Frontend**: Handled in client repo using React
- **Backend**: Node.js, Express, Sequelize
- **Database**: PostgreSQL
- **Environment**: TypeScript, dotenv, nodemon, sequelize-cli

## 🌍 Live Demo

Check out the deployed app here 👉 [Rockin' Records on Render](https://project2-rockinrecords.onrender.com)

> ⚠️ _May take a few seconds to load on first launch due to free-tier server spin-up._


## 🖼 Screenshots

### 🔐 Login Page
<img src="assets/login-screenshot.png" alt="Login Page Screenshot" width="600" />

### 📚 Current Library View
<img src="assets/library-screenshot.png" alt="Library Screenshot" width="600" />




## 🧪 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/LiebeAnnette/Project2-RockinRecords.git
cd Project2-RockinRecords/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your `.env`

```bash
DB_NAME=YOUR_DB_NAME
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=YOUR_SECRET_KEY

```

Or edit `config/config.json` if using that instead of `.env`.

### Demo Login

- **Username**: `testuser`
- **Password**: `test1234`

> ⚠️ _Your browser may warn that this password is commonly used — this is expected in demo environments._

### 4. Create the database

```bash
psql -U your_username -f schema.sql
```

### 5. Run migrations

```bash
npx sequelize-cli db:migrate
```

### 6. Start the server

```bash
npm run dev
```

> Server will run at: `http://localhost:5000`

## 🧑‍🤝‍🧑 Collaborators

- [@LiebeAnnette](https://github.com/LiebeAnnette)
- [@MinaDraper-Hammond](https://github.com/VampMina528)
- [@MattBloch](https://github.com/MattB-ks)
- [@FischerAlmanza](https://github.com/Falmanza94)

## 📌 Future Features

- Connections to BandsInTown for possible tour dates
- Full collection of vinyl added to database
- Full track and/or album listening capability
- Wishlist of vinyl page
- Mobile responsiveness
- Album artwork and metadata via external APIs

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

# 🎸 Rockin' Records
<!-- README IN PROGRESS - MINA -->
Rockin' Records is a full-stack music collection manager where users can browse, search, and contribute to a growing digital vinyl archive. Built collaboratively with Express, PostgreSQL, and Sequelize, the app helps music lovers keep track of artists, albums, and more.

## 🚀 Features

- 🧠 View and search vinyl records by artist, album, merchant, or year
- ➕ Add new records to the collection
- 🔎 Search records with instant filtering
- 🌐 API integration (e.g., tour dates - optional/coming soon)
- 📦 Persistent backend using PostgreSQL and Sequelize ORM

## 🛠️ Tech Stack

- **Frontend**: (Coming soon / handled in client repo)
- **Backend**: Node.js, Express, Sequelize
- **Database**: PostgreSQL
- **Environment**: TypeScript, dotenv, nodemon, sequelize-cli


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
DB_NAME=myvinyl_db
DB_USER=your_username
DB_PASSWORD=your_password
```

Or edit `config/config.json` if using that instead of `.env`.

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
- [@YourGitHubUsernameHere](#) <!-- Add yourself here or list teammates -->

## 📌 Future Features

- User authentication (JWT)
- Frontend React integration
- Mobile responsiveness
- Album artwork and metadata via external APIs

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).


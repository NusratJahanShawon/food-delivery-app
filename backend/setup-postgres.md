# PostgreSQL Setup for Strapi v4

## Prerequisites
1. PostgreSQL installed and running on your system
2. A database user with appropriate permissions

## Database Setup
1. Create a new database:
```sql
CREATE DATABASE food_delivery;
```

2. Create a user (if not exists):
```sql
CREATE USER postgres WITH PASSWORD 'your_password_here';
GRANT ALL PRIVILEGES ON DATABASE food_delivery TO postgres;
```

## Environment Configuration
1. Create a `.env` file in the backend directory
2. Copy the contents from `config/env.example`
3. Update the following values:
   - `DATABASE_PASSWORD`: Your actual PostgreSQL password
   - `JWT_SECRET`: Generate a random string (32+ characters)
   - `ADMIN_JWT_SECRET`: Generate another random string (32+ characters)
   - `API_TOKEN_SALT`: Generate another random string (32+ characters)
   - `APP_KEYS`: Generate 4 random strings separated by commas

## Generate Random Secrets
You can use this command to generate random strings:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Start Strapi
After setting up the `.env` file:
```bash
npm run develop
```

## Access Admin Panel
- URL: http://localhost:1337/admin
- Create your first admin user when prompted

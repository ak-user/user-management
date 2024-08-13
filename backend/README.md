# User Management Backend

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup environment variables**:
   
   Create a .env file in the root directory and configure your environment variables. Example:
   ```bash
    NODE_ENV=development
    PORT=5000
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=myuser
    DB_PASSWORD=password
    DB_NAME=yourdbname
   ```
   
3. **Build and Start the DB Container**:
   ```bash
    docker-compose up --build
   ```

4. **Steps or commands to start the application. Example**:
   ```bash
    npm start
   ```

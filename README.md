# DEVTECTIVE
## Setup Instructions

### 1. Install Dependencies

Run the following command to install both frontend and backend dependencies:

```bash
npm run setup-project
```

### 2. Set Environment Variables

Before starting the servers, make sure to set the following environment variables:
* **MONGO_URL**: Your MongoDB connection string.
* **JWT_SECRET**: Your secret key for JWT token generation.

### 3. Start Development Server

After setting the environment variables, start the development server for both frontend and backend concurrently (make sure you're in the root directory):

```bash
npm run dev
```

### 4. Access the Application

Once the servers are up and running, you can access the application in your web browser at:

```bash
http://localhost:5173/login
```
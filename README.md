# Social Media Content Scheduler Backend

A Node.js/Express backend application for scheduling and managing social media posts. This API allows users to create, schedule, and automatically publish social media content at specified times.

## Features

- **User Authentication**: Register, login, and logout with JWT-based authentication
- **Post Management**: Create, read, update, and delete social media posts
- **Post Scheduling**: Schedule posts to be published at specific times
- **Automatic Publishing**: Background cron job that automatically publishes posts when scheduled time arrives
- **Dashboard**: Get insights and statistics about your posts
- **Pagination & Filtering**: List posts with pagination support and filter by status
- **Error Handling**: Comprehensive error handling middleware
- **Database**: MongoDB integration for data persistence

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Task Scheduling**: node-cron
- **CORS**: Cross-Origin Resource Sharing enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Asmat-ullah-khan/social-media-content-scheduler.git
   cd social-media-content-scheduler-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/social-media-scheduler
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Start the server**

   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

   The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

- **POST** `/register` - Register a new user
- **POST** `/login` - Login user and receive JWT token
- **POST** `/logout` - Logout user

### Post Routes (`/api/posts`) - _Protected_

- **POST** `/` - Create a new post
- **GET** `/` - List all posts (supports pagination and filtering)
  - Query parameters: `page`, `limit`, `status`
- **GET** `/:id` - Get a specific post
- **PUT** `/:id` - Update a post
- **DELETE** `/:id` - Delete a post

### Dashboard Routes (`/api/dashboard`) - _Protected_

- Dashboard endpoints for viewing statistics and insights

## Project Structure

```
├── app.js                 # Express app configuration
├── server.js              # Server entry point with cron jobs
├── package.json           # Project dependencies
├── vercel.json            # Vercel deployment config
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── user.js            # User authentication logic
│   ├── post.js            # Post management logic
│   └── dashboard.js       # Dashboard logic
├── models/
│   ├── user.js            # User schema
│   ├── post.js            # Post schema
│   └── publicationLog.js  # Publication log schema
├── routes/
│   ├── auth.js            # Auth routes
│   ├── post.js            # Post routes
│   └── dashboard.js       # Dashboard routes
├── services/
│   ├── auth.js            # Authentication service
│   ├── post.js            # Post service
│   ├── dashboard.js       # Dashboard service
│   └── publicationlog.js  # Publication job service
├── middleware/
│   ├── auth.js            # JWT authentication middleware
│   └── errorHandler.js    # Global error handling middleware
├── repository/
│   ├── user.js            # User data operations
│   ├── post.js            # Post data operations
│   └── publicationLog.js  # Publication log data operations
└── utils/
    ├── appError.js        # Custom error class
    ├── catchAsync.js      # Async error wrapper
    └── jwt.js             # JWT utilities
```

## Key Features Explained

### Automatic Post Publishing

The application includes a cron job that runs every minute to check for scheduled posts that need to be published. When a post's scheduled time arrives, it's automatically marked as published.

### Authentication

All post and dashboard endpoints are protected with JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Error Handling

The application uses a custom error handling middleware that catches all errors and returns consistent error responses with appropriate HTTP status codes.

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload (requires nodemon)

## Environment Variables

| Variable      | Description                | Default     |
| ------------- | -------------------------- | ----------- |
| `PORT`        | Server port                | 5000        |
| `MONGODB_URI` | MongoDB connection string  | -           |
| `JWT_SECRET`  | Secret key for JWT signing | -           |
| `JWT_EXPIRE`  | JWT token expiration time  | 7d          |
| `NODE_ENV`    | Environment mode           | development |

## Error Handling

The API returns consistent error responses with the following structure:

```json
{
  "status": "error",
  "message": "Error description",
  "statusCode": 400
}
```

## Security

- JWT tokens for authentication
- Bcryptjs for password hashing
- CORS enabled for cross-origin requests
- Input validation and error handling
- Protected routes with authentication middleware

## Deployment

The project includes a `vercel.json` configuration file for easy deployment to Vercel.

## Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## License

ISC

## Repository

[GitHub Repository](https://github.com/Asmat-ullah-khan/social-media-content-scheduler)

## Support

For issues and bug reports, please visit the [Issues Page](https://github.com/Asmat-ullah-khan/social-media-content-scheduler/issues)

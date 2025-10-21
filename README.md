# 48-Hour Social Feed

A temporary social media platform where posts are only visible for 48 hours. Built with Express.js, MongoDB, and featuring real-time password validation using a custom npm library.

## Student Project Disclaimer

This is a project made entirely by me, Alex Palm, for the university course 1DV610 at Linneuniversitetet. If you were to use this application, use it with caution. However, feel free to let me know if there are improvements to be made through the available communication channels here.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Custom Password Validator](#custom-password-validator)
- [License](#license)

## Features

- **User Authentication**
  - JWT-based authentication with HTTP-only cookies
  - Secure password validation with 11 different rules
  - Real-time password strength feedback during registration
  - Visual checklist showing which password requirements are met
  - Auto-redirect already logged-in users from login/register pages

- **Ephemeral Posts**
  - Posts automatically disappear after 48 hours
  - Create posts up to 280 characters
  - View all recent posts in a chronological feed
  - Posts display username, timestamp, and like count

- **Social Interaction**
  - Like posts from any user
  - Real-time like count updates
  - Sticky header showing logged-in username

- **Security**
  - JWT tokens with 2-day expiration
  - Protected routes requiring authentication
  - Password validation against common patterns and blacklists
  - HTTP-only cookies to prevent XSS attacks

## Tech Stack

**Backend:**
- Node.js with Express 5
- MongoDB with Mongoose ODM
- JWT for authentication
- Custom password-validator-ap library (npm package)

**Frontend:**
- EJS templating
- Vanilla JavaScript (ES6 modules)
- CSS3 with custom styling

**Development:**
- ESLint for code quality
- Jest for testing
- Vercel for deployment

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Hoohaaw/Lab_3.git
cd Lab_3
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
NODE_ENV=development
```

**Required:**
- `DB_CONNECTION_STRING` - MongoDB connection string
- `JWT_SECRET` - Secret key for signing JWT tokens

**Optional:**
- `PORT` - Server port (defaults to 3000)
- `NODE_ENV` - Set to "production" for production builds

## Running the Application

**Development:**
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Testing

Atomatic testing WILL done with the Jest framework using ES modules. 
Manual testing is done for graphical elements & interactions.

**Automated Tests:**
- Unit tests for core functionality
- Run with `npm test`

**Manual Testing:**
Manual testing is recommended for:
- Password feedback on register page (real-time validation UI)
- Post creation on feed page
- Like functionality
- Header navigation

## Deployment

This application is configured for deployment on Vercel.

**Vercel Configuration:**
- Serverless function entry point: `api/index.js`
- Database connection caching for serverless environments
- Environment variables must be set in Vercel dashboard

**Deploy to Vercel:**
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables (DB_CONNECTION_STRING, JWT_SECRET)
4. Deploy


## Password Validator

This project uses the npm package [`password-validator-ap`](https://www.npmjs.com/package/password-validator-ap), created as part of the course requirements.

**Password Requirements (11 total):**
1. Must be a valid string
2. Length between 4-120 characters (configurable)
3. Contains uppercase letter
4. Contains lowercase letter
5. Contains at least one number
6. Contains special character (!@#$%^&*)
7. No whitespace allowed
8. Not all same character
9. Password cannot equal username
10. Not a blacklisted password (Admin, Password, User)
11. No sequential patterns (abc, 123, qwerty, etc.)

**Real-time Feedback:**
The registration page provides live visual feedback showing which requirements are met as the user types, with a counter displaying "X / 11 requirements met."

## License

MIT License. See [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) for details.


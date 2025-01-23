# CRM System API

This is the backend API for the CRM system, built using Node.js, Express, Sequelize (for ORM with a SQL database), and JWT authentication. It supports customer management with CRUD operations, user authentication, and filtering of customer data.

## Features

- User Registration and Login with JWT Authentication
- Customer Management (CRUD Operations)
- Filtering customers by name, email, phone, and company
- Pagination for listing customers

## Prerequisites

Before running the project, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/) or a compatible SQL database

## Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/Paro0987/CRM_Backend.git
   cd crm-backend
2. **Install Dependencies**:
   ```
   npm install
3. **Create a .env file at the root of the project and add the following environment variables**:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=Your_DB_Name
   JWT_SECRET=Your_JWT_Secret
   PORT=5000
4. **Run the server**:
   ```
   npm start

  ---
## API Documentation

You can view the API documentation at the following link:

[API Documentation](http://localhost:5000/api-docs)

  ---

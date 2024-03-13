# Job Portal API V1

Welcome to Job Portal API V1, a API solution for managing job listings, user authentication, and candidate interactions in your application.

## Funtionality Overview

- **Job Listings Management**: Easily create, update, and delete job listings.
- **Candidate Interactions**: Streamline candidate interactions with job applications.
- **User Authentication**: Secure authentication and authorization mechanisms


## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing job listings and user data.

## Architectural Design Decisions

- **Vertical Slice Architecture**: Codebase is organized by feature, where each feature spans all layers of the application
- **Database**: **MongoDB** and **Mongoose** for NoSQL Database 
- **Validation**: API route requests undergo validation utilizing **Celebrate** in conjunction with **Joi**
- **Error Handling and Logging**: Error handling is managed through middleware, utilizing **Winston** for logging
- **Authentication**: Implemeneted **Passport** for JWT-based authentication

## Getting Started

To get started with Job Portal API V1, follow these steps:

1. Clone this repository.
2. Install dependencies: `npm install`.
3. Set up your MongoDB database.
4. Configure environment variables (see `.env.example`).
5. Start the server: `npm run start`.

## License

This project is licensed under the [MIT License](LICENSE).

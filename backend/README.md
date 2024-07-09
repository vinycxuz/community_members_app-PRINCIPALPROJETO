# Server Setup Guide

This guide will walk you through the steps to start the server and install the required dependencies.

## Prerequisites
Before starting, make sure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)

## Explanation
The backend using MVC design pattern
In models, we have all the Schemas that we will use in this project
- Category for post
- Comment for post
- Earning for User the each post
- Notification
- Payment for control the payment rulues
- Plan for create a specific plan for each user's rules, like twitch does
- Post
- Profanity
- User

## Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Create a .env and add your credentials

OBS: On feat branch, show the .env real example, just do equal

### Installing Dependencies
To install the required dependencies, run the following command:

```bash
npm install bcrypt bcryptjs cloudinary cors dotenv express express-async-handler jsonwebtoken mongoose multer passport passport-local
```

## Starting the Server
To start the server, run the following command:

```bash
node index
```

The server will start running on the specified port.

## Usage
Once the server is running, you can access the API endpoints to interact with the backend.

## Conclusion
You have successfully started the server and installed the required dependencies. Happy coding!

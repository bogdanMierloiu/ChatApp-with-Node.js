## Chat Application

This is a simple chat application developed for educational purposes using Node.js. The application facilitates communication between users in real-time via web sockets.

# Features
- Real-time messaging: Users can exchange messages instantly.
- Authentication: The application connects to [authorization server](https://github.com/bogdanMierloiu/Spring-Authorization-Server-Implementation) to obtain JWT tokens for user authentication.
- WebSocket communication: Utilizes StompJS client to establish WebSocket connections to the [server](https://github.com/bogdanMierloiu/WebSocket-Server)

# Installation
- Clone the repository: git clone https://github.com/your-username/chat-application.git
- Navigate to the project directory: cd chat-application

# Usage
- Start the application: node app
- Access the application in your web browser at http://localhost:3000
- Log in with your credentials to start chatting.

# Dependencies
- Express: Web framework for Node.js
- StompJS: JavaScript library for interacting with STOMP (Simple Text Oriented Messaging Protocol) servers.


# Configuration
Before running the application, make sure to set up the following configurations:

- Authentication Server: Configure the application to connect to your authentication server to obtain JWT tokens.
- WebSocket Server: Update the WebSocket server details in the application code if necessary.

# Contributing
Contributions are welcome! Feel free to fork the repository, make your changes, and submit a pull request.

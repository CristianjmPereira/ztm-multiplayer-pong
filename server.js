const http = require("http");
const io = require("socket.io");

const apiServer = require("./api");
const httpServer = http.createServer(apiServer);
const sockets = require("./sockets");

const socketServer = io(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const PORT = 8000;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

sockets.listen(socketServer);

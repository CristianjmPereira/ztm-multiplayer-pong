let readyPlayerCount = 0;
function listen(socketServer) {
  const pongNamespace = socketServer.of("/pong");
  pongNamespace.on("connection", (socket) => {
    console.log("User connected on server as: ", socket.id);
    const roomNumber = Math.floor(readyPlayerCount / 2);
    let roomName = `room ${roomNumber}`;

    socket.on("ready", () => {
      socket.join(roomName);
      console.log(`The player ${socket.id} joined to room ${roomName}`);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        console.log("Game starting");
        pongNamespace.in(roomName).emit("start", socket.id);
      }
    });

    socket.on("paddleMove", (data) => {
      socket.to(roomName).emit("paddleMove", data);
    });

    socket.on("ballMove", (data) => {
      socket.to(roomName).emit("ballMove", data);
    });

    socket.on("disconnect", (reason) => {
      socket.leave(roomName);
      console.log(`User disconnected: ${socket.id} with reason: ${reason}`);
    });
  });
}

module.exports = { listen };

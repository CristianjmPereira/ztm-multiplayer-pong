const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const PORT = 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

let readyPlayerCount = 0;

io.on("connection", (socket) => {
  console.log("User connected on server as: ", socket.id);
  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.id} with reason: ${reason}`);
  });

  socket.on("ready", () => {
    console.log("Player ready", socket.id);

    readyPlayerCount++;

    if (readyPlayerCount % 2 === 0) {
      console.log("Game starting");
      io.emit("start", socket.id);
    }
  });

  socket.on("paddleMove", (data) => {
    socket.broadcast.emit("paddleMove", data);
  });

  socket.on("ballMove", (data) => {
    socket.broadcast.emit("ballMove", data);
  });
});

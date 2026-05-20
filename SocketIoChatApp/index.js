import express from "express";
import http from "http";
import { Server } from "socket.io";

async function main() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  // serve static frontend
  app.use(express.static("public"));

  // socket connection
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    io.emit("broadcastMessage", `${socket.id} has joined the chat!`);

    socket.on("sendMessage", (data) => {
      console.log("Received message:", data.message);
      io.emit("broadcastMessage", {
        id: socket.id,
        message: data.message,
        time: data.time,
      });
    });
  });

  // start server
  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
}
main();

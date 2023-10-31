import { WebSocketServer } from "ws";

const port = 8000;
const handleListen = () => console.log(`Listening on ws://localhost:8000`);

let sockets = [];
const wss = new WebSocketServer({ port }, handleListen);
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anno";
  console.log("Connected to Browser");
  socket.on("close", () => console.log("Disconnected from the Browser"));
  socket.on("message", (message) => {
    const { type, payload } = JSON.parse(message);
    switch (type) {
      case "message":
        sockets
          .filter((Asocket) => Asocket !== socket)
          .forEach((Asocket) => Asocket.send(`${socket.nickname}: ${payload}`));
        break;

      case "nickname":
        socket["nickname"] = payload;
        break;
    }
  });
});

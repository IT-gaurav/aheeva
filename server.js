const app = require("express")();
const cors = require("cors");
const http = require("http").createServer(app);
let socketio = require("socket.io");

// server-side
const io = socketio(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    headers: { "Access-Control-Allow-Origin": "*" },
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  let i = 1;
  let j = 2;
  setInterval(() => {
    let arr = [`call-${i++}`, `call-${j++}`];

    socket.emit("conn", arr);
  }, 1000);
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});

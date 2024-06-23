const express = require("express");
const pool = require("./db");

const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
// const saveMessage = require("./messages");

app.use(cors());
app.use(express.json());

app.get("/messages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).send("Server error");
  }
});

const server = http.createServer(app);

const saveMessage = async (messageData) => {
  const { room, author, message, time } = messageData;

  const query = {
    text: "INSERT INTO messages (room, author, message, time) VALUES ($1, $2, $3, $4)",
    values: [room, author, message, time],
  };

  try {
    await pool.query(query);
    console.log("Message saved to database");
  } catch (err) {
    console.error("Error saving message to database:", err);
  }
};

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected:${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User connected : ${socket.id} with id :${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    saveMessage(data);
    socket.to(data.room).emit("recieve_message", data);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
server.listen(3001, () => {
  console.log("Server is  running on port 3001");
});

const pool = require("./db");

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

module.exports = saveMessage;

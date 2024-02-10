const conecttodb = require("./db.js");
const express = require("express");
const cors = require("cors");
const server = express();
const port = 5000;
conecttodb();

server.use(cors());
server.use(express.json());
server.use("/api/auth", require("./routes/auth"));
server.use("/api/note", require("./routes/note"));

server.listen(port, () => {
  console.log(`iNotebook server listening on port http://localhost:${port}`);
});

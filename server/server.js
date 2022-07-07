import geckos from "@geckos.io/server";
import http from "http";
import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
const server = http.createServer(app);
const io = geckos();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../client')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

io.addServer(server);
io.onConnection((channel) => {
  channel.onDisconnect(() => {
    console.log(`${channel.id} got disconnected`);
  });

  channel.on("chat message", (data) => {
    console.log(`got ${data} from "chat message"`);
    // emit the "chat message" data to all channels in the same room
    io.room(channel.roomId).emit("chat message", data);
  });
});
// make sure the client uses the same port
// @geckos.io/client uses the port 9208 by default
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});

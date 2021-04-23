import path from "path";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { renderFile } from "ejs";
import "./database";
import { routes } from "./routes";

const app = express();

const publicAssetsPath = path.join(__dirname, "..", "public");

app.use(express.static(publicAssetsPath));
app.set("views", publicAssetsPath);
app.engine("html", renderFile);
app.set("view engine", "html");

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket: Socket) => {
    console.log("WebSocket connected", socket.id);

});

app.use(express.json());

app.use(routes);

http.listen(3333, () => console.log("Server is running on port 3333."));
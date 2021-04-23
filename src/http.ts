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

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html");
});

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket: Socket) => {});

app.use(express.json());

app.use(routes);

export { http, io };
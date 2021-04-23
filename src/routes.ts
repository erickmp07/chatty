import { Router } from "express";
import { MessageController } from "./controllers/MessageController";
import { SettingController } from "./controllers/SettingController";
import { UserController } from "./controllers/UserController";

const routes = Router();

const messageController = new MessageController();
const settingController = new SettingController();
const userController = new UserController();

routes.post("/settings", settingController.create);
routes.get("/settings/:username", settingController.findByUsername);
routes.put("/settings/:username", settingController.update);

routes.post("/users", userController.create);

routes.post("/messages", messageController.create);
routes.get("/messages/:user_id", messageController.showByUser);

export { routes };
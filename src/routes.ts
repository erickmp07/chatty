import { Router } from "express";
import { SettingController } from "./controllers/SettingController";
import { UserController } from "./controllers/UserController";

const routes = Router();

const settingController = new SettingController();
const userController = new UserController();

routes.post("/settings", settingController.create);
routes.post("/users", userController.create);

export { routes };
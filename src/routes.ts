import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { SettingRepository } from "./repositories/SettingRepository";

const routes = Router();

routes.post("/settings", async (request, response) => {
    const { username, chat } = request.body;
    
    const settingRepository = getCustomRepository(SettingRepository);

    const setting = settingRepository.create({
        username,
        chat
    });

    await settingRepository.save(setting);

    return response.json(setting);
});

export { routes };
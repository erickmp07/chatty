import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingRepository } from "../repositories/SettingRepository";

class SettingController {
    async create(request: Request, response: Response) {
        const { username, chat } = request.body;

        const settingRepository = getCustomRepository(SettingRepository);

        const setting = settingRepository.create({
            username,
            chat
        });

        await settingRepository.save(setting);

        return response.json(setting);
    }
}

export { SettingController };
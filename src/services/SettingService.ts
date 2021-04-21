import { getCustomRepository } from "typeorm";
import { SettingRepository } from "../repositories/SettingRepository";

interface ISettingCreate {
    chat: boolean;
    username: string;
}

class SettingService {
    async create({ chat, username } : ISettingCreate) {
        const settingRepository = getCustomRepository(SettingRepository);

        const userAlreadyExists = await settingRepository.findOne({
            username
        });

        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }

        const setting = settingRepository.create({
            username,
            chat
        });

        await settingRepository.save(setting);

        return setting;
    }
}

export { SettingService };
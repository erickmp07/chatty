import { Request, Response } from "express";
import { SettingService } from "../services/SettingService";

class SettingController {
    async create(request: Request, response: Response) {
        const { username, chat } = request.body;

        const settingService = new SettingService();

        try {
            const setting = await settingService.create({ chat, username });

            return response.json(setting);
        } catch(error) {
            return response.status(400).json({
                message: error.message
            });
        }
    }
}

export { SettingController };
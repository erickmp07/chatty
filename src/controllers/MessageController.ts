import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

class MessageController {
    async create(request: Request, response: Response): Promise<Response> {
        const { admin_id, text, user_id } = request.body;
        
        const messageService = new MessageService();

        const message = await messageService.create({
            admin_id,
            text,
            user_id
        });

        return response.json(message);
    }

    async showByUser(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params;

        const messageService = new MessageService();

        const messages = await messageService.listByUser(user_id);

        return response.json(messages);
    }
}

export { MessageController };
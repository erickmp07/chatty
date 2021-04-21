import { getCustomRepository } from "typeorm";
import { MessageRepository } from "../repositories/MessageRepository";

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessageService {
    async create({ admin_id, text, user_id }: IMessageCreate) {
        const messageRepository = getCustomRepository(MessageRepository);

        const message = messageRepository.create({
            admin_id,
            text,
            user_id
        });

        await messageRepository.save(message);

        return message;
    }
}

export { MessageService };
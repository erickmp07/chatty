import { getCustomRepository } from "typeorm";
import { MessageRepository } from "../repositories/MessageRepository";

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessageService {
    private messageRepository: MessageRepository;

    constructor() {
        this.messageRepository = getCustomRepository(MessageRepository);
    }

    async create({ admin_id, text, user_id }: IMessageCreate) {
        const message = this.messageRepository.create({
            admin_id,
            text,
            user_id
        });

        await this.messageRepository.save(message);

        return message;
    }

    async listByUser(user_id: string) {
        const messages = await this.messageRepository.find({
            where: { user_id },
            relations: ["user"]
        });

        return messages;
    }
}

export { MessageService };
import { ConnectionRepository } from "../repositories/ConnectionRepository";
import { getCustomRepository } from "typeorm";

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionService {
    private connectionRepository: ConnectionRepository;

    constructor() {
        this.connectionRepository = getCustomRepository(ConnectionRepository);
    }

    async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
        const connection = this.connectionRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await this.connectionRepository.save(connection);

        return connection;
    }

    async findByUserId(user_id: string) {
        const connection = await this.connectionRepository.findOne({
            user_id
        });

        return connection;
    }

    async findAllWithoutAdmin() {
        const connections = await this.connectionRepository.find({
            where: { admin_id: null },
            relations: ["user"]
        });

        return connections;
    }

    async findBySocketId(socket_id: string) {
        const connection = await this.connectionRepository.findOne({
            socket_id
        });

        return connection;
    }
}

export { ConnectionService };